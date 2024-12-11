'use client';

import React from 'react';
import { EmaList } from '@/components/EmaList';
import { Form } from '@/components/Form';
import { useEmaList, useForm } from './home.hooks';

export default function Home() {
  const { fetchEmaList, emaList } = useEmaList();
  const { name, setName, comment, setComment, loading, handleSubmit } =
    useForm(fetchEmaList);

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
        <EmaList emaList={emaList} />
      </div>
    </main>
  );
}
