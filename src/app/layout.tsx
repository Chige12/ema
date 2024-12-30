import Script from 'next/script';
import type { Metadata } from 'next';
import '@/styles/globals.css';

const TITLE = 'デジタル絵馬を作ろう "ema"';
const DESCRIPTION =
  '願いをもっと簡単に、もっと身近に。いつもは宣言するのが恥ずかしいと思うような願いや夢。でも、大事な願いも秘めていては、忘れてしまう。だから今年こそは、自分に向き合って共有して、絶対に叶える1年にしませんか？ 2024.11.29 リリース';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    url: 'https://emaema.netlify.app/',
    title: TITLE,
    description: DESCRIPTION,
    siteName: TITLE,
    images: [
      {
        url: 'https://emaema.netlify.app/images/ogb.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <Script src="//kitchen.juicer.cc/?color=651L14/n9aE=" async />
      <body className="bg-white">{children}</body>
    </html>
  );
}
