import { hinaMincho, sawarabiMincho, ysabeauSC } from '@/lib/generateEma/fonts';
import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: '絵馬 2024',
  description: '絵馬を書いて、願いをかなえよう',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${hinaMincho.className} ${sawarabiMincho.className} ${ysabeauSC.className}`}>
      <body>{children}</body>
    </html>
  );
}
