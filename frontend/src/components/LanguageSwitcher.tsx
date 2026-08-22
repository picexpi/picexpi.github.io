// frontend/src/components/LanguageSwitcher.tsx
import React from 'react';
import { useI18n, Language } from '../i18n/I18nContext';

type LanguageOption = {
  code: Language;
  label: string;
  nativeLabel: string;
  shortLabel: string;
  flag: string;
};

const languages: LanguageOption[] = [
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    shortLabel: 'EN',
    flag: '🇺🇸',
  },
  {
    code: 'fa',
    label: 'Persian',
    nativeLabel: 'فارسی',
    shortLabel: 'FA',
    flag: '🇮🇷',
  },
  {
    code: 'ar',
    label: 'Arabic',
    nativeLabel: 'العربية',
    shortLabel: 'AR',
    flag: '🇸🇦',
  },
  {
    code: 'tr',
    label: 'Turkish',
    nativeLabel: 'Türkçe',
    shortLabel: 'TR',
    flag: '🇹🇷',
  },
  {
    code: 'zh',
    label: 'Chinese',
    nativeLabel: '中文',
    shortLabel: 'ZH',
    flag: '🇨🇳',
  },
];

const LanguageSwitcher: React.FC = () => {
  const { lang, setLang, t, direction } = useI18n();

  const currentLanguage =
    languages.find((language) => language.code === lang) || languages[0];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(event.target.value as Language);
  };

  return (
    <div
      className="language-switcher"
      dir={direction}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        position: 'relative',
      }}
    >
      <label
        htmlFor="language-switcher-select"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: 'inherit',
          fontSize: '13px',
          fontWeight: 700,
          opacity: 0.9,
          whiteSpace: 'nowrap',
        }}
      >
        <span aria-hidden="true">{currentLanguage.flag}</span>
        <span>{t('language')}</span>
      </label>

      <select
        id="language-switcher-select"
        value={lang}
        onChange={handleChange}
        aria-label={t('selectLanguage')}
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          minWidth: '112px',
          padding: direction === 'rtl' ? '8px 12px 8px 30px' : '8px 30px 8px 12px',
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.18)',
          background: 'rgba(255,255,255,0.08)',
          color: 'inherit',
          fontSize: '13px',
          fontWeight: 800,
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        {languages.map((language) => (
          <option
            key={language.code}
            value={language.code}
            style={{
              color: '#180d31',
              background: '#ffffff',
            }}
          >
            {language.flag} {language.nativeLabel}
          </option>
        ))}
      </select>

      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: direction === 'rtl' ? 'auto' : '12px',
          left: direction === 'rtl' ? '12px' : 'auto',
          pointerEvents: 'none',
          fontSize: '10px',
          opacity: 0.8,
        }}
      >
        ▼
      </span>
    </div>
  );
};

export default LanguageSwitcher;
