// frontend/src/App.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import AppRouter from './Router';

/**
 * ErrorBoundary:
 * Prevents the whole React app from showing a blank page
 * when an unexpected runtime error happens.
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

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(_: Error): State {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
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
            background:
              'radial-gradient(circle at top left, rgba(255,202,40,0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(111,45,189,0.32), transparent 34%), linear-gradient(135deg, #0f0820, #3c096c)',
            color: '#ffffff',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              background:
                'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))',
              color: '#ffffff',
              borderRadius: '24px',
              padding: '32px 24px',
              boxShadow: '0 28px 70px rgba(0,0,0,0.42)',
              border: '1px solid rgba(255,255,255,0.14)',
              backdropFilter: 'blur(18px)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                marginBottom: '14px',
                padding: '7px 14px',
                borderRadius: '999px',
                background: 'rgba(255,202,40,0.12)',
                border: '1px solid rgba(255,202,40,0.28)',
                color: '#ffca28',
                fontSize: '12px',
                fontWeight: 900,
              }}
            >
              picex
            </div>

            <h1
              style={{
                fontSize: '2rem',
                color: '#ffffff',
                marginBottom: '12px',
                fontWeight: 950,
              }}
            >
              Oops! Something went wrong.
            </h1>

            <p
              style={{
                color: '#d8cfee',
                lineHeight: 1.7,
                marginBottom: '20px',
              }}
            >
              The application encountered an unexpected error.
              Please try refreshing the page.
            </p>

            <button
              type="button"
              onClick={this.handleReload}
              style={{
                marginTop: '10px',
                padding: '12px 22px',
                background:
                  'linear-gradient(135deg, #ffe7a3, #ffca28, #f4b942)',
                color: '#180d31',
                border: 'none',
                borderRadius: '999px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: 950,
                boxShadow: '0 16px 34px rgba(244,185,66,0.24)',
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
    <ErrorBoundary>
      <div className="app-container">
        {React.createElement(AppRouter as any)}
      </div>
    </ErrorBoundary>
  );
};

export default App;
