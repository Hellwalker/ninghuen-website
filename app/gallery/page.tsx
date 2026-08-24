import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Every generated plate with its scene description and photo parameters. Filter by talent and style, then open a single-plate editor.",
};

export default function GalleryPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pt-12 pb-24 sm:px-6">
      <p className="text-xs tracking-[0.16em] text-teal-300 uppercase">Look library</p>
      <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight">
        Gallery
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
        Original SKU and generated scenery, side by side. Open any plate to
        inspect the brief and run a region edit — pendant, talent, or set.
      </p>
      <div className="mt-10">
        <GalleryGrid />
      </div>
    </main>
  );
}
