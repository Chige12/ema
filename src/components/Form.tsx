import { DEFAULT_COMMENT, DEFAULT_KANJI, DEFAULT_NAME } from '@/lib/generateEma/constants';
import React from 'react';

type Props = {
  name: string;
  comment: string;
  kanji: string;
  setName: (name: string) => void;
  setComment: (comment: string) => void;
  setKanji: (kanji: string) => void
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
};

const Form = ({
  name,
  comment,
  kanji,
  setName,
  setComment,
  setKanji,
  loading,
  handleSubmit,
}: Props) => {
  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          なまえ *
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder={DEFAULT_NAME}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700"
        >
          ねがいごと *
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder={DEFAULT_COMMENT}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="kanji"
          className="block text-sm font-medium text-gray-700"
        >
          2025年 わたしの漢字（1文字）
        </label>
        <input
          id="kanji"
          value={kanji}
          onChange={(e) => setKanji(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder={DEFAULT_KANJI}
        />
      </div>
      <button
        type="submit"
        className={`w-full p-2 text-white rounded-md ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
        disabled={loading}
      >
        {loading ? '送信中...' : 'コメントを送信'}
      </button>
    </form>
  );
};

const MemoizedForm = React.memo(Form);
export { MemoizedForm as Form };
