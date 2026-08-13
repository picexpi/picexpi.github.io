// frontend/src/components/Poll.jsx
import React, { useState } from 'react';
import './Poll.css';
import { useI18n } from '../i18n/I18nContext';

const Poll = () => {
  const { t, lang } = useI18n();

  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState({ yes: 45, no: 55 });

  const handleVote = (option) => {
    if (!voted) {
      setVotes((prevVotes) => ({
        yes: option === 'yes' ? prevVotes.yes + 1 : prevVotes.yes,
        no: option === 'no' ? prevVotes.no + 1 : prevVotes.no,
      }));

      setVoted(true);
    }
  };

  const totalVotes = votes.yes + votes.no;
  const yesPercent = totalVotes > 0
    ? ((votes.yes / totalVotes) * 100).toFixed(0)
    : '0';

  const noPercent = totalVotes > 0
    ? ((votes.no / totalVotes) * 100).toFixed(0)
    : '0';

  const textAlign = lang === 'fa' ? 'right' : 'left';

  return (
    <section id="poll" className="poll-section">
      <div className="poll-container">
        <h2 className="poll-question">
          {t('pollQuestion')}
        </h2>

        {!voted ? (
          <div className="poll-options">
            <button
              className="poll-btn"
              onClick={() => handleVote('yes')}
            >
              {t('pollYes')}
            </button>

            <button
              className="poll-btn"
              onClick={() => handleVote('no')}
            >
              {t('pollNo')}
            </button>
          </div>
        ) : (
          <div className="poll-results">
            <p
              style={{
                textAlign: 'center',
                marginBottom: '16px',
                color: '#64748b',
                fontSize: '14px',
              }}
            >
              {t('alreadyVoted')}
            </p>

            <div
              style={{
                textAlign,
                marginBottom: '5px',
              }}
            >
              {t('yesLabel')}: {yesPercent}%
            </div>

            <div className="result-bar-container">
              <div
                className="result-bar"
                style={{
                  width: `${yesPercent}%`,
                }}
              ></div>
            </div>

            <div
              style={{
                textAlign,
                marginTop: '20px',
                marginBottom: '5px',
              }}
            >
              {t('noLabel')}: {noPercent}%
            </div>

            <div className="result-bar-container">
              <div
                className="result-bar"
                style={{
                  width: `${noPercent}%`,
                  backgroundColor: '#94a3b8',
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Poll;
