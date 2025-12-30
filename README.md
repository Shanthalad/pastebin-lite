# Pastebin Lite

A small Pastebin-like application built as a take-home assignment.

## Features
- Create text pastes
- Shareable URLs
- Optional TTL and view limits
- API and HTML views
- Deterministic time support for testing

## Tech Stack
- Next.js (App Router)
- Node.js
- Vercel KV (Redis)

## Persistence Layer
Vercel KV (Redis) is used to persist pastes across serverless requests.

## Running Locally
```bash
npm install
npm run dev
