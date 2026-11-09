"""
LogiCycle — Shared configuration
All tuning constants live here. If a judge asks "how did you choose these numbers?",
this is the file to open.
"""

# ---------------------------------------------------------------------------
# Priority Score = Material Weight × Density Weight
# Higher score = clean this drain first (higher flood risk)
# ---------------------------------------------------------------------------

MATERIAL_WEIGHTS = {
    # Bulky / fully-blocking debris — highest flood contribution
    "mattress": 3,
    "logs": 3,

    # Accumulating / trapping debris — medium flood contribution
    "plastic_bottles": 2,
    "plastic": 2,

    # Drainable sediment — lowest flood contribution, but still slows drain
    "silt": 1,
    "mud": 1,
}

DENSITY_WEIGHTS = {
    # High-traffic / high-impact zones — flooding here affects the most people
    "market": 3,
    "main_road": 3,

    # Residential zones — protects homes
    "residential": 2,

    # Low-traffic paths — lowest flood impact
    "tracks": 1,
}

# Thresholds for risk tier labelling (used in report badges)
RISK_TIER_THRESHOLDS = {
    "CRITICAL": 6,   # score >= 6
    "HIGH": 3,       # score >= 3
    # else -> LOW
}

# ---------------------------------------------------------------------------
# EXIF verification
# ---------------------------------------------------------------------------
# If the EXIF capture time and the API arrival time differ by more than this,
# the photo is marked as suspicious. Buffer accounts for slow uploads.
EXIF_TIMESTAMP_BUFFER_SECONDS = 5 * 60  # 5 minutes

# ---------------------------------------------------------------------------
# Server
# ---------------------------------------------------------------------------
DEFAULT_PORT = 5001
SERVICE_NAME = "logicycle-priority-engine"
SERVICE_VERSION = "0.1.0-phase1"