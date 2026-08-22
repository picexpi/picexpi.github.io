// frontend/src/components/AISupportSection.jsx
import React from 'react';
import './AISupportSection.css';
import { useI18n } from '../i18n/I18nContext';

const AISupportSection = () => {
  const { t } = useI18n();

  const tx = (key, fallback) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  const supportItems = [
    {
      icon: '⚡',
      text: tx(
        'aiSupportBulletInstantAnswers',
        'Instant answers based on picex documentation'
      ),
    },
    {
      icon: '👛',
      text: tx(
        'aiSupportBulletDepositWithdrawal',
        'Guided help for deposit and withdrawal issues'
      ),
    },
    {
      icon: '🛡️',
      text: tx(
        'aiSupportBulletHumanEscalation',
        'Escalation to human support for risky or sensitive cases'
      ),
    },
    {
      icon: '🧠',
      text: tx(
        'aiSupportBulletRagKnowledgeBase',
        'Future RAG knowledge base using PostgreSQL / pgvector'
      ),
    },
  ];

  return (
    <section id="support-ai" className="ai-support-section">
      <div className="container">
        <div className="ai-support-wrapper">
          <div className="ai-support-content">
            <span className="ai-support-kicker">
              {tx('aiOnlineSupport', 'AI Online Support')}
            </span>

            <h2 className="ai-support-title">
              {tx(
                'aiSupportSubtitle',
                '24/7 intelligent support for traders'
              )}
            </h2>

            <p className="ai-support-description">
              {tx(
                'aiSupportDescription',
                'The picex support assistant will help users understand Pi login, payments, deposits, withdrawals, wallet safety, trading fees, order status, KYC requirements, and platform rules.'
              )}
            </p>

            <div className="ai-support-list">
              {supportItems.map((item, index) => (
                <div key={index} className="ai-support-list-item">
                  <span className="ai-support-list-icon">
                    {item.icon}
                  </span>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="ai-support-chat-card">
            <div className="ai-chat-header">
              <div className="ai-chat-avatar">🤖</div>

              <div>
                <h3>{tx('picexAiSupport', 'picex AI Support')}</h3>
                <p>{tx('onlineSupportAssistant', 'Online support assistant')}</p>
              </div>

              <span className="ai-chat-status">
                {tx('active', 'Active')}
              </span>
            </div>

            <div className="ai-chat-body">
              <div className="ai-message ai-message-bot">
                {tx(
                  'aiSupportAskPlaceholder',
                  'Ask me about deposits, withdrawals, Pi login, trading fees, or KYC.'
                )}
              </div>

              <div className="ai-message ai-message-user">
                {tx(
                  'aiSupportSampleQuestionDepositTime',
                  'How long does a Pi deposit take?'
                )}
              </div>

              <div className="ai-message ai-message-bot">
                {tx(
                  'aiSupportSampleAnswerDepositTime',
                  'Deposits appear as pending first. After the required confirmation policy is met, picex credits the internal ledger and makes the balance available.'
                )}
              </div>
            </div>

            <div className="ai-chat-input">
              <span>
                {tx(
                  'aiSupportInputPlaceholder',
                  'Ask about deposits, withdrawals, Pi login, fees, or KYC...'
                )}
              </span>
              <button type="button">
                {tx('send', 'Send')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISupportSection;
