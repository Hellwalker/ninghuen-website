"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Aperture, Check, Sparkles } from "lucide-react";
import { ParamChip } from "@/components/param-chip";
import { ShotImage } from "@/components/shot-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getModel,
  getShot,
  getStyle,
  PRODUCT,
  relatedShots,
  SHOTS,
  type Shot,
} from "@/lib/catalog";
import { paramLine } from "@/lib/format";
import { cn } from "@/lib/utils";

const REGIONS = [
  {
    id: "product",
    label: "Pendant",
    hint: "Keep SKU geometry. Push gem fire or metal warmth.",
    box: "right-[28%] bottom-[18%] h-[22%] w-[18%]",
  },
  {
    id: "talent",
    label: "Model",
    hint: "Pose and wardrobe stay; lighting on the face can move.",
    box: "left-[32%] top-[12%] h-[38%] w-[36%]",
  },
  {
    id: "set",
    label: "Scenery",
    hint: "Location and time of day — the editable world around the SKU.",
    box: "left-[6%] top-[8%] h-[30%] w-[28%]",
  },
] as const;

type RegionId = (typeof REGIONS)[number]["id"];

const EDITS: Record<
  RegionId,
  { label: string; description: string; resultId: string; fallbackFilter?: string }[]
> = {
  product: [
    {
      label: "Macro gem fire",
      description: "Crop into the pavilion. Catalog polarizer, f/13 stack.",
      resultId: "macro",
    },
    {
      label: "Warmer gold grade",
      description: "Hold geometry, push 4800K so the 18k reads richer.",
      resultId: "pendant-warm",
    },
  ],
  talent: [
    {
      label: "Dusk recast",
      description: "Same blocking, blue hour + tungsten practical.",
      resultId: "terrace-dusk",
    },
    {
      label: "Studio lookbook",
      description: "Remove location. Three-point beauty, seamless grey.",
      resultId: "studio-aria",
    },
  ],
  set: [
    {
      label: "Garden roses",
      description: "Open shade, white roses, romantic editorial.",
      resultId: "garden",
    },
    {
      label: "Rain city night",
      description: "Wet pavement, storefront tungsten, teal-amber grade.",
      resultId: "night",
    },
  ],
};

export function ShotEditor({ shot }: { shot: Shot }) {
  const [active, setActive] = useState<RegionId | null>(null);
  const [current, setCurrent] = useState(shot);
  const [note, setNote] = useState<string | null>(null);
  const original = getShot("original") ?? SHOTS[0];
  const model = getModel(current.model);
  const style = getStyle(current.style);
  const related = useMemo(() => relatedShots(current), [current]);

  function apply(resultId: string, label: string) {
    const next = getShot(resultId);
    if (!next) {
      setNote("That edit is not in this demo catalog.");
      return;
    }
    setCurrent(next);
    setNote(`Applied “${label}”. Scene and camera notes updated with the new plate.`);
    setActive(null);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
      <div>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            render={<Link href="/gallery/" />}
            className="text-white/70"
          >
            <ArrowLeft className="size-4" />
            Gallery
          </Button>
          <Badge variant="outline" className="border-white/15 text-white/70">
            Single-plate editor
          </Badge>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#080f27]">
          <div className="relative">
            <ShotImage
              src={current.image}
              alt={current.title}
              className="aspect-[4/5] w-full sm:aspect-[16/11]"
            />
            {REGIONS.map((region) => (
              <button
                key={region.id}
                type="button"
                onClick={() => setActive(region.id)}
                className={cn(
                  "absolute rounded-xl border border-dashed transition-colors",
                  region.box,
                  active === region.id
                    ? "border-teal-300 bg-teal-400/15"
                    : "border-white/30 bg-white/0 hover:bg-white/10"
                )}
              >
                <span className="absolute -top-3 left-2 rounded bg-[#070d24]/90 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-teal-200">
                  {region.label}
                </span>
              </button>
            ))}
          </div>
          <div className="grid gap-px border-t border-white/8 bg-white/5 sm:grid-cols-2">
            <div className="p-4">
              <p className="text-[10px] tracking-[0.14em] text-white/40 uppercase">
                Seed SKU
              </p>
              <ShotImage
                src={original.image}
                alt="Original pendant"
                className="mt-2 aspect-square max-w-[180px] rounded-xl"
              />
            </div>
            <div className="p-4">
              <p className="text-[10px] tracking-[0.14em] text-white/40 uppercase">
                Live parameters
              </p>
              <p className="mt-2 font-mono text-xs leading-relaxed text-teal-200/85">
                {paramLine(current.params)}
              </p>
              <p className="mt-2 text-xs text-white/50">
                Click a dashed region, then apply a known edit. Geometry of the
                sapphire halo stays the source of truth.
              </p>
            </div>
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-3xl border border-white/10 bg-white/3 p-5">
          <p className="text-[10px] tracking-[0.16em] text-teal-300 uppercase">
            {PRODUCT.sku}
          </p>
          <h1 className="mt-1 font-heading text-2xl font-semibold">{current.title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-white/60">{current.scene}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="border-white/15 text-white/70">
              {model?.name}
            </Badge>
            <Badge variant="outline" className="border-white/15 text-white/70">
              {style?.name}
            </Badge>
            <Badge variant="outline" className="border-white/15 text-white/70">
              {current.ratio}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <ParamChip label="Camera" value={current.params.camera} />
          <ParamChip label="Lens" value={current.params.lens} />
          <ParamChip label="Aperture" value={current.params.aperture} />
          <ParamChip label="Shutter" value={current.params.shutter} />
          <ParamChip label="ISO" value={current.params.iso} />
          <ParamChip label="WB" value={current.params.whiteBalance} />
          <ParamChip label="Lighting" value={current.params.lighting} className="col-span-2" />
          <ParamChip label="Focus" value={current.params.focus} />
          <ParamChip label="Grade" value={current.params.grade} />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/3 p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium">
            <Sparkles className="size-4 text-teal-300" />
            Region edits
          </div>
          {active ? (
            <div className="space-y-2">
              <p className="text-xs text-white/50">
                {REGIONS.find((region) => region.id === active)?.hint}
              </p>
              {EDITS[active].map((edit) => (
                <button
                  key={edit.label}
                  type="button"
                  onClick={() => apply(edit.resultId, edit.label)}
                  className="w-full rounded-xl border border-white/10 px-3 py-2.5 text-left hover:border-teal-400/40 hover:bg-teal-400/8"
                >
                  <p className="text-sm font-medium">{edit.label}</p>
                  <p className="text-[11px] text-white/50">{edit.description}</p>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-white/50">
              Select Pendant, Model, or Scenery on the plate. Edits remap to a
              known variant so the scene copy and EXIF-style notes stay truthful.
            </p>
          )}
          {note ? (
            <p className="mt-3 flex gap-2 rounded-xl border border-teal-400/20 bg-teal-400/10 px-3 py-2 text-xs text-teal-100">
              <Check className="mt-0.5 size-3.5 shrink-0" />
              {note}
            </p>
          ) : null}
        </div>

        <div>
          <p className="mb-2 text-xs tracking-[0.14em] text-white/40 uppercase">
            Nearby looks
          </p>
          <div className="grid grid-cols-2 gap-2">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/gallery/${item.id}/`}
                className="overflow-hidden rounded-xl border border-white/8 hover:border-teal-400/30"
              >
                <ShotImage src={item.image} alt={item.title} className="aspect-square" />
              </Link>
            ))}
          </div>
        </div>

        <Button
          render={<Link href="/image-editing/#studio" />}
          className="w-full bg-linear-to-r from-teal-500 to-blue-600 text-white"
        >
          <Aperture className="size-4" />
          Back to collage studio
        </Button>
      </aside>
    </div>
  );
}
