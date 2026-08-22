// frontend/src/components/Footer.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Footer.css';
import { useI18n } from '../i18n/I18nContext';

const Footer = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  const tx = (key, fallback) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  const scrollToSection = (sectionId) => {
    const doScroll = () => {
      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else {
        console.warn(`Section not found: #${sectionId}`);
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
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo" aria-label="picex home">
            pic<span>ex</span>
          </Link>

          <div className="footer-badge">
            {tx('picexFooterBadge', 'Hybrid Trading Hub for Pi Network')}
          </div>

          <p className="footer-description">
            {tx(
              'picexFooterDescription',
              'picex is a Pi-first hybrid exchange experience combining fast trading, Pi login, payment flows, native market data, AI support, and a wallet-ready architecture for future deposit and withdrawal operations.'
            )}
          </p>
        </div>

        <div className="footer-columns">
          <div className="footer-column">
            <h4>{tx('footerExchange', 'Exchange')}</h4>

            <ul className="footer-links footer-links-column">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('markets')}
                  className="footer-link-button"
                >
                  {tx('markets', 'Markets')}
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('features')}
                  className="footer-link-button"
                >
                  {tx('features', 'Features')}
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('pi-payment-panel')}
                  className="footer-link-button"
                >
                  {tx('wallet', 'Wallet')}
                </button>
              </li>

              <li>
                <Link to="/shop" className="footer-link">
                  {tx('tradingProducts', 'Trading Products')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{tx('footerCommunity', 'Community')}</h4>

            <ul className="footer-links footer-links-column">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('poll')}
                  className="footer-link-button"
                >
                  {tx('governance', 'Governance')}
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('support-ai')}
                  className="footer-link-button"
                >
                  {tx('aiSupport', 'AI Support')}
                </button>
              </li>

              <li>
                <Link to="/tasks" className="footer-link">
                  {tx('tasks', 'Tasks')}
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('roadmap')}
                  className="footer-link-button"
                >
                  {tx('navRoadmap', 'Roadmap')}
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{tx('footerResources', 'Resources')}</h4>

            <ul className="footer-links footer-links-column">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('about')}
                  className="footer-link-button"
                >
                  {tx('aboutUs', 'About picex')}
                </button>
              </li>

              <li>
                <a
                  href="/whitepaper.html"
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tx('whitepaper', 'Whitepaper')}
                </a>
              </li>

              <li>
                <a
                  href="/terms.html"
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tx('termsOfService', 'Terms')}
                </a>
              </li>

              <li>
                <a
                  href="/privacy.html"
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tx('privacyPolicy', 'Privacy')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-legal-links">
          <a
            href="/privacy.html"
            className="footer-legal-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {tx('privacyPolicy', 'Privacy Policy')}
          </a>

          <span className="footer-legal-separator">•</span>

          <a
            href="/terms.html"
            className="footer-legal-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {tx('termsOfService', 'Terms of Service')}
          </a>

          <span className="footer-legal-separator">•</span>

          <a
            href="/whitepaper.html"
            className="footer-legal-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {tx('whitepaper', 'Whitepaper')}
          </a>
        </div>

        <div className="footer-note">
          <p>
            {tx(
              'picexFooterNote',
              'picex is under active development. Trading, wallet, deposit, withdrawal, futures, and AI support features must be tested, audited, and reviewed for compliance before production use. Pi SDK functionality depends on the official Pi Network Developer Platform and current network availability.'
            )}
          </p>
        </div>

        <div className="copyright">
          <p>
            &copy; {new Date().getFullYear()} picex.{' '}
            {tx('footerRights', 'All rights reserved.')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
