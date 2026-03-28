/**
 * Canonical site origin for Open Graph, metadataBase, and absolute URLs.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://dualtechlabs.com).
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (typeof raw === "string" && /^https?:\/\//i.test(raw.trim())) {
    return raw.trim().replace(/\/$/, "");
  }
  return "https://dualtechlabs.com";
}
