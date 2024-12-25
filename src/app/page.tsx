'use client';

import React from 'react';
import { EmaList } from '@/components/EmaList';
import { Form } from '@/components/Form';
import { Preview } from '@/components/Preview';
import { Results } from '@/components/Results';
import { Tabs } from '@/components/Tabs/Tabs';
import { useEmaList, useForm, useTabs } from './home.hooks';

export default function Home() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const { activeIndex, setActiveIndex, changeTab } = useTabs();
  const { fetchEmaList, emaList, loadingEmaList } = useEmaList();
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
    <Tabs activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
      <Tabs.Panel hash="" title="絵馬を作る">
        <main className="min-h-screen bg-primary-200 bg-asanoha bg-repeat bg-center bg-[length:80px]">
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
          </div>
          <Results
            name={name}
            savedImage={savedImage}
            setSavedImage={setSavedImage}
            changeTab={changeTab}
          />
        </main>
      </Tabs.Panel>
      <Tabs.Panel hash="#gallery" title="みんなの絵馬">
        <main className="min-h-screen bg-primary-200 bg-asanoha bg-repeat bg-center bg-[length:80px]">
          <div className="max-w-3xl mx-auto p-6">
            {loadingEmaList ? (
              <p className="text-primary-600 text-center">絵馬を読み込み中。</p>
            ) : (
              <EmaList emaList={emaList} />
            )}
          </div>
        </main>
      </Tabs.Panel>
    </Tabs>
  );
}
