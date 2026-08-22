// frontend/src/pages/Dig.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useI18n } from '../i18n/I18nContext';
import './Dig.css';

const Dig: React.FC = () => {
  const { t } = useI18n();

  const tx = (key: string, fallback: string) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  const architectureCards = [
    {
      icon: '⚡',
      title: tx('picexArchMatchingTitle', 'Off-chain Matching Engine'),
      text: tx(
        'picexArchMatchingText',
        'Orders are planned to be matched inside a low-latency backend engine so traders can experience fast execution similar to modern centralized exchanges.'
      ),
    },
    {
      icon: '👛',
      title: tx('picexArchWalletTitle', 'Wallet & Settlement Layer'),
      text: tx(
        'picexArchWalletText',
        'Deposits, withdrawals, pending balances, hot wallet operations, cold wallet treasury, and reconciliation are separated from the trading engine.'
      ),
    },
    {
      icon: 'π',
      title: tx('picexArchPiTitle', 'Pi Identity & Payment Flows'),
      text: tx(
        'picexArchPiText',
        'Pi SDK is used for login and payment authorization where supported, while custody and ledger accounting remain controlled by picex infrastructure.'
      ),
    },
    {
      icon: '📈',
      title: tx('picexArchChartsTitle', 'Native Market Data'),
      text: tx(
        'picexArchChartsText',
        'Charts, tickers, trades, and OHLC candles are designed to come from picex internal executed trades and order book data.'
      ),
    },
    {
      icon: '🤖',
      title: tx('picexArchAiTitle', 'AI Support Layer'),
      text: tx(
        'picexArchAiText',
        'AI support will answer user questions using picex documentation, wallet rules, payment flows, KYC policy, and troubleshooting guides.'
      ),
    },
    {
      icon: '🛡️',
      title: tx('picexArchRiskTitle', 'Risk, KYC & Compliance Controls'),
      text: tx(
        'picexArchRiskText',
        'Account limits, withdrawal reviews, suspicious activity alerts, and future derivatives controls are part of the operational risk framework.'
      ),
    },
  ];

  const roadmapItems = [
    {
      number: '01',
      title: tx('picexRoadmapStep1Title', 'Foundation & Pi Integration'),
      text: tx(
        'picexRoadmapStep1Description',
        'React/Vite frontend, Node/Express backend, PostgreSQL, Pi login, JWT, payment flow, and stable deployment.'
      ),
    },
    {
      number: '02',
      title: tx('picexRoadmapStep2Title', 'Wallet, Deposit & Withdraw Layer'),
      text: tx(
        'picexRoadmapStep2Description',
        'Address mapping, deposit monitoring, withdrawal queue, hot/cold wallet policy, and reconciliation.'
      ),
    },
    {
      number: '03',
      title: tx('picexRoadmapStep3Title', 'Spot Market & Order Book'),
      text: tx(
        'picexRoadmapStep3Description',
        'Limit orders, market orders, internal ledger settlement, trade history, maker/taker fee logic.'
      ),
    },
    {
      number: '04',
      title: tx('picexRoadmapStep4Title', 'Native Charts & Market Data'),
      text: tx(
        'picexRoadmapStep4Description',
        'OHLC candle generation, ticker endpoint, order book snapshots, and WebSocket updates.'
      ),
    },
    {
      number: '05',
      title: tx('picexRoadmapStep5Title', 'AI Support & Knowledge Base'),
      text: tx(
        'picexRoadmapStep5Description',
        'RAG support assistant using project documentation, policies, and troubleshooting records.'
      ),
    },
    {
      number: '06',
      title: tx('picexRoadmapStep6Title', 'Futures, Risk Engine & Scaling'),
      text: tx(
        'picexRoadmapStep6Description',
        'Perpetual futures, margin system, liquidation engine, Docker/Nginx scaling, and market maker API.'
      ),
    },
  ];

  return (
    <div className="dig-page">
      <Navbar />

      <main className="dig-main">
        <div className="dig-language">
          <LanguageSwitcher />
        </div>

        <section className="dig-hero-section">
          <div className="dig-container">
            <div className="dig-badge">
              picex · Architecture
            </div>

            <h1 className="dig-title">
              {tx('picexArchitecturePageTitle', 'picex Hybrid Exchange Architecture')}
            </h1>

            <p className="dig-lead">
              {tx(
                'picexArchitecturePageLead',
                'A technical overview of how picex evolves from a Pi login and payment application into a hybrid trading hub with wallet operations, native charts, AI support, and future futures infrastructure.'
              )}
            </p>

            <div className="dig-actions">
              <Link to="/" className="dig-primary-link">
                {tx('backToHome', 'Back to Home')}
              </Link>

              <a href="#dig-roadmap" className="dig-secondary-link">
                {tx('navRoadmap', 'Roadmap')}
              </a>
            </div>
          </div>
        </section>

        <section className="dig-content-section">
          <div className="dig-container dig-grid">
            <article className="dig-card dig-card-large">
              <span className="dig-card-icon">🏦</span>

              <h2>
                {tx('picexWhatTitle', 'What is picex?')}
              </h2>

              <p>
                {tx(
                  'picexWhatText',
                  'picex is a Pi-first hybrid exchange concept. It keeps fast trading operations inside an internal matching and ledger system, while Pi login, Pi payments, deposits, withdrawals, and settlement rules connect the platform to the Pi ecosystem.'
                )}
              </p>
            </article>

            {architectureCards.map((item, index) => (
              <article key={index} className="dig-card">
                <span className="dig-card-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="dig-roadmap" className="dig-roadmap-section">
          <div className="dig-container">
            <div className="dig-section-heading">
              <span>picex</span>

              <h2>
                {tx('picexManifestoRoadmapTitle', 'Technical Roadmap')}
              </h2>

              <p>
                {tx(
                  'picexManifestoRoadmapIntro',
                  'The project should grow in controlled phases: preserve the working Pi login, poll, and payment flows first, then add wallet operations, spot markets, native chart data, AI support, and futures only after risk controls are mature.'
                )}
              </p>
            </div>

            <div className="dig-roadmap-list">
              {roadmapItems.map((item) => (
                <div key={item.number} className="dig-roadmap-item">
                  <strong>{item.number}</strong>

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dig-disclaimer-section">
          <div className="dig-container">
            <div className="dig-disclaimer">
              <h2>
                {tx('picexDisclaimerTitle', 'Important technical disclaimer')}
              </h2>

              <p>
                {tx(
                  'picexDisclaimerText',
                  'Pi SDK should not be treated as a complete custodial wallet system. Login, authentication, and payment flows must be separated from internal ledger accounting, blockchain monitoring, hot wallet, cold wallet, reconciliation, KYC, and withdrawal controls.'
                )}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dig;
