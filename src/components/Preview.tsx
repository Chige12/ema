import React, { useEffect } from 'react';

type Props = {
  name: string;
  comment: string;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

const Preview = ({ name, comment, canvasRef }: Props) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1080x1080の背景白の正方形の画像を生成
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // nameとcommentの赤色のテキストを描画
    ctx.fillStyle = 'red';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name, canvas.width / 2, canvas.height / 3);
    ctx.fillText(comment, canvas.width / 2, (canvas.height / 3) * 2);
  }, [name, comment, canvasRef]);

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
