import { ServiceCategoryPageView } from "@/components/services/ServiceCategoryPage";
import { getCategoryBySlug } from "@/data/service-pages";
import { categoryMetadata } from "@/lib/service-page-meta";
import { notFound } from "next/navigation";

const SLUG = "sosyal-medya-ajansi";

export function generateMetadata() {
  const category = getCategoryBySlug(SLUG);
  if (!category) return {};
  return categoryMetadata(category);
}

export default function Page() {
  const category = getCategoryBySlug(SLUG);
  if (!category) notFound();
  return <ServiceCategoryPageView category={category} />;
}
