// app/api/pastes/route.js
import { kv } from "@vercel/kv";
import { validateCreate } from "@/lib/validate";
import { randomUUID } from "crypto";
import { nowMs } from "@/lib/time";

export async function POST(req) {
  try {
    const body = await req.json();

    // Validate data
    validateCreate(body);

    const id = randomUUID();
    const pasteKey = `paste:${id}`;
    const pasteData = {
      content: body.content,
      ttl_seconds: body.ttl_seconds || 60,
      max_views: body.max_views || 1,
      created_at: nowMs(),
    };

    // Save to KV (or memory)
    await kv.set(pasteKey, pasteData, { ex: pasteData.ttl_seconds });

    return new Response(JSON.stringify({ id, ...pasteData }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
