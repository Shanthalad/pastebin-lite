// lib/validate.js
export function validateCreate(data) {
  if (!data.content || typeof data.content !== "string") {
    throw new Error("Content is required and must be a string.");
  }
  if (data.ttl_seconds && typeof data.ttl_seconds !== "number") {
    throw new Error("ttl_seconds must be a number.");
  }
  if (data.max_views && typeof data.max_views !== "number") {
    throw new Error("max_views must be a number.");
  }
  return true;
}
