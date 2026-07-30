import { ServiceDetailPageView } from "@/components/services/ServiceDetailPage";
import { getCategoryBySlug, getServiceBySlugs } from "@/data/service-pages";
import { childMetadata } from "@/lib/service-page-meta";
import { notFound } from "next/navigation";

const CATEGORY_SLUG = "sosyal-medya-ajansi";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const category = getCategoryBySlug(CATEGORY_SLUG);
  return (category?.services ?? []).map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const match = getServiceBySlugs(CATEGORY_SLUG, slug);
  if (!match) return {};
  return childMetadata(match.category, match.service);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const match = getServiceBySlugs(CATEGORY_SLUG, slug);
  if (!match) notFound();
  return (
    <ServiceDetailPageView category={match.category} service={match.service} />
  );
}
