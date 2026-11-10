"""
LogiCycle — EXIF timestamp verification.

Two questions this answers:
    1. Does this photo have an EXIF capture timestamp at all?
    2. If yes, is that capture time within 5 minutes of arrival at the server?

If (1) is False: we mark PENDING_REVIEW, not REJECTED.
    - Old Android phones often strip EXIF.
    - Punishing citizens for their phone isn't climate action.

If (2) is False: suspicious — could be a re-upload of an old photo.
    - Still marked PENDING_REVIEW (admin can eyeball it).

Only (1) is True AND (2) is True = VERIFIED.
"""

import io
from datetime import datetime, timezone

from config import EXIF_TIMESTAMP_BUFFER_SECONDS
from PIL import ExifTags, Image


def _extract_exif_datetime(image_bytes: bytes):
    """
    Return naive datetime from EXIF DateTimeOriginal if present, else None.
    Never raises — a corrupt image returns None.
    """
    try:
        img = Image.open(io.BytesIO(image_bytes))
        exif = img.getexif()
        if not exif:
            return None

        exif_ifd = exif.get_ifd(ExifTags.IFD.Exif)
        raw = exif_ifd.get(ExifTags.Base.DateTimeOriginal) or exif.get(
            ExifTags.Base.DateTime
        )

        if not raw:
            return None

        return datetime.strptime(raw, "%Y:%m:%d %H:%M:%S")

    except Exception:
        return None


def verify_image(image_bytes: bytes, arrival_timestamp: datetime) -> dict:
    """
    Verify whether a photo's EXIF capture time matches server arrival.
    """
    # Normalize arrival to naive UTC datetime
    if arrival_timestamp is None:
        arrival_timestamp = datetime.now(timezone.utc).replace(tzinfo=None)

    if arrival_timestamp.tzinfo is not None:
        arrival_timestamp = arrival_timestamp.astimezone(timezone.utc).replace(tzinfo=None)

    exif_dt = _extract_exif_datetime(image_bytes)

    if exif_dt is None:
        return {
            "verified": False,
            "reason": "no_exif_timestamp",
            "delta_seconds": None,
            "exif_timestamp": None,
            "arrival_timestamp": arrival_timestamp.isoformat(),
        }

    delta_seconds = int(abs((arrival_timestamp - exif_dt).total_seconds()))
    verified = delta_seconds <= EXIF_TIMESTAMP_BUFFER_SECONDS

    return {
        "verified": verified,
        "reason": "within_buffer" if verified else "exif_mismatch",
        "delta_seconds": delta_seconds,
        "exif_timestamp": exif_dt.isoformat(),
        "arrival_timestamp": arrival_timestamp.isoformat(),
    }