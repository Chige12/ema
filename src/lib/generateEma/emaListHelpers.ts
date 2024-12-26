import { Ema } from '@/types/ema';

export const fetchEmaListFromApi = async () => {
  try {
    const response = await fetch('/api/fetch-data');
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
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  return [];
};

export const saveEmaListToCache = (emaList: Ema[]) => {
  if (!localStorage) return;
  localStorage.setItem('emaList', JSON.stringify(emaList));
};
