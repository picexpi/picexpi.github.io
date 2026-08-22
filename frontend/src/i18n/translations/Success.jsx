// frontend/src/components/Success.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';

const Success = ({ transactionId, onReset }) => {
  const navigate = useNavigate();
  const { t, isRtl } = useI18n();

  const tx = (key, fallback) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  const handleBackHome = () => {
    if (typeof onReset === 'function') {
      onReset();
      return;
    }

    navigate('/', { replace: true });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '50px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        direction: isRtl ? 'rtl' : 'ltr',
        fontFamily: 'Tahoma, sans-serif',
        background:
          'radial-gradient(circle at top left, rgba(255,202,40,0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(111,45,189,0.32), transparent 34%), linear-gradient(135deg, #0f0820, #3c096c)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '34px 26px',
          borderRadius: '28px',
          textAlign: 'center',
          color: '#ffffff',
          background:
            'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))',
          border: '1px solid rgba(255,255,255,0.14)',
          boxShadow: '0 28px 70px rgba(0,0,0,0.42)',
          backdropFilter: 'blur(18px)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            marginBottom: '14px',
            padding: '7px 14px',
            borderRadius: '999px',
            background: 'rgba(255,202,40,0.12)',
            border: '1px solid rgba(255,202,40,0.28)',
            color: '#ffca28',
            fontSize: '12px',
            fontWeight: 900,
          }}
        >
          {tx('picexTransaction', 'picex Transaction')}
        </div>

        <div
          style={{
            fontSize: '76px',
            color: '#22c55e',
            marginBottom: '18px',
            filter: 'drop-shadow(0 0 18px rgba(34,197,94,0.35))',
          }}
        >
          ✅
        </div>

        <h2
          style={{
            fontSize: '28px',
            color: '#ffffff',
            marginBottom: '10px',
            fontWeight: 950,
          }}
        >
          {tx('paymentSuccessful', 'Payment successful')}
        </h2>

        <p
          style={{
            fontSize: '16px',
            color: '#d8cfee',
            marginBottom: '26px',
            lineHeight: 1.8,
          }}
        >
          {tx('transactionRegistered', 'Your transaction has been registered successfully.')}
        </p>

        <div
          style={{
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
          }}
        >
          <strong>{tx('transactionIdentifier', 'Transaction ID')}:</strong>
          <br />
          {transactionId || tx('processing', 'Processing...')}
        </div>

        <button
          type="button"
          onClick={handleBackHome}
          style={{
            padding: '13px 30px',
            fontSize: '15px',
            background: 'linear-gradient(135deg, #ffe7a3, #ffca28, #f4b942)',
            color: '#180d31',
            border: 'none',
            borderRadius: '999px',
            cursor: 'pointer',
            fontWeight: 950,
            boxShadow: '0 16px 34px rgba(244,185,66,0.24)',
          }}
        >
          {tx('backToHome', 'Back to home')}
        </button>
      </div>
    </div>
  );
};

export default Success;
