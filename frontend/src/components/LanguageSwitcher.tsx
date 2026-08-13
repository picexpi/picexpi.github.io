// frontend/src/components/LanguageSwitcher.tsx
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

const LanguageSwitcher: React.FC = () => {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        margin: '16px auto',
        fontFamily: 'sans-serif',
      }}
    >
      <span style={{ fontSize: '13px', color: '#666' }}>{t('language')}:</span>

      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as 'fa' | 'en' | 'tr')}
        style={{
          padding: '8px 12px',
          borderRadius: '10px',
          border: '1px solid #ccc',
          background: '#fff',
          cursor: 'pointer',
        }}
      >
        <option value="fa">فارسی</option>
        <option value="en">English</option>
        <option value="tr">Türkçe</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
