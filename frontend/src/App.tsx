// frontend/src/App.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import AppRouter from './Router';

/**
 * ErrorBoundary:
 * یک کامپوننت برای مدیریت خطاهای ناگهانی در اپلیکیشن.
 * این کامپوننت از نمایش صفحه سفید هنگام کرش React جلوگیری می‌کند.
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
    // در صورت بروز خطا، وضعیت را به true تغییر می‌دهد تا UI جایگزین نمایش داده شود
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // ثبت خطا در کنسول برای دیباگ
    // در آینده می‌توان اینجا خطا را به سرویس مانیتورینگ هم ارسال کرد
    console.error('❌ Uncaught Error in React Tree:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center',
            padding: '20px',
            fontFamily: 'sans-serif',
            background: 'linear-gradient(135deg, #311b92, #673ab7)',
            color: '#fff',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              background: '#ffffff',
              color: '#333',
              borderRadius: '20px',
              padding: '30px 24px',
              boxShadow: '0 20px 45px rgba(0,0,0,0.25)',
            }}
          >
            <h1
              style={{
                fontSize: '2rem',
                color: '#ff4d4f',
                marginBottom: '12px',
              }}
            >
              Oops! Something went wrong.
            </h1>

            <p
              style={{
                color: '#666',
                lineHeight: 1.6,
                marginBottom: '20px',
              }}
            >
              The application encountered an unexpected error.
              Please try refreshing the page.
            </p>

            <button
              onClick={this.handleReload}
              style={{
                marginTop: '10px',
                padding: '12px 22px',
                backgroundColor: '#673ab7',
                color: 'white',
                border: 'none',
                borderRadius: '24px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: 700,
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App: React.FC = () => {
  return (
    // کل اپلیکیشن داخل ErrorBoundary قرار می‌گیرد
    <ErrorBoundary>
      <div className="app-container">
        {/*
          برای جلوگیری از خطای TS2786:
          استفاده از React.createElement و casting به any باعث می‌شود
          TypeScript هنگام Build خطای
          "AppRouter cannot be used as a JSX component"
          ندهد.
        */}
        {React.createElement(AppRouter as any)}
      </div>
    </ErrorBoundary>
  );
};

export default App;
