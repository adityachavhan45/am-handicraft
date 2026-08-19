import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import { MotionReveal } from "@/components/MotionReveal";

const images = [
  "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1200&h=1000&q=82",
  "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1200&h=1000&q=82",
  "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&h=1000&q=82",
];

export default function OurStoryPage() {
  return (
    <div className="bg-[#fbf7ef] pt-32">
      <section className="container-am grid items-end gap-10 pb-16 lg:grid-cols-[1fr_0.9fr]">
        <MotionReveal>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#a15d38]">Our Story</p>
          <h1 className="mt-4 font-serif text-[3.1rem] font-semibold leading-[0.92] sm:text-6xl md:text-8xl">
            Indian craft, shaped for modern homes.
          </h1>
        </MotionReveal>
        <MotionReveal delay={0.1}>
          <p className="text-base leading-7 text-[#5f574f] sm:text-lg sm:leading-8">
            AM Handicrafts is presented as a premium frontend concept for a handmade decor brand: warm, trustworthy, image-rich, and built around the quiet value of objects made by hand.
          </p>
        </MotionReveal>
      </section>

      <section className="container-am grid gap-5 pb-20 md:grid-cols-3">
        {images.map((image, index) => (
          <div key={image} className={`relative overflow-hidden rounded-[8px] bg-[#eee3d3] ${index === 1 ? "aspect-[4/5]" : "aspect-[4/4] md:mt-12"}`}>
            <Image src={image} alt="AM Handicrafts editorial craft story" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
          </div>
        ))}
      </section>

      <section className="bg-[#172d27] py-20 text-white">
        <div className="container-am grid gap-10 lg:grid-cols-3">
          {[
            ["Our Philosophy", "A home should feel collected over time, not filled in a hurry. Each piece is chosen for material warmth, cultural memory, and daily usefulness."],
            ["Craftsmanship", "The demo emphasizes hand-finished surfaces, natural variations, carved details, textile texture, and objects that carry the maker's touch."],
            ["Indian Heritage", "Motifs, brass rituals, wood craft, festive accents, and gifting traditions are presented through a modern, restrained visual language."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-[8px] border border-white/12 bg-white/7 p-6">
              <Sparkles className="text-[#f1c27d]" size={24} />
              <h2 className="mt-5 font-serif text-[1.9rem] font-semibold sm:text-3xl">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/72">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-am grid items-center gap-10 py-20 lg:grid-cols-2">
        <div className="relative aspect-[5/6] overflow-hidden rounded-[8px]">
          <Image src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&h=1400&q=82" alt="Sustainable handmade home decor" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#a15d38]">
            <Leaf size={15} /> Sustainable Approach
          </p>
          <h2 className="mt-4 font-serif text-[2.3rem] font-semibold leading-tight sm:text-5xl">Why handcrafted matters</h2>
          <p className="mt-6 text-base leading-7 text-[#5f574f] sm:text-lg sm:leading-8">
            Handcrafted products preserve skill, reduce the sameness of mass decor, and give buyers a more meaningful relationship with the objects they bring home.
          </p>
          <p className="mt-4 text-base leading-7 text-[#5f574f] sm:text-lg sm:leading-8">
            This frontend tells that story through immersive imagery, generous whitespace, refined typography, and a shopping flow that feels polished without becoming generic.
          </p>
          <Link href="/shop" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#315448] px-6 py-3 text-sm font-bold text-white">
            Explore Products <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}
