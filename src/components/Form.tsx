import React from 'react';
import {
  DEFAULT_COMMENT,
  DEFAULT_KANJI,
  DEFAULT_NAME,
} from '@/lib/generateEma/constants';

type Props = {
  name: string;
  comment: string;
  kanji: string;
  setName: (name: string) => void;
  setComment: (comment: string) => void;
  setKanji: (kanji: string) => void;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
};

const lavel_class = 'block text-sm font-bold text-primary-600';
const input_class =
  'mt-1 p-3 rounded-md w-full text-primary-600 focus:outline-primary-600 placeholder:text-primary-300';

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
    <form onSubmit={handleSubmit} className="my-8">
      <div className="mb-6">
        <label htmlFor="name" className={lavel_class}>
          なまえ *
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={input_class}
          placeholder={DEFAULT_NAME}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="comment" className={lavel_class}>
          ねがいごと *
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={input_class}
          placeholder={DEFAULT_COMMENT}
          rows={4}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="kanji" className={lavel_class}>
          2025年 わたしの漢字（1文字）
        </label>
        <input
          id="kanji"
          value={kanji}
          onChange={(e) => setKanji(e.target.value)}
          className={input_class}
          placeholder={DEFAULT_KANJI}
        />
      </div>
      <button
        type="submit"
        className={`w-full p-4 text-white rounded-full transition-all ${
          loading
            ? 'bg-primary-600 cursor-not-allowed'
            : 'bg-primary-500 filter hover:brightness-110'
        }`}
        disabled={loading}
      >
        {loading ? '登録中...' : '絵馬を掛ける'}
      </button>
    </form>
  );
};

const MemoizedForm = React.memo(Form);
export { MemoizedForm as Form };
