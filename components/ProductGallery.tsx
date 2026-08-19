"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-4 md:grid-cols-[96px_1fr]">
      <div className="order-2 flex gap-3 overflow-x-auto pb-1 md:order-1 md:flex-col md:overflow-visible md:pb-0">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`View ${name} image ${index + 1}`}
            className={`relative h-18 w-18 shrink-0 overflow-hidden rounded-[8px] border bg-white sm:h-20 sm:w-20 ${
              active === index ? "border-[#315448]" : "border-[#e5dac8]"
            }`}
          >
            <Image src={image} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
      <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[8px] bg-[#eee3d3] md:order-2">
        <Image
          src={images[active]}
          alt={name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
