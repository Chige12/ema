import { Ema } from '@/types/ema';

export const fetchEmaListFromApi = async (start: number, count: number) => {
  try {
    const response = await fetch(
      `/api/fetch-data?start=${start}&count=${count}`,
    );
    const data = await response.json();
    if (data.success) {
      return data.data || [];
    } else {
      console.error('Failed to fetch emaList');
      return [];
    }
  } catch (error) {
    console.error('Error fetching emaList:', error);
    return [];
  }
};

export const fetchEmaListFromCache = () => {
  if (!localStorage) return [];
  const cachedData = localStorage.getItem('emaList');
  if (cachedData && cachedData !== 'undefined') {
    return JSON.parse(cachedData);
  }
  return [];
};

export const saveEmaListToCache = (emaList: Ema[]) => {
  if (!localStorage) return;
  localStorage.setItem('emaList', JSON.stringify(emaList));
};
