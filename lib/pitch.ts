export const PITCH_META = {
  programme: "HSITP × Dubai Chambers Tech Exchange",
  corridor: "Hong Kong ⇆ Dubai",
  company: "Ning Huen Technology",
  site: "ninghuen.com",
  year: "2026",
} as const;

export type PitchSection = "cover" | "company" | "team" | "technology" | "business";

export const SECTION_TABS: { id: PitchSection; label: string }[] = [
  { id: "cover", label: "Cover" },
  { id: "company", label: "Company" },
  { id: "team", label: "Team" },
  { id: "technology", label: "Technology" },
  { id: "business", label: "Business" },
];

export const GCC_PLATES = [
  { src: "/samples/gcc-terrace.png", title: "Marina" },
  { src: "/samples/gcc-mashrabiya.png", title: "Mashrabiya" },
  { src: "/samples/gcc-desert.png", title: "Blue hour" },
  { src: "/samples/gcc-lantern.png", title: "Fanous" },
  { src: "/samples/gcc-souk.png", title: "Souk" },
] as const;
