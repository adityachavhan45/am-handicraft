"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { QuantitySelector } from "@/components/QuantitySelector";
import { formatPrice } from "@/lib/products";
import { getCartProducts, useStore } from "@/lib/store-context";

export default function CartPage() {
  const { cart, subtotal, removeFromCart, updateQuantity, moveToWishlist } = useStore();
  const lines = getCartProducts(cart);
  const shipping = subtotal > 1499 || subtotal === 0 ? 0 : 99;
  const discount = subtotal > 3999 ? 350 : 0;
  const total = subtotal + shipping - discount;

  if (!lines.length) {
    return <EmptyState title="Your cart is waiting" text="Add handcrafted decor, gifting pieces, or festive accents to begin the demo checkout." />;
  }

  return (
    <div className="bg-[#fbf7ef] pt-32">
      <div className="container-am grid gap-8 pb-20 lg:grid-cols-[1fr_360px]">
        <section>
          <h1 className="font-serif text-[2.3rem] font-semibold sm:text-5xl">Shopping Cart</h1>
          <div className="mt-8 space-y-4">
            {lines.map(({ product, quantity }) => (
              <article key={product.id} className="grid gap-4 rounded-[8px] border border-[#e5dac8] bg-white p-4 shadow-sm sm:grid-cols-[140px_1fr]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[#eee3d3]">
                  <Image src={product.images[0]} alt={product.name} fill sizes="140px" className="object-cover" />
                </div>
                <div className="flex flex-col justify-between gap-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm text-[#7f7468]">{product.category}</p>
                      <Link href={`/product/${product.slug}`} className="mt-1 block text-xl font-bold hover:text-[#a15d38]">{product.name}</Link>
                      <p className="mt-2 text-sm text-[#7f7468]">{product.material} · {product.color}</p>
                    </div>
                    <strong className="text-base sm:text-lg">{formatPrice(product.price * quantity)}</strong>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <QuantitySelector value={quantity} onChange={(next) => updateQuantity(product.id, next)} />
                    <div className="flex w-full flex-col gap-3 min-[480px]:w-auto min-[480px]:flex-row">
                      <button type="button" onClick={() => moveToWishlist(product.id)} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d8c6ad] px-4 py-2 text-sm font-semibold text-[#315448]">
                        <Heart size={16} /> Move
                      </button>
                      <button type="button" onClick={() => removeFromCart(product.id)} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d8c6ad] px-4 py-2 text-sm font-semibold text-[#a15d38]">
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <aside className="h-max rounded-[8px] border border-[#e5dac8] bg-white p-6 shadow-sm lg:sticky lg:top-32">
          <h2 className="font-serif text-[1.9rem] font-semibold sm:text-3xl">Order Summary</h2>
          <div className="mt-6 space-y-3 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label="Shipping" value={shipping ? formatPrice(shipping) : "Free"} />
            <Row label="Discount" value={discount ? `-${formatPrice(discount)}` : "₹0"} />
            <div className="border-t border-[#e5dac8] pt-4">
              <Row label="Total" value={formatPrice(total)} strong />
            </div>
          </div>
          <Link href="/checkout" className="mt-6 block rounded-full bg-[#315448] px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-[#233e36]">
            Proceed to Checkout
          </Link>
          <Link href="/shop" className="mt-3 block rounded-full border border-[#315448] px-6 py-4 text-center text-sm font-bold text-[#315448]">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between ${strong ? "text-lg font-bold" : "text-[#5f574f]"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
