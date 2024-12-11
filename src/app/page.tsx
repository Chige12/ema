'use client';

import React, { useEffect, useState } from 'react';

export default function Home() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  // コメント一覧を取得
  const fetchComments = async () => {
    try {
      const response = await fetch('/api/fetch-data');
      const data = await response.json();
      if (data.success) {
        setComments(data.data || []);
      } else {
        console.error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // フォーム送信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, comment }),
      });

      const result = await response.json();
      if (result.success) {
        setName('');
        setComment('');
        fetchComments(); // 更新されたコメント一覧を取得
      } else {
        console.error('Failed to submit comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">コメントフォーム</h1>

        {/* フォーム */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
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
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={loading}
          >
            {loading ? '送信中...' : 'コメントを送信'}
          </button>
        </form>

        {/* コメント一覧 */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">コメント一覧</h2>
        {comments.length > 0 ? (
          <ul className="space-y-4">
            {comments.map((item: { name: string; comment: string, timestamp: number }, index: number) => (
              <li key={index} className="p-4 border rounded-md bg-gray-50">
                <p className="text-sm text-gray-600">
                  <strong>{item.name}</strong>さん
                </p>
                <p className="text-gray-800">{item.comment}</p>
                <small
                  className="text-xs text-gray-400"
                >
                  {new Date(item.timestamp).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">コメントはまだありません。</p>
        )}
      </div>
    </main>
  );
}
