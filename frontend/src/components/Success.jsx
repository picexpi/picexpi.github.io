// frontend/src/components/Success.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';

const Success = ({ transactionId, onReset }) => {
  const navigate = useNavigate();
  const { lang } = useI18n();

  const handleBackHome = () => {
    if (typeof onReset === 'function') {
      onReset();
      return;
    }

    navigate('/', { replace: true });
  };

  const styles = {
    container: {
      textAlign: 'center',
      padding: '50px 20px',
      fontFamily: 'Tahoma, sans-serif',
      direction: lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr',
      minHeight: '100vh',
      background:
        'radial-gradient(circle at top left, rgba(255,202,40,0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(111,45,189,0.32), transparent 34%), linear-gradient(135deg, #0f0820, #3c096c)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      background:
        'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))',
      border: '1px solid rgba(255,255,255,0.14)',
      padding: '34px 26px',
      borderRadius: '28px',
      boxShadow: '0 28px 70px rgba(0,0,0,0.42)',
      maxWidth: '460px',
      width: '100%',
      margin: '0 auto',
      color: '#ffffff',
      backdropFilter: 'blur(18px)',
    },
    icon: {
      fontSize: '76px',
      color: '#22c55e',
      marginBottom: '18px',
      filter: 'drop-shadow(0 0 18px rgba(34,197,94,0.35))',
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
      fontSize: '28px',
      color: '#ffffff',
      marginBottom: '10px',
      fontWeight: 950,
    },
    text: {
      fontSize: '16px',
      color: '#d8cfee',
      marginBottom: '26px',
      lineHeight: 1.8,
    },
    txId: {
      fontSize: '13px',
      color: '#d8cfee',
      wordBreak: 'break-all',
      backgroundColor: 'rgba(255,255,255,0.07)',
      border: '1px solid rgba(255,255,255,0.1)',
      padding: '13px',
      borderRadius: '14px',
      marginTop: '10px',
      marginBottom: '22px',
      lineHeight: 1.7,
    },
    button: {
      padding: '13px 30px',
      fontSize: '15px',
      background: 'linear-gradient(135deg, #ffe7a3, #ffca28, #f4b942)',
      color: '#180d31',
      border: 'none',
      borderRadius: '999px',
      cursor: 'pointer',
      fontWeight: 950,
      boxShadow: '0 16px 34px rgba(244,185,66,0.24)',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.badge}>
          picex Transaction
        </div>

        <div style={styles.icon}>✅</div>

        <h2 style={styles.title}>
          Payment Successful
        </h2>

        <p style={styles.text}>
          Your Pi payment has been registered by picex. In the full exchange
          flow, this event can be connected to wallet balance updates, deposit
          records, order access, or premium platform features.
        </p>

        <div style={styles.txId}>
          <strong>Transaction Identifier:</strong>
          <br />
          {transactionId || 'Processing...'}
        </div>

        <button
          style={styles.button}
          onClick={handleBackHome}
        >
          Back to picex Home
        </button>
      </div>
    </div>
  );
};

export default Success;
