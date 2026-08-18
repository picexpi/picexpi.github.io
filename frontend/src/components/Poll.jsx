// frontend/src/components/Poll.jsx
import React, { useEffect, useState } from 'react';
import './Poll.css';
import { useI18n } from '../i18n/I18nContext';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://pidao.bonto.run/api';

const Poll = () => {
  const { t, lang } = useI18n();
  const auth = useAuth();

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

  const textAlign = lang === 'fa' || lang === 'ar' ? 'right' : 'left';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * وقتی کاربر از PiTestnetPayment یا SignIn لاگین می‌کند،
   * AuthContext و localStorage آپدیت می‌شوند.
   * با این useEffect، Poll دوباره وضعیت رأی کاربر را می‌گیرد.
   */
  useEffect(() => {
    if (auth?.isAuthenticated && getToken()) {
      fetchPoll();
      fetchVoteHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.isAuthenticated]);

  const handleVote = async (option) => {
    const token = getToken();

    if (!auth?.isAuthenticated || !token) {
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
      lang === 'fa'
        ? 'fa-IR'
        : lang === 'tr'
          ? 'tr-TR'
          : lang === 'zh'
            ? 'zh-CN'
            : lang === 'hi'
              ? 'hi-IN'
              : lang === 'ar'
                ? 'ar'
                : 'en-US'
    );
  };

  if (loading) {
    return (
      <section id="poll" className="poll-section">
        <div className="poll-container">
          <div className="poll-badge">
            {t('digShortName')} · {t('governance')}
          </div>

          <p className="poll-loading-text">
            {t('pollLoading')}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="poll" className="poll-section">
      <div className="poll-container">
        <div className="poll-badge">
          {t('digShortName')} · {t('governance')}
        </div>

        <h2 className="poll-question">
          {t('pollQuestion')}
        </h2>

        <p className="poll-description">
          {t('pollDescription')}
        </p>

        <div className="poll-total">
          <span>{t('totalVotes')}</span>
          <strong>{votes.total}</strong>
        </div>

        {!userVote ? (
          <div className="poll-options">
            <button
              className="poll-btn poll-btn-yes"
              onClick={() => handleVote('yes')}
              disabled={voting}
            >
              {voting ? t('processing') : t('pollYes')}
            </button>

            <button
              className="poll-btn poll-btn-no"
              onClick={() => handleVote('no')}
              disabled={voting}
            >
              {voting ? t('processing') : t('pollNo')}
            </button>
          </div>
        ) : (
          <div className="poll-user-vote">
            <div>
              {t('yourVote')}:{' '}
              <strong>
                {userVote.option === 'yes' ? t('yesLabel') : t('noLabel')}
              </strong>
            </div>

            <span>
              {t('voteDate')}: {formatDate(userVote.createdAt)}
            </span>
          </div>
        )}

        {(message || error) && (
          <div className={error ? 'poll-alert poll-alert-error' : 'poll-alert'}>
            {error || message}
          </div>
        )}

        <div className="poll-results">
          <div
            className="poll-result-label"
            style={{ textAlign }}
          >
            <span>{t('yesLabel')}</span>
            <strong>{votes.yesPercent}% ({votes.yes})</strong>
          </div>

          <div className="result-bar-container">
            <div
              className="result-bar result-bar-yes"
              style={{
                width: `${votes.yesPercent}%`,
              }}
            ></div>
          </div>

          <div
            className="poll-result-label poll-result-label-no"
            style={{ textAlign }}
          >
            <span>{t('noLabel')}</span>
            <strong>{votes.noPercent}% ({votes.no})</strong>
          </div>

          <div className="result-bar-container">
            <div
              className="result-bar result-bar-no"
              style={{
                width: `${votes.noPercent}%`,
              }}
            ></div>
          </div>
        </div>

        {history.length > 0 && (
          <div
            className="poll-history"
            style={{ textAlign }}
          >
            <strong>{t('voteHistory')}</strong>

            <ul>
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
