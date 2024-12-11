'use client';

import React from 'react';
import { Form } from '@/components/Form';
import { useComments, useForm } from './home.hooks';

export default function Home() {
  const { fetchComments, comments } = useComments();
  const { name, setName, comment, setComment, loading, handleSubmit } =
    useForm(fetchComments);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          コメントフォーム
        </h1>
        <Form
          name={name}
          comment={comment}
          setName={setName}
          setComment={setComment}
          loading={loading}
          handleSubmit={handleSubmit}
        />
        {/* コメント一覧 */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">コメント一覧</h2>
        {comments.length > 0 ? (
          <ul className="space-y-4">
            {comments.map(
              (
                item: { name: string; comment: string; timestamp: number },
                index: number,
              ) => (
                <li key={index} className="p-4 border rounded-md bg-gray-50">
                  <p className="text-sm text-gray-600">
                    <strong>{item.name}</strong>さん
                  </p>
                  <p className="text-gray-800">{item.comment}</p>
                  <small className="text-xs text-gray-400">
                    {new Date(item.timestamp).toLocaleString()}
                  </small>
                </li>
              ),
            )}
          </ul>
        ) : (
          <p className="text-gray-600">コメントはまだありません。</p>
        )}
      </div>
    </main>
  );
}
