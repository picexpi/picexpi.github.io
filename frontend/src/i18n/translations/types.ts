// frontend/src/i18n/translations/types.ts

export type Language = 'en' | 'fa' | 'ar' | 'tr' | 'zh';
export type Direction = 'ltr' | 'rtl';

export type TranslationItem = {
  en: string;
  fa: string;
  ar: string;
  tr: string;
  zh: string;
};

export type TranslationsMap = Record<string, TranslationItem>;
