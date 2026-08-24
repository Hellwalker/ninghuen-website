export type ModelId = "aria" | "elise" | "kenji" | "none";
export type StyleId = "editorial" | "street" | "catalog" | "cinematic";
export type RatioId = "1:1" | "4:5" | "16:9" | "9:16";
export type Quantity = 4 | 6 | 8;

export type PhotoParams = {
  camera: string;
  lens: string;
  aperture: string;
  shutter: string;
  iso: string;
  lighting: string;
  whiteBalance: string;
  focus: string;
  grade: string;
};

export type Shot = {
  id: string;
  title: string;
  image: string;
  model: ModelId;
  style: StyleId;
  ratio: RatioId;
  scene: string;
  params: PhotoParams;
  hero?: boolean;
  isOriginal?: boolean;
  editOf?: string;
};

export type Model = {
  id: ModelId;
  name: string;
  role: string;
  portrait: string;
};

export type StyleOption = {
  id: StyleId;
  name: string;
  blurb: string;
};

export const PRODUCT = {
  sku: "NH-SAP-18K-01",
  name: "Oval sapphire halo pendant",
  category: "Jewellery · Fine",
  material: "18k yellow gold, diamond halo, oval royal-blue sapphire",
  original: "/samples/original-pendant.png",
};

export const MODELS: Model[] = [
  {
    id: "aria",
    name: "Aria Chen",
    role: "East Asian · 26 · campaign",
    portrait: "/samples/model-aria.png",
  },
  {
    id: "elise",
    name: "Elise Moreau",
    role: "European · 30 · street",
    portrait: "/samples/model-elise.png",
  },
  {
    id: "kenji",
    name: "Kenji Sato",
    role: "East Asian · 28 · lookbook",
    portrait: "/samples/model-kenji.png",
  },
  {
    id: "none",
    name: "Product only",
    role: "No talent · still life",
    portrait: "/samples/original-pendant.png",
  },
];

export const STYLES: StyleOption[] = [
  {
    id: "editorial",
    name: "Editorial luxury",
    blurb: "Campaign light, location, fashion posture",
  },
  {
    id: "street",
    name: "Street lifestyle",
    blurb: "Documentary 35mm, real streets, movement",
  },
  {
    id: "catalog",
    name: "Studio catalog",
    blurb: "Clean e-commerce, even light, SKU-true color",
  },
  {
    id: "cinematic",
    name: "Cinematic night",
    blurb: "Teal-amber grade, wet pavement, drama",
  },
];

export const RATIOS: { id: RatioId; label: string; className: string }[] = [
  { id: "1:1", label: "1:1", className: "aspect-square" },
  { id: "4:5", label: "4:5", className: "aspect-[4/5]" },
  { id: "16:9", label: "16:9", className: "aspect-video" },
  { id: "9:16", label: "9:16", className: "aspect-[9/16]" },
];

export const QUANTITIES: Quantity[] = [4, 6, 8];

const studio: PhotoParams = {
  camera: "Hasselblad X2D",
  lens: "90mm",
  aperture: "f/8",
  shutter: "1/125",
  iso: "ISO 64",
  lighting: "Twin softboxes, polarizer",
  whiteBalance: "5600K",
  focus: "Stack on pavilion facets",
  grade: "Neutral catalog",
};

export const SHOTS: Shot[] = [
  {
    id: "original",
    title: "SKU master",
    image: "/samples/original-pendant.png",
    model: "none",
    style: "catalog",
    ratio: "1:1",
    isOriginal: true,
    scene:
      "Seamless ivory sweep. Pendant centered, chain exiting frame. No styling props — the color-accurate master used as the generation seed.",
    params: studio,
  },
  {
    id: "velvet",
    title: "Velvet spotlight",
    image: "/samples/scene-velvet.png",
    model: "none",
    style: "cinematic",
    ratio: "1:1",
    scene:
      "Black velvet nest, single overhead spot. Chiaroscuro jewellery advertising — gem fire isolated against void.",
    params: {
      camera: "Sony α7R V",
      lens: "90mm macro",
      aperture: "f/11",
      shutter: "1/80",
      iso: "ISO 100",
      lighting: "Top snoot, black flags",
      whiteBalance: "4800K",
      focus: "Table-top on table facet",
      grade: "Low-key luxury",
    },
  },
  {
    id: "macro",
    title: "Pavilion fire",
    image: "/samples/scene-macro.png",
    model: "none",
    style: "catalog",
    ratio: "1:1",
    scene:
      "Macro fill of the oval sapphire and diamond halo on gloss acrylic. Facet-level commercial still for PDP zoom.",
    params: {
      camera: "Canon EOS R5",
      lens: "100mm macro",
      aperture: "f/13",
      shutter: "1/60",
      iso: "ISO 50",
      lighting: "Ring + kicker, polarizer",
      whiteBalance: "5500K",
      focus: "Focus stack, 18 frames",
      grade: "High-clarity catalog",
    },
  },
  {
    id: "marble",
    title: "Marble still life",
    image: "/samples/scene-marble.png",
    model: "none",
    style: "editorial",
    ratio: "16:9",
    scene:
      "Carrara slab, cream peony, water beads. North-window still life that keeps the SKU hero while adding lifestyle air.",
    params: {
      camera: "Leica SL3",
      lens: "50mm Summicron",
      aperture: "f/2.8",
      shutter: "1/200",
      iso: "ISO 200",
      lighting: "Window left, bounce fill",
      whiteBalance: "5200K",
      focus: "Pendant plane",
      grade: "High-key editorial",
    },
  },
  {
    id: "terrace",
    title: "Golden terrace",
    image: "/samples/scene-terrace.png",
    model: "aria",
    style: "editorial",
    ratio: "4:5",
    hero: true,
    scene:
      "Aria on a Mediterranean marble balcony at golden hour. Champagne silk, sea haze, pendant catching a low sun kicker — the campaign hero.",
    params: {
      camera: "Canon EOS R5",
      lens: "85mm",
      aperture: "f/1.8",
      shutter: "1/800",
      iso: "ISO 100",
      lighting: "Golden hour side-sun, negative fill",
      whiteBalance: "5200K",
      focus: "Nearest eye",
      grade: "Warm cinematic",
    },
  },
  {
    id: "terrace-dusk",
    title: "Terrace at dusk",
    image: "/samples/scene-terrace-dusk.png",
    model: "aria",
    style: "cinematic",
    ratio: "4:5",
    editOf: "terrace",
    scene:
      "Same terrace blocking, recast at blue hour. Cool sky, tungsten wall lamp, pendant held with a warm rim — a lighting-only edit of the hero.",
    params: {
      camera: "Canon EOS R5",
      lens: "85mm",
      aperture: "f/1.8",
      shutter: "1/125",
      iso: "ISO 640",
      lighting: "Blue hour + tungsten practical",
      whiteBalance: "4200K",
      focus: "Nearest eye",
      grade: "Teal-amber night",
    },
  },
  {
    id: "garden",
    title: "White rose garden",
    image: "/samples/scene-garden.png",
    model: "aria",
    style: "editorial",
    ratio: "4:5",
    scene:
      "Overcast garden path, white roses and clipped box. Soft fashion light, pendant readable at three-quarter length.",
    params: {
      camera: "Nikon Z8",
      lens: "70mm",
      aperture: "f/2.2",
      shutter: "1/500",
      iso: "ISO 200",
      lighting: "Open shade, silver bounce",
      whiteBalance: "5600K",
      focus: "Face, shallow falloff",
      grade: "Romantic editorial",
    },
  },
  {
    id: "studio-aria",
    title: "Lookbook studio",
    image: "/samples/scene-studio.png",
    model: "aria",
    style: "catalog",
    ratio: "16:9",
    scene:
      "Seamless grey, three-point beauty. Ivory blouse, front-on eyeline — the e-commerce on-model plate.",
    params: {
      camera: "Hasselblad X2D",
      lens: "80mm",
      aperture: "f/5.6",
      shutter: "1/160",
      iso: "ISO 100",
      lighting: "Octa key, two strip rim",
      whiteBalance: "5600K",
      focus: "Eyes and pendant",
      grade: "Neutral lookbook",
    },
  },
  {
    id: "cafe",
    title: "Window cafe",
    image: "/samples/scene-cafe.png",
    model: "aria",
    style: "street",
    ratio: "16:9",
    scene:
      "Marble cafe table, north window, botanical shadows. Wide lifestyle plate for site banners and lookbooks.",
    params: {
      camera: "Sony α7R V",
      lens: "35mm",
      aperture: "f/2.2",
      shutter: "1/250",
      iso: "ISO 320",
      lighting: "North window, no fill",
      whiteBalance: "5000K",
      focus: "Pendant and face",
      grade: "Airy lifestyle",
    },
  },
  {
    id: "night",
    title: "Rain city night",
    image: "/samples/scene-night.png",
    model: "aria",
    style: "cinematic",
    ratio: "4:5",
    scene:
      "Wet European pavement, shop-window tungsten versus cool street sodium. Black silk, rain on skin, pendant as the only jewel.",
    params: {
      camera: "Sony α7S III",
      lens: "50mm",
      aperture: "f/1.4",
      shutter: "1/80",
      iso: "ISO 1600",
      lighting: "Practical storefront + rim",
      whiteBalance: "3800K",
      focus: "Eye, bokeh city",
      grade: "Teal and amber",
    },
  },
  {
    id: "street",
    title: "Paris side street",
    image: "/samples/scene-street.png",
    model: "elise",
    style: "street",
    ratio: "4:5",
    scene:
      "Elise in a camel coat on cream Haussmann stone. Overcast 35mm walk-and-talk — lifestyle proof the SKU survives real streets.",
    params: {
      camera: "Leica Q3",
      lens: "28mm",
      aperture: "f/2.8",
      shutter: "1/400",
      iso: "ISO 400",
      lighting: "Overcast bounce, no flash",
      whiteBalance: "5400K",
      focus: "Face, environmental",
      grade: "Documentary film",
    },
  },
  {
    id: "greenhouse",
    title: "Greenhouse lookbook",
    image: "/samples/scene-greenhouse.png",
    model: "kenji",
    style: "editorial",
    ratio: "9:16",
    scene:
      "Kenji in charcoal linen under tropical glass. Dappled greenhouse light, vertical story format for social and PDP reels.",
    params: {
      camera: "Canon EOS R5",
      lens: "50mm",
      aperture: "f/1.6",
      shutter: "1/320",
      iso: "ISO 250",
      lighting: "Dappled skylight",
      whiteBalance: "5300K",
      focus: "Eyes, leaves falloff",
      grade: "Modern editorial",
    },
  },
  {
    id: "pendant-warm",
    title: "Warmer metal grade",
    image: "/samples/scene-pendant-warm.png",
    model: "none",
    style: "catalog",
    ratio: "1:1",
    editOf: "original",
    scene:
      "Same SKU master, warmer gold response and a hint of marble in the sweep — a grade-only edit that keeps geometry locked.",
    params: {
      ...studio,
      whiteBalance: "4800K",
      grade: "Warm gold push",
    },
  },
];

export function getShot(id: string) {
  return SHOTS.find((shot) => shot.id === id);
}

export function getModel(id: ModelId) {
  return MODELS.find((model) => model.id === id);
}

export function getStyle(id: StyleId) {
  return STYLES.find((style) => style.id === id);
}

export function ratioClass(ratio: RatioId) {
  return RATIOS.find((item) => item.id === ratio)?.className ?? "aspect-[4/5]";
}

export type StudioSettings = {
  model: ModelId;
  quantity: Quantity;
  ratio: RatioId;
  style: StyleId;
};

export function assembleBoard(settings: StudioSettings): Shot[] {
  const scored = SHOTS.map((shot) => {
    let score = 0;
    if (shot.model === settings.model) score += 10;
    else if (shot.model === "none") score += 3;
    if (shot.style === settings.style) score += 7;
    if (shot.ratio === settings.ratio) score += 4;
    if (shot.isOriginal) score += 1;
    if (shot.hero && settings.model === "aria") score += 2;
    return { shot, score };
  }).sort((a, b) => b.score - a.score);

  const picked: Shot[] = [];
  for (const row of scored) {
    if (picked.length >= settings.quantity) break;
    if (picked.some((item) => item.image === row.shot.image)) continue;
    picked.push(row.shot);
  }
  return picked;
}

export function relatedShots(shot: Shot) {
  return SHOTS.filter(
    (item) =>
      item.id !== shot.id &&
      (item.editOf === shot.id ||
        shot.editOf === item.id ||
        (item.model === shot.model && item.style === shot.style) ||
        item.isOriginal)
  ).slice(0, 4);
}

export const THINKING_STEPS = [
  "Reading SKU geometry and metal/gem color from the master plate",
  "Casting the selected human model and locking wardrobe with the pendant",
  "Building scenery: location, time of day, and supporting props",
  "Writing camera, lens, lighting and grade so each frame stays re-editable",
];
