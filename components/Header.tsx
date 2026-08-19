"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { formatPrice, products } from "@/lib/products";
import { getCartProducts, useStore } from "@/lib/store-context";
import { QuantitySelector } from "@/components/QuantitySelector";

const navItems = [
  ["Home", "/"],
  ["Shop", "/shop"],
  ["New Arrivals", "/shop?sort=Newest"],
  ["Best Sellers", "/shop?sort=Best%20Selling"],
  ["Collections", "/collections/home-decor"],
  ["Our Story", "/our-story"],
  ["Contact", "/contact"],
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, wishlist, setCartOpen, setSearchOpen } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-40 transition ${scrolled ? "bg-[#fffaf2]/96 shadow-[0_12px_35px_rgba(46,34,22,0.09)] backdrop-blur" : "bg-[#fffaf2]/88 backdrop-blur-sm"}`}>
        <AnnouncementBar />
        <div className="container-am flex h-18 items-center justify-between gap-2 sm:h-20 sm:gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3" aria-label="AM Handicrafts home">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#d8c6ad] bg-[#315448] font-serif text-lg font-bold text-white sm:h-11 sm:w-11 sm:text-xl">
              AM
            </span>
            <span className="hidden font-serif text-xl font-semibold leading-none text-[#1d1b18] sm:block lg:text-2xl">
              AM Handicrafts
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-[#3d3832] lg:flex">
            {navItems.map(([label, href]) => (
              <Link key={label} href={href} className="transition hover:text-[#a15d38]">
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            <IconButton label="Search" onClick={() => setSearchOpen(true)}>
              <Search size={20} />
            </IconButton>
            <LinkIcon label="Wishlist" href="/wishlist" count={wishlist.length}>
              <Heart size={20} />
            </LinkIcon>
            <LinkIcon label="Account demo" href="/checkout" className="hidden sm:grid">
              <UserRound size={20} />
            </LinkIcon>
            <IconButton label="Cart" onClick={() => setCartOpen(true)} count={cartCount}>
              <ShoppingBag size={20} />
            </IconButton>
            <IconButton label="Open menu" onClick={() => setMenuOpen(true)} className="lg:hidden">
              <Menu size={22} />
            </IconButton>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay />
      <CartDrawer />
    </>
  );
}

function AnnouncementBar() {
  return (
    <div className="border-b border-[#e8ddcd] bg-[#24463d] text-white">
      <div className="container-am flex h-9 items-center justify-center gap-4 overflow-hidden text-center text-[10px] font-semibold uppercase tracking-[0.14em] sm:justify-between sm:text-[11px] sm:tracking-[0.16em]">
        <span>Free Shipping Above ₹1,499</span>
        <span className="hidden sm:inline">Handcrafted in India</span>
        <span className="hidden md:inline">Easy Returns & Secure Checkout</span>
      </div>
    </div>
  );
}

function IconButton({
  label,
  children,
  onClick,
  count,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
  count?: number;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`relative grid h-10 w-10 place-items-center rounded-full text-[#2e4b42] transition hover:bg-[#efe3d3] sm:h-11 sm:w-11 ${className}`}
    >
      {children}
      {count ? <Counter count={count} /> : null}
    </button>
  );
}

function LinkIcon({
  label,
  href,
  children,
  count,
  className = "",
}: {
  label: string;
  href: string;
  children: React.ReactNode;
  count?: number;
  className?: string;
}) {
  return (
    <Link
      aria-label={label}
      title={label}
      href={href}
      className={`relative grid h-10 w-10 place-items-center rounded-full text-[#2e4b42] transition hover:bg-[#efe3d3] sm:h-11 sm:w-11 ${className}`}
    >
      {children}
      {count ? <Counter count={count} /> : null}
    </Link>
  );
}

function Counter({ count }: { count: number }) {
  return (
    <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#b76e45] px-1 text-[10px] font-bold text-white">
      {count}
    </span>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="absolute inset-0 bg-black/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 h-full w-[88vw] max-w-sm bg-[#fffaf2] p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-3xl font-semibold">AM Handicrafts</span>
              <button type="button" aria-label="Close menu" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-[#efe3d3]">
                <X size={18} />
              </button>
            </div>
            <nav className="mt-9 grid gap-1">
              {navItems.map(([label, href]) => (
                <Link key={label} href={href} onClick={onClose} className="rounded-[8px] px-3 py-4 text-lg font-semibold text-[#2b2823] hover:bg-[#f1e5d6]">
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mt-9 rounded-[8px] border border-[#e3d8c8] p-4 text-sm leading-6 text-[#6e665c]">
              Handcrafted Indian decor, packed with care for homes, weddings, festivals, and memorable gifting.
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

function SearchOverlay() {
  const { isSearchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return products.slice(0, 5);
    return products
      .filter((product) =>
        [product.name, product.category, product.material].some((field) =>
          field.toLowerCase().includes(value),
        ),
      )
      .slice(0, 6);
  }, [query]);

  const submit = (value: string) => {
    router.push(`/search?q=${encodeURIComponent(value)}`);
    setSearchOpen(false);
  };

  return (
    <AnimatePresence>
      {isSearchOpen ? (
        <div className="fixed inset-0 z-50">
          <motion.button
            type="button"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
            className="absolute inset-0 bg-[#1f1c18]/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            className="container-am relative mt-18 rounded-[8px] border border-[#e3d8c8] bg-[#fffaf2] p-4 shadow-2xl sm:mt-20 sm:p-5 md:p-8"
          >
            <div className="flex items-center gap-3">
              <Search className="text-[#315448]" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") submit(query || "Wooden Decor");
                }}
                placeholder="Search wooden decor, brass, gifts..."
                className="h-14 flex-1 bg-transparent text-lg outline-none placeholder:text-[#9b9287]"
              />
              <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-[#efe3d3]">
                <X size={18} />
              </button>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Wooden Decor", "Brass Decor", "Gifts", "Wall Decor", "Lamps"].map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => submit(suggestion)} className="rounded-full border border-[#d8c6ad] px-4 py-2 text-sm transition hover:border-[#315448] hover:text-[#315448]">
                  {suggestion}
                </button>
              ))}
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {results.map((product) => (
                <Link key={product.id} href={`/product/${product.slug}`} onClick={() => setSearchOpen(false)} className="flex items-center gap-4 rounded-[8px] border border-[#eadfce] bg-white p-3 transition hover:border-[#315448]">
                  <div className="relative h-20 w-20 overflow-hidden rounded-[8px] bg-[#eee3d3]">
                    <Image src={product.images[0]} alt={product.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="mt-1 text-sm text-[#7f7468]">{product.category} · {formatPrice(product.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

function CartDrawer() {
  const { isCartOpen, setCartOpen, cart, subtotal, removeFromCart, updateQuantity } = useStore();
  const lines = getCartProducts(cart);
  const shipping = subtotal > 1499 || subtotal === 0 ? 0 : 99;

  return (
    <AnimatePresence>
      {isCartOpen ? (
        <div className="fixed inset-0 z-50">
          <motion.button
            type="button"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-black/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#fffaf2] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#e3d8c8] p-5">
              <span className="font-serif text-3xl font-semibold">Your Cart</span>
              <button type="button" aria-label="Close cart" onClick={() => setCartOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-[#efe3d3]">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {lines.length ? (
                <div className="space-y-4">
                  {lines.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-4 rounded-[8px] border border-[#e6dac9] bg-white p-3">
                      <div className="relative h-24 w-20 overflow-hidden rounded-[8px] bg-[#eee3d3]">
                        <Image src={product.images[0]} alt={product.name} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{product.name}</p>
                        <p className="mt-1 text-sm text-[#7f7468]">{formatPrice(product.price)}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <QuantitySelector value={quantity} onChange={(next) => updateQuantity(product.id, next)} />
                          <button type="button" aria-label={`Remove ${product.name}`} onClick={() => removeFromCart(product.id)} className="text-[#a15d38]">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <ShoppingBag className="mx-auto text-[#315448]" size={42} />
                    <p className="mt-4 font-serif text-3xl font-semibold">Your cart is empty</p>
                    <p className="mt-2 text-sm text-[#7f7468]">Add a handcrafted piece to begin the demo flow.</p>
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-[#e3d8c8] p-5">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
                <div className="flex justify-between text-[#6e665c]"><span>Shipping</span><span>{shipping ? formatPrice(shipping) : "Free"}</span></div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Link href="/cart" onClick={() => setCartOpen(false)} className="rounded-full border border-[#315448] px-5 py-3 text-center text-sm font-semibold text-[#315448] transition hover:bg-[#edf3ef]">
                  View Cart
                </Link>
                <Link href="/checkout" onClick={() => setCartOpen(false)} className="rounded-full bg-[#315448] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#233e36]">
                  Checkout
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
