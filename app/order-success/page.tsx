"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store-context";

export default function OrderSuccessPage() {
  const { demoOrder } = useStore();
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="bg-[#fbf7ef] pt-32">
      <div className="container-am pb-20">
        <div className="mx-auto max-w-2xl rounded-[8px] border border-[#e5dac8] bg-white p-8 text-center shadow-sm md:p-12">
          <CheckCircle2 className="mx-auto text-[#315448]" size={58} />
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-[#a15d38]">Demo order placed</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold">Thank You for Your Order</h1>
          <p className="mx-auto mt-4 max-w-lg text-[#6e665c]">
            This success screen confirms the frontend checkout journey. No real payment or order has been processed.
          </p>
          <div className="mt-8 grid gap-3 rounded-[8px] bg-[#fbf7ef] p-5 text-left text-sm">
            <Row label="Demo Order ID" value={demoOrder?.id ?? "AMH-DEMO"} />
            <Row label="Order Amount" value={formatPrice(demoOrder?.amount ?? 0)} />
            <Row label="Shipping To" value={`${demoOrder?.customerName ?? "Demo Customer"}, ${demoOrder?.city ?? "Demo City"}`} />
            <Row label="Estimated Delivery" value={deliveryDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} />
          </div>
          <Link href="/shop" className="mt-8 inline-flex rounded-full bg-[#315448] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#233e36]">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-[#7f7468]">{label}</span>
      <strong className="text-right">{value}</strong>
    </div>
  );
}
