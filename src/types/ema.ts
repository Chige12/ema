export const EMA_DESIGNS = {
  STRIPES: 'stripes',
} as const;

export type EmaDesignIds = (typeof EMA_DESIGNS)[keyof typeof EMA_DESIGNS];

export type Ema = {
  name: string;
  comment: string;
  kanji: string;
  timestamp: number;
  base64: string;
  mail: string;
  designId: EmaDesignIds;
};
