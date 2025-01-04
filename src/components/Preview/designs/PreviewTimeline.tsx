import React from 'react';
import { RefObject } from 'react';
import { useDebounce } from 'react-use';
import { stick } from '@/lib/generateEma/fonts';
import {
  getFillTexts,
  generateEma,
} from '@/lib/generateEma/generateEma';
import { drawTimelineEma, drawTimelineText } from '@/lib/generateEma/designs/timeline';

type Props = {
  props: {
    name: string;
    comment: string;
    kanji: string;
    canvasRef: RefObject<HTMLCanvasElement | null>;
  };
};

const PreviewTimeline = ({ props }: Props) => {
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
          drawTimelineText,
          drawTimelineEma,
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

const MemoizedPreviewTimeline = React.memo(PreviewTimeline);
export { MemoizedPreviewTimeline as PreviewTimeline };
