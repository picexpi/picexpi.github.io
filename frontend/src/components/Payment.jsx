// frontend/src/components/Payment.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../lib/axiosClient';
import './Payment.css';

/**
 * @param {{
 *   transactionId?: string,
 *   amount?: number,
 *   productName?: string,
 *   onReset?: () => void,
 *   onPaymentSuccess?: (txid: string) => void,
 *   onPaymentError?: (err: any) => void
 * }} props
 */
const Payment = ({
  transactionId = '',
  amount = 1.0,
  productName = 'picex Wallet Payment',
  onReset = () => {},
  onPaymentSuccess = () => {},
  onPaymentError = () => {},
}) => {
  const { user, isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('Ready to create a Pi payment for picex.');

  useEffect(() => {
    if (window.Pi) {
      console.log('✅ Pi Network SDK is ready for picex Payment component');
    } else {
      console.warn('⚠️ Pi SDK not found. Please open inside Pi Browser.');
    }
  }, []);

  const handlePayment = async () => {
    if (!window.Pi) {
      setError('Pi SDK is not available. Please open picex in the Pi Browser.');
      return;
    }

    if (typeof window.Pi.createPayment !== 'function') {
      setError('Pi createPayment function is not available.');
      return;
    }

    if (!isAuthenticated) {
      setError('Please login with Pi before creating a picex payment.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setStatus('Creating picex Pi payment...');

    const orderId =
      transactionId ||
      `picex_payment_${Date.now()}`;

    const paymentData = {
      amount,
      memo: `picex payment - ${amount} Pi`,
      metadata: {
        type: 'picex_payment',
        productName,
        orderId,
        userId:
          user?.piUserId ||
          user?.uid ||
          user?.id ||
          'unknown_user',
        username: user?.username || 'Pi User',
        pageOrigin: window.location.origin,
      },
    };

    const callbacks = {
      onReadyForServerApproval: async (paymentId) => {
        try {
          setStatus('Approving payment on picex server...');

          await axiosClient.post('/payment/approve', {
            paymentId,
            orderId,
            amount,
            productName,
            paymentType: 'picex_payment',
            pageUrl: window.location.href,
            pageOrigin: window.location.origin,
          });

          setStatus('Payment approved. Please confirm in Pi Wallet.');
        } catch (err) {
          console.error('Payment approval error:', err);
          setError('Server approval failed.');
          setIsProcessing(false);
          onPaymentError(err);
        }
      },

      onReadyForServerCompletion: async (paymentId, txid) => {
        try {
          setStatus('Completing payment on picex server...');

          await axiosClient.post('/payment/complete', {
            paymentId,
            txid,
            orderId,
            amount,
            productName,
            paymentType: 'picex_payment',
            paymentDetails: {
              amount,
              currency: 'PI',
              productName,
            },
            pageUrl: window.location.href,
            pageOrigin: window.location.origin,
          });

          setStatus('Payment completed successfully.');
          setIsProcessing(false);
          onPaymentSuccess(txid);
        } catch (err) {
          console.error('Payment completion error:', err);
          setError('Failed to finalize transaction.');
          setIsProcessing(false);
          onPaymentError(err);
        }
      },

      onCancel: (paymentId) => {
        console.log('Payment cancelled:', paymentId);
        setStatus('Payment cancelled by user.');
        setIsProcessing(false);
      },

      onError: (err, payment) => {
        console.error('Payment error:', err, payment);
        setError(err?.message || 'Payment failed.');
        setStatus('Payment error.');
        setIsProcessing(false);
        onPaymentError(err);
      },
    };

    try {
      await window.Pi.createPayment(paymentData, callbacks);
      setStatus('Payment request sent to Pi Wallet. Please confirm.');
    } catch (err) {
      console.error('Create payment error:', err);
      setError(err?.message || 'Payment failed to start.');
      setIsProcessing(false);
      onPaymentError(err);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-badge">
          picex Payment
        </div>

        <h2 className="payment-title">
          Complete Pi Payment
        </h2>

        <p className="payment-subtitle">
          Use Pi Network payments to unlock or test picex wallet and exchange features.
        </p>

        {error && (
          <div className="payment-error-box">
            {error}
          </div>
        )}

        <div className="payment-details-box">
          <p>
            Amount:{' '}
            <span className="amount-highlight">
              {amount} PI
            </span>
          </p>

          <p>
            Purpose:{' '}
            <span className="product-name">
              {productName}
            </span>
          </p>

          {transactionId && (
            <p className="tx-id">
              ID: {transactionId}
            </p>
          )}
        </div>

        <button
          className={`payment-button ${isProcessing ? 'loading' : ''}`}
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : (
            'Pay with Pi'
          )}
        </button>

        <button className="payment-reset-btn" onClick={onReset}>
          Cancel / Reset
        </button>

        <div className="payment-status-box">
          {status}
        </div>

        {isProcessing && (
          <p className="payment-loader-text">
            Please do not close the Pi Browser while payment is processing.
          </p>
        )}
      </div>
    </div>
  );
};

export default Payment;
