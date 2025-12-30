import { kv } from "@vercel/kv";
import { nowMs } from "@/lib/time";

export default async function Page({ params }) {
  const pasteKey = `paste:${params.id}`;
  const paste = await kv.get(pasteKey);

  if (!paste) return <p>Paste not found</p>;

  // Check if paste has expired
  const expired = paste.expires_at && nowMs() > paste.expires_at;
  if (expired) {
    await kv.del(pasteKey); // Remove expired paste
    return <p>Paste expired</p>;
  }

  // Check max views
  if (paste.max_views) {
    paste.views = (paste.views || 0) + 1;

    if (paste.views >= paste.max_views) {
      await kv.del(pasteKey); // Delete paste if max views reached
    } else {
      await kv.set(pasteKey, paste); // Update view count
    }
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Paste {params.id}</h1>
      <pre
        style={{
          background: "#f4f4f4",
          padding: "1rem",
          borderRadius: "8px",
          whiteSpace: "pre-wrap",
        }}
      >
        {paste.content}
      </pre>
      {paste.max_views && (
        <p>
          Views: {paste.views ?? 0} / {paste.max_views}
        </p>
      )}
      {paste.expires_at && (
        <p>
          Expires at: {new Date(paste.expires_at).toLocaleString()}
        </p>
      )}
    </div>
  );
}

