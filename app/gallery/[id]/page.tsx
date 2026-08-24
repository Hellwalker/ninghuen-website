import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShotEditor } from "@/components/shot-editor";
import { SHOTS, getShot } from "@/lib/catalog";

export function generateStaticParams() {
  return SHOTS.map((shot) => ({ id: shot.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const shot = getShot(id);
  return {
    title: shot ? shot.title : "Look",
    description: shot?.scene,
  };
}

export default async function ShotPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shot = getShot(id);
  if (!shot) notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 pt-10 pb-24 sm:px-6">
      <ShotEditor shot={shot} />
    </main>
  );
}
