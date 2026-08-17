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

  brandName: {
    fa: 'PiDao',
    en: 'PiDao',
    tr: 'PiDao',
  },

  language: {
    fa: 'زبان',
    en: 'Language',
    tr: 'Dil',
  },

  home: {
    fa: 'خانه',
    en: 'Home',
    tr: 'Ana Sayfa',
  },

  features: {
    fa: 'ویژگی‌ها',
    en: 'Features',
    tr: 'Özellikler',
  },

  governance: {
    fa: 'حاکمیت',
    en: 'Governance',
    tr: 'Yönetişim',
  },

  aboutUs: {
    fa: 'درباره ما',
    en: 'About Us',
    tr: 'Hakkımızda',
  },

  shop: {
    fa: 'فروشگاه',
    en: 'Shop',
    tr: 'Mağaza',
  },

  tasks: {
    fa: 'تسک‌ها',
    en: 'Tasks',
    tr: 'Görevler',
  },

  login: {
    fa: 'ورود',
    en: 'Login',
    tr: 'Giriş',
  },

  logout: {
    fa: 'خروج',
    en: 'Logout',
    tr: 'Çıkış',
  },

  loginWithPi: {
    fa: 'ورود با Pi',
    en: 'Login with Pi',
    tr: 'Pi ile Giriş',
  },

  loginWithPiWallet: {
    fa: 'ورود با کیف پول Pi',
    en: 'Login with Pi Wallet',
    tr: 'Pi Wallet ile Giriş',
  },

  welcome: {
    fa: 'خوش آمدی',
    en: 'Welcome',
    tr: 'Hoş geldin',
  },

  loading: {
    fa: 'در حال بارگذاری...',
    en: 'Loading...',
    tr: 'Yükleniyor...',
  },

  connectingToServer: {
    fa: 'در حال اتصال به سرور...',
    en: 'Connecting to server...',
    tr: 'Sunucuya bağlanılıyor...',
  },

  pleaseWait: {
    fa: 'لطفاً صبر کنید...',
    en: 'Please wait...',
    tr: 'Lütfen bekleyin...',
  },

  redirecting: {
    fa: 'در حال انتقال...',
    en: 'Redirecting...',
    tr: 'Yönlendiriliyor...',
  },

  processing: {
    fa: 'در حال پردازش...',
    en: 'Processing...',
    tr: 'İşleniyor...',
  },

  serverConnectionError: {
    fa: 'خطا در اتصال به سرور. لطفاً دوباره تلاش کنید.',
    en: 'Server connection error. Please try again.',
    tr: 'Sunucu bağlantı hatası. Lütfen tekrar deneyin.',
  },

  authContextMissing: {
    fa: 'سیستم احراز هویت در دسترس نیست.',
    en: 'Auth context is not available.',
    tr: 'Kimlik doğrulama sistemi mevcut değil.',
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

  piSdkReadyLogin: {
    fa: 'Pi SDK آماده است. می‌توانید با Pi وارد شوید.',
    en: 'Pi SDK is ready. You can login with Pi.',
    tr: 'Pi SDK hazır. Pi ile giriş yapabilirsiniz.',
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

  pleaseUsePiBrowser: {
    fa: 'لطفاً برای احراز هویت از Pi Browser استفاده کنید.',
    en: 'Please use Pi Browser for authentication.',
    tr: 'Kimlik doğrulama için lütfen Pi Browser kullanın.',
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

  heroTitle: {
    fa: 'آینده خود را با PiDao غیرمتمرکز کنید',
    en: 'Decentralize Your Future with PiDao',
    tr: 'Geleceğinizi PiDao ile Merkeziyetsizleştirin',
  },

  heroDescription: {
    fa: 'نسل بعدی تصمیم‌گیری خودمختار؛ توانمندسازی جوامع از طریق حاکمیت شفاف.',
    en: 'The next generation of autonomous decision-making. Empowering communities through transparent governance.',
    tr: 'Otonom karar almanın yeni nesli. Toplulukları şeffaf yönetişimle güçlendiriyoruz.',
  },

  aboutSubtitle: {
    fa: 'درباره پروژه ما',
    en: 'About Our Project',
    tr: 'Projemiz Hakkında',
  },

  aboutTitleBefore: {
    fa: 'پل ارتباطی شما با آینده',
    en: 'Your gateway to the future of',
    tr: 'Geleceğin kapısı',
  },

  aboutTitleHighlight: {
    fa: 'Pi Network',
    en: 'Pi Network',
    tr: 'Pi Network',
  },

  aboutText: {
    fa: 'ما در این پلتفرم، بستری امن و غیرمتمرکز را برای کاربران شبکه پای فراهم کرده‌ایم تا بتوانند خدمات دیجیتال را به شکلی ساده، سریع و بدون واسطه مبادله کنند. هدف ما، قدرتمندسازی جامعه Pi از طریق تکنولوژی‌های مدرن بلاک‌چین است.',
    en: 'On this platform, we provide a secure and decentralized environment for Pi Network users to exchange digital services simply, quickly, and without intermediaries. Our goal is to empower the Pi community through modern blockchain technologies.',
    tr: 'Bu platformda, Pi Network kullanıcılarının dijital hizmetleri basit, hızlı ve aracısız şekilde paylaşabilmesi için güvenli ve merkeziyetsiz bir ortam sunuyoruz. Amacımız, modern blockchain teknolojileriyle Pi topluluğunu güçlendirmektir.',
  },

  transactionSecurity: {
    fa: 'امنیت تراکنش',
    en: 'Transaction Security',
    tr: 'İşlem Güvenliği',
  },

  technicalSupport: {
    fa: 'پشتیبانی فنی',
    en: 'Technical Support',
    tr: 'Teknik Destek',
  },

  decentralizedGovernance: {
    fa: 'حاکمیت غیرمتمرکز',
    en: 'Decentralized Governance',
    tr: 'Merkeziyetsiz Yönetim',
  },

  ourVision: {
    fa: 'چشم‌انداز ما',
    en: 'Our Vision',
    tr: 'Vizyonumuz',
  },

  visionText: {
    fa: 'ایجاد یک اکوسیستم اقتصادی خودکفا، که در آن هر کاربر Pi می‌تواند با کمترین ریسک، تجارت و تعاملات مالی جهانی خود را مدیریت کند.',
    en: 'Creating a self-sustaining economic ecosystem where every Pi user can manage global trade and financial interactions with minimal risk.',
    tr: 'Her Pi kullanıcısının küresel ticaret ve finansal etkileşimlerini düşük riskle yönetebileceği kendi kendine yeten bir ekonomik ekosistem oluşturmak.',
  },

  web3Ready: {
    fa: 'آماده Web3',
    en: 'Web3 Ready',
    tr: 'Web3 Hazır',
  },

  featuresSectionTitle: {
    fa: 'ویژگی‌های کلیدی سیستم',
    en: 'Key System Features',
    tr: 'Sistemin Temel Özellikleri',
  },

  featureSecurePaymentsTitle: {
    fa: 'پرداخت‌های امن با Pi',
    en: 'Secure Payments with Pi',
    tr: 'Pi ile Güvenli Ödemeler',
  },

  featureSecurePaymentsDescription: {
    fa: 'انتقال سریع و شفاف دارایی‌های دیجیتال بر پایه پروتکل‌های امن شبکه پای.',
    en: 'Fast and transparent transfer of digital assets based on secure Pi Network protocols.',
    tr: 'Pi Network güvenli protokolleriyle dijital varlıkların hızlı ve şeffaf transferi.',
  },

  featureDaoTitle: {
    fa: 'تعامل غیرمتمرکز DAO',
    en: 'Decentralized DAO Interaction',
    tr: 'Merkeziyetsiz DAO Etkileşimi',
  },

  featureDaoDescription: {
    fa: 'مشارکت در تصمیم‌گیری‌های شبکه و تأثیرگذاری بر آینده اکوسیستم بلاک‌چین.',
    en: 'Participate in network decisions and influence the future of the blockchain ecosystem.',
    tr: 'Ağ kararlarına katılın ve blockchain ekosisteminin geleceğini etkileyin.',
  },

  featureTransactionPanelTitle: {
    fa: 'پنل مدیریت تراکنش',
    en: 'Transaction Management Panel',
    tr: 'İşlem Yönetim Paneli',
  },

  featureTransactionPanelDescription: {
    fa: 'مشاهده لحظه‌ای تاریخچه پرداخت‌ها و مدیریت موجودی در یک محیط کاربرپسند.',
    en: 'View payment history in real time and manage balances in a user-friendly environment.',
    tr: 'Ödeme geçmişini anlık görüntüleyin ve bakiyenizi kullanıcı dostu bir ortamda yönetin.',
  },

  featureDigitalProductsTitle: {
    fa: 'پشتیبانی از محصولات دیجیتال',
    en: 'Digital Products Support',
    tr: 'Dijital Ürün Desteği',
  },

  featureDigitalProductsDescription: {
    fa: 'دسترسی به طیف وسیعی از خدمات و کالاهای دیجیتال در فروشگاه اختصاصی.',
    en: 'Access a wide range of digital goods and services in the dedicated marketplace.',
    tr: 'Özel mağazada geniş bir dijital ürün ve hizmet yelpazesine erişin.',
  },

  pollQuestion: {
    fa: 'آیا دوست دارید بخش‌های مهمی از تصمیم‌گیری جهانی غیرمتمرکز شود؟',
    en: 'Would you like to decentralize important parts of global decision-making?',
    tr: 'Küresel karar alma süreçlerinin önemli bölümlerinin merkeziyetsizleşmesini ister misiniz?',
  },

  pollYes: {
    fa: 'بله، قطعاً',
    en: 'Yes, definitely',
    tr: 'Evet, kesinlikle',
  },

  pollNo: {
    fa: 'نه، متمرکز بماند',
    en: 'No, keep it centralized',
    tr: 'Hayır, merkezi kalsın',
  },

  yesLabel: {
    fa: 'بله',
    en: 'Yes',
    tr: 'Evet',
  },

  noLabel: {
    fa: 'خیر',
    en: 'No',
    tr: 'Hayır',
  },

  alreadyVoted: {
    fa: 'رأی شما ثبت شد.',
    en: 'Your vote has been recorded.',
    tr: 'Oyunuz kaydedildi.',
  },

  pollLoading: {
    fa: 'در حال دریافت نتایج رأی‌گیری...',
    en: 'Loading poll results...',
    tr: 'Anket sonuçları yükleniyor...',
  },

  pollLoginRequired: {
    fa: 'برای ثبت رأی باید ابتدا با Pi وارد شوید.',
    en: 'You must login with Pi before voting.',
    tr: 'Oy vermeden önce Pi ile giriş yapmalısınız.',
  },

  pollAlreadyVoted: {
    fa: 'شما قبلاً در این رأی‌گیری شرکت کرده‌اید.',
    en: 'You have already voted in this poll.',
    tr: 'Bu ankette zaten oy kullandınız.',
  },

  pollVoteSuccess: {
    fa: 'رأی شما با موفقیت ثبت شد.',
    en: 'Your vote has been recorded successfully.',
    tr: 'Oyunuz başarıyla kaydedildi.',
  },

  totalVotes: {
    fa: 'مجموع رأی‌ها',
    en: 'Total votes',
    tr: 'Toplam oy',
  },

  yourVote: {
    fa: 'رأی شما',
    en: 'Your vote',
    tr: 'Oyunuz',
  },

  voteDate: {
    fa: 'تاریخ رأی',
    en: 'Vote date',
    tr: 'Oy tarihi',
  },

  voteHistory: {
    fa: 'تاریخچه رأی شما',
    en: 'Your vote history',
    tr: 'Oy geçmişiniz',
  },

  pollConnectionError: {
    fa: 'خطا در ارتباط با سرور رأی‌گیری.',
    en: 'Error connecting to poll server.',
    tr: 'Anket sunucusuna bağlanırken hata oluştu.',
  },

  historyTitle: {
    fa: '📜 تاریخچه تراکنش‌های PiDao',
    en: '📜 PiDao Transaction History',
    tr: '📜 PiDao İşlem Geçmişi',
  },

  noTransactions: {
    fa: 'هنوز هیچ تراکنشی ثبت نشده است.',
    en: 'No transactions have been recorded yet.',
    tr: 'Henüz hiç işlem kaydedilmedi.',
  },

  transactionId: {
    fa: 'ID تراکنش',
    en: 'Transaction ID',
    tr: 'İşlem ID',
  },

  transactionIdentifier: {
    fa: 'شناسه تراکنش',
    en: 'Transaction ID',
    tr: 'İşlem Kimliği',
  },

  transactionRegistered: {
    fa: 'تراکنش شما با موفقیت در شبکه ثبت شد.',
    en: 'Your transaction was successfully registered on the network.',
    tr: 'İşleminiz ağ üzerinde başarıyla kaydedildi.',
  },

  amount: {
    fa: 'مبلغ',
    en: 'Amount',
    tr: 'Tutar',
  },

  product: {
    fa: 'محصول',
    en: 'Product',
    tr: 'Ürün',
  },

  status: {
    fa: 'وضعیت',
    en: 'Status',
    tr: 'Durum',
  },

  date: {
    fa: 'تاریخ',
    en: 'Date',
    tr: 'Tarih',
  },

  successful: {
    fa: 'موفق',
    en: 'Successful',
    tr: 'Başarılı',
  },

  failed: {
    fa: 'ناموفق',
    en: 'Failed',
    tr: 'Başarısız',
  },

  pending: {
    fa: 'در انتظار',
    en: 'Pending',
    tr: 'Beklemede',
  },

  approved: {
    fa: 'تأیید شده',
    en: 'Approved',
    tr: 'Onaylandı',
  },

  cancelled: {
    fa: 'لغو شده',
    en: 'Cancelled',
    tr: 'İptal edildi',
  },

  shopTitle: {
    fa: 'بازار Pi DAO',
    en: 'Pi DAO Marketplace',
    tr: 'Pi DAO Pazarı',
  },

  shopSubtitle: {
    fa: 'محصولات دیجیتال با امنیت بلاک‌چین',
    en: 'Digital products secured by blockchain',
    tr: 'Blockchain güvenliğiyle dijital ürünler',
  },

  buyNow: {
    fa: 'خرید',
    en: 'Buy Now',
    tr: 'Satın Al',
  },

  purchaseSuccess: {
    fa: 'خرید با موفقیت انجام شد',
    en: 'Purchase completed successfully',
    tr: 'Satın alma başarıyla tamamlandı',
  },

  purchaseError: {
    fa: 'خطا در تراکنش. دوباره تلاش کنید.',
    en: 'Transaction error. Please try again.',
    tr: 'İşlem hatası. Lütfen tekrar deneyin.',
  },

  productDigitalArtName: {
    fa: 'هنر دیجیتال Pi',
    en: 'Pi Digital Art',
    tr: 'Pi Dijital Sanat',
  },

  productDigitalArtDesc: {
    fa: 'مجموعه اختصاصی NFT برای کاربران Pi.',
    en: 'Exclusive NFT collection for Pi users.',
    tr: 'Pi kullanıcıları için özel NFT koleksiyonu.',
  },

  productMembershipName: {
    fa: 'عضویت Pi',
    en: 'Pi Membership',
    tr: 'Pi Üyeliği',
  },

  productMembershipDesc: {
    fa: 'دسترسی به حق رأی ممتاز DAO.',
    en: 'Access to premium DAO voting rights.',
    tr: 'Premium DAO oy haklarına erişim.',
  },

  productCourseName: {
    fa: 'دوره کریپتو',
    en: 'Crypto Course',
    tr: 'Kripto Kursu',
  },

  productCourseDesc: {
    fa: 'یاد بگیرید چگونه کوین‌های کوچک بازار را معامله کنید.',
    en: 'Learn how to trade micro-cap coins.',
    tr: 'Mikro piyasa değerli coinleri nasıl trade edeceğinizi öğrenin.',
  },

  tasksTitle: {
    fa: 'تسک‌های روزانه تعامل',
    en: 'Daily Engagement Tasks',
    tr: 'Günlük Etkileşim Görevleri',
  },

  tasksSubtitle: {
    fa: 'این تسک‌ها را کامل کنید و پاداش Pi دریافت کنید.',
    en: 'Complete these tasks to earn Pi rewards.',
    tr: 'Pi ödülleri kazanmak için bu görevleri tamamlayın.',
  },

  taskWatchVideo: {
    fa: 'تماشای تبلیغ ویدیویی',
    en: 'Watch Video Ad',
    tr: 'Video Reklam İzle',
  },

  taskJoinPoll: {
    fa: 'شرکت در نظرسنجی جامعه',
    en: 'Join Community Poll',
    tr: 'Topluluk Anketine Katıl',
  },

  taskDailyCheckin: {
    fa: 'ورود روزانه',
    en: 'Daily Check-in',
    tr: 'Günlük Giriş',
  },

  reward: {
    fa: 'پاداش',
    en: 'Reward',
    tr: 'Ödül',
  },

  claim: {
    fa: 'دریافت',
    en: 'Claim',
    tr: 'Talep Et',
  },

  paymentSuccessful: {
    fa: 'پرداخت موفقیت‌آمیز بود!',
    en: 'Payment was successful!',
    tr: 'Ödeme başarılı!',
  },

  backToHome: {
    fa: 'بازگشت به صفحه اصلی',
    en: 'Back to Home',
    tr: 'Ana Sayfaya Dön',
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

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('pidao_lang', newLang);
  };

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
