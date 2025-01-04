import { BungeeHairline, hinaMincho } from '../fonts';

// stylized constants
export const PADDING = 186;
export const CANVAS_SIZE = 1080;
export const TOP = PADDING;
export const LEFT = PADDING;
export const RIGHT = CANVAS_SIZE - PADDING;
export const BOTTOM = CANVAS_SIZE - PADDING;
export const CENTER = CANVAS_SIZE / 2;
export const INNER_SIZE = CANVAS_SIZE - PADDING * 2;

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
    const [starImg] = await Promise.all([loadImage('./images/star/star.png')]);

    ctx.drawImage(starImg, 0, 0, canvas.width, canvas.height);
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

export const drawStarText = (
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
  const fontName = hinaMincho.style.fontFamily.split(',')[0];
  // Date and Day

  ctx.textAlign = 'right';
  ctx.font = `30px ${BungeeHairline.style.fontFamily.split(',')[0]}`;
  ctx.fillText(currentDate, CANVAS_SIZE, CANVAS_SIZE - 37 - 4);
  ctx.fillText(currentDay, CANVAS_SIZE, CANVAS_SIZE - 4);

  // Comment
  ctx.font = `30px ${fontName}`;
  ctx.textAlign = 'left';
  wrapText(ctx, comment, LEFT, TOP + 610, INNER_SIZE, 43);

  // Kanji 1 word
  ctx.textAlign = 'right';
  ctx.font = `260px ${fontName}`;
  ctx.fillText(kanji, RIGHT, TOP + 300);

  // Name
  ctx.font = `40px ${fontName}`;
  ctx.textAlign = 'left';
  ctx.save();
  ctx.fillText(name, LEFT, TOP + 520);
  ctx.restore();
};

export const drawStarEma = async (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  name: string,
  comment: string,
  kanji: string,
) => {
  drawBackground(ctx, canvas);
  await drawImages(ctx, canvas, () => {
    drawStarText(ctx, name, comment, kanji);
  });
};
