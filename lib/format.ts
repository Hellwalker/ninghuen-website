import type { PhotoParams, Shot } from "@/lib/catalog";
import { getModel, getStyle } from "@/lib/catalog";

export function paramLine(params: PhotoParams) {
  return `${params.lens} · ${params.aperture} · ${params.iso} · ${params.lighting}`;
}

export function shotMeta(shot: Shot) {
  const model = getModel(shot.model);
  const style = getStyle(shot.style);
  return {
    modelName: model?.name ?? "Product only",
    styleName: style?.name ?? shot.style,
  };
}
