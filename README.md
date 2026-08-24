# Ning Huen Technology

Marketing site for [ninghuen.com](https://ninghuen.com): e-commerce image scenery generation, plus the existing Content Moderation pitch.

The Image AI channel is rebuilt as a visual product — closer to how [Lovart](https://lovart.ai) shows a canvas, not a three-step diagram. Visitors pick a human model, quantity, ratio and style, generate a collage, then open any plate to edit it with the scene description and camera notes still attached.

Content Moderation is unchanged: the original slide deck is served at `/content-moderation.html`.

## Run locally

```bash
npm install
npm run dev
```

Dev server defaults to `http://127.0.0.1:43217`.

```bash
npm run build
```

Static export lands in `out/`. That folder can be published to GitHub Pages (`Hellwalker/ninghuen-website`) with the existing custom domain.

## Image AI studio

1. Seed SKU is the oval sapphire halo pendant (catalog master).
2. Controls: talent (Aria / Elise / Kenji / product only), quantity 4–8, ratio, style.
3. Generate a collage. Each tile has a scene paragraph and photo parameters (lens, aperture, lighting, grade).
4. Open a tile in the single-plate editor. Touch Pendant / Model / Scenery to apply a known edit.

Gallery: `/gallery/`. Editor: `/gallery/<id>/`.

Sample plates live in `public/samples/`. Bottom-right of each frame is covered with an NH mark so generator watermarks never show.

The cloud environment could not read `Downloads/LOCAL_20260823_102627`. Drop those originals (watermark already covered or cropped) into `public/samples/` and point `lib/catalog.ts` at them to swap in your batch.

## Stack

Next.js (static export) · TypeScript · Tailwind CSS · shadcn/ui
