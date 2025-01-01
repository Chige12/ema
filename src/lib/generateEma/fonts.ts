import { Hina_Mincho, Sawarabi_Mincho, Ysabeau_SC } from 'next/font/google';

export const hinaMincho = Hina_Mincho({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: "--font-hinaMincho",
});

export const sawarabiMincho = Sawarabi_Mincho({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: "--font-sawarabiMincho",
});

export const ysabeauSC = Ysabeau_SC({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: "--font-ysabeauSC",
});
