"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import {
  COMPARE_ROWS,
  GCC_APPS,
  GCC_PLATES,
  PITCH_META,
  PROGRAMME_PLAN,
  SECTION_TABS,
  type PitchSection,
} from "@/lib/pitch";
import { cn } from "@/lib/utils";

const SLIDE_COUNT = 14;
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
  const bleed = index === 0;

  return (
    <div className="pitch-root relative flex h-dvh flex-col overflow-hidden text-white">
      <header
        className={cn(
          "z-30 flex shrink-0 items-center justify-between px-5 py-3 sm:px-8",
          bleed
            ? "absolute inset-x-0 top-0"
            : "border-b border-white/8 bg-[#050816]/90 backdrop-blur"
        )}
      >
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
                  "rounded-full px-3 py-1 text-[10px] tracking-[0.16em] uppercase transition-colors",
                  section === tab.id
                    ? "bg-white/8 text-white"
                    : "text-white/35 hover:text-white/70"
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

      <div className={cn("min-h-0 flex-1", bleed ? "" : "overflow-y-auto")}>
        <div key={index} className="h-full min-h-full animate-in fade-in duration-400">
          {index === 0 && <Cover />}
          {index === 1 && <Company />}
          {index === 2 && <Management />}
          {index === 3 && <Capability />}
          {index === 4 && <Problem />}
          {index === 5 && <Product />}
          {index === 6 && <Frames />}
          {index === 7 && <SearchGraph />}
          {index === 8 && <Uniqueness />}
          {index === 9 && <Generate />}
          {index === 10 && <Market />}
          {index === 11 && <GccApps />}
          {index === 12 && <Traction />}
          {index === 13 && <Close />}
        </div>
      </div>

      <div
        className={cn(
          "z-30 flex shrink-0 items-center justify-between px-5 py-3 sm:px-8",
          bleed
            ? "pointer-events-none absolute inset-x-0 bottom-0"
            : "border-t border-white/8"
        )}
      >
        <p className="hidden text-[10px] tracking-[0.14em] text-white/30 uppercase sm:block">
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
                  "h-1 rounded-full transition-all",
                  i === index ? "w-5 bg-teal-300" : "w-1.5 bg-white/25 hover:bg-white/50"
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

function Slide({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto flex min-h-full max-w-6xl flex-col px-5 py-7 sm:px-10 lg:px-12">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-teal-300/90 uppercase">
        {kicker}
      </p>
      <h2 className="mt-2 max-w-4xl font-heading text-[clamp(1.45rem,3vw,2.4rem)] leading-[1.18] font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-5 flex-1 pb-2">{children}</div>
    </section>
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
      <div className="absolute inset-0 bg-linear-to-r from-[#050816] via-[#050816]/88 to-[#050816]/35" />
      <div className="absolute inset-0 bg-linear-to-t from-[#050816] via-transparent to-[#050816]/40" />
      <div className="relative flex h-full max-w-5xl flex-col justify-end px-6 pb-20 sm:px-12 sm:pb-24 lg:px-16">
        <p className="text-[11px] tracking-[0.22em] text-teal-300 uppercase">
          {PITCH_META.programme}
        </p>
        <h1 className="mt-4 font-heading text-[clamp(2rem,4.8vw,4.1rem)] leading-[1.05] font-semibold tracking-tight">
          Content AI that reads
          <br />
          every frame, then every word.
        </h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/78 sm:text-base">
          Ning Huen Technology screens video, image and text against the law of
          the market it will air in — Greater China policy packs today, GCC
          media and commerce next. Image generation sits behind the same
          compliance layer, so a jewellery campaign can be SKU-true and
          faith-aware before it ships. This deck is Company, Team, Technology
          and Business for the HSITP × Dubai Chambers corridor.
        </p>
        <div className="mt-7 flex flex-wrap gap-2">
          {[
            "Company",
            "Team",
            "Technology",
            "Business",
            "Frame-level LLM",
            "Google Image Search",
            "HSITP SPIN",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-xs text-teal-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Company() {
  return (
    <Slide kicker="01 · Company introduction" title="Ning Huen Technology">
      <p className="max-w-3xl text-[15px] leading-relaxed text-white/72">
        Hong Kong–Shenzhen AI studio, founded by {PITCH_META.founder} and supported by the HSITP
        SPIN Programme. We build the review desk that media, marketplaces and
        brands need before content goes live — and the scenery engine that
        produces campaign stills without breaking the SKU. Public surface:{" "}
        {PITCH_META.site}, with the Image AI studio and the existing Greater
        China Content Moderation pitch.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Panel title="Content AI — lead product for this corridor">
          Policy-pack moderation for text, stills and video. Same loop on every
          asset: ingest → structured language (captions, dialogue, on-screen
          text, objects, dress) → keyword / embedding hit against the active
          pack → Gemini high / medium / low judge → editorial rewrite. Greater
          China packs (NSL / mainland keyword books) already run. This programme
          loads a GCC pack: Arabic MSA and Khaleeji, modest dress, religious and
          political risk.
        </Panel>
        <Panel title="Image AI — visuai_ImageGen">
          SKU-locked scenery generation for jewellery, apparel and pet retail.
          SceneRecommend writes structured scene JSON; SceneValidator enforces
          fields and talent count; jewellery prompts treat the product photo as
          the only legal design template. The Content AI desk is the export
          gate, not a separate product story.
        </Panel>
        <Panel title="Where we sit">
          Greater China compliance first — political, religious and public-order
          classes that Western NSFW filters never saw. The corridor is not a
          greenfield company in Dubai. It is a Gulf policy pack and a video
          frame loop on software already in production, pointed at jewellery,
          modest fashion and short-form that has to air in the GCC.
        </Panel>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <Stat label="Corridor" value="HK ⇆ Dubai" hint="HSITP × Dubai Chambers Tech Exchange" />
        <Stat label="Shipping today" value="Greater China" hint="Policy books + e-com listing scenery" />
        <Stat label="Next pack" value="GCC" hint="Arabic · faith · short-form · gold" />
      </div>
    </Slide>
  );
}

function Management() {
  return (
    <Slide kicker="02 · Management team" title="Founder-led, already shipping">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-2xl border border-white/10 bg-white/4 p-6">
          <p className="text-[11px] tracking-[0.16em] text-teal-300 uppercase">
            Founder
          </p>
          <p className="mt-2 font-heading text-4xl font-semibold">
            {PITCH_META.founder}
          </p>
          <p className="mt-1 text-sm text-white/45">
            Product · commercial · both engines
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Owns the Content AI review desk and visuai_ImageGen. Operates from
            the Hong Kong–Shenzhen corridor with HSITP SPIN backing. Commercial
            relationships already live with mainland pet e-commerce (Gouji and
            Maoji Co Ltd), plus jewellery and apparel programmes that use the
            same scenery engine.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Panel title="Operating model">
            Small founder team plus Greater China delivery partners who already
            produce listing visuals at marketplace cadence. We do not staff a
            Dubai office first — we put a GCC policy pack and Arabic / faith
            rules on software that is already in production.
          </Panel>
          <Panel title="What we hire next in the corridor">
            A GCC media / policy lead (Arabic linguist who can own the pack),
            and a design partner in gold retail, a marketplace, or a short-form
            network. Named operators and advisors beyond {PITCH_META.founder} are open on this
            slide and can be filled for the application pack.
          </Panel>
          <Panel title="Governance">
            Policy is data. China keyword books and a GCC religious / political
            list swap without rewriting the pipeline. Editors stay in the loop
            — the model cites and suggests; it does not publish.
          </Panel>
          <Panel title="Open on this slide">
            Legal entity details, additional named operators, and advisor names
            to be confirmed in the application pack. The product and the China
            delivery track record are not open — they already ship.
          </Panel>
        </div>
      </div>
    </Slide>
  );
}

function Capability() {
  return (
    <Slide
      kicker="02 · Technical capability"
      title="Two engines, one review language — already in production code"
    >
      <p className="max-w-3xl text-[15px] leading-relaxed text-white/68">
        ContentModeration and visuai_ImageGen are live codebases, not a
        slide-only architecture. The corridor work is a new policy pack and a
        video frame loop on the same Gemini judge — not a greenfield rewrite.
        Editors already speak one language: structured text, a cited hit, a
        severity, a rewrite.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Panel title="Content AI stack">
          <ul className="list-disc space-y-2 pl-4">
            <li>
              Text: policy keyword book (political, religious, public-order
              classes) + Gemini severity JSON (high / medium / low) + rewrite
              suggestion with a source article.
            </li>
            <li>
              Image: Google Cloud Vision labelDetection on the still; the
              caption is judged by the same text engine.
            </li>
            <li>
              Video (corridor build): sample frames + ASR dialogue → timestamped
              JSON → same judge. A Reel becomes a searchable document.
            </li>
            <li>
              Risk graph: Google Image Search / Web Detection on flagged frames
              for religious sites, royal likeness, news stills.
            </li>
            <li>
              Editorial desk: highlight, cite source policy, one-click rewrite,
              escalate. Humans decide; the model does not publish.
            </li>
          </ul>
        </Panel>
        <Panel title="visuai_ImageGen stack">
          <ul className="list-disc space-y-2 pl-4">
            <li>
              FastAPI + Gemini image models. Category packs: jewellery,
              clothing, toy, electronics, luxury.
            </li>
            <li>
              SceneRecommend writes scene JSON (title, description, camera,
              talent). SceneValidator enforces required fields and human-model
              count so every plate is re-editable.
            </li>
            <li>
              Jewellery design lock: product reference is the primary template
              — shape, metal, engraving, placement must stay identical. Only
              light, set and talent move.
            </li>
            <li>
              Merchandiser studio on ninghuen.com: model, quantity, ratio, style
              → collage with photo parameters → in-place edit.
            </li>
            <li>
              Export gate: generated stills run through Content AI (modest
              dress, sacred backdrop, political marks) before they reach the
              gallery.
            </li>
          </ul>
        </Panel>
      </div>
    </Slide>
  );
}

function Problem() {
  return (
    <Slide
      kicker="03 · Technology · The gap"
      title="Western filters fail where the forbidden object is not nudity"
    >
      <p className="max-w-3xl text-[15px] leading-relaxed text-white/72">
        Generic cloud classifiers (AWS Rekognition, Azure, App Store NSFW) are
        trained on Western content policy. In Shenzhen the miss is a slogan. In
        Dubai the miss is a shrine, a royal likeness, a lyric in Ramadan, or a
        marketplace still that used a mosque courtyard as décor. The model is
        not weak — the law is different. Programme judges should read the three
        failure modes we actually sell against.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Panel title="Identity is not a caption">
          An LLM will call a Friday mosque “historic architecture.” The airtime
          is still illegal. Identity lives in reverse image search and entity
          pages — matching URLs, news wires, known landmarks — not in a label
          list of “building” and “person”.
        </Panel>
        <Panel title="A Reel is not a poster">
          Risk sits in one spoken line, one burned-in overlay, one frame at
          00:14. Poster-level tools never see it. Video must become timestamped
          documents: who is on screen, what they wear, what they say, which
          symbols appear — dialogue included, Arabic included.
        </Panel>
        <Panel title="Generation is ungoverned">
          Most image models will place a SKU on a sacred site if the prompt is
          pretty. That still ships as a listing. Create and clear have to share
          the same cultural frame: design lock on the jewellery, faith lock on
          the set, Content AI as the export gate.
        </Panel>
      </div>
    </Slide>
  );
}

function Product() {
  return (
    <Slide
      kicker="03 · Technology · Product"
      title="Compliance-ready Content Intelligence — the desk"
    >
      <p className="max-w-3xl text-[15px] leading-relaxed text-white/72">
        Not a single NSFW score. An editorial system: ingest, structure, cite,
        rewrite. Policy packs swap (Greater China ↔ GCC) without changing the
        four-step loop. The product for this corridor is the review desk media
        and marketplace teams already understand — loaded with Arabic, modest
        dress, and religious / political risk.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-4">
        <Step n="01" t="Ingest" d="Text, image, PDF, game script, or video file." />
        <Step
          n="02"
          t="Structure"
          d="LLM turns pixels and audio into captions, dialogue, objects, dress, OCR."
        />
        <Step
          n="03"
          t="Policy hit"
          d="Keyword / embedding match against the active pack — China or GCC."
        />
        <Step
          n="04"
          t="Judge + rewrite"
          d="High / medium / low, source article, suggested safe phrasing."
        />
      </div>
      <div className="mt-6 h-[min(40vh,320px)] min-h-[230px]">
        <ReviewConsole />
      </div>
    </Slide>
  );
}

function Frames() {
  return (
    <Slide
      kicker="03 · Technology · Video, image, text"
      title="Every frame becomes structured language — dialogue included"
    >
      <p className="max-w-3xl text-[15px] leading-relaxed text-white/72">
        A 30-second Reel is not one image. We sample the timeline, pull spoken
        lines, and ask the multimodal LLM to write a JSON record per beat: who
        is on screen, what they wear, what they say, what text is burned in,
        which symbols appear. Reviewers search language — including Arabic
        dialogue — not pixels. The same schema is used for a still and for a
        generated jewellery plate.
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <Panel title="Video">
          Sampled keyframes + ASR. Timestamped JSON. Overlay OCR. Spoken line
          vs on-screen contradiction. The corridor build is this loop on the
          live judge — productization of the image → caption → judge path we
          already run.
        </Panel>
        <Panel title="Image">
          Vision labels plus LLM caption, then the same policy hit. Generated
          jewellery plates use the identical record, so a mashrabiya set is
          reviewed like a marketplace still.
        </Panel>
        <Panel title="Text">
          Titles, scripts, game copy, listing Arabic. Keyword book + embedding
          + Gemini severity. Rewrite in-flow so copywriters are not sent back
          to a blank page.
        </Panel>
      </div>
      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#080d1c]">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-2 font-mono text-[10px] text-white/40">
          <span>campaign_eid_v3.mp4</span>
          <span>00:14.2 · 24 fps · sampled</span>
        </div>
        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="border-white/8 p-4 lg:border-r">
            <div className="relative overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/samples/gcc-mashrabiya.png"
                alt="Keyframe from a GCC jewellery cut"
                className="aspect-[16/10] w-full object-cover"
              />
              <span className="absolute top-3 left-3 rounded bg-black/70 px-2 py-0.5 font-mono text-[10px] text-teal-200">
                FRAME 00:14.2
              </span>
            </div>
            <div className="mt-3 flex gap-1">
              {GCC_PLATES.map((plate, i) => (
                <div
                  key={plate.src}
                  className={cn(
                    "h-11 flex-1 overflow-hidden rounded",
                    i === 1 && "ring-1 ring-teal-300"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={plate.src} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          <pre className="overflow-auto p-5 font-mono text-[11px] leading-6 text-teal-100/85">{`{
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
    </Slide>
  );
}

function SearchGraph() {
  return (
    <Slide
      kicker="03 · Technology · Risk graph"
      title="Captions miss identity. Google Image Search names it."
    >
      <p className="max-w-3xl text-[15px] leading-relaxed text-white/72">
        Vision labels and LLM captions are necessary but not sufficient. A
        mosque courtyard, a royal portrait, a protest still, a sectarian mural —
        the model may call them décor. Flagged frames go to reverse image
        search (Google Vision Web Detection / Image Search). Matching pages,
        news wires and known landmarks come back as evidence. Religion and
        politics are first-class risks for GCC airtime, not NSFW afterthoughts.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <Panel title="Match the still">
          Flagged frames go to the search graph. Near-duplicate pages, news
          stills and known landmarks come back as evidence, not guesses. Each
          hit cites the matching URL.
        </Panel>
        <Panel title="Religion & politics">
          Sacred sites used as product backdrops. Political graffiti in UGC.
          Cross-border news imagery reused in ads. Royal likeness
          near-duplicates. These classes sit beside — not below — dress and
          nudity.
        </Panel>
        <Panel title="Human last mile">
          The desk shows the frame, the structured caption, the search hits
          with URLs, and a suggested crop or rewrite. This is the same last
          mile we already run on Greater China text — extended to pixels that
          only a search graph can name.
        </Panel>
      </div>
      <div className="mt-5 space-y-1 rounded-2xl border border-white/10 bg-white/3 px-5 py-1 font-mono text-sm">
        <Hit
          risk="high"
          q="web detection"
          a="Friday mosque courtyard used as jewellery set · 11 matching pages"
        />
        <Hit
          risk="high"
          q="entity"
          a="Royal likeness near-duplicate · news wire still"
        />
        <Hit
          risk="med"
          q="ocr ∩ policy"
          a="Sectarian slogan in overlay · Khaleeji dialect"
        />
        <Hit risk="low" q="dress" a="Abaya coverage · modest-dress pass" />
      </div>
    </Slide>
  );
}

function Uniqueness() {
  return (
    <Slide
      kicker="03 · Technology · Uniqueness"
      title="Create and clear in the same cultural frame"
    >
      <p className="max-w-3xl text-[15px] leading-relaxed text-white/72">
        The comparison a programme jury can hold: generic cloud filters and
        ungoverned generators versus a desk that already ships Greater China
        policy and SKU-true jewellery, now loading a GCC pack.
      </p>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
        <div className="min-w-[36rem]">
        <div className="grid grid-cols-[0.7fr_1fr_1.35fr] border-b border-white/10 bg-white/6 px-4 py-2 text-[10px] tracking-[0.14em] text-white/40 uppercase">
          <span>Dimension</span>
          <span>Generic cloud / generator</span>
          <span className="text-teal-200/70">Ning Huen</span>
        </div>
        {COMPARE_ROWS.map((row) => (
          <div
            key={row.dim}
            className="grid grid-cols-[0.7fr_1fr_1.35fr] gap-2 border-b border-white/8 px-4 py-3 last:border-0"
          >
            <p className="text-sm font-medium text-white">{row.dim}</p>
            <p className="text-sm text-white/45">{row.generic}</p>
            <p className="text-sm text-white/80">{row.ours}</p>
          </div>
        ))}
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Panel title="Why this is not Rekognition">
          Policy packs, not a single Western NSFW score. Video is searched as
          structured text plus dialogue. Search-graph evidence for religion and
          politics. Rewrite, not only block — copywriters stay in flow;
          merchandisers keep the SKU.
        </Panel>
        <Panel title="Why Image AI is not “another generator”">
          SKU-true jewellery: gem geometry and metal are locked to the master
          plate. Every plate ships with scene notes and camera parameters —
          re-editable. Category presets already proven on pet, jewellery and
          apparel. The Content AI judge is the export gate.
        </Panel>
      </div>
    </Slide>
  );
}

function Generate() {
  return (
    <Slide
      kicker="03 · Technology · Generation compliance"
      title="visuai_ImageGen has a design lock and a faith lock"
    >
      <p className="max-w-3xl text-[15px] leading-relaxed text-white/72">
        In production prompts, the product reference is the primary design
        template: jewellery shape, material, engravings and positioning must
        remain identical. Generated variations may only change background,
        lighting and model context. For the GCC corridor we add a second gate
        before export — modest dress, no sacred-site backdrop, no royal
        likeness, Ramadan-safe props. Failed stills never reach the gallery;
        the prompt is rewritten and regenerated. Same oval sapphire SKU; five
        faith-aware plates.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
        {GCC_PLATES.map((plate) => (
          <figure
            key={plate.src}
            className="overflow-hidden rounded-xl border border-white/10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={plate.src}
              alt={plate.title}
              className="aspect-[4/5] w-full object-cover"
            />
            <figcaption className="p-2">
              <p className="text-xs font-medium">{plate.title}</p>
              <p className="text-[10px] text-white/40">{plate.note}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Slide>
  );
}

function Market() {
  return (
    <Slide
      kicker="04 · Business · Addressable markets"
      title="Where the desk gets paid"
    >
      <p className="max-w-3xl text-[15px] leading-relaxed text-white/72">
        Industry estimates for orientation (2026), not a Ning Huen forecast:
        GCC e-commerce GMV on a path past ~$70B; UAE e-commerce ~$12B with
        Dubai around 60%; digital / social video in the low-to-mid billions
        depending on definition. The scarce unit is the second inside the Reel,
        and the listing image that can fail a faith or political check. We sell
        into three seats that already buy creative and already buy compliance.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat
          label="GCC e-com"
          value="~$57–72B"
          hint="GMV path into 2026 — every listing is an image + Arabic caption to clear"
        />
        <Stat
          label="UAE e-com"
          value="~$12B"
          hint="Dubai ~60% of UAE. Luxury, gold and fashion set the creative bar"
        />
        <Stat
          label="Digital / social video"
          value="Low–mid $B"
          hint="Short-form needs frame-level, not poster-level, review"
        />
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <Panel title="Media & platforms">
          Publishers, agencies, Snap / TikTok / Reels teams who cannot wait 3–7
          days for a human pass on every cut — and cannot treat a shrine or a
          lyric as an after-the-fact takedown.
        </Panel>
        <Panel title="Marketplaces">
          Noon, Amazon.ae, gold-souk digital, cross-border China sellers
          entering GCC with Arabic titles and UGC stills that never saw a Gulf
          policy pack.
        </Panel>
        <Panel title="Brand studios">
          Jewellery and modest fashion that must generate and clear in one
          workflow — Ramadan / Eid film, gold listings, abaya lookbooks.
        </Panel>
      </div>
    </Slide>
  );
}

function GccApps() {
  return (
    <Slide
      kicker="04 · Business · GCC applications"
      title="What we would run in Dubai first"
    >
      <p className="max-w-3xl text-[15px] leading-relaxed text-white/72">
        Illustrative applications for the corridor — invented but operationally
        plausible, mapped onto the desk we already run. These are the first
        queues a design partner would load, not a TAM slide restated.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GCC_APPS.map((app) => (
          <Panel key={app.t} title={app.t}>
            {app.d}
          </Panel>
        ))}
      </div>
    </Slide>
  );
}

function Traction() {
  return (
    <Slide kicker="04 · Business · Track record" title="Already in the catalog">
      <p className="max-w-3xl text-[15px] leading-relaxed text-white/72">
        visuai_ImageGen is not a demo folder. It has been used to produce
        listing scenery and campaign stills for mainland China e-commerce —
        then the same engine was pointed at jewellery and apparel. Content AI
        already runs Greater China keyword books and Vision + Gemini image
        review. The corridor is a GCC pack and a video loop, not a first
        product. Named revenue, dates and volumes can be filled in the
        application pack; the commercial relationships below are the proof of
        delivery we can stand on today.
      </p>
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <Proof
          name="Gouji and Maoji Co Ltd"
          role="Mainland pet e-commerce"
          note="Listing scenery and catalog stills at marketplace cadence — the original visuai_ImageGen proving ground. Same category-pack pattern we now point at modest fashion and gold."
        />
        <Proof
          name="Fine jewellery"
          role="SKU-true gem geometry"
          note="Oval sapphire halo programme on ninghuen.com is the public jewellery proof. GCC abaya / mashrabiya / souk plates use the same design lock — only set, light and talent move."
        />
        <Proof
          name="Apparel"
          role="On-model lookbooks"
          note="Talent, ratio, style, then edit in place. Same engine, different category pack — the path into modest fashion lookbooks that must also clear dress and backdrop."
        />
      </div>
    </Slide>
  );
}

function Close() {
  return (
    <Slide
      kicker="04 · Business · Corridor ask"
      title="A GCC pack on a desk that already runs"
    >
      <p className="max-w-3xl text-[15px] leading-relaxed text-white/72">
        We are not asking the programme to fund a company from zero in Dubai.
        We are asking for design partners and a green channel so the Content AI
        desk — already proven on Greater China policy — can carry a Gulf pack:
        Arabic, modest dress, religious and political risk, and a generation
        gate for jewellery and fashion plates.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Panel title="What we need on the ground">
          Design partners in jewellery retail, marketplaces and short-form
          media. A first GCC policy pack (MSA + Khaleeji, faith, royal,
          Ramadan windows) loaded on the live desk. Arabic linguist / media
          counsel as the pack owner.
        </Panel>
        <Panel title="What the corridor unlocks">
          Green channel to SANDBOX by Oraseya Capital (up to USD 150,000) and
          FIT 4 START (EUR 150,000) via HSITP × Dubai Chambers — from Greater
          China clearance to Gulf airtime.
        </Panel>
      </div>
      <div className="mt-5 overflow-hidden rounded-2xl border border-teal-400/20 bg-teal-400/5">
        <p className="border-b border-teal-400/15 px-5 py-2 text-[11px] tracking-[0.16em] text-teal-200 uppercase">
          Ninety days in the programme
        </p>
        {PROGRAMME_PLAN.map((row) => (
          <div
            key={row.when}
            className="grid gap-1 border-b border-white/8 px-5 py-3 last:border-0 sm:grid-cols-[7.5rem_1fr] sm:items-baseline"
          >
            <p className="font-mono text-xs text-teal-200">{row.when}</p>
            <p className="text-sm leading-relaxed text-white/70">{row.what}</p>
          </div>
        ))}
      </div>
      <p className="mt-7 font-heading text-xl">
        {PITCH_META.founder} · Ning Huen Technology
      </p>
      <p className="mt-1 text-sm tracking-[0.16em] text-teal-300/85 uppercase">
        {PITCH_META.site} · HSITP SPIN · {PITCH_META.corridor}
      </p>
    </Slide>
  );
}

function ReviewConsole() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#070b18]">
      <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[10px] text-white/35">
          ninghuen desk · GCC pack · live
        </span>
        <span className="ml-auto rounded bg-red-500/15 px-2 py-0.5 font-mono text-[10px] text-red-300">
          2 HIGH
        </span>
      </div>
      <div className="grid min-h-0 flex-1 lg:grid-cols-[0.85fr_1.2fr_0.95fr]">
        <div className="hidden border-r border-white/8 p-3 md:block">
          <p className="mb-2 font-mono text-[10px] tracking-widest text-white/30">
            QUEUE
          </p>
          {(
            [
              ["eid_cut_04.mp4", "00:42", "high"],
              ["souk_pdp.png", "still", "med"],
              ["listing_ar.txt", "copy", "low"],
              ["abaya_look_12.png", "still", "clear"],
            ] as const
          ).map(([name, meta, risk]) => (
            <div
              key={name}
              className="mb-1 flex items-center justify-between px-1 py-1.5"
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
        <div className="relative min-h-[160px] border-r border-white/8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/samples/gcc-souk.png"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute top-[28%] left-[16%] h-[40%] w-[34%] rounded border border-red-400/80" />
          <div className="absolute top-[30%] left-[52%] rounded bg-red-500/90 px-2 py-1 font-mono text-[10px] text-white">
            web match · sacred cluster
          </div>
        </div>
        <div className="hidden flex-col justify-between p-4 sm:flex">
          <div>
            <p className="font-mono text-[10px] tracking-widest text-white/30">
              FINDING
            </p>
            <p className="mt-1 font-heading text-lg">Religious landmark risk</p>
            <p className="mt-2 text-xs leading-relaxed text-white/50">
              Lattice classified as décor. Search graph clustered fanous /
              mashrabiya with sacred-site stills. Hold for editor.
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] text-teal-300/80">SUGGESTED</p>
            <p className="mt-1 text-xs text-white/70">
              Recrop to product tray. Drop architectural screen. Keep gold
              temperature.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/4 p-5 text-sm leading-relaxed text-white/65">
      <h3 className="font-heading text-base font-semibold text-white">{title}</h3>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Step({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/4 p-3">
      <p className="font-mono text-[10px] text-teal-300">{n}</p>
      <p className="mt-1 font-heading font-semibold">{t}</p>
      <p className="mt-1 text-xs leading-relaxed text-white/50">{d}</p>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
      <p className="text-[11px] tracking-[0.14em] text-white/35 uppercase">
        {label}
      </p>
      <p className="mt-1 font-heading text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs leading-relaxed text-white/45">{hint}</p>
    </div>
  );
}

function Hit({ risk, q, a }: { risk: string; q: string; a: string }) {
  return (
    <div className="flex items-start gap-3 border-b border-white/8 py-3 last:border-0">
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
        <p className="text-[13px] text-white/80">{a}</p>
      </div>
    </div>
  );
}

function Proof({
  name,
  role,
  note,
}: {
  name: string;
  role: string;
  note: string;
}) {
  return (
    <div className="grid gap-1 border-b border-white/10 px-5 py-4 last:border-0 sm:grid-cols-[0.9fr_0.7fr_1.3fr] sm:items-baseline">
      <p className="font-heading text-lg font-semibold">{name}</p>
      <p className="text-sm text-teal-200/75">{role}</p>
      <p className="text-sm text-white/50">{note}</p>
    </div>
  );
}
