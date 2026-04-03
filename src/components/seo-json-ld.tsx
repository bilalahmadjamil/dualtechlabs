import { getSiteUrl } from "@/config/site";

const DESCRIPTION =
  "Small team, senior engineers. We design and ship serious software: payments, government services, AI, and large web apps, with clear timelines and code your team can own.";

/**
 * Organization + WebSite JSON-LD for Google rich results context (no fake SearchAction).
 */
export default function SeoJsonLd() {
  const base = getSiteUrl();
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: "DualTech Labs",
        url: base,
        description: DESCRIPTION,
        logo: {
          "@type": "ImageObject",
          url: `${base}/assets/dual-logo.png`,
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "International",
        },
        knowsAbout: [
          "Fintech Infrastructure",
          "Government Digital Transformation",
          "AI-Driven E-commerce",
          "Web3 & Blockchain Marketplaces",
          "IoT Building Intelligence",
          "Reinsurance Software Systems",
          "Cross-border Payment Gateways",
          "Legal Workflow Automation"
        ],
        areaServed: ["Worldwide", "Global", "United States", "Canada", "Europe", "Australia", "Gulf Region", "UAE", "Saudi Arabia"]
      },
      {
        "@type": "Service",
        "@id": `${base}/#service`,
        name: "Global Custom Software Development & AI Integration",
        serviceType: "Software Engineering Studio",
        provider: { "@id": `${base}/#organization` },
        areaServed: ["Worldwide", "Global", "United States", "Canada", "Europe", "Australia", "Gulf Region", "UAE", "Saudi Arabia"],
        description: "Boutique studio for high-stakes software: Fintech, AI, and Government digital services for teams worldwide.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          "name": "Software Engineering Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fintech & Banking APIs" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "GovTech & Citizen Portals" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI & Supply Chain Intelligence" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Blockchain & NFT Infrastructure" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "InsurTech & Reinsurance Systems" } }
          ]
        }
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
