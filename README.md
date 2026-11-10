# 🟢 LogiCycle

> **Code for a Greener Tomorrow.**
> SDG 13 — Climate Action · Drainage cleanup logistics for Cameroon's urban flood prevention.

---

## The Problem

Every rainy season, Douala and Yaoundé flood — not because of rainfall volume alone, but because **storm drains are clogged** with mattresses, plastic bottles, logs, and silt. Municipal councils have no real-time visibility into *which* drain, *how bad*, or *in what order* to dispatch cleanup crews. The result: crews waste fuel on the wrong drains while neighborhoods flood.

## The Solution

LogiCycle is a **three-role drainage cleanup OS**:

| Role | Device | What They Do |
|---|---|---|
| 🟢 Anonymous Citizen | Mobile PWA | Photographs a clogged drain in 20 seconds. No login. Camera-enforced. |
| 🔵 Council Admin | Desktop | Sees reports ranked by Priority Score, verifies photo authenticity via EXIF, dispatches optimized routes. |
| 🟠 Fleet Dispatcher | Mobile PWA | Gets a loud siren alarm, follows a stop-by-stop cleanup timeline, acknowledges each stop. |

## Architecture
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ React PWA │────▶│ Node Gateway │────▶│ Python Engine │
│ (Vercel) │ │ (Render) │ │ (Render) │
│ │ │ │ │ │
│ Public form │ │ /api/reports │ │ /score │
│ Hidden admin │ │ /api/verified │ │ /verify-image │
│ Hidden dispatch │ │ /api/dispatch │ │ │
└──────────────────┘ └──────────────────┘ └──────────────────┘


## Tech Stack

- **Frontend:** React 18 · Vite · Tailwind CSS v4 · Framer Motion · react-confetti · react-hot-toast · `vite-plugin-pwa`
- **Backend (Node):** Express · Multer · node-fetch
- **Engine (Python):** Flask · Pillow (EXIF verification) · Flask-CORS
- **Hosting:** Vercel (frontend) · Render (Node + Python)
- **PWA:** Installable on Android & iOS from the browser — no app store required

## Priority Score Formula
Priority = Material Weight × Density Weight

Material Weight:
Mattress / Logs → 3 (bulky, blocks drain fully)
Plastic Bottles → 2 (accumulates, traps debris)
Silt / Mud → 1 (drainable, lower urgency)

Density Weight:
Market / Main Road → 3 (high-traffic, high-flood-impact zone)
Residential → 2 (protects homes)
Tracks / Footpath → 1 (lowest flood impact)

Score 6+ → CRITICAL · 3-5 → HIGH · 1-2 → LOW


## Privacy & Integrity

- **Anonymous by design** — no accounts, no phone numbers, no names.
- **Camera enforced** — `<input capture="environment">` prevents gallery uploads.
- **Freshness check** — `file.lastModified` must be within 5 min of submission.
- **EXIF verification** — Python engine confirms photo timestamp matches report arrival time (5-min buffer).
- **Graceful degradation** — photos without EXIF are marked `PENDING_REVIEW`, never rejected — so citizens on older phones aren't punished.

## Build Phases

| Phase | Status | Deliverable |
|---|---|---|
| 0 | ✅ | Repo, structure, docs |
| 1 | ⬜ | Frontend scaffold + PWA |
| 2 | ⬜ | Python scoring + EXIF engine |
| 3 | ⬜ | Node gateway |
| 4 | ⬜ | Public report form |
| 5 | ⬜ | Hidden admin panel |
| 6 | ⬜ | Hidden dispatcher PWA |

## Hidden Routes (Never Linked Publicly)

- Admin: `/portal-x-management-alpha`
- Dispatcher: `/node-fleet-driver-beta`

## Local Development

```bash
# Terminal 1 — Python engine
cd backend-python
python -m venv venv
source venv/Scripts/activate   # Windows Git Bash
pip install -r requirements.txt
python app.py

# Terminal 2 — Node gateway
cd backend-node
npm install
npm run dev

# Terminal 3 — Frontend
cd frontend-react
npm install
npm run dev

# backend-python — LogiCycle Priority Engine

Flask service that scores drainage hazards and verifies photo authenticity.

## What It Does

1. **`/score`** — Computes a Priority Score from `material × density`.
2. **`/verify-image`** — Checks EXIF capture time against server arrival time.
3. **`/health`** — Liveness probe (used by Render cold-start warmup).
4. **`/score/matrix`** — Returns the scoring formula as JSON (read-only, for admin UI).

## Run Locally

```bash
cd backend-python
python -m venv venv
source venv/Scripts/activate   # Windows Git Bash
pip install -r requirements.txt
python app.py