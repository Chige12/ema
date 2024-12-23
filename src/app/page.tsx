'use client';

import React from 'react';
import { EmaList } from '@/components/EmaList';
import { Form } from '@/components/Form';
import { Preview } from '@/components/Preview';
import { MemoizedResults } from '@/components/Results';
import { useEmaList, useForm } from './home.hooks';

export default function Home() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const { fetchEmaList, emaList } = useEmaList();
  const [savedImage, setSavedImage] = React.useState<string | null>(null);
  const {
    name,
    comment,
    kanji,
    setName,
    setComment,
    setKanji,
    loading,
    handleSubmit,
  } = useForm(fetchEmaList, setSavedImage, canvasRef);

  return (
    <main className="min-h-scree bg-primary-200 bg-asanoha bg-repeat bg-center bg-[length:80px]">
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-sm font-bold text-primary-600 mb-4 text-center">
          デザインを選ぶ
        </h2>
        <Preview
          name={name}
          comment={comment}
          kanji={kanji}
          canvasRef={canvasRef}
        />
        <Form
          name={name}
          comment={comment}
          kanji={kanji}
          setName={setName}
          setComment={setComment}
          setKanji={setKanji}
          loading={loading}
          handleSubmit={handleSubmit}
        />
        {/* コメント一覧 */}
        <EmaList emaList={emaList} />
      </div>
      <MemoizedResults savedImage={savedImage} setSavedImage={setSavedImage} />
    </main>
  );
}
