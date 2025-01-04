import { BOTTOM, LEFT, RIGHT, TOP } from '../constants';
import { stick } from '../fonts';

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
    const [BalloonImg] = await Promise.all([
      loadImage('./images/Balloon/balloon.svg'),
    ]);

    ctx.drawImage(BalloonImg, 183, 192, 697, 821);
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

export const drawBalloonText = (
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
  const fontName = stick.style.fontFamily.split(',')[0];
  // Date and Day
  ctx.fillStyle = 'white';
  ctx.textAlign = 'right';
  ctx.font = `26px ${fontName}`;
  ctx.fillText(currentDate, RIGHT - 59, BOTTOM - 73 - 30);
  ctx.fillText(currentDay, RIGHT - 59, BOTTOM - 37 - 30);

  // Comment
  ctx.fillStyle = '#C5392F';
  ctx.font = `29px ${fontName}`;
  ctx.textAlign = 'right';
  wrapText(ctx, comment, RIGHT - 236, TOP + 520, 562, 42);

  // Kanji 1 word
  ctx.textAlign = 'right';
  ctx.font = `200px ${fontName}`;
  ctx.fillText(kanji, RIGHT - 178, TOP + 440);

  // Name
  ctx.font = `40px ${fontName}`;
  ctx.textAlign = 'left';
  ctx.save();
  ctx.fillText(name, LEFT + 254, BOTTOM - 260);
  ctx.restore();
};

export const drawBalloonEma = async (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  name: string,
  comment: string,
  kanji: string,
) => {
  drawBackground(ctx, canvas);
  await drawImages(ctx, canvas, () => {
    drawBalloonText(ctx, name, comment, kanji);
  });
};
