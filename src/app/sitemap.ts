import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    { url: `${base}/services/custom-software-development`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/ai-development`,             lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/cloud-devops`,               lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/mobile-app-development`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/ui-ux-design`,               lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/web-development`,            lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/digital-transformation`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/fintech-development`,        lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/api-development`,            lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/cybersecurity`,              lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/qa-testing`,                 lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/it-consulting`,              lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
}
