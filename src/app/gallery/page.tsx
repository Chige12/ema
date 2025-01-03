'use client';

import React from 'react';
import { EmaList } from '@/components/EmaList';
import { Footer } from '@/components/Footer';
import { Tabs } from '@/components/Tabs/Tabs';
import { useEmaList } from '../home.hooks';

export default function Gallery() {
  const { emaList, loadingEmaList } = useEmaList();

  return (
    <div>
      <Tabs />
      <main className="min-h-screen bg-primary-200 bg-asanoha bg-repeat bg-center bg-[length:80px]">
        <div className="max-w-3xl mx-auto p-6">
          {emaList.length > 0 && <EmaList emaList={emaList} />}
          {loadingEmaList && (
            <p className="my-8 text-primary-600 text-center">
              絵馬を読み込み中。
            </p>
          )}
        </div>
        <Footer />
      </main>
    </div>
  );
}
