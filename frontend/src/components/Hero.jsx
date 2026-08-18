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

  const scrollToAbout = () => {
    const element = document.getElementById('about');

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className="hero">
      <div className="hero-badge">
        {t('digShortName')} · {t('digFullName')}
      </div>

      <h1>{t('digHeroTitle')}</h1>

      <p>{t('digHeroDescription')}</p>

      <div className="hero-btns">
        <button onClick={scrollToPiPanel} className="btn-primary">
          🔐 {t('joinWithPi')}
        </button>

        <button onClick={scrollToAbout} className="btn-secondary">
          🌐 {t('exploreDig')}
        </button>
      </div>
    </section>
  );
};

export default Hero;
