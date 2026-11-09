"""
LogiCycle — Priority Score algorithm.

Pure functions, no side effects, no Flask imports.
Importable from app.py, and testable from a plain Python REPL.

Usage:
    from scoring import calculate_priority_score
    result = calculate_priority_score("mattress", "market")
    # -> {"priority_score": 9, "material_weight": 3, "density_weight": 3,
    #     "risk_tier": "CRITICAL"}
"""

from config import MATERIAL_WEIGHTS, DENSITY_WEIGHTS, RISK_TIER_THRESHOLDS


def _normalize(value: str) -> str:
    """Make 'Plastic Bottles' → 'plastic_bottles', 'Main Road' → 'main_road'."""
    return (value or "").strip().lower().replace(" ", "_")


def calculate_priority_score(material: str, density: str) -> dict:
    """
    Compute the LogiCycle Priority Score.

    Formula:
        priority_score = material_weight × density_weight

    Unknown inputs default to weight=1 (lowest), so a typo or novel
    material never crashes the server — it just ranks low until
    we add it to config.py.
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