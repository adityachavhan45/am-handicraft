"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice, type Product } from "@/lib/products";
import { useStore } from "@/lib/store-context";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const wished = wishlist.includes(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-[8px] border border-[#e5dac8] bg-white shadow-[0_14px_35px_rgba(40,28,18,0.06)]"
    >
      <div className="relative aspect-[4/4.6] overflow-hidden bg-[#eee3d3] sm:aspect-[4/5]">
        <Link href={`/product/${product.slug}`} aria-label={product.name}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1180px) 33vw, 280px"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <Image
            src={product.images[1] ?? product.images[0]}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1180px) 33vw, 280px"
            className="object-cover opacity-0 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
        </Link>
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.isNewArrival ? <Badge>New</Badge> : null}
          {product.isBestSeller ? <Badge>Bestseller</Badge> : null}
          {discount ? <Badge>{discount}% Off</Badge> : null}
        </div>
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[#315448] shadow-sm transition hover:bg-white"
        >
          <Heart size={18} fill={wished ? "#b76e45" : "none"} />
        </button>
      </div>
      <div className="p-3.5 sm:p-5">
        <div className="flex items-center justify-between gap-2 text-xs text-[#8a7662]">
          <span>{product.category}</span>
          <span className="inline-flex items-center gap-1">
            <Star size={14} fill="#c18a43" className="text-[#c18a43]" />
            {product.rating}
          </span>
        </div>
        <Link href={`/product/${product.slug}`} className="mt-2 block min-h-10 text-[15px] font-semibold leading-6 text-[#1f1c18] hover:text-[#a15d38] sm:min-h-12 sm:text-[15px]">
          {product.name}
        </Link>
        <div className="mt-2.5 flex items-end justify-between gap-3">
          <div>
            <span className="text-[15px] font-bold sm:text-base">{formatPrice(product.price)}</span>
            {product.originalPrice ? (
              <span className="ml-2 text-sm text-[#9b9287] line-through">{formatPrice(product.originalPrice)}</span>
            ) : null}
          </div>
          <button
            type="button"
            aria-label={`Quick add ${product.name}`}
            onClick={() => addToCart(product.id)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#315448] text-white transition hover:bg-[#233e36] sm:h-10 sm:w-10"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#fffaf2]/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#7c452d] shadow-sm">
      {children}
    </span>
  );
}
