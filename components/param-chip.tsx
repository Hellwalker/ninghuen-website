import { cn } from "@/lib/utils";

export function ParamChip({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/8 bg-black/35 px-2.5 py-1.5 backdrop-blur-md",
        className
      )}
    >
      <div className="text-[10px] font-medium tracking-[0.12em] text-teal-300/80 uppercase">
        {label}
      </div>
      <div className="font-heading text-xs font-medium text-white">{value}</div>
    </div>
  );
}
