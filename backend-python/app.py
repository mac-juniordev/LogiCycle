"""
LogiCycle — Priority Ranking & EXIF Verification Engine
SDG 13 (Climate Action) — Cameroon urban flash flood prevention.
Bamenda-first deployment.

Endpoints:
    GET  /health          -> liveness + cold-start warmup
    GET  /zones           -> Bamenda zones with derived densities
    POST /score           -> priority score (accepts density OR zone)
    GET  /score/matrix    -> returns full scoring matrix
    POST /verify-image    -> EXIF timestamp verification
"""

import os
from datetime import datetime, timezone

from config import (
    BAMENDA_ZONES,
    DEFAULT_PORT,
    DENSITY_WEIGHTS,
    MATERIAL_WEIGHTS,
    SERVICE_NAME,
    SERVICE_VERSION,
    density_for_zone,
)
from exif_verify import verify_image
from flask import Flask, jsonify, request
from flask_cors import CORS
from scoring import calculate_priority_score

# ---------------------------------------------------------------------------
# App
# ---------------------------------------------------------------------------
app = Flask(__name__)
CORS(app)


# ---------------------------------------------------------------------------
# GET /health
# ---------------------------------------------------------------------------
@app.route("/health", methods=["GET"])
def health():
    return jsonify(
        {
            "status": "ok",
            "service": SERVICE_NAME,
            "version": SERVICE_VERSION,
        }
    )


# ---------------------------------------------------------------------------
# GET /zones — Bamenda zones with derived densities
# ---------------------------------------------------------------------------
@app.route("/zones", methods=["GET"])
def zones():
    return jsonify(
        {
            "zones": [
                {"name": name, "density": density}
                for name, density in BAMENDA_ZONES.items()
            ],
        }
    )


# ---------------------------------------------------------------------------
# POST /score — accepts either {material, density} or {material, zone}
# ---------------------------------------------------------------------------
@app.route("/score", methods=["POST"])
def score():
    payload = request.get_json(silent=True) or {}
    material = payload.get("material")
    density = payload.get("density")
    zone = payload.get("zone")

    # If zone is provided without density, derive density from the zone map
    if zone and not density:
        density = density_for_zone(zone)

    if not material or not density:
        return (
            jsonify(
                {
                    "error": "missing_required_fields",
                    "required": ["material", "and either density or zone"],
                }
            ),
            400,
        )

    result = calculate_priority_score(material, density)
    result["material"] = material
    result["density"] = density
    if zone:
        result["zone"] = zone
    return jsonify(result)


# ---------------------------------------------------------------------------
# GET /score/matrix — read-only formula (used by admin UI)
# ---------------------------------------------------------------------------
@app.route("/score/matrix", methods=["GET"])
def score_matrix():
    return jsonify(
        {
            "material_weights": MATERIAL_WEIGHTS,
            "density_weights": DENSITY_WEIGHTS,
            "formula": "priority_score = material_weight × density_weight",
            "bamenda_zones": BAMENDA_ZONES,
        }
    )


# ---------------------------------------------------------------------------
# POST /verify-image — multipart: image + arrival_timestamp
# ---------------------------------------------------------------------------
@app.route("/verify-image", methods=["POST"])
def verify_image_endpoint():
    try:
        # 1) Validate upload present
        if "image" not in request.files:
            return jsonify({"verified": False, "reason": "no_image_uploaded"}), 400

        file = request.files["image"]
        if file.filename == "":
            return jsonify({"verified": False, "reason": "empty_filename"}), 400

        # 2) Read bytes defensively
        try:
            image_bytes = file.read()
        except Exception as e:
            return (
                jsonify({"verified": False, "reason": "read_failed", "detail": str(e)}),
                400,
            )

        if not image_bytes or len(image_bytes) < 100:
            return jsonify({"verified": False, "reason": "empty_or_tiny_image"}), 400

        # 3) Parse arrival timestamp
        raw_arrival = request.form.get("arrival_timestamp")
        if not raw_arrival:
            arrival = datetime.now(timezone.utc)
        else:
            try:
                # Handle ISO 8601 with or without 'Z' suffix
                normalized = raw_arrival.replace("Z", "+00:00")
                arrival = datetime.fromisoformat(normalized)
            except ValueError:
                return (
                    jsonify(
                        {
                            "verified": False,
                            "reason": "bad_timestamp_format",
                            "expected": "ISO 8601 e.g. 2026-11-09T14:30:00Z",
                        }
                    ),
                    400,
                )

        # 4) Run verification
        result = verify_image(image_bytes, arrival)
        return jsonify(result)

    except Exception as e:
        # Never crash — always return structured JSON
        import traceback

        traceback.print_exc()
        return (
            jsonify(
                {
                    "verified": False,
                    "reason": "server_error",
                    "detail": str(e),
                }
            ),
            500,
        )


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PY_PORT", DEFAULT_PORT))
    app.run(host="0.0.0.0", port=port, debug=False)