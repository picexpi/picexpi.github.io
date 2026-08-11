// frontend/src/Router.tsx
import React from 'react';
// استفاده از HashRouter برای سازگاری کامل با GitHub Pages (حل مشکل صفحه سفید و ۴۰۴)
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

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute با قابلیت جلوگیری از کرش (Error Handling)
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useAuth();

  // ۱. جلوگیری از کرش اگر Hook در خارج از Provider صدا زده شود
  if (!auth || auth.loading === undefined) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>در حال برقراری ارتباط با سرور...</p>
      </div >
    );
  }

  const { isAuthenticated, loading } = auth;

  // ۲. نمایش وضعیت بارگذاری
  if (loading) {
    return (
      <div className="loading-screen" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem' 
      }}>
        در حال بارگذاری...
      </div >
    );
  }

  // ۳. بررسی احراز هویت
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

// اضافه کردن : React.FC برای حل خطای TS2786
const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* مسیرهای عمومی */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />

        {/* بخش‌های محافظت شده با استفاده از ProtectedRoute */}
        <Route 
          path="/payment" 
          element={
            <ProtectedRoute>
              {/* اضافه کردن توابع خالی برای رفع خطای TS2739 */}
              <Payment 
                onPaymentSuccess={() => console.log("Payment Successful")} 
                onPaymentError={(err) => console.error("Payment Error:", err)} 
              /> 
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/history" 
          element={
            <ProtectedRoute>
              {/* اضافه کردن توابع خالی برای رفع خطای احتمالی در History */}
              <History 
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

        {/* مسیر پیش‌فرض */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
