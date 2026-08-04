"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Showcase data — dense code to fill full-height editor ─────────────────────
const SHOWCASES = [
  {
    id: "web",
    file: "dashboard.tsx",
    label: "Web Platform",
    accent: "#7C3AED",
    stack: ["React", "Next.js", "Node.js", "TypeScript"],
    status: { text: "Deployed to production", color: "#22c55e" },
    tree: [
      { name: "src/", dir: true, depth: 0 },
      { name: "app/", dir: true, depth: 1 },
      { name: "dashboard.tsx", dir: false, depth: 2, active: true },
      { name: "layout.tsx", dir: false, depth: 2 },
      { name: "page.tsx", dir: false, depth: 2 },
      { name: "components/", dir: true, depth: 1 },
      { name: "Analytics.tsx", dir: false, depth: 2 },
      { name: "Sidebar.tsx", dir: false, depth: 2 },
      { name: "DataTable.tsx", dir: false, depth: 2 },
      { name: "hooks/", dir: true, depth: 1 },
      { name: "useMetrics.ts", dir: false, depth: 2 },
      { name: "useSession.ts", dir: false, depth: 2 },
      { name: "lib/", dir: true, depth: 1 },
      { name: "db.ts", dir: false, depth: 2 },
      { name: "auth.ts", dir: false, depth: 2 },
    ],
    lines: [
      [{ t: `import `, c: "#C792EA" }, { t: `{ Suspense } `, c: "#89DDFF" }, { t: `from `, c: "#C792EA" }, { t: `"react"`, c: "#C3E88D" }],
      [{ t: `import `, c: "#C792EA" }, { t: `{ useMetrics } `, c: "#89DDFF" }, { t: `from `, c: "#C792EA" }, { t: `"@/hooks/useMetrics"`, c: "#C3E88D" }],
      [{ t: `import `, c: "#C792EA" }, { t: `Analytics `, c: "#89DDFF" }, { t: `from `, c: "#C792EA" }, { t: `"@/components/Analytics"`, c: "#C3E88D" }],
      [{ t: `import `, c: "#C792EA" }, { t: `Sidebar `, c: "#89DDFF" }, { t: `from `, c: "#C792EA" }, { t: `"@/components/Sidebar"`, c: "#C3E88D" }],
      [{ t: `import `, c: "#C792EA" }, { t: `DataTable `, c: "#89DDFF" }, { t: `from `, c: "#C792EA" }, { t: `"@/components/DataTable"`, c: "#C3E88D" }],
      [{ t: ``, c: "" }],
      [{ t: `export default `, c: "#C792EA" }, { t: `function `, c: "#82AAFF" }, { t: `Dashboard() {`, c: "#FFCB6B" }],
      [{ t: `  const `, c: "#C792EA" }, { t: `{ data, loading, error } `, c: "#89DDFF" }, { t: `= `, c: "#C792EA" }, { t: `useMetrics()`, c: "#82AAFF" }],
      [{ t: ``, c: "" }],
      [{ t: `  if `, c: "#C792EA" }, { t: `(loading) `, c: "#89DDFF" }, { t: `return `, c: "#C792EA" }, { t: `<Skeleton />`, c: "#F07178" }],
      [{ t: `  if `, c: "#C792EA" }, { t: `(error) `, c: "#89DDFF" }, { t: `return `, c: "#C792EA" }, { t: `<ErrorState msg={error} />`, c: "#F07178" }],
      [{ t: ``, c: "" }],
      [{ t: `  return `, c: "#C792EA" }, { t: `(`, c: "#89DDFF" }],
      [{ t: `    <div `, c: "#F07178" }, { t: `className`, c: "#C3E88D" }, { t: `="flex h-screen overflow-hidden"`, c: "#C3E88D" }, { t: `>`, c: "#F07178" }],
      [{ t: `      <Sidebar `, c: "#F07178" }, { t: `user`, c: "#C3E88D" }, { t: `={data.user}`, c: "#89DDFF" }],
      [{ t: `               `, c: "" }, { t: `nav`, c: "#C3E88D" }, { t: `={data.navigation} `, c: "#89DDFF" }, { t: `/>`, c: "#F07178" }],
      [{ t: `      <main `, c: "#F07178" }, { t: `className`, c: "#C3E88D" }, { t: `="flex-1 overflow-y-auto"`, c: "#C3E88D" }, { t: `>`, c: "#F07178" }],
      [{ t: `        <Suspense `, c: "#F07178" }, { t: `fallback`, c: "#C3E88D" }, { t: `={<Loading />}`, c: "#89DDFF" }, { t: `>`, c: "#F07178" }],
      [{ t: `          <Analytics `, c: "#F07178" }, { t: `data`, c: "#C3E88D" }, { t: `={data.metrics}`, c: "#89DDFF" }],
      [{ t: `                     `, c: "" }, { t: `period`, c: "#C3E88D" }, { t: `="30d" `, c: "#C3E88D" }, { t: `/>`, c: "#F07178" }],
      [{ t: `          <DataTable `, c: "#F07178" }, { t: `rows`, c: "#C3E88D" }, { t: `={data.rows}`, c: "#89DDFF" }, { t: ` />`, c: "#F07178" }],
      [{ t: `        </Suspense>`, c: "#F07178" }],
      [{ t: `      </main>`, c: "#F07178" }],
      [{ t: `    </div>`, c: "#F07178" }],
      [{ t: `  )`, c: "#89DDFF" }],
      [{ t: `}`, c: "#C792EA" }],
    ],
  },
  {
    id: "ai",
    file: "classifier.py",
    label: "AI Integration",
    accent: "#06B6D4",
    stack: ["Python", "OpenAI", "FastAPI", "Docker"],
    status: { text: "Live · 97% accuracy", color: "#06B6D4" },
    tree: [
      { name: "src/", dir: true, depth: 0 },
      { name: "classifier.py", dir: false, depth: 1, active: true },
      { name: "model.py", dir: false, depth: 1 },
      { name: "embeddings.py", dir: false, depth: 1 },
      { name: "routes/", dir: true, depth: 1 },
      { name: "api.py", dir: false, depth: 2 },
      { name: "health.py", dir: false, depth: 2 },
      { name: "tests/", dir: true, depth: 1 },
      { name: "test_classifier.py", dir: false, depth: 2 },
      { name: "test_model.py", dir: false, depth: 2 },
      { name: "Dockerfile", dir: false, depth: 0 },
      { name: "requirements.txt", dir: false, depth: 0 },
      { name: "config.yaml", dir: false, depth: 0 },
      { name: ".env.example", dir: false, depth: 0 },
      { name: "pyproject.toml", dir: false, depth: 0 },
    ],
    lines: [
      [{ t: `from `, c: "#C792EA" }, { t: `dataclasses `, c: "#89DDFF" }, { t: `import `, c: "#C792EA" }, { t: `dataclass`, c: "#89DDFF" }],
      [{ t: `from `, c: "#C792EA" }, { t: `fastapi `, c: "#89DDFF" }, { t: `import `, c: "#C792EA" }, { t: `FastAPI, HTTPException`, c: "#89DDFF" }],
      [{ t: `from `, c: "#C792EA" }, { t: `openai `, c: "#89DDFF" }, { t: `import `, c: "#C792EA" }, { t: `AsyncOpenAI`, c: "#89DDFF" }],
      [{ t: `from `, c: "#C792EA" }, { t: `.model `, c: "#89DDFF" }, { t: `import `, c: "#C792EA" }, { t: `ClassifierModel, Intent`, c: "#89DDFF" }],
      [{ t: ``, c: "" }],
      [{ t: `@dataclass`, c: "#82AAFF" }],
      [{ t: `class `, c: "#C792EA" }, { t: `ClassifyResult`, c: "#FFCB6B" }, { t: `:`, c: "#89DDFF" }],
      [{ t: `    intent: `, c: "#89DDFF" }, { t: `Intent`, c: "#FFCB6B" }],
      [{ t: `    confidence: `, c: "#89DDFF" }, { t: `float`, c: "#FFCB6B" }],
      [{ t: `    action: `, c: "#89DDFF" }, { t: `str`, c: "#FFCB6B" }],
      [{ t: ``, c: "" }],
      [{ t: `app `, c: "#89DDFF" }, { t: `= `, c: "#C792EA" }, { t: `FastAPI(title=`, c: "#82AAFF" }, { t: `"Classifier API"`, c: "#C3E88D" }, { t: `)`, c: "#82AAFF" }],
      [{ t: `model `, c: "#89DDFF" }, { t: `= `, c: "#C792EA" }, { t: `ClassifierModel(`, c: "#82AAFF" }],
      [{ t: `    base=`, c: "#C3E88D" }, { t: `"gpt-4o-mini"`, c: "#C3E88D" }, { t: `, threshold=`, c: "#89DDFF" }, { t: `0.85`, c: "#FFCB6B" }],
      [{ t: `)`, c: "#82AAFF" }],
      [{ t: ``, c: "" }],
      [{ t: `@app.post`, c: "#82AAFF" }, { t: `("/classify"`, c: "#C3E88D" }, { t: `, response_model=`, c: "#89DDFF" }, { t: `ClassifyResult`, c: "#FFCB6B" }, { t: `)`, c: "#82AAFF" }],
      [{ t: `async def `, c: "#C792EA" }, { t: `classify`, c: "#82AAFF" }, { t: `(text: `, c: "#89DDFF" }, { t: `str`, c: "#FFCB6B" }, { t: `) -> `, c: "#89DDFF" }, { t: `ClassifyResult`, c: "#FFCB6B" }, { t: `:`, c: "#89DDFF" }],
      [{ t: `    result `, c: "#89DDFF" }, { t: `= await `, c: "#C792EA" }, { t: `model.run`, c: "#82AAFF" }, { t: `(text)`, c: "#89DDFF" }],
      [{ t: `    if `, c: "#C792EA" }, { t: `result.confidence < `, c: "#89DDFF" }, { t: `0.7`, c: "#FFCB6B" }, { t: `:`, c: "#89DDFF" }],
      [{ t: `        raise `, c: "#C792EA" }, { t: `HTTPException`, c: "#FFCB6B" }, { t: `(`, c: "#89DDFF" }, { t: `status_code=`, c: "#C3E88D" }, { t: `422`, c: "#FFCB6B" }, { t: `)`, c: "#89DDFF" }],
      [{ t: `    return `, c: "#C792EA" }, { t: `result`, c: "#89DDFF" }],
      [{ t: ``, c: "" }],
      [{ t: `# `, c: "#546E7A" }, { t: `billing_query`, c: "#89DDFF" }, { t: ` · conf: `, c: "#546E7A" }, { t: `0.97`, c: "#FFCB6B" }, { t: ` · action: route_finance`, c: "#546E7A" }],
    ],
  },
  {
    id: "mobile",
    file: "HomeScreen.tsx",
    label: "Mobile App",
    accent: "#A855F7",
    stack: ["React Native", "TypeScript", "iOS", "Android"],
    status: { text: "App Store · Play Store", color: "#A855F7" },
    tree: [
      { name: "src/", dir: true, depth: 0 },
      { name: "screens/", dir: true, depth: 1 },
      { name: "HomeScreen.tsx", dir: false, depth: 2, active: true },
      { name: "ProfileScreen.tsx", dir: false, depth: 2 },
      { name: "SearchScreen.tsx", dir: false, depth: 2 },
      { name: "navigation/", dir: true, depth: 1 },
      { name: "RootStack.tsx", dir: false, depth: 2 },
      { name: "TabNavigator.tsx", dir: false, depth: 2 },
      { name: "components/", dir: true, depth: 1 },
      { name: "FeedCard.tsx", dir: false, depth: 2 },
      { name: "Header.tsx", dir: false, depth: 2 },
      { name: "store/", dir: true, depth: 1 },
      { name: "feedSlice.ts", dir: false, depth: 2 },
      { name: "userSlice.ts", dir: false, depth: 2 },
      { name: "App.tsx", dir: false, depth: 0 },
    ],
    lines: [
      [{ t: `import `, c: "#C792EA" }, { t: `React, { useCallback } `, c: "#89DDFF" }, { t: `from `, c: "#C792EA" }, { t: `"react"`, c: "#C3E88D" }],
      [{ t: `import `, c: "#C792EA" }, { t: `{ View, FlatList, RefreshControl } `, c: "#89DDFF" }, { t: `from `, c: "#C792EA" }, { t: `"react-native"`, c: "#C3E88D" }],
      [{ t: `import `, c: "#C792EA" }, { t: `{ useAppDispatch, useAppSelector } `, c: "#89DDFF" }, { t: `from `, c: "#C792EA" }, { t: `"@/store"`, c: "#C3E88D" }],
      [{ t: `import `, c: "#C792EA" }, { t: `{ fetchFeed } `, c: "#89DDFF" }, { t: `from `, c: "#C792EA" }, { t: `"@/store/feedSlice"`, c: "#C3E88D" }],
      [{ t: `import `, c: "#C792EA" }, { t: `FeedCard `, c: "#89DDFF" }, { t: `from `, c: "#C792EA" }, { t: `"@/components/FeedCard"`, c: "#C3E88D" }],
      [{ t: ``, c: "" }],
      [{ t: `export default `, c: "#C792EA" }, { t: `function `, c: "#82AAFF" }, { t: `HomeScreen() {`, c: "#FFCB6B" }],
      [{ t: `  const dispatch `, c: "#89DDFF" }, { t: `= `, c: "#C792EA" }, { t: `useAppDispatch()`, c: "#82AAFF" }],
      [{ t: `  const `, c: "#C792EA" }, { t: `{ items, loading } `, c: "#89DDFF" }, { t: `= `, c: "#C792EA" }, { t: `useAppSelector`, c: "#82AAFF" }, { t: `(`, c: "#89DDFF" }],
      [{ t: `    (s) => s.feed`, c: "#89DDFF" }],
      [{ t: `  )`, c: "#89DDFF" }],
      [{ t: ``, c: "" }],
      [{ t: `  const onRefresh `, c: "#89DDFF" }, { t: `= `, c: "#C792EA" }, { t: `useCallback`, c: "#82AAFF" }, { t: `(() => {`, c: "#89DDFF" }],
      [{ t: `    dispatch(`, c: "#82AAFF" }, { t: `fetchFeed()`, c: "#89DDFF" }, { t: `)`, c: "#82AAFF" }],
      [{ t: `  }, [dispatch])`, c: "#89DDFF" }],
      [{ t: ``, c: "" }],
      [{ t: `  return `, c: "#C792EA" }, { t: `(`, c: "#89DDFF" }],
      [{ t: `    <View `, c: "#F07178" }, { t: `style`, c: "#C3E88D" }, { t: `={styles.container}`, c: "#89DDFF" }, { t: `>`, c: "#F07178" }],
      [{ t: `      <FlatList`, c: "#F07178" }],
      [{ t: `        data`, c: "#C3E88D" }, { t: `={items}`, c: "#89DDFF" }],
      [{ t: `        keyExtractor`, c: "#C3E88D" }, { t: `={(item) => item.id}`, c: "#89DDFF" }],
      [{ t: `        renderItem`, c: "#C3E88D" }, { t: `={({ item }) => <FeedCard post={item} />}`, c: "#89DDFF" }],
      [{ t: `        refreshControl`, c: "#C3E88D" }, { t: `={`, c: "#89DDFF" }],
      [{ t: `          <RefreshControl `, c: "#F07178" }, { t: `refreshing`, c: "#C3E88D" }, { t: `={loading} `, c: "#89DDFF" }, { t: `onRefresh`, c: "#C3E88D" }, { t: `={onRefresh} />`, c: "#89DDFF" }],
      [{ t: `        }`, c: "#89DDFF" }, { t: `}`, c: "#89DDFF" }],
      [{ t: `      />`, c: "#F07178" }],
    ],
  },
  {
    id: "cloud",
    file: "pipeline.yml",
    label: "Cloud & DevOps",
    accent: "#0891B2",
    stack: ["AWS", "Docker", "Kubernetes", "GitHub Actions"],
    status: { text: "Zero-downtime deploy", color: "#22c55e" },
    tree: [
      { name: ".github/", dir: true, depth: 0 },
      { name: "workflows/", dir: true, depth: 1 },
      { name: "pipeline.yml", dir: false, depth: 2, active: true },
      { name: "release.yml", dir: false, depth: 2 },
      { name: "k8s/", dir: true, depth: 0 },
      { name: "deployment.yaml", dir: false, depth: 1 },
      { name: "service.yaml", dir: false, depth: 1 },
      { name: "hpa.yaml", dir: false, depth: 1 },
      { name: "ingress.yaml", dir: false, depth: 1 },
      { name: "Dockerfile", dir: false, depth: 0 },
      { name: ".dockerignore", dir: false, depth: 0 },
      { name: "terraform/", dir: true, depth: 0 },
      { name: "main.tf", dir: false, depth: 1 },
      { name: "variables.tf", dir: false, depth: 1 },
      { name: "deploy.sh", dir: false, depth: 0 },
    ],
    lines: [
      [{ t: `name`, c: "#C792EA" }, { t: `: CI / CD Pipeline`, c: "#C3E88D" }],
      [{ t: `on`, c: "#C792EA" }, { t: `:`, c: "#89DDFF" }],
      [{ t: `  push`, c: "#FFCB6B" }, { t: `: { branches: `, c: "#89DDFF" }, { t: `["main"] `, c: "#C3E88D" }, { t: `}`, c: "#89DDFF" }],
      [{ t: ``, c: "" }],
      [{ t: `env`, c: "#C792EA" }, { t: `:`, c: "#89DDFF" }],
      [{ t: `  REGISTRY`, c: "#C3E88D" }, { t: `: ghcr.io/dualtechlabs`, c: "#89DDFF" }],
      [{ t: `  CLUSTER`, c: "#C3E88D" }, { t: `: prod-us-east-1`, c: "#89DDFF" }],
      [{ t: ``, c: "" }],
      [{ t: `jobs`, c: "#C792EA" }, { t: `:`, c: "#89DDFF" }],
      [{ t: `  build`, c: "#FFCB6B" }, { t: `:             `, c: "" }, { t: `# `, c: "#546E7A" }, { t: `✓ 38s`, c: "#22c55e" }],
      [{ t: `    runs-on`, c: "#C3E88D" }, { t: `: ubuntu-latest`, c: "#89DDFF" }],
      [{ t: `    steps`, c: "#C3E88D" }, { t: `: [checkout, setup, lint, build]`, c: "#89DDFF" }],
      [{ t: ``, c: "" }],
      [{ t: `  test`, c: "#FFCB6B" }, { t: `:             `, c: "" }, { t: `# `, c: "#546E7A" }, { t: `✓ 142 passed`, c: "#22c55e" }],
      [{ t: `    needs`, c: "#C3E88D" }, { t: `: [build]`, c: "#89DDFF" }],
      [{ t: `    steps`, c: "#C3E88D" }, { t: `: [unit, integration, e2e]`, c: "#89DDFF" }],
      [{ t: ``, c: "" }],
      [{ t: `  push`, c: "#FFCB6B" }, { t: `:             `, c: "" }, { t: `# `, c: "#546E7A" }, { t: `✓ image pushed`, c: "#22c55e" }],
      [{ t: `    needs`, c: "#C3E88D" }, { t: `: [test]`, c: "#89DDFF" }],
      [{ t: `    steps`, c: "#C3E88D" }, { t: `: [docker-build, docker-push]`, c: "#89DDFF" }],
      [{ t: ``, c: "" }],
      [{ t: `  deploy`, c: "#FFCB6B" }, { t: `:           `, c: "" }, { t: `# `, c: "#546E7A" }, { t: `✓ us-east-1 live`, c: "#22c55e" }],
      [{ t: `    needs`, c: "#C3E88D" }, { t: `: [push]`, c: "#89DDFF" }],
      [{ t: `    strategy`, c: "#C3E88D" }, { t: `: rolling-update`, c: "#89DDFF" }],
      [{ t: `    steps`, c: "#C3E88D" }, { t: `: [k8s-rollout, health-check, notify]`, c: "#89DDFF" }],
    ],
  },
] as const;

type Token = { t: string; c: string };

// ── Code line — opacity-only (compositor-safe, zero layout work) ──────────────
function CodeLine({ tokens, delay }: { tokens: readonly Token[]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay }}
      className="flex min-h-[1.85em]"
    >
      {tokens.map((tok, i) =>
        tok.t ? (
          <span key={i} style={{ color: tok.c, fontFamily: "var(--font-mono)", fontSize: "0.78rem", lineHeight: 1.85, whiteSpace: "pre" }}>
            {tok.t}
          </span>
        ) : <span key={i} style={{ display: "inline-block", minWidth: "1px" }} />
      )}
    </motion.div>
  );
}

// ── Full-hero editor — fills 100% width × height ──────────────────────────────
function EditorBackground({ reduced }: { reduced: boolean }) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  const switchTo = useCallback((i: number) => {
    if (i === idx || fading) return;
    setFading(true);
    setTimeout(() => { setIdx(i); setFading(false); }, 220);
  }, [idx, fading]);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => switchTo((idx + 1) % SHOWCASES.length), 4800);
    return () => clearInterval(id);
  }, [reduced, idx, switchTo]);

  const s = SHOWCASES[idx];

  return (
    <>
      {/* Accent bar */}
      <motion.div
        animate={{ background: `linear-gradient(90deg, ${s.accent} 0%, ${s.accent}55 40%, rgba(255,255,255,0.03) 70%, transparent 100%)` }}
        transition={{ duration: 0.7 }}
        className="h-[2px] w-full shrink-0"
      />

      {/* Chrome */}
      <div
        className="flex shrink-0 items-center justify-between gap-4 px-4 py-2.5 md:px-5 md:py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(2,3,12,0.7)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden>
            {["#FF5F57", "#FFBD2E", "#28C840"].map(c => (
              <div key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
            ))}
          </div>
          <div className="flex items-center gap-1.5 rounded-md px-3 py-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <AnimatePresence mode="wait">
              <motion.span key={s.file} initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -2 }} transition={{ duration: 0.15 }} style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#64748B" }}>
                {s.file}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            <motion.span key={s.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="rounded-full px-2.5 py-0.5 font-sans text-[10px] font-semibold" style={{ background: `${s.accent}18`, color: s.accent, border: `1px solid ${s.accent}28` }}>
              {s.label}
            </motion.span>
          </AnimatePresence>
          {/* Dot nav — inside chrome */}
          <div className="hidden sm:flex items-center gap-1.5">
            {SHOWCASES.map((sc, i) => (
              <button key={sc.id} onClick={() => switchTo(i)} aria-label={sc.label} className="rounded-full transition-all duration-300" style={{ width: i === idx ? "16px" : "5px", height: "5px", background: i === idx ? s.accent : "rgba(255,255,255,0.15)" }} />
            ))}
          </div>
        </div>
      </div>

      {/* Editor body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar: file tree */}
        <div className="hidden md:flex shrink-0 flex-col py-3 overflow-y-auto" style={{ width: "168px", borderRight: "1px solid rgba(255,255,255,0.04)", background: "rgba(2,3,10,0.55)", scrollbarWidth: "none" }}>
          <p className="px-3 pb-2 font-sans text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: "#2D3A4A" }}>Explorer</p>
          <AnimatePresence mode="wait">
            <motion.div key={s.id + "tree"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="flex flex-col gap-0.5 px-1.5">
              {s.tree.map((item, i) => (
                <div key={i} className="flex items-center gap-1 rounded px-1 py-[2px]" style={{ paddingLeft: `${item.depth * 10 + 4}px`, background: "active" in item && item.active ? `${s.accent}18` : "transparent", color: "active" in item && item.active ? s.accent : item.dir ? "#374151" : "#374151" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "active" in item && item.active ? s.accent : item.dir ? "#4B5563" : "#374151", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {"active" in item && item.active ? "▸ " : item.dir ? "▸ " : "  "}{item.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Line numbers */}
        <div className="hidden sm:flex shrink-0 flex-col pt-4 pb-4 select-none overflow-hidden" style={{ width: "44px", textAlign: "right", paddingRight: "12px", borderRight: "1px solid rgba(255,255,255,0.03)", background: "rgba(2,3,10,0.4)" }}>
          {s.lines.map((_, i) => (
            <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", lineHeight: 1.85, color: "rgba(255,255,255,0.1)" }}>{i + 1}</span>
          ))}
        </div>

        {/* Code */}
        <div className="flex-1 overflow-hidden pt-4 pb-4 pl-4 md:pl-5">
          <AnimatePresence mode="wait">
            <motion.div key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
              {s.lines.map((line, i) => (
                <CodeLine key={i} tokens={line} delay={fading ? 0 : i * 0.03} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Status bar */}
      <div
        className="flex shrink-0 items-center justify-between gap-4 px-4 py-1.5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: `linear-gradient(90deg, ${s.accent}28, ${s.accent}10)` }}
      >
        <AnimatePresence mode="wait">
          <motion.div key={s.id + "st"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: s.status.color, boxShadow: `0 0 5px ${s.status.color}` }} />
            <span className="font-sans text-[10px] font-medium" style={{ color: s.status.color }}>{s.status.text}</span>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center gap-3 overflow-hidden">
          {s.stack.map(t => <span key={t} className="font-mono text-[10px] truncate" style={{ color: "rgba(255,255,255,0.2)" }}>{t}</span>)}
        </div>
      </div>
    </>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced    = useReducedMotion();
  const inView     = useInView(sectionRef, { margin: "200px" });

  const fadeUp = (delay = 0) =>
    reduced ? {} : {
      initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 },
      transition: { duration: 0.65, ease, delay },
    };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#050714", height: "100dvh", minHeight: "600px" }}
    >
      {/* ── Full-bleed editor — direct child of section, flex col fills 100% ── */}
      <div
        className="absolute inset-0 z-0 flex flex-col"
        style={{ background: "rgba(5,7,18,0.97)" }}
      >
        {inView && <EditorBackground reduced={!!reduced} />}
      </div>

      {/* ── Layered overlays for text readability ─────────────────────────── */}
      {/* Mobile: uniform dark overlay — vignette alone doesn't cover left side where text sits */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] md:hidden"
        style={{ background: "rgba(5,7,18,0.72)" }}
        aria-hidden
      />
      {/* Radial vignette — darkens right side where text lives on desktop */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "radial-gradient(ellipse 90% 80% at 68% 55%, rgba(5,7,18,0.82) 0%, rgba(5,7,18,0.45) 50%, rgba(5,7,18,0.05) 100%)" }}
        aria-hidden
      />
      {/* Top vignette */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28" style={{ background: "linear-gradient(to bottom, rgba(5,7,18,0.6), transparent)" }} aria-hidden />
      {/* Bottom vignette */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36" style={{ background: "linear-gradient(to top, #050714 10%, rgba(5,7,18,0.5) 60%, transparent)" }} aria-hidden />

      {/* ── Text overlay — right-aligned, minimal ─────────────────────────── */}
      <div className="relative z-10 flex h-full flex-col justify-center dtl-section pb-12 pt-20 md:pb-16 md:pt-24">
        <div className="w-full max-w-[460px] md:ml-auto xl:max-w-[500px]">

          {/* Service tag — tiny ambient label */}
          <motion.div {...fadeUp(0.15)} className="mb-6 flex items-center gap-2">
            <div className="h-px w-6 rounded-full" style={{ background: "linear-gradient(90deg,#7C3AED,#06B6D4)" }} />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#475569" }}>Software Development</span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display font-bold text-white" style={{ fontSize: "clamp(2.2rem, 7vw, 7rem)", lineHeight: 0.93, letterSpacing: "-0.04em" }}>
            {(["Your", "idea,"] as const).map((word, i) => (
              <span key={word} className="block" style={{ overflow: "hidden" }}>
                <motion.span
                  initial={reduced ? undefined : { y: "110%", opacity: 0 }}
                  animate={reduced ? undefined : { y: "0%", opacity: 1 }}
                  transition={{ duration: 0.82, ease, delay: reduced ? 0 : 0.2 + i * 0.1 }}
                  style={{ display: "block" }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="block" style={{ overflow: "hidden" }}>
              <motion.span
                initial={reduced ? undefined : { y: "110%", opacity: 0 }}
                animate={reduced ? undefined : { y: "0%", opacity: 1 }}
                transition={{ duration: 0.82, ease, delay: reduced ? 0 : 0.38 }}
                style={{ display: "block" }}
              >
                <span className="dtl-gradient-text">built </span>right.
              </motion.span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p {...fadeUp(0.6)} className="mt-5 max-w-[360px] text-sm leading-[1.7] text-slate-400 md:text-[0.95rem]">
            Design, engineering, and shipping —{" "}
            <span className="text-slate-300">one team, start to finish.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.72)} className="mt-7 flex flex-wrap items-center gap-3">
            <MagneticButton as="a" href="/contact" className="dtl-cta-primary" strength={0.35}>
              Let&apos;s Talk
            </MagneticButton>
            <MagneticButton as="a" href="#services" className="dtl-cta-secondary" strength={0.28}>
              Our Services
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-hidden
      >
        <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-700">Scroll</span>
        <div className="relative h-8 w-px overflow-hidden rounded-full bg-white/[0.06]">
          <div className="absolute inset-x-0 h-1/2 rounded-full" style={{ background: "linear-gradient(to bottom, transparent, #7C3AED, #06B6D4, transparent)", animation: "scrollDot 1.7s cubic-bezier(0.4,0,0.6,1) infinite" }} />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
