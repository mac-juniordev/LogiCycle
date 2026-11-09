
"""
LogiCycle - EXIF timestamp verification.

Checks whether an uploaded photo contains a capture timestamp
and whether that timestamp is close to when the server received it.

Photos without EXIF data or with suspicious timestamps are sent
for manual review instead of being automatically rejected.
"""

import io
from datetime import datetime

from config import EXIF_TIMESTAMP_BUFFER_SECONDS
from PIL import ExifTags, Image


def _extract_exif_datetime(image_bytes: bytes):
    """
    Extract the original capture time from an image.

    Returns None if the timestamp is missing or the image cannot be read.
    """
    try:
        img = Image.open(io.BytesIO(image_bytes))
        exif = img.getexif()

        if not exif:
            return None

        # Check the original capture time, then fall back to the general timestamp.
        exif_ifd = exif.get_ifd(ExifTags.IFD.Exif)

        raw = (
            exif_ifd.get(ExifTags.Base.DateTimeOriginal)
            or exif.get(ExifTags.Base.DateTime)
        )

        if not raw:
            return None

        return datetime.strptime(raw, "%Y:%m:%d %H:%M:%S")

    except (OSError, ValueError, TypeError, SyntaxError):
        # Ignore images that cannot be read or have invalid metadata.
        return None


def verify_image(image_bytes: bytes, arrival_timestamp: datetime) -> dict:
    """
    Compare the photo's capture time with its server arrival time.

    Returns the verification result, reason and time difference.
    """

    # Use the current UTC time if no arrival timestamp was provided.
    if arrival_timestamp is None:
        arrival_timestamp = datetime.now(datetime.UTC)

    # Convert the arrival time to UTC before comparing timestamps.
    if arrival_timestamp.tzinfo is None:
        arrival_timestamp = arrival_timestamp.replace(tzinfo=datetime.UTC)
    else:
        arrival_timestamp = arrival_timestamp.astimezone(datetime.UTC)

    exif_dt = _extract_exif_datetime(image_bytes)

    # Without a capture timestamp, the photo needs manual review.
    if exif_dt is None:
        return {
            "verified": False,
            "reason": "no_exif_timestamp",
            "delta_seconds": None,
            "exif_timestamp": None,
            "arrival_timestamp": arrival_timestamp.isoformat(),
        }

    # EXIF timestamps have no timezone information, so this implementation
    # assumes the camera's recorded time is UTC.
    exif_dt = exif_dt.replace(tzinfo=datetime.UTC)

    # Calculate the difference between capture time and arrival time.
    delta_seconds = int(
        abs((arrival_timestamp - exif_dt).total_seconds())
    )

    verified = delta_seconds <= EXIF_TIMESTAMP_BUFFER_SECONDS

    return {
        "verified": verified,
        "reason": "within_buffer" if verified else "exif_mismatch",
        "delta_seconds": delta_seconds,
        "exif_timestamp": exif_dt.isoformat(),
        "arrival_timestamp": arrival_timestamp.isoformat(),
    }
