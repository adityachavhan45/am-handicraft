import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/lib/products";

export function CategoryCard({ category, large = false }: { category: Category; large?: boolean }) {
  return (
    <Link
      href={`/collections/${category.slug}`}
      className={`group relative overflow-hidden rounded-[8px] bg-[#1f1c18] ${
        large ? "min-h-[320px] md:col-span-2 md:row-span-2 md:min-h-[380px]" : "min-h-[240px] md:min-h-[260px]"
      }`}
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes={large ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
        className="object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-7">
        <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur">
          <ArrowUpRight size={18} />
        </div>
        <h3 className="font-serif text-[1.75rem] font-semibold sm:text-3xl">{category.name}</h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-white/78">{category.description}</p>
      </div>
    </Link>
  );
}
