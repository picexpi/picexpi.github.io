// frontend/src/components/PiTestnetPayment.tsx
import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    Pi?: any;
    __PI_SDK_INITIALIZED__?: boolean;
  }
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://pidao.bonto.run/api';

const PI_SANDBOX =
  String(import.meta.env.VITE_PI_SANDBOX ?? 'true') === 'true';

const PI_NETWORK_LABEL = PI_SANDBOX ? 'Testnet / Sandbox' : 'Mainnet';

const DEFAULT_AMOUNT =
  import.meta.env.VITE_DEFAULT_PI_AMOUNT || '0.01';

const MIN_AMOUNT =
  Number(import.meta.env.VITE_MIN_PI_AMOUNT || '0.001');

const MAX_AMOUNT =
  Number(import.meta.env.VITE_MAX_PI_AMOUNT || '100');

function getHealthUrl() {
  if (!API_BASE_URL) return '';
  return API_BASE_URL.replace(/\/api\/?$/, '') + '/health';
}

const PiTestnetPayment: React.FC = () => {
  const [status, setStatus] = useState<string>('Initializing Pi SDK...');
  const [username, setUsername] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isPaying, setIsPaying] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>(DEFAULT_AMOUNT);

  useEffect(() => {
    if (!window.Pi) {
      setStatus('Pi SDK not found. Please open this website inside Pi Browser.');
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

      setStatus(`Pi SDK initialized in ${PI_NETWORK_LABEL} mode.`);
    } catch (error: any) {
      console.error('Pi SDK init error:', error);
      setStatus('Pi SDK init error: ' + (error?.message || error));
    }
  }, []);

  const onIncompletePaymentFound = (payment: any) => {
    console.log('Incomplete payment found:', payment);
    setStatus('Incomplete payment found. Complete or cancel it in Pi Wallet.');
  };

  const warmUpBackend = async () => {
    if (!API_BASE_URL) {
      throw new Error('VITE_API_URL is not set.');
    }

    const healthUrl = getHealthUrl();

    if (!healthUrl) return;

    console.log('Warming up backend:', healthUrl);
    setStatus('Warming up backend...');

    try {
      await fetch(healthUrl, {
        method: 'GET',
      });
    } catch (error) {
      console.warn('Backend warm-up failed:', error);
    }
  };

  const loginWithPi = async () => {
    if (!window.Pi) {
      setStatus('Pi SDK not available. Open this website inside Pi Browser.');
      return;
    }

    try {
      setStatus('Authenticating with Pi...');

      const auth = await window.Pi.authenticate(
        ['username', 'payments'],
        onIncompletePaymentFound
      );

      console.log('Pi auth result:', auth);

      if (auth?.user?.username) {
        setUsername(auth.user.username);
        setIsLoggedIn(true);
        setStatus('Logged in successfully as @' + auth.user.username);
      } else {
        setStatus('Login failed: No user data received.');
      }
    } catch (error: any) {
      console.error('Pi auth error:', error);
      setStatus(
        'Auth error: ' +
          (error?.message || 'User cancelled or authentication failed')
      );
    }
  };

  const validateAmount = () => {
    const parsedAmount = Number(amount);

    if (Number.isNaN(parsedAmount)) {
      return {
        valid: false,
        value: 0,
        message: 'Please enter a valid payment amount.',
      };
    }

    if (parsedAmount < MIN_AMOUNT) {
      return {
        valid: false,
        value: parsedAmount,
        message: `Minimum payment amount is ${MIN_AMOUNT} Pi.`,
      };
    }

    if (parsedAmount > MAX_AMOUNT) {
      return {
        valid: false,
        value: parsedAmount,
        message: `Maximum payment amount is ${MAX_AMOUNT} Pi.`,
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
    if (!API_BASE_URL) {
      throw new Error('VITE_API_URL is not set.');
    }

    const url = `${API_BASE_URL}/pi/approve`;

    console.log('Calling approve endpoint:', url, {
      paymentId,
      orderId,
      amount: paymentAmount,
      network: PI_NETWORK_LABEL,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentId,
        orderId,
        amount: paymentAmount,
        network: PI_SANDBOX ? 'testnet' : 'mainnet',
      }),
    });

    const text = await response.text();

    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    console.log('Approve response:', response.status, data);

    if (!response.ok || !data.success) {
      throw new Error(
        data?.message ||
          data?.error?.message ||
          data?.error ||
          'Server approval failed'
      );
    }

    return data;
  };

  const completePaymentOnServer = async (
    paymentId: string,
    txid: string,
    orderId: string,
    paymentAmount: number
  ) => {
    if (!API_BASE_URL) {
      throw new Error('VITE_API_URL is not set.');
    }

    const url = `${API_BASE_URL}/pi/complete`;

    console.log('Calling complete endpoint:', url, {
      paymentId,
      txid,
      orderId,
      amount: paymentAmount,
      network: PI_NETWORK_LABEL,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentId,
        txid,
        orderId,
        amount: paymentAmount,
        network: PI_SANDBOX ? 'testnet' : 'mainnet',
      }),
    });

    const text = await response.text();

    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    console.log('Complete response:', response.status, data);

    if (!response.ok || !data.success) {
      throw new Error(
        data?.message ||
          data?.error?.message ||
          data?.error ||
          'Server completion failed'
      );
    }

    return data;
  };

  const createPiPayment = async () => {
    if (!window.Pi) {
      setStatus('Pi SDK not available.');
      return;
    }

    if (!isLoggedIn) {
      setStatus('Please login first.');
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
      (PI_SANDBOX ? 'test_order_' : 'main_order_') + Date.now();

    try {
      setIsPaying(true);

      await warmUpBackend();

      setStatus(`Creating ${PI_NETWORK_LABEL} Pi payment...`);

      const paymentData = {
        amount: paymentAmount,
        memo: `Pi DAO payment - ${paymentAmount} Pi`,
        metadata: {
          type: PI_SANDBOX ? 'testnet_payment' : 'mainnet_payment',
          orderId,
          username,
          amount: paymentAmount,
          network: PI_SANDBOX ? 'testnet' : 'mainnet',
        },
      };

      const callbacks = {
        onReadyForServerApproval: async function (paymentId: string) {
          try {
            console.log('Ready for server approval:', paymentId);
            setStatus('Approving payment on server...');

            await approvePaymentOnServer(paymentId, orderId, paymentAmount);

            setStatus('Payment approved by server. Continue in Pi Wallet.');
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
            setStatus('Completing payment on server...');

            await completePaymentOnServer(
              paymentId,
              txid,
              orderId,
              paymentAmount
            );

            setStatus('Payment completed successfully. TXID: ' + txid);
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
      setStatus('Payment request sent to Pi Wallet. Please confirm.');
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
        padding: '20px',
        maxWidth: '430px',
        border: '1px solid rgba(103, 58, 183, 0.3)',
        borderRadius: '18px',
        textAlign: 'center',
        background: '#ffffff',
        boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
        fontFamily: 'sans-serif',
      }}
    >
      <h2 style={{ color: '#673ab7', marginBottom: '8px' }}>
        Pi Payment
      </h2>

      <p style={{ color: '#666', fontSize: '14px' }}>
        Login with Pi and create a variable amount payment.
      </p>

      <div
        style={{
          display: 'inline-block',
          marginBottom: '14px',
          padding: '6px 12px',
          borderRadius: '999px',
          background: PI_SANDBOX ? '#fff3e0' : '#e8f5e9',
          color: PI_SANDBOX ? '#ef6c00' : '#2e7d32',
          fontSize: '12px',
          fontWeight: 700,
        }}
      >
        Network: {PI_NETWORK_LABEL}
      </div>

      {!isLoggedIn ? (
        <button
          onClick={loginWithPi}
          style={{
            padding: '12px 22px',
            borderRadius: '24px',
            border: 'none',
            background: '#673ab7',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: 600,
          }}
        >
          Login with Pi
        </button>
      ) : (
        <>
          <p style={{ marginTop: '15px', color: '#333' }}>
            Logged in as <strong>@{username}</strong>
          </p>

          <div style={{ marginTop: '15px', marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '6px',
                color: '#333',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Payment Amount Pi
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
                maxWidth: '220px',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #ccc',
                textAlign: 'center',
                fontSize: '15px',
                boxSizing: 'border-box',
              }}
            />

            <div
              style={{
                marginTop: '6px',
                fontSize: '11px',
                color: '#888',
              }}
            >
              Min: {MIN_AMOUNT} Pi / Max: {MAX_AMOUNT} Pi
            </div>
          </div>

          <button
            onClick={createPiPayment}
            disabled={isPaying}
            style={{
              padding: '12px 22px',
              borderRadius: '24px',
              border: 'none',
              background: isPaying ? '#999' : '#00c853',
              color: '#fff',
              cursor: isPaying ? 'not-allowed' : 'pointer',
              fontSize: '15px',
              fontWeight: 600,
            }}
          >
            {isPaying
              ? 'Processing...'
              : `Pay ${amount || '0'} Pi`}
          </button>
        </>
      )}

      <div
        style={{
          marginTop: '16px',
          padding: '12px',
          background: '#f5f5f5',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#444',
          wordBreak: 'break-word',
          lineHeight: 1.5,
        }}
      >
        {status}
      </div>

      <div
        style={{
          marginTop: '10px',
          fontSize: '11px',
          color: '#999',
          wordBreak: 'break-word',
        }}
      >
        API: {API_BASE_URL || 'VITE_API_URL is missing'}
      </div>
    </section>
  );
};

export default PiTestnetPayment;
