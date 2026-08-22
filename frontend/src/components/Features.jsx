// frontend/src/components/Features.jsx
import React from 'react';
import './Features.css';
import { useI18n } from '../i18n/I18nContext';

const Features = () => {
  const { t } = useI18n();

  const tx = (key, fallback) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  const features = [
    {
      title: tx('picexFeatureSpotTitle', 'Spot Trading'),
      description: tx(
        'picexFeatureSpotDescription',
        'Trade Pi-based assets through a fast order book experience designed for real-time spot markets.'
      ),
      icon: '📊',
      tag: tx('featureTagSpot', 'Spot'),
    },
    {
      title: tx('picexFeatureFuturesTitle', 'Futures Ready Architecture'),
      description: tx(
        'picexFeatureFuturesDescription',
        'picex is designed to support perpetual futures after the risk engine, margin system, and liquidation layer are mature.'
      ),
      icon: '⚡',
      tag: tx('featureTagPerps', 'Perps'),
    },
    {
      title: tx('picexFeatureWalletTitle', 'Wallet, Deposit & Withdraw'),
      description: tx(
        'picexFeatureWalletDescription',
        'A wallet-first flow for deposits, pending balances, withdrawals, hot wallet operations, and cold wallet treasury controls.'
      ),
      icon: '👛',
      tag: tx('featureTagWallet', 'Wallet'),
    },
    {
      title: tx('picexFeaturePiTitle', 'Pi Login & KYC-Aware Access'),
      description: tx(
        'picexFeaturePiDescription',
        'Users connect through Pi identity flows while picex applies account limits, KYC-aware access, and safer trading rules.'
      ),
      icon: 'π',
      tag: tx('featureTagPiSdk', 'Pi SDK'),
    },
    {
      title: tx('picexFeatureChartsTitle', 'Native picex Charts'),
      description: tx(
        'picexFeatureChartsDescription',
        'Price charts are planned to be generated from picex’s own executed trades, order book events, and OHLC candles.'
      ),
      icon: '📈',
      tag: tx('featureTagCharts', 'Charts'),
    },
    {
      title: tx('picexFeatureAiTitle', 'AI Online Support'),
      description: tx(
        'picexFeatureAiDescription',
        'An intelligent support assistant will help users with Pi login, payments, deposits, withdrawals, KYC, fees, and order issues.'
      ),
      icon: '🤖',
      tag: tx('featureTagAi', 'AI'),
    },
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="features-heading">
          <span className="features-kicker">
            {tx('picexFeaturesKicker', 'picex Core Infrastructure')}
          </span>

          <h2 className="section-title">
            {tx('picexFeaturesTitle', 'Built for high-performance Pi trading')}
          </h2>

          <p className="features-intro">
            {tx(
              'picexFeaturesIntro',
              'picex combines exchange-grade speed, Pi ecosystem access, wallet operations, native market data, and AI-powered support into one unified trading experience.'
            )}
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <article key={index} className="feature-card">
              <div className="feature-card-top">
                <span className="feature-tag">{feature.tag}</span>
              </div>

              <div className="feature-icon-wrapper">
                <span className="feature-icon">
                  {feature.icon}
                </span>
              </div>

              <h3 className="feature-title">
                {feature.title}
              </h3>

              <p className="feature-description">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
