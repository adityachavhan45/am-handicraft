import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export function EmptyState({
  title,
  text,
  action = "Continue Shopping",
}: {
  title: string;
  text: string;
  action?: string;
}) {
  return (
    <div className="container-am py-20 sm:py-24">
      <div className="mx-auto flex max-w-xl flex-col items-center rounded-[8px] border border-[#e3d8c8] bg-white/80 p-6 text-center shadow-sm sm:p-10">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-[#f0e5d6] text-[#315448]">
          <ShoppingBag />
        </div>
        <h1 className="mt-6 font-serif text-3xl font-semibold sm:text-4xl">{title}</h1>
        <p className="mt-3 text-[#6e665c]">{text}</p>
        <Link
          href="/shop"
          className="mt-7 rounded-full bg-[#315448] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#233e36]"
        >
          {action}
        </Link>
      </div>
    </div>
  );
}
