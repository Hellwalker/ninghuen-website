import type { Metadata } from "next";
import Link from "next/link";
import { ImageStudio } from "@/components/image-studio";
import { ParamChip } from "@/components/param-chip";
import { ShotImage } from "@/components/shot-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SHOTS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Image AI",
  description:
    "E-commerce visual rebuilding: cast a model, lock quantity, ratio and style, then generate a scenery collage with photo parameters.",
};

const cafe = SHOTS.find((shot) => shot.id === "cafe")!;
const greenhouse = SHOTS.find((shot) => shot.id === "greenhouse")!;
const garden = SHOTS.find((shot) => shot.id === "garden")!;
const macro = SHOTS.find((shot) => shot.id === "macro")!;

export default function ImageEditingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pt-12 pb-24 sm:px-6">
      <div className="max-w-3xl">
        <Badge className="bg-teal-400/15 text-teal-200">Core product · Image AI</Badge>
        <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight sm:text-6xl">
          E-commerce visual
          <span className="block bg-linear-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">
            rebuilding engine
          </span>
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-white/65">
          Bulk SKUs arrive as a URL or CSV. The engine does not stop at a pretty
          background — it forms a scenery, then prints the photograph the way a
          studio would: talent, ratio, style, and a parameter strip on every
          frame. Pick the best, then edit it because the recipe is already known.
        </p>
      </div>

      <div className="mt-12 grid gap-3 md:grid-cols-3">
        <StoryCard
          image={cafe.image}
          kicker="16:9 lifestyle"
          title="Window cafe"
          scene={cafe.scene}
          params={cafe.params}
        />
        <StoryCard
          image={greenhouse.image}
          kicker="9:16 lookbook"
          title="Greenhouse"
          scene={greenhouse.scene}
          params={greenhouse.params}
        />
        <StoryCard
          image={garden.image}
          kicker="4:5 editorial"
          title="White rose garden"
          scene={garden.scene}
          params={garden.params}
        />
      </div>

      <section className="mt-20 grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs tracking-[0.16em] text-teal-300 uppercase">
            Why parameters travel with the image
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold">
            A collage you can argue with
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Merchandisers do not want a black box. Each generated plate lists
            the scene in plain language and the camera in studio language —
            lens, aperture, lighting, grade. When a look is almost right, the
            editor opens on that exact brief instead of a blank prompt.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/70">
            <li>— Human model cards, including a product-only still-life path.</li>
            <li>— Quantity 4 / 6 / 8 so campaigns can be compared as a board.</li>
            <li>— Ratios for PDP, lookbook, banner and story in one pass.</li>
            <li>— Styles from catalog to cinematic night, without losing SKU color.</li>
          </ul>
          <Button
            render={<Link href="/gallery/" />}
            variant="outline"
            className="mt-6 border-white/15 bg-transparent text-white"
          >
            Browse the gallery
          </Button>
        </div>
        <div className="relative">
          <ShotImage
            src={macro.image}
            alt={macro.title}
            className="aspect-square rounded-[28px]"
          />
          <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-2">
            <ParamChip label="Lens" value={macro.params.lens} />
            <ParamChip label="Aperture" value={macro.params.aperture} />
            <ParamChip label="Lighting" value={macro.params.lighting} className="col-span-2" />
          </div>
        </div>
      </section>

      <section id="studio" className="mt-24 scroll-mt-24">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs tracking-[0.16em] text-teal-300 uppercase">
            ChatCanvas-style board
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold">
            Generate a scenery collage
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            This studio runs on a curated sapphire-halo catalog so you can feel
            the controls without waiting on a GPU. The live product uses the
            same board: settings on the left, thinking in systems, then a
            collage you can click into.
          </p>
        </div>
        <ImageStudio />
      </section>
    </main>
  );
}

function StoryCard({
  image,
  kicker,
  title,
  scene,
  params,
}: {
  image: string;
  kicker: string;
  title: string;
  scene: string;
  params: (typeof cafe)["params"];
}) {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/8 bg-white/3">
      <ShotImage src={image} alt={title} className="aspect-[4/5]" />
      <div className="p-4">
        <p className="text-[10px] tracking-[0.14em] text-teal-300 uppercase">{kicker}</p>
        <h3 className="mt-1 font-heading text-lg font-semibold">{title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-white/55">{scene}</p>
        <p className="mt-3 font-mono text-[10px] text-white/40">
          {params.lens} · {params.aperture} · {params.iso}
        </p>
      </div>
    </article>
  );
}
