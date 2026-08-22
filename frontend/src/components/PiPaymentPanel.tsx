// frontend/src/components/PiPaymentPanel.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../lib/axiosClient';

declare global {
  interface Window {
    Pi?: any;
    __PI_SDK_INITIALIZED__?: boolean;
    __PI_SDK_SANDBOX__?: boolean;
  }
}

const API_BASE_URL =
  (import.meta.env.VITE_API_URL || 'https://picex.bonto.run/api').replace(
    /\/+$/,
    ''
  );

const parseBooleanEnv = (value: unknown, defaultValue = false): boolean => {
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }

  return String(value).trim().toLowerCase() === 'true';
};

/**
 * Mainnet by default.
 * For Sandbox/Testnet set:
 * VITE_PI_SANDBOX=true
 */
const PI_SANDBOX = parseBooleanEnv(import.meta.env.VITE_PI_SANDBOX, false);

const DEFAULT_AMOUNT = import.meta.env.VITE_DEFAULT_PI_AMOUNT || '0.01';
const MIN_AMOUNT = Number(import.meta.env.VITE_MIN_PI_AMOUNT || '0.001');
const MAX_AMOUNT = Number(import.meta.env.VITE_MAX_PI_AMOUNT || '100');

function getHealthUrl() {
  if (!API_BASE_URL) return '';
  return API_BASE_URL.replace(/\/api\/?$/, '') + '/health';
}

const PiPaymentPanel: React.FC = () => {
  const auth = useAuth();

  const [status, setStatus] = useState<string>('Initializing Pi SDK for picex...');
  const [username, setUsername] = useState<string>('');
  const [isPaying, setIsPaying] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>(DEFAULT_AMOUNT);

  const isAuthenticated = Boolean(auth?.isAuthenticated);
  const currentUsername = auth?.user?.username || username;

  const networkLabel = PI_SANDBOX ? 'Testnet' : 'Mainnet';
  const networkValue = PI_SANDBOX ? 'testnet' : 'mainnet';

  useEffect(() => {
    console.log('picex User Agent:', navigator.userAgent);
    console.log('window.Pi:', window.Pi);
    console.log('Current URL:', window.location.href);
    console.log('Current Origin:', window.location.origin);
    console.log('API_BASE_URL:', API_BASE_URL);
    console.log('PI_SANDBOX:', PI_SANDBOX);

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

        console.log('Pi SDK initialized successfully for picex.', {
          sandbox: PI_SANDBOX,
        });
      } else if (window.__PI_SDK_SANDBOX__ !== PI_SANDBOX) {
        console.warn('Pi SDK was already initialized with another sandbox value.', {
          initializedSandbox: window.__PI_SDK_SANDBOX__,
          currentSandbox: PI_SANDBOX,
        });
      }

      setStatus(`Pi SDK ready for picex. Network: ${networkLabel}`);
    } catch (error: any) {
      console.error('Pi SDK init error:', error);
      setStatus('Pi SDK init error: ' + (error?.message || String(error)));
    }
  }, [networkLabel]);

  useEffect(() => {
    if (auth?.user?.username) {
      setUsername(auth.user.username);
    }
  }, [auth?.user?.username]);

  const onIncompletePaymentFound = (payment: any) => {
    console.log('Incomplete payment found:', payment);
    setStatus(
      'Incomplete Pi payment found. Please complete or cancel it in Pi Browser before starting a new picex payment.'
    );
  };

  const warmUpBackend = async () => {
    if (!API_BASE_URL) {
      throw new Error('VITE_API_URL is not set.');
    }

    const healthUrl = getHealthUrl();

    if (!healthUrl) {
      return;
    }

    console.log('Warming up picex backend:', healthUrl);
    setStatus('Warming up picex backend...');

    try {
      await fetch(healthUrl, {
        method: 'GET',
      });
    } catch (error) {
      console.warn('Backend warm-up failed:', error);
    }
  };

  const loginWithPi = async () => {
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
      setIsLoggingIn(true);
      setStatus('Authenticating with Pi for picex...');

      const authResult = await window.Pi.authenticate(
        ['username', 'payments'],
        onIncompletePaymentFound
      );

      console.log('Pi auth result:', authResult);

      const piUserId =
        authResult?.user?.uid ||
        authResult?.user?.id ||
        authResult?.user?._id ||
        authResult?.uid ||
        authResult?.id;

      const piUsername =
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

      await auth.login(String(piUserId), String(piUsername), accessToken);

      setUsername(String(piUsername));
      setStatus(`picex login successful. Welcome @${piUsername}`);
    } catch (error: any) {
      console.error('Pi auth error:', error);

      setStatus(
        'Login failed: ' +
          (
            error?.response?.data?.message ||
            error?.message ||
            'User cancelled or authentication failed'
          )
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    auth?.logout();
    setUsername('');
    setStatus(`Pi SDK ready for picex. Network: ${networkLabel}`);
  };

  const validateAmount = () => {
    const parsedAmount = Number(amount);

    if (Number.isNaN(parsedAmount)) {
      return {
        valid: false,
        value: 0,
        message: 'Please enter a valid Pi amount.',
      };
    }

    if (parsedAmount < MIN_AMOUNT) {
      return {
        valid: false,
        value: parsedAmount,
        message: `Minimum amount is ${MIN_AMOUNT} Pi.`,
      };
    }

    if (parsedAmount > MAX_AMOUNT) {
      return {
        valid: false,
        value: parsedAmount,
        message: `Maximum amount is ${MAX_AMOUNT} Pi.`,
      };
    }

    return {
      valid: true,
      value: parsedAmount,
      message: '',
    };
  };

  const approvePaymentOnServer = async (
    paymentId: string,
    orderId: string,
    paymentAmount: number
  ) => {
    console.log('Calling picex approve endpoint:', '/pi/approve', {
      paymentId,
      orderId,
      amount: paymentAmount,
      network: networkValue,
    });

    try {
      const response = await axiosClient.post('/pi/approve', {
        paymentId,
        orderId,
        amount: paymentAmount,
        network: networkValue,
        paymentType: 'picex_wallet_payment',
        pageUrl: window.location.href,
        pageOrigin: window.location.origin,
      });

      console.log('Approve response:', response.status, response.data);

      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Server approval failed');
      }

      return response.data;
    } catch (error: any) {
      console.error('Approve request failed:', error?.response?.data || error);

      throw new Error(
        error?.response?.data?.message ||
          error?.response?.data?.error?.message ||
          error?.response?.data?.error ||
          error?.message ||
          'Server approval failed'
      );
    }
  };

  const completePaymentOnServer = async (
    paymentId: string,
    txid: string,
    orderId: string,
    paymentAmount: number
  ) => {
    console.log('Calling picex complete endpoint:', '/pi/complete', {
      paymentId,
      txid,
      orderId,
      amount: paymentAmount,
      network: networkValue,
    });

    try {
      const response = await axiosClient.post('/pi/complete', {
        paymentId,
        txid,
        orderId,
        amount: paymentAmount,
        network: networkValue,
        paymentType: 'picex_wallet_payment',
        pageUrl: window.location.href,
        pageOrigin: window.location.origin,
      });

      console.log('Complete response:', response.status, response.data);

      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Server completion failed');
      }

      return response.data;
    } catch (error: any) {
      console.error('Complete request failed:', error?.response?.data || error);

      throw new Error(
        error?.response?.data?.message ||
          error?.response?.data?.error?.message ||
          error?.response?.data?.error ||
          error?.message ||
          'Server completion failed'
      );
    }
  };

  const createPiPayment = async () => {
    if (!window.Pi) {
      setStatus('Pi SDK not found. Please open picex inside Pi Browser.');
      return;
    }

    if (typeof window.Pi.createPayment !== 'function') {
      setStatus('Pi createPayment function is not available.');
      return;
    }

    if (!isAuthenticated) {
      setStatus('Please connect with Pi before creating a picex payment.');
      return;
    }

    if (!API_BASE_URL) {
      setStatus('VITE_API_URL is not set. Backend URL is required.');
      return;
    }

    const amountValidation = validateAmount();

    if (!amountValidation.valid) {
      setStatus(amountValidation.message);
      return;
    }

    const paymentAmount = amountValidation.value;
    const orderId =
      (PI_SANDBOX ? 'picex_test_payment_' : 'picex_main_payment_') +
      Date.now();

    try {
      setIsPaying(true);

      await warmUpBackend();

      setStatus(`Creating ${networkLabel} Pi payment for picex...`);

      const paymentData = {
        amount: paymentAmount,
        memo: `picex wallet payment - ${paymentAmount} Pi`,
        metadata: {
          type: PI_SANDBOX ? 'picex_testnet_payment' : 'picex_mainnet_payment',
          product: 'picex_wallet_access',
          orderId,
          username: currentUsername,
          amount: paymentAmount,
          network: networkValue,
          pageOrigin: window.location.origin,
        },
      };

      const callbacks = {
        onReadyForServerApproval: async function (paymentId: string) {
          try {
            console.log('Ready for server approval:', paymentId);
            setStatus('Approving picex payment on server...');

            await approvePaymentOnServer(paymentId, orderId, paymentAmount);

            setStatus('Payment approved by picex server. Continue in Pi Wallet.');
          } catch (error: any) {
            console.error('Server approval error:', error);
            setIsPaying(false);
            setStatus(
              'Server approval error: ' + (error?.message || String(error))
            );
          }
        },

        onReadyForServerCompletion: async function (
          paymentId: string,
          txid: string
        ) {
          try {
            console.log('Ready for server completion:', paymentId, txid);
            setStatus('Completing picex payment on server...');

            await completePaymentOnServer(
              paymentId,
              txid,
              orderId,
              paymentAmount
            );

            setStatus(
              'Payment completed successfully. Your picex wallet/payment record is updated. TXID: ' +
                txid
            );
            setIsPaying(false);
          } catch (error: any) {
            console.error('Server completion error:', error);
            setIsPaying(false);
            setStatus(
              'Server completion error: ' + (error?.message || String(error))
            );
          }
        },

        onCancel: function (paymentId: string) {
          console.log('Payment cancelled:', paymentId);
          setIsPaying(false);
          setStatus('Payment cancelled by user.');
        },

        onError: function (error: any, payment: any) {
          console.error('Payment error:', error, payment);
          setIsPaying(false);
          setStatus('Payment error: ' + (error?.message || String(error)));
        },
      };

      const payment = await window.Pi.createPayment(paymentData, callbacks);

      console.log('Payment result:', payment);
      setStatus('Payment request sent to Pi Wallet. Please confirm in Pi Browser.');
    } catch (error: any) {
      console.error('Create payment error:', error);
      setIsPaying(false);
      setStatus('Create payment error: ' + (error?.message || String(error)));
    }
  };

  return (
    <section
      style={{
        margin: '24px auto',
        padding: '28px',
        maxWidth: '520px',
        border: '1px solid rgba(255, 202, 40, 0.28)',
        borderRadius: '26px',
        textAlign: 'center',
        background:
          'linear-gradient(145deg, rgba(255,255,255,0.11), rgba(255,255,255,0.055))',
        boxShadow: '0 26px 64px rgba(0,0,0,0.32)',
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
          background: 'rgba(255, 202, 40, 0.12)',
          border: '1px solid rgba(255, 202, 40, 0.28)',
          color: '#ffca28',
          fontSize: '12px',
          fontWeight: 900,
          letterSpacing: '0.4px',
        }}
      >
        picex Wallet Access
      </div>

      <h2 style={{ color: '#ffffff', marginBottom: '8px', fontSize: '28px' }}>
        Connect Pi & Create Payment
      </h2>

      <p style={{ color: '#d8cfee', fontSize: '14px', lineHeight: 1.8 }}>
        Login with Pi to access picex wallet features. This panel currently
        keeps the existing Pi payment flow and prepares the foundation for
        future deposit and withdrawal operations.
      </p>

      <div
        style={{
          display: 'inline-block',
          marginBottom: '18px',
          padding: '7px 13px',
          borderRadius: '999px',
          background: PI_SANDBOX
            ? 'rgba(255, 152, 0, 0.14)'
            : 'rgba(34, 197, 94, 0.12)',
          color: PI_SANDBOX ? '#ffb74d' : '#86efac',
          border: PI_SANDBOX
            ? '1px solid rgba(255, 152, 0, 0.24)'
            : '1px solid rgba(34, 197, 94, 0.22)',
          fontSize: '12px',
          fontWeight: 800,
        }}
      >
        Network: {networkLabel}
      </div>

      {!isAuthenticated ? (
        <button
          onClick={loginWithPi}
          disabled={isLoggingIn}
          style={{
            padding: '13px 24px',
            borderRadius: '999px',
            border: 'none',
            background: isLoggingIn
              ? '#6b7280'
              : 'linear-gradient(135deg, #ffe7a3, #ffca28, #f4b942)',
            color: '#180d31',
            cursor: isLoggingIn ? 'not-allowed' : 'pointer',
            fontSize: '15px',
            fontWeight: 900,
            boxShadow: '0 14px 30px rgba(244,185,66,0.24)',
          }}
        >
          {isLoggingIn ? 'Please wait...' : 'Connect with Pi'}
        </button>
      ) : (
        <>
          <p style={{ marginTop: '15px', color: '#d8cfee' }}>
            Welcome <strong style={{ color: '#ffca28' }}>@{currentUsername || 'Pi User'}</strong>
          </p>

          <button
            onClick={handleLogout}
            style={{
              marginBottom: '16px',
              padding: '9px 16px',
              borderRadius: '999px',
              border: '1px solid rgba(248,113,113,0.55)',
              background: 'rgba(239,68,68,0.08)',
              color: '#fecaca',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 800,
            }}
          >
            Logout
          </button>

          <div style={{ marginTop: '15px', marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '7px',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 800,
              }}
            >
              Pi Amount
            </label>

            <input
              type="number"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              step="0.001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isPaying}
              style={{
                width: '100%',
                maxWidth: '240px',
                padding: '11px 12px',
                borderRadius: '13px',
                border: '1px solid rgba(255,255,255,0.18)',
                textAlign: 'center',
                fontSize: '15px',
                boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.08)',
                color: '#ffffff',
                outline: 'none',
              }}
            />

            <div
              style={{
                marginTop: '7px',
                fontSize: '11px',
                color: '#b9aed5',
              }}
            >
              Min: {MIN_AMOUNT} Pi / Max: {MAX_AMOUNT} Pi
            </div>
          </div>

          <button
            onClick={createPiPayment}
            disabled={isPaying}
            style={{
              padding: '13px 24px',
              borderRadius: '999px',
              border: 'none',
              background: isPaying
                ? '#6b7280'
                : 'linear-gradient(135deg, #6f2dbd, #8b5cf6)',
              color: '#ffffff',
              cursor: isPaying ? 'not-allowed' : 'pointer',
              fontSize: '15px',
              fontWeight: 900,
              boxShadow: '0 14px 30px rgba(111,45,189,0.28)',
            }}
          >
            {isPaying ? 'Processing...' : `Create Pi Payment ${amount || '0'} Pi`}
          </button>
        </>
      )}

      <div
        style={{
          marginTop: '18px',
          padding: '13px',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '14px',
          fontSize: '13px',
          color: '#d8cfee',
          wordBreak: 'break-word',
          lineHeight: 1.6,
        }}
      >
        {status}
      </div>
    </section>
  );
};

export default PiPaymentPanel;
