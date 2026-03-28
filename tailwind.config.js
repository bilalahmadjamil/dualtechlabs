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
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-sm": ["2.25rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display-md": ["3rem", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "800" }],
        "display-lg": ["3.75rem", { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "800" }],
        "display-xl": ["4.5rem", { lineHeight: "0.92", letterSpacing: "-0.04em", fontWeight: "800" }],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: {
          DEFAULT: "#22d3ee",
          foreground: "#020617",
        },
        portal: {
          void: "#020617",
          surface: "#0a0f1c",
          elevated: "#0f172a",
          line: "rgba(148, 163, 184, 0.12)",
          muted: "#94a3b8",
          subtle: "#64748b",
          primary: "#22d3ee",
          primaryDim: "rgba(34, 211, 238, 0.15)",
          accent: "#38bdf8",
          violet: "#818cf8",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "nav-shine":
          "linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.08) 50%, transparent 100%)",
        "portal-mesh":
          "radial-gradient(ellipse 90% 60% at 50% -30%, rgba(34, 211, 238, 0.14), transparent 55%), radial-gradient(ellipse 70% 50% at 100% 20%, rgba(56, 189, 248, 0.08), transparent 50%), radial-gradient(ellipse 60% 45% at 0% 90%, rgba(14, 165, 233, 0.06), transparent 45%)",
        "text-gradient":
          "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 40%, #22d3ee 100%)",
        "text-gradient-strong":
          "linear-gradient(90deg, #22d3ee 0%, #38bdf8 45%, #a5f3fc 100%)",
      },
      boxShadow: {
        nav: "0 4px 24px -4px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(148, 163, 184, 0.06)",
        "nav-scrolled":
          "0 8px 32px -8px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(34, 211, 238, 0.14)",
        cta: "0 0 0 1px rgba(34, 211, 238, 0.4), 0 8px 32px -8px rgba(14, 165, 233, 0.45)",
        card: "0 4px 24px -6px rgba(0, 0, 0, 0.35), inset 0 1px 0 0 rgba(255,255,255,0.04)",
        "card-hover":
          "0 12px 40px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(34, 211, 238, 0.2), inset 0 1px 0 0 rgba(255,255,255,0.06)",
        glow: "0 0 40px -8px rgba(34, 211, 238, 0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
