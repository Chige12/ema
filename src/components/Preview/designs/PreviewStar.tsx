import React from 'react';
import { RefObject } from 'react';
import { useDebounce } from 'react-use';
import { stick } from '@/lib/generateEma/fonts';
import {
  getFillTexts,
  generateEma,
} from '@/lib/generateEma/generateEma';
import { drawStarEma, drawStarText } from '@/lib/generateEma/designs/star';

type Props = {
  props: {
    name: string;
    comment: string;
    kanji: string;
    canvasRef: RefObject<HTMLCanvasElement | null>;
  };
};

const PreviewStar = ({ props }: Props) => {
  const { name, comment, kanji, canvasRef } = props;
  useDebounce(
    () => {
      const loadFontsAndGenerateImage = async () => {
        const { fillName, fillComment, fillKanji } = getFillTexts(
          name,
          comment,
          kanji,
        );
        generateEma(
          canvasRef,
          fillName,
          fillComment,
          fillKanji,
          drawStarText,
          drawStarEma,
        );
      };

      loadFontsAndGenerateImage();
    },
    500,
    [name, comment, kanji, canvasRef],
  );

  return (
    <div className="fixed pointer-events-none opacity-0">
      <small className={stick.variable}>{name}</small>
      <small className={stick.variable}>{comment}</small>
      <small className={stick.variable}>{kanji}</small>
    </div>
  );
};

const MemoizedPreviewStar = React.memo(PreviewStar);
export { MemoizedPreviewStar as PreviewStar };
