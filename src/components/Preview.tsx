import React, { RefObject, useEffect } from 'react';
import { generateStripesEma } from '@/lib/generateEma/stripes';

type Props = {
  name: string;
  comment: string;
  kanji: string;
  canvasRef: RefObject<HTMLCanvasElement | null>;
};

const Preview = ({ name, comment, kanji, canvasRef }: Props) => {

  const loadFontsAndGenerateImage = async () => {
    await document.fonts.ready;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    await generateStripesEma(canvas, ctx, name, comment, kanji);
  };

  useEffect(() => {
    loadFontsAndGenerateImage();
  }, [name, comment, kanji, canvasRef]);

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
