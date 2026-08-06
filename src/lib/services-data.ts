export interface ServiceItem {
  title: string;
  desc: string;
}

export interface ProcessStep {
  num: string;
  name: string;
  desc: string;
  deliverables: string[];
}

export interface CostFactor {
  factor: string;
  desc: string;
}

export interface EngagementModel {
  name: string;
  bestFor: string;
  desc: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface ServicePageData {
  slug: string;
  serviceId: string;
  accentFrom: string;
  accentTo: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadlinePart1: string;
  heroHeadlinePart2: string;
  heroCopy: string;
  whatWeBuild: ServiceItem[];
  whoItsFor: ServiceItem[];
  process: ProcessStep[];
  investmentIntro: string;
  costFactors: CostFactor[];
  faqs: FAQ[];
}

/**
 * Engagement models are shared across every service — they describe HOW we price,
 * not a fixed number. This is deliberate: hardcoded prices go stale and anchor the
 * wrong conversation. Pricing model + cost drivers + a scoping call is timeless.
 */
export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    name: "Fixed Scope",
    bestFor: "Well-defined projects",
    desc: "We agree the deliverables and price upfront. You get budget certainty; we carry the estimation risk.",
  },
  {
    name: "Time & Materials",
    bestFor: "Evolving requirements",
    desc: "You pay for time spent, see working software every sprint, and change direction without renegotiating a contract.",
  },
  {
    name: "Dedicated Team",
    bestFor: "Ongoing product work",
    desc: "A committed team works as an extension of yours, billed monthly, with full flexibility on what gets built.",
  },
];

export const ALL_SERVICES: ServicePageData[] = [
  // ─── 1. Custom Software ───────────────────────────────────────────────────
  {
    slug: "custom-software-development",
    serviceId: "custom-software",
    accentFrom: "#7C3AED",
    accentTo: "#A855F7",
    metaTitle: "Custom Software Development Company for Startups & Enterprises",
    metaDescription:
      "DualTech Labs builds custom software for startups and enterprises — web apps, mobile apps, AI integrations, and SaaS platforms. End-to-end delivery. Full code ownership on day one.",
    heroHeadlinePart1: "Build exactly what your",
    heroHeadlinePart2: "business needs.",
    heroCopy:
      "Off-the-shelf software was built for someone else. We design, build, and deliver software shaped to your workflow — and hand you the keys on day one.",
    whatWeBuild: [
      { title: "Web Applications", desc: "SaaS platforms, dashboards, admin portals, and customer-facing apps built to handle real traffic from day one." },
      { title: "Mobile Apps", desc: "iOS, Android, and cross-platform apps built with React Native or Flutter — native feel, single codebase." },
      { title: "APIs & Integrations", desc: "REST and GraphQL APIs, third-party integrations, microservices — clean contracts, documented, versioned." },
      { title: "Internal Tools", desc: "Ops dashboards, workflow automation, and internal portals that save your team hours every week." },
      { title: "AI-Powered Features", desc: "LLM integrations and AI capabilities embedded into real products — not wrappers, not proof-of-concept demos." },
      { title: "Data Platforms", desc: "Pipelines, analytics systems, reporting dashboards, and data warehouses built for reliable, queryable scale." },
    ],
    whoItsFor: [
      { title: "Fintech startups", desc: "Payment systems, digital banking, KYC/AML software, and trading platforms with compliance built in." },
      { title: "Healthcare companies", desc: "Patient portals, clinic management, telemedicine systems, and HIPAA-ready architectures." },
      { title: "SaaS founders", desc: "MVPs, full platforms, and feature expansion — from idea to launch to scale." },
      { title: "Enterprise teams", desc: "Legacy modernisation, internal tooling, and complex process automation without the big-agency overhead." },
      { title: "E-commerce businesses", desc: "Custom storefronts, inventory management, and order processing built around your exact operations." },
      { title: "Non-technical founders", desc: "We translate ideas into working software with full guidance. You don't need to know how to code." },
    ],
    process: [
      { num: "01", name: "Discovery", desc: "We start by understanding the real problem, not just the requested feature. Deep-dive sessions map your users, constraints, and success criteria before any code is written.", deliverables: ["Requirements specification", "User journey mapping", "Technical feasibility report", "Project roadmap with milestones"] },
      { num: "02", name: "Architecture", desc: "We design the system blueprint — database schema, API contracts, service boundaries, and tech stack — all documented and agreed before a single line of code.", deliverables: ["System architecture diagram", "API contract definitions", "Database schema design", "Tech stack decision log"] },
      { num: "03", name: "Development", desc: "Agile sprints with a working demo every two weeks. Clean, documented code your future team can maintain. No black boxes. No shortcuts that become your problem later.", deliverables: ["Working software each sprint", "Code repository with docs", "Bi-weekly progress demos", "Technical documentation"] },
      { num: "04", name: "QA & Testing", desc: "Unit, integration, and end-to-end tests. Performance profiling under load. Security review before every release. We find the issues before your users do.", deliverables: ["Test coverage report", "Performance benchmarks", "Security audit results", "Bug-free staging environment"] },
      { num: "05", name: "Delivery", desc: "Production deployment, full source code handover, runbooks, and team onboarding. We stay available post-launch — because launch day is just the beginning.", deliverables: ["Production deployment", "Full source code ownership", "Operations runbook", "30-day post-launch support"] },
    ],
    investmentIntro:
      "Custom software is a capital investment, not a line-item expense. Built well, it pays back over years — in hours saved, revenue enabled, and a system you own outright. The honest answer to \"what will it cost\" is \"it depends\" — so here is exactly what it depends on.",
    costFactors: [
      { factor: "Scope & complexity", desc: "How many user journeys, screens, and business rules the software has to handle." },
      { factor: "Integrations", desc: "Each third-party system, payment provider, or legacy database adds design and testing work." },
      { factor: "Data & scale", desc: "Expected traffic, data volume, and performance targets shape the architecture." },
      { factor: "Design fidelity", desc: "A polished, custom-designed interface takes more than a purely functional one." },
      { factor: "Compliance & security", desc: "Regulated data — health, financial, personal — raises the engineering bar." },
      { factor: "Team & timeline", desc: "A larger team ships faster; an aggressive deadline changes how we staff the build." },
    ],
    faqs: [
      { q: "What is custom software development?", a: "Custom software development is the process of designing, building, and deploying software tailored specifically to your business — as opposed to off-the-shelf tools built for a general audience. The result fits your exact workflow, scales with your business, and is fully owned by you." },
      { q: "How much does custom software development cost?", a: "There is no honest fixed price for custom software — the same feature can cost very differently depending on scope, integrations, data, compliance, and design. That is why we do not publish tiers that mislead. Instead, we scope your specific project on a free consultation and give you a clear, detailed estimate before any commitment." },
      { q: "How long does custom software development take?", a: "It depends on scope — a focused MVP is far quicker than a full platform. Rather than promise a number before understanding your project, we scope the timeline during discovery, then build in two-week sprints with a working demo at the end of each — so you see real progress continuously and always know where things stand." },
      { q: "Do we own the code when the project is done?", a: "Yes — always. Full source code ownership transfers to you on the day of delivery. No lock-in, no ongoing licensing fees. You can take the codebase to any other team at any point." },
      { q: "What is the difference between custom software and SaaS?", a: "SaaS tools are built for a broad market and force you to adapt your processes to their constraints. Custom software is built for your specific processes — it does exactly what you need, integrates with your existing systems, and doesn't charge per-seat fees that grow unbounded as your team scales." },
      { q: "Can you work with non-technical founders?", a: "Yes — most of our clients are non-technical. We translate business requirements into technical specifications, explain decisions in plain language, and provide working demos every two weeks." },
      { q: "Do you offer ongoing support after launch?", a: "Yes. Every project includes 30 days of post-launch support at no additional cost. After that, we offer flexible retainer options for continued maintenance, feature additions, and technical support." },
      { q: "How do you handle clients in different time zones?", a: "We work remotely with clients across the US, Europe, the Gulf, and Asia. We set shared overlap hours for real-time communication and deliver async updates daily. Time zone differences have never caused a project delay." },
    ],
  },

  // ─── 2. AI & Intelligent Systems ─────────────────────────────────────────
  {
    slug: "ai-development",
    serviceId: "ai-systems",
    accentFrom: "#6D28D9",
    accentTo: "#06B6D4",
    metaTitle: "AI Development Company for Business | DualTech Labs",
    metaDescription:
      "DualTech Labs builds production AI systems for business — LLM integrations, custom ML models, AI agents, and intelligent automation. Real AI in real products, not demos.",
    heroHeadlinePart1: "Real AI in real products —",
    heroHeadlinePart2: "not wrappers, not demos.",
    heroCopy:
      "We build production AI systems that solve actual business problems. LLM integrations, custom models, intelligent automation — embedded into your product, monitored in production, improving over time.",
    whatWeBuild: [
      { title: "LLM Integrations", desc: "ChatGPT, Claude, and open-source LLMs integrated into your product with proper context management, fallbacks, and cost controls." },
      { title: "Custom ML Models", desc: "Domain-specific machine learning trained on your data — computer vision, NLP, classification, and forecasting." },
      { title: "AI Agents", desc: "Autonomous agents that complete multi-step tasks — research, data extraction, workflow automation, and decision support." },
      { title: "Recommendation Systems", desc: "Personalisation and recommendation engines for e-commerce, content platforms, and SaaS products." },
      { title: "AI-Powered Search", desc: "Semantic search, RAG pipelines, and intelligent document processing built for your specific data." },
      { title: "Intelligent Automation", desc: "AI that replaces repetitive manual work — document processing, data extraction, triage, and smart routing." },
    ],
    whoItsFor: [
      { title: "SaaS companies", desc: "Add AI features to existing products — copilots, smart summaries, semantic search, and intelligent routing." },
      { title: "E-commerce businesses", desc: "Product recommendations, demand forecasting, fraud detection, and customer service automation." },
      { title: "Healthcare companies", desc: "Clinical decision support, document processing, patient intake automation, and anomaly detection." },
      { title: "Fintech companies", desc: "Fraud detection, credit scoring, AML pattern recognition, and document verification." },
      { title: "Enterprise teams", desc: "Internal knowledge management, process automation, and intelligent document workflows." },
      { title: "Non-technical founders", desc: "We evaluate where AI genuinely adds value and build it properly — no hype, no wasted budget." },
    ],
    process: [
      { num: "01", name: "Assessment", desc: "We evaluate where AI genuinely adds value vs. where it's hype. Not every problem needs ML. We identify the use cases with real ROI for your specific product.", deliverables: ["AI opportunity audit", "Use case prioritisation", "Data readiness assessment", "Build vs. buy recommendation"] },
      { num: "02", name: "Data Strategy", desc: "Good models need good data. We design your data pipeline, handle labeling strategies, and ensure you're building on a foundation that scales.", deliverables: ["Data pipeline architecture", "Labeling & annotation strategy", "Data quality framework", "Training dataset preparation"] },
      { num: "03", name: "Model Development", desc: "We build, train, and fine-tune models for your specific domain — whether LLM integration, computer vision, or custom ML. Evaluated on real metrics, not toy benchmarks.", deliverables: ["Trained model with evaluation", "Prompt engineering docs", "Model performance report", "Inference optimisation"] },
      { num: "04", name: "Integration", desc: "The model goes into your product — not a separate tool. We embed AI where it creates real workflow value, with graceful fallbacks for when it's uncertain.", deliverables: ["Production AI integration", "Fallback logic design", "API endpoints for AI features", "End-user testing report"] },
      { num: "05", name: "Monitoring", desc: "AI in production drifts. We set up monitoring for model performance, data distribution shifts, and user feedback loops so quality holds over time.", deliverables: ["Model monitoring dashboard", "Drift detection setup", "Feedback loop implementation", "Retraining runbook"] },
    ],
    investmentIntro:
      "AI is judged on return, not novelty. The right use case pays back in hours automated, decisions improved, or revenue unlocked — the wrong one burns budget on a demo. We scope for ROI first, then build. What an AI project takes depends on these factors.",
    costFactors: [
      { factor: "Use case complexity", desc: "A single classification feature is very different from an autonomous multi-step agent." },
      { factor: "Data readiness", desc: "Clean, labelled data lowers cost; messy or missing data means pipeline work first." },
      { factor: "Model approach", desc: "Using a hosted LLM API differs sharply from training a custom model on your data." },
      { factor: "Accuracy requirements", desc: "Higher stakes mean more evaluation, guardrails, and human-in-the-loop design." },
      { factor: "Integration depth", desc: "Embedding AI into your product's core workflow versus running it as a standalone tool." },
      { factor: "Monitoring & retraining", desc: "Production AI drifts — ongoing monitoring is part of the real cost, not an extra." },
    ],
    faqs: [
      { q: "What is custom AI development vs. using ChatGPT directly?", a: "Using ChatGPT directly means your users interact with a generic model that has no knowledge of your product, your data, or your domain. Custom AI development means building an AI layer specific to your use case — fine-tuned or retrieval-augmented with your data, integrated into your product's workflow, with fallback handling, cost controls, and monitoring." },
      { q: "How much data do I need to build an AI model?", a: "It depends on the approach. For LLM-based products (RAG, fine-tuning), a few hundred to a few thousand high-quality examples are often enough. For traditional ML models, you typically need thousands to millions of labeled examples. We assess your data situation in the first phase and recommend the right approach for what you actually have." },
      { q: "Can you integrate AI into our existing product?", a: "Yes — that's the most common engagement. We add AI capabilities to existing products as new features or services. The AI integrates via your product's API layer and fits within your existing architecture." },
      { q: "How do you prevent AI hallucinations in production?", a: "We design systems with guardrails — constrained prompts, retrieval-augmented generation grounded in your data, output validation, human-in-the-loop for high-stakes decisions, and confidence thresholds that trigger fallbacks when the model is uncertain. Hallucination rate is a metric we track from day one." },
      { q: "What is the difference between an AI feature and an AI agent?", a: "An AI feature does one thing when triggered — summarises a document, classifies an input, answers a question. An AI agent autonomously plans and executes multi-step workflows — searching, reasoning, taking actions, and looping until a goal is reached. Agents are more powerful but require more careful design." },
      { q: "How long does AI development take?", a: "It depends on the use case and your data readiness — a single AI feature moves faster than a full platform with monitoring and retraining. We scope the timeline in the assessment phase, which often reshapes it, then deliver in sprints so you see working results early rather than at the end." },
      { q: "Do we need a data science team to maintain the AI after launch?", a: "Not necessarily. We set up monitoring and retraining runbooks that your engineering team can operate without dedicated data scientists. For more complex models, we offer ongoing retainer support." },
      { q: "Is our data safe when you build AI systems?", a: "Yes. We work under NDAs, process your data in isolated environments, and follow data minimisation principles. We advise on the right model hosting approach (cloud API vs. self-hosted) based on your data sensitivity and compliance requirements." },
    ],
  },

  // ─── 3. Cloud & DevOps ────────────────────────────────────────────────────
  {
    slug: "cloud-devops",
    serviceId: "cloud-devops",
    accentFrom: "#0891B2",
    accentTo: "#06B6D4",
    metaTitle: "Cloud & DevOps Services for Startups | DualTech Labs",
    metaDescription:
      "DualTech Labs designs and runs cloud infrastructure that scales, stays secure, and costs what it should. CI/CD pipelines, AWS migration, Kubernetes, and DevOps transformation.",
    heroHeadlinePart1: "Deployments should be boring.",
    heroHeadlinePart2: "Incidents should be rare.",
    heroCopy:
      "We design and run cloud infrastructure that scales, stays secure, and costs what it should. CI/CD pipelines, cloud migration, and DevOps practices that let your team ship fast without breaking things.",
    whatWeBuild: [
      { title: "CI/CD Pipelines", desc: "Automated build, test, and deploy pipelines on GitHub Actions, GitLab CI, or CircleCI. Deployments in minutes, not hours." },
      { title: "Cloud Infrastructure", desc: "AWS, Azure, and GCP infrastructure designed for your actual workload — right-sized, secure, and monitored from day one." },
      { title: "Kubernetes & Containers", desc: "Container orchestration, Helm charts, and zero-downtime deployments for teams ready to run at scale." },
      { title: "Infrastructure as Code", desc: "Terraform and Pulumi configurations that make infrastructure reproducible, reviewable, and version-controlled." },
      { title: "Observability Stacks", desc: "Logging, metrics, tracing, and alerting — Datadog, Grafana, Prometheus — real visibility into what your systems are doing." },
      { title: "Cloud Migration", desc: "Lift-and-shift or full re-architecture — we move workloads with tested rollback plans and zero production downtime." },
    ],
    whoItsFor: [
      { title: "Startups scaling fast", desc: "Your infrastructure is becoming a bottleneck. We make it invisible so your team can focus on product." },
      { title: "Teams with slow deployments", desc: "Deployments taking hours or days. We build the pipeline that makes them boring, fast, and automatic." },
      { title: "Companies with high cloud bills", desc: "Overprovisioned, underused infrastructure. We audit and right-size so you spend what you actually should." },
      { title: "Enterprise teams modernising", desc: "Moving off legacy or on-premise infrastructure to cloud — with proper security and compliance maintained throughout." },
      { title: "Teams without a DevOps engineer", desc: "No dedicated DevOps hire? We set it all up and document it so your engineering team can own it." },
      { title: "Companies preparing for scale", desc: "Green-field infrastructure built for 10× growth from the start, not retrofitted when the crisis arrives." },
    ],
    process: [
      { num: "01", name: "Audit", desc: "We analyse your current infrastructure — costs, reliability gaps, security posture, and deployment pain points. Honest findings, no upselling.", deliverables: ["Infrastructure audit report", "Cost optimisation analysis", "Security posture review", "Reliability risk register"] },
      { num: "02", name: "Architecture", desc: "Cloud infrastructure designed for your actual scale, not imagined scale. Right-sized resources, multi-region if needed, disaster recovery baked in from day one.", deliverables: ["Cloud architecture diagram", "Infrastructure-as-code templates", "Scaling strategy", "DR & backup plan"] },
      { num: "03", name: "Migration", desc: "Zero-downtime migration with tested rollback plans. We move workloads in stages — nothing big-bangs into production.", deliverables: ["Migration runbook", "Staged cutover plan", "Rollback procedures", "Data migration validation"] },
      { num: "04", name: "Automation", desc: "CI/CD pipelines, automated testing gates, infrastructure-as-code, alerting, and log aggregation. Deployments become a button press.", deliverables: ["CI/CD pipeline setup", "Automated deployment gates", "Observability stack", "Alert runbooks"] },
      { num: "05", name: "Optimisation", desc: "Ongoing cost reviews, performance tuning, and capacity planning. We keep the lights on and the bills sensible.", deliverables: ["Monthly cost reports", "Performance benchmarks", "Capacity planning model", "Ongoing SRE support"] },
    ],
    investmentIntro:
      "Infrastructure spend compounds. A right-sized, automated setup pays back every month — in lower cloud bills, fewer incidents, and engineers shipping instead of firefighting. What an engagement takes depends on where you're starting and where you need to get to.",
    costFactors: [
      { factor: "Current state", desc: "A clean green-field setup differs from untangling years of manual configuration." },
      { factor: "Workload complexity", desc: "The number of services, environments, and traffic patterns to support." },
      { factor: "Migration scope", desc: "A lift-and-shift is faster than a full re-architecture of legacy systems." },
      { factor: "Compliance requirements", desc: "SOC 2, HIPAA, or PCI baselines add controls and documentation." },
      { factor: "Automation depth", desc: "Basic CI/CD versus full infrastructure-as-code, observability, and self-healing setup." },
      { factor: "Ongoing support", desc: "A one-time setup versus an ongoing SRE partnership." },
    ],
    faqs: [
      { q: "What is DevOps and why does it matter?", a: "DevOps is the practice of integrating development and operations — automating builds, tests, and deployments so teams can ship more frequently with fewer failures. It matters because manual deployments and siloed teams are the leading cause of slow delivery and production incidents." },
      { q: "AWS vs Azure vs GCP — which should we use?", a: "For most startups, AWS is the right default — largest ecosystem, best documentation, and the most hiring pool. Azure makes sense if you're deeply integrated with Microsoft products. GCP excels for AI/ML workloads. We'll recommend based on your specific stack and team." },
      { q: "How long does a cloud migration take?", a: "It depends on the complexity of what is being moved and the quality of existing documentation — a straightforward workload migrates far faster than a full re-architecture of a tangled legacy system. We scope the timeline during the audit phase and migrate in stages, never in a single big-bang." },
      { q: "What is infrastructure as code and why do I need it?", a: "Infrastructure as code (IaC) means your cloud resources are defined in version-controlled files (Terraform, Pulumi) rather than configured manually. This means infrastructure changes go through code review, are reproducible, and can be rolled back. It's how you run infrastructure at scale without chaos." },
      { q: "How do you ensure zero downtime during migration?", a: "We use blue/green deployments, database migration with backward compatibility, feature flags for cutover, and staged traffic shifting. Every migration includes a tested rollback procedure before the cutover date. Nothing goes live without a validated way back." },
      { q: "What is Kubernetes and do we need it?", a: "Kubernetes is a container orchestration platform that manages deploying, scaling, and running containerised applications. Most startups don't need it until they have multiple services, variable traffic, or strict uptime requirements. We'll tell you honestly if you don't need it yet." },
      { q: "How much can we save by optimising our cloud costs?", a: "Many teams overspend on cloud due to oversized instances, idle resources, and unoptimised data transfer. A cost audit usually identifies meaningful savings — often enough to pay for itself quickly — but the exact figure depends entirely on your current setup, which is why we assess before promising a number." },
      { q: "Do you provide ongoing support after setup?", a: "Yes. We offer SRE retainer engagements that include on-call support, monthly cost reviews, quarterly architecture reviews, and incident response. We can also hand over a fully documented setup to your internal team." },
    ],
  },

  // ─── 4. Mobile Engineering ────────────────────────────────────────────────
  {
    slug: "mobile-app-development",
    serviceId: "mobile",
    accentFrom: "#7C3AED",
    accentTo: "#06B6D4",
    metaTitle: "Mobile App Development Company | iOS & Android | DualTech Labs",
    metaDescription:
      "DualTech Labs builds iOS and Android apps that perform on real devices. React Native, Flutter, and native development for startups, fintech, healthcare, and enterprise.",
    heroHeadlinePart1: "Mobile apps that feel",
    heroHeadlinePart2: "native on every platform.",
    heroCopy:
      "We build iOS and Android apps that perform on real devices — fast on a 3-year-old phone, smooth under poor network conditions, and designed with the platform conventions users already expect.",
    whatWeBuild: [
      { title: "iOS Apps", desc: "Native Swift apps with full access to iOS capabilities — ARKit, HealthKit, Apple Pay, Face ID, and Siri shortcuts." },
      { title: "Android Apps", desc: "Native Kotlin apps following Material Design — optimised for the full range of Android device specs and OS versions." },
      { title: "React Native Apps", desc: "One codebase, two platforms — when performance and budget matter equally. 90%+ of native capabilities, shared code." },
      { title: "Flutter Apps", desc: "Google's UI toolkit for pixel-perfect cross-platform apps with excellent animation performance and hot reload." },
      { title: "App Store Optimisation", desc: "Store listings, screenshots, metadata, and keyword strategy handled end-to-end for both Apple and Google." },
      { title: "Post-Launch Infrastructure", desc: "Crash monitoring, analytics, push notifications, and A/B testing infrastructure configured from day one." },
    ],
    whoItsFor: [
      { title: "Startups building consumer apps", desc: "From idea to App Store — MVP that validates the concept without burning the runway." },
      { title: "SaaS companies going mobile", desc: "Your web product needs a mobile companion. We build it with the same quality bar as your core product." },
      { title: "Fintech companies", desc: "Payment flows, biometric auth, real-time data — we know the requirements fintech mobile demands." },
      { title: "Healthcare companies", desc: "HIPAA-aware mobile development — patient portals, appointment booking, and health monitoring." },
      { title: "Enterprise teams", desc: "Internal mobile tools for field teams, operations staff, and remote workers." },
      { title: "Founders without a tech team", desc: "We handle everything from design to App Store submission — one team, full ownership." },
    ],
    process: [
      { num: "01", name: "Discovery", desc: "Platform strategy first — native iOS/Android or cross-platform? We weigh your user base, feature requirements, and long-term maintenance before writing a line.", deliverables: ["Platform recommendation report", "User research summary", "Feature priority matrix", "Technical constraints doc"] },
      { num: "02", name: "UX Design", desc: "Native design patterns for each platform — not a web app in a shell. iOS feels like iOS, Android feels like Android. Prototypes validated with real users.", deliverables: ["Native UI/UX prototypes", "Design system for mobile", "User testing report", "Accessibility audit"] },
      { num: "03", name: "Development", desc: "React Native or Flutter for cross-platform. Swift/Kotlin for pure native. Performance profiled from the start — smooth 60fps on mid-range hardware.", deliverables: ["Working app builds (iOS + Android)", "Weekly sprint demos", "Performance profiling report", "Code repository"] },
      { num: "04", name: "Device Testing", desc: "Tested across real devices — not just emulators. Edge cases in connectivity, background states, and OS versions. Push notification, deep link, and permission flows.", deliverables: ["Device test matrix results", "Crash-free rate report", "Connectivity edge case tests", "OS compatibility report"] },
      { num: "05", name: "Store Launch", desc: "App store submission handled end to end — screenshots, metadata, review responses. TestFlight and internal testing tracks. Monitoring from day one.", deliverables: ["App Store & Play Store submissions", "Store listing assets", "Crash monitoring setup", "Launch day support"] },
    ],
    investmentIntro:
      "A mobile app is a product, not a project — it earns its return over the years it stays in users' hands. What it takes to build comes down to a handful of specific choices.",
    costFactors: [
      { factor: "Platform strategy", desc: "One platform, both native, or cross-platform from a single codebase." },
      { factor: "Feature scope", desc: "Number of screens, flows, and device capabilities — camera, location, biometrics." },
      { factor: "Backend needs", desc: "Whether the app needs a new backend, or connects to one you already run." },
      { factor: "Offline & real-time", desc: "Offline capability and live data sync add meaningful engineering work." },
      { factor: "Design fidelity", desc: "Custom animations and polished native UI take more than standard components." },
      { factor: "Compliance", desc: "Handling health or financial data on-device raises the security bar." },
    ],
    faqs: [
      { q: "React Native vs Flutter vs native — which is right for my app?", a: "React Native is best when you have a JavaScript/TypeScript team and need good performance with code sharing. Flutter is best when you want pixel-perfect UI and excellent animation performance. Native (Swift/Kotlin) is best when you need deep OS integration — ARKit, HealthKit, or very demanding graphics. We'll recommend based on your specific requirements and team." },
      { q: "How much does it cost to build a mobile app?", a: "There is no honest single price — it depends on platform choice, feature scope, backend needs, and design. The biggest drivers are whether you need one platform or both, how many features, and how much backend the app requires. We scope your specific app on a free call and give you a clear estimate before you commit." },
      { q: "How long does mobile app development take?", a: "It depends on scope and whether you are targeting one platform or both. We scope the timeline during discovery, then build in two-week sprints with a working demo at the end of each — so you can see and use real progress throughout, not just at the end." },
      { q: "Do you handle App Store and Google Play submission?", a: "Yes — completely. We prepare the store listing assets (screenshots, descriptions, keywords), submit the build, manage the review process, and respond to any issues Apple or Google raise during review." },
      { q: "What happens after launch — who maintains the app?", a: "Every project includes 30 days of post-launch support at no additional cost. After that, we offer flexible retainer options for continued maintenance, OS compatibility updates, feature additions, and crash monitoring." },
      { q: "Can you add features to an existing app?", a: "Yes. We do this regularly — reviewing the existing codebase, establishing quality standards, and adding new features. We'll give you an honest assessment of the existing code quality before committing to scope." },
      { q: "Do you build the backend for the app too?", a: "Yes. Most mobile apps need a backend — API, database, auth, push notifications, and admin panel. We build the full stack or integrate with your existing backend if one already exists." },
      { q: "How do you test on real devices?", a: "We maintain a device testing matrix that covers the most common iOS and Android devices and OS versions. We also use services like Firebase Test Lab and BrowserStack for broader device coverage. Every app is tested on real hardware before submission." },
    ],
  },

  // ─── 5. UI/UX Design ─────────────────────────────────────────────────────
  {
    slug: "ui-ux-design",
    serviceId: "ui-ux",
    accentFrom: "#A855F7",
    accentTo: "#EC4899",
    metaTitle: "UI/UX Design Agency for Software Products | DualTech Labs",
    metaDescription:
      "DualTech Labs designs interfaces that reduce friction, build trust, and move users toward action. Research-driven product design, component systems, and developer-ready handover.",
    heroHeadlinePart1: "Design that makes sense first.",
    heroHeadlinePart2: "Then looks good.",
    heroCopy:
      "We design interfaces that reduce friction, build trust, and move users toward action. Research-driven, component-based, developer-ready — design that can actually be built to spec.",
    whatWeBuild: [
      { title: "Product Design", desc: "End-to-end product design — user research, wireframes, high-fidelity UI, and interactive prototypes that validate before building." },
      { title: "Design Systems", desc: "Component libraries that scale — consistent, accessible, documented, and built so developers can implement without constant design questions." },
      { title: "Mobile UI", desc: "Native iOS and Android interfaces following platform conventions users already understand — not web apps wrapped in a shell." },
      { title: "Web Application UI", desc: "Complex dashboard and SaaS UI designed for clarity under information density — where every pixel earns its place." },
      { title: "User Research", desc: "Interviews, usability testing, and competitor audits that ground design decisions in real user behaviour, not assumptions." },
      { title: "UX Audits", desc: "Identifying where your existing product loses users — backed by heuristic analysis and session data, not opinion." },
    ],
    whoItsFor: [
      { title: "Early-stage startups", desc: "First-time product design from zero — we help you figure out what to build before spending on engineering." },
      { title: "Funded startups", desc: "Your MVP is live but the UX is holding back growth. We redesign with data and ship improvements fast." },
      { title: "Engineering-led teams", desc: "Great engineers, but design is a bottleneck. We become your design team and clear the backlog." },
      { title: "Product teams", desc: "Design support for your roadmap — component systems, new features, user research, and A/B test designs." },
      { title: "Enterprise companies", desc: "Modernising internal tools and customer-facing products that were built for 2015 and haven't aged well." },
      { title: "Non-technical founders", desc: "We turn ideas into validated, investor-ready product designs before you spend on engineering." },
    ],
    process: [
      { num: "01", name: "Research", desc: "User interviews, competitor analysis, and heuristic evaluation. We understand who uses this, how they think, and where current designs fail them.", deliverables: ["User research report", "Persona definitions", "Competitor UX audit", "Problem statement framework"] },
      { num: "02", name: "Information Architecture", desc: "Before any visual design, we map the structure — navigation, user flows, content hierarchy. Everything clickable has a reason.", deliverables: ["Site map / app map", "User flow diagrams", "Content hierarchy doc", "Navigation framework"] },
      { num: "03", name: "Design", desc: "High-fidelity designs in Figma — with real content, not lorem ipsum. Component-based design system that developers can actually build from.", deliverables: ["Figma design files", "Component design system", "Responsive breakpoints", "Interaction specifications"] },
      { num: "04", name: "Prototyping & Testing", desc: "Clickable prototypes tested with real users. We iterate based on what people actually do, not what they say they'll do.", deliverables: ["Interactive prototype", "Usability test recordings", "Iteration report", "Accessibility compliance check"] },
      { num: "05", name: "Handover", desc: "Developer-ready handover — annotated specs, assets exported, design tokens documented. We stay available during implementation.", deliverables: ["Annotated design specs", "Asset export package", "Design token documentation", "Developer Q&A support"] },
    ],
    investmentIntro:
      "Design is the highest-leverage spend in a product. Every hour of friction removed compounds across every user, forever. What a project takes depends on its starting point and scope.",
    costFactors: [
      { factor: "Research depth", desc: "A light heuristic review versus full user interviews and usability testing." },
      { factor: "Scope", desc: "A single flow versus an entire product's screens and states." },
      { factor: "Design system", desc: "Whether you need a reusable component system or a one-off design." },
      { factor: "Fidelity & motion", desc: "Polished visuals and custom interaction design take more than wireframes." },
      { factor: "Rounds of iteration", desc: "How much validation and refinement the project genuinely calls for." },
      { factor: "Build support", desc: "Design-only handover versus staying involved through implementation." },
    ],
    faqs: [
      { q: "What is the difference between UI and UX design?", a: "UX (user experience) design is about how a product works — the flow, the structure, the logic of how users navigate and complete tasks. UI (user interface) design is about how it looks — visual hierarchy, typography, colour, and component styling. Good products need both: a logical UX expressed through a clear UI." },
      { q: "Do you do user research or just visual design?", a: "Both. We start with research — understanding your users, their goals, and where your current design fails them. Visual design that isn't grounded in user behaviour is decoration, not design." },
      { q: "What design tools do you use?", a: "Figma is our primary tool for UI design, prototyping, and design systems. We also use Maze and UserTesting for usability research, and Miro for workshops and information architecture." },
      { q: "Will the designs be developer-ready?", a: "Yes. Our handover includes annotated specs, exported assets, defined design tokens, and a component library with clear states and variants. We stay available during implementation to answer questions." },
      { q: "Can you work with our existing brand?", a: "Yes — we design within brand guidelines or help you evolve them if they're constraining the product. We'll tell you honestly if something in the brand is working against the UX goals." },
      { q: "How do you handle design revisions?", a: "Each phase includes a structured feedback and revision cycle. We present, collect consolidated feedback, and revise. We don't do unlimited revisions — we do the right number of revisions to reach the right answer." },
      { q: "Do you build the designs or just hand them over?", a: "We do both, depending on the engagement. Design-only means we deliver Figma files and specs. Design + build means our engineering team implements the designs in code. Most clients prefer the latter for better fidelity." },
      { q: "What is a design system and do I need one?", a: "A design system is a shared library of components, tokens, and patterns that both designers and developers use. You need one when your product has more than a handful of screens, multiple team members working on it, or you're shipping new features frequently. It eliminates inconsistency and speeds up every subsequent design decision." },
    ],
  },

  // ─── 6. Web Platforms ─────────────────────────────────────────────────────
  {
    slug: "web-development",
    serviceId: "web-platforms",
    accentFrom: "#0891B2",
    accentTo: "#7C3AED",
    metaTitle: "Web Application Development Company | Next.js & React | DualTech Labs",
    metaDescription:
      "DualTech Labs builds web applications on Next.js, React, and Node.js — SaaS platforms, dashboards, e-commerce, and marketing sites optimised for performance and SEO.",
    heroHeadlinePart1: "Web applications that load fast",
    heroHeadlinePart2: "and hold up under pressure.",
    heroCopy:
      "We build web platforms on modern stacks — Next.js, React, Node.js — optimised for performance, accessibility, and the traffic that comes when things go well.",
    whatWeBuild: [
      { title: "SaaS Web Applications", desc: "Multi-tenant platforms with auth, billing, user management, and the features your specific product needs." },
      { title: "Marketing & Landing Sites", desc: "Fast, SEO-optimised, conversion-focused — built on Next.js with Core Web Vitals in the green from day one." },
      { title: "Custom Dashboards", desc: "Data-heavy admin and analytics dashboards that stay performant under real query loads and real screen sizes." },
      { title: "E-commerce Platforms", desc: "Custom storefronts built for businesses that have outgrown Shopify or WooCommerce's constraints." },
      { title: "Customer Portals", desc: "Self-service portals where your customers manage accounts, view data, and take actions without contacting support." },
      { title: "Internal Web Tools", desc: "Operations tools, admin panels, and internal workflows that your team actually wants to use every day." },
    ],
    whoItsFor: [
      { title: "SaaS founders", desc: "Your product runs in a browser. We build it right — fast, secure, scalable, and maintainable as you grow." },
      { title: "Marketing teams", desc: "A site that ranks in Google and converts visitors — without a developer dependency for every content update." },
      { title: "Enterprise teams", desc: "Complex internal web tools built to enterprise security, performance, and accessibility standards." },
      { title: "E-commerce businesses", desc: "You've outgrown your platform. We build the custom alternative that does exactly what your business needs." },
      { title: "Startups with web-first products", desc: "From design to deployment on your domain — one team, full ownership, no agency handoffs." },
      { title: "Non-technical founders", desc: "We handle every layer — design, front end, back end, database, and hosting — under one roof." },
    ],
    process: [
      { num: "01", name: "Discovery", desc: "Define the product scope, target audience, performance requirements, and scalability needs. We challenge assumptions before they become expensive technical debt.", deliverables: ["Product scope document", "Technical requirements spec", "Performance targets", "SEO & accessibility baseline"] },
      { num: "02", name: "Architecture", desc: "Stack selection — Next.js, Remix, or custom — based on your actual needs. CDN strategy, database choice, caching layer, and auth system all planned before building.", deliverables: ["Tech stack decision doc", "System architecture", "API design spec", "Security architecture"] },
      { num: "03", name: "Development", desc: "Component-driven development. Lighthouse scores tracked from day one. Accessibility built in, not added later. Incremental delivery, demo every two weeks.", deliverables: ["Working web application", "Lighthouse performance reports", "Component library", "Bi-weekly sprint demos"] },
      { num: "04", name: "Testing", desc: "Cross-browser, cross-device testing. Load testing to your traffic projections. Security audit. Core Web Vitals validated in real conditions.", deliverables: ["Cross-browser test report", "Load test results", "Security penetration report", "Core Web Vitals report"] },
      { num: "05", name: "Launch", desc: "Production deployment with rollback capability. SEO metadata, sitemaps, and monitoring in place before the domain goes live.", deliverables: ["Production deployment", "Analytics & monitoring setup", "SEO configuration", "Post-launch support"] },
    ],
    investmentIntro:
      "A web platform is infrastructure for your business — it works every day for years. What it takes to build depends on scope, scale, and how custom it needs to be.",
    costFactors: [
      { factor: "Application scope", desc: "A marketing site versus a multi-tenant SaaS platform." },
      { factor: "Feature complexity", desc: "Auth, billing, dashboards, and integrations each add engineering." },
      { factor: "Traffic & scale", desc: "Expected load shapes the architecture and the infrastructure beneath it." },
      { factor: "Design fidelity", desc: "Custom-designed UI takes more than a component-library build." },
      { factor: "Content & CMS", desc: "Whether non-technical staff need to edit content themselves." },
      { factor: "Integrations", desc: "Each external system, payment provider, or API adds work." },
    ],
    faqs: [
      { q: "What tech stack do you use for web development?", a: "Our primary stack is Next.js (React) for the frontend, Node.js or Python for the backend, PostgreSQL or MongoDB for the database, and AWS or Vercel for hosting. We choose based on your specific requirements — not preference." },
      { q: "Next.js vs React — what's the difference and which do I need?", a: "React is a UI library. Next.js is a framework built on React that adds server-side rendering, static generation, routing, and API routes. For most web applications — especially those that need good SEO, fast initial load, and a structured codebase — Next.js is the right choice." },
      { q: "How do you handle scalability?", a: "We design for your actual expected scale, not imagined scale. This means proper database indexing, caching at the right layers, stateless application servers, and infrastructure that can scale horizontally when traffic grows." },
      { q: "How long does web application development take?", a: "It depends on scope — a marketing site is quick, a full SaaS platform is a longer build. We scope the timeline during discovery and deliver in two-week sprints with a working demo each time, so progress is always visible and never a black box." },
      { q: "Do you build the backend and database too?", a: "Yes — always. We build the full stack unless you already have a backend you want us to integrate with. Frontend-only projects without a backend rarely make sense for real applications." },
      { q: "How do you ensure the site is fast and SEO-ready?", a: "Performance is a first-class requirement, not an afterthought. We track Lighthouse scores from day one, optimise images, use proper caching, and ensure Core Web Vitals are in the green before launch. SEO includes proper semantic HTML, meta tags, structured data, and sitemap." },
      { q: "What CMS options do you support?", a: "We work with Contentful, Sanity, Strapi, and headless WordPress depending on your content workflow. We'll recommend the right option based on how often content is updated and who's doing the updating." },
      { q: "Who hosts and maintains the site after launch?", a: "You do — we set it up on your AWS or Vercel account. We provide full documentation and 30 days of post-launch support. After that, your team can own it or we offer ongoing maintenance retainers." },
    ],
  },

  // ─── 7. Digital Transformation ────────────────────────────────────────────
  {
    slug: "digital-transformation",
    serviceId: "digital-transformation",
    accentFrom: "#059669",
    accentTo: "#06B6D4",
    metaTitle: "Digital Transformation Consulting Company | DualTech Labs",
    metaDescription:
      "DualTech Labs helps businesses modernise legacy systems and manual processes — incrementally, measurably, without the risk of a big-bang replacement.",
    heroHeadlinePart1: "Off legacy stacks.",
    heroHeadlinePart2: "Into systems that move.",
    heroCopy:
      "We help businesses modernise the technology and processes that are slowing them down — incrementally, measurably, without the risk of a big-bang replacement that disrupts what's working.",
    whatWeBuild: [
      { title: "Legacy System Modernisation", desc: "Incremental replacement of outdated systems using the strangler fig pattern — new capabilities added alongside existing ones." },
      { title: "Process Automation", desc: "Manual processes replaced with software — approvals, reporting, data entry, and document workflows that used to take days." },
      { title: "Digital Strategy", desc: "A clear, prioritised roadmap for where technology investment will deliver actual business outcomes, not just modernisation for its own sake." },
      { title: "System Integration", desc: "Connecting siloed systems that weren't built to talk — ERPs, CRMs, finance systems, and legacy databases into a coherent whole." },
      { title: "Change Management", desc: "The people side of transformation — training, communication, and adoption support so the technology actually gets used." },
      { title: "Technology Audit", desc: "Honest assessment of your current stack — what to keep, what to replace, and in what order to minimise risk." },
    ],
    whoItsFor: [
      { title: "Mid-size businesses", desc: "Outgrown manual processes and spreadsheets. Ready to invest in systems that scale with the business." },
      { title: "Enterprise companies", desc: "Legacy infrastructure that's too expensive to maintain but too risky to replace all at once." },
      { title: "PE and acquisition teams", desc: "Technology due diligence and post-acquisition modernisation roadmaps for portfolio companies." },
      { title: "Operationally complex businesses", desc: "High process complexity — manufacturing, logistics, professional services — going digital without disrupting operations." },
      { title: "Leadership teams", desc: "Decision-makers who need clarity on what their technology investment should actually prioritise and why." },
      { title: "Regulated industries", desc: "Finance, healthcare, and compliance-heavy businesses transforming with governance and audit trails intact." },
    ],
    process: [
      { num: "01", name: "Assessment", desc: "We map your current systems, processes, and pain points. Where is technology slowing people down? Where are manual processes hiding? What's the actual cost of the status quo?", deliverables: ["Current state assessment", "Process pain point map", "Technology debt register", "Transformation business case"] },
      { num: "02", name: "Strategy", desc: "A phased roadmap — not a big-bang replacement. We sequence the changes to deliver value early and reduce risk. People, process, and technology all addressed together.", deliverables: ["Transformation roadmap", "Change management plan", "Risk mitigation strategy", "Success metrics framework"] },
      { num: "03", name: "Modernisation", desc: "Incrementally replace or integrate legacy systems. New capabilities built alongside existing ones, not as replacements. No business disruption.", deliverables: ["Modernised system modules", "Integration layer", "Data migration plan", "Legacy decommission roadmap"] },
      { num: "04", name: "Adoption", desc: "Training, documentation, and change management. Technology only transforms if people use it. We measure adoption, not just deployment.", deliverables: ["Training materials", "User adoption metrics", "Process documentation", "Feedback collection system"] },
      { num: "05", name: "Continuous Improvement", desc: "Transformation is never done. We set up the systems to keep improving — feedback loops, performance metrics, and regular reviews of what to tackle next.", deliverables: ["KPI dashboard", "Continuous improvement process", "Quarterly review framework", "Long-term roadmap updates"] },
    ],
    investmentIntro:
      "Transformation is measured in outcomes, not deliverables — hours reclaimed, errors eliminated, decisions made faster. We define the return before we scope the work. What a programme takes depends on the scale of change.",
    costFactors: [
      { factor: "Scope of change", desc: "Automating one workflow versus modernising an entire operating model." },
      { factor: "System complexity", desc: "How many systems are involved and how tangled they currently are." },
      { factor: "Legacy constraints", desc: "Older, undocumented systems take more care to modernise safely." },
      { factor: "Integration needs", desc: "Connecting ERPs, CRMs, and finance systems into a coherent whole." },
      { factor: "Change management", desc: "The people side — training and adoption — scales with organisation size." },
      { factor: "Phasing", desc: "A staged roadmap spreads the investment and reduces risk over time." },
    ],
    faqs: [
      { q: "What is digital transformation?", a: "Digital transformation is the process of using technology to fundamentally change how a business operates and delivers value — not just digitising existing processes but reimagining them. It typically involves replacing manual workflows, modernising legacy systems, and building the data infrastructure to make better decisions faster." },
      { q: "How long does a digital transformation take?", a: "It depends entirely on scope — a single process automation is far quicker than modernising an entire operating model. We deliberately phase transformations to deliver value early and reduce risk, rather than commit to one long timeline upfront. The roadmap and sequencing are defined in the strategy phase." },
      { q: "How do you handle legacy system risks during transformation?", a: "We use the strangler fig pattern — building new capabilities alongside existing systems and gradually shifting traffic/usage to the new system. Nothing gets replaced in a big-bang. At every stage, the old system remains live and operational until the new one is proven." },
      { q: "How do you get employee buy-in during transformation?", a: "We involve people in the process from the start — not as recipients of a decision, but as participants. This means understanding current workflows from the people who do them, piloting changes with willing adopters before rolling out broadly, and building training that addresses real concerns." },
      { q: "What is the ROI of digital transformation?", a: "The most common measurable outcomes are reduced manual processing time, fewer errors, faster decision-making through better data, and cost savings from decommissioning legacy systems. We define the specific success metrics with you before starting and track them throughout, so the return is measured — not assumed." },
      { q: "How is this different from just upgrading our software?", a: "Upgrading software is replacing a tool. Digital transformation is changing how the business operates. The software is a means, not an end. We always start with the business problem and work backward to the technology — not the other way around." },
      { q: "Do you replace our existing team or work alongside them?", a: "We work alongside your team — supplementing skills and capacity, not replacing people. Our goal is to transfer knowledge so your team can own and operate what we build." },
      { q: "Where do most digital transformation projects go wrong?", a: "The most common failure points are: starting with the technology instead of the business problem, underestimating the change management required, trying to do too much at once, and not defining clear success metrics. Our process addresses all of these explicitly." },
    ],
  },

  // ─── 8. Fintech & Payments ────────────────────────────────────────────────
  {
    slug: "fintech-development",
    serviceId: "fintech",
    accentFrom: "#0891B2",
    accentTo: "#059669",
    metaTitle: "Fintech Software Development Company | DualTech Labs",
    metaDescription:
      "DualTech Labs builds fintech software with the correctness standards the sector demands — payment systems, digital banking, KYC/AML, and compliance-ready architecture.",
    heroHeadlinePart1: "Fintech where the bugs",
    heroHeadlinePart2: "are actual liabilities.",
    heroCopy:
      "We build financial software with the correctness standards the sector demands — payment systems, banking platforms, compliance-ready architecture, and security baked in from day one, not retrofitted.",
    whatWeBuild: [
      { title: "Payment Systems", desc: "Payment gateway integrations, custom checkout flows, subscription billing, and split payment platforms built for edge cases." },
      { title: "Digital Banking", desc: "Core banking features, account management, transaction history, and open banking API integrations." },
      { title: "Trading Platforms", desc: "Order management, real-time pricing feeds, portfolio tracking, and execution systems with audit trails." },
      { title: "KYC/AML Systems", desc: "Identity verification, document checks, sanctions screening, and ongoing monitoring workflows." },
      { title: "Lending Platforms", desc: "Loan origination, credit decisioning, repayment tracking, and collections management." },
      { title: "Fintech APIs", desc: "Regulated fintech APIs for third-party developers — PSD2, Open Banking, and aggregation layers." },
    ],
    whoItsFor: [
      { title: "Fintech startups", desc: "Building your first regulated product — we know the compliance requirements and build them in from day one." },
      { title: "Challenger banks", desc: "Core banking and customer experience for digital-first banking products competing with incumbents." },
      { title: "Payment companies", desc: "Custom payment processing, gateway integrations, and merchant tooling built to handle edge cases." },
      { title: "Lending businesses", desc: "Loan origination, underwriting, and servicing systems built for your specific credit model." },
      { title: "Enterprise finance teams", desc: "Internal financial tooling — reconciliation, reporting, and treasury management systems." },
      { title: "Crypto and DeFi companies", desc: "Wallet integrations, smart contract interactions, and exchange connectivity." },
    ],
    process: [
      { num: "01", name: "Compliance First", desc: "We map the regulatory landscape for your product and jurisdiction before design begins. PCI DSS, PSD2, FCA, or sector-specific compliance requirements — understood and scoped.", deliverables: ["Regulatory requirement mapping", "Compliance gap analysis", "Licensing requirements doc", "Risk framework"] },
      { num: "02", name: "Architecture", desc: "Financial systems need idempotent operations, audit trails, and double-entry accounting patterns. We design for correctness first, then performance.", deliverables: ["Financial system architecture", "Audit trail design", "Idempotency implementation plan", "Data retention policy"] },
      { num: "03", name: "Development", desc: "Payment flows built with edge cases as the primary cases — failed payments, partial refunds, dispute handling, and currency conversion all designed explicitly.", deliverables: ["Payment flow implementation", "Webhook handling system", "Reconciliation logic", "Error recovery procedures"] },
      { num: "04", name: "Security Audit", desc: "Penetration testing, vulnerability scanning, and PCI DSS assessment. Financial data requires a higher security bar — we apply one.", deliverables: ["Penetration test report", "PCI compliance assessment", "Vulnerability remediation", "Security hardening checklist"] },
      { num: "05", name: "Launch & Monitor", desc: "Staged rollout with transaction monitoring from day one. Fraud detection patterns set up. Reconciliation reports automated.", deliverables: ["Staged launch plan", "Transaction monitoring setup", "Fraud detection rules", "Automated reconciliation"] },
    ],
    investmentIntro:
      "In fintech, correctness is the product. The investment buys not just features but the compliance, audit trails, and security that make a financial product trustworthy — and viable. What it takes depends on these factors.",
    costFactors: [
      { factor: "Regulatory scope", desc: "The jurisdictions and licences your product needs to operate under." },
      { factor: "Compliance depth", desc: "PCI DSS, KYC/AML, and audit requirements shape the architecture." },
      { factor: "Payment complexity", desc: "Number of payment methods, currencies, and edge cases — refunds, disputes." },
      { factor: "Integrations", desc: "Payment gateways, core banking systems, and open banking aggregators." },
      { factor: "Security bar", desc: "Financial data demands penetration testing and hardening as standard." },
      { factor: "Ongoing monitoring", desc: "Transaction monitoring, fraud detection, and automated reconciliation." },
    ],
    faqs: [
      { q: "What compliance do I need for a fintech product?", a: "It depends on your jurisdiction and product type. Payment processing typically requires PCI DSS compliance. Banking-adjacent products often require FCA registration (UK), EMI licensing, or equivalent. KYC/AML requirements apply to any product that handles money movement. We map the requirements for your specific product and geography in the first phase." },
      { q: "How do you handle financial data security?", a: "Financial data is treated as the highest sensitivity class. Encryption at rest and in transit, field-level encryption for sensitive data, strict access controls, audit logs for all data access, and regular penetration testing. We also advise on the right data residency approach for your compliance requirements." },
      { q: "What payment gateways do you work with?", a: "Stripe, Adyen, Checkout.com, Braintree, PayPal, Square, and most major regional gateways. We also have experience with direct card network integrations for high-volume merchants." },
      { q: "How do you build for PCI DSS compliance?", a: "We scope the cardholder data environment carefully to minimise PCI surface area — ideally using tokenisation so card data never touches your systems. We document the architecture for your QSA audit and advise on the right SAQ level for your integration pattern." },
      { q: "How is building fintech different from regular software?", a: "Three things: correctness requirements are much higher (a bug in payment logic costs real money), compliance is a first-class requirement not a checkbox, and edge cases are the main cases — refunds, disputes, partial failures, and currency handling all need explicit design." },
      { q: "Can you integrate with core banking systems?", a: "Yes. We have experience integrating with Mambu, Thought Machine, Temenos, and custom core banking systems via their APIs. Legacy core banking integration often requires middleware — we design that layer carefully." },
      { q: "How do you handle failed payments and reconciliation?", a: "Failed payments are designed explicitly — retry logic with exponential backoff, idempotency keys to prevent duplicate charges, clear user communication, and webhook handling for async payment status updates. Reconciliation is automated daily with exception reporting for mismatches." },
      { q: "What is open banking and should my product support it?", a: "Open banking (PSD2 in Europe, CDR in Australia, etc.) requires banks to expose customer data and payment initiation via standardised APIs. If your product reads bank data or initiates payments without being a bank yourself, you likely need to integrate with an open banking aggregator like Plaid, TrueLayer, or Salt Edge." },
    ],
  },

  // ─── 9. API Development & Integrations ───────────────────────────────────
  {
    slug: "api-development",
    serviceId: "api",
    accentFrom: "#7C3AED",
    accentTo: "#0891B2",
    metaTitle: "API Development & Integration Services | DualTech Labs",
    metaDescription:
      "DualTech Labs designs and builds APIs that developers want to use — REST, GraphQL, webhooks, third-party integrations, and developer documentation that teams trust.",
    heroHeadlinePart1: "APIs that connect the things",
    heroHeadlinePart2: "that weren't meant to.",
    heroCopy:
      "We design, build, and document APIs that developers actually want to use — clean contracts, consistent error handling, versioning that doesn't break consumers, and monitoring from the first request.",
    whatWeBuild: [
      { title: "REST APIs", desc: "Resource-based APIs with consistent conventions, proper status codes, and pagination that scales without surprises." },
      { title: "GraphQL APIs", desc: "Flexible query APIs for frontend teams that need exactly the data they ask for — nothing more, nothing less." },
      { title: "Webhooks & Event Systems", desc: "Real-time event delivery with retry logic, signature verification, and developer-facing delivery dashboards." },
      { title: "Third-Party Integrations", desc: "Connecting to Stripe, Salesforce, HubSpot, Twilio, and any platform your business currently runs on." },
      { title: "API Documentation", desc: "Developer docs with real code examples, interactive playgrounds, and a changelog that development teams trust." },
      { title: "Internal APIs & Microservices", desc: "Service-to-service APIs that enforce boundaries, reduce coupling, and make the overall system comprehensible." },
    ],
    whoItsFor: [
      { title: "SaaS companies", desc: "Your product needs to integrate with the tools your customers already use. We build the layer that connects them cleanly." },
      { title: "Marketplace businesses", desc: "Multi-sided platforms where sellers, buyers, and partners all need programmatic access to your data and operations." },
      { title: "Enterprise teams", desc: "Legacy systems that need a modern API layer without replacing the underlying logic that's been running for years." },
      { title: "Developer-facing products", desc: "API-first products where the developer experience IS the product — and the docs are as important as the code." },
      { title: "Companies with integration debt", desc: "A tangle of point-to-point integrations that's become unmanageable. We architect the right long-term solution." },
      { title: "Fintech and healthcare", desc: "Sector-specific API requirements — PSD2, FHIR, HL7 — built correctly from the start, not retrofitted for compliance." },
    ],
    process: [
      { num: "01", name: "Discovery", desc: "Map every system that needs to communicate, the data that flows between them, and the edge cases when things fail. Integration complexity hides in edge cases.", deliverables: ["Integration map", "Data flow diagram", "Failure scenario catalogue", "Third-party API assessment"] },
      { num: "02", name: "API Design", desc: "RESTful, GraphQL, or event-driven — chosen for the use case, not preference. Versioning strategy, authentication model, and error formats agreed before building.", deliverables: ["OpenAPI / GraphQL schema", "Versioning strategy", "Auth & rate limit design", "Error response standards"] },
      { num: "03", name: "Development", desc: "Clean, consistent implementation with comprehensive test coverage. Mock servers for consumer teams to develop against in parallel.", deliverables: ["API implementation", "Mock server for consumers", "SDK documentation", "Integration test suite"] },
      { num: "04", name: "Testing", desc: "Contract testing, load testing, and failure injection. We test what happens when the third-party API you depend on goes down.", deliverables: ["Contract test results", "Load test benchmarks", "Chaos / failure injection tests", "Retry & timeout validation"] },
      { num: "05", name: "Documentation & Launch", desc: "Developer documentation that people actually read — code examples, interactive playground, changelog. Monitored in production from day one.", deliverables: ["Developer documentation site", "Interactive API playground", "Changelog system", "API health monitoring"] },
    ],
    investmentIntro:
      "A well-built API is leverage — it lets other systems, teams, and partners build on your product for years. What it takes depends on scope, consumers, and complexity.",
    costFactors: [
      { factor: "Number of endpoints", desc: "The surface area of data and operations the API exposes." },
      { factor: "Consumer types", desc: "Internal-only versus public, developer-facing APIs with SLAs." },
      { factor: "Integration complexity", desc: "How many external systems, and how well they are documented." },
      { factor: "Auth & rate limiting", desc: "The security and abuse-prevention requirements for the API." },
      { factor: "Documentation depth", desc: "A basic reference versus a full developer portal and playground." },
      { factor: "Reliability requirements", desc: "Uptime guarantees change how the API is built and tested." },
    ],
    faqs: [
      { q: "REST vs GraphQL — which should I use?", a: "REST is simpler to implement, cache, and debug. It's the right choice for most APIs, especially public-facing ones. GraphQL is better when you have multiple consumers (mobile, web, third-party) that need different subsets of the same data, and when the data structure is complex enough to justify the overhead." },
      { q: "What is API versioning and why does it matter?", a: "API versioning lets you evolve your API without breaking existing consumers. Common strategies are URL versioning (/v1/, /v2/) or header-based versioning. Without a versioning strategy, every API change risks breaking integrations your customers or partners depend on." },
      { q: "How do you handle API security?", a: "We implement authentication (OAuth 2.0, API keys, JWT), rate limiting, input validation, and proper error handling that doesn't leak internal details. For sensitive APIs, we add IP allowlisting, request signing, and detailed audit logging." },
      { q: "What is a webhook and when do I need one?", a: "A webhook is an HTTP callback — your system sends an event to a subscriber's URL when something happens, rather than the subscriber polling your API. You need webhooks when you have events (payment completed, order shipped, user created) that other systems need to react to in real time." },
      { q: "How do you document APIs?", a: "We generate OpenAPI specs from code, build interactive documentation with Swagger UI or Redoc, write code examples in multiple languages, and create a structured changelog. Good documentation includes the happy path AND the error cases." },
      { q: "How long does API development take?", a: "It depends on the number of endpoints and the complexity of the underlying data and business logic — a single, well-scoped API is quick, while a full platform with a developer portal is a longer build. We scope the timeline during discovery and deliver incrementally." },
      { q: "Can you integrate with any third-party system?", a: "If it has an API, yes. If it doesn't have an API (legacy systems, file-based integrations), we design the right integration approach — SFTP, database-level integration, middleware layer, or API wrapper — based on what's available." },
      { q: "How do you test APIs?", a: "We use contract testing (Pact) to ensure producer and consumer stay in sync, integration testing against real endpoints, load testing with k6 to validate performance under traffic, and chaos testing to verify behaviour when upstream dependencies fail." },
    ],
  },

  // ─── 10. Cybersecurity ────────────────────────────────────────────────────
  {
    slug: "cybersecurity",
    serviceId: "security",
    accentFrom: "#DC2626",
    accentTo: "#7C3AED",
    metaTitle: "Cybersecurity & Penetration Testing Services | DualTech Labs",
    metaDescription:
      "DualTech Labs tests, assesses, and hardens software and infrastructure against real attack techniques. Manual penetration testing, security architecture review, and compliance preparation.",
    heroHeadlinePart1: "Find the problems",
    heroHeadlinePart2: "before someone else does.",
    heroCopy:
      "We test, assess, and harden software and infrastructure against real attack techniques — manual penetration testing, security architecture review, and ongoing monitoring to keep you ahead of threats.",
    whatWeBuild: [
      { title: "Penetration Testing", desc: "Manual penetration testing by experienced testers — web apps, APIs, mobile apps, and infrastructure attacked the way real adversaries would." },
      { title: "Security Architecture Review", desc: "Authentication, authorisation, secrets management, and encryption reviewed against real threat models, not just compliance checklists." },
      { title: "Compliance Preparation", desc: "SOC 2, ISO 27001, PCI DSS, and HIPAA — gap analysis and remediation roadmap so your audit has no surprises." },
      { title: "Vulnerability Management", desc: "Ongoing scanning, triage, and remediation with severity-based prioritisation and clear communication of risk." },
      { title: "SIEM & Monitoring", desc: "Security event logging, intrusion detection, and alerting infrastructure that actually signals when something is wrong." },
      { title: "Security Training", desc: "Developer security training — OWASP Top 10, secure code review, and threat modelling workshops for engineering teams." },
    ],
    whoItsFor: [
      { title: "SaaS companies pre-launch", desc: "Ship with a security review completed — not a liability waiting to become a breach headline." },
      { title: "Enterprise companies", desc: "Annual penetration testing, compliance audit, and ongoing security posture improvement." },
      { title: "Fintech and healthcare", desc: "Sector-specific security requirements — PCI DSS, HIPAA, FCA — met properly, not minimally." },
      { title: "Companies after an incident", desc: "Post-breach assessment, root cause analysis, and remediation to prevent recurrence." },
      { title: "Fundraising startups", desc: "Investor due diligence often includes a security review. Get ahead of it before it becomes a deal issue." },
      { title: "Development teams", desc: "Security as a practice — code reviews, threat modelling, and developer training that builds long-term capability." },
    ],
    process: [
      { num: "01", name: "Assessment", desc: "Threat modelling and attack surface mapping. We look at your system the way an attacker would — identifying entry points, privilege escalation paths, and data exposure risks.", deliverables: ["Threat model document", "Attack surface map", "Risk severity register", "Compliance gap analysis"] },
      { num: "02", name: "Architecture Review", desc: "Security architecture review — authentication flows, authorisation models, secrets management, encryption at rest and in transit. Designed to be right, not just compliant.", deliverables: ["Security architecture review", "Auth model assessment", "Secrets management plan", "Encryption policy"] },
      { num: "03", name: "Penetration Testing", desc: "Manual penetration testing by experienced testers — not just automated scans. OWASP Top 10, business logic flaws, and infrastructure attacks.", deliverables: ["Penetration test report", "OWASP coverage report", "Business logic flaw findings", "Remediation priority list"] },
      { num: "04", name: "Remediation", desc: "We don't just report — we fix. Working with your team to implement patches, close vulnerabilities, and verify the fixes actually work.", deliverables: ["Remediation implementation", "Patch verification tests", "Updated security baseline", "Developer security training"] },
      { num: "05", name: "Ongoing Monitoring", desc: "Security is not a one-time event. We set up SIEM, intrusion detection, and vulnerability scanning so you know when the threat landscape changes.", deliverables: ["SIEM setup", "Intrusion detection alerts", "Regular vulnerability scans", "Incident response playbook"] },
    ],
    investmentIntro:
      "Security spend is insurance you can measure. The cost of a test is a fraction of the cost of a breach — in fines, downtime, and lost trust. Scope depends on what you're protecting and to what standard.",
    costFactors: [
      { factor: "Scope of assessment", desc: "A single web app versus full infrastructure, APIs, and code review." },
      { factor: "System complexity", desc: "The size and architecture of the target being tested." },
      { factor: "Compliance driver", desc: "SOC 2, HIPAA, or PCI audits define what must be covered." },
      { factor: "Testing depth", desc: "Automated scanning versus deep, manual penetration testing." },
      { factor: "Remediation support", desc: "Report-only versus staying involved to fix and re-test." },
      { factor: "Ongoing cadence", desc: "A one-off assessment versus a continuous monitoring retainer." },
    ],
    faqs: [
      { q: "What is penetration testing?", a: "Penetration testing (pen testing) is a simulated attack on your system by security professionals attempting to find and exploit vulnerabilities before real attackers do. Unlike automated vulnerability scanning, pen testing includes manual testing for business logic flaws and chained vulnerabilities that scanners miss." },
      { q: "How often should we run a penetration test?", a: "At minimum, annually — or whenever you make significant changes to your architecture, launch a new product, or are approaching a compliance audit. High-risk products (fintech, healthcare) benefit from semi-annual testing." },
      { q: "What is the difference between a vulnerability scan and penetration testing?", a: "A vulnerability scan is automated — it checks your systems against a database of known vulnerabilities and reports what it finds. Penetration testing is manual — a human attacker attempts to actually exploit vulnerabilities, chain multiple weaknesses, and test business logic. Scans catch the easy things. Pen testing catches what matters." },
      { q: "What does a security audit include?", a: "A security audit reviews your policies, architecture, code, and configuration against security standards. It typically includes a threat model, architecture review, code review, infrastructure review, and a prioritised findings report. It's broader than a pen test but less focused on active exploitation." },
      { q: "How do you report findings?", a: "Every finding includes: severity rating (Critical/High/Medium/Low), a description of the vulnerability, proof of exploitation, business impact, and specific remediation guidance. We deliver an executive summary for leadership and a technical report for your engineering team." },
      { q: "What is OWASP Top 10?", a: "The OWASP Top 10 is a standard list of the most critical web application security risks — injection, broken authentication, sensitive data exposure, and others. It's maintained by the Open Web Application Security Project and updated regularly based on real-world vulnerability data." },
      { q: "How long does a penetration test take?", a: "It depends on the size and complexity of the target — a single web app is quicker than a full infrastructure, API, and code assessment. We scope the exact duration after understanding the system, and escalate critical findings as we go rather than holding everything to the end." },
      { q: "What happens after you find vulnerabilities?", a: "We provide a remediation roadmap with priorities. For clients on retainer, we stay involved through the fix cycle — reviewing patches and re-testing to verify the vulnerability is actually closed, not just masked." },
    ],
  },

  // ─── 11. QA & Testing ─────────────────────────────────────────────────────
  {
    slug: "qa-testing",
    serviceId: "qa",
    accentFrom: "#059669",
    accentTo: "#0891B2",
    metaTitle: "QA & Software Testing Services | DualTech Labs",
    metaDescription:
      "DualTech Labs builds and runs test suites that catch real defects — automated and manual testing, CI pipeline integration, performance testing, and QA strategy.",
    heroHeadlinePart1: "Tests that mean something.",
    heroHeadlinePart2: "Not just tests that pass.",
    heroCopy:
      "We build and run test suites that catch real defects — automated and manual, integrated into your CI pipeline, maintained as a first-class codebase that your team can actually trust.",
    whatWeBuild: [
      { title: "Test Automation", desc: "Playwright, Cypress, Jest, and k6 — automated suites that run on every commit and catch regressions before they ship." },
      { title: "Manual Testing", desc: "Exploratory and scenario-based testing that finds what automation misses — UX inconsistencies, edge cases, and accessibility failures." },
      { title: "Performance Testing", desc: "Load testing to your traffic projections — k6, Locust, or JMeter — before a traffic spike exposes a problem in production." },
      { title: "Accessibility Testing", desc: "WCAG 2.1 AA compliance verified with automated tools and manual keyboard and screen reader testing." },
      { title: "API Testing", desc: "Contract testing, integration testing, and failure injection — testing what happens when upstream systems go down." },
      { title: "QA Strategy", desc: "Test pyramid design, tool selection, coverage targets, and CI integration — for teams starting QA from scratch." },
    ],
    whoItsFor: [
      { title: "Startups shipping fast", desc: "Move fast without breaking things — automated QA that keeps the deployment pipeline honest on every commit." },
      { title: "Teams with manual-only QA", desc: "Your team manually tests every release. We automate the repetitive parts and keep the exploratory parts human." },
      { title: "Companies with flaky tests", desc: "A test suite that's unreliable is worse than no tests. We fix the problem at the root, not with retries." },
      { title: "Enterprise engineering teams", desc: "QA practice evaluation and improvement — coverage metrics, defect escape rates, and release confidence." },
      { title: "Regulated industries", desc: "Audit-ready test evidence for compliance requirements — healthcare, finance, and government products." },
      { title: "Agencies and product studios", desc: "QA as a service for client projects — we integrate with your delivery team and own the quality layer." },
    ],
    process: [
      { num: "01", name: "Test Strategy", desc: "Define what to test, at what level, with what tools. Unit, integration, E2E, performance, accessibility — each has a role. We build a strategy, not a test backlog.", deliverables: ["Test strategy document", "Test pyramid design", "Tool selection & setup", "Coverage targets"] },
      { num: "02", name: "Test Design", desc: "Equivalence partitioning, boundary value analysis, and risk-based testing. We identify the scenarios that matter before writing a single test.", deliverables: ["Test case specifications", "Risk-based test coverage map", "Edge case catalogue", "Test data strategy"] },
      { num: "03", name: "Automation", desc: "Automated test suites that run in CI on every commit. Playwright for E2E, Jest/Vitest for unit, k6 for performance. Maintained as a first-class codebase.", deliverables: ["Automated test suite", "CI pipeline integration", "Test reporting dashboard", "Coverage thresholds enforced"] },
      { num: "04", name: "Execution", desc: "Exploratory testing alongside automation. We look for what the scripts don't catch — UX inconsistencies, performance degradation, and accessibility failures.", deliverables: ["Exploratory test sessions", "Load test results", "Accessibility audit", "Defect severity triage"] },
      { num: "05", name: "Continuous QA", desc: "Quality is maintained, not achieved once. Flaky test elimination, coverage ratcheting, and test health metrics so your suite stays trustworthy as the codebase grows.", deliverables: ["Test health metrics", "Flaky test elimination report", "Coverage trend tracking", "Regression prevention setup"] },
    ],
    investmentIntro:
      "QA is cheaper than the bugs it prevents. Every defect caught before release costs a fraction of one found in production. What an engagement takes depends on where you're starting.",
    costFactors: [
      { factor: "Current coverage", desc: "Starting from zero versus improving an existing test suite." },
      { factor: "Application complexity", desc: "The number of flows, integrations, and edge cases to cover." },
      { factor: "Automation scope", desc: "Unit, integration, E2E, performance, accessibility — how much to automate." },
      { factor: "Manual testing needs", desc: "How much exploratory, human-judgment testing the product requires." },
      { factor: "CI integration", desc: "Wiring tests into your pipeline and enforcing quality gates." },
      { factor: "Ongoing vs. one-off", desc: "A setup project versus an embedded QA partnership." },
    ],
    faqs: [
      { q: "What is the difference between QA and testing?", a: "Testing is the act of finding defects. QA (quality assurance) is the broader practice of preventing defects — through process, standards, test strategy, and continuous improvement. A QA function does testing, but also defines how testing is done and why." },
      { q: "Do you do manual testing or just automation?", a: "Both. Automation is excellent for regression testing, API testing, and performance testing. Manual exploratory testing is necessary for finding UX problems, edge cases in user flows, and issues that require human judgment to spot." },
      { q: "What test automation frameworks do you use?", a: "Playwright and Cypress for end-to-end browser testing. Jest and Vitest for unit and integration testing. k6 and Locust for performance and load testing. Pact for API contract testing. We choose based on your stack and requirements." },
      { q: "How do you decide what to automate vs. test manually?", a: "We automate tests that need to run frequently (on every commit), are stable and unlikely to change, and have a clear pass/fail criterion. We test manually where human judgment is required — exploratory testing, UX evaluation, and accessibility." },
      { q: "How is QA integrated into the development process?", a: "QA runs in parallel with development, not after it. Tests are written alongside features. Automated suites run in CI on every pull request. Exploratory testing happens at the end of each sprint. This means bugs are found when they're cheapest to fix." },
      { q: "What is a test pyramid?", a: "The test pyramid describes the right balance of test types: many fast unit tests at the base, fewer integration tests in the middle, and a small number of end-to-end tests at the top. Inverting the pyramid — too many slow E2E tests — creates a brittle, expensive test suite." },
      { q: "How long does it take to set up test automation?", a: "It depends on the complexity of the application and the state of any existing test infrastructure. We scope it after reviewing your codebase, then build the suite incrementally so coverage and confidence grow from the first week rather than arriving all at once." },
      { q: "What do you do when you find a bug?", a: "We document the bug with reproduction steps, expected vs. actual behaviour, severity rating, and suggested fix. Critical bugs are escalated immediately. We track defect rates and trends over time — a rising defect rate is a leading indicator that something in the development process needs to change." },
    ],
  },

  // ─── 12. IT Consulting ────────────────────────────────────────────────────
  {
    slug: "it-consulting",
    serviceId: "consulting",
    accentFrom: "#7C3AED",
    accentTo: "#A855F7",
    metaTitle: "IT Consulting Services for Technology Strategy | DualTech Labs",
    metaDescription:
      "DualTech Labs helps technology leaders make better decisions — architecture reviews, technology strategy, CTO advisory, and technical due diligence. Specific, honest, actionable.",
    heroHeadlinePart1: "Sometimes the best advice",
    heroHeadlinePart2: "is what not to build.",
    heroCopy:
      "We help technology leaders make better decisions — architecture reviews, technology strategy, team structure, vendor selection, and technical due diligence. Specific, honest, and actionable.",
    whatWeBuild: [
      { title: "Technology Strategy", desc: "A clear roadmap for where to invest in technology — prioritised by business impact, not technical fashion or vendor preference." },
      { title: "Architecture Review", desc: "Independent review of your technical architecture — what's working, what's creating risk, and what to change." },
      { title: "CTO Advisory", desc: "Fractional CTO services for startups without a technical leader — decision support, team hiring, and technical direction." },
      { title: "Technical Due Diligence", desc: "Pre-acquisition or investment-stage code and architecture assessment — honest findings, no whitewashing." },
      { title: "Vendor Selection", desc: "Structured evaluation of technology vendors, platforms, and agencies — beyond the sales pitch and the deck." },
      { title: "Team & Process Assessment", desc: "Engineering team structure, hiring strategy, process maturity, and developer productivity reviewed objectively." },
    ],
    whoItsFor: [
      { title: "Startups without a CTO", desc: "Technical decisions need to be made. We fill the gap or help you hire and onboard the right person." },
      { title: "CEOs and founders", desc: "You need to understand the technical situation — budget, risk, capability — without relying solely on your engineers." },
      { title: "PE and VC firms", desc: "Technical due diligence on portfolio companies and acquisition targets before committing capital." },
      { title: "Enterprise technology leaders", desc: "Independent second opinion on major architectural decisions or long-term vendor commitments." },
      { title: "Scaling startups", desc: "The system that got you to Series A needs to change to get you to Series B. We map the path clearly." },
      { title: "Companies after technical problems", desc: "A system failure, a missed launch, or a team that's lost confidence. We diagnose and prescribe clearly." },
    ],
    process: [
      { num: "01", name: "Understand", desc: "We listen before we advise. Understanding your business context, constraints, team capabilities, and the actual problem — not the stated problem — before forming any view.", deliverables: ["Stakeholder interview sessions", "Current state documentation", "Problem framing workshop", "Context briefing document"] },
      { num: "02", name: "Diagnose", desc: "Technical debt mapping, architecture review, process analysis. Where are the real bottlenecks? What decisions are slowing you down? What's costing more than it should?", deliverables: ["Technical debt register", "Architecture assessment", "Process bottleneck analysis", "Cost optimisation opportunities"] },
      { num: "03", name: "Recommend", desc: "Specific, actionable recommendations — not generic best practices. Each recommendation includes the trade-offs, the implementation path, and the expected outcome.", deliverables: ["Prioritised recommendations report", "Trade-off analysis", "Implementation roadmap", "Decision-ready presentation"] },
      { num: "04", name: "Implementation Support", desc: "Recommendations only have value if they're executed. We stay involved — reviewing progress, answering technical questions, and adjusting the plan as reality intervenes.", deliverables: ["Implementation review sessions", "Technical Q&A support", "Progress tracking", "Plan adjustment recommendations"] },
      { num: "05", name: "Knowledge Transfer", desc: "We leave you more capable than we found you. Documentation, training, and working sessions that build internal capability so you're not dependent on us forever.", deliverables: ["Internal capability assessment", "Training sessions", "Documentation handover", "Ongoing retainer option"] },
    ],
    investmentIntro:
      "Good advice pays for itself — one avoided mistake, one better architecture decision, one right hire. Consulting is scoped by the depth and duration of the engagement, not a fixed menu.",
    costFactors: [
      { factor: "Engagement depth", desc: "A focused workshop versus a full strategy engagement." },
      { factor: "Scope of review", desc: "One decision versus your whole architecture, team, and processes." },
      { factor: "Duration", desc: "A one-time assessment versus ongoing fractional CTO involvement." },
      { factor: "Stakeholders involved", desc: "The number of people and systems to understand and align." },
      { factor: "Implementation support", desc: "Advice-only versus staying involved through execution." },
      { factor: "Confidentiality needs", desc: "Sensitive due-diligence engagements require extra handling." },
    ],
    faqs: [
      { q: "What is IT consulting?", a: "IT consulting is independent expertise applied to technology decisions — strategy, architecture, team structure, vendor selection, or specific technical problems. The value is in objectivity: a consultant has no stake in a particular answer, only in getting to the right one." },
      { q: "When do I need a CTO vs. a consultant?", a: "A CTO is an executive who owns the technical direction long-term — hiring, architecture, roadmap, and culture. A consultant is a specialist brought in to solve a specific problem, review a decision, or fill a gap temporarily. Fractional CTO services bridge the two — ongoing technical leadership without a full-time hire." },
      { q: "What is technical due diligence?", a: "Technical due diligence is an independent assessment of a company's technology before an investment or acquisition. It evaluates the code quality, architecture, technical debt, security posture, team capability, and scalability of the platform. The goal is to surface risks before they become the acquirer's problem." },
      { q: "How long does a consulting engagement typically last?", a: "It depends on the engagement — a focused workshop or due diligence is short and defined, while a fractional CTO relationship is ongoing. We scope the duration clearly at the start and never stretch an engagement beyond where it adds value." },
      { q: "Do you implement the recommendations or just advise?", a: "We advise, and we can also implement. For strategy and architecture engagements, we typically advise and support implementation without owning it. For more hands-on engagements, our engineering team can execute what we've designed." },
      { q: "How is working with a consultant different from hiring an employee?", a: "A consultant brings specific expertise without the overhead of a full-time hire, can start immediately, and can be engaged for exactly as long as needed. The trade-off is that a consultant doesn't have full context about your organisation and costs more per hour than an employee of equivalent experience." },
      { q: "What does fractional CTO mean?", a: "A fractional CTO is an experienced technical leader who works with your company part-time — typically 1–3 days per week. They make architectural decisions, lead hiring, align engineering with business goals, and report to the board or CEO, without the cost or commitment of a full-time executive hire." },
      { q: "How do you handle confidential information?", a: "We work under NDA as standard. Client information is not shared with other clients, used in case studies without permission, or retained after the engagement. For sensitive engagements like due diligence, we follow the data handling protocols defined by the client." },
    ],
  },
];

export function getServiceBySlug(slug: string): ServicePageData | undefined {
  return ALL_SERVICES.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return ALL_SERVICES.map((s) => s.slug);
}
