// frontend/src/components/SignIn.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

declare global {
  interface Window {
    Pi?: any;
    __PI_SDK_INITIALIZED__?: boolean;
  }
}

const SignIn: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [status, setStatus] = useState<string>('Initializing Pi SDK...');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!window.Pi) {
      setStatus('Pi SDK not found. Please open this app inside Pi Browser.');
      return;
    }

    try {
      // جلوگیری از اجرای دوباره Pi.init در React StrictMode
      if (!window.__PI_SDK_INITIALIZED__) {
        window.Pi.init({
          version: '2.0',
          sandbox: true,
        });

        window.__PI_SDK_INITIALIZED__ = true;
      }

      setStatus('Pi SDK is ready. You can login with Pi.');
    } catch (error: any) {
      console.error('Pi SDK init error:', error);
      setStatus('Pi SDK init error: ' + (error?.message || error));
    }
  }, []);

  const onIncompletePaymentFound = (payment: any) => {
    console.log('Incomplete payment found:', payment);
  };

  const handlePiLogin = async () => {
    if (!auth) {
      setStatus('Auth context is not available.');
      return;
    }

    if (!window.Pi) {
      setStatus('Pi SDK not available. Please open this website in Pi Browser.');
      return;
    }

    try {
      setIsLoading(true);
      setStatus('Authenticating with Pi...');

      const authResult = await window.Pi.authenticate(
        ['username', 'payments'],
        onIncompletePaymentFound
      );

      console.log('Pi authentication result:', authResult);

      const piUserId =
        authResult?.user?.uid ||
        authResult?.user?.id ||
        authResult?.user?._id;

      const username = authResult?.user?.username;

      if (!piUserId || !username) {
        throw new Error('Invalid Pi user data received.');
      }

      // اتصال نتیجه Pi SDK به سیستم AuthContext فعلی پروژه
      await auth.login(piUserId, username);

      setStatus('Login successful. Redirecting...');
      navigate('/', { replace: true });
    } catch (error: any) {
      console.error('Pi login error:', error);

      setStatus(
        'Login failed: ' +
          (
            error?.response?.data?.message ||
            error?.message ||
            'User cancelled or authentication failed'
          )
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
        background: 'linear-gradient(135deg, #311b92, #673ab7)',
        padding: '20px',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: '#ffffff',
          borderRadius: '22px',
          padding: '32px 24px',
          textAlign: 'center',
          boxShadow: '0 20px 45px rgba(0,0,0,0.25)',
        }}
      >
        <h1
          style={{
            color: '#673ab7',
            marginBottom: '8px',
            fontSize: '28px',
          }}
        >
          Pi DAO Login
        </h1>

        <p
          style={{
            color: '#666',
            marginBottom: '24px',
            fontSize: '15px',
          }}
        >
          Sign in with your Pi Network account.
        </p>

        <button
          onClick={handlePiLogin}
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: '30px',
            border: 'none',
            background: isLoading ? '#999' : '#673ab7',
            color: '#fff',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 700,
          }}
        >
          {isLoading ? 'Please wait...' : 'Login with Pi'}
        </button>

        <div
          style={{
            marginTop: '20px',
            padding: '12px',
            borderRadius: '10px',
            background: '#f5f5f5',
            color: '#444',
            fontSize: '13px',
            wordBreak: 'break-word',
            lineHeight: 1.5,
          }}
        >
          {status}
        </div>

        <p
          style={{
            marginTop: '16px',
            color: '#999',
            fontSize: '12px',
          }}
        >
          Please use Pi Browser for authentication.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
