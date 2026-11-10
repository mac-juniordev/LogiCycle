"""
LogiCycle — Priority Score algorithm.

Pure functions, no side effects, no Flask imports.
"""

from config import DENSITY_WEIGHTS, MATERIAL_WEIGHTS, RISK_TIER_THRESHOLDS


def _normalize(value: str) -> str:
    """Make 'Plastic Bottles' → 'plastic_bottles', 'Main Road' → 'main_road'."""
    return (value or "").strip().lower().replace(" ", "_")


def calculate_priority_score(material: str, density: str) -> dict:
    """
    Compute the LogiCycle Priority Score.

    Formula:
        priority_score = material_weight × density_weight

    Unknown inputs default to weight=1.
    """
    mat_key = _normalize(material)
    den_key = _normalize(density)

    mat_weight = MATERIAL_WEIGHTS.get(mat_key, 1)
    den_weight = DENSITY_WEIGHTS.get(den_key, 1)

    score = mat_weight * den_weight

    if score >= RISK_TIER_THRESHOLDS["CRITICAL"]:
        tier = "CRITICAL"
    elif score >= RISK_TIER_THRESHOLDS["HIGH"]:
        tier = "HIGH"
    else:
        tier = "LOW"

    return {
        "priority_score": score,
        "material_weight": mat_weight,
        "density_weight": den_weight,
        "risk_tier": tier,
        "material_normalized": mat_key,
        "density_normalized": den_key,
    }