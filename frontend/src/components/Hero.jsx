// frontend/src/components/Hero.jsx
import React, { useEffect, useState } from 'react';
import './Hero.css';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../i18n/I18nContext';

const PI_SANDBOX =
  String(import.meta.env.VITE_PI_SANDBOX ?? 'true') === 'true';

const Hero = () => {
  const auth = useAuth();
  const { t } = useI18n();

  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!window.Pi) {
      setStatus(t('piSdkNotFound'));
      return;
    }

    try {
      if (!window.__PI_SDK_INITIALIZED__) {
        window.Pi.init({
          version: '2.0',
          sandbox: PI_SANDBOX,
        });

        window.__PI_SDK_INITIALIZED__ = true;
      }

      setStatus(t('piSdkReady'));
    } catch (error) {
      console.error('Pi SDK init error:', error);
      setStatus('Pi SDK error: ' + (error?.message || error));
    }
  }, [t]);

  const onIncompletePaymentFound = (payment) => {
    console.log('Incomplete payment found:', payment);
    setStatus(t('incompletePaymentFound'));
  };

  const handlePiLogin = async () => {
    if (!auth) {
      setStatus(t('authContextMissing'));
      return;
    }

    if (!window.Pi) {
      setStatus(t('piSdkNotFound'));
      return;
    }

    try {
      setIsLoading(true);
      setStatus(t('authenticating'));

      const authResult = await window.Pi.authenticate(
        ['username', 'payments'],
        onIncompletePaymentFound
      );

      console.log('Hero Pi auth result:', authResult);

      const piUserId =
        authResult?.user?.uid ||
        authResult?.user?.id ||
        authResult?.user?._id;

      const username = authResult?.user?.username;

      if (!piUserId || !username) {
        throw new Error('Invalid Pi user data received.');
      }

      await auth.login(piUserId, username, authResult?.accessToken);

      setStatus(`${t('loginSuccess')} @${username}`);
    } catch (error) {
      console.error('Hero Pi login error:', error);

      setStatus(
        `${t('loginFailed')} ` +
          (
            error?.response?.data?.message ||
            error?.message ||
            'Authentication failed'
          )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="hero">
      <h1>{t('heroTitle')}</h1>

      <p>{t('heroDescription')}</p>

      <div className="hero-btns">
        <button
          onClick={handlePiLogin}
          className="btn-primary"
          disabled={isLoading}
        >
          {isLoading ? t('pleaseWait') : `🔐 ${t('loginWithPiWallet')}`}
        </button>
      </div>

      {status && (
        <div
          style={{
            marginTop: '16px',
            padding: '10px 14px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.12)',
            color: '#fff',
            fontSize: '13px',
            maxWidth: '520px',
            marginInline: 'auto',
            lineHeight: 1.6,
            wordBreak: 'break-word',
          }}
        >
          {status}
        </div>
      )}
    </section>
  );
};

export default Hero;
