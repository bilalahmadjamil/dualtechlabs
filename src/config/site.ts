/**
 * Canonical site origin for Open Graph, metadataBase, sitemap, and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in production to your preferred host (include www if that is canonical).
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (typeof raw === "string" && /^https?:\/\//i.test(raw.trim())) {
    return raw.trim().replace(/\/$/, "");
  }
  return "https://www.dualtechlabs.com";
}
