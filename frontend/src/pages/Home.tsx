// frontend/src/pages/Home.tsx
import React from 'react';
import './Home.css';

import Navbar from '../components/Navbar';
import LanguageSwitcher from '../components/LanguageSwitcher';
import PiPaymentPanel from '../components/PiPaymentPanel';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Roadmap from '../components/Roadmap';
import Poll from '../components/Poll';
import About from '../components/About';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Navbar />

      <main className="home-main">
        {/* Language selector */}
        <div className="home-language-switcher">
          <LanguageSwitcher />
        </div>

        {/* Main picex hero */}
        <Hero />

        {/* Native picex markets / charts preview */}
        <section id="markets" className="home-section home-markets-section">
          <div className="home-section-inner">
            <div className="home-section-kicker">picex Native Market Data</div>

            <h2>Live markets powered by picex trading activity</h2>

            <p>
              picex price charts are designed to be generated from our own executed trades,
              order book events, and OHLC candle aggregation — not from unrelated external
              market feeds. This gives Pi traders a cleaner view of the real picex market.
            </p>

            <div className="home-market-grid">
              <div className="home-market-card">
                <span className="home-market-pair">PI / USDT</span>
                <strong>Spot Market</strong>
                <small>Order book, trades, candles, volume</small>
              </div>

              <div className="home-market-card">
                <span className="home-market-pair">PI / PIC</span>
                <strong>Ecosystem Pair</strong>
                <small>Designed for future picex utility economy</small>
              </div>

              <div className="home-market-card">
                <span className="home-market-pair">PI-PERP</span>
                <strong>Futures Ready</strong>
                <small>Planned perpetual market after risk engine maturity</small>
              </div>
            </div>
          </div>
        </section>

        {/* Pi login / payment panel */}
        <section id="pi-payment-panel" className="home-pi-panel">
          <PiPaymentPanel />
        </section>

        {/* picex AI Support preview */}
        <section id="support-ai" className="home-section home-ai-section">
          <div className="home-section-inner home-ai-layout">
            <div>
              <div className="home-section-kicker">AI Online Support</div>

              <h2>24/7 intelligent support for traders</h2>

              <p>
                The picex support assistant will help users understand Pi login,
                payments, deposits, withdrawals, wallet safety, trading fees, order status,
                KYC requirements, and platform rules.
              </p>

              <ul className="home-ai-list">
                <li>Instant answers based on picex documentation</li>
                <li>Guided help for deposit and withdrawal issues</li>
                <li>Escalation to human support for risky or sensitive cases</li>
                <li>Future RAG knowledge base using PostgreSQL / pgvector</li>
              </ul>
            </div>

            <div className="home-ai-chat-card">
              <div className="home-ai-chat-header">
                <span className="home-ai-dot" />
                picex AI Support
              </div>

              <div className="home-ai-message bot">
                Ask me about deposits, withdrawals, Pi login, trading fees, or KYC.
              </div>

              <div className="home-ai-message user">
                How long does a Pi deposit take?
              </div>

              <div className="home-ai-message bot">
                Deposits appear as pending first. After the required confirmation policy is
                met, picex credits the internal ledger and makes the balance available.
              </div>
            </div>
          </div>
        </section>

        {/* Infrastructure and exchange features */}
        <Features />

        {/* Project roadmap */}
        <Roadmap />

        {/* Existing poll preserved, can become picex governance */}
        <Poll />

        {/* About picex */}
        <About />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
