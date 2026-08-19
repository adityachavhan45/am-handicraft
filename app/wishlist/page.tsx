"use client";

import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { useStore } from "@/lib/store-context";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const wishedProducts = products.filter((product) => wishlist.includes(product.id));

  if (!wishedProducts.length) {
    return <EmptyState title="Your wishlist is empty" text="Save pieces while browsing and build a refined shortlist for your client presentation." action="Browse Products" />;
  }

  return (
    <div className="bg-[#fbf7ef] pt-32">
      <div className="container-am pb-20">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#a15d38]">Wishlist</p>
        <h1 className="mt-3 font-serif text-[2.3rem] font-semibold sm:text-5xl">Saved Handcrafted Pieces</h1>
        <div className="mt-9">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {wishedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
