import { ImageResponse } from "next/og";
import { OG_ALT, OG_SIZE, OgImageMarkup } from "@/lib/og-image-shared";

export const runtime = "edge";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

/** Large summary card image for X/Twitter, Slack, and clients that prefer twitter:image. */
export default function TwitterImage() {
  return new ImageResponse(<OgImageMarkup />, { ...OG_SIZE });
}
