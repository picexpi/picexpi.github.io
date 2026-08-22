// frontend/src/components/LanguageSwitcher.tsx
import React from 'react';
import { Language, useI18n } from '../i18n/I18nContext';

const LanguageSwitcher: React.FC = () => {
  const {
    lang,
    setLang,
    t,
    supportedLanguages,
    languageLabels,
  } = useI18n();

  const isRtl = lang === 'fa' || lang === 'ar';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        margin: '16px auto',
        fontFamily: 'sans-serif',
        direction: isRtl ? 'rtl' : 'ltr',
      }}
    >
      <label
        htmlFor="language-switcher"
        style={{
          fontSize: '13px',
          color: '#d8cfee',
          fontWeight: 800,
        }}
      >
        {t('language')}:
      </label>

      <select
        id="language-switcher"
        value={lang}
        onChange={(e) => setLang(e.target.value as Language)}
        aria-label={t('language')}
        style={{
          padding: '9px 13px',
          borderRadius: '999px',
          border: '1px solid rgba(255, 202, 40, 0.28)',
          background: 'rgba(255, 255, 255, 0.08)',
          color: '#ffffff',
          cursor: 'pointer',
          fontWeight: 800,
          minWidth: '140px',
          outline: 'none',
          boxShadow: '0 10px 24px rgba(0,0,0,0.16)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {supportedLanguages.map((language) => (
          <option
            key={language}
            value={language}
            style={{
              background: '#180d31',
              color: '#ffffff',
            }}
          >
            {languageLabels[language]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
