import React, { useCallback, useEffect, useState } from 'react';
import { FETCH_COUNT, MAX_FETCH_COUNT } from '@/lib/generateEma/constants';
import {
  fetchEmaListFromApi,
  fetchEmaListFromCache,
  saveEmaListToCache,
} from '@/lib/generateEma/emaListHelpers';
import { resizeAndCompressImage } from '@/lib/generateEma/imageHelpers';
import { Ema } from '@/types/ema';

const generateBase64Image = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) => {
  const canvas = canvasRef.current;
  if (!canvas) throw new Error('Canvas is not defined');
  const base64Image = canvas.toDataURL('image/png');
  return base64Image;
};

export const useForm = (
  fetchEmaList: () => void,
  setSavedImage: React.Dispatch<React.SetStateAction<string | null>>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [kanji, setKanji] = useState('');
  const [mail, setMail] = useState('');
  const [loading, setLoading] = useState(false);

  // フォーム送信
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
        const base64 = generateBase64Image(canvasRef);
        const resizedBase64 = await resizeAndCompressImage(base64);

        const response = await fetch('/api/submit-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            comment,
            base64: resizedBase64,
            kanji,
            mail,
          }),
        });

        const result = await response.json();
        if (result.success) {
          setSavedImage(base64);
          setName('');
          setComment('');
          setKanji('');
          setMail('');
          fetchEmaList(); // 更新された絵馬一覧を取得
        } else {
          console.error('Failed to submit comment');
        }
      } catch (error) {
        console.error('Error submitting comment:', error);
      } finally {
        setLoading(false);
      }
    },
    [name, comment, kanji, mail, canvasRef, fetchEmaList, setSavedImage],
  );
  return {
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
  };
};

const createAndSetNewEmaList = (
  fetchedEmaList: Ema[],
  setEmaList: React.Dispatch<React.SetStateAction<Ema[]>>,
) => {
  setEmaList((prev: Ema[]) => {
    const newList = [...prev, ...fetchedEmaList];
    const uniqueList = Array.from(
      new Set(newList.map((ema) => ema.timestamp)),
    ).flatMap(
      (timestamp) => newList.find((ema) => ema.timestamp === timestamp) || [],
    );
    uniqueList.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
    saveEmaListToCache(uniqueList);
    return uniqueList;
  });
};

export const useEmaList = () => {
  const [emaList, setEmaList] = useState<Ema[]>([]);
  const [loadingEmaList, setLoadingEmaList] = useState(true);

  // 絵馬一覧を取得
  const fetchEmaList = useCallback(async () => {
    const cachedData = fetchEmaListFromCache();
    if (cachedData.length > 0) {
      setEmaList(cachedData);
      setLoadingEmaList(false);
    }

    let loadedCount = cachedData.length;
    if (loadedCount >= MAX_FETCH_COUNT) {
      setLoadingEmaList(false);
      return;
    }

    for (let i = 0; i < MAX_FETCH_COUNT; i += FETCH_COUNT) {
      if (loadedCount >= MAX_FETCH_COUNT) break;
      const fetchedEmaList: Ema[] = await fetchEmaListFromApi(i, FETCH_COUNT);
      loadedCount += FETCH_COUNT;
      if (fetchedEmaList.length === 0) break;
      createAndSetNewEmaList(fetchedEmaList, setEmaList);
    }

    setLoadingEmaList(false);
  }, []);

  useEffect(() => {
    fetchEmaList();
  }, [emaList.length, fetchEmaList]);

  return {
    emaList,
    fetchEmaList,
    loadingEmaList,
  };
};
