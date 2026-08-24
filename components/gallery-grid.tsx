"use client";

import { useMemo, useState } from "react";
import { ShotCard } from "@/components/shot-card";
import { MODELS, SHOTS, STYLES, type ModelId, type StyleId } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function GalleryGrid() {
  const [model, setModel] = useState<ModelId | "all">("all");
  const [style, setStyle] = useState<StyleId | "all">("all");

  const items = useMemo(
    () =>
      SHOTS.filter((shot) => (model === "all" ? true : shot.model === model)).filter(
        (shot) => (style === "all" ? true : shot.style === style)
      ),
    [model, style]
  );

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <FilterRow
          label="Model"
          value={model}
          onChange={setModel}
          options={[
            { id: "all", name: "All talent" },
            ...MODELS.map((item) => ({ id: item.id, name: item.name })),
          ]}
        />
        <FilterRow
          label="Style"
          value={style}
          onChange={setStyle}
          options={[
            { id: "all", name: "All styles" },
            ...STYLES.map((item) => ({ id: item.id, name: item.name })),
          ]}
        />
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center text-sm text-white/55">
          No plates in this filter. Clear a chip to see the full board.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((shot) => (
            <ShotCard key={shot.id} shot={shot} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterRow<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { id: T; name: string }[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[11px] tracking-[0.14em] text-white/40 uppercase">
        {label}
      </span>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium",
            value === option.id
              ? "border-teal-400/50 bg-teal-400/10 text-white"
              : "border-white/10 text-white/60 hover:border-white/25"
          )}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
}
