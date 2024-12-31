'use client';

import React from 'react';
import { Footer } from '@/components/Footer';
import { Form } from '@/components/Form';
import { Preview } from '@/components/Preview';
import { Results } from '@/components/Results';
import { Tabs } from '@/components/Tabs/Tabs';
import { useEmaList, useForm } from './home.hooks';

export default function Home() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const { addEma } = useEmaList();
  const [savedImage, setSavedImage] = React.useState<string | null>(null);
  const {
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
  } = useForm(addEma, setSavedImage, canvasRef);

  return (
    <div>
      <Tabs />
      <main className="min-h-screen bg-primary-200 bg-asanoha bg-repeat bg-[length:80px]">
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
            mail={mail}
            setName={setName}
            setComment={setComment}
            setKanji={setKanji}
            setMail={setMail}
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </div>
        <Results
          name={name}
          comment={comment}
          savedImage={savedImage}
          setSavedImage={setSavedImage}
        />
        <Footer />
      </main>
    </div>
  );
}
