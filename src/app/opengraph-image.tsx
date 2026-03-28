import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "DualTech Labs — Custom software for fintech, public sector, and AI";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          background: "linear-gradient(155deg, #020617 0%, #0a0f1c 42%, #0f172a 100%)",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 4,
              background: "linear-gradient(90deg, #22d3ee, #38bdf8)",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              fontSize: 58,
              fontWeight: 800,
              color: "#f8fafc",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            DualTech Labs
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              color: "#94a3b8",
              maxWidth: 780,
              lineHeight: 1.4,
            }}
          >
            Senior engineers shipping payments, government services, AI products, and large web apps. Clear timelines, code you can own.
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#22d3ee", fontWeight: 600 }}>dualtechlabs.com</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
