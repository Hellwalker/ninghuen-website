"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clapperboard,
  Gem,
  Globe2,
  ImageIcon,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { ShotImage } from "@/components/shot-image";
import { GCC_PLATES, PITCH_META, SECTION_TABS, type PitchSection } from "@/lib/pitch";
import { cn } from "@/lib/utils";

const SLIDE_COUNT = 12;
const SECTION_FOR_SLIDE: PitchSection[] = [
  "cover",
  "company",
  "team",
  "team",
  "technology",
  "technology",
  "technology",
  "technology",
  "technology",
  "technology",
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
      if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === " ") {
        event.preventDefault();
        go(index + 1);
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
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
    let startX = 0;
    const onStart = (event: TouchEvent) => {
      startX = event.changedTouches[0].clientX;
    };
    const onEnd = (event: TouchEvent) => {
      const dx = event.changedTouches[0].clientX - startX;
      if (dx < -48) go(index + 1);
      if (dx > 48) go(index - 1);
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [go, index]);

  const section = SECTION_FOR_SLIDE[index];

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-[#070d24] text-white">
      <header className="z-20 flex shrink-0 items-center justify-between gap-3 border-b border-white/8 px-4 py-3 sm:px-6">
        <Link href="/" className="min-w-0">
          <BrandLogo />
        </Link>
        <p className="hidden truncate text-[11px] tracking-[0.14em] text-white/45 uppercase sm:block">
          {PITCH_META.programme}
        </p>
        <div className="flex items-center gap-2 text-[11px] text-white/50">
          <span className="hidden md:inline">← → keys</span>
          <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono">
            {index + 1}/{SLIDE_COUNT}
          </span>
        </div>
      </header>

      <div className="h-0.5 shrink-0 bg-white/5">
        <div
          className="h-full bg-linear-to-r from-teal-400 to-blue-500 transition-[width] duration-300"
          style={{ width: `${((index + 1) / SLIDE_COUNT) * 100}%` }}
        />
      </div>

      <nav className="flex shrink-0 gap-1 overflow-x-auto px-4 py-2 sm:px-6">
        {SECTION_TABS.map((tab) => {
          const first = SECTION_FOR_SLIDE.findIndex((id) => id === tab.id);
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => go(first)}
              className={cn(
                "rounded-full px-3 py-1 text-[11px] tracking-[0.12em] uppercase transition-colors",
                section === tab.id
                  ? "bg-teal-400/15 text-teal-200"
                  : "text-white/40 hover:text-white/70"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      <main className="relative min-h-0 flex-1 overflow-y-auto px-4 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto flex h-full max-w-6xl flex-col py-4 sm:py-6">
          {index === 0 && <CoverSlide />}
          {index === 1 && <CompanySlide />}
          {index === 2 && <ManagementSlide />}
          {index === 3 && <CapabilitySlide />}
          {index === 4 && <ProductSlide />}
          {index === 5 && <FrameSlide />}
          {index === 6 && <SearchSlide />}
          {index === 7 && <UniquenessSlide />}
          {index === 8 && <TamSlide />}
          {index === 9 && <GccSlide />}
          {index === 10 && <JewellerySlide />}
          {index === 11 && <BusinessSlide />}
        </div>
      </main>

      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20 flex items-center justify-center">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-[#0c1533]/90 px-3 py-2 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="rounded-full p-1.5 text-teal-300 hover:bg-white/8 disabled:opacity-30"
            disabled={index === 0}
            aria-label="Previous slide"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div className="flex gap-1.5">
            {Array.from({ length: SLIDE_COUNT }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-5 bg-teal-300" : "w-1.5 bg-white/25 hover:bg-white/50"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="rounded-full p-1.5 text-teal-300 hover:bg-white/8 disabled:opacity-30"
            disabled={index === SLIDE_COUNT - 1}
            aria-label="Next slide"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-semibold tracking-[0.18em] text-teal-300 uppercase">
      {children}
    </p>
  );
}

function Divider() {
  return (
    <div className="my-4 h-0.5 w-12 rounded-full bg-linear-to-r from-teal-400 to-blue-500" />
  );
}

function CoverSlide() {
  return (
    <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <Eyebrow>{PITCH_META.corridor}</Eyebrow>
        <h1 className="mt-4 font-heading text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
          Content AI that reads
          <span className="mt-1 block bg-linear-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">
            every frame, then every word.
          </span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
          Ning Huen screens video, image and text for the markets they will
          actually air in — Greater China today, GCC media and commerce next.
          Image generation sits behind the same compliance layer, so a jewellery
          campaign can be designed true and faith-aware before it ships.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {[
            "Video · Image · Text",
            "Frame-level LLM",
            "Google Image Search graph",
            "HSITP SPIN",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-teal-400/25 bg-teal-400/10 px-3 py-1 text-xs text-teal-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="relative">
        <ShotImage
          src="/samples/gcc-mashrabiya.png"
          alt="GCC jewellery campaign still"
          className="aspect-[4/5] rounded-[28px] sm:aspect-[5/6]"
        />
        <div className="absolute top-4 left-4 rounded-xl border border-red-400/30 bg-[#070d24]/80 px-3 py-2 text-xs backdrop-blur">
          <p className="font-medium text-red-300">Frame 00:14 · High</p>
          <p className="mt-0.5 text-white/60">Religious landmark match</p>
        </div>
        <div className="absolute right-4 bottom-14 max-w-[16rem] rounded-2xl border border-white/10 bg-[#070d24]/85 p-4 backdrop-blur">
          <p className="text-[10px] tracking-[0.16em] text-teal-300 uppercase">
            Structured transcript
          </p>
          <p className="mt-1 text-sm text-white/75">
            Woman in cream abaya, oval sapphire pendant, mashrabiya lattice —
            no political overlay, modest dress pass.
          </p>
        </div>
      </div>
    </div>
  );
}

function CompanySlide() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <Eyebrow>01 · Company</Eyebrow>
      <h2 className="mt-3 max-w-3xl font-heading text-3xl font-semibold sm:text-5xl">
        Ning Huen Technology
      </h2>
      <Divider />
      <p className="max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
        Hong Kong–Shenzhen AI studio, founded by DH, supported by the HSITP SPIN
        Programme. We build the review desk that media, marketplaces and
        brands need before content goes live — and the scenery engine that
        produces campaign stills without breaking the SKU.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card
          title="Content AI"
          body="Policy-pack moderation for text, stills and video. Same loop: ingest → structured language → keyword/policy hit → Gemini severity → editorial rewrite."
        />
        <Card
          title="Image AI · visuai_ImageGen"
          body="SKU-locked scenery generation for jewellery, apparel and pet retail. Design template stays identical; only light, set and talent move."
        />
        <Card
          title="Where we sit"
          body="Greater China compliance first (NSL / mainland packs). This corridor is the GCC policy pack: Arabic, modest dress, religious and political risk."
        />
      </div>
      <p className="mt-6 text-sm text-white/40">
        Public surface: {PITCH_META.site} · Image AI studio and the existing
        Content Moderation pitch.
      </p>
    </div>
  );
}

function ManagementSlide() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <Eyebrow>02 · Team · Management</Eyebrow>
      <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-5xl">
        Founder-led, delivery-proven
      </h2>
      <Divider />
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/4 p-6">
          <p className="text-[11px] tracking-[0.16em] text-teal-300 uppercase">
            Founder
          </p>
          <p className="mt-2 font-heading text-3xl font-semibold">DH</p>
          <p className="mt-1 text-sm text-white/50">Ning Huen Technology</p>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Owns product, commercial and the two engines: Content AI review
            desk and visuai_ImageGen. Operates from the Hong Kong–Shenzhen
            corridor with HSITP SPIN backing.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card
            title="Operating model"
            body="Small founder team plus Greater China delivery partners already shipping listing visuals for pet, jewellery and apparel e-commerce."
          />
          <Card
            title="What we staff next"
            body="Arabic linguist / GCC media policy lead, and a Dubai-side design partner in gold, marketplaces or short-form networks."
          />
          <Card
            title="Governance"
            body="Policy packs are data, not hardcoded Western filters. China keyword books and GCC religious/political lists swap without rewriting the pipeline."
          />
          <Card
            title="Open on this slide"
            body="Additional named operators, advisors and legal entity details to be confirmed."
          />
        </div>
      </div>
    </div>
  );
}

function CapabilitySlide() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <Eyebrow>02 · Team · Technical capability</Eyebrow>
      <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
        Two engines, one review language
      </h2>
      <Divider />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-teal-400/20 bg-teal-400/5 p-6">
          <div className="mb-3 flex size-10 items-center justify-center rounded-2xl bg-teal-400/15 text-teal-200">
            <ShieldCheck className="size-5" />
          </div>
          <h3 className="font-heading text-xl font-semibold">Content AI</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/65">
            <li>Text: policy keyword book + Gemini high/medium/low judge.</li>
            <li>
              Image: Google Cloud Vision labels the still, then the same text
              judge runs on the caption.
            </li>
            <li>
              Video (corridor build): sample frames + dialogue → structured
              JSON per timestamp → same judge.
            </li>
            <li>
              Third-party graph: Google Image Search / Web Detection on flagged
              frames for political and religious matches.
            </li>
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/4 p-6">
          <div className="mb-3 flex size-10 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-200">
            <Gem className="size-5" />
          </div>
          <h3 className="font-heading text-xl font-semibold">visuai_ImageGen</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/65">
            <li>
              FastAPI + Gemini image models. Jewellery / clothing / toy
              presets. SceneRecommend writes structured scene JSON.
            </li>
            <li>
              SceneValidator enforces required fields, talent count, camera
              notes — the plate is re-editable, not a one-shot render.
            </li>
            <li>
              Design lock: product reference is the primary template. Shape,
              metal, engraving and placement must stay identical.
            </li>
            <li>
              Compliance layer after generate: the Content AI judge on the
              still (modest dress, religious symbols, political marks).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ProductSlide() {
  const steps = [
    { n: "01", t: "Ingest", d: "Text, image, PDF, game script, or video file." },
    { n: "02", t: "Structure", d: "LLM turns pixels and audio into captions, dialogue, objects, dress, on-screen text." },
    { n: "03", t: "Policy hit", d: "Keyword / embedding match against the active pack — China or GCC." },
    { n: "04", t: "Severity + rewrite", d: "High / medium / low, source article, suggested safe phrasing." },
  ];
  return (
    <div className="flex flex-1 flex-col justify-center">
      <Eyebrow>03 · Technology · Product</Eyebrow>
      <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-5xl">
        The product is a compliance-ready
        <span className="block bg-linear-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">
          content intelligence suite
        </span>
      </h2>
      <Divider />
      <p className="max-w-3xl text-sm leading-relaxed text-white/65 sm:text-base">
        Generic cloud filters are trained on Western NSFW. Our desk is
        policy-native: the Greater China book already covers political,
        religious and public-order classes. For Dubai we load a GCC pack —
        Arabic MSA and Khaleeji, modest-dress, royal and religious symbols —
        on the same four-step loop.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.n}
            className="rounded-2xl border border-white/10 bg-white/4 p-4"
          >
            <p className="font-mono text-xs text-teal-300">{step.n}</p>
            <h3 className="mt-2 font-heading text-lg font-semibold">{step.t}</h3>
            <p className="mt-2 text-sm text-white/55">{step.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FrameSlide() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <Eyebrow>03 · Technology · Video & image</Eyebrow>
      <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
        Every frame becomes structured language
      </h2>
      <Divider />
      <div className="grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm leading-relaxed text-white/70 sm:text-base">
            A 30-second Reel is not one image. We sample the timeline, pull
            spoken lines, and ask the multimodal LLM to write a JSON record
            per beat — who is on screen, what they wear, what they say, what
            text is burned in, which symbols appear. Reviewers search language,
            not pixels.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Mini
              icon={<Clapperboard className="size-4" />}
              title="Video"
              body="Keyframes + ASR dialogue. Timestamped findings."
            />
            <Mini
              icon={<ImageIcon className="size-4" />}
              title="Image"
              body="Vision labels + LLM caption. Overlay OCR."
            />
            <Mini
              icon={<Sparkles className="size-4" />}
              title="Text"
              body="Copy, comments, listings, game scripts."
            />
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[#0c1533] p-5 font-mono text-[11px] leading-relaxed text-teal-100/90">
          <p className="text-white/40">frame_014.json · 00:14.2</p>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap">{`{
  "shot": "medium",
  "talent": "woman, abaya, hijab",
  "objects": ["sapphire pendant", "mashrabiya"],
  "dialogue": "هدية العيد من دبي",
  "on_screen_text": none,
  "dress_code": "modest · pass",
  "flags": []
}`}</pre>
          <div className="mt-4 rounded-xl border border-teal-400/20 bg-teal-400/8 p-3 text-xs font-sans text-white/70">
            Same schema for a still. Same schema for a generated jewellery
            plate. One judge, three modalities.
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchSlide() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <Eyebrow>03 · Technology · Risk graph</Eyebrow>
      <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
        Pixels that look innocent until
        <span className="block bg-linear-to-r from-amber-200 to-teal-300 bg-clip-text text-transparent">
          Google Image Search knows them
        </span>
      </h2>
      <Divider />
      <p className="max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
        Captions miss identity. A mosque courtyard, a royal portrait, a
        protest still, a sectarian mural — the LLM may call it “historic
        architecture”. Reverse image search (Google Vision Web Detection /
        Image Search) returns the pages and entities that already named that
        frame. We score religion, politics and public figures as first-class
        risks for GCC airtime.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card
          icon={<Search className="size-4" />}
          title="Match the still"
          body="Flagged frames go to the search graph. Near-duplicate pages, news stills and known landmarks come back as evidence, not guesses."
        />
        <Card
          icon={<Globe2 className="size-4" />}
          title="Religion & politics"
          body="Sacred sites used as product backdrops. Political graffiti in UGC. Cross-border news imagery reused in ads. Each hit cites the matching URL."
        />
        <Card
          icon={<ShieldCheck className="size-4" />}
          title="Human last mile"
          body="The desk shows the frame, the caption, the search hits and a suggested crop or rewrite. Editors decide; the model does not publish."
        />
      </div>
    </div>
  );
}

function UniquenessSlide() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <Eyebrow>03 · Technology · Uniqueness</Eyebrow>
      <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
        Create and clear in the same cultural frame
      </h2>
      <Divider />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/4 p-6">
          <h3 className="font-heading text-xl font-semibold">Why this is not Rekognition</h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/65">
            <li>Policy packs, not a single Western NSFW score.</li>
            <li>Language-first: video is searched as structured text plus dialogue.</li>
            <li>Search-graph evidence for religion and politics, not just labels.</li>
            <li>Rewrite, not only block — copy stays in flow.</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-teal-400/20 bg-teal-400/5 p-6">
          <h3 className="font-heading text-xl font-semibold">Generation compliance layer</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            visuai_ImageGen already refuses to redesign the SKU: jewellery
            shape, material, engraving and placement must match the reference
            plate. The corridor adds a second gate before export —
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/65">
            <li>Design lock — product identity is non-negotiable.</li>
            <li>Faith & custom lock — modest dress, no sacred-site misuse, no royal likeness, Ramadan-safe props.</li>
            <li>Failed stills never reach the gallery; the prompt is rewritten and regenerated.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function TamSlide() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <Eyebrow>03 · Technology · Addressable markets</Eyebrow>
      <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
        Where the desk gets paid
      </h2>
      <Divider />
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat n="~$57–72B" l="GCC e-commerce GMV path into 2026 — every listing is an image + Arabic caption to clear." />
        <Stat n="~$12B" l="UAE e-commerce, Dubai ~60%. Luxury, gold and fashion set the creative bar." />
        <Stat n="Low–mid $B" l="GCC digital / social video. Short-form needs frame-level, not poster-level, review." />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card title="Media & platforms" body="Publishers, agencies, Snap / TikTok / Reels teams who cannot wait 3–7 days for a human pass." />
        <Card title="Marketplaces" body="Noon, Amazon.ae, gold-souk digital, cross-border China sellers entering GCC." />
        <Card title="Brand studios" body="Jewellery and modest fashion that must generate and clear in one workflow." />
      </div>
      <p className="mt-4 text-xs text-white/35">
        Market figures are industry estimates (2026) for orientation, not a
        Ning Huen forecast.
      </p>
    </div>
  );
}

function GccSlide() {
  const apps = [
    {
      t: "Ramadan & Eid film",
      d: "Pre-clear TVC and influencer cuts: music vs nasheed windows, food/alcohol, dress, sacred architecture as backdrop.",
    },
    {
      t: "Gold & jewellery listings",
      d: "Karat claims vs the photo. Royal-crest misuse. Modest on-model plates generated and cleared together.",
    },
    {
      t: "Marketplace UGC",
      d: "Arabic titles, dialect slang, WhatsApp catalogue stills. Political and sectarian symbols via search graph.",
    },
    {
      t: "Live & short-form",
      d: "Timestamped flags on Reels/Snap. Overlay text OCR. Spoken line vs on-screen contradiction.",
    },
    {
      t: "News-adjacent ads",
      d: "Stop a campaign that reused a protest or conflict still the LLM described only as “crowd in a square”.",
    },
    {
      t: "China → GCC sellers",
      d: "Pet, apparel and jewellery merchants we already serve, now needing a Gulf policy pack on the same SKU engine.",
    },
  ];
  return (
    <div className="flex flex-1 flex-col justify-center">
      <Eyebrow>03 · Technology · GCC applications</Eyebrow>
      <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
        What we would run in Dubai first
      </h2>
      <Divider />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => (
          <Card key={app.t} title={app.t} body={app.d} />
        ))}
      </div>
    </div>
  );
}

function JewellerySlide() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <Eyebrow>Image AI · GCC jewellery proof</Eyebrow>
      <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
        Same sapphire SKU. Faith-aware scenery.
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-white/60">
        visuai_ImageGen locks the oval halo pendant, then dresses the plate
        for Dubai: abaya talent, mashrabiya, fanous, gold souk, desert blue
        hour. Each still still has to pass the Content AI layer before it
        is a campaign asset.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
        {GCC_PLATES.map((plate) => (
          <figure key={plate.src} className="overflow-hidden rounded-2xl border border-white/8">
            <ShotImage src={plate.src} alt={plate.title} className="aspect-[4/5]" />
            <figcaption className="p-2">
              <p className="text-xs font-medium">{plate.title}</p>
              <p className="text-[10px] text-white/40">{plate.note}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function BusinessSlide() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <Eyebrow>04 · Business</Eyebrow>
      <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
        Track record, then the corridor ask
      </h2>
      <Divider />
      <div className="grid gap-4 md:grid-cols-3">
        <Card
          icon={<Users className="size-4" />}
          title="Gouji and Maoji Co Ltd"
          body="Mainland China pet e-commerce. Listing scenery and catalog stills at marketplace cadence — the original visuai_ImageGen proving ground."
        />
        <Card
          icon={<Gem className="size-4" />}
          title="Jewellery"
          body="Fine jewellery campaigns with SKU-true gem geometry. The sapphire halo programme on ninghuen.com is the public jewellery proof."
        />
        <Card
          icon={<ImageIcon className="size-4" />}
          title="Apparel"
          body="On-model lookbooks and clothing plates from the same engine — talent, ratio, style, then edit in place."
        />
      </div>
      <div className="mt-6 rounded-3xl border border-teal-400/25 bg-teal-400/8 p-6">
        <p className="text-[11px] tracking-[0.16em] text-teal-200 uppercase">
          What we seek in Dubai
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/80 sm:text-base">
          Design partners in jewellery retail, marketplaces and short-form
          media to load a GCC policy pack on the live Content AI desk. Green
          channel to SANDBOX by Oraseya Capital (up to USD 150k) and FIT 4
          START (EUR 150k) via the HSITP × Dubai Chambers corridor — from
          Greater China clearance to Gulf airtime.
        </p>
        <p className="mt-4 text-sm text-white/45">
          DH · Ning Huen Technology · {PITCH_META.site}
        </p>
      </div>
    </div>
  );
}

function Card({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
      {icon ? (
        <div className="mb-3 flex size-9 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10 text-teal-200">
          {icon}
        </div>
      ) : null}
      <h3 className="font-heading text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/55">{body}</p>
    </div>
  );
}

function Mini({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
      <div className="mb-2 text-teal-300">{icon}</div>
      <p className="font-heading font-semibold">{title}</p>
      <p className="mt-1 text-xs text-white/50">{body}</p>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/4 p-5">
      <p className="font-heading text-3xl font-semibold bg-linear-to-r from-teal-300 to-amber-200 bg-clip-text text-transparent">
        {n}
      </p>
      <p className="mt-2 text-sm text-white/55">{l}</p>
    </div>
  );
}
