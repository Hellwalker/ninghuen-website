"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  Aperture,
  Clapperboard,
  Ratio,
  Sparkles,
  Users,
} from "lucide-react";
import { ShotCard } from "@/components/shot-card";
import { ShotImage } from "@/components/shot-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  assembleBoard,
  MODELS,
  PRODUCT,
  QUANTITIES,
  RATIOS,
  STYLES,
  THINKING_STEPS,
  type ModelId,
  type Quantity,
  type RatioId,
  type Shot,
  type StyleId,
} from "@/lib/catalog";
import { cn } from "@/lib/utils";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function ImageStudio() {
  const [model, setModel] = useState<ModelId>("aria");
  const [quantity, setQuantity] = useState<Quantity>(6);
  const [ratio, setRatio] = useState<RatioId>("4:5");
  const [style, setStyle] = useState<StyleId>("editorial");
  const [board, setBoard] = useState<Shot[] | null>(null);
  const [generating, setGenerating] = useState(false);
  const [step, setStep] = useState(-1);
  const [error, setError] = useState<string | null>(null);

  const settings = useMemo(
    () => ({ model, quantity, ratio, style }),
    [model, quantity, ratio, style]
  );

  async function generate() {
    setError(null);
    setGenerating(true);
    setBoard(null);
    try {
      for (let i = 0; i < THINKING_STEPS.length; i += 1) {
        setStep(i);
        await delay(420);
      }
      const next = assembleBoard(settings);
      if (next.length === 0) {
        setError("No scenery matched these controls. Try another model or style.");
      } else {
        setBoard(next);
      }
      setStep(THINKING_STEPS.length);
    } catch {
      setError("The board could not be assembled. Try generating again.");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#080f27] shadow-[0_40px_80px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs tracking-wide text-white/45">
          Ning Huen · Scenery Studio
        </span>
        <Badge variant="outline" className="ml-auto border-teal-400/30 text-teal-300">
          Demo board · local catalog
        </Badge>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr]">
        <aside className="border-b border-white/8 p-4 lg:border-r lg:border-b-0 lg:p-5">
          <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 p-3">
            <ShotImage
              src={PRODUCT.original}
              alt={PRODUCT.name}
              className="size-16 shrink-0 rounded-xl"
            />
            <div>
              <p className="font-mono text-[10px] text-teal-300/80">{PRODUCT.sku}</p>
              <p className="font-heading text-sm font-semibold">{PRODUCT.name}</p>
              <p className="text-xs text-white/50">{PRODUCT.category}</p>
            </div>
          </div>

          <Field icon={<Users className="size-3.5" />} label="Human model">
            <div className="grid grid-cols-2 gap-2">
              {MODELS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setModel(item.id)}
                  className={cn(
                    "rounded-xl border p-1.5 text-left transition-colors",
                    model === item.id
                      ? "border-teal-400/50 bg-teal-400/10"
                      : "border-white/8 hover:border-white/20"
                  )}
                >
                  <ShotImage
                    src={item.portrait}
                    alt={item.name}
                    className="mb-1.5 aspect-square w-full rounded-lg"
                    coverWatermark={item.id !== "none"}
                  />
                  <p className="px-0.5 text-[11px] font-medium">{item.name}</p>
                  <p className="px-0.5 text-[10px] text-white/45">{item.role}</p>
                </button>
              ))}
            </div>
          </Field>

          <Field icon={<Sparkles className="size-3.5" />} label="Quantity">
            <div className="flex gap-1.5">
              {QUANTITIES.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setQuantity(n)}
                  className={cn(
                    "h-9 flex-1 rounded-lg border text-sm font-medium",
                    quantity === n
                      ? "border-teal-400/50 bg-teal-400/10 text-white"
                      : "border-white/8 text-white/70 hover:border-white/20"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </Field>

          <Field icon={<Ratio className="size-3.5" />} label="Frame ratio">
            <div className="grid grid-cols-4 gap-1.5">
              {RATIOS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setRatio(item.id)}
                  className={cn(
                    "h-9 rounded-lg border text-xs font-medium",
                    ratio === item.id
                      ? "border-teal-400/50 bg-teal-400/10 text-white"
                      : "border-white/8 text-white/70 hover:border-white/20"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </Field>

          <Field icon={<Clapperboard className="size-3.5" />} label="Style">
            <div className="flex flex-col gap-1.5">
              {STYLES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStyle(item.id)}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-left",
                    style === item.id
                      ? "border-teal-400/50 bg-teal-400/10"
                      : "border-white/8 hover:border-white/20"
                  )}
                >
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-[11px] text-white/45">{item.blurb}</p>
                </button>
              ))}
            </div>
          </Field>

          <Button
            onClick={generate}
            disabled={generating}
            className="mt-4 h-11 w-full bg-linear-to-r from-teal-500 to-blue-600 text-white hover:from-teal-400 hover:to-blue-500"
          >
            <Aperture className="size-4" />
            {generating ? "Building scenery…" : "Generate collage"}
          </Button>
        </aside>

        <section className="min-h-[520px] p-4 sm:p-6">
          {error ? (
            <div className="flex h-full min-h-[420px] items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/5 px-6 text-center text-sm text-red-200">
              {error}
            </div>
          ) : null}

          {!error && generating ? (
            <div className="flex min-h-[420px] flex-col justify-center gap-6">
              <p className="font-heading text-lg">Thinking, in systems</p>
              <ol className="space-y-3">
                {THINKING_STEPS.map((line, index) => (
                  <li
                    key={line}
                    className={cn(
                      "flex gap-3 text-sm",
                      index <= step ? "text-white" : "text-white/30"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 size-2 shrink-0 rounded-full",
                        index < step
                          ? "bg-teal-400"
                          : index === step
                            ? "animate-pulse bg-teal-300"
                            : "bg-white/15"
                      )}
                    />
                    {line}
                  </li>
                ))}
              </ol>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {Array.from({ length: quantity }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-[4/5] animate-pulse rounded-2xl bg-white/5"
                  />
                ))}
              </div>
            </div>
          ) : null}

          {!error && !generating && !board ? (
            <EmptyCanvas />
          ) : null}

          {!error && !generating && board ? (
            <div>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs tracking-[0.16em] text-teal-300 uppercase">
                    Collage ready
                  </p>
                  <h2 className="font-heading text-2xl font-semibold">
                    {quantity} looks · {MODELS.find((m) => m.id === model)?.name} ·{" "}
                    {STYLES.find((s) => s.id === style)?.name}
                  </h2>
                  <p className="mt-1 max-w-xl text-sm text-white/55">
                    Each tile carries a scene description and locked photo parameters.
                    Pick a winner and open the editor — the recipe stays attached.
                  </p>
                </div>
                <p className="font-mono text-[11px] text-white/40">
                  {PRODUCT.sku} · {ratio}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {board.map((shot, index) => (
                  <ShotCard
                    key={shot.id}
                    shot={shot}
                    featured={index === 0 && quantity >= 6}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] text-white/50 uppercase">
        {icon}
        {label}
      </div>
      {children}
    </div>
  );
}

function EmptyCanvas() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-teal-400/25 bg-teal-400/5 px-6 py-16 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border border-teal-400/30 bg-teal-400/10 text-teal-300">
        <Aperture className="size-5" />
      </div>
      <h2 className="font-heading text-xl font-semibold">Set the plate, then generate</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
        Choose a human model, how many frames, the ratio, and a style. The engine
        writes scenery plus camera notes so merchandisers can pick a winner and
        edit it without guessing the brief.
      </p>
    </div>
  );
}
