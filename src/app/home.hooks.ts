import React, { useCallback, useContext, useEffect, useState } from 'react';
import { EmaContext } from '@/contexts/emaContext';
import {
  fetchEmaListFromApi,
  saveEmaListToCache,
  sortEma,
} from '@/lib/emaListHelpers';
import { FETCH_COUNT, MAX_FETCH_COUNT } from '@/lib/generateEma/constants';
import { resizeAndCompressImage } from '@/lib/imageHelpers';
import { Ema, EMA_DESIGNS, EmaDesignIds } from '@/types/ema';

const generateBase64Image = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) => {
  const canvas = canvasRef.current;
  if (!canvas) throw new Error('Canvas is not defined');
  const base64Image = canvas.toDataURL('image/png');
  return base64Image;
};

export const useForm = (
  addEma: (ema: Ema) => void,
  setSavedImage: React.Dispatch<React.SetStateAction<string | null>>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [kanji, setKanji] = useState('');
  const [mail, setMail] = useState('');
  const [designId, setDesignId] = useState<EmaDesignIds>(EMA_DESIGNS.STRIPES);
  const [loading, setLoading] = useState(false);

  // フォーム送信
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
        const base64 = generateBase64Image(canvasRef);
        const resizedBase64 = await resizeAndCompressImage(base64);

        const ema = {
          name,
          comment,
          base64: resizedBase64,
          timestamp: Date.now(),
          kanji,
          mail,
          designId,
        };

        const response = await fetch('/api/submit-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ema),
        });

        const result = await response.json();
        if (result.success) {
          setSavedImage(base64);
          addEma(ema); // 更新された絵馬一覧を取得
        } else {
          console.error('Failed to submit comment');
        }
      } catch (error) {
        console.error('Error submitting comment:', error);
      } finally {
        setLoading(false);
      }
    },
    [canvasRef, name, comment, kanji, mail, designId, setSavedImage, addEma],
  );

  return {
    name,
    comment,
    kanji,
    mail,
    designId,
    setName,
    setComment,
    setKanji,
    setMail,
    setDesignId,
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
    saveEmaListToCache(sortEma(uniqueList));
    return uniqueList;
  });
};

export const useEmaList = () => {
  const [loadingEmaList, setLoadingEmaList] = useState(true);
  const { emaList, setEmaList, addEma } = useContext(EmaContext);

  // 絵馬一覧を取得
  const fetchEmaList = useCallback(async () => {
    if (emaList.length >= MAX_FETCH_COUNT) {
      setLoadingEmaList(false);
      return;
    }
    const fetchedEmaList: Ema[] = await fetchEmaListFromApi(
      emaList.length,
      FETCH_COUNT,
    );
    if (fetchedEmaList.length === 0) return;
    createAndSetNewEmaList(fetchedEmaList, setEmaList);
  }, [emaList, setEmaList]);

  useEffect(() => {
    fetchEmaList();
  }, [emaList.length, fetchEmaList]);

  return {
    emaList,
    fetchEmaList,
    addEma,
    loadingEmaList,
  };
};
