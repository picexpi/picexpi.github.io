// frontend/src/components/SignIn.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../i18n/I18nContext';

declare global {
  interface Window {
    Pi?: any;
    __PI_SDK_INITIALIZED__?: boolean;
    __PI_SDK_SANDBOX__?: boolean;
  }
}

const parseBooleanEnv = (value: unknown, defaultValue = false): boolean => {
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }

  return String(value).trim().toLowerCase() === 'true';
};

const PI_SANDBOX = parseBooleanEnv(import.meta.env.VITE_PI_SANDBOX, false);

const SignIn: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useI18n();

  const [status, setStatus] = useState<string>(t('initializingPiSdk'));
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const networkLabel = PI_SANDBOX ? t('testnet') : t('mainnet');

  useEffect(() => {
    console.log('SignIn User Agent:', navigator.userAgent);
    console.log('SignIn window.Pi:', window.Pi);
    console.log('SignIn Current URL:', window.location.href);
    console.log('SignIn Current Origin:', window.location.origin);
    console.log('SignIn PI_SANDBOX:', PI_SANDBOX);

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
        window.__PI_SDK_SANDBOX__ = PI_SANDBOX;

        console.log('Pi SDK initialized from SignIn.', {
          sandbox: PI_SANDBOX,
        });
      } else if (window.__PI_SDK_SANDBOX__ !== PI_SANDBOX) {
        console.warn(
          'Pi SDK was already initialized with a different sandbox value.',
          {
            initializedSandbox: window.__PI_SDK_SANDBOX__,
            currentSandbox: PI_SANDBOX,
          }
        );
      }

      setStatus(`${t('piSdkReady')} ${t('network')}: ${networkLabel}`);
    } catch (error: any) {
      console.error('Pi SDK init error:', error);
      setStatus(
        `${t('loginFailed')} ${error?.message || String(error)}`
      );
    }
  }, [networkLabel, t]);

  const onIncompletePaymentFound = (payment: any) => {
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

    if (typeof window.Pi.authenticate !== 'function') {
      setStatus('Pi authenticate function is not available.');
      return;
    }

    try {
      setIsLoading(true);
      setStatus(t('authenticating'));

      const authResult = await window.Pi.authenticate(
        ['username', 'payments'],
        onIncompletePaymentFound
      );

      console.log('Pi authentication result:', authResult);

      const piUserId =
        authResult?.user?.uid ||
        authResult?.user?.id ||
        authResult?.user?._id ||
        authResult?.uid ||
        authResult?.id;

      const username =
        authResult?.user?.username ||
        authResult?.username ||
        'Pi User';

      const accessToken =
        authResult?.accessToken ||
        authResult?.access_token ||
        authResult?.token;

      if (!piUserId) {
        throw new Error('Invalid Pi user data received. Missing user id.');
      }

      await auth.login(String(piUserId), String(username), accessToken);

      setStatus(`${t('loginSuccess')} ${t('redirecting')}`);
      navigate('/', { replace: true });
    } catch (error: any) {
      console.error('Pi login error:', error);

      setStatus(
        `${t('loginFailed')} ${
          error?.response?.data?.message ||
          error?.message ||
          'User cancelled or authentication failed'
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(circle at top left, rgba(255,202,40,0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(111,45,189,0.32), transparent 34%), linear-gradient(135deg, #0f0820, #3c096c)',
        padding: '20px',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background:
            'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: '28px',
          padding: '34px 26px',
          textAlign: 'center',
          boxShadow: '0 28px 70px rgba(0,0,0,0.42)',
          color: '#ffffff',
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
          {t('brandName')} Account
        </div>

        <h1
          style={{
            color: '#ffffff',
            marginBottom: '8px',
            fontSize: '30px',
            fontWeight: 950,
          }}
        >
          {t('signInTitle')}
        </h1>

        <p
          style={{
            color: '#d8cfee',
            marginBottom: '16px',
            fontSize: '15px',
            lineHeight: 1.7,
          }}
        >
          {t('signInDescription')}
        </p>

        <div
          style={{
            display: 'inline-block',
            marginBottom: '22px',
            padding: '6px 12px',
            borderRadius: '999px',
            background: PI_SANDBOX
              ? 'rgba(255,152,0,0.14)'
              : 'rgba(34,197,94,0.12)',
            color: PI_SANDBOX ? '#ffb74d' : '#86efac',
            border: PI_SANDBOX
              ? '1px solid rgba(255,152,0,0.24)'
              : '1px solid rgba(34,197,94,0.22)',
            fontSize: '12px',
            fontWeight: 800,
          }}
        >
          {t('network')}: {networkLabel}
        </div>

        <button
          onClick={handlePiLogin}
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: '999px',
            border: 'none',
            background: isLoading
              ? '#6b7280'
              : 'linear-gradient(135deg, #ffe7a3, #ffca28, #f4b942)',
            color: '#180d31',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 950,
            boxShadow: '0 16px 34px rgba(244,185,66,0.24)',
          }}
        >
          {isLoading ? t('pleaseWait') : t('loginWithPi')}
        </button>

        <div
          style={{
            marginTop: '20px',
            padding: '13px',
            borderRadius: '14px',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#d8cfee',
            fontSize: '13px',
            wordBreak: 'break-word',
            lineHeight: 1.6,
          }}
        >
          {status}
        </div>

        <p
          style={{
            marginTop: '16px',
            color: '#b9aed5',
            fontSize: '12px',
            lineHeight: 1.6,
          }}
        >
          {t('pleaseUsePiBrowser')}
        </p>
      </div>
    </div>
  );
};

export default SignIn;
