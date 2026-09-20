export const PITCH_META = {
  programme: "HSITP × Dubai Chambers Tech Exchange Programme",
  corridor: "Hong Kong ⇆ Dubai",
  company: "Ning Huen Technology",
  site: "ninghuen.com",
  year: "2026",
} as const;

export type PitchSection =
  | "cover"
  | "company"
  | "team"
  | "technology"
  | "business";

export const SECTION_TABS: { id: PitchSection; label: string }[] = [
  { id: "cover", label: "Cover" },
  { id: "company", label: "Company" },
  { id: "team", label: "Team" },
  { id: "technology", label: "Technology" },
  { id: "business", label: "Business" },
];

export const GCC_PLATES = [
  {
    src: "/samples/gcc-terrace.png",
    title: "Dubai marina terrace",
    note: "Modest campaign · SKU locked",
  },
  {
    src: "/samples/gcc-mashrabiya.png",
    title: "Mashrabiya courtyard",
    note: "Editorial · lattice light",
  },
  {
    src: "/samples/gcc-desert.png",
    title: "Desert blue hour",
    note: "Ramadan gifting still",
  },
  {
    src: "/samples/gcc-lantern.png",
    title: "Fanous still life",
    note: "Product plate · lantern",
  },
  {
    src: "/samples/gcc-souk.png",
    title: "Gold souk tray",
    note: "22k context · velvet",
  },
] as const;
