// frontend/src/components/Poll.jsx
import React, { useEffect, useState } from 'react';
import './Poll.css';
import { useI18n } from '../i18n/I18nContext';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://pidao.bonto.run/api';

const Poll = () => {
  const { t, lang } = useI18n();

  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [votes, setVotes] = useState({
    yes: 0,
    no: 0,
    total: 0,
    yesPercent: 0,
    noPercent: 0,
  });

  const [userVote, setUserVote] = useState(null);
  const [history, setHistory] = useState([]);

  const textAlign = lang === 'fa' ? 'right' : 'left';

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const fetchPoll = async () => {
    try {
      setLoading(true);
      setError('');

      const token = getToken();

      const response = await fetch(`${API_BASE_URL}/poll/current`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || t('pollConnectionError'));
      }

      setVotes(data.data.votes);
      setUserVote(data.data.userVote);
    } catch (err) {
      console.error('Poll fetch error:', err);
      setError(err.message || t('pollConnectionError'));
    } finally {
      setLoading(false);
    }
  };

  const fetchVoteHistory = async () => {
    try {
      const token = getToken();

      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/poll/history`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setHistory(Array.isArray(data.data) ? data.data : []);
      }
    } catch (err) {
      console.warn('Vote history fetch error:', err);
    }
  };

  useEffect(() => {
    fetchPoll();
    fetchVoteHistory();
  }, []);

  const handleVote = async (option) => {
    const token = getToken();

    if (!token) {
      setMessage(t('pollLoginRequired'));
      return;
    }

    if (userVote) {
      setMessage(t('pollAlreadyVoted'));
      return;
    }

    try {
      setVoting(true);
      setError('');
      setMessage('');

      const response = await fetch(`${API_BASE_URL}/poll/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          option,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (response.status === 409 && data.data) {
          setVotes(data.data.votes);
          setUserVote(data.data.userVote);
          setMessage(t('pollAlreadyVoted'));
          return;
        }

        throw new Error(data.message || t('pollConnectionError'));
      }

      setVotes(data.data.votes);
      setUserVote(data.data.userVote);
      setMessage(t('pollVoteSuccess'));

      await fetchVoteHistory();
    } catch (err) {
      console.error('Poll vote error:', err);
      setError(err.message || t('pollConnectionError'));
    } finally {
      setVoting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';

    return new Date(date).toLocaleString(
      lang === 'fa' ? 'fa-IR' : lang === 'tr' ? 'tr-TR' : 'en-US'
    );
  };

  if (loading) {
    return (
      <section id="poll" className="poll-section">
        <div className="poll-container">
          <p>{t('pollLoading')}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="poll" className="poll-section">
      <div className="poll-container">
        <h2 className="poll-question">
          {t('pollQuestion')}
        </h2>

        <div
          style={{
            marginBottom: '16px',
            color: '#64748b',
            fontSize: '14px',
            textAlign: 'center',
          }}
        >
          {t('totalVotes')}: {votes.total}
        </div>

        {!userVote ? (
          <div className="poll-options">
            <button
              className="poll-btn"
              onClick={() => handleVote('yes')}
              disabled={voting}
            >
              {voting ? t('processing') : t('pollYes')}
            </button>

            <button
              className="poll-btn"
              onClick={() => handleVote('no')}
              disabled={voting}
            >
              {voting ? t('processing') : t('pollNo')}
            </button>
          </div>
        ) : (
          <div
            style={{
              marginBottom: '16px',
              padding: '12px',
              borderRadius: '10px',
              background: '#e8f5e9',
              color: '#2e7d32',
              fontSize: '14px',
              textAlign: 'center',
            }}
          >
            {t('yourVote')}:{' '}
            <strong>
              {userVote.option === 'yes' ? t('yesLabel') : t('noLabel')}
            </strong>
            <br />
            <span style={{ fontSize: '12px' }}>
              {t('voteDate')}: {formatDate(userVote.createdAt)}
            </span>
          </div>
        )}

        {(message || error) && (
          <div
            style={{
              marginTop: '14px',
              padding: '10px',
              borderRadius: '8px',
              background: error ? '#ffebee' : '#e3f2fd',
              color: error ? '#c62828' : '#1565c0',
              fontSize: '13px',
              textAlign: 'center',
            }}
          >
            {error || message}
          </div>
        )}

        <div className="poll-results" style={{ marginTop: '24px' }}>
          <div
            style={{
              textAlign,
              marginBottom: '5px',
            }}
          >
            {t('yesLabel')}: {votes.yesPercent}% ({votes.yes})
          </div>

          <div className="result-bar-container">
            <div
              className="result-bar"
              style={{
                width: `${votes.yesPercent}%`,
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
            {t('noLabel')}: {votes.noPercent}% ({votes.no})
          </div>

          <div className="result-bar-container">
            <div
              className="result-bar"
              style={{
                width: `${votes.noPercent}%`,
                backgroundColor: '#94a3b8',
              }}
            ></div>
          </div>
        </div>

        {history.length > 0 && (
          <div
            style={{
              marginTop: '24px',
              padding: '14px',
              borderRadius: '12px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              textAlign,
              fontSize: '13px',
            }}
          >
            <strong>{t('voteHistory')}</strong>

            <ul style={{ marginTop: '10px', paddingInlineStart: '20px' }}>
              {history.map((item) => (
                <li key={item.id}>
                  {item.vote_option === 'yes' ? t('yesLabel') : t('noLabel')}
                  {' - '}
                  {formatDate(item.created_at)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Poll;
