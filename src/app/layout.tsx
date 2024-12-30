import Head from 'next/head';
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
    <html lang="ja">
      <Head>
        <meta property="og:url" content="https://emaema.netlify.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content='デジタル絵馬を作ろう "ema"' />
        <meta
          property="og:description"
          content="願いをもっと簡単に、もっと身近に。いつもは宣言するのが恥ずかしいと思うような願いや夢。でも、大事な願いも秘めていては、忘れてしまう。だから今年こそは、自分に向き合って共有して、絶対に叶える1年にしませんか？ 2024.11.29 リリース"
        />
        <meta property="og:site_name" content='デジタル絵馬を作ろう "ema"' />
        <meta
          property="og:image"
          content="https://emaema.netlify.app/images/ogp.png"
        />
        <title>デジタル絵馬を作ろう &quot;ema&quot;</title>
        <meta
          name="description"
          content="願いをもっと簡単に、もっと身近に。いつもは宣言するのが恥ずかしいと思うような願いや夢。でも、大事な願いも秘めていては、忘れてしまう。だから今年こそは、自分に向き合って共有して、絶対に叶える1年にしませんか？ 2024.11.29 リリース"
        />
      </Head>
      <body className="bg-white">{children}</body>
    </html>
  );
}
