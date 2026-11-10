/**
 * LogiCycle Gateway — State Store
 */

import fs from "fs";
import { CONFIG } from "./config.js";

const EMPTY_STATE = { reports: [], route: null, dispatchedAt: null };
let state = loadState();

function loadState() {
  try {
    if (fs.existsSync(CONFIG.DATA_FILE)) {
      const raw = fs.readFileSync(CONFIG.DATA_FILE, "utf-8");
      if (!raw.trim()) return { ...EMPTY_STATE };
      const parsed = JSON.parse(raw);
      return {
        reports: parsed.reports || [],
        route: parsed.route || null,
        dispatchedAt: parsed.dispatchedAt || null,
      };
    }
  } catch (err) {
    console.error("[store] Failed to load state:", err.message);
  }
  return { ...EMPTY_STATE };
}

function persist() {
  try {
    fs.writeFileSync(CONFIG.DATA_FILE, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {
    console.error("[store] Failed to persist state:", err.message);
  }
}

export function getState() { return state; }
export function addReport(report) {
  state.reports.unshift(report);
  persist();
  return report;
}
export function getVerifiedReports() {
  return [...state.reports].sort((a, b) => b.priority_score - a.priority_score);
}
export function updateReportStatus(reportId, status, extra = {}) {
  let updated = null;
  state.reports = state.reports.map((r) => {
    if (r.id === reportId) {
      updated = { ...r, status, ...extra };
      return updated;
    }
    return r;
  });
  persist();
  return updated;
}
export function setRoute(route) {
  state.route = route;
  state.dispatchedAt = new Date().toISOString();
  persist();
  return { route: state.route, dispatchedAt: state.dispatchedAt };
}
export function removeStopFromRoute(reportId) {
  if (!state.route) return null;
  state.route = state.route.filter((stop) => stop.report_id !== reportId);
  state.route = state.route.map((stop, idx) => ({ ...stop, stop: idx + 1 }));
  persist();
  return state.route;
}
export function getActiveRoute() {
  return { route: state.route, dispatchedAt: state.dispatchedAt };
}
