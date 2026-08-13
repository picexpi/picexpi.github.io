// frontend/src/components/Features.jsx
import React from 'react';
import './Features.css';
import { useI18n } from '../i18n/I18nContext';

const Features = () => {
  const { t } = useI18n();

  const features = [
    {
      title: t('featureSecurePaymentsTitle'),
      description: t('featureSecurePaymentsDescription'),
      icon: '🔐',
    },
    {
      title: t('featureDaoTitle'),
      description: t('featureDaoDescription'),
      icon: '🌐',
    },
    {
      title: t('featureTransactionPanelTitle'),
      description: t('featureTransactionPanelDescription'),
      icon: '📊',
    },
    {
      title: t('featureDigitalProductsTitle'),
      description: t('featureDigitalProductsDescription'),
      icon: '🛒',
    },
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <h2 className="section-title">
          {t('featuresSectionTitle')}
        </h2>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
