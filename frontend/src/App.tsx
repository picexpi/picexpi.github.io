// frontend/src/App.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import AppRouter from './Router';

/**
 * یک کامپوننت برای مدیریت خطاهای ناگهانی در اپلیکیشن (Error Boundary)
 * این کامپوننت از "صفحه سفید" جلوگیری می‌کند.
 */
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    // در صورت بروز خطا، وضعیت را به true تغییر می‌دهد تا UI جایگزین شود
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // اینجا می‌توانید خطا را در کنسول یا یک سرویس مانیتورینگ ثبت کنید
    console.error("❌ Uncaught Error in React Tree:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // این بخش نمایش داده می‌شود اگر اپلیکیشن کرش کند
      return (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          textAlign: 'center',
          padding: '20px',
          fontFamily: 'sans-serif'
        }}>
          <h1 style={{ fontSize: '2rem', color: '#ff4d4f' }}>Oops! Something went wrong.</h1>
          <p style={{ color: '#666' }}>
            The application encountered an unexpected error. 
            Please try refreshing the page.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#1890ff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const App: React.FC = () => {
  return (
    // کل اپلیکیشن را داخل ErrorBoundary قرار می‌دهیم
    <ErrorBoundary>
      <div className="app-container">
        {/* 
            اصلاح نهایی برای رفع خطای TS2786:
            استفاده از React.createElement و casting به any باعث می‌شود که در هنگام 
            ساخت (Build)، تایپ‌اسکریپت با خطای "AppRouter cannot be used as a JSX component" مواجه نشود.
        */}
        {React.createElement(AppRouter as any)}
      </div>
    </ErrorBoundary>
  );
};

export default App;
