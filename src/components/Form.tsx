import React, { useState } from 'react';
import {
  DEFAULT_COMMENT,
  DEFAULT_KANJI,
  DEFAULT_NAME,
} from '@/lib/generateEma/constants';

type Props = {
  name: string;
  comment: string;
  kanji: string;
  mail: string;
  setName: (name: string) => void;
  setComment: (comment: string) => void;
  setKanji: (kanji: string) => void;
  setMail: (mail: string) => void;
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
  mail,
  setName,
  setComment,
  setKanji,
  setMail,
  loading,
  handleSubmit,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
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
        <div className="my-10 bg-primary-100 p-4 rounded-md border-2 border-primary-200">
          <label htmlFor="checkbox" className="block text-md text-primary-600">
            <div className="flex items-center justify-between">
              <span>夢を叶えるプロジェクトに応募する</span>
              <div
                className={`relative inline-block w-10 align-middle select-none rounded-full transition duration-200 ease-in ${
                  isChecked ? 'bg-primary-500' : 'bg-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={isChecked}
                  onChange={handleSwitchChange}
                  className={`absolute block w-6 h-6 bg-white rounded-full border-4 appearance-none cursor-pointer transition duration-200 ease-out ${
                    isChecked
                      ? 'translate-x-4 border-primary-500'
                      : 'border-gray-400'
                  }`}
                />
                <label
                  htmlFor="checkbox"
                  className={`block overflow-hidden h-6 rounded-full cursor-pointer  ${
                    isChecked ? 'bg-primary-500' : 'bg-gray-400'
                  }`}
                ></label>
              </div>
            </div>
          </label>
          <div className="flex items-center justify-around mt-4">
            <button
              type="button"
              className="p-1 text-primary-600 text-sm underline underline-offset-2"
              onClick={handleModalOpen}
            >
              夢を叶えるプロジェクトとは？
            </button>
          </div>
          {isChecked && (
            <div className="my-6">
              <label htmlFor="kanji" className={lavel_class}>
                リマインド用メールアドレス
              </label>
              <input
                type="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                className={input_class}
                placeholder="メールアドレス"
              />
            </div>
          )}
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
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleModalClose}
        >
          <div
            className="bg-white p-6 m-2 rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">夢を叶えるプロジェクト</h2>
            <p>
              記入いただいた夢の内容を6ヶ月後くらいにリマインドします。あなたの夢を応援します!
            </p>
            <button
              onClick={handleModalClose}
              className="mt-4 p-2 bg-primary-500 text-white rounded-md"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const MemoizedForm = React.memo(Form);
export { MemoizedForm as Form };
