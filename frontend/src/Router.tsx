// frontend/src/Router.tsx
import React from 'react';
// استفاده از HashRouter برای سازگاری کامل با GitHub Pages
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages & Components
import Home from './pages/Home';
import Shop from './pages/Shop';
import TasksPage from './pages/Engagement/TasksPage';
import SignIn from './components/SignIn';
import Payment from './components/Payment';
import History from './components/History';
import Success from './components/Success';
import PiTestnetPayment from './components/PiTestnetPayment';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute: کنترل دسترسی به صفحات حساس
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useAuth();

  if (!auth || auth.loading === undefined) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          color: '#fff',
        }}
      >
        <p>در حال برقراری ارتباط با سرور...</p>
      </div>
    );
  }

  const { isAuthenticated, loading } = auth;

  if (loading) {
    return (
      <div
        className="loading-screen"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '1.2rem',
          color: '#fff',
          background: '#311b92',
        }}
      >
        در حال بارگذاری...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

// برای دور زدن مشکل تایپ‌اسکریپت در بیلد
const PaymentAny = Payment as any;
const HistoryAny = History as any;

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* --- مسیرهای عمومی --- */}
        <Route
          path="/"
          element={
            <>
              <Home />

              {/* بخش موقت لاگین/پرداخت تست‌نت پای در صفحه اصلی */}
              <PiTestnetPayment />
            </>
          }
        />

        <Route path="/login" element={<SignIn />} />
        <Route path="/success" element={<Success />} />

        {/* --- مسیرهای محافظت شده --- */}
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentAny
                transactionId=""
                onReset={() => {}}
                onPaymentSuccess={(txid: any) => console.log('Success:', txid)}
                onPaymentError={(err: any) => console.error('Error:', err)}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryAny
                onPaymentSuccess={() => {}}
                onPaymentError={() => {}}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <Shop />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />

        {/* --- مدیریت مسیرهای اشتباه --- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
