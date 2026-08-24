"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "/image-editing/", label: "Image AI" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/content-moderation.html", label: "Content AI" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#070d24]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-teal-400 to-blue-600 font-heading text-[11px] font-extrabold text-[#070d24]">
            NH
          </span>
          <span className="font-heading text-sm font-semibold tracking-tight">
            Ning Huen Tech
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href.replace(/\/$/, "")));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/8 text-white"
                    : "text-white/65 hover:bg-white/6 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Button
            render={<Link href="/image-editing/#studio" />}
            className="ml-2 bg-linear-to-r from-teal-500 to-blue-600 text-white hover:from-teal-400 hover:to-blue-500"
          >
            Open studio
          </Button>
        </nav>

        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden text-white" />
            }
          >
            <Menu />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#0b1228] text-white border-white/10">
            <SheetHeader>
              <SheetTitle>Ning Huen</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 px-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/8"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
