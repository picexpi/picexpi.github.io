// frontend/src/components/Header.tsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  const tx = (key: string, fallback: string) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  const scrollToSection = (sectionId: string) => {
    const doScroll = () => {
      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');

      setTimeout(() => {
        doScroll();
      }, 250);
    } else {
      doScroll();
    }
  };

  return (
    <header
      className="header"
      style={{
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 999,
        background:
          'linear-gradient(90deg, rgba(15, 8, 32, 0.94), rgba(38, 16, 74, 0.92))',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div
        className="header-inner"
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '14px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '18px',
        }}
      >
        <Link
          to="/"
          className="header-logo"
          aria-label="picex home"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '1.65rem',
            fontWeight: 950,
            letterSpacing: '-0.5px',
            lineHeight: 1,
          }}
        >
          pi
          <span style={{ color: '#ffca28' }}>cex</span>
        </Link>

        <nav
          className="header-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            flexWrap: 'wrap',
          }}
        >
          <Link to="/" className="header-link">
            {tx('home', 'Home')}
          </Link>

          <button
            type="button"
            className="header-link header-button"
            onClick={() => scrollToSection('markets')}
          >
            {tx('markets', 'Markets')}
          </button>

          <button
            type="button"
            className="header-link header-button"
            onClick={() => scrollToSection('pi-payment-panel')}
          >
            {tx('wallet', 'Wallet')}
          </button>

          <button
            type="button"
            className="header-link header-button"
            onClick={() => scrollToSection('features')}
          >
            {tx('features', 'Features')}
          </button>

          <button
            type="button"
            className="header-link header-button"
            onClick={() => scrollToSection('support-ai')}
          >
            {tx('aiSupport', 'AI Support')}
          </button>

          <button
            type="button"
            className="header-link header-button"
            onClick={() => scrollToSection('roadmap')}
          >
            {tx('navRoadmap', 'Roadmap')}
          </button>

          <button
            type="button"
            className="header-link header-button"
            onClick={() => scrollToSection('poll')}
          >
            {tx('governance', 'Governance')}
          </button>
        </nav>

        <div
          className="header-actions"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <LanguageSwitcher />

          <button
            type="button"
            onClick={() => scrollToSection('pi-payment-panel')}
            style={{
              border: 'none',
              borderRadius: '999px',
              padding: '10px 16px',
              background: 'linear-gradient(135deg, #ffe7a3, #ffca28, #f4b942)',
              color: '#180d31',
              fontWeight: 950,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {tx('joinWithPi', 'Connect with Pi')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
