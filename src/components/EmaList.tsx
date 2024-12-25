import React from 'react';
import { Ema } from '@/types/ema';

type Props = {
  emaList: Ema[];
};

const EmaList = ({ emaList }: Props) => {
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
    </>
  );
};

const MemoizedEmaList = React.memo(EmaList);
export { MemoizedEmaList as EmaList };
