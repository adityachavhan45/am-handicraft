export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl px-1 text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#a15d38]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-serif text-[2.1rem] font-semibold leading-[1.05] text-[#1d1b18] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {text ? <p className="mt-4 text-base leading-7 text-[#6e665c] md:text-lg">{text}</p> : null}
    </div>
  );
}
