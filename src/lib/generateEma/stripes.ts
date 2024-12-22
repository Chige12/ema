import {
  CENTER,
  DEFAULT_COMMENT,
  DEFAULT_KANJI,
  DEFAULT_NAME,
  INNER_SIZE,
  LEFT,
  RIGHT,
  TOP,
} from './constants';
import { hinaMincho, sawarabiMincho, ysabeauSC } from './fonts';

const CIRCLE_SIZE = 696;
const CIRCLE_RADIUS = CIRCLE_SIZE / 2;
const CIRCLE_TOP = CENTER - CIRCLE_RADIUS;

const clearCanvas = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const drawBackground = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
) => {
  ctx.fillStyle = '#C5392F';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

const drawImages = async (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  callback: () => void,
) => {
  try {
    const [stripesImg, circleImg] = await Promise.all([
      loadImage('./images/stripes/stripe.svg'),
      loadImage('./images/stripes/gradient_circle.svg'),
    ]);

    ctx.drawImage(stripesImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(circleImg, CIRCLE_TOP, CIRCLE_TOP, CIRCLE_SIZE, CIRCLE_SIZE);
    callback();
  } catch (error) {
    console.error('Failed to load images', error);
  }
};

const drawText = (
  ctx: CanvasRenderingContext2D,
  name: string,
  comment: string,
  kanji: string,
) => {
  ctx.fillStyle = 'white';

  const date = new Date();
  const currentDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const currentDay = date.toLocaleDateString('en-US', { weekday: 'long' });
  // Date and Day
  ctx.textAlign = 'left';
  ctx.font = `38px ${ysabeauSC.style.fontFamily.split(',')[0]}`;
  ctx.fillText(currentDate, LEFT, TOP + 70);
  ctx.fillText(currentDay, LEFT, TOP + 70 + 50);

  // Comment
  ctx.font = `38px ${hinaMincho.style.fontFamily.split(',')[0]}`;
  ctx.textAlign = 'right';
  wrapText(ctx, comment, RIGHT, 380, INNER_SIZE - 180, 58);

  // Kanji 1 word
  ctx.textAlign = 'left';
  ctx.font = `230px ${sawarabiMincho.style.fontFamily.split(',')[0]}`;
  ctx.fillText(kanji, LEFT, 785);

  // Name
  ctx.font = `38px ${hinaMincho.style.fontFamily.split(',')[0]}`;
  ctx.textAlign = 'center';
  ctx.save();
  ctx.translate(780, 920);
  ctx.rotate((-18.5 * Math.PI) / 180);
  ctx.fillText(name, 0, 0);
  ctx.restore();
};

const wrapText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) => {
  const lines = text.split('\n');
  const lineArray = [];

  for (let i = 0; i < lines.length; i++) {
    let line = '';
    const words = lines[i].split('');
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n];
      const testWidth = ctx.measureText(testLine).width;
      if (testWidth > maxWidth && line !== '') {
        lineArray.push(line);
        line = words[n];
      } else {
        line = testLine;
      }
    }
    lineArray.push(line);
  }

  for (let k = 0; k < lineArray.length; k++) {
    ctx.fillText(lineArray[k], x, y + k * lineHeight);
  }
};

const fillText = (
  name: string,
  comment: string,
  kanji: string,
): { fillName: string; fillComment: string, fillKanji: string } => {
  let fillName = name,
    fillComment = comment,
    fillKanji = kanji;
  if (!name) fillName = DEFAULT_NAME;
  if (!comment) fillComment = DEFAULT_COMMENT;
  if (!kanji) fillKanji = DEFAULT_KANJI;
  return { fillName, fillComment, fillKanji};
};

export const generateStripesEma = async (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  name: string,
  comment: string,
  kanji: string,
) => {
  const { fillName, fillComment, fillKanji } = fillText(name, comment, kanji);

  clearCanvas(ctx, canvas);
  drawBackground(ctx, canvas);
  drawImages(ctx, canvas, () => {
    drawText(ctx, fillName, fillComment, fillKanji);
  });
};
