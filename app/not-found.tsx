import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      <p className="text-xs tracking-[0.16em] text-teal-300 uppercase">404</p>
      <h1 className="mt-2 font-heading text-3xl font-semibold">This plate is not on the board</h1>
      <p className="mt-3 text-sm text-white/55">
        The look you asked for is not in the current catalog.
      </p>
      <Button
        render={<Link href="/gallery/" />}
        className="mt-6 bg-linear-to-r from-teal-500 to-blue-600 text-white"
      >
        Back to gallery
      </Button>
    </main>
  );
}
