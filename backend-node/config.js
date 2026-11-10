/**
 * LogiCycle Gateway — Configuration
 */

import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const CONFIG = {
  PORT: parseInt(process.env.PORT || "4000", 10),
  NODE_ENV: process.env.NODE_ENV || "development",
  PY_ENGINE_URL: process.env.PY_ENGINE_URL || "http://127.0.0.1:5001",
  PY_TIMEOUT_MS: 8000,
  DATA_FILE: path.join(__dirname, "data.json"),
  MAX_UPLOAD_BYTES: 15 * 1024 * 1024,
  ETA_MINUTES_PER_STOP: 12,
  FIRST_STOP_ETA_MINUTES: 8,
  CORS_ORIGINS: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",")
    : ["http://localhost:5173", "http://127.0.0.1:5173"],
  SERVICE_NAME: "logicycle-gateway",
  SERVICE_VERSION: "0.3.0-phase3",
};
