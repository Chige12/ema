import { DEFAULT_COMMENT, DEFAULT_KANJI, DEFAULT_NAME } from './constants';

/**
 * base64画像を600x600にダウンサイズし、さらに画像圧縮して容量を減らす関数
 * @param {string} base64 - 入力のbase64画像
 * @param {number} [maxWidth=600] - リサイズ後の最大幅
 * @param {number} [maxHeight=600] - リサイズ後の最大高さ
 * @param {number} [quality=0.7] - 圧縮品質 (0から1の範囲)
 * @returns {Promise<string>} - 圧縮されたbase64画像
 */
export const resizeAndCompressImage = async (
  base64: string,
  maxWidth: number = 600,
  maxHeight: number = 600,
  quality: number = 0.7,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // アスペクト比を維持しながらリサイズ
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('Failed to get 2d context');
      ctx.drawImage(img, 0, 0, width, height);

      // 圧縮されたbase64画像を取得
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedBase64);
    };
    img.onerror = (error) => reject(error);
  });
};

export const prepareFontRendering = async (
  name: string,
  comment: string,
  kanji: string,
  drawText: (
    ctx: CanvasRenderingContext2D,
    name: string,
    comment: string,
    kanji: string,
  ) => void,
) => {
  await document.fonts.ready;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  drawText(ctx, name, comment, kanji);
};

export const getFillTexts = (
  name: string,
  comment: string,
  kanji: string,
): { fillName: string; fillComment: string; fillKanji: string } => {
  let fillName = name,
    fillComment = comment,
    fillKanji = kanji;
  if (!name) fillName = DEFAULT_NAME;
  if (!comment) fillComment = DEFAULT_COMMENT;
  if (!kanji) fillKanji = DEFAULT_KANJI;
  return { fillName, fillComment, fillKanji };
};
