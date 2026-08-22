// frontend/src/components/Header.tsx
import React from 'react';
import { useI18n } from '../i18n/I18nContext';
// import myLogo from '../assets/logo.png';

const Header: React.FC = () => {
  const { t } = useI18n();

  const tx = (key: string, fallback: string) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  return (
    <header className="main-header">
      <div className="logo-placeholder" aria-label="picex brand">
        {tx('brandName', 'picex')}
      </div>

      {/* If you want to use an image logo later: */}
      {/* <img src={myLogo} alt={tx('brandName', 'picex')} width="100" /> */}
    </header>
  );
};

export default Header;
