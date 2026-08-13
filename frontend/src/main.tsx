// frontend/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { I18nProvider } from './i18n/I18nContext';

// پیدا کردن عنصر ریشه با استفاده از TypeScript برای جلوگیری از خطای null
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    "Critical Error: Could not find the root element with id 'root'. Please check your index.html"
  );
}

// رندر کردن اپلیکیشن
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* I18nProvider برای چندزبانه کردن کل اپلیکیشن */}
    <I18nProvider>
      {/* AuthProvider برای دسترسی Router و تمام کامپوننت‌ها به احراز هویت */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </I18nProvider>
  </React.StrictMode>
);
