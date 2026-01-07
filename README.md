Take-Home Assignment Submission: Pastebin-Lite
🔗 Deployed Application URL
https://pastebin-lite-o0augma4d-shanthala-ds-projects.vercel.app

📦 Git Repository URL
https://github.com/Shanthalad/pastebin-lite  

📘 README.md (What the grader checks)
Project Description

Pastebin-Lite is a lightweight Pastebin-style web application that allows users to create text pastes and share them via a unique URL. Pastes can optionally expire based on time-to-live (TTL), view count, or whichever constraint is reached first. The application is built with Next.js and designed to work reliably in a serverless environment.

How to Run the App Locally
Prerequisites
Node.js (v18 or later)
npm

Steps
git clone https://github.com/Shanthalad/pastebin-lite.git
cd pastebin-lite
npm install
npm run dev

📁 Repository Structure
pastebin-lite/
├── app/
│   ├── api/
│   ├── p/[id]/
│   └── page.js
├── lib/
├── README.md
├── package.json
├── next.config.js
└── jsconfig.json


🚀 Features
Create text pastes via REST API
Automatic expiration using TTL (time-to-live)
Maximum view count per paste
Unique URL for each paste
Deployed on Vercel
Redis-backed persistence 

The application will start at:

http://localhost:3000
Persistence Layer Used
This project uses Upstash Redis (KV store) as the persistence layer.
Chosen because it is serverless-friendly
Data persists across requests and deployments
Suitable for TTL-based expiry and atomic view-count updates
Integrated using @vercel/kv
No in-memory storage is used for paste data.
Environment Variables

The following environment variables are required (configured in Vercel and .env.local, not committed to Git):

UPSTASH_REDIS_REST_URL=****
UPSTASH_REDIS_REST_TOKEN=****

Build & Start Commands
npm run build
npm start

The deployed app starts successfully without:
Manual database migrations
Shell access

Runtime configuration steps

✅ Functional Requirements Implemented
Health Check
GET /api/healthz

Returns HTTP 200
Returns JSON
Confirms Redis connectivity

Example:

{ "ok": true }

Create a Paste

POST /api/pastes

Validates input

Returns unique paste ID and shareable URL
Example request:

{
  "content": "Hello World",
  "ttl_seconds": 60,
  "max_views": 2
}

-->Fetch a Paste (API)
GET /api/pastes/:id
Returns content, remaining views, and expiry time
Increments view count per successful fetch
Returns 404 when expired or view limit exceeded

-->View a Paste (HTML)
GET /p/:id
Renders paste content safely (no script execution)
Returns 404 for unavailable pastes

-->Deterministic Time Testing

If TEST_MODE=1 is set:
Uses x-test-now-ms header as the current time for expiry logic
Falls back to system time if header is absent

🧪 Automated Test Compatibility

The application is designed to pass all automated checks, including:
TTL expiry
View limits
Combined constraints
Correct HTTP status codes
Valid JSON responses
No negative remaining view counts
No global mutable server state

🧠 Notable Design Decisions

Used Redis atomic operations to prevent race conditions under concurrent access
Avoided in-memory storage to ensure serverless safety
Structured API routes using Next.js App Router
Clear separation of validation, time logic, and persistence

✅ Repository & Code Quality Compliance

README.md present at root
No hardcoded localhost URLs
No secrets committed
Uses standard install/start commands
Serverless-safe persistence
Source code included (not only build artifacts)
