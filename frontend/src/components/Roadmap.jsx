// frontend/src/components/Roadmap.jsx
import React from 'react';
import './Roadmap.css';
import { useI18n } from '../i18n/I18nContext';

const Roadmap = () => {
  const { t } = useI18n();

  const tx = (key, fallback) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  const steps = [
    {
      number: '01',
      icon: '🏗️',
      title: tx('picexRoadmapStep1Title', 'Foundation & Pi Integration'),
      description: tx(
        'picexRoadmapStep1Description',
        'Build the base React/Vite frontend, Node.js/Express backend, PostgreSQL storage, Pi login, payment flow, authentication, and secure API structure.'
      ),
      status: tx('roadmapStatusDesign', 'Design / Build'),
    },
    {
      number: '02',
      icon: '👛',
      title: tx('picexRoadmapStep2Title', 'Wallet, Deposit & Withdraw Layer'),
      description: tx(
        'picexRoadmapStep2Description',
        'Design internal balances, pending deposits, withdrawal requests, address mapping, hot wallet operations, cold wallet policy, and reconciliation.'
      ),
      status: tx('roadmapStatusPlanned', 'Planned'),
    },
    {
      number: '03',
      icon: '📊',
      title: tx('picexRoadmapStep3Title', 'Spot Market & Order Book'),
      description: tx(
        'picexRoadmapStep3Description',
        'Launch spot trading with limit and market orders, internal ledger settlement, trade history, order status, and low maker/taker fees.'
      ),
      status: tx('roadmapStatusCore', 'Core Phase'),
    },
    {
      number: '04',
      icon: '📈',
      title: tx('picexRoadmapStep4Title', 'Native Charts & Market Data'),
      description: tx(
        'picexRoadmapStep4Description',
        'Generate picex-native OHLC candles, tickers, depth, order book snapshots, and real-time chart updates from internal trade data.'
      ),
      status: tx('roadmapStatusMarket', 'Market Data'),
    },
    {
      number: '05',
      icon: '🤖',
      title: tx('picexRoadmapStep5Title', 'AI Support & Knowledge Base'),
      description: tx(
        'picexRoadmapStep5Description',
        'Add AI online support with documentation-based answers for deposits, withdrawals, Pi login, fees, KYC, payment errors, and order issues.'
      ),
      status: tx('roadmapStatusAi', 'AI Layer'),
    },
    {
      number: '06',
      icon: '⚡',
      title: tx('picexRoadmapStep6Title', 'Futures, Risk Engine & Scaling'),
      description: tx(
        'picexRoadmapStep6Description',
        'After liquidity and operational maturity, add perpetual futures, margin checks, liquidation engine, risk controls, Docker/Nginx scaling, and API access.'
      ),
      status: tx('roadmapStatusFuture', 'Future Phase'),
    },
  ];

  return (
    <section id="roadmap" className="roadmap-section">
      <div className="container">
        <div className="roadmap-heading">
          <span className="roadmap-kicker">
            {tx('picexRoadmapKicker', 'picex Roadmap')}
          </span>

          <h2 className="roadmap-title">
            {tx(
              'picexRoadmapTitle',
              'From Pi payment app to trading infrastructure'
            )}
          </h2>

          <p className="roadmap-intro">
            {tx(
              'picexRoadmapIntro',
              'picex will evolve step by step: first preserving Pi login, payment, poll, and user flows, then expanding toward wallet operations, spot trading, native charts, AI support, and futures-ready infrastructure.'
            )}
          </p>
        </div>

        <div className="roadmap-timeline">
          {steps.map((step, index) => (
            <article key={index} className="roadmap-card">
              <div className="roadmap-number">
                {step.number}
              </div>

              <div className="roadmap-icon">
                {step.icon}
              </div>

              <span className="roadmap-status">
                {step.status}
              </span>

              <h3>
                {step.title}
              </h3>

              <p>
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
