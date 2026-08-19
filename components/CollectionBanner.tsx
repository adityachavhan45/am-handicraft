import Image from "next/image";

export function CollectionBanner({
  title,
  text,
  image,
  eyebrow = "AM Handicrafts Collection",
}: {
  title: string;
  text: string;
  image: string;
  eyebrow?: string;
}) {
  return (
    <section className="relative min-h-[360px] overflow-hidden bg-[#1f1c18] pt-32 sm:min-h-[420px] sm:pt-40">
      <Image src={image} alt={title} fill priority sizes="100vw" className="object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#171512]/85 via-[#171512]/50 to-transparent" />
      <div className="container-am relative flex min-h-[260px] items-end pb-10 text-white sm:min-h-[300px] sm:pb-12">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f1c27d]">{eyebrow}</p>
          <h1 className="mt-4 font-serif text-[2.3rem] font-semibold leading-tight sm:text-5xl md:text-7xl">{title}</h1>
          <p className="mt-5 text-base leading-7 text-white/82 sm:text-lg sm:leading-8">{text}</p>
        </div>
      </div>
    </section>
  );
}
