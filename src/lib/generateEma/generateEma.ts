import { RefObject } from 'react';
import { DEFAULT_COMMENT, DEFAULT_KANJI, DEFAULT_NAME } from './constants';

export const prepareFontRendering = async (
  name: string,
  comment: string,
  kanji: string,
  size: number,
  drawText: (
    ctx: CanvasRenderingContext2D,
    name: string,
    comment: string,
    kanji: string,
  ) => void,
) => {
  await document.fonts.ready;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  drawText(ctx, name, comment, kanji);
};

export const getFillTexts = (
  name: string,
  comment: string,
  kanji: string,
): { fillName: string; fillComment: string; fillKanji: string } => {
  let fillName = name,
    fillComment = comment,
    fillKanji = kanji;
  if (!name) fillName = DEFAULT_NAME;
  if (!comment) fillComment = DEFAULT_COMMENT;
  if (!kanji) fillKanji = DEFAULT_KANJI;
  return { fillName, fillComment, fillKanji };
};

const clearCanvas = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export const generateEma = async (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  name: string,
  comment: string,
  kanji: string,
  drawText: (
    ctx: CanvasRenderingContext2D,
    name: string,
    comment: string,
    kanji: string,
  ) => void,
  drawEma: (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    name: string,
    comment: string,
    kanji: string,
  ) => void,
) => {
  await prepareFontRendering(name, comment, kanji, 1080, drawText);
  await new Promise((resolve) => setTimeout(resolve, 100));
  await document.fonts.ready;
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  clearCanvas(ctx, canvas);
  drawEma(canvas, ctx, name, comment, kanji);
};
