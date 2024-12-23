import React, { RefObject } from 'react';
import { useDebounce } from 'react-use';
import {
  generateStripesEma,
  getFillTexts,
  prepareFontRendering,
} from '@/lib/generateEma/stripes';

type Props = {
  name: string;
  comment: string;
  kanji: string;
  canvasRef: RefObject<HTMLCanvasElement | null>;
};

const Preview = ({ name, comment, kanji, canvasRef }: Props) => {
  useDebounce(
    () => {
      const loadFontsAndGenerateImage = async () => {
        const { fillName, fillComment, fillKanji } = getFillTexts(
          name,
          comment,
          kanji,
        );
        await prepareFontRendering(fillName, fillComment, fillKanji);
        await new Promise((resolve) => setTimeout(resolve, 100));
        await document.fonts.ready;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        await generateStripesEma(canvas, ctx, fillName, fillComment, fillKanji);
      };

      loadFontsAndGenerateImage();
    },
    500,
    [name, comment, kanji, canvasRef],
  );

  return (
    <div className="flex justify-center items-center mx-18">
      <canvas
        ref={canvasRef}
        id="canvas"
        width="1080"
        height="1080"
        className="max-w-full h-auto"
      ></canvas>
    </div>
  );
};

const MemoizedPreview = React.memo(Preview);
export { MemoizedPreview as Preview };
