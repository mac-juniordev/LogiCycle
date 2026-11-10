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
SERVICE_VERSION = "0.3.0-phase3"

# ---------------------------------------------------------------------------
# Bamenda zones — the source of truth for region → density mapping
# ---------------------------------------------------------------------------
# The frontend shows these 10 zones. When a citizen picks a zone, we look up
# its density automatically and feed it to the scoring engine.
BAMENDA_ZONES = {
    # Markets — highest foot traffic, blocked drains affect the most people
    "Nkwen Food Market": "market",
    "Ntarikon Market": "market",

    # Main roads — commercial arteries, flooding cuts off the city
    "Mile 4 Nkwen": "main_road",
    "Commercial Avenue": "main_road",
    "Nkwen Highway": "main_road",

    # Residential zones — protect homes
    "Mankon": "residential",
    "Up Station": "residential",
    "Old Town": "residential",
    "Bayelle": "residential",

    # Tracks / footpaths — lowest flood impact, but still worth cleaning
    "Mbatu Road": "tracks",
}


def density_for_zone(zone_name: str) -> str:
    """Look up the density classification for a Bamenda zone. Defaults to 'tracks' if unknown."""
    return BAMENDA_ZONES.get(zone_name, "tracks")