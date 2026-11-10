# backend-node — LogiCycle Gateway

Express API between the React PWA and the Python priority engine.

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/health` | Liveness |
| POST | `/api/reports` | Public anonymous intake (multipart) |
| GET | `/api/reports/verified` | Hidden admin feed |
| POST | `/api/dispatch/route` | Admin builds optimized route |
| GET | `/api/dispatch/active` | Dispatcher polls for route |
| POST | `/api/dispatch/acknowledge` | Dispatcher clears a stop |

## Run Locally

**Requires Python engine running on :5001 first.**

```bash
cd backend-node
npm install
cp .env.example .env    # optional, defaults work
npm run dev