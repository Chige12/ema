import Image from 'next/image';
import React from 'react';

type Props = {
  name: string;
  savedImage: string | null;
  setSavedImage: (image: string | null) => void;
};

const Results = ({ name, savedImage, setSavedImage }: Props) => {
  const saveImage = () => {
    if (!savedImage) return;
    const today = new Date().toLocaleDateString('ja-JP');
    const link = document.createElement('a');
    link.href = savedImage;
    link.download = `${today}_${name}.png`;
    link.click();
  };

  const shareImage = async () => {
    const url = window.location.origin;
    if (navigator.share) {
      try {
        navigator.share({
          title: '絵馬を作成しました',
          text: 'あなたも作ってみませんか？',
          url,
        });
      } catch {
        await navigator.clipboard.writeText(url);
      }
    } else {
      // Web Share APIが使えないブラウザの処理
      await navigator.clipboard.writeText(url);
      alert('URLをコピーしました');
    }
  };

  return (
    <>
      {savedImage && (
        <div className="max-h-screen overflow-auto fixed top-0 left-0 w-full h-full z-50 bg-primary-100 overscroll-contain">
          <div
            className="bg-transparent w-full h-full"
            style={{ height: 'calc(100vh + 1px)' }}
          >
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="max-w-3xl mx-auto p-6 text-center">
              <p className="my-16 font-bold text-primary-500">
                あなたの願いが叶いますように ✧₊˚
              </p>
              <Image
                src={savedImage}
                alt="保存された絵馬"
                className="my-16 max-w-full h-auto rounded-lg shadow-md"
                layout="responsive"
                width={700}
                height={475}
              />
              <button
                type="button"
                className="w-full p-3 m-1 rounded-full transition-all border-4 border-primary-500 bg-white text-primary-500 active:bg-primary-500 active:text-white"
                onClick={saveImage}
              >
                画像を保存
              </button>
              <button
                type="button"
                className="w-full p-3 m-1 rounded-full transition-all border-4 border-primary-500 bg-white text-primary-500 active:bg-primary-500 active:text-white"
                onClick={shareImage}
              >
                シェア
              </button>
              <button
                type="button"
                className="w-full p-3 m-1 rounded-full transition-all bg-primary-500 text-white active:filter active:brightness-110"
                onClick={() => {
                  setSavedImage(null);
                  window.location.href = '#gallery';
                }}
              >
                みんなの絵馬を見る
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const MemoizedResults = React.memo(Results);
export { MemoizedResults as Results };
