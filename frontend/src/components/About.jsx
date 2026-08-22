// frontend/src/components/About.jsx
import React from 'react';
import './About.css';
import { useI18n } from '../i18n/I18nContext';

const About = () => {
  const { t } = useI18n();

  const tx = (key, fallback) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-wrapper">
          <div className="about-content">
            <div className="about-kicker">
              {tx('picexAboutKicker', 'About picex')}
            </div>

            <h2 className="about-subtitle">
              {tx('picexAboutSubtitle', 'A hybrid exchange layer for the Pi ecosystem')}
            </h2>

            <h1 className="about-title">
              {tx('picexAboutTitleBefore', 'Built to turn Pi into a')}{' '}
              <span className="highlight">
                {tx('picexAboutTitleHighlight', 'tradable market experience')}
              </span>
            </h1>

            <p className="about-text">
              {tx(
                'picexAboutText',
                'picex is designed as a high-performance hybrid trading platform for the Pi Network ecosystem. It combines fast off-chain order matching with secure settlement, Pi-based identity flows, low-fee trading, and native market data generated from picex activity.'
              )}
            </p>

            <p className="about-text about-text-secondary">
              {tx(
                'picexAboutTextSecondary',
                'The goal is not to replace the Pi ecosystem, but to build a professional trading hub on top of it: spot markets first, wallet operations and native charts next, then AI support, governance, and futures once the risk engine is mature.'
              )}
            </p>

            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">CEX</span>
                <span className="stat-label">
                  {tx('picexStatCex', 'Fast internal matching')}
                </span>
              </div>

              <div className="stat-item">
                <span className="stat-number">Pi</span>
                <span className="stat-label">
                  {tx('picexStatPi', 'Pi identity and settlement')}
                </span>
              </div>

              <div className="stat-item">
                <span className="stat-number">AI</span>
                <span className="stat-label">
                  {tx('picexStatAi', 'Smart support layer')}
                </span>
              </div>
            </div>
          </div>

          <div className="about-visual">
            <div className="vision-card">
              <div className="vision-icon">⚡</div>

              <div className="vision-label">
                {tx('picexVisionLabel', 'picex Hybrid Engine')}
              </div>

              <h3>
                {tx('picexMissionTitle', 'Speed where traders need it, settlement where trust matters')}
              </h3>

              <p>
                {tx(
                  'picexMissionText',
                  'Orders are designed to be matched quickly inside the picex trading engine, while deposits, withdrawals, account rules, and final settlement remain auditable through a controlled wallet and ledger architecture.'
                )}
              </p>

              <div className="vision-points">
                <div className="vision-point">
                  <span>📊</span>
                  <p>{tx('picexPointOrderbook', 'Order book trading for spot markets')}</p>
                </div>

                <div className="vision-point">
                  <span>👛</span>
                  <p>{tx('picexPointWallet', 'Wallet operations with hot and cold treasury controls')}</p>
                </div>

                <div className="vision-point">
                  <span>📈</span>
                  <p>{tx('picexPointCharts', 'Native charts based on picex market activity')}</p>
                </div>

                <div className="vision-point">
                  <span>🤖</span>
                  <p>{tx('picexPointAi', 'AI support for user guidance and issue resolution')}</p>
                </div>
              </div>

              <div className="vision-badge">
                {tx('picexVisionBadge', 'Pi-first exchange infrastructure')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
