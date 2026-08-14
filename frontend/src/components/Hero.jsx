// frontend/src/components/Hero.jsx
import React from 'react';
import './Hero.css';
import { useI18n } from '../i18n/I18nContext';

const Hero = () => {
  const { t } = useI18n();

  const scrollToPiPanel = () => {
    const element = document.getElementById('pi-payment-panel');

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className="hero">
      <h1>{t('heroTitle')}</h1>

      <p>{t('heroDescription')}</p>

      <div className="hero-btns">
        <button onClick={scrollToPiPanel} className="btn-primary">
          🔐 {t('loginWithPiWallet')}
        </button>
      </div>
    </section>
  );
};

export default Hero;
