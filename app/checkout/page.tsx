"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreditCard, IndianRupee, Landmark, Smartphone } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { formatPrice } from "@/lib/products";
import { getCartProducts, useStore } from "@/lib/store-context";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, placeDemoOrder } = useStore();
  const lines = getCartProducts(cart);
  const [delivery, setDelivery] = useState("Standard Delivery");
  const [payment, setPayment] = useState("UPI");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  if (!lines.length) {
    return <EmptyState title="Checkout needs a cart" text="Add at least one demo product before placing a frontend-only order." />;
  }

  const shipping = delivery === "Express Delivery" ? 199 : subtotal > 1499 ? 0 : 99;
  const discount = subtotal > 3999 ? 350 : 0;
  const total = subtotal + shipping - discount;

  const submit = () => {
    placeDemoOrder({
      customerName: form.fullName || "Demo Customer",
      city: form.city || "Demo City",
      delivery,
    });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    router.push("/order-success", { scroll: true });
  };

  return (
    <div className="bg-[#fbf7ef] pt-32">
      <div className="container-am grid gap-8 pb-20 lg:grid-cols-[1fr_380px]">
        <section>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#a15d38]">Frontend-only checkout</p>
          <h1 className="mt-3 font-serif text-[2.3rem] font-semibold sm:text-5xl">Secure Checkout Demo</h1>
          <div className="mt-8 grid gap-5">
            <Panel title="Contact Information">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" value={form.fullName} onChange={(fullName) => setForm({ ...form, fullName })} />
                <Field label="Phone" value={form.phone} onChange={(phone) => setForm({ ...form, phone })} />
                <Field label="Email" value={form.email} onChange={(email) => setForm({ ...form, email })} />
              </div>
            </Panel>
            <Panel title="Shipping Address">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Address" value={form.address} onChange={(address) => setForm({ ...form, address })} wide />
                <Field label="City" value={form.city} onChange={(city) => setForm({ ...form, city })} />
                <Field label="State" value={form.state} onChange={(state) => setForm({ ...form, state })} />
                <Field label="PIN Code" value={form.pinCode} onChange={(pinCode) => setForm({ ...form, pinCode })} />
              </div>
            </Panel>
            <Panel title="Delivery Method">
              <div className="grid gap-3 sm:grid-cols-2">
                {["Standard Delivery", "Express Delivery"].map((option) => (
                  <Choice key={option} active={delivery === option} onClick={() => setDelivery(option)} label={option} text={option === "Standard Delivery" ? "3-6 business days" : "1-3 business days"} />
                ))}
              </div>
            </Panel>
            <Panel title="Payment UI">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  [Smartphone, "UPI"],
                  [CreditCard, "Credit / Debit Card"],
                  [Landmark, "Cash on Delivery"],
                ].map(([Icon, label]) => (
                  <button key={String(label)} type="button" onClick={() => setPayment(String(label))} className={`rounded-[8px] border p-4 text-left text-sm font-semibold transition ${payment === label ? "border-[#315448] bg-[#edf3ef]" : "border-[#e5dac8] bg-white"}`}>
                    <Icon className="mb-3 text-[#315448]" size={22} />
                    {String(label)}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-sm text-[#7f7468]">No real payment will be processed. This is a frontend demonstration only.</p>
            </Panel>
          </div>
        </section>
        <aside className="h-max rounded-[8px] border border-[#e5dac8] bg-white p-6 shadow-sm lg:sticky lg:top-32">
          <h2 className="font-serif text-[1.9rem] font-semibold sm:text-3xl">Order Summary</h2>
          <div className="mt-6 space-y-4">
            {lines.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-3">
                <div className="relative h-16 w-14 overflow-hidden rounded-[8px]">
                  <Image src={product.images[0]} alt={product.name} fill sizes="56px" className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{product.name}</p>
                  <p className="text-xs text-[#7f7468]">Qty {quantity}</p>
                </div>
                <span className="text-sm font-bold">{formatPrice(product.price * quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-3 border-t border-[#e5dac8] pt-5 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label="Shipping" value={shipping ? formatPrice(shipping) : "Free"} />
            <Row label="Discount" value={discount ? `-${formatPrice(discount)}` : "₹0"} />
            <Row label="Total" value={formatPrice(total)} strong />
          </div>
          <button type="button" onClick={submit} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#315448] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#233e36]">
            <IndianRupee size={17} /> Place Demo Order
          </button>
        </aside>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[8px] border border-[#e5dac8] bg-white p-5 shadow-sm sm:p-6">
      <h2 className="font-serif text-[1.9rem] font-semibold sm:text-3xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, wide }: { label: string; value: string; onChange: (value: string) => void; wide?: boolean }) {
  return (
    <label className={wide ? "sm:col-span-2" : ""}>
      <span className="text-sm font-semibold">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-12 w-full rounded-[8px] border border-[#d8c6ad] bg-[#fffaf2] px-4 outline-none focus:border-[#315448]" />
    </label>
  );
}

function Choice({ active, onClick, label, text }: { active: boolean; onClick: () => void; label: string; text: string }) {
  return (
    <button type="button" onClick={onClick} className={`rounded-[8px] border p-4 text-left transition ${active ? "border-[#315448] bg-[#edf3ef]" : "border-[#e5dac8] bg-white"}`}>
      <span className="font-bold">{label}</span>
      <span className="mt-1 block text-sm text-[#7f7468]">{text}</span>
    </button>
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
