/**
 * LogiCycle Gateway — Python engine client
 * Wraps calls to the Flask service. If Python is unreachable, we return
 * a safe default rather than crashing the whole request.
 */

import fetch from "node-fetch";
import { CONFIG } from "./config.js";

function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CONFIG.PY_TIMEOUT_MS);
  return fetch(url, { ...options, signal: controller.signal }).finally(() =>
    clearTimeout(timer)
  );
}

// ---------------------------------------------------------------------------
// Score: accepts either {material, density} or {material, zone}
// ---------------------------------------------------------------------------
export async function scoreReport(material, densityOrZone, isZone = false) {
  const payload = isZone
    ? { material, zone: densityOrZone }
    : { material, density: densityOrZone };

  try {
    const res = await fetchWithTimeout(`${CONFIG.PY_ENGINE_URL}/score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`Python /score returned ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("[pythonClient] scoreReport failed:", err.message);
    return {
      priority_score: 0,
      material_weight: 0,
      density_weight: 0,
      risk_tier: "UNKNOWN",
      error: err.message,
    };
  }
}

// ---------------------------------------------------------------------------
// Verify image: EXIF timestamp vs arrival
// ---------------------------------------------------------------------------
export async function verifyImage(buffer, mimetype, filename, arrivalTimestamp) {
  try {
    const fd = new FormData();
    const blob = new Blob([buffer], { type: mimetype || "image/jpeg" });
    fd.append("image", blob, filename || "upload.jpg");
    fd.append("arrival_timestamp", arrivalTimestamp);

    const res = await fetchWithTimeout(`${CONFIG.PY_ENGINE_URL}/verify-image`, {
      method: "POST",
      body: fd,
    });
    if (!res.ok) {
      throw new Error(`Python /verify-image returned ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("[pythonClient] verifyImage failed:", err.message);
    return {
      verified: false,
      reason: "python_engine_unreachable",
      detail: err.message,
      exif_timestamp: null,
      arrival_timestamp: arrivalTimestamp,
    };
  }
}