import Image from 'next/image';
import React from 'react';

type Props = {
  savedImage: string | null;
  setSavedImage: (image: string | null) => void;
};

const Results = ({ savedImage, setSavedImage }: Props) => {
  const saveImage = () => {
    if (!savedImage) return;
    const link = document.createElement('a');
    link.href = savedImage;
    link.download = 'ema.png';
    link.click();
  };

  const shareImage = async () => {
    const url = window.location.origin;
    if (navigator.share) {
      navigator.share({
        title: '願い事',
        text: 'あなたの願いが叶いますように ✧₊˚',
        url,
      });
    } else {
      // Web Share APIが使えないブラウザの処理
      await navigator.clipboard.writeText(url);
      alert('URLをコピーしました');
    }
  };

  return (
    <>
      {savedImage && (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-primary-100">
          <button
            onClick={() => setSavedImage(null)}
            className="fixed top-4 right-4 border-gray-300 rounded-full p-4 bg-primary-500"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <div className="max-w-3xl mx-auto p-6 text-center">
            <Image
              src={savedImage}
              alt="保存された絵馬"
              className="max-w-full h-auto rounded-lg shadow-md"
              layout="responsive"
              width={700}
              height={475}
            />
            <button type="button" onClick={saveImage}>
              画像を保存
            </button>
            <button type="button" onClick={shareImage}>
              シェア
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const MemoizedResults = React.memo(Results);
