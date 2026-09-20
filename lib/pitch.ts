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
    note: "Abaya campaign · golden hour · SKU locked",
  },
  {
    src: "/samples/gcc-mashrabiya.png",
    title: "Mashrabiya courtyard",
    note: "Editorial modest fashion · lattice light",
  },
  {
    src: "/samples/gcc-desert.png",
    title: "Desert blue hour",
    note: "Ramadan / Eid gifting still",
  },
  {
    src: "/samples/gcc-lantern.png",
    title: "Fanous still life",
    note: "Product plate · lantern + silk",
  },
  {
    src: "/samples/gcc-souk.png",
    title: "Gold souk tray",
    note: "22k context · scale · velvet",
  },
] as const;

export const GCC_APPS = [
  {
    t: "Ramadan & Eid film",
    d: "Pre-clear TVC and influencer cuts: music vs nasheed windows, food and alcohol, modest dress, sacred architecture used as a product backdrop.",
  },
  {
    t: "Gold & jewellery listings",
    d: "Karat claims vs the photo. Royal-crest misuse. Modest on-model plates generated and cleared in one workflow — SKU geometry stays locked.",
  },
  {
    t: "Marketplace UGC",
    d: "Arabic titles, Khaleeji slang, WhatsApp catalogue stills. Political and sectarian symbols are named by the search graph, not guessed from labels.",
  },
  {
    t: "Live & short-form",
    d: "Timestamped flags on Reels / Snap. Overlay OCR. Spoken line vs on-screen contradiction — a 30-second cut is a document, not a poster.",
  },
  {
    t: "News-adjacent ads",
    d: "Stop a campaign that reused a protest or conflict still the LLM described only as “crowd in a square”. Identity lives in matching pages.",
  },
  {
    t: "China → GCC sellers",
    d: "Pet, apparel and jewellery merchants we already serve, now needing a Gulf policy pack on the same SKU engine and the same review desk.",
  },
] as const;

export const COMPARE_ROWS = [
  {
    dim: "Policy",
    generic: "One Western NSFW score",
    ours: "Swappable packs — Greater China NSL / keyword books today, GCC faith & politics next",
  },
  {
    dim: "Video",
    generic: "Poster thumbnail or clip-level score",
    ours: "Per-frame JSON + ASR dialogue + burned-in OCR",
  },
  {
    dim: "Identity",
    generic: "Object labels (“building”, “person”)",
    ours: "Google Image Search / Web Detection entity graph with cited URLs",
  },
  {
    dim: "Language",
    generic: "English-centric classifiers",
    ours: "Arabic MSA + Khaleeji + Chinese packs as data, not a model rewrite",
  },
  {
    dim: "Generation",
    generic: "Prompt-and-pray scenery",
    ours: "Jewellery design lock + modest-dress / sacred-site faith lock before export",
  },
  {
    dim: "Last mile",
    generic: "Block or allow",
    ours: "Cite the source article, rewrite, escalate — editors publish, not the model",
  },
] as const;

export const PROGRAMME_PLAN = [
  {
    when: "Days 1–30",
    what: "Load the first GCC pack (MSA + Khaleeji, modest dress, royal likeness, Ramadan windows). Appoint an Arabic linguist as pack owner. Run the sapphire SKU through faith-aware scenery.",
  },
  {
    when: "Days 31–60",
    what: "Stand up the video frame loop on the live desk. Queue Ramadan / Eid sample cuts with a jewellery or agency design partner. Surface search-graph evidence in the editor UX.",
  },
  {
    when: "Days 61–90",
    what: "A marketplace or short-form partner live on the desk. Corridor channel toward SANDBOX / FIT 4 START. Written case: a China-seller SKU cleared for Gulf airtime.",
  },
] as const;
