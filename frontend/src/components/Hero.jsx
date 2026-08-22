// frontend/src/components/Hero.jsx
import React from 'react';
import './Hero.css';
import { useI18n } from '../i18n/I18nContext';

const Hero = () => {
  const { t } = useI18n();

  const tx = (key, fallback) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  const scrollToPiPanel = () => {
    const element = document.getElementById('pi-payment-panel');

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const scrollToMarkets = () => {
    const element = document.getElementById('markets');

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className="hero">
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          {tx('picexBadge', 'picex · Hybrid Trading Hub for Pi Network')}
        </div>

        <h1>
          {tx(
            'picexHeroTitle',
            'Trade Pi assets with speed, low fees, and intelligent support'
          )}
        </h1>

        <p>
          {tx(
            'picexHeroDescription',
            'picex combines a fast off-chain matching engine, Pi-based settlement, native market data, AI online support, and a wallet-first trading experience for the Pi Network ecosystem.'
          )}
        </p>

        <div className="hero-btns">
          <button onClick={scrollToPiPanel} className="btn-primary">
            🔐 {tx('joinWithPi', 'Connect with Pi')}
          </button>

          <button onClick={scrollToMarkets} className="btn-secondary">
            📈 {tx('exploreMarkets', 'Explore Markets')}
          </button>
        </div>

        <div className="hero-stats" aria-label="picex platform highlights">
          <div className="hero-stat-card">
            <strong>{tx('spot', 'Spot')}</strong>
            <span>{tx('orderBookTrading', 'Order book trading')}</span>
          </div>

          <div className="hero-stat-card">
            <strong>{tx('futures', 'Futures')}</strong>
            <span>{tx('plannedPerpetualLayer', 'Planned perpetual layer')}</span>
          </div>

          <div className="hero-stat-card">
            <strong>{tx('ai', 'AI')}</strong>
            <span>{tx('onlineSupportAssistant', 'Online support assistant')}</span>
          </div>

          <div className="hero-stat-card">
            <strong>{tx('charts', 'Charts')}</strong>
            <span>{tx('picexNativeData', 'picex native data')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
