import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Gift,
  HandHeart,
  Leaf,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { CategoryCard } from "@/components/CategoryCard";
import { MotionReveal } from "@/components/MotionReveal";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { categories, galleryImages, products, spaceCollections } from "@/lib/products";

const heroImage =
  "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1800&h=1100&q=82";
const artisanImage =
  "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1400&h=1100&q=82";
const heritageImage =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&h=1100&q=82";
const storyImage =
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1100&h=1200&q=82";

export default function Home() {
  const featured = products.filter((product) => product.isFeatured).slice(0, 8);
  const bestSellers = products.filter((product) => product.isBestSeller).slice(0, 8);

  return (
    <>
      <section className="relative min-h-[680px] overflow-hidden bg-[#1b1a16] pt-24 text-white sm:min-h-[760px] sm:pt-28">
        <Image src={heroImage} alt="Handcrafted decor styled in a warm living room" fill priority sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171512]/90 via-[#171512]/48 to-transparent" />
        <div className="container-am relative flex min-h-[560px] items-center sm:min-h-[620px]">
          <MotionReveal className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#f5cf91] backdrop-blur">
              <Sparkles size={14} /> Handcrafted · Authentic · Premium · Timeless
            </p>
            <h1 className="font-serif text-[3.2rem] font-semibold leading-[0.92] sm:text-6xl md:text-8xl">
              Crafted by Hands. Made for Homes.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/82 sm:text-lg sm:leading-8 md:text-xl">
              Discover timeless handcrafted pieces inspired by Indian traditions and created by skilled artisans.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/shop" className="inline-flex h-13 items-center justify-center rounded-full bg-[#f6e0ba] px-7 text-sm font-bold text-[#172d27] transition hover:bg-white">
                Explore Collection
              </Link>
              <Link href="/shop?sort=Best%20Selling" className="inline-flex h-13 items-center justify-center rounded-full border border-white/40 px-7 text-sm font-bold text-white transition hover:bg-white/12">
                Shop Best Sellers
              </Link>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="texture-paper py-20">
        <div className="container-am grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <MotionReveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[#e9decd]">
              <Image src={storyImage} alt="Premium handcrafted home decor vignette" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
            </div>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#a15d38]">Welcome to AM Handicrafts</p>
            <h2 className="mt-4 font-serif text-[2.3rem] font-semibold leading-tight sm:text-5xl md:text-6xl">
              Every piece tells a story of craft, patience, and place.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#6e665c] sm:text-lg sm:leading-8">
              At AM Handicrafts, every piece tells a story. Our collections celebrate traditional craftsmanship, timeless design and the artistry of skilled Indian artisans.
            </p>
            <Link href="/our-story" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#315448] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#233e36]">
              Discover Our Story <ArrowRight size={17} />
            </Link>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-[#fffaf2] py-20">
        <div className="container-am">
          <SectionHeading eyebrow="Shop by Category" title="Find the craft your room is asking for" text="Editorial collections for homes, festivities, gifting, and considered everyday living." />
          <div className="mt-12 grid auto-rows-[260px] gap-5 md:grid-cols-4">
            {categories.map((category, index) => (
              <CategoryCard key={category.slug} category={category} large={index === 0 || index === 4} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbf7ef] py-20">
        <div className="container-am">
          <SectionHeading eyebrow="Handpicked For You" title="Quiet statement pieces, chosen with care" />
          <div className="mt-12">
            <ProductGrid products={featured} />
          </div>
        </div>
      </section>

      <section className="bg-[#172d27] py-20 text-white">
        <div className="container-am grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <MotionReveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f1c27d]">Artisan Story</p>
            <h2 className="mt-4 font-serif text-[2.3rem] font-semibold leading-tight sm:text-5xl md:text-6xl">
              Made by Artisans, Made with Soul
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/76 sm:text-lg sm:leading-8">
              Behind every AM Handicrafts creation is an artisan whose skill has been passed down through generations.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {["Hand-finished", "Small-batch", "Heritage inspired"].map((item) => (
                <div key={item} className="rounded-[8px] border border-white/12 bg-white/7 p-4 text-sm font-semibold text-white/84">
                  {item}
                </div>
              ))}
            </div>
            <Link href="/our-story" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f6e0ba] px-6 py-3 text-sm font-bold text-[#172d27] transition hover:bg-white">
              Know Our Craft <ArrowRight size={17} />
            </Link>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <div className="relative aspect-[5/6] overflow-hidden rounded-[8px]">
              <Image src={artisanImage} alt="Artisan inspired handmade craft scene" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" />
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-[#fffaf2] py-20">
        <div className="container-am grid items-center overflow-hidden rounded-[8px] border border-[#e5dac8] bg-white shadow-sm lg:grid-cols-2">
          <div className="relative min-h-[420px]">
            <Image src={heritageImage} alt="Heritage inspired wall decor collection" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="p-8 md:p-14">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#a15d38]">Featured Collection</p>
            <h2 className="mt-4 font-serif text-[2.3rem] font-semibold leading-tight sm:text-5xl">The Heritage Collection</h2>
            <p className="mt-5 text-base leading-7 text-[#6e665c] sm:text-lg sm:leading-8">
              Traditional craftsmanship reimagined for contemporary homes with carved wood, brass, textile texture, and festive warmth.
            </p>
            <Link href="/collections/home-decor" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#315448] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#233e36]">
              Explore Collection <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf7ef] py-20">
        <div className="container-am">
          <SectionHeading eyebrow="Most Loved Pieces" title="Client-ready best sellers" />
          <div className="mt-12">
            <ProductGrid products={bestSellers} />
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] py-20">
        <div className="container-am">
          <SectionHeading eyebrow="Style Your Space" title="Designed for real rooms" text="Shop decor by room mood, use, and atmosphere." />
          <div className="mt-12 grid gap-5 min-[480px]:grid-cols-2 md:grid-cols-5">
            {spaceCollections.map((space, index) => (
              <Link key={space.name} href="/shop" className={`group relative min-h-[280px] overflow-hidden rounded-[8px] bg-[#1f1c18] ${index === 0 ? "md:col-span-2" : ""}`}>
                <Image src={space.image} alt={`${space.name} decor`} fill sizes="(max-width: 768px) 100vw, 20vw" className="object-cover opacity-80 transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/68 to-transparent" />
                <h3 className="absolute bottom-5 left-5 font-serif text-3xl font-semibold text-white">{space.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbf7ef] py-20">
        <div className="container-am overflow-hidden rounded-[8px] bg-[#9f5937] text-white">
          <div className="grid items-center lg:grid-cols-[1fr_0.8fr]">
            <div className="p-8 md:p-14">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#f6e0ba]">
                <Gift size={15} /> Festive & Gifting
              </p>
              <h2 className="mt-4 font-serif text-[2.3rem] font-semibold leading-tight sm:text-5xl">Gifts That Feel Personal</h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
                Handcrafted gifts for weddings, celebrations, festivals and special moments.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/collections/gifts" className="rounded-full bg-white px-6 py-3 text-center text-sm font-bold text-[#8f4d31]">Explore Gifts</Link>
                <Link href="/collections/festive-collection" className="rounded-full border border-white/35 px-6 py-3 text-center text-sm font-bold text-white">Shop Festive Collection</Link>
              </div>
            </div>
            <div className="relative min-h-[360px]">
              <Image src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1100&h=900&q=82" alt="Premium handcrafted gifting setup" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] py-20">
        <div className="container-am">
          <div className="grid gap-5 min-[480px]:grid-cols-2 md:grid-cols-4">
            {[
              [HandHeart, "Handcrafted with Care"],
              [Leaf, "Made in India"],
              [ShieldCheck, "Secure Payments"],
              [PackageCheck, "Carefully Packed & Delivered"],
            ].map(([Icon, title]) => (
              <div key={String(title)} className="rounded-[8px] border border-[#e5dac8] bg-white p-6">
                <Icon className="text-[#315448]" size={28} />
                <h3 className="mt-5 text-lg font-bold">{String(title)}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6e665c]">Premium demo experience with a polished, trustworthy shopping flow.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbf7ef] py-20">
        <div className="container-am">
          <SectionHeading eyebrow="Customer Testimonials" title="Loved for detail and finish" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["The craftsmanship is beautiful and the detailing is even better than the pictures.", "Naina S.", "Brass Urli Bowl"],
              ["The wooden tray made our dining setup look warm and premium. Packaging was thoughtful too.", "Rohan M.", "Wooden Serving Tray"],
              ["A perfect wedding gift. It felt personal, elegant, and very Indian without looking dated.", "Aarushi K.", "Wooden Jewellery Box"],
            ].map(([review, name, product]) => (
              <div key={name} className="rounded-[8px] border border-[#e5dac8] bg-white p-6 shadow-sm">
                <div className="flex gap-1 text-[#c18a43]">
                  {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={16} fill="currentColor" />)}
                </div>
                <p className="mt-5 text-base leading-7 text-[#332f29] sm:text-lg sm:leading-8">“{review}”</p>
                <p className="mt-5 font-bold">{name}</p>
                <p className="text-sm text-[#7f7468]">{product}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] py-20">
        <div className="container-am">
          <SectionHeading eyebrow="Inspired by AM Handicrafts" title="A visual world for crafted homes" />
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-6">
            {galleryImages.map((image, index) => (
              <div key={image} className={`group relative aspect-square overflow-hidden rounded-[8px] bg-[#eee3d3] ${index === 0 || index === 5 ? "md:col-span-2 md:row-span-2" : ""}`}>
                <Image src={image} alt="AM Handicrafts lifestyle inspiration" fill sizes="(max-width: 768px) 50vw, 16vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 grid place-items-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
                  <Camera />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbf7ef] py-20">
        <div className="container-am rounded-[8px] border border-[#e5dac8] bg-white p-8 text-center shadow-sm md:p-12">
          <BadgeCheck className="mx-auto text-[#315448]" size={34} />
          <h2 className="mt-4 font-serif text-[2.3rem] font-semibold sm:text-5xl">Stories, Craft & New Collections</h2>
          <p className="mx-auto mt-4 max-w-xl text-[#6e665c]">
            Join our community and discover new handcrafted collections, artisan stories and exclusive offers.
          </p>
          <form className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input type="email" placeholder="Email address" className="h-13 flex-1 rounded-full border border-[#d8c6ad] bg-[#fffaf2] px-5 outline-none focus:border-[#315448]" />
            <button className="h-13 rounded-full bg-[#315448] px-6 text-sm font-bold text-white" type="button">Join the Community</button>
          </form>
        </div>
      </section>
    </>
  );
}
