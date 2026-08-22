// frontend/src/components/PiHomeLogin.tsx
import React, { useEffect, useState } from 'react';
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

const PiHomeLogin: React.FC = () => {
  const auth = useAuth();
  const { t } = useI18n();

  const [status, setStatus] = useState<string>('Initializing Pi SDK for picex...');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const networkLabel = PI_SANDBOX ? t('testnet') : t('mainnet');

  useEffect(() => {
    console.log('PiHomeLogin User Agent:', navigator.userAgent);
    console.log('PiHomeLogin window.Pi:', window.Pi);
    console.log('PiHomeLogin Current URL:', window.location.href);
    console.log('PiHomeLogin Current Origin:', window.location.origin);
    console.log('PiHomeLogin PI_SANDBOX:', PI_SANDBOX);

    if (!window.Pi) {
      setStatus('Pi SDK not found. Please open picex inside Pi Browser.');
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

        console.log('Pi SDK initialized from PiHomeLogin.', {
          sandbox: PI_SANDBOX,
        });
      } else if (window.__PI_SDK_SANDBOX__ !== PI_SANDBOX) {
        console.warn('Pi SDK already initialized with a different sandbox value.', {
          initializedSandbox: window.__PI_SDK_SANDBOX__,
          currentSandbox: PI_SANDBOX,
        });
      }

      setStatus(`Pi SDK ready for picex. Network: ${networkLabel}`);
    } catch (error: any) {
      console.error('Pi SDK init error:', error);
      setStatus('Pi SDK error: ' + (error?.message || String(error)));
    }
  }, [networkLabel]);

  const onIncompletePaymentFound = (payment: any) => {
    console.log('Incomplete payment found:', payment);
    setStatus('Incomplete payment found. Complete or cancel it inside Pi Browser.');
  };

  const handleLogin = async () => {
    if (!auth) {
      setStatus('Auth context is missing.');
      return;
    }

    if (!window.Pi) {
      setStatus('Pi SDK not found. Please open picex inside Pi Browser.');
      return;
    }

    if (typeof window.Pi.authenticate !== 'function') {
      setStatus('Pi authenticate function is not available.');
      return;
    }

    try {
      setIsLoading(true);
      setStatus('Authenticating with Pi for picex...');

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

      setStatus(`picex login successful. Welcome @${username}`);
    } catch (error: any) {
      console.error('Pi login error:', error);

      setStatus(
        'Login failed: ' +
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

  const handleLogout = () => {
    auth?.logout();
    setStatus(`Pi SDK ready for picex. Network: ${networkLabel}`);
  };

  const isAuthenticated = auth?.isAuthenticated;
  const user = auth?.user;

  return (
    <section
      style={{
        margin: '20px auto',
        padding: '26px',
        maxWidth: '480px',
        borderRadius: '24px',
        background:
          'linear-gradient(145deg, rgba(255,255,255,0.11), rgba(255,255,255,0.055))',
        boxShadow: '0 24px 58px rgba(0,0,0,0.34)',
        border: '1px solid rgba(255,202,40,0.24)',
        textAlign: 'center',
        fontFamily: 'sans-serif',
        color: '#ffffff',
        backdropFilter: 'blur(16px)',
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
        picex Pi Access
      </div>

      <h2 style={{ color: '#ffffff', marginBottom: '8px' }}>
        Connect with Pi
      </h2>

      <p style={{ color: '#d8cfee', fontSize: '14px', lineHeight: 1.8 }}>
        Use your Pi account to access picex, vote in governance polls, and use
        Pi payment flows. Wallet, deposit and withdrawal features will use this
        identity layer as the account entry point.
      </p>

      <div
        style={{
          display: 'inline-block',
          margin: '10px 0 18px',
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

      {!isAuthenticated ? (
        <button
          onClick={handleLogin}
          disabled={isLoading}
          style={{
            width: '100%',
            maxWidth: '270px',
            padding: '13px 22px',
            borderRadius: '999px',
            border: 'none',
            background: isLoading
              ? '#6b7280'
              : 'linear-gradient(135deg, #ffe7a3, #ffca28, #f4b942)',
            color: '#180d31',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '15px',
            fontWeight: 900,
          }}
        >
          {isLoading ? t('pleaseWait') : 'Login with Pi'}
        </button>
      ) : (
        <>
          <p style={{ color: '#d8cfee', marginTop: '10px' }}>
            Welcome,{' '}
            <strong style={{ color: '#ffca28' }}>
              @{user?.username || 'Pi User'}
            </strong>
          </p>

          <button
            onClick={handleLogout}
            style={{
              padding: '10px 18px',
              borderRadius: '999px',
              border: '1px solid rgba(248,113,113,0.55)',
              background: 'rgba(239,68,68,0.08)',
              color: '#fecaca',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 800,
            }}
          >
            {t('logout')}
          </button>
        </>
      )}

      <div
        style={{
          marginTop: '16px',
          padding: '12px',
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
    </section>
  );
};

export default PiHomeLogin;
