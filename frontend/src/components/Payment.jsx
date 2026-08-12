import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../lib/axiosClient';
import '../components/Payment.css';

/**
 * Payment Component
 * @param {Object} props
 * @param {Function} props.onPaymentSuccess - تابعی که پس از موفقیت پرداخت صدا زده می‌شود
 * @param {Function} props.onPaymentError - تابعی که پس از بروز خطا صدا زده می‌شود
 */
const Payment = ({ onPaymentSuccess = () => {}, onPaymentError = () => {} }) => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // دریافت مقادیر از محیط Vite
  const PI_APP_ID = import.meta.env.VITE_PI_APP_ID;
  const PI_CLIENT_ID = import.meta.env.VITE_PI_CLIENT_ID;

  useEffect(() => {
    if (window.Pi) {
      console.log("✅ Pi Network SDK is ready");
    } else {
      console.warn("⚠️ Pi SDK not found. This component only works inside the Pi Browser.");
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
      // ۱. ایجاد درخواست پرداخت
      const payment = await window.Pi.createPayment({
        amount: 1.0, 
        memo: "Purchase from PiDao",
        metadata: {
          productId: "item_123",
          userId: user?.uid || 'guest',
        },
      });

      // ۲. مدیریت تایید سرور
      await window.Pi.onReadyForServerApproval(async (paymentId) => {
        try {
          console.log("⏳ Waiting for server approval for:", paymentId);
          
          await axiosClient.post('/payment/approve', {
            paymentId: paymentId,
          });

          // ۳. مدیریت تکمیل پرداخت
          await window.Pi.onReadyForServerCompletion(async (paymentId, txid) => {
            try {
              console.log("⏳ Finalizing transaction...");
              
              await axiosClient.post('/payment/complete', {
                paymentId: paymentId,
                txid: txid,
                paymentDetails: {
                  amount: 1.0,
                  currency: 'PI'
                }
              });

              console.log("🎉 Payment completed successfully!");
              setIsProcessing(false);
              onPaymentSuccess(txid); 
            } catch (err) {
              console.error("❌ Completion error:", err);
              setError("Failed to finalize transaction. Please check your history.");
              setIsProcessing(false);
              onPaymentError(err);
            }
          });

        } catch (err) {
          console.error("❌ Approval error:", err);
          setError("Server approval failed. Please try again.");
          setIsProcessing(false);
          onPaymentError(err);
        }
      });

    } catch (err) {
      console.error("❌ Payment initiation error:", err);
      setError(err.message || "Payment failed to start.");
      setIsProcessing(false);
      onPaymentError(err);
    }
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Complete Your Purchase</h2>
      
      {error && (
        <div className="error-message" style={{ 
          color: '#ff4d4d', 
          backgroundColor: '#ffe6e6', 
          padding: '10px', 
          borderRadius: '5px', 
          marginBottom: '1rem',
          fontSize: '0.9rem',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      
      <div className="payment-details" style={{ 
        margin: '20px 0', 
        padding: '15px', 
        border: '1px solid #eee', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <p style={{ margin: '5px 0' }}>Amount: <strong style={{ color: '#673ab7' }}>1.0 PI</strong></p>
        <p style={{ margin: '5px 0' }}>Product: <strong>PiDao Premium Item</strong></p>
      </div>

      <button 
        className="pay-button" 
        onClick={handlePayment}
        disabled={isProcessing}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '25px',
          fontWeight: 'bold',
          cursor: isProcessing ? 'not-allowed' : 'pointer',
          backgroundColor: isProcessing ? '#ccc' : '#673ab7',
          color: 'white',
          border: 'none',
          fontSize: '1rem'
        }}
      >
        {isProcessing ? 'Processing...' : 'Pay with Pi'}
      </button>

      {isProcessing && (
        <div className="loader-text" style={{ 
          marginTop: '15px', 
          fontSize: '0.85rem', 
          color: '#666',
          fontStyle: 'italic' 
        }}>
          Please do not close the Pi Browser...
        </div>
      )}
    </div>
  );
};

export default Payment;
