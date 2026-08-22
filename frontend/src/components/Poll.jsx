// frontend/src/components/Poll.jsx
import React, { useEffect, useState } from 'react';
import './Poll.css';
import { useI18n } from '../i18n/I18nContext';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://picex.bonto.run/api';

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

  const [pollData, setPollData] = useState(null);
  const [userVote, setUserVote] = useState(null);
  const [history, setHistory] = useState([]);

  const textAlign = lang === 'fa' || lang === 'ar' ? 'right' : 'left';

  const tx = (key, fallback) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const getLocalizedQuestion = () => {
    const fallbackQuestion = tx(
      'picexPollQuestion',
      'Should picex prioritize Spot Market and Wallet Deposit/Withdraw before launching Futures?'
    );

    if (!pollData) {
      return fallbackQuestion;
    }

    if (lang === 'fa') return pollData.questionFa || pollData.question || fallbackQuestion;
    if (lang === 'en') return pollData.questionEn || pollData.question || fallbackQuestion;
    if (lang === 'tr') return pollData.questionTr || pollData.question || fallbackQuestion;
    if (lang === 'zh') return pollData.questionZh || pollData.question || fallbackQuestion;
    if (lang === 'hi') return pollData.questionHi || pollData.question || fallbackQuestion;
    if (lang === 'ar') return pollData.questionAr || pollData.question || fallbackQuestion;

    return pollData.question || fallbackQuestion;
  };

  const maskUsername = (username) => {
    if (!username) return '@Pi***';

    const clean = String(username).replace(/^@/, '').trim();

    if (!clean) return '@Pi***';

    if (clean.length <= 2) {
      return `@${clean[0] || 'P'}***`;
    }

    if (clean.length <= 5) {
      return `@${clean.slice(0, 2)}***`;
    }

    const visiblePart = clean.slice(0, Math.min(4, clean.length - 2));
    const hiddenLength = Math.max(3, clean.length - visiblePart.length);

    return `@${visiblePart}${'*'.repeat(hiddenLength)}`;
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
        throw new Error(
          data.message ||
          tx('pollConnectionError', 'Unable to connect to the poll service.')
        );
      }

      setVotes(data.data.votes);
      setUserVote(data.data.userVote);
      setPollData(data.data.poll || null);
    } catch (err) {
      console.error('Poll fetch error:', err);
      setError(
        err.message ||
        tx('pollConnectionError', 'Unable to connect to the poll service.')
      );
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
      setMessage(tx('pollLoginRequired', 'Please connect with Pi before voting.'));
      return;
    }

    if (userVote) {
      setMessage(tx('pollAlreadyVoted', 'You have already voted in this poll.'));
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
          setPollData(data.data.poll || null);
          setMessage(tx('pollAlreadyVoted', 'You have already voted in this poll.'));
          return;
        }

        throw new Error(
          data.message ||
          tx('pollConnectionError', 'Unable to connect to the poll service.')
        );
      }

      setVotes(data.data.votes);
      setUserVote(data.data.userVote);
      setPollData(data.data.poll || null);
      setMessage(tx('pollVoteSuccess', 'Your vote has been recorded successfully.'));

      await fetchVoteHistory();
    } catch (err) {
      console.error('Poll vote error:', err);
      setError(
        err.message ||
        tx('pollConnectionError', 'Unable to connect to the poll service.')
      );
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
            picex · {tx('governance', 'Governance')}
          </div>

          <p className="poll-loading-text">
            {tx('pollLoading', 'Loading governance poll...')}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="poll" className="poll-section">
      <div className="poll-container">
        <div className="poll-badge">
          picex · {tx('governance', 'Governance')}
        </div>

        <h2 className="poll-question">
          {getLocalizedQuestion()}
        </h2>

        <p className="poll-description">
          {tx(
            'picexPollDescription',
            'picex governance polls help the community guide product priorities such as spot trading, wallet operations, AI support, native charts, and futures readiness.'
          )}
        </p>

        <div className="poll-total">
          <span>{tx('totalVotes', 'Total votes')}</span>
          <strong>{votes.total}</strong>
        </div>

        {!userVote ? (
          <div className="poll-options">
            <button
              className="poll-btn poll-btn-yes"
              onClick={() => handleVote('yes')}
              disabled={voting}
            >
              {voting ? tx('processing', 'Processing...') : tx('pollYes', 'Yes')}
            </button>

            <button
              className="poll-btn poll-btn-no"
              onClick={() => handleVote('no')}
              disabled={voting}
            >
              {voting ? tx('processing', 'Processing...') : tx('pollNo', 'No')}
            </button>
          </div>
        ) : (
          <div className="poll-user-vote">
            <div>
              {tx('yourVote', 'Your vote')}:{' '}
              <strong>
                {userVote.option === 'yes'
                  ? tx('yesLabel', 'Yes')
                  : tx('noLabel', 'No')}
              </strong>
            </div>

            <span>
              {tx('voteDate', 'Vote date')}: {formatDate(userVote.createdAt)}
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
            <span>{tx('yesLabel', 'Yes')}</span>
            <strong>{votes.yesPercent}% ({votes.yes})</strong>
          </div>

          <div className="result-bar-container">
            <div
              className="result-bar result-bar-yes"
              style={{
                width: `${votes.yesPercent}%`,
              }}
            />
          </div>

          <div
            className="poll-result-label poll-result-label-no"
            style={{ textAlign }}
          >
            <span>{tx('noLabel', 'No')}</span>
            <strong>{votes.noPercent}% ({votes.no})</strong>
          </div>

          <div className="result-bar-container">
            <div
              className="result-bar result-bar-no"
              style={{
                width: `${votes.noPercent}%`,
              }}
            />
          </div>
        </div>

        {history.length > 0 && (
          <div
            className="poll-history"
            style={{ textAlign }}
          >
            <strong>{tx('voteHistory', 'Vote history')}</strong>

            <ul>
              {history.map((item) => (
                <li key={item.id}>
                  {item.question_snapshot && (
                    <div className="poll-history-question">
                      {item.question_snapshot}
                    </div>
                  )}

                  <div className="poll-history-meta">
                    <span className="poll-history-user">
                      {maskUsername(item.username)}
                    </span>

                    <span className="poll-history-separator"> · </span>

                    <span>
                      {item.vote_option === 'yes'
                        ? tx('yesLabel', 'Yes')
                        : tx('noLabel', 'No')}
                    </span>

                    <span className="poll-history-separator"> - </span>

                    <span>
                      {formatDate(item.created_at)}
                    </span>
                  </div>
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
