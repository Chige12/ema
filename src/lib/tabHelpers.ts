export const TAB_NAME = <const>{
  HOME: 'home',
  GALLERY: 'gallery',
};

export type TabName = keyof typeof TAB_NAME;

export const TABS = [
  { name: TAB_NAME.HOME, title: '絵馬をつくる', url: '/' },
  { name: TAB_NAME.GALLERY, title: 'みんなの絵馬', url: '/gallery' },
];
