"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { QuantitySelector } from "@/components/QuantitySelector";
import { useStore } from "@/lib/store-context";

export function ProductActions({ productId }: { productId: string }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleWishlist, wishlist, addRecentlyViewed } = useStore();
  const wished = wishlist.includes(productId);

  useEffect(() => {
    addRecentlyViewed(productId);
  }, [addRecentlyViewed, productId]);

  return (
    <div className="mt-7 space-y-4">
      <div>
        <p className="mb-2 text-sm font-semibold">Quantity</p>
        <QuantitySelector value={quantity} onChange={setQuantity} />
      </div>
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_56px]">
        <button
          type="button"
          onClick={() => addToCart(productId, quantity)}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#315448] px-6 text-sm font-bold text-white transition hover:bg-[#233e36]"
        >
          <ShoppingBag size={18} /> Add to Cart
        </button>
        <Link
          href="/checkout"
          onClick={() => addToCart(productId, quantity)}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#b76e45] px-6 text-sm font-bold text-white transition hover:bg-[#9f5937]"
        >
          <Zap size={18} /> Buy Now
        </Link>
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(productId)}
          className="grid h-14 place-items-center rounded-full border border-[#d8c6ad] bg-white text-[#315448] transition hover:bg-[#f3eadc]"
        >
          <Heart size={20} fill={wished ? "#b76e45" : "none"} />
        </button>
      </div>
    </div>
  );
}
