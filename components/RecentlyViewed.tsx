"use client";

import { ProductGrid } from "@/components/ProductGrid";
import { products, type Product } from "@/lib/products";
import { useStore } from "@/lib/store-context";

export function RecentlyViewed({ currentProductId }: { currentProductId: string }) {
  const { recentlyViewed } = useStore();
  const recent = recentlyViewed
    .filter((id) => id !== currentProductId)
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product))
    .slice(0, 4);

  if (!recent.length) return null;

  return (
    <section className="mt-20">
      <h2 className="font-serif text-4xl font-semibold">Recently Viewed</h2>
      <div className="mt-8">
        <ProductGrid products={recent} />
      </div>
    </section>
  );
}
