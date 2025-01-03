import React from 'react';
import { RefObject } from 'react';
import { useDebounce } from 'react-use';
import {
  drawStripesEma,
  drawStripesText,
} from '@/lib/generateEma/designs/stripes';
import { hinaMincho, ysabeauSC } from '@/lib/generateEma/fonts';
import { getFillTexts, generateEma } from '@/lib/generateEma/generateEma';

type Props = {
  props: {
    name: string;
    comment: string;
    kanji: string;
    canvasRef: RefObject<HTMLCanvasElement | null>;
  };
};

const PreviewStripes = ({ props }: Props) => {
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
          drawStripesText,
          drawStripesEma,
        );
      };

      loadFontsAndGenerateImage();
    },
    500,
    [name, comment, kanji, canvasRef],
  );

  return (
    <div className="fixed pointer-events-none opacity-0">
      <small className={hinaMincho.variable}>{name}</small>
      <small className={hinaMincho.variable}>{comment}</small>
      <small className={ysabeauSC.variable}>{kanji}</small>
    </div>
  );
};

const MemoizedPreviewStripes = React.memo(PreviewStripes);
export { MemoizedPreviewStripes as PreviewStripes };
