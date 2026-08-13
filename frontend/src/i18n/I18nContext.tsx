// frontend/src/i18n/I18nContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'fa' | 'en' | 'tr';

type Translations = Record<string, Record<Language, string>>;

const translations: Translations = {
  appTitle: {
    fa: 'Pi DAO',
    en: 'Pi DAO',
    tr: 'Pi DAO',
  },
  language: {
    fa: 'زبان',
    en: 'Language',
    tr: 'Dil',
  },
  loginWithPi: {
    fa: 'ورود با Pi',
    en: 'Login with Pi',
    tr: 'Pi ile Giriş',
  },
  logout: {
    fa: 'خروج',
    en: 'Logout',
    tr: 'Çıkış',
  },
  welcome: {
    fa: 'خوش آمدی',
    en: 'Welcome',
    tr: 'Hoş geldin',
  },
  piLoginTitle: {
    fa: 'ورود به پلتفرم با حساب Pi',
    en: 'Sign in with your Pi account',
    tr: 'Pi hesabınızla giriş yapın',
  },
  piLoginDescription: {
    fa: 'برای تعامل با برنامه، ابتدا با مرورگر Pi وارد شوید.',
    en: 'To interact with the app, please sign in using Pi Browser.',
    tr: 'Uygulamayla etkileşim için Pi Browser ile giriş yapın.',
  },
  initializingPiSdk: {
    fa: 'در حال راه‌اندازی Pi SDK...',
    en: 'Initializing Pi SDK...',
    tr: 'Pi SDK başlatılıyor...',
  },
  piSdkNotFound: {
    fa: 'Pi SDK پیدا نشد. لطفاً سایت را داخل Pi Browser باز کنید.',
    en: 'Pi SDK not found. Please open this website inside Pi Browser.',
    tr: 'Pi SDK bulunamadı. Lütfen siteyi Pi Browser içinde açın.',
  },
  piSdkReady: {
    fa: 'Pi SDK آماده است.',
    en: 'Pi SDK is ready.',
    tr: 'Pi SDK hazır.',
  },
  authenticating: {
    fa: 'در حال احراز هویت با Pi...',
    en: 'Authenticating with Pi...',
    tr: 'Pi ile kimlik doğrulanıyor...',
  },
  loginSuccess: {
    fa: 'ورود موفق بود.',
    en: 'Login successful.',
    tr: 'Giriş başarılı.',
  },
  loginFailed: {
    fa: 'ورود ناموفق بود.',
    en: 'Login failed.',
    tr: 'Giriş başarısız.',
  },
  authContextMissing: {
    fa: 'سیستم احراز هویت در دسترس نیست.',
    en: 'Auth context is not available.',
    tr: 'Kimlik doğrulama sistemi mevcut değil.',
  },
  incompletePaymentFound: {
    fa: 'یک پرداخت نیمه‌تمام پیدا شد. لطفاً آن را در کیف پول Pi تکمیل یا لغو کنید.',
    en: 'Incomplete payment found. Please complete or cancel it in Pi Wallet.',
    tr: 'Tamamlanmamış ödeme bulundu. Lütfen Pi Wallet içinde tamamlayın veya iptal edin.',
  },
  network: {
    fa: 'شبکه',
    en: 'Network',
    tr: 'Ağ',
  },
  testnet: {
    fa: 'تست‌نت / Sandbox',
    en: 'Testnet / Sandbox',
    tr: 'Testnet / Sandbox',
  },
  mainnet: {
    fa: 'مین‌نت',
    en: 'Mainnet',
    tr: 'Mainnet',
  },
  signInTitle: {
    fa: 'ورود به Pi DAO',
    en: 'Pi DAO Login',
    tr: 'Pi DAO Giriş',
  },
  signInDescription: {
    fa: 'با حساب Pi Network خود وارد شوید.',
    en: 'Sign in with your Pi Network account.',
    tr: 'Pi Network hesabınızla giriş yapın.',
  },
  pleaseWait: {
    fa: 'لطفاً صبر کنید...',
    en: 'Please wait...',
    tr: 'Lütfen bekleyin...',
  },
  pleaseUsePiBrowser: {
    fa: 'لطفاً برای احراز هویت از Pi Browser استفاده کنید.',
    en: 'Please use Pi Browser for authentication.',
    tr: 'Kimlik doğrulama için lütfen Pi Browser kullanın.',
  },
  piSdkReadyLogin: {
    fa: 'Pi SDK آماده است. می‌توانید با Pi وارد شوید.',
    en: 'Pi SDK is ready. You can login with Pi.',
    tr: 'Pi SDK hazır. Pi ile giriş yapabilirsiniz.',
  },
  redirecting: {
    fa: 'در حال انتقال...',
    en: 'Redirecting...',
    tr: 'Yönlendiriliyor...',
  },
  buyNow: {
    fa: 'خرید',
    en: 'Buy Now',
    tr: 'Satın Al',
  },
  processing: {
    fa: 'در حال پردازش...',
    en: 'Processing...',
    tr: 'İşleniyor...',
  },
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Language>('fa');

  useEffect(() => {
    const savedLang = localStorage.getItem('pidao_lang') as Language | null;

    if (savedLang === 'fa' || savedLang === 'en' || savedLang === 'tr') {
      setLangState(savedLang);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('pidao_lang', newLang);

    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'fa' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = (key: string) => {
    return translations[key]?.[lang] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider');
  }

  return context;
};
