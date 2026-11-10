/**
 * LogiCycle Gateway — Express Server
 */

import express from "express";
import cors from "cors";
import multer from "multer";

import { CONFIG } from "./config.js";
import {
  addReport,
  getVerifiedReports,
  updateReportStatus,
  setRoute,
  removeStopFromRoute,
  getActiveRoute,
} from "./store.js";
import { scoreReport, verifyImage } from "./pythonClient.js";

const app = express();

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (CONFIG.CORS_ORIGINS.includes(origin)) return cb(null, true);
      if (CONFIG.NODE_ENV === "development") return cb(null, true);
      cb(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: CONFIG.MAX_UPLOAD_BYTES },
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: CONFIG.SERVICE_NAME,
    version: CONFIG.SERVICE_VERSION,
    reports_in_memory: getVerifiedReports().length,
  });
});

// ---------------------------------------------------------------------------
// POST /api/reports — public anonymous intake
// ---------------------------------------------------------------------------
app.post("/api/reports", upload.single("photo"), async (req, res) => {
  try {
    // Sanitize mojibake from Windows terminal encoding issues
    const sanitize = (s) =>
      (s || "").replace(/[\uFFFD\u00EF\u00BF\u00BD]/g, "").replace(/\s+/g, " ").trim();

    const material = sanitize(req.body.material);
    const density = sanitize(req.body.density);
    const region = sanitize(req.body.region);
    const notes = sanitize(req.body.notes);
    const arrival_timestamp = req.body.arrival_timestamp;

    if (!material || !density || !region) {
      return res.status(400).json({
        error: "missing_required_fields",
        required: ["material", "density", "region"],
      });
    }

    const arrival = arrival_timestamp || new Date().toISOString();

    // 1) Score: material × density — calls Python engine
    const score = await scoreReport(material, density);

    // 2) EXIF verification — only if a photo was uploaded
    let verification = {
      verified: false,
      reason: "no_photo_uploaded",
      exif_timestamp: null,
      arrival_timestamp: arrival,
    };
    if (req.file) {
      verification = await verifyImage(
        req.file.buffer,
        req.file.mimetype,
        req.file.originalname,
        arrival
      );
    }

    // 3) Build the report object
    const report = {
      id: `LC-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`,
      material,
      density,
      region,
      notes: notes || "",
      arrival_timestamp: arrival,
      exif_verification: verification,
      priority_score: score.priority_score ?? 0,
      risk_tier: score.risk_tier ?? "UNKNOWN",
      status: verification.verified ? "VERIFIED" : "PENDING_REVIEW",
      created_at: new Date().toISOString(),
    };

    // If Python scoring failed, expose it (diagnostic)
    if (score.error) {
      report.scoring_error = score.error;
    }

    addReport(report);
    return res.status(201).json({ ok: true, report });
  } catch (err) {
    console.error("[POST /api/reports]", err);
    return res.status(500).json({ error: "internal_error", detail: err.message });
  }
});

// ---------------------------------------------------------------------------
// GET /api/reports/verified — hidden admin feed
// ---------------------------------------------------------------------------
app.get("/api/reports/verified", (req, res) => {
  const reports = getVerifiedReports();
  const active = getActiveRoute();
  res.json({
    count: reports.length,
    reports,
    current_route: active.route,
    dispatched_at: active.dispatchedAt,
  });
});

// ---------------------------------------------------------------------------
// POST /api/dispatch/route — build optimized route
// ---------------------------------------------------------------------------
app.post("/api/dispatch/route", (req, res) => {
  const reports = getVerifiedReports();
  const verified = reports.filter((r) => r.status === "VERIFIED");

  if (verified.length === 0) {
    return res.status(409).json({
      error: "no_verified_reports_to_dispatch",
      hint: "Submit at least one report with valid EXIF to dispatch a route.",
    });
  }

  const route = verified.map((r, idx) => ({
    stop: idx + 1,
    report_id: r.id,
    region: r.region,
    material: r.material,
    density: r.density,
    priority_score: r.priority_score,
    risk_tier: r.risk_tier,
    eta_minutes:
      idx === 0
        ? CONFIG.FIRST_STOP_ETA_MINUTES
        : CONFIG.FIRST_STOP_ETA_MINUTES + idx * CONFIG.ETA_MINUTES_PER_STOP,
  }));

  const dispatched = setRoute(route);
  return res.json({ ok: true, ...dispatched });
});

// ---------------------------------------------------------------------------
// GET /api/dispatch/active — dispatcher polls for active route
// ---------------------------------------------------------------------------
app.get("/api/dispatch/active", (req, res) => {
  res.json(getActiveRoute());
});

// ---------------------------------------------------------------------------
// POST /api/dispatch/acknowledge — dispatcher clears a stop
// ---------------------------------------------------------------------------
app.post("/api/dispatch/acknowledge", (req, res) => {
  const { report_id } = req.body || {};
  if (!report_id) {
    return res.status(400).json({ error: "missing_report_id" });
  }

  const updated = updateReportStatus(report_id, "CLEARED", {
    cleared_at: new Date().toISOString(),
  });
  if (!updated) {
    return res.status(404).json({ error: "report_not_found", report_id });
  }

  const remainingRoute = removeStopFromRoute(report_id);
  return res.json({ ok: true, cleared: updated, remaining_route: remainingRoute });
});

// ---------------------------------------------------------------------------
// 404 fallback
// ---------------------------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({ error: "not_found", path: req.path });
});

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
app.listen(CONFIG.PORT, () => {
  console.log(`[LogiCycle Gateway] v${CONFIG.SERVICE_VERSION} listening on :${CONFIG.PORT}`);
  console.log(`[LogiCycle Gateway] Python engine: ${CONFIG.PY_ENGINE_URL}`);
  console.log(`[LogiCycle Gateway] Env: ${CONFIG.NODE_ENV}`);
});