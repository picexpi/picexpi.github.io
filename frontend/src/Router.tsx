// frontend/src/Router.tsx
import React from 'react';
// استفاده از HashRouter برای سازگاری کامل با GitHub Pages (جلوگیری از خطای 404)
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
 * ProtectedRoute: کنترل دسترسی به صفحات حساس
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useAuth();

  // جلوگیری از کرش در صورتی که Context هنوز لود نشده باشد
  if (!auth || auth.loading === undefined) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#fff' }}>
        <p>در حال برقراری ارتباط با سرور...</p>
      </div>
    );
  }

  const { isAuthenticated, loading } = auth;

  // نمایش وضعیت بارگذاری
  if (loading) {
    return (
      <div className="loading-screen" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#fff',
        background: '#311b92'
      }}>
        در حال بارگذاری...
      </div>
    );
  }

  // اگر کاربر لاگین نیست، هدایت به صفحه ورود
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* --- مسیرهای عمومی --- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/success" element={<Success />} />

        {/* --- مسیرهای محافظت شده (فقط کاربران لاگین شده) --- */}
        
        {/* اصلاح شده: اضافه کردن transactionId و onReset برای رفع ارور TS2739 */}
        <Route 
          path="/payment" 
          element={
            <ProtectedRoute>
              <Payment 
                transactionId="" // مقدار پیش‌فرض برای رفع ارور
                onReset={() => console.log("Resetting payment...")} // تابع پیش‌فرض برای رفع ارور
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

        {/* --- مدیریت مسیرهای اشتباه (Redirect به صفحه اصلی) --- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
