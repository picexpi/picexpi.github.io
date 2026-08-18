// frontend/src/components/Roadmap.jsx
import React from 'react';
import './Roadmap.css';
import { useI18n } from '../i18n/I18nContext';

const Roadmap = () => {
  const { t } = useI18n();

  const steps = [
    {
      number: '01',
      icon: '🌱',
      title: t('roadmapStep1Title'),
      description: t('roadmapStep1Description'),
    },
    {
      number: '02',
      icon: '🗳️',
      title: t('roadmapStep2Title'),
      description: t('roadmapStep2Description'),
    },
    {
      number: '03',
      icon: 'π',
      title: t('roadmapStep3Title'),
      description: t('roadmapStep3Description'),
    },
    {
      number: '04',
      icon: '🌐',
      title: t('roadmapStep4Title'),
      description: t('roadmapStep4Description'),
    },
    {
      number: '05',
      icon: '🏛️',
      title: t('roadmapStep5Title'),
      description: t('roadmapStep5Description'),
    },
    {
      number: '06',
      icon: '💠',
      title: t('roadmapStep6Title'),
      description: t('roadmapStep6Description'),
    },
  ];

  return (
    <section id="roadmap" className="roadmap-section">
      <div className="container">
        <div className="roadmap-heading">
          <span className="roadmap-kicker">
            {t('digShortName')}
          </span>

          <h2 className="roadmap-title">
            {t('roadmapTitle')}
          </h2>

          <p className="roadmap-intro">
            {t('roadmapIntro')}
          </p>
        </div>

        <div className="roadmap-timeline">
          {steps.map((step, index) => (
            <div key={index} className="roadmap-card">
              <div className="roadmap-number">
                {step.number}
              </div>

              <div className="roadmap-icon">
                {step.icon}
              </div>

              <h3>
                {step.title}
              </h3>

              <p>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
