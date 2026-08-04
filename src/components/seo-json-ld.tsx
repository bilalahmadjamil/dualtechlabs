import { getSiteUrl } from "@/config/site";

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
        logo: {
          "@type": "ImageObject",
          url: `${base}/assets/logo-light-removebg-preview.png`,
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          availableLanguage: "English",
        },
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
