import { useEffect, useState } from "react";

declare global {
  interface Window {
    Pi?: any;
  }
}

export default function PiTestnetPayment() {
  const [status, setStatus] = useState("Initializing Pi SDK...");
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    if (!window.Pi) {
      setStatus("Pi SDK not found. Please open the app inside Pi Browser.");
      return;
    }

    try {
      window.Pi.init({
        version: "2.0",
        sandbox: true,
      });

      setStatus("Pi SDK initialized in Testnet/Sandbox mode.");
    } catch (error: any) {
      console.error("Pi init error:", error);
      setStatus("Pi SDK init error: " + (error?.message || error));
    }
  }, []);

  function onIncompletePaymentFound(payment: any) {
    console.log("Incomplete payment found:", payment);
    setStatus("Incomplete payment found. Please complete or cancel it in Pi Wallet.");
  }

  async function loginWithPi() {
    if (!window.Pi) {
      setStatus("Pi SDK not available. Open this website in Pi Browser.");
      return;
    }

    try {
      setStatus("Authenticating with Pi...");

      const auth = await window.Pi.authenticate(
        ["username", "payments"],
        onIncompletePaymentFound
      );

      console.log("Pi auth result:", auth);

      if (auth?.user?.username) {
        setUsername(auth.user.username);
        setIsLoggedIn(true);
        setStatus("Logged in successfully as @" + auth.user.username);
      } else {
        setStatus("Login failed: No user data received.");
      }
    } catch (error: any) {
      console.error("Pi auth error:", error);
      setStatus("Auth error: " + (error?.message || "User cancelled or failed"));
    }
  }

  async function createTestPayment() {
    if (!window.Pi) {
      setStatus("Pi SDK not available.");
      return;
    }

    if (!isLoggedIn) {
      setStatus("Please login first.");
      return;
    }

    try {
      setIsPaying(true);
      setStatus("Creating Testnet Pi payment...");

      const paymentData = {
        amount: 0.01,
        memo: "Temporary Testnet payment for Pi DAO",
        metadata: {
          type: "temporary_testnet_payment",
          orderId: "test_order_" + Date.now(),
          username,
        },
      };

      const callbacks = {
        onReadyForServerApproval: function (paymentId: string) {
          console.log("Ready for server approval:", paymentId);

          setStatus(
            "Payment created. Server approval is required. Payment ID: " +
              paymentId
          );

          /*
            اینجا بعداً باید به بک‌اند وصل شود:

            fetch("https://your-backend.com/pi/approve", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId }),
            });
          */
        },

        onReadyForServerCompletion: function (paymentId: string, txid: string) {
          console.log("Ready for server completion:", paymentId, txid);

          setStatus(
            "Payment confirmed by user. Server completion required. TXID: " +
              txid
          );

          /*
            اینجا بعداً باید به بک‌اند وصل شود:

            fetch("https://your-backend.com/pi/complete", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId, txid }),
            });
          */
        },

        onCancel: function (paymentId: string) {
          console.log("Payment cancelled:", paymentId);
          setIsPaying(false);
          setStatus("Payment cancelled by user.");
        },

        onError: function (error: any, payment: any) {
          console.error("Payment error:", error, payment);
          setIsPaying(false);
          setStatus("Payment error: " + (error?.message || error));
        },
      };

      const payment = await window.Pi.createPayment(paymentData, callbacks);

      console.log("Payment result:", payment);
      setStatus("Please confirm the payment in Pi Wallet.");
    } catch (error: any) {
      console.error("Create payment error:", error);
      setIsPaying(false);
      setStatus("Create payment error: " + (error?.message || error));
    }
  }

  return (
    <section
      style={{
        margin: "20px auto",
        padding: "20px",
        maxWidth: "420px",
        border: "1px solid #ddd",
        borderRadius: "16px",
        textAlign: "center",
        background: "#fff",
      }}
    >
      <h2>Pi Testnet Payment</h2>

      {!isLoggedIn ? (
        <button
          onClick={loginWithPi}
          style={{
            padding: "12px 20px",
            borderRadius: "24px",
            border: "none",
            background: "#673ab7",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Login with Pi
        </button>
      ) : (
        <>
          <p>
            Logged in as <strong>@{username}</strong>
          </p>

          <button
            onClick={createTestPayment}
            disabled={isPaying}
            style={{
              padding: "12px 20px",
              borderRadius: "24px",
              border: "none",
              background: isPaying ? "#999" : "#00c853",
              color: "#fff",
              cursor: isPaying ? "not-allowed" : "pointer",
            }}
          >
            {isPaying ? "Processing..." : "Pay 0.01 Testnet Pi"}
          </button>
        </>
      )}

      <div
        style={{
          marginTop: "16px",
          padding: "12px",
          background: "#f5f5f5",
          borderRadius: "8px",
          fontSize: "14px",
        }}
      >
        {status}
      </div>
    </section>
  );
}
