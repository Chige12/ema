import React from 'react';
import { Ema } from '@/types/ema';

type Props = {
  emaList: Ema[];
};

const EmaList = ({ emaList }: Props) => {
  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4">コメント一覧</h2>
      {emaList.length > 0 ? (
        <ul className="space-y-4">
          {emaList.map((item: Ema, index: number) => (
            <li key={index} className="p-4 border rounded-md bg-gray-50">
              <p className="text-sm text-gray-600">
                <strong>{item.name}</strong>さん
              </p>
              <p className="text-gray-800">{item.comment}</p>
              <small className="text-xs text-gray-400">
                {new Date(item.timestamp).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">コメントはまだありません。</p>
      )}
    </>
  );
};

const MemoizedEmaList = React.memo(EmaList);
export { MemoizedEmaList as EmaList };
