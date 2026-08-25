import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Aperture, Images, PenLine } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { ParamChip } from "@/components/param-chip";
import { ShotImage } from "@/components/shot-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PRODUCT, SHOTS } from "@/lib/catalog";
import { paramLine } from "@/lib/format";

const hero = SHOTS.find((shot) => shot.id === "terrace")!;
const night = SHOTS.find((shot) => shot.id === "night")!;
const velvet = SHOTS.find((shot) => shot.id === "velvet")!;
const street = SHOTS.find((shot) => shot.id === "street")!;

export default function HomePage() {
  return (
    <main>
      <section className="relative mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 sm:pt-14">
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <Badge className="bg-teal-400/15 text-teal-200">
            Supported by HSITP SPIN Programme
          </Badge>
          <Badge variant="outline" className="border-white/15 text-white/70">
            Image AI · scenery with locked camera notes
          </Badge>
        </div>

        <div className="grid items-end gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <BrandLogo variant="lockup" className="mb-5 h-[4.75rem] sm:h-24" />
            <p className="text-xs tracking-[0.2em] text-teal-300 uppercase">
              Ning Huen Technology
            </p>
            <h1 className="mt-3 font-heading text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
              Form a scenery.
              <span className="mt-1 block bg-linear-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">
                Keep every plate editable.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              From a SKU master we cast a human model, lock quantity, ratio and
              style, then return a collage — each frame carrying a scene
              description and photo parameters so merchandisers can pick a
              winner and edit it in place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                render={<Link href="/image-editing/#studio" />}
                className="h-11 bg-linear-to-r from-teal-500 to-blue-600 px-5 text-white"
              >
                Open Image AI studio
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/content-moderation.html" />}
                className="h-11 border-white/15 bg-transparent px-5 text-white"
              >
                Content AI pitch
              </Button>
            </div>
          </div>

          <div className="relative">
            <ShotImage
              src={hero.image}
              alt={hero.title}
              className="aspect-[4/5] rounded-[28px] sm:aspect-[16/11]"
            />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <ParamChip label="Lens" value={hero.params.lens} />
              <ParamChip label="Aperture" value={hero.params.aperture} />
              <ParamChip label="ISO" value={hero.params.iso} />
            </div>
            <div className="absolute right-4 bottom-14 max-w-sm rounded-2xl border border-white/10 bg-[#070d24]/80 p-4 backdrop-blur-md">
              <p className="text-[10px] tracking-[0.16em] text-teal-300 uppercase">
                Campaign hero · Aria Chen
              </p>
              <p className="mt-1 font-heading text-lg font-semibold">{hero.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-white/70">{hero.scene}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.16em] text-teal-300 uppercase">
              SKU in, world out
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold">
              Original plate, then scenery
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm text-white/50 sm:block">
            {PRODUCT.name}. Seed from the catalog master, then dress it with
            location, talent and light.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-[0.7fr_1.3fr]">
          <figure className="overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-3">
            <ShotImage
              src={PRODUCT.original}
              alt="Original sapphire pendant"
              className="aspect-square rounded-2xl"
            />
            <figcaption className="px-2 pt-3">
              <p className="text-xs text-amber-200">Original SKU</p>
              <p className="font-heading text-lg font-medium">{PRODUCT.name}</p>
              <p className="text-sm text-white/50">{PRODUCT.material}</p>
            </figcaption>
          </figure>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[hero, night, velvet, street].map((shot) => (
              <Link
                key={shot.id}
                href={`/gallery/${shot.id}/`}
                className="group overflow-hidden rounded-2xl border border-white/8"
              >
                <ShotImage src={shot.image} alt={shot.title} className="aspect-[4/5]" />
                <div className="p-3">
                  <p className="text-sm font-medium group-hover:text-teal-200">
                    {shot.title}
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-white/40">
                    {paramLine(shot.params)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <p className="text-xs tracking-[0.16em] text-teal-300 uppercase">
          Design, beyond a single render
        </p>
        <h2 className="mt-2 max-w-2xl font-heading text-3xl font-semibold sm:text-4xl">
          The workflow the merchandiser actually uses
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Feature
            icon={<Aperture className="size-5" />}
            title="Set the plate"
            body="Pick human model, quantity, ratio and style. The engine writes scenery the way a photographer would brief a set."
            href="/image-editing/#studio"
          />
          <Feature
            icon={<Images className="size-5" />}
            title="Read the collage"
            body="Every tile ships with a scene paragraph and camera notes — lens, light, grade — so the best frame is obvious."
            href="/gallery/"
          />
          <Feature
            icon={<PenLine className="size-5" />}
            title="Edit the winner"
            body="Touch a region: pendant, talent or scenery. Known edits remap the plate without losing the SKU or the recipe."
            href="/gallery/terrace/"
          />
        </div>
      </section>
    </main>
  );
}

function Feature({
  icon,
  title,
  body,
  href,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-3xl border border-white/8 bg-white/3 p-6 transition-colors hover:border-teal-400/30 hover:bg-white/5"
    >
      <div className="mb-4 flex size-11 items-center justify-center rounded-2xl border border-teal-400/25 bg-teal-400/10 text-teal-300">
        {icon}
      </div>
      <h3 className="font-heading text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/55">{body}</p>
    </Link>
  );
}
