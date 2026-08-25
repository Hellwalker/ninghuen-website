import { BrandLogo } from "@/components/brand-logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/8 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <BrandLogo variant="lockup" className="h-16 sm:h-[4.5rem]" />
        <div className="text-sm text-white/40">
          <p>Ning Huen Technology · HSITP SPIN Programme</p>
          <p className="mt-1">Founded by DH · ninghuen.com</p>
        </div>
      </div>
    </footer>
  );
}
