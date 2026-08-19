"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductGrid } from "@/components/ProductGrid";
import {
  defaultFilters,
  FilterSidebar,
  MobileFilterDrawer,
  type ProductFilters,
} from "@/components/FilterSidebar";
import type { Product } from "@/lib/products";

export function ProductListingClient({
  products,
  initialCategory = "All",
}: {
  products: Product[];
  initialCategory?: string;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({
    ...defaultFilters,
    category: initialCategory,
  });

  const filtered = useMemo(() => {
    const next = products
      .filter((product) => filters.category === "All" || product.category === filters.category)
      .filter((product) => filters.material === "All" || product.material === filters.material)
      .filter((product) => product.price <= filters.maxPrice)
      .filter((product) => product.rating >= filters.minRating)
      .filter((product) =>
        filters.availability === "All"
          ? true
          : filters.availability === "Low Stock"
            ? product.stock <= 10
            : product.stock > 0,
      );

    if (filters.sort === "Newest") next.sort((a, b) => Number(Boolean(b.isNewArrival)) - Number(Boolean(a.isNewArrival)));
    if (filters.sort === "Price Low to High") next.sort((a, b) => a.price - b.price);
    if (filters.sort === "Price High to Low") next.sort((a, b) => b.price - a.price);
    if (filters.sort === "Best Selling") next.sort((a, b) => Number(Boolean(b.isBestSeller)) - Number(Boolean(a.isBestSeller)) || b.reviewCount - a.reviewCount);
    if (filters.sort === "Featured") next.sort((a, b) => Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)));
    return next;
  }, [filters, products]);

  return (
    <div className="container-am grid gap-7 py-12 lg:grid-cols-[280px_1fr]">
      <FilterSidebar filters={filters} setFilters={setFilters} className="hidden h-max lg:block" />
      <section>
        <div className="mb-6 flex flex-col gap-4 rounded-[8px] border border-[#e5dac8] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">{filtered.length} pieces</p>
            <p className="text-sm text-[#7f7468]">Frontend filters, sorting, wishlist, and quick add are active.</p>
          </div>
          <div className="flex flex-col gap-3 min-[480px]:flex-row">
            <button type="button" onClick={() => setDrawerOpen(true)} className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#d8c6ad] px-4 text-sm font-semibold lg:hidden">
              <SlidersHorizontal size={16} /> Filters
            </button>
            <select
              value={filters.sort}
              onChange={(event) => setFilters({ ...filters, sort: event.target.value })}
              className="h-11 rounded-full border border-[#d8c6ad] bg-[#fffaf2] px-4 text-sm font-semibold outline-none"
            >
              {["Featured", "Newest", "Price Low to High", "Price High to Low", "Best Selling"].map((sort) => (
                <option key={sort}>{sort}</option>
              ))}
            </select>
          </div>
        </div>
        <ProductGrid products={filtered} />
      </section>
      <MobileFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
}
