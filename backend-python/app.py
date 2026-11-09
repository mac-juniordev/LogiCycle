
import os
from datetime import datetime

from config import (
    DEFAULT_PORT,
    DENSITY_WEIGHTS,
    MATERIAL_WEIGHTS,
    SERVICE_NAME,
    SERVICE_VERSION,
)
from exif_verify import verify_image
from flask import Flask, jsonify, request
from flask_cors import CORS
from scoring import calculate_priority_score

# Create the Flask app
app = Flask(__name__)
CORS(app)


# Check if the API is running
@app.route("/health", methods=["GET"])
def health():
    return jsonify(
        {
            "status": "ok",
            "service": SERVICE_NAME,
            "version": SERVICE_VERSION,
        }
    )


# Calculate priority based on material and area density
@app.route("/score", methods=["POST"])
def score():
    payload = request.get_json(silent=True) or {}
    material = payload.get("material")
    density = payload.get("density")

    # Make sure both fields are provided
    if not material or not density:
        return (
            jsonify(
                {
                    "error": "missing_required_fields",
                    "required": ["material", "density"],
                }
            ),
            400,
        )

    result = calculate_priority_score(material, density)
    result["material"] = material
    result["density"] = density

    return jsonify(result)


# Return the weights used in the priority calculation
@app.route("/score/matrix", methods=["GET"])
def score_matrix():
    return jsonify(
        {
            "material_weights": MATERIAL_WEIGHTS,
            "density_weights": DENSITY_WEIGHTS,
            "formula": "priority_score = material_weight × density_weight",
        }
    )


# Check an uploaded image's EXIF timestamp
@app.route("/verify-image", methods=["POST"])
def verify_image_endpoint():

    # Make sure an image was uploaded
    if "image" not in request.files:
        return (
            jsonify({"verified": False, "reason": "no_image_uploaded"}),
            400,
        )

    raw_arrival = request.form.get("arrival_timestamp")

    # Use the current time if no arrival time is provided
    if not raw_arrival:
        arrival = datetime.utc()
    else:
        try:
            arrival = datetime.fromisoformat(raw_arrival)
        except ValueError:
            return (
                jsonify(
                    {
                        "verified": False,
                        "reason": "bad_timestamp_format",
                        "expected": "ISO 8601 e.g. 2026-11-09T14:30:00",
                    }
                ),
                400,
            )

    # Read the image and verify its timestamp
    image_bytes = request.files["image"].read()
    result = verify_image(image_bytes, arrival)

    return jsonify(result)


# Start the server
if __name__ == "__main__":
    port = int(os.environ.get("PY_PORT", DEFAULT_PORT))
    app.run(host="0.0.0.0", port=port, debug=False)
