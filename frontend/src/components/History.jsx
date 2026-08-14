// frontend/src/components/History.jsx
import React, { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nContext';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://pidao.bonto.run/api';

/**
 * @param {{ onPaymentSuccess?: (txid: string) => void, onPaymentError?: (err: any) => void }} props
 */
const History = (props) => {
  const { onPaymentSuccess = () => {}, onPaymentError = () => {} } = props;
  const { t, lang } = useI18n();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const direction = lang === 'fa' ? 'rtl' : 'ltr';

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
          setError(data.message || t('serverConnectionError'));
          onPaymentError(data);
        }
      } catch (err) {
        console.error('History fetch error:', err);
        setError(t('serverConnectionError'));
        onPaymentError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [t, onPaymentError]);

  const getTransactionId = (tx) => {
    return (
      tx.piTransactionId ||
      tx.txid ||
      tx.paymentId ||
      tx.orderId ||
      tx.id ||
      'N/A'
    );
  };

  const getProductName = (tx) => {
    return (
      tx.metadata?.productName ||
      tx.productName ||
      tx.product?.name ||
      tx.orderId ||
      'N/A'
    );
  };

  const getAmount = (tx) => {
    const currency = tx.currency || 'Pi';
    return `${tx.amount ?? 'N/A'} ${currency}`;
  };

  const getStatusLabel = (status) => {
    const normalized = String(status || '').toUpperCase();

    if (normalized === 'COMPLETED' || normalized === 'SUCCESS') {
      return t('successful');
    }

    if (normalized === 'APPROVED') {
      return t('approved');
    }

    if (normalized === 'PENDING') {
      return t('pending');
    }

    if (normalized === 'CANCELLED') {
      return t('cancelled');
    }

    return t('failed');
  };

  const getStatusStyle = (status) => {
    const normalized = String(status || '').toUpperCase();

    if (normalized === 'COMPLETED' || normalized === 'SUCCESS') {
      return {
        backgroundColor: '#d4edda',
        color: '#155724',
      };
    }

    if (normalized === 'APPROVED') {
      return {
        backgroundColor: '#d1ecf1',
        color: '#0c5460',
      };
    }

    if (normalized === 'PENDING') {
      return {
        backgroundColor: '#fff3cd',
        color: '#856404',
      };
    }

    return {
      backgroundColor: '#f8d7da',
      color: '#721c24',
    };
  };

  if (loading) {
    return <div style={styles.center}>{t('loading')}</div>;
  }

  if (error) {
    return (
      <div style={{ ...styles.center, color: 'red' }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ ...styles.container, direction }}>
      <h2 style={styles.title}>{t('historyTitle')}</h2>

      {transactions.length === 0 ? (
        <p style={styles.center}>{t('noTransactions')}</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>{t('transactionId')}</th>
                <th style={styles.th}>{t('amount')}</th>
                <th style={styles.th}>{t('product')}</th>
                <th style={styles.th}>{t('status')}</th>
                <th style={styles.th}>{t('date')}</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx, index) => {
                const transactionId = String(getTransactionId(tx));
                const displayId =
                  transactionId.length > 12
                    ? `${transactionId.substring(0, 12)}...`
                    : transactionId;

                const statusStyle = getStatusStyle(tx.status);

                return (
                  <tr key={tx.id || tx._id || tx.orderId || index} style={styles.tableRow}>
                    <td style={styles.td}>{displayId}</td>

                    <td style={styles.td}>{getAmount(tx)}</td>

                    <td style={styles.td}>{getProductName(tx)}</td>

                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.status,
                          ...statusStyle,
                        }}
                      >
                        {getStatusLabel(tx.status)}
                      </span>
                    </td>

                    <td style={styles.td}>
                      {tx.createdAt
                        ? new Date(tx.createdAt).toLocaleDateString(
                            lang === 'fa' ? 'fa-IR' : lang === 'tr' ? 'tr-TR' : 'en-US'
                          )
                        : 'N/A'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Tahoma, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  center: {
    textAlign: 'center',
    marginTop: '50px',
    fontFamily: 'Tahoma, sans-serif',
  },
  tableWrapper: {
    overflowX: 'auto',
    marginTop: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
  },
  tableHeader: {
    backgroundColor: '#4A90E2',
    color: '#fff',
  },
  th: {
    padding: '12px',
    textAlign: 'center',
  },
  td: {
    padding: '12px',
    textAlign: 'center',
    borderBottom: '1px solid #eee',
  },
  tableRow: {
    transition: 'background 0.3s',
  },
  status: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
};

export default History;
      
