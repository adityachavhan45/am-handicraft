"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/lib/products";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fbf7ef] pt-32" />}>
      <SearchView />
    </Suspense>
  );
}

function SearchView() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return products;
    return products.filter((product) =>
      [product.name, product.category, product.material].some((field) =>
        field.toLowerCase().includes(value),
      ),
    );
  }, [query]);

  return (
    <div className="bg-[#fbf7ef] pt-32">
      <div className="container-am pb-20">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#a15d38]">Search</p>
        <h1 className="mt-3 font-serif text-[2.3rem] font-semibold sm:text-5xl">Find a handcrafted piece</h1>
        <div className="mt-8 flex items-center gap-3 rounded-[8px] border border-[#e5dac8] bg-white p-4 shadow-sm">
          <Search className="text-[#315448]" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by product, category, or material" className="h-12 min-w-0 flex-1 bg-transparent text-base outline-none sm:text-lg" />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {["Wooden Decor", "Brass Decor", "Gifts", "Wall Decor", "Lamps"].map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => setQuery(suggestion)} className="rounded-full border border-[#d8c6ad] bg-white px-4 py-2 text-sm font-semibold">
              {suggestion}
            </button>
          ))}
        </div>
        <p className="mt-8 text-sm text-[#7f7468]">{results.length} results</p>
        <div className="mt-5">
          <ProductGrid products={results} />
        </div>
      </div>
    </div>
  );
}
