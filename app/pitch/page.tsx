import type { Metadata } from "next";
import { PitchDeck } from "@/components/pitch-deck";

export const metadata: Metadata = {
  title: "Dubai Corridor Pitch",
  description:
    "Ning Huen Technology for the HSITP × Dubai Chambers Tech Exchange Programme — Content AI moderation and jewellery-grade Image AI for the GCC.",
};

export default function PitchPage() {
  return <PitchDeck />;
}
