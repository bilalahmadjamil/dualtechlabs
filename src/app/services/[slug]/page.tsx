import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteUrl } from "@/config/site";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/services-data";
import ServiceDetailPage from "./_components/ServiceDetailPage";

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const data = getServiceBySlug(slug);
  if (!data) return {};

  const pageUrl = `${getSiteUrl()}/services/${slug}`;

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: pageUrl,
      languages: { en: pageUrl, "x-default": pageUrl },
    },
    openGraph: {
      type: "website",
      siteName: "DualTech Labs",
      title: `${data.metaTitle} | DualTech Labs`,
      description: data.metaDescription,
      url: pageUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
    },
  };
}

export default async function Page(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const data = getServiceBySlug(slug);
  if (!data) notFound();

  const pageUrl = `${getSiteUrl()}/services/${slug}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: getSiteUrl() },
      { "@type": "ListItem", position: 2, name: "Services", item: `${getSiteUrl()}/services` },
      { "@type": "ListItem", position: 3, name: data.metaTitle, item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ServiceDetailPage data={data} />
    </>
  );
}
