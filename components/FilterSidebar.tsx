"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { categories, materials } from "@/lib/products";

export type ProductFilters = {
  category: string;
  material: string;
  maxPrice: number;
  minRating: number;
  availability: string;
  sort: string;
};

export const defaultFilters: ProductFilters = {
  category: "All",
  material: "All",
  maxPrice: 7000,
  minRating: 0,
  availability: "All",
  sort: "Featured",
};

export function FilterSidebar({
  filters,
  setFilters,
  className = "",
}: {
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
  className?: string;
}) {
  return (
    <aside className={`rounded-[8px] border border-[#e5dac8] bg-white p-5 ${className}`}>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em]">
          <SlidersHorizontal size={16} /> Filters
        </h2>
        <button type="button" className="text-sm text-[#a15d38]" onClick={() => setFilters(defaultFilters)}>
          Reset
        </button>
      </div>
      <div className="space-y-6">
        <FilterSelect
          label="Category"
          value={filters.category}
          options={["All", ...categories.map((category) => category.name)]}
          onChange={(category) => setFilters({ ...filters, category })}
        />
        <FilterSelect
          label="Material"
          value={filters.material}
          options={["All", ...materials]}
          onChange={(material) => setFilters({ ...filters, material })}
        />
        <div>
          <label className="text-sm font-semibold">Price up to</label>
          <input
            type="range"
            min={500}
            max={7000}
            step={100}
            value={filters.maxPrice}
            onChange={(event) => setFilters({ ...filters, maxPrice: Number(event.target.value) })}
            className="mt-3 w-full accent-[#315448]"
          />
          <div className="mt-1 flex justify-between text-xs text-[#7f7468]">
            <span>₹500</span>
            <span>₹{filters.maxPrice.toLocaleString("en-IN")}</span>
          </div>
        </div>
        <FilterSelect
          label="Availability"
          value={filters.availability}
          options={["All", "In Stock", "Low Stock"]}
          onChange={(availability) => setFilters({ ...filters, availability })}
        />
        <FilterSelect
          label="Rating"
          value={String(filters.minRating)}
          options={["0", "4", "4.5", "4.8"]}
          labels={{ "0": "All Ratings", "4": "4.0+", "4.5": "4.5+", "4.8": "4.8+" }}
          onChange={(minRating) => setFilters({ ...filters, minRating: Number(minRating) })}
        />
      </div>
    </aside>
  );
}

export function MobileFilterDrawer({
  open,
  onClose,
  filters,
  setFilters,
}: {
  open: boolean;
  onClose: () => void;
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
}) {
  return (
    <div className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}>
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className={`absolute inset-0 bg-black/45 transition ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div className={`absolute bottom-0 left-0 right-0 max-h-[86vh] overflow-y-auto rounded-t-[8px] bg-[#fbf7ef] p-4 transition duration-300 ${open ? "translate-y-0" : "translate-y-full"}`}>
        <div className="mb-3 flex items-center justify-between">
          <span className="font-serif text-2xl font-semibold">Refine Shop</span>
          <button type="button" aria-label="Close filters" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-white">
            <X size={18} />
          </button>
        </div>
        <FilterSidebar filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  labels,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  labels?: Record<string, string>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-[8px] border border-[#ded4c4] bg-[#fffaf2] px-3 text-sm outline-none transition focus:border-[#315448]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {labels?.[option] ?? option}
          </option>
        ))}
      </select>
    </label>
  );
}
