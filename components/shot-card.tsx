import Link from "next/link";
import { ShotImage } from "@/components/shot-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Shot } from "@/lib/catalog";
import { getModel, getStyle, ratioClass } from "@/lib/catalog";
import { paramLine } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ShotCard({
  shot,
  featured = false,
}: {
  shot: Shot;
  featured?: boolean;
}) {
  const model = getModel(shot.model);
  const style = getStyle(shot.style);

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/3 transition-colors hover:border-teal-400/30 hover:bg-white/5",
        featured && "sm:col-span-2"
      )}
    >
      <ShotImage
        src={shot.image}
        alt={shot.title}
        className={cn("w-full", featured ? "aspect-[16/10]" : ratioClass(shot.ratio))}
      />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {shot.isOriginal ? (
            <Badge variant="outline" className="border-amber-400/40 text-amber-200">
              Original SKU
            </Badge>
          ) : null}
          <Badge variant="outline" className="border-white/15 text-white/70">
            {shot.ratio}
          </Badge>
          <Badge variant="outline" className="border-white/15 text-white/70">
            {style?.name}
          </Badge>
        </div>
        <div>
          <h3 className="font-heading text-base font-semibold">{shot.title}</h3>
          <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-white/60">
            {shot.scene}
          </p>
        </div>
        <p className="font-mono text-[11px] leading-relaxed text-teal-200/80">
          {paramLine(shot.params)}
        </p>
        <p className="text-xs text-white/45">
          Model · {model?.name}
          {shot.editOf ? " · derived edit" : ""}
        </p>
        <Button
          render={<Link href={`/gallery/${shot.id}/`} />}
          variant="outline"
          className="mt-auto border-white/15 bg-transparent text-white hover:bg-white/10"
        >
          Open in editor
        </Button>
      </div>
    </article>
  );
}
