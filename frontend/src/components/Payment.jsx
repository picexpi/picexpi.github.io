// frontend/src/components/Payment.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../i18n/I18nContext';
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
  productName = '',
  onReset = () => {},
  onPaymentSuccess = () => {},
  onPaymentError = () => {},
}) => {
  const { user, isAuthenticated } = useAuth();
  const { t } = useI18n();

  const tx = (key, fallback) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  const formatText = (key, fallback, values = {}) => {
    let text = tx(key, fallback);

    Object.entries(values).forEach(([name, value]) => {
      text = text.replaceAll(`{${name}}`, String(value));
    });

    return text;
  };

  const displayProductName =
    productName || tx('picexWalletPayment', 'picex Wallet Payment');

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(
    tx('paymentReadyToCreate', 'Ready to create a Pi payment for picex.')
  );

  useEffect(() => {
    if (window.Pi) {
      console.log('✅ Pi Network SDK is ready for picex Payment component');
    } else {
      console.warn('⚠️ Pi SDK not found. Please open inside Pi Browser.');
    }
  }, []);

  const handlePayment = async () => {
    if (!window.Pi) {
      setError(
        tx(
          'piSdkUnavailableOpenPiBrowser',
          'Pi SDK is not available. Please open picex in the Pi Browser.'
        )
      );
      return;
    }

    if (typeof window.Pi.createPayment !== 'function') {
      setError(
        tx(
          'piCreatePaymentUnavailable',
          'Pi createPayment function is not available.'
        )
      );
      return;
    }

    if (!isAuthenticated) {
      setError(
        tx(
          'loginWithPiBeforePayment',
          'Please login with Pi before creating a picex payment.'
        )
      );
      return;
    }

    setIsProcessing(true);
    setError(null);
    setStatus(tx('creatingPicexPiPayment', 'Creating picex Pi payment...'));

    const orderId = transactionId || `picex_payment_${Date.now()}`;

    const paymentData = {
      amount,
      memo: `picex payment - ${amount} Pi`,
      metadata: {
        type: 'picex_payment',
        productName: displayProductName,
        orderId,
        userId:
          user?.piUserId ||
          user?.uid ||
          user?.id ||
          'unknown_user',
        username: user?.username || tx('piUser', 'Pi User'),
        pageOrigin: window.location.origin,
      },
    };

    const callbacks = {
      onReadyForServerApproval: async (paymentId) => {
        try {
          setStatus(
            tx('approvingPaymentOnPicexServer', 'Approving payment on picex server...')
          );

          await axiosClient.post('/payment/approve', {
            paymentId,
            orderId,
            amount,
            productName: displayProductName,
            paymentType: 'picex_payment',
            pageUrl: window.location.href,
            pageOrigin: window.location.origin,
          });

          setStatus(
            tx(
              'paymentApprovedConfirmWallet',
              'Payment approved. Please confirm in Pi Wallet.'
            )
          );
        } catch (err) {
          console.error('Payment approval error:', err);
          setError(tx('serverApprovalFailed', 'Server approval failed.'));
          setIsProcessing(false);
          onPaymentError(err);
        }
      },

      onReadyForServerCompletion: async (paymentId, txid) => {
        try {
          setStatus(
            tx('completingPaymentOnPicexServer', 'Completing payment on picex server...')
          );

          await axiosClient.post('/payment/complete', {
            paymentId,
            txid,
            orderId,
            amount,
            productName: displayProductName,
            paymentType: 'picex_payment',
            paymentDetails: {
              amount,
              currency: 'PI',
              productName: displayProductName,
            },
            pageUrl: window.location.href,
            pageOrigin: window.location.origin,
          });

          setStatus(tx('paymentCompleted', 'Payment completed successfully.'));
          setIsProcessing(false);
          onPaymentSuccess(txid);
        } catch (err) {
          console.error('Payment completion error:', err);
          setError(
            tx('failedToFinalizeTransaction', 'Failed to finalize transaction.')
          );
          setIsProcessing(false);
          onPaymentError(err);
        }
      },

      onCancel: (paymentId) => {
        console.log('Payment cancelled:', paymentId);
        setStatus(tx('paymentCancelledByUser', 'Payment cancelled by user.'));
        setIsProcessing(false);
      },

      onError: (err, payment) => {
        console.error('Payment error:', err, payment);
        setError(err?.message || tx('paymentFailed', 'Payment failed.'));
        setStatus(tx('paymentError', 'Payment error.'));
        setIsProcessing(false);
        onPaymentError(err);
      },
    };

    try {
      await window.Pi.createPayment(paymentData, callbacks);
      setStatus(
        tx('paymentRequestSentConfirm', 'Payment request sent to Pi Wallet. Please confirm.')
      );
    } catch (err) {
      console.error('Create payment error:', err);
      setError(err?.message || tx('paymentFailedToStart', 'Payment failed to start.'));
      setIsProcessing(false);
      onPaymentError(err);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-badge">
          {tx('picexPayment', 'picex Payment')}
        </div>

        <h2 className="payment-title">
          {tx('completePiPayment', 'Complete Pi Payment')}
        </h2>

        <p className="payment-subtitle">
          {tx(
            'paymentComponentSubtitle',
            'Use Pi Network payments to unlock or test picex wallet and exchange features.'
          )}
        </p>

        {error && (
          <div className="payment-error-box">
            {error}
          </div>
        )}

        <div className="payment-details-box">
          <p>
            {tx('amount', 'Amount')}:{' '}
            <span className="amount-highlight">
              {amount} PI
            </span>
          </p>

          <p>
            {tx('purpose', 'Purpose')}:{' '}
            <span className="product-name">
              {displayProductName}
            </span>
          </p>

          {transactionId && (
            <p className="tx-id">
              {tx('transactionIdentifier', 'Transaction ID')}: {transactionId}
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
              {tx('processing', 'Processing...')}
            </>
          ) : (
            tx('payWithPi', 'Pay with Pi')
          )}
        </button>

        <button className="payment-reset-btn" onClick={onReset}>
          {tx('cancelReset', 'Cancel / Reset')}
        </button>

        <div className="payment-status-box">
          {status}
        </div>

        {isProcessing && (
          <p className="payment-loader-text">
            {tx(
              'doNotClosePiBrowser',
              'Please do not close the Pi Browser while payment is processing.'
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default Payment;
    
