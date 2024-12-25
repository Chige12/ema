import React, { useState } from 'react';
import { Ema } from '@/types/ema';

type Props = {
  emaList: Ema[];
};

const EmaList = ({ emaList }: Props) => {
  const [selectedEma, setSelectedEma] = useState<Ema | null>(null);

  const handleImageClick = (ema: Ema) => {
    setSelectedEma(ema);
  };

  const handleCloseModal = () => {
    setSelectedEma(null);
  };

  return (
    <>
      <h2 className="text-sm font-bold text-primary-600 mb-4 text-center">
        みんなの絵馬
      </h2>
      {emaList.length > 0 ? (
        <ul className="grid grid-cols-2 gap-x-2 gap-y-4">
          {emaList.map((item: Ema, index: number) => (
            <li key={index} className="rounded-md">
              <img
                src={item.base64}
                alt={`${item.name}さんの絵馬：${item.comment} ${new Date(item.timestamp).toLocaleString()}`}
                className="h-auto rounded-md shadow-md cursor-pointer"
                onClick={() => handleImageClick(item)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-center">
          絵馬が見つかりませんでした。🙏
        </p>
      )}

      {selectedEma && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-4 m-1 rounded-md shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={handleCloseModal}
            >
              ✖️
            </button>
            <img
              src={selectedEma.base64}
              alt={`${selectedEma.name}さんの絵馬：${selectedEma.comment} ${new Date(selectedEma.timestamp).toLocaleString()}`}
              className="h-auto rounded-md shadow-md mb-4"
            />
            <p className="my-2 text-center text-sm">{selectedEma.name}さん</p>
            <p className="my-2 text-center text-gray-500 whitespace-pre-wrap">
              {selectedEma.comment}
            </p>
            <p className="my-2 text-center text-gray-500">
              {new Date(selectedEma.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

const MemoizedEmaList = React.memo(EmaList);
export { MemoizedEmaList as EmaList };
