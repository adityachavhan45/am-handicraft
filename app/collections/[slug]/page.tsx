import { notFound } from "next/navigation";
import { CollectionBanner } from "@/components/CollectionBanner";
import { ProductListingClient } from "@/components/ProductListingClient";
import { categories, getCategory, products } from "@/lib/products";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <>
      <CollectionBanner title={category.name} text={category.description} image={category.image} />
      <ProductListingClient products={products} initialCategory={category.name} />
    </>
  );
}
