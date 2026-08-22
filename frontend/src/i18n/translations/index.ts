// frontend/src/i18n/translations/index.ts
import type { TranslationsMap } from './types';

import { commonTranslations } from './common';
import { navigationTranslations } from './navigation';
import { heroTranslations } from './hero';
import { aboutTranslations } from './about';
import { featuresTranslations } from './features';
import { roadmapTranslations } from './roadmap';
import { marketTranslations } from './market';
import { aiSupportTranslations } from './aiSupport';
import { paymentTranslations } from './payment';
import { pollTranslations } from './poll';
import { footerTranslations } from './footer';
import { miscTranslations } from './misc';

const mergeTranslations = (...maps: TranslationsMap[]): TranslationsMap => {
  const merged: TranslationsMap = {};

  maps.forEach((map) => {
    Object.entries(map).forEach(([key, value]) => {
      if (merged[key]) {
        console.warn(`[i18n] Duplicate translation key detected: ${key}`);
      }

      merged[key] = value;
    });
  });

  return merged;
};

export const translations: TranslationsMap = mergeTranslations(
  commonTranslations,
  navigationTranslations,
  heroTranslations,
  aboutTranslations,
  featuresTranslations,
  roadmapTranslations,
  marketTranslations,
  aiSupportTranslations,
  paymentTranslations,
  pollTranslations,
  footerTranslations,
  miscTranslations
);

export type { Language, Direction, TranslationItem, TranslationsMap } from './types';
