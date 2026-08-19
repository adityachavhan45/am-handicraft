import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, PackageCheck, RotateCcw, Ruler, Star } from "lucide-react";
import { ProductActions } from "@/components/ProductActions";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductGrid } from "@/components/ProductGrid";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { formatPrice, getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;
  const related = products
    .filter((candidate) => candidate.category === product.category && candidate.id !== product.id)
    .slice(0, 4);
  const recentFallback = products.filter((candidate) => candidate.id !== product.id).slice(0, 4);

  return (
    <div className="bg-[#fbf7ef] pt-32">
      <div className="container-am pb-20">
        <nav className="mb-7 flex flex-wrap items-center gap-2 text-sm text-[#7f7468]">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <Link href="/shop">Shop</Link>
          <ChevronRight size={14} />
          <span className="text-[#1d1b18]">{product.name}</span>
        </nav>

        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <ProductGallery images={product.images} name={product.name} />
          <div className="lg:sticky lg:top-32 lg:h-max">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#a15d38]">{product.category}</p>
            <h1 className="mt-3 font-serif text-[2.4rem] font-semibold leading-tight sm:text-5xl md:text-6xl">{product.name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-semibold">
                <Star size={15} fill="#c18a43" className="text-[#c18a43]" /> {product.rating}
              </span>
              <span className="text-[#7f7468]">{product.reviewCount} reviews</span>
              <span className="text-[#315448]">{product.stock > 10 ? "In stock" : "Low stock"}</span>
            </div>
            <div className="mt-6 flex flex-wrap items-end gap-3">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.originalPrice ? <span className="text-lg text-[#92877b] line-through">{formatPrice(product.originalPrice)}</span> : null}
              {discount ? <span className="rounded-full bg-[#f1e1c7] px-3 py-1 text-sm font-bold text-[#8f4d31]">{discount}% off</span> : null}
            </div>
            <p className="mt-2 text-sm text-[#7f7468]">Inclusive of taxes. Shipping calculated at checkout.</p>
            <p className="mt-6 text-base leading-7 text-[#5f574f] sm:text-lg sm:leading-8">{product.description}</p>

            <ProductActions productId={product.id} />

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                [PackageCheck, "Carefully packed"],
                [RotateCcw, "Easy returns"],
                [Ruler, product.dimensions],
              ].map(([Icon, label]) => (
                <div key={String(label)} className="rounded-[8px] border border-[#e5dac8] bg-white p-4 text-sm font-semibold">
                  <Icon className="mb-3 text-[#315448]" size={20} />
                  {String(label)}
                </div>
              ))}
            </div>

            <div className="mt-8 divide-y divide-[#e3d8c8] rounded-[8px] border border-[#e3d8c8] bg-white">
              {[
                ["Product Details", product.highlights.join(" · ")],
                ["Dimensions", `${product.dimensions}. Weight: ${product.weight}. Color: ${product.color}.`],
                ["Care Instructions", product.careInstructions],
                ["Shipping & Returns", "Ships in secure protective packaging. Demo returns policy shown for frontend presentation only."],
              ].map(([title, text]) => (
                <details key={title} className="group p-5" open={title === "Product Details"}>
                  <summary className="cursor-pointer list-none font-bold">{title}</summary>
                  <p className="mt-3 text-sm leading-6 text-[#6e665c]">{text}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-[8px] bg-[#172d27] p-6 text-white sm:p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f1c27d]">The Craft Behind This Piece</p>
          <h2 className="mt-4 font-serif text-[2rem] font-semibold sm:text-4xl">Made slowly, finished by hand</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
            This piece is imagined as part of AM Handicrafts&apos; artisan-led collection, where material character, small imperfections, and hand finishing are treated as marks of authenticity.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="font-serif text-[2rem] font-semibold sm:text-4xl">You May Also Like</h2>
          <div className="mt-8">
            <ProductGrid products={related.length ? related : recentFallback} />
          </div>
        </section>
        <RecentlyViewed currentProductId={product.id} />
      </div>
    </div>
  );
}
