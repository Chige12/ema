import React, { RefObject } from 'react';
import { EMA_DESIGNS, EmaDesignIds } from '@/types/ema';
import { PreviewStripes } from './PreviewStripes/PreviewStripes';
import { DIRECTION, Switcher } from './Switcher/Switcher';

type Props = {
  name: string;
  comment: string;
  kanji: string;
  designId: EmaDesignIds;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  setDesignId: (designId: EmaDesignIds) => void;
};

const Preview = ({ name, comment, kanji, designId, canvasRef }: Props) => {
  const renderPreview = () => {
    const props = { name, comment, kanji, canvasRef };
    switch (designId) {
      case EMA_DESIGNS.STRIPES:
        return <PreviewStripes props={props} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex justify-center items-center px-16">
      {renderPreview()}
      <canvas
        ref={canvasRef}
        id="canvas"
        width="1080"
        height="1080"
        className="max-w-full h-auto rounded-md shadow-md bg-primary-300"
      ></canvas>
      <Switcher
        onClick={() => console.log('switch')}
        direction={DIRECTION.LEFT}
      />
      <Switcher
        onClick={() => console.log('switch')}
        direction={DIRECTION.RIGHT}
      />
    </div>
  );
};

const MemoizedPreview = React.memo(Preview);
export { MemoizedPreview as Preview };
