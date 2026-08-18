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
              {t('digShortName')} · {t('digFullName')}
            </div>

            <h1 className="dig-title">
              {t('digPageTitle')}
            </h1>

            <p className="dig-lead">
              {t('digPageLead')}
            </p>

            <div className="dig-actions">
              <Link to="/" className="dig-primary-link">
                {t('backToHome')}
              </Link>

              <a href="#dig-roadmap" className="dig-secondary-link">
                {t('navRoadmap')}
              </a>
            </div>
          </div>
        </section>

        <section className="dig-content-section">
          <div className="dig-container dig-grid">
            <article className="dig-card dig-card-large">
              <span className="dig-card-icon">🌍</span>
              <h2>{t('digWhatTitle')}</h2>
              <p>{t('digWhatText')}</p>
            </article>

            <article className="dig-card">
              <span className="dig-card-icon">🗳️</span>
              <h3>{t('digVotingTitle')}</h3>
              <p>{t('digVotingText')}</p>
            </article>

            <article className="dig-card">
              <span className="dig-card-icon">🔍</span>
              <h3>{t('digTransparencyTitle')}</h3>
              <p>{t('digTransparencyText')}</p>
            </article>

            <article className="dig-card">
              <span className="dig-card-icon">π</span>
              <h3>{t('digPiRoleTitle')}</h3>
              <p>{t('digPiRoleText')}</p>
            </article>

            <article className="dig-card">
              <span className="dig-card-icon">🤝</span>
              <h3>{t('digConflictTitle')}</h3>
              <p>{t('digConflictText')}</p>
            </article>

            <article className="dig-card">
              <span className="dig-card-icon">💠</span>
              <h3>{t('digDibTitle')}</h3>
              <p>{t('digDibText')}</p>
            </article>
          </div>
        </section>

        <section id="dig-roadmap" className="dig-roadmap-section">
          <div className="dig-container">
            <div className="dig-section-heading">
              <span>{t('digShortName')}</span>
              <h2>{t('digManifestoRoadmapTitle')}</h2>
              <p>{t('digManifestoRoadmapIntro')}</p>
            </div>

            <div className="dig-roadmap-list">
              <div className="dig-roadmap-item">
                <strong>01</strong>
                <div>
                  <h3>{t('roadmapStep1Title')}</h3>
                  <p>{t('roadmapStep1Description')}</p>
                </div>
              </div>

              <div className="dig-roadmap-item">
                <strong>02</strong>
                <div>
                  <h3>{t('roadmapStep2Title')}</h3>
                  <p>{t('roadmapStep2Description')}</p>
                </div>
              </div>

              <div className="dig-roadmap-item">
                <strong>03</strong>
                <div>
                  <h3>{t('roadmapStep3Title')}</h3>
                  <p>{t('roadmapStep3Description')}</p>
                </div>
              </div>

              <div className="dig-roadmap-item">
                <strong>04</strong>
                <div>
                  <h3>{t('roadmapStep4Title')}</h3>
                  <p>{t('roadmapStep4Description')}</p>
                </div>
              </div>

              <div className="dig-roadmap-item">
                <strong>05</strong>
                <div>
                  <h3>{t('roadmapStep5Title')}</h3>
                  <p>{t('roadmapStep5Description')}</p>
                </div>
              </div>

              <div className="dig-roadmap-item">
                <strong>06</strong>
                <div>
                  <h3>{t('roadmapStep6Title')}</h3>
                  <p>{t('roadmapStep6Description')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="dig-disclaimer-section">
          <div className="dig-container">
            <div className="dig-disclaimer">
              <h2>{t('digDisclaimerTitle')}</h2>
              <p>{t('digDisclaimerText')}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dig;
