import Link from "next/link";
import { Camera, CirclePlay, CreditCard, MapPin, Share2 } from "lucide-react";

const columns = [
  { title: "Shop", links: ["New Arrivals", "Best Sellers", "Home Decor", "Gifts", "Collections"] },
  { title: "Customer Care", links: ["Contact Us", "FAQ", "Shipping", "Returns", "Track Order"] },
  { title: "About", links: ["Our Story", "Artisan Stories", "Privacy Policy", "Terms & Conditions"] },
];

export function Footer() {
  return (
    <footer className="bg-[#172d27] text-white">
      <div className="container-am grid gap-10 py-12 md:grid-cols-[1.2fr_2fr_1fr] md:py-14">
        <div>
          <div className="font-serif text-3xl font-semibold">AM Handicrafts</div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/72">
            Premium handcrafted Indian decor for homes, celebrations, gifting, and soulful everyday spaces.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 text-sm text-[#f1c27d]">
            <MapPin size={16} /> Made in India
          </p>
        </div>
        <div className="grid gap-8 min-[480px]:grid-cols-2 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-[#f1c27d]">{column.title}</h3>
              <div className="mt-4 grid gap-3">
                {column.links.map((link) => (
                  <Link key={link} href={link.includes("Contact") ? "/contact" : link.includes("Story") ? "/our-story" : "/shop"} className="text-sm text-white/72 transition hover:text-white">
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-[#f1c27d]">Follow</h3>
          <div className="mt-4 flex gap-3">
            {[Camera, Share2, CirclePlay].map((Icon, index) => (
              <span key={index} className="grid h-10 w-10 place-items-center rounded-full border border-white/18 text-white/82">
                <Icon size={18} />
              </span>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            {["UPI", "Visa", "Mastercard", "COD"].map((method) => (
              <span key={method} className="inline-flex items-center gap-1 rounded-full bg-white/9 px-3 py-2 text-xs text-white/78">
                <CreditCard size={13} /> {method}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/12 py-5">
        <div className="container-am flex flex-col gap-2 text-xs text-white/58 sm:flex-row sm:items-center sm:justify-between">
          <span>Copyright 2026 AM Handicrafts. Frontend demo only.</span>
          <span>Secure checkout interface · No real payments processed</span>
        </div>
      </div>
    </footer>
  );
}
