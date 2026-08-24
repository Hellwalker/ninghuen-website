import { cn } from "@/lib/utils";

type ShotImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  coverWatermark?: boolean;
};

export function ShotImage({
  src,
  alt,
  className,
  imgClassName,
  coverWatermark = true,
}: ShotImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-[#0b1228]", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
      {coverWatermark ? (
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 h-16 w-28 bg-gradient-to-tl from-[#070d24] via-[#070d24]/80 to-transparent"
        />
      ) : null}
      {coverWatermark ? (
        <div
          aria-hidden
          className="absolute right-2 bottom-2 flex h-7 min-w-7 items-center justify-center rounded-md border border-teal-400/30 bg-[#070d24]/85 px-1.5 font-heading text-[10px] font-bold tracking-[0.14em] text-teal-300 backdrop-blur-sm"
        >
          NH
        </div>
      ) : null}
    </div>
  );
}
