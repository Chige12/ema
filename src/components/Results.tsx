import React, { useCallback } from 'react';

type Props = {
  name: string;
  comment: string;
  savedImage: string | null;
  setSavedImage: (image: string | null) => void;
};

const copyLink = async () => {
  try {
    const url = window.location.origin;
    if (!navigator.clipboard) {
      throw new Error('Clipboard API is not supported');
    }
    await navigator.clipboard.writeText(url);
    alert('URLをコピーしました');
  } catch (err) {
    console.error(err);
    alert('URLをコピーできませんでした');
  }
}

const createShareFile = (savedImage: string): File => {
  const base64Data = savedImage.replace(
    /^data:image\/(png|jpeg);base64,/,
    '',
  );
  const blob = new Blob(
    [Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0))],
    { type: 'image/png' },
  );
  const file = new File([blob], 'ema.png', { type: 'image/png' });
  return file;
};

const genComment = (comment: string) => `
${comment}
#ema_2025 #2025年の抱負 #100個の夢を叶えようプロジェクト
あなたの願いは？🎍
`

const shareChallenge1 = async (file: File, comment: string) => {
  const data = {
    files: [file],
    title: '絵馬を作成しました',
    text: genComment(comment),
    url: window.location.origin,
  };
  await navigator.share(data);
};

const shareChallenge2 = async (comment: string) => {
  const data = {
    title: '絵馬を作成しました',
    text: genComment(comment),
    url: window.location.origin,
  };
  await navigator.share(data);
};

const showError = (err: unknown) => {
  const error = err instanceof Error ? `${err.name}, ${err.message}` : err;
  console.error(error);
};

const Results = ({ name, comment, savedImage, setSavedImage }: Props) => {
  const saveImage = useCallback(() => {
    if (!savedImage) return;
    const today = new Date().toLocaleDateString('ja-JP');
    const link = document.createElement('a');
    link.href = savedImage;
    link.download = `${today}_${name}.png`;
    link.click();
  }, [name, savedImage]);

  const shareImage = useCallback(async () => {
    if (!savedImage || !navigator.canShare) {
      console.log(`navigator.canShare: ${navigator.canShare}`);
      copyLink();
      return;
    }

    const file = createShareFile(savedImage);

    await shareChallenge1(file, comment).catch(async () => {
      await shareChallenge2(comment).catch((err) => {
        showError(err);
        copyLink();
      });
    });
  }, [comment, savedImage]);

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
              <img
                src={savedImage}
                alt="保存された絵馬"
                className="my-16 max-w-full h-auto rounded-lg shadow-md"
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
                  window.location.href = '/gallery';
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
