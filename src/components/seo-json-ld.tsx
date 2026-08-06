import { getSiteUrl } from "@/config/site";
import { contactEmail } from "@/config/contact";

const DESCRIPTION =
  "DualTech Labs delivers custom software development, AI integration, cloud solutions, mobile engineering, and digital transformation services worldwide. Your idea, built right.";

export default function SeoJsonLd() {
  const base = getSiteUrl();

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${base}/#organization`,
        name: "DualTech Labs",
        url: base,
        description: DESCRIPTION,
        email: contactEmail,
        logo: {
          "@type": "ImageObject",
          url: `${base}/assets/logo-light-removebg-preview.png`,
          width: 512,
          height: 512,
        },
        // Add social/directory profile URLs here once created:
        // sameAs: ["https://www.linkedin.com/company/dualtechlabs", "https://clutch.co/profile/dualtechlabs"],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: contactEmail,
            availableLanguage: ["English"],
            areaServed: "Worldwide",
          },
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: contactEmail,
            availableLanguage: ["English"],
            areaServed: "Worldwide",
          },
        ],
        areaServed: "Worldwide",
        knowsAbout: [
          "Custom Software Development",
          "AI and Machine Learning",
          "Cloud Computing",
          "Mobile App Development",
          "UI/UX Design",
          "Digital Transformation",
          "Fintech Development",
          "Cybersecurity",
          "DevOps",
          "IT Consulting",
        ],
      },
      {
        "@type": "Service",
        "@id": `${base}/#service`,
        name: "IT Services & Custom Software Development",
        serviceType: "Information Technology Services",
        provider: { "@id": `${base}/#organization` },
        areaServed: "Worldwide",
        description: DESCRIPTION,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "IT Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Software Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI & Intelligent Systems" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud & DevOps" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile Engineering" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "UI/UX Design" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Platforms & Applications" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Transformation" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fintech & Payments" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "API Development & Integrations" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cybersecurity & Compliance" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "QA & Testing" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT Consulting" } },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${base}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What IT services does DualTech Labs provide?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "DualTech Labs provides custom software development, AI & intelligent systems, cloud & DevOps, mobile engineering, UI/UX design, web platforms, digital transformation, fintech & payments, API development, cybersecurity, QA & testing, and IT consulting services worldwide.",
            },
          },
          {
            "@type": "Question",
            name: "Does DualTech Labs work with clients worldwide?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. DualTech Labs works with clients globally — across the US, Europe, the Gulf region, Asia, and beyond. We deliver remote-first, with clear communication and full ownership transfer.",
            },
          },
          {
            "@type": "Question",
            name: "How do I start a project with DualTech Labs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Reach out via email or WhatsApp. Share your idea, rough or refined — we'll respond within one business day with honest feedback on approach, timeline, and fit.",
            },
          },
          {
            "@type": "Question",
            name: "How much does custom software development cost?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "There is no honest fixed price for custom software — the same feature can cost very differently depending on scope, integrations, data, compliance, and design. DualTech Labs scopes each project on a free consultation and provides a clear, detailed estimate before any commitment, rather than quoting misleading tiers.",
            },
          },
          {
            "@type": "Question",
            name: "How long does it take to build custom software?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "It depends on scope — a focused MVP is far quicker than a full multi-feature product. Rather than promise a number before understanding the project, DualTech Labs scopes the timeline during discovery, then works in short delivery sprints with a working demo every two weeks so clients see real progress continuously.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between custom software and SaaS?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "SaaS (Software as a Service) is a ready-made product you subscribe to — fast to start but limited to what the vendor offers. Custom software is built specifically for your business — it fits your exact workflow, integrates with your systems, and you own it outright. Custom is better when your process is unique or when off-the-shelf tools create more workarounds than solutions.",
            },
          },
          {
            "@type": "Question",
            name: "Does DualTech Labs sign NDAs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. DualTech Labs signs NDAs before any project discussion. Confidentiality is standard practice for all client engagements.",
            },
          },
          {
            "@type": "Question",
            name: "Can DualTech Labs help integrate AI into an existing product?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. DualTech Labs specialises in AI integration — adding features like intelligent automation, natural language processing, recommendation engines, and predictive analytics to existing software products. We work with OpenAI, Anthropic, and open-source models depending on requirements.",
            },
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: "DualTech Labs",
        description: DESCRIPTION,
        inLanguage: "en-US",
        publisher: { "@id": `${base}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
