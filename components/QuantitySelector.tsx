"use client";

import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 20,
}: {
  value: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex h-11 items-center rounded-full border border-[#ded4c4] bg-white">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="grid h-11 w-11 place-items-center rounded-full text-[#315448] transition hover:bg-[#f3eadc]"
      >
        <Minus size={16} />
      </button>
      <span className="w-9 text-center text-sm font-semibold">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="grid h-11 w-11 place-items-center rounded-full text-[#315448] transition hover:bg-[#f3eadc]"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
