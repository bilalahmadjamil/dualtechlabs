/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "ui-sans-serif", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-sm": ["2.25rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display-md": ["3rem", { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "800" }],
        "display-lg": ["3.75rem", { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "800" }],
        "display-xl": ["4.5rem", { lineHeight: "0.92", letterSpacing: "-0.04em", fontWeight: "800" }],
        "display-2xl": ["6rem", { lineHeight: "0.88", letterSpacing: "-0.04em", fontWeight: "800" }],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dtl: {
          void:      "#050714",
          surface:   "#0A0F1E",
          raise:     "#080c1e",
          border:    "rgba(255,255,255,0.07)",
          purple:    "#7C3AED",
          violet:    "#A855F7",
          cyan:      "#06B6D4",
          "cyan-light": "#22D3EE",
          muted:     "#64748B",
          subtle:    "#94A3B8",
          text:      "#F8FAFC",
          /* Light section palette */
          light:     "#F8FAFC",
          "off-white": "#F1F5F9",
          "slate-200": "#E2E8F0",
          "slate-600": "#475569",
          "slate-700": "#334155",
          "slate-900": "#0F172A",
        },
        // keep portal aliases for gradual migration
        portal: {
          void:       "#050714",
          surface:    "#0A0F1E",
          elevated:   "#0f172a",
          line:       "rgba(148, 163, 184, 0.12)",
          muted:      "#94a3b8",
          subtle:     "#64748b",
          primary:    "#06B6D4",
          primaryDim: "rgba(6, 182, 212, 0.15)",
          accent:     "#A855F7",
          violet:     "#7C3AED",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "dtl-gradient":      "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
        "dtl-gradient-r":    "linear-gradient(90deg, #7C3AED 0%, #06B6D4 100%)",
        "dtl-gradient-brand":"linear-gradient(135deg, #3B0764 0%, #6D28D9 30%, #7C3AED 55%, #0891B2 100%)",
        "dtl-glow-purple": "radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.18) 0%, transparent 65%)",
        "dtl-glow-cyan":   "radial-gradient(ellipse at 70% 50%, rgba(6,182,212,0.14) 0%, transparent 65%)",
        "dtl-mesh":        "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(124,58,237,0.12) 0%, transparent 55%), radial-gradient(ellipse 70% 55% at 75% 55%, rgba(6,182,212,0.10) 0%, transparent 55%)",
        "portal-mesh":     "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(124,58,237,0.12) 0%, transparent 55%), radial-gradient(ellipse 70% 55% at 75% 55%, rgba(6,182,212,0.10) 0%, transparent 55%)",
        "nav-shine":       "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.08) 50%, transparent 100%)",
        "text-gradient":   "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 40%, #06B6D4 100%)",
        "text-gradient-brand": "linear-gradient(135deg, #7C3AED 0%, #A855F7 40%, #06B6D4 100%)",
      },
      boxShadow: {
        nav:          "0 4px 24px -4px rgba(0,0,0,0.45), 0 0 0 1px rgba(148,163,184,0.06)",
        "nav-scrolled":"0 8px 32px -8px rgba(0,0,0,0.55), 0 0 0 1px rgba(124,58,237,0.14)",
        cta:          "0 0 0 1px rgba(124,58,237,0.4), 0 8px 32px -8px rgba(124,58,237,0.45)",
        "cta-cyan":   "0 0 0 1px rgba(6,182,212,0.4), 0 8px 32px -8px rgba(6,182,212,0.35)",
        card:         "0 4px 24px -6px rgba(0,0,0,0.35), inset 0 1px 0 0 rgba(255,255,255,0.04)",
        "card-hover": "0 12px 40px -12px rgba(124,58,237,0.25), 0 0 0 1px rgba(124,58,237,0.2), inset 0 1px 0 0 rgba(255,255,255,0.06)",
        "glow-purple":"0 0 48px -8px rgba(124,58,237,0.4)",
        "glow-cyan":  "0 0 48px -8px rgba(6,182,212,0.3)",
        glow:         "0 0 40px -8px rgba(6,182,212,0.3)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "marquee-left":  "marqueeLeft 28s linear infinite",
        "marquee-right": "marqueeRight 32s linear infinite",
        "pulse-slow":    "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-up":       "fadeUp 0.7s ease-out forwards",
        "glow-pulse":    "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        marqueeLeft: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%":   { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%":      { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
