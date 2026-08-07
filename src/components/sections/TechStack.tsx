"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import {
  // Frontend
  siReact, siNextdotjs, siVuedotjs, siAngular, siSvelte, siAstro, siRemix,
  siTypescript, siJavascript, siHtml5, siCss, siTailwindcss, siSass, siVite, siWebpack,
  // Backend
  siNodedotjs, siDeno, siBun, siExpress, siFastify, siNestjs, siDjango, siFastapi,
  siGraphql, siGo, siRust, siPython, siPhp, siRuby, siElixir, siLaravel, siSpring, siDotnet, siCplusplus,
  // Databases
  siPostgresql, siMysql, siMongodb, siRedis, siSqlite, siSupabase, siFirebase,
  siElasticsearch, siNeo4j, siClickhouse, siCockroachlabs, siPlanetscale, siNeon,
  siPrisma, siDrizzle, siTypeorm, siHasura,
  // Cloud & Infra
  siGooglecloud, siCloudflare, siDigitalocean, siHetzner, siOvh,
  siDocker, siKubernetes, siHelm, siTerraform, siAnsible, siNginx, siCaddy, siVagrant, siPodman,
  // DevOps & CI/CD
  siGithub, siGitlab, siBitbucket, siGit, siGithubactions, siCircleci, siJenkins, siTravisci,
  siVercel, siNetlify, siRender, siRailway,
  // AI & ML
  siAnthropic, siGooglegemini, siHuggingface, siLangchain, siOllama, siPerplexity,
  siTensorflow, siPytorch, siKeras, siScikitlearn, siApachekafka, siApachespark, siApacheairflow,
  siGithubcopilot, siReplit,
  // Mobile & Desktop
  siFlutter, siDart, siSwift, siKotlin, siElectron, siTauri, siWebassembly,
  // Design, CMS, Payments & Tooling
  siStripe, siShopify, siWordpress, siFigma, siSketch, siFramer, siWebflow,
  siStrapi, siContentful, siSanity,
  // Testing & Observability
  siJest, siVitest, siCypress, siStorybook, siSentry, siGrafana, siPrometheus, siDatadog,
  // Productivity
  siNotion, siLinear, siJira, siZoom, siConfluence, siAsana, siTrello,
} from "simple-icons";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Icon registry ────────────────────────────────────────────────────────────
const TECH_ICONS: Record<string, { path: string; hex: string }> = {
  // Frontend
  "React":         { path: siReact.path,        hex: siReact.hex },
  "Next.js":       { path: siNextdotjs.path,    hex: "000000" },
  "Vue.js":        { path: siVuedotjs.path,     hex: siVuedotjs.hex },
  "Angular":       { path: siAngular.path,      hex: "DD0031" },
  "Svelte":        { path: siSvelte.path,       hex: siSvelte.hex },
  "Astro":         { path: siAstro.path,        hex: "BC52EE" },
  "Remix":         { path: siRemix.path,        hex: "000000" },
  "TypeScript":    { path: siTypescript.path,   hex: siTypescript.hex },
  "JavaScript":    { path: siJavascript.path,   hex: "F7DF1E" },
  "HTML5":         { path: siHtml5.path,        hex: siHtml5.hex },
  "CSS":           { path: siCss.path,          hex: siCss.hex },
  "Tailwind CSS":  { path: siTailwindcss.path,  hex: siTailwindcss.hex },
  "Sass":          { path: siSass.path,         hex: siSass.hex },
  "Vite":          { path: siVite.path,         hex: "9135FF" },
  "Webpack":       { path: siWebpack.path,      hex: siWebpack.hex },
  // Backend
  "Node.js":       { path: siNodedotjs.path,    hex: siNodedotjs.hex },
  "Deno":          { path: siDeno.path,         hex: "000000" },
  "Bun":           { path: siBun.path,          hex: "000000" },
  "Express":       { path: siExpress.path,      hex: "000000" },
  "Fastify":       { path: siFastify.path,      hex: "000000" },
  "NestJS":        { path: siNestjs.path,       hex: siNestjs.hex },
  "Django":        { path: siDjango.path,       hex: siDjango.hex },
  "FastAPI":       { path: siFastapi.path,      hex: siFastapi.hex },
  "GraphQL":       { path: siGraphql.path,      hex: siGraphql.hex },
  "Go":            { path: siGo.path,           hex: siGo.hex },
  "Rust":          { path: siRust.path,         hex: "000000" },
  "Python":        { path: siPython.path,       hex: siPython.hex },
  "PHP":           { path: siPhp.path,          hex: siPhp.hex },
  "Ruby":          { path: siRuby.path,         hex: siRuby.hex },
  "Elixir":        { path: siElixir.path,       hex: siElixir.hex },
  "Laravel":       { path: siLaravel.path,      hex: siLaravel.hex },
  "Spring":        { path: siSpring.path,       hex: siSpring.hex },
  ".NET":          { path: siDotnet.path,       hex: siDotnet.hex },
  "C++":           { path: siCplusplus.path,    hex: siCplusplus.hex },
  // Databases
  "PostgreSQL":    { path: siPostgresql.path,   hex: siPostgresql.hex },
  "MySQL":         { path: siMysql.path,        hex: siMysql.hex },
  "MongoDB":       { path: siMongodb.path,      hex: siMongodb.hex },
  "Redis":         { path: siRedis.path,        hex: siRedis.hex },
  "SQLite":        { path: siSqlite.path,       hex: siSqlite.hex },
  "Supabase":      { path: siSupabase.path,     hex: siSupabase.hex },
  "Firebase":      { path: siFirebase.path,     hex: siFirebase.hex },
  "Elasticsearch": { path: siElasticsearch.path,hex: siElasticsearch.hex },
  "Neo4j":         { path: siNeo4j.path,        hex: siNeo4j.hex },
  "ClickHouse":    { path: siClickhouse.path,   hex: "FFCC01" },
  "CockroachDB":   { path: siCockroachlabs.path,hex: siCockroachlabs.hex },
  "PlanetScale":   { path: siPlanetscale.path,  hex: "000000" },
  "Neon":          { path: siNeon.path,         hex: siNeon.hex },
  "Prisma":        { path: siPrisma.path,       hex: "2D3748" },
  "Drizzle":       { path: siDrizzle.path,      hex: siDrizzle.hex },
  "TypeORM":       { path: siTypeorm.path,      hex: siTypeorm.hex },
  "Hasura":        { path: siHasura.path,       hex: siHasura.hex },
  // Cloud
  "Google Cloud":  { path: siGooglecloud.path,  hex: siGooglecloud.hex },
  "Cloudflare":    { path: siCloudflare.path,   hex: siCloudflare.hex },
  "DigitalOcean":  { path: siDigitalocean.path, hex: siDigitalocean.hex },
  "Hetzner":       { path: siHetzner.path,      hex: siHetzner.hex },
  "OVH":           { path: siOvh.path,          hex: siOvh.hex },
  "Docker":        { path: siDocker.path,       hex: siDocker.hex },
  "Kubernetes":    { path: siKubernetes.path,   hex: siKubernetes.hex },
  "Helm":          { path: siHelm.path,         hex: siHelm.hex },
  "Terraform":     { path: siTerraform.path,    hex: siTerraform.hex },
  "Ansible":       { path: siAnsible.path,      hex: siAnsible.hex },
  "Nginx":         { path: siNginx.path,        hex: siNginx.hex },
  "Caddy":         { path: siCaddy.path,        hex: siCaddy.hex },
  "Vagrant":       { path: siVagrant.path,      hex: siVagrant.hex },
  "Podman":        { path: siPodman.path,       hex: siPodman.hex },
  // DevOps
  "GitHub":        { path: siGithub.path,       hex: "181717" },
  "GitLab":        { path: siGitlab.path,       hex: siGitlab.hex },
  "Bitbucket":     { path: siBitbucket.path,    hex: siBitbucket.hex },
  "Git":           { path: siGit.path,          hex: siGit.hex },
  "GitHub Actions":{ path: siGithubactions.path,hex: siGithubactions.hex },
  "CircleCI":      { path: siCircleci.path,     hex: "343434" },
  "Jenkins":       { path: siJenkins.path,      hex: siJenkins.hex },
  "Travis CI":     { path: siTravisci.path,     hex: siTravisci.hex },
  "Vercel":        { path: siVercel.path,       hex: "000000" },
  "Netlify":       { path: siNetlify.path,      hex: siNetlify.hex },
  "Render":        { path: siRender.path,       hex: "000000" },
  "Railway":       { path: siRailway.path,      hex: "0B0D0E" },
  // AI & ML
  "Anthropic":     { path: siAnthropic.path,    hex: "191919" },
  "Gemini":        { path: siGooglegemini.path, hex: siGooglegemini.hex },
  "Hugging Face":  { path: siHuggingface.path,  hex: siHuggingface.hex },
  "LangChain":     { path: siLangchain.path,    hex: "7FC8FF" },
  "Ollama":        { path: siOllama.path,       hex: "000000" },
  "Perplexity":    { path: siPerplexity.path,   hex: siPerplexity.hex },
  "TensorFlow":    { path: siTensorflow.path,   hex: siTensorflow.hex },
  "PyTorch":       { path: siPytorch.path,      hex: siPytorch.hex },
  "Keras":         { path: siKeras.path,        hex: siKeras.hex },
  "Scikit-learn":  { path: siScikitlearn.path,  hex: siScikitlearn.hex },
  "Apache Kafka":  { path: siApachekafka.path,  hex: "231F20" },
  "Apache Spark":  { path: siApachespark.path,  hex: siApachespark.hex },
  "Airflow":       { path: siApacheairflow.path,hex: siApacheairflow.hex },
  "GitHub Copilot":{ path: siGithubcopilot.path,hex: "000000" },
  "Replit":        { path: siReplit.path,       hex: siReplit.hex },
  // Mobile & Desktop
  "Flutter":       { path: siFlutter.path,      hex: siFlutter.hex },
  "Dart":          { path: siDart.path,         hex: siDart.hex },
  "Swift":         { path: siSwift.path,        hex: siSwift.hex },
  "Kotlin":        { path: siKotlin.path,       hex: siKotlin.hex },
  "React Native":  { path: siReact.path,        hex: siReact.hex },
  "Electron":      { path: siElectron.path,     hex: siElectron.hex },
  "Tauri":         { path: siTauri.path,        hex: siTauri.hex },
  "WebAssembly":   { path: siWebassembly.path,  hex: siWebassembly.hex },
  // Design & CMS
  "Figma":         { path: siFigma.path,        hex: siFigma.hex },
  "Sketch":        { path: siSketch.path,       hex: siSketch.hex },
  "Framer":        { path: siFramer.path,       hex: siFramer.hex },
  "Webflow":       { path: siWebflow.path,      hex: siWebflow.hex },
  "Strapi":        { path: siStrapi.path,       hex: siStrapi.hex },
  "Contentful":    { path: siContentful.path,   hex: siContentful.hex },
  "Sanity":        { path: siSanity.path,       hex: "F03E2F" },
  "WordPress":     { path: siWordpress.path,    hex: siWordpress.hex },
  // Payments & Commerce
  "Stripe":        { path: siStripe.path,       hex: siStripe.hex },
  "Shopify":       { path: siShopify.path,      hex: siShopify.hex },
  // Testing & Observability
  "Jest":          { path: siJest.path,         hex: siJest.hex },
  "Vitest":        { path: siVitest.path,       hex: "00FF74" },
  "Cypress":       { path: siCypress.path,      hex: siCypress.hex },
  "Storybook":     { path: siStorybook.path,    hex: siStorybook.hex },
  "Sentry":        { path: siSentry.path,       hex: siSentry.hex },
  "Grafana":       { path: siGrafana.path,      hex: siGrafana.hex },
  "Prometheus":    { path: siPrometheus.path,   hex: siPrometheus.hex },
  "Datadog":       { path: siDatadog.path,      hex: siDatadog.hex },
  // Productivity
  "Notion":        { path: siNotion.path,       hex: "000000" },
  "Linear":        { path: siLinear.path,       hex: siLinear.hex },
  "Jira":          { path: siJira.path,         hex: siJira.hex },
  "Zoom":          { path: siZoom.path,         hex: siZoom.hex },
  "Confluence":    { path: siConfluence.path,   hex: siConfluence.hex },
  "Asana":         { path: siAsana.path,        hex: siAsana.hex },
  "Trello":        { path: siTrello.path,       hex: siTrello.hex },
  // Custom SVG paths (not in simple-icons)
  "AWS": {
    hex: "232F3E",
    path: "M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.064.056.128.056.184 0 .08-.048.16-.152.24l-.504.336a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.24-.112a2.47 2.47 0 0 1-.288-.376 6.18 6.18 0 0 1-.248-.472c-.624.736-1.408 1.104-2.352 1.104-.672 0-1.208-.192-1.6-.576-.392-.384-.592-.896-.592-1.536 0-.68.24-1.232.728-1.648.488-.416 1.136-.624 1.96-.624.272 0 .552.024.848.064.296.04.6.104.920.176v-.584c0-.608-.128-1.032-.376-1.28-.256-.248-.688-.368-1.304-.368-.28 0-.568.032-.864.104a6.398 6.398 0 0 0-.864.272 2.294 2.294 0 0 1-.28.104.488.488 0 0 1-.128.024c-.112 0-.168-.08-.168-.248v-.392c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.168 4.558 4.558 0 0 1 .960-.344 4.632 4.632 0 0 1 1.2-.152c.912 0 1.584.208 2.016.624.424.416.64 1.048.64 1.896v2.496zm-3.24 1.212c.264 0 .536-.048.824-.144.288-.096.544-.272.760-.512.128-.152.224-.32.272-.512.048-.192.080-.424.080-.696v-.336a6.746 6.746 0 0 0-.736-.136 6.02 6.02 0 0 0-.752-.048c-.536 0-.928.104-1.192.32-.264.216-.392.52-.392.920 0 .376.096.656.296.848.192.2.472.296.84.296zm6.44.88c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.312L7.58 5.828a1.4 1.4 0 0 1-.072-.32c0-.128.064-.2.192-.2h.784c.152 0 .256.024.312.08.064.048.112.16.16.312l1.328 5.24 1.232-5.24c.04-.16.088-.264.152-.312.064-.048.176-.08.32-.08h.64c.152 0 .256.024.32.08.064.048.12.16.152.312l1.248 5.304 1.368-5.304c.048-.16.104-.264.16-.312.064-.048.168-.08.312-.08h.744c.128 0 .2.064.2.2 0 .04-.008.08-.016.128-.008.048-.024.112-.056.2l-1.92 6.108c-.048.16-.104.264-.168.312-.064.048-.168.08-.304.08h-.688c-.152 0-.256-.024-.32-.08-.064-.056-.12-.16-.152-.32L12.56 7.06l-1.216 4.884c-.04.16-.088.264-.152.32-.064.056-.176.08-.32.08h-.688zm10.176.248c-.416 0-.832-.048-1.232-.144-.4-.096-.712-.2-.92-.32-.128-.072-.216-.152-.248-.224a.56.56 0 0 1-.048-.224v-.408c0-.168.064-.248.184-.248.048 0 .096.008.144.024.048.016.12.048.2.08.272.12.568.216.888.28.328.064.648.096.976.096.52 0 .92-.088 1.2-.264a.866.866 0 0 0 .424-.772.786.786 0 0 0-.216-.568c-.144-.152-.416-.288-.808-.416l-1.16-.36c-.584-.184-1.016-.456-1.288-.816a1.953 1.953 0 0 1-.408-1.2c0-.344.072-.648.216-.912.144-.264.336-.496.584-.688.248-.2.528-.344.856-.448.328-.104.672-.152 1.04-.152.184 0 .376.008.56.04.192.024.368.064.536.104.16.04.312.088.456.144.144.056.256.112.336.168a.69.69 0 0 1 .24.208.49.49 0 0 1 .072.272v.376c0 .168-.064.256-.184.256a.83.83 0 0 1-.304-.096 3.652 3.652 0 0 0-1.528-.312c-.472 0-.84.072-1.096.224-.256.152-.384.384-.384.704 0 .224.08.416.24.568.16.152.456.304.88.44l1.136.36c.576.184.992.44 1.24.768.248.328.368.704.368 1.12 0 .352-.072.672-.208.952-.144.28-.336.528-.592.728-.256.208-.56.36-.92.464-.376.12-.784.176-1.232.176z",
  },
  "Azure": {
    hex: "0078D4",
    path: "M0 0h11.93l-6.37 18.73L11.58 24H24l-6.285-6.145L13.01 0zm11.93 0L5.56 18.73 11.93 24h-5.34L0 18.73 6.59 0z",
  },
  "OpenAI": {
    hex: "412991",
    path: "M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0L4.83 14.185a4.505 4.505 0 0 1-2.49-6.289zm16.597 3.855l-5.843-3.371 2.019-1.168a.076.076 0 0 1 .071 0l3.988 2.302a4.5 4.5 0 0 1-.688 8.108v-5.674a.795.795 0 0 0-.387-.197zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .029-.06l3.989-2.302a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z",
  },
};

// ── Rows: no category labels, just tools ────────────────────────────────────
const TECH_ROWS = [
  {
    dir: "left" as const, speed: 65,
    techs: ["React", "Next.js", "Vue.js", "Angular", "Svelte", "Astro", "Remix", "TypeScript", "JavaScript", "HTML5", "CSS", "Tailwind CSS", "Sass", "Vite", "Webpack"],
  },
  {
    dir: "right" as const, speed: 72,
    techs: ["Node.js", "Deno", "Bun", "Express", "Fastify", "NestJS", "Django", "FastAPI", "GraphQL", "Go", "Rust", "Python", "PHP", "Ruby", "Elixir", "Laravel", "Spring", ".NET", "C++"],
  },
  {
    dir: "left" as const, speed: 68,
    techs: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "Supabase", "Firebase", "Elasticsearch", "Neo4j", "ClickHouse", "CockroachDB", "PlanetScale", "Neon", "Prisma", "Drizzle", "TypeORM", "Hasura"],
  },
  {
    dir: "right" as const, speed: 74,
    techs: ["AWS", "Google Cloud", "Azure", "Cloudflare", "DigitalOcean", "Hetzner", "OVH", "Docker", "Kubernetes", "Helm", "Terraform", "Ansible", "Nginx", "Caddy", "Vagrant", "Podman"],
  },
  {
    dir: "left" as const, speed: 60,
    techs: ["GitHub", "GitLab", "Bitbucket", "Git", "GitHub Actions", "CircleCI", "Jenkins", "Travis CI", "Vercel", "Netlify", "Render", "Railway"],
  },
  {
    dir: "right" as const, speed: 78,
    techs: ["OpenAI", "Anthropic", "Gemini", "Hugging Face", "LangChain", "Ollama", "Perplexity", "GitHub Copilot", "Replit", "TensorFlow", "PyTorch", "Keras", "Scikit-learn", "Apache Kafka", "Apache Spark", "Airflow"],
  },
  {
    dir: "left" as const, speed: 55,
    techs: ["Flutter", "Dart", "Swift", "Kotlin", "React Native", "Electron", "Tauri", "WebAssembly"],
  },
  {
    dir: "right" as const, speed: 82,
    techs: ["Stripe", "Shopify", "Figma", "Framer", "Webflow", "Sketch", "Strapi", "Contentful", "Sanity", "WordPress", "Jest", "Vitest", "Cypress", "Storybook", "Sentry", "Grafana", "Prometheus", "Datadog", "Notion", "Linear", "Jira", "Confluence", "Zoom", "Asana", "Trello"],
  },
] as const;

// ── Single badge ─────────────────────────────────────────────────────────────
function Badge({ name }: { name: string }) {
  const icon = TECH_ICONS[name];
  return (
    <span
      className="inline-flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-2.5 font-sans text-[13px] font-medium whitespace-nowrap"
      style={{
        background: "#FFFFFF",
        border: "1px solid #E8ECF2",
        color: "#334155",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      {icon ? (
        <svg
          viewBox="0 0 24 24"
          className="h-[15px] w-[15px] shrink-0"
          style={{ fill: `#${icon.hex}`, opacity: 0.88 }}
          aria-label={name}
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden />
      )}
      {name}
    </span>
  );
}

// ── Infinite marquee row ──────────────────────────────────────────────────────
function MarqueeRow({
  techs,
  direction,
  speed,
}: {
  techs: readonly string[];
  direction: "left" | "right";
  speed: number;
}) {
  const items = [...techs, ...techs, ...techs, ...techs];
  const animName = direction === "left" ? "dtlMarqueeLeft" : "dtlMarqueeRight";

  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
      }}
    >
      <div
        className="flex gap-2.5"
        style={{
          width: "max-content",
          animation: `${animName} ${speed}s linear infinite`,
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.animationPlayState = "running")}
      >
        {items.map((tech, i) => (
          <Badge key={`${tech}-${i}`} name={tech} />
        ))}
      </div>
    </div>
  );
}

// ── Animated row wrapper ──────────────────────────────────────────────────────
function RowWrapper({ index, children }: { index: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease, delay: index * 0.05 }}
    >
      {children}
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function TechStack() {
  return (
    <section
      id="tech-stack"
      className="relative dtl-border-light overflow-hidden dtl-bg-light py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[500px] w-[400px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="dtl-section relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease }}
          className="mb-12 md:mb-14 max-w-xl"
        >
          <h2
            className="font-display font-bold tracking-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#0F172A" }}
          >
            Tools we&apos;d stake{" "}
            <span className="dtl-gradient-text">a production system on.</span>
          </h2>
          <p className="mt-4 text-[0.95rem] leading-relaxed" style={{ color: "#475569" }}>
            Chosen for reliability and longevity — not because they trended last month.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3 md:gap-3.5">
          {TECH_ROWS.map((row, i) => (
            <RowWrapper key={i} index={i}>
              <MarqueeRow techs={row.techs} direction={row.dir} speed={row.speed} />
            </RowWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
