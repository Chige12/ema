import React, { RefObject } from 'react';
import { useDebounce } from 'react-use';
import { hinaMincho, ysabeauSC } from '@/lib/generateEma/fonts';
import { getFillTexts } from '@/lib/generateEma/imageHelpers';
import { generateStripesEma } from '@/lib/generateEma/stripes';

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
        generateStripesEma(canvasRef, fillName, fillComment, fillKanji);
      };

      loadFontsAndGenerateImage();
    },
    500,
    [name, comment, kanji, canvasRef],
  );

  return (
    <div className="flex justify-center items-center mx-16">
      <div className="fixed pointer-events-none opacity-0">
        <small className={hinaMincho.variable}>{name}</small>
        <small className={hinaMincho.variable}>{comment}</small>
        <small className={ysabeauSC.variable}>{kanji}</small>
      </div>
      <canvas
        ref={canvasRef}
        id="canvas"
        width="1080"
        height="1080"
        className="max-w-full h-auto rounded-md shadow-md bg-primary-300"
      ></canvas>
    </div>
  );
};

const MemoizedPreview = React.memo(Preview);
export { MemoizedPreview as Preview };
