import React from 'react';

type Props = {
  name: string;
  comment: string;
  setName: (name: string) => void;
  setComment: (comment: string) => void;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
};

const Form = ({
  name,
  comment,
  setName,
  setComment,
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
          氏名
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="お名前を入力してください"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700"
        >
          コメント
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="コメントを入力してください"
          required
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
