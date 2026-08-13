// frontend/src/components/About.jsx
import React from 'react';
import './About.css';
import { useI18n } from '../i18n/I18nContext';

const About = () => {
  const { t } = useI18n();

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-wrapper">
          
          {/* ستون اول: متن و توضیحات */}
          <div className="about-content">
            <h2 className="about-subtitle">
              {t('aboutSubtitle')}
            </h2>

            <h1 className="about-title">
              {t('aboutTitleBefore')}{' '}
              <span className="highlight">
                {t('aboutTitleHighlight')}
              </span>
            </h1>

            <p className="about-text">
              {t('aboutText')}
            </p>
            
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">
                  {t('transactionSecurity')}
                </span>
              </div>

              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">
                  {t('technicalSupport')}
                </span>
              </div>

              <div className="stat-item">
                <span className="stat-number">DAO</span>
                <span className="stat-label">
                  {t('decentralizedGovernance')}
                </span>
              </div>
            </div>
          </div>

          {/* ستون دوم: باکس چشم‌انداز */}
          <div className="about-visual">
            <div className="vision-card">
              <div className="vision-icon">🚀</div>

              <h3>
                {t('ourVision')}
              </h3>

              <p>
                {t('visionText')}
              </p>

              <div className="vision-badge">
                {t('web3Ready')}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
