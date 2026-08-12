import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../lib/axiosClient';

/**
 * @param {{ onPaymentSuccess?: (txid: string) => void, onPaymentError?: (err: any) => void }} props
 */
const Payment = (props) => {
  const { 
    onPaymentSuccess = () => {}, 
    onPaymentError = () => {} 
  } = props;

  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (window.Pi) {
      console.log("✅ Pi Network SDK is ready");
    } else {
      console.warn("⚠️ Pi SDK not found.");
    }
  }, []);

  const handlePayment = async () => {
    if (!window.Pi) {
      setError("Pi SDK is not available. Please open this app in the Pi Browser.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const payment = await window.Pi.createPayment({
        amount: 1.0, 
        memo: "Purchase from PiDao",
        metadata: {
          productId: "item_123",
          userId: user?.uid || 'guest',
        },
      });

      await window.Pi.onReadyForServerApproval(async (paymentId) => {
        try {
          await axiosClient.post('/payment/approve', { paymentId });

          await window.Pi.onReadyForServerCompletion(async (paymentId, txid) => {
            try {
              await axiosClient.post('/payment/complete', {
                paymentId,
                txid,
                paymentDetails: { amount: 1.0, currency: 'PI' }
              });

              setIsProcessing(false);
              onPaymentSuccess(txid); 
            } catch (err) {
              setError("Failed to finalize transaction.");
              setIsProcessing(false);
              onPaymentError(err);
            }
          });

        } catch (err) {
          setError("Server approval failed.");
          setIsProcessing(false);
          onPaymentError(err);
        }
      });

    } catch (err) {
      setError(err.message || "Payment failed to start.");
      setIsProcessing(false);
      onPaymentError(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Complete Your Purchase</h2>
      
      {error && (
        <div style={styles.errorBox}>
          {error}
        </div>
      )}
      
      <div style={styles.detailsBox}>
        <p style={{ margin: '5px 0' }}>Amount: <strong style={{ color: '#673ab7' }}>1.0 PI</strong></p>
        <p style={{ margin: '5px 0' }}>Product: <strong>PiDao Premium Item</strong></p>
      </div>

      <button 
        onClick={handlePayment}
        disabled={isProcessing}
        style={{
          ...styles.button,
          backgroundColor: isProcessing ? '#ccc' : '#673ab7',
          cursor: isProcessing ? 'not-allowed' : 'pointer'
        }}
      >
        {isProcessing ? 'Processing...' : 'Pay with Pi'}
      </button>

      {isProcessing && (
        <div style={styles.loaderText}>
          Please do not close the Pi Browser...
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto' },
  title: { textAlign: 'center', color: '#333' },
  errorBox: { color: '#ff4d4d', backgroundColor: '#ffe6e6', padding: '10px', borderRadius: '5px', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' },
  detailsBox: { margin: '20px 0', padding: '15px', border: '1px solid #eee', borderRadius: '8px', textAlign: 'center' },
  button: { width: '100%', padding: '12px', borderRadius: '25px', fontWeight: 'bold', color: 'white', border: 'none', fontSize: '1rem' },
  loaderText: { marginTop: '15px', fontSize: '0.85rem', color: '#666', fontStyle: 'italic', textAlign: 'center' }
};

export default Payment;
