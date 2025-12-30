import { kv } from "@vercel/kv";
import { validateCreate } from "@/lib/validate";

export async function GET(req, { params }) {
  // Access params inside the function only
  const pasteKey = `paste:${params.id}`;

  const paste = await kv.get(pasteKey);

  if (!paste) {
    return new Response(JSON.stringify({ error: "Paste not found" }), { status: 404 });
  }

  return new Response(JSON.stringify({
    content: paste.content,
    remaining_views: paste.max_views ? paste.max_views - 1 : null,
    expires_at: paste.ttl_seconds ? new Date(paste.created_at + paste.ttl_seconds * 1000).toISOString() : null
  }), { status: 200 });
}

export async function POST(req) {
  // Only POST logic for creating pastes
}
