// frontend/src/components/History.jsx
import React, { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nContext';

const API_BASE_URL =
  (import.meta.env.VITE_API_URL || 'https://picex.bonto.run/api').replace(
    /\/+$/,
    ''
  );

/**
 * @param {{ onPaymentSuccess?: (txid: string) => void, onPaymentError?: (err: any) => void }} props
 */
const History = (props) => {
  const { onPaymentError = () => {} } = props;
  const { t, lang } = useI18n();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const direction = lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr';

  const tx = (key, fallback) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');

        const response = await fetch(`${API_BASE_URL}/payment/history`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setTransactions(Array.isArray(data.data) ? data.data : []);
        } else {
          setError(data.message || tx('serverConnectionError', 'Server connection error.'));
          onPaymentError(data);
        }
      } catch (err) {
        console.error('History fetch error:', err);
        setError(tx('serverConnectionError', 'Server connection error.'));
        onPaymentError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTransactionId = (txItem) => {
    return (
      txItem.piTransactionId ||
      txItem.txid ||
      txItem.payment_id ||
      txItem.paymentId ||
      txItem.order_id ||
      txItem.orderId ||
      txItem.id ||
      'N/A'
    );
  };

  const getProductName = (txItem) => {
    return (
      txItem.metadata?.productName ||
      txItem.productName ||
      txItem.product?.name ||
      txItem.order_id ||
      txItem.orderId ||
      txItem.paymentType ||
      'picex Pi Payment'
    );
  };

  const getAmount = (txItem) => {
    const currency = txItem.currency || txItem.network || 'PI';
    return `${txItem.amount ?? 'N/A'} ${String(currency).toUpperCase()}`;
  };

  const getDate = (txItem) => {
    return (
      txItem.createdAt ||
      txItem.created_at ||
      txItem.approved_at ||
      txItem.completed_at ||
      null
    );
  };

  const getStatusLabel = (status) => {
    const normalized = String(status || '').toUpperCase();

    if (normalized === 'COMPLETED' || normalized === 'SUCCESS') {
      return tx('successful', 'Successful');
    }

    if (normalized === 'APPROVED') {
      return tx('approved', 'Approved');
    }

    if (normalized === 'PENDING') {
      return tx('pending', 'Pending');
    }

    if (normalized === 'CANCELLED' || normalized === 'CANCELED') {
      return tx('cancelled', 'Cancelled');
    }

    if (normalized === 'FAILED' || normalized === 'ERROR') {
      return tx('failed', 'Failed');
    }

    return status || tx('unknown', 'Unknown');
  };

  const getStatusClassName = (status) => {
    const normalized = String(status || '').toUpperCase();

    if (normalized === 'COMPLETED' || normalized === 'SUCCESS') {
      return 'history-status success';
    }

    if (normalized === 'APPROVED') {
      return 'history-status approved';
    }

    if (normalized === 'PENDING') {
      return 'history-status pending';
    }

    if (normalized === 'CANCELLED' || normalized === 'CANCELED') {
      return 'history-status cancelled';
    }

    return 'history-status failed';
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';

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
      <div style={{ ...styles.page, direction }}>
        <div style={styles.card}>
          <div style={styles.badge}>picex Activity</div>
          <p style={styles.center}>{tx('loading', 'Loading...')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ ...styles.page, direction }}>
        <div style={styles.card}>
          <div style={styles.badge}>picex Activity</div>
          <div style={styles.errorBox}>
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...styles.page, direction }}>
      <div style={styles.card}>
        <div style={styles.badge}>picex Payment History</div>

        <h2 style={styles.title}>
          {tx('historyTitle', 'Payment & Wallet Activity')}
        </h2>

        <p style={styles.subtitle}>
          {tx(
            'picexHistorySubtitle',
            'Track your Pi payment approvals, completions, transaction IDs, and future wallet-related activity records.'
          )}
        </p>

        {transactions.length === 0 ? (
          <p style={styles.center}>
            {tx('noTransactions', 'No transactions found.')}
          </p>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>{tx('transactionId', 'Transaction ID')}</th>
                  <th style={styles.th}>{tx('amount', 'Amount')}</th>
                  <th style={styles.th}>{tx('product', 'Purpose')}</th>
                  <th style={styles.th}>{tx('status', 'Status')}</th>
                  <th style={styles.th}>{tx('date', 'Date')}</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((txItem, index) => {
                  const transactionId = String(getTransactionId(txItem));
                  const displayId =
                    transactionId.length > 16
                      ? `${transactionId.substring(0, 16)}...`
                      : transactionId;

                  return (
                    <tr
                      key={txItem.id || txItem._id || txItem.orderId || txItem.order_id || index}
                      style={styles.tableRow}
                    >
                      <td style={styles.td} title={transactionId}>
                        {displayId}
                      </td>

                      <td style={styles.td}>
                        {getAmount(txItem)}
                      </td>

                      <td style={styles.td}>
                        {getProductName(txItem)}
                      </td>

                      <td style={styles.td}>
                        <span className={getStatusClassName(txItem.status)}>
                          {getStatusLabel(txItem.status)}
                        </span>
                      </td>

                      <td style={styles.td}>
                        {formatDate(getDate(txItem))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>
        {`
          .history-status {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 6px 11px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 900;
            white-space: nowrap;
          }

          .history-status.success {
            background: rgba(34, 197, 94, 0.12);
            color: #86efac;
            border: 1px solid rgba(34, 197, 94, 0.24);
          }

          .history-status.approved {
            background: rgba(59, 130, 246, 0.12);
            color: #bfdbfe;
            border: 1px solid rgba(59, 130, 246, 0.24);
          }

          .history-status.pending {
            background: rgba(255, 202, 40, 0.13);
            color: #ffca28;
            border: 1px solid rgba(255, 202, 40, 0.26);
          }

          .history-status.cancelled,
          .history-status.failed {
            background: rgba(239, 68, 68, 0.12);
            color: #fecaca;
            border: 1px solid rgba(239, 68, 68, 0.24);
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    padding: '80px 20px',
    fontFamily: 'Tahoma, sans-serif',
    background:
      'radial-gradient(circle at top left, rgba(255,202,40,0.14), transparent 30%), radial-gradient(circle at bottom right, rgba(111,45,189,0.32), transparent 34%), linear-gradient(180deg, #0f0820 0%, #180d31 100%)',
    color: '#ffffff',
  },
  card: {
    width: 'min(1100px, 100%)',
    margin: '0 auto',
    padding: '32px 24px',
    borderRadius: '28px',
    background:
      'linear-gradient(145deg, rgba(255,255,255,0.11), rgba(255,255,255,0.055))',
    border: '1px solid rgba(255,255,255,0.14)',
    boxShadow: '0 28px 70px rgba(0,0,0,0.38)',
    backdropFilter: 'blur(16px)',
  },
  badge: {
    display: 'inline-flex',
    marginBottom: '14px',
    padding: '7px 14px',
    borderRadius: '999px',
    background: 'rgba(255,202,40,0.12)',
    border: '1px solid rgba(255,202,40,0.28)',
    color: '#ffca28',
    fontSize: '12px',
    fontWeight: 900,
  },
  title: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: '30px',
    margin: '0 0 10px',
    fontWeight: 950,
  },
  subtitle: {
    maxWidth: '720px',
    margin: '0 auto 26px',
    textAlign: 'center',
    color: '#d8cfee',
    fontSize: '15px',
    lineHeight: 1.8,
  },
  center: {
    textAlign: 'center',
    marginTop: '18px',
    color: '#d8cfee',
  },
  errorBox: {
    marginTop: '18px',
    padding: '14px',
    borderRadius: '14px',
    background: 'rgba(239,68,68,0.12)',
    color: '#fecaca',
    border: '1px solid rgba(239,68,68,0.24)',
    textAlign: 'center',
  },
  tableWrapper: {
    overflowX: 'auto',
    marginTop: '20px',
    borderRadius: '18px',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'rgba(255,255,255,0.04)',
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: 'rgba(255,202,40,0.12)',
    color: '#ffca28',
  },
  th: {
    padding: '14px',
    textAlign: 'center',
    fontSize: '13px',
    whiteSpace: 'nowrap',
  },
  td: {
    padding: '14px',
    textAlign: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    color: '#d8cfee',
    fontSize: '13px',
    whiteSpace: 'nowrap',
  },
  tableRow: {
    transition: 'background 0.3s',
  },
};

export default History;
