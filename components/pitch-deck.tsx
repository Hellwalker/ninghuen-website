"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { GCC_PLATES, PITCH_META, SECTION_TABS, type PitchSection } from "@/lib/pitch";
import { cn } from "@/lib/utils";

const SLIDE_COUNT = 11;
const SECTION_FOR_SLIDE: PitchSection[] = [
  "cover",
  "company",
  "team",
  "technology",
  "technology",
  "technology",
  "technology",
  "technology",
  "business",
  "business",
  "business",
];

export function PitchDeck() {
  const [index, setIndex] = useState(0);
  const go = useCallback((next: number) => {
    setIndex(Math.max(0, Math.min(SLIDE_COUNT - 1, next)));
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", " "].includes(event.key)) {
        event.preventDefault();
        go(index + 1);
      }
      if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
        event.preventDefault();
        go(index - 1);
      }
      if (event.key === "Home") go(0);
      if (event.key === "End") go(SLIDE_COUNT - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  useEffect(() => {
    let x = 0;
    const start = (e: TouchEvent) => {
      x = e.changedTouches[0].clientX;
    };
    const end = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - x;
      if (dx < -56) go(index + 1);
      if (dx > 56) go(index - 1);
    };
    window.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("touchend", end);
    return () => {
      window.removeEventListener("touchstart", start);
      window.removeEventListener("touchend", end);
    };
  }, [go, index]);

  const section = SECTION_FOR_SLIDE[index];

  return (
    <div className="pitch-root relative flex h-dvh flex-col overflow-hidden text-white select-none">
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="opacity-90 hover:opacity-100">
          <BrandLogo />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {SECTION_TABS.map((tab) => {
            const first = SECTION_FOR_SLIDE.findIndex((id) => id === tab.id);
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => go(first)}
                className={cn(
                  "rounded-full px-3 py-1 text-[10px] tracking-[0.18em] uppercase transition-colors",
                  section === tab.id ? "text-white" : "text-white/35 hover:text-white/70"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
        <p className="font-mono text-[11px] text-white/40">
          {String(index + 1).padStart(2, "0")} / {String(SLIDE_COUNT).padStart(2, "0")}
        </p>
      </header>

      <div className="min-h-0 flex-1">
        <div key={index} className="h-full animate-in fade-in duration-500">
          {index === 0 && <Cover />}
          {index === 1 && <Company />}
          {index === 2 && <Team />}
          {index === 3 && <Problem />}
          {index === 4 && <Desk />}
          {index === 5 && <Frames />}
          {index === 6 && <SearchGraph />}
          {index === 7 && <Generate />}
          {index === 8 && <Market />}
          {index === 9 && <Traction />}
          {index === 10 && <Close />}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-end justify-between px-5 py-4 sm:px-8">
        <p className="hidden text-[10px] tracking-[0.16em] text-white/30 uppercase sm:block">
          {PITCH_META.programme}
        </p>
        <div className="pointer-events-auto ml-auto flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            className="text-white/50 hover:text-white disabled:opacity-20"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: SLIDE_COUNT }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => go(i)}
                className={cn(
                  "h-px transition-all",
                  i === index ? "w-8 bg-white" : "w-3 bg-white/25 hover:bg-white/50"
                )}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next"
            onClick={() => go(index + 1)}
            disabled={index === SLIDE_COUNT - 1}
            className="text-white/50 hover:text-white disabled:opacity-20"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Cover() {
  return (
    <section className="relative h-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/samples/gcc-desert.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-[#050816] via-[#050816]/78 to-[#050816]/15" />
      <div className="absolute inset-0 bg-linear-to-t from-[#050816] via-transparent to-[#050816]/40" />
      <div className="relative flex h-full max-w-5xl flex-col justify-end px-6 pb-20 sm:px-12 sm:pb-24 lg:px-16">
        <p className="text-[11px] tracking-[0.28em] text-teal-300/90 uppercase">
          {PITCH_META.corridor} · {PITCH_META.year}
        </p>
        <h1 className="mt-5 font-heading text-[clamp(2.6rem,7vw,6.4rem)] leading-[0.92] font-medium tracking-tight">
          Content law,
          <br />
          at machine speed.
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
          Video, image and text — read frame by frame, named by search,
          judged against the market it will air in.
        </p>
      </div>
    </section>
  );
}

function Company() {
  return (
    <section className="flex h-full flex-col justify-center px-6 sm:px-12 lg:px-16">
      <p className="text-[11px] tracking-[0.22em] text-white/35 uppercase">01 Company</p>
      <h2 className="mt-4 max-w-4xl font-heading text-[clamp(2rem,4.6vw,4.4rem)] leading-[1.05] font-medium tracking-tight">
        Ning Huen builds the review desk
        <span className="text-white/40"> for places where a wrong frame is not a brand problem. It is a legal one.</span>
      </h2>
      <div className="mt-14 grid max-w-5xl gap-10 border-t border-white/10 pt-8 sm:grid-cols-3">
        <Fact k="Where" v="Hong Kong–Shenzhen. HSITP SPIN. Founded by DH." />
        <Fact k="What ships" v="Content AI clears. visuai_ImageGen creates. Same cultural frame." />
        <Fact k="Surface" v="ninghuen.com — merchandiser studio, editorial desk." />
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="flex h-full flex-col justify-center px-6 sm:px-12 lg:px-16">
      <p className="text-[11px] tracking-[0.22em] text-white/35 uppercase">02 Team</p>
      <div className="mt-6 grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-heading text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight">DH</p>
          <p className="mt-3 text-sm tracking-[0.2em] text-teal-300/80 uppercase">
            Founder · Product · Commercial
          </p>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
            One founder who already runs both engines in production: the
            moderation loop against Greater China policy books, and the
            jewellery-grade generation pipeline behind ninghuen.com.
          </p>
        </div>
        <div className="space-y-px overflow-hidden rounded-sm border border-white/10">
          <StackRow label="Content AI" value="Vision → language → policy pack → Gemini judge" />
          <StackRow label="Search graph" value="Google Image Search / Web Detection on flagged frames" />
          <StackRow label="visuai_ImageGen" value="Gemini · SceneRecommend · design-lock prompts" />
          <StackRow label="Delivery" value="Gouji & Maoji · jewellery · apparel e-commerce" />
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="flex h-full flex-col justify-center px-6 sm:px-12 lg:px-16">
      <p className="text-[11px] tracking-[0.22em] text-white/35 uppercase">03 Technology · The miss</p>
      <h2 className="mt-4 max-w-5xl font-heading text-[clamp(1.8rem,4.2vw,3.8rem)] leading-[1.08] font-medium tracking-tight">
        San Francisco filters for nudity.
        <span className="text-white/38"> Dubai fails on a shrine. Shenzhen fails on a slogan. The model is not the gap. The law is.</span>
      </h2>
      <div className="mt-16 grid max-w-5xl gap-12 sm:grid-cols-3">
        <Miss
          n="01"
          t="A mosque is “architecture”"
          d="The caption is technically true. The airtime is illegal. Identity lives in search, not in labels."
        />
        <Miss
          n="02"
          t="A Reel is not a poster"
          d="Risk sits in one spoken line, one overlay, one frame at 00:14. Poster-level tools never see it."
        />
        <Miss
          n="03"
          t="Generation is ungoverned"
          d="Most image models will dress a SKU on a sacred site if the prompt is pretty. That still ships."
        />
      </div>
    </section>
  );
}

function Desk() {
  return (
    <section className="relative flex h-full flex-col px-4 pt-16 pb-14 sm:px-8 sm:pt-20">
      <div className="mb-4 flex shrink-0 items-end justify-between gap-4 px-2">
        <div>
          <p className="text-[11px] tracking-[0.22em] text-white/35 uppercase">
            03 Technology · Product
          </p>
          <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight sm:text-5xl">
            The desk.
          </h2>
        </div>
        <p className="hidden max-w-sm text-right text-sm text-white/45 md:block">
          Not a classifier score. An editorial system: ingest, structure, cite, rewrite.
        </p>
      </div>
      <ReviewConsole />
    </section>
  );
}

function Frames() {
  return (
    <section className="flex h-full flex-col justify-center px-6 sm:px-12 lg:px-16">
      <p className="text-[11px] tracking-[0.22em] text-white/35 uppercase">
        03 Technology · Video & image
      </p>
      <h2 className="mt-4 max-w-4xl font-heading text-[clamp(1.9rem,4vw,3.6rem)] leading-[1.08] font-medium tracking-tight">
        Every frame becomes a document.
      </h2>
      <p className="mt-4 max-w-2xl text-base text-white/55">
        Multimodal LLM. Timestamped. Dialogue, dress, objects, burned-in text —
        one schema for a still, a Reel, and a generated plate.
      </p>
      <div className="mt-10 overflow-hidden rounded-sm border border-white/10 bg-[#080d1c]">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5 font-mono text-[10px] text-white/40">
          <span>campaign_eid_v3.mp4</span>
          <span>00:14.2 · 24 fps · sampled</span>
        </div>
        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          <div className="border-white/8 p-4 lg:border-r">
            <div className="relative overflow-hidden rounded-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/samples/gcc-mashrabiya.png"
                alt=""
                className="aspect-[16/10] w-full object-cover"
              />
              <span className="absolute top-3 left-3 rounded-sm bg-black/70 px-2 py-0.5 font-mono text-[10px] text-teal-200">
                FRAME 00:14.2
              </span>
            </div>
            <div className="mt-4 flex gap-1">
              {[
                "/samples/gcc-terrace.png",
                "/samples/gcc-mashrabiya.png",
                "/samples/gcc-desert.png",
                "/samples/gcc-lantern.png",
                "/samples/gcc-souk.png",
                "/samples/scene-velvet.png",
              ].map((src, i) => (
                <div
                  key={src}
                  className={cn(
                    "relative h-12 flex-1 overflow-hidden rounded-sm",
                    i === 1 && "ring-1 ring-teal-300"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          <pre className="overflow-auto p-5 font-mono text-[11px] leading-6 text-teal-100/80">{`{
  "t": "00:14.2",
  "shot": "medium",
  "talent": "woman · abaya · hijab",
  "objects": ["sapphire halo pendant", "mashrabiya"],
  "dialogue": "هدية العيد من دبي",
  "ocr": null,
  "dress": "modest · pass",
  "flags": []
}`}</pre>
        </div>
      </div>
    </section>
  );
}

function SearchGraph() {
  return (
    <section className="flex h-full flex-col justify-center px-6 sm:px-12 lg:px-16">
      <p className="text-[11px] tracking-[0.22em] text-white/35 uppercase">
        03 Technology · Risk graph
      </p>
      <h2 className="mt-4 max-w-4xl font-heading text-[clamp(1.9rem,4vw,3.6rem)] leading-[1.08] font-medium tracking-tight">
        Captions lie politely.
        <span className="text-white/40"> Google Image Search does not.</span>
      </h2>
      <div className="mt-12 grid max-w-5xl items-start gap-10 lg:grid-cols-2">
        <p className="text-lg leading-relaxed text-white/60">
          Flagged frames go to reverse image search. Pages, news stills, sacred
          sites, political likenesses come back as citations — religion and
          politics as first-class risks, not NSFW afterthoughts.
        </p>
        <div className="space-y-2 font-mono text-sm">
          <Hit risk="high" q="web detection" a="Friday mosque courtyard as product set · 11 matching pages" />
          <Hit risk="high" q="entity" a="Royal portrait near-duplicate · news wire 2024" />
          <Hit risk="med" q="ocr ∩ policy" a="Sectarian slogan in overlay · Khaleeji dialect" />
          <Hit risk="low" q="dress" a="Abaya coverage · pass" />
        </div>
      </div>
    </section>
  );
}

function Generate() {
  return (
    <section className="relative h-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/samples/gcc-terrace.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#050816] via-[#050816]/55 to-[#050816]/25" />
      <div className="relative flex h-full flex-col justify-end px-6 pb-20 sm:px-12 sm:pb-24 lg:px-16">
        <p className="text-[11px] tracking-[0.22em] text-teal-200/80 uppercase">
          03 Technology · Generation gate
        </p>
        <h2 className="mt-3 max-w-3xl font-heading text-[clamp(2rem,4.4vw,4rem)] leading-[1.05] font-medium tracking-tight">
          Create is not exempt.
        </h2>
        <div className="mt-8 grid max-w-3xl gap-8 sm:grid-cols-2">
          <p className="text-sm leading-relaxed text-white/75">
            <span className="text-white">Design lock.</span> visuai_ImageGen
            treats the SKU photo as the only legal product. Shape, metal,
            engraving, placement — identical. Light and set may move. The
            jewel may not.
          </p>
          <p className="text-sm leading-relaxed text-white/75">
            <span className="text-white">Faith lock.</span> The same desk
            reads the still before export. Modest dress. No sacred backdrop.
            No royal likeness. Failures never reach the gallery.
          </p>
        </div>
      </div>
    </section>
  );
}

function Market() {
  return (
    <section className="flex h-full flex-col justify-center px-6 sm:px-12 lg:px-16">
      <p className="text-[11px] tracking-[0.22em] text-white/35 uppercase">
        04 Business · Addressable
      </p>
      <div className="mt-10 grid gap-y-12 sm:grid-cols-3">
        <Num n="$70B+" l="GCC e-commerce GMV path. Every listing is an image and a caption that can fail." />
        <Num n="$12B" l="UAE e-commerce. Dubai is ~60%. Gold and modest fashion set the creative bar." />
        <Num n="Frame" l="The scarce unit is not the poster. It is the second inside the Reel." />
      </div>
      <p className="mt-16 max-w-2xl text-xl leading-snug text-white/50">
        First wedge: jewellery, marketplaces, and Ramadan/Eid film — China
        sellers we already serve, walking into Gulf airtime.
      </p>
    </section>
  );
}

function Traction() {
  return (
    <section className="flex h-full flex-col justify-center px-6 sm:px-12 lg:px-16">
      <p className="text-[11px] tracking-[0.22em] text-white/35 uppercase">
        04 Business · Track record
      </p>
      <h2 className="mt-4 font-heading text-[clamp(2rem,4vw,3.6rem)] font-medium tracking-tight">
        Already in the catalog.
      </h2>
      <div className="mt-14 space-y-0 border-t border-white/10">
        <Proof
          name="Gouji and Maoji Co Ltd"
          role="Mainland pet e-commerce"
          note="Listing scenery at marketplace cadence. The original visuai_ImageGen proving ground."
        />
        <Proof
          name="Fine jewellery"
          role="SKU-true gem geometry"
          note="The sapphire halo programme on ninghuen.com is the public plate."
        />
        <Proof
          name="Apparel"
          role="On-model lookbooks"
          note="Talent, ratio, style — then edit in place. Same engine, different category pack."
        />
      </div>
      <div className="mt-10 flex gap-3 overflow-hidden">
        {GCC_PLATES.map((p) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={p.src}
            src={p.src}
            alt={p.title}
            className="h-28 w-24 rounded-sm object-cover sm:h-36 sm:w-32"
          />
        ))}
      </div>
    </section>
  );
}

function Close() {
  return (
    <section className="relative flex h-full flex-col justify-center px-6 sm:px-12 lg:px-16">
      <p className="text-[11px] tracking-[0.22em] text-white/35 uppercase">04 Business · Corridor</p>
      <h2 className="mt-4 max-w-4xl font-heading text-[clamp(2.1rem,4.8vw,4.6rem)] leading-[1.04] font-medium tracking-tight">
        We are not starting a company in Dubai.
        <span className="text-white/40"> We are putting a GCC pack on a desk that already runs.</span>
      </h2>
      <p className="mt-10 max-w-xl text-base leading-relaxed text-white/55">
        Design partners in gold, marketplaces and short-form. Green channel to
        SANDBOX — up to USD 150k — and FIT 4 START, EUR 150k, via HSITP × Dubai
        Chambers.
      </p>
      <p className="mt-12 font-heading text-2xl tracking-tight">
        DH · Ning Huen Technology
      </p>
      <p className="mt-1 text-sm tracking-[0.18em] text-teal-300/80 uppercase">
        {PITCH_META.site}
      </p>
    </section>
  );
}

function ReviewConsole() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm border border-white/12 bg-[#070b18] shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[10px] text-white/35">
          ninghuen desk · GCC pack · live
        </span>
        <span className="ml-auto rounded-sm bg-red-500/15 px-2 py-0.5 font-mono text-[10px] text-red-300">
          2 HIGH
        </span>
      </div>
      <div className="grid min-h-0 flex-1 lg:grid-cols-[0.9fr_1.2fr_0.9fr]">
        <div className="hidden border-r border-white/8 p-3 md:block">
          <p className="mb-3 font-mono text-[10px] tracking-widest text-white/30">
            QUEUE
          </p>
          {[
            ["eid_cut_04.mp4", "00:42", "high"],
            ["souk_pdp.png", "still", "med"],
            ["listing_ar.txt", "copy", "low"],
            ["abaya_look_12.png", "still", "clear"],
          ].map(([name, meta, risk]) => (
            <div
              key={name}
              className="mb-1 flex items-center justify-between rounded-sm px-2 py-2 hover:bg-white/4"
            >
              <div>
                <p className="font-mono text-[11px] text-white/80">{name}</p>
                <p className="text-[10px] text-white/30">{meta}</p>
              </div>
              <span
                className={cn(
                  "font-mono text-[10px] uppercase",
                  risk === "high" && "text-red-300",
                  risk === "med" && "text-amber-200",
                  risk === "low" && "text-white/40",
                  risk === "clear" && "text-teal-300"
                )}
              >
                {risk}
              </span>
            </div>
          ))}
        </div>
        <div className="relative min-h-[220px] border-r border-white/8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/samples/gcc-souk.png"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-8 top-[38%] h-px bg-red-400/70" />
          <div className="absolute top-[30%] left-[18%] h-[38%] w-[32%] rounded-sm border border-red-400/80" />
          <div className="absolute top-[32%] left-[52%] rounded-sm bg-red-500/90 px-2 py-1 font-mono text-[10px] text-white">
            sacred geometry · web match
          </div>
          <div className="absolute right-3 bottom-3 left-3 flex gap-1">
            {["00:02", "00:08", "00:14", "00:21", "00:33"].map((t, i) => (
              <div
                key={t}
                className={cn(
                  "h-1.5 flex-1 rounded-full",
                  i === 2 ? "bg-red-400" : "bg-white/25"
                )}
              />
            ))}
          </div>
        </div>
        <div className="hidden flex-col justify-between p-4 sm:flex">
          <div>
            <p className="font-mono text-[10px] tracking-widest text-white/30">
              FINDING
            </p>
            <p className="mt-2 font-heading text-xl">Religious landmark</p>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              Lattice classified as décor. Search graph: fanous / mashrabiya
              pattern clustered with sacred-site stills. Hold for editor.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-mono text-[10px] text-teal-300/80">
              SUGGESTED
            </p>
            <p className="text-sm text-white/70">
              Recrop to product tray. Drop architectural screen. Keep gold
              temperature.
            </p>
            <div className="flex gap-2 pt-2">
              <span className="rounded-sm bg-white px-3 py-1.5 text-[11px] font-medium text-black">
                Apply rewrite
              </span>
              <span className="rounded-sm border border-white/15 px-3 py-1.5 text-[11px] text-white/60">
                Escalate
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="text-[11px] tracking-[0.18em] text-teal-300/80 uppercase">{k}</p>
      <p className="mt-2 text-sm leading-relaxed text-white/65">{v}</p>
    </div>
  );
}

function StackRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 bg-white/3 px-4 py-4">
      <p className="shrink-0 font-heading text-sm">{label}</p>
      <p className="text-right text-xs text-white/45">{value}</p>
    </div>
  );
}

function Miss({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div>
      <p className="font-mono text-[11px] text-white/30">{n}</p>
      <p className="mt-3 font-heading text-xl leading-snug">{t}</p>
      <p className="mt-3 text-sm leading-relaxed text-white/45">{d}</p>
    </div>
  );
}

function Hit({ risk, q, a }: { risk: string; q: string; a: string }) {
  return (
    <div className="flex items-start gap-4 border-b border-white/8 py-3">
      <span
        className={cn(
          "mt-0.5 w-10 shrink-0 text-[10px] tracking-widest uppercase",
          risk === "high" && "text-red-300",
          risk === "med" && "text-amber-200",
          risk === "low" && "text-teal-300"
        )}
      >
        {risk}
      </span>
      <div>
        <p className="text-[10px] text-white/30">{q}</p>
        <p className="text-white/80">{a}</p>
      </div>
    </div>
  );
}

function Num({ n, l }: { n: string; l: string }) {
  return (
    <div className="border-t border-white/10 pt-6">
      <p className="font-heading text-[clamp(2.4rem,5vw,4.2rem)] leading-none tracking-tight">
        {n}
      </p>
      <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">{l}</p>
    </div>
  );
}

function Proof({ name, role, note }: { name: string; role: string; note: string }) {
  return (
    <div className="grid gap-2 border-b border-white/10 py-6 sm:grid-cols-[0.9fr_0.7fr_1.2fr] sm:items-baseline">
      <p className="font-heading text-xl">{name}</p>
      <p className="text-sm text-teal-200/70">{role}</p>
      <p className="text-sm text-white/45">{note}</p>
    </div>
  );
}
