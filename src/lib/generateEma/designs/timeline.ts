import { BOTTOM, CENTER, INNER_SIZE, LEFT, RIGHT, TOP } from '../constants';
import { DelaGothicOne } from '../fonts';

const CIRCLE_SIZE = 696;
const CIRCLE_RADIUS = CIRCLE_SIZE / 2;
const CIRCLE_TOP = CENTER - CIRCLE_RADIUS;

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
    const [timelineImg] = await Promise.all([
      loadImage('./images/timeline/timeline.svg'),
    ]);

    ctx.drawImage(timelineImg, 0, 0, canvas.width, canvas.height);
    callback();
  } catch (error) {
    console.error('Failed to load images', error);
  }
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

export const drawTimelineText = (
  ctx: CanvasRenderingContext2D,
  name: string,
  comment: string,
  kanji: string,
) => {
  const date = new Date();
  const currentDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const currentDay = date.toLocaleDateString('en-US', { weekday: 'long' });
  const fontName = DelaGothicOne.style.fontFamily.split(',')[0]
  // Date and Day
  ctx.fillStyle = '#C5392F';
  ctx.textAlign = 'center';
  ctx.font = `36px ${fontName}`;
  ctx.fillText(currentDate, RIGHT - 156, BOTTOM - 74 + 64, 432);
  ctx.fillText(currentDay, RIGHT - 156, BOTTOM - 37 + 64, 432);

  // Comment
  ctx.font = `30px ${fontName}`;
  ctx.textAlign = 'right';
  wrapText(ctx, comment, RIGHT, TOP + 120, INNER_SIZE, 43);

  // Kanji 1 word
  ctx.fillStyle = 'white';
  ctx.textAlign = 'left';
  ctx.font = `190px ${fontName}`;
  ctx.fillText(kanji, LEFT + 100, TOP + 810);

  // Name
  ctx.fillStyle = '#C5392F';
  ctx.font = `40px ${fontName}`;
  ctx.textAlign = 'left';
  ctx.save();
  ctx.fillText(name, LEFT, TOP + 385);
  ctx.restore();
};

export const drawTimelineEma = async (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  name: string,
  comment: string,
  kanji: string,
) => {
  drawBackground(ctx, canvas);
  await drawImages(ctx, canvas, () => {
    drawTimelineText(ctx, name, comment, kanji);
  });
};
