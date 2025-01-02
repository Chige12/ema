import React, { RefObject } from 'react';
import { PreviewStripes } from './PreviewStripes/PreviewStripes';

type Props = {
  name: string;
  comment: string;
  kanji: string;
  designId: string;
  canvasRef: RefObject<HTMLCanvasElement | null>;
};

const Preview = ({ name, comment, kanji, designId, canvasRef }: Props) => {
  const renderPreview = () => {
    const props = { name, comment, kanji, canvasRef };
    switch (designId) {
      case 'stripes':
        return <PreviewStripes props={props} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center mx-16">
      {renderPreview()}
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
