"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function HomePitchBanner() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <Link
      href="/pitch/"
      className="group relative z-50 block border-b border-teal-400/30 bg-linear-to-r from-teal-500/18 via-[#07101f] to-blue-600/20"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-2.5">
        <div className="flex min-w-0 items-start gap-3 sm:items-center">
          <span className="mt-0.5 shrink-0 rounded-full border border-teal-400/40 bg-teal-400/10 px-2 py-0.5 text-[10px] tracking-[0.16em] text-teal-200 uppercase sm:mt-0">
            Temporary
          </span>
          <p className="text-sm leading-relaxed text-white/80">
            <span className="font-medium text-white">
              HSITP × Dubai Chambers Tech Exchange.
            </span>{" "}
            14-slide corridor pitch — Company, Team, Technology, Business. Founder: Dr. Danny.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-teal-200 group-hover:text-teal-100">
          Open the deck
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
