import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "nav" | "lockup" | "mark";
  className?: string;
};

export function BrandLogo({ variant = "nav", className }: BrandLogoProps) {
  if (variant === "lockup") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/brand/ninghuen-lockup.png"
        alt="NINGHUEN AI"
        className={cn("h-20 w-auto object-contain sm:h-24", className)}
      />
    );
  }

  if (variant === "mark") {
    return (
      <span
        className={cn(
          "flex size-9 items-center justify-center overflow-hidden rounded-lg bg-[#f3ebe3]",
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/ninghuen-owl-ivory.png"
          alt=""
          className="size-[30px] object-contain"
        />
      </span>
    );
  }

  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#f3ebe3] ring-1 ring-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/ninghuen-owl-ivory.png"
          alt=""
          className="size-[30px] object-contain"
        />
      </span>
      <span className="leading-tight">
        <span className="block font-heading text-sm font-semibold tracking-tight">
          Ning Huen
        </span>
        <span className="block text-[10px] tracking-[0.16em] text-white/45 uppercase">
          AI
        </span>
      </span>
    </span>
  );
}
