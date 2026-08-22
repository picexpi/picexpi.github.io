// frontend/src/i18n/I18nContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';

export type Language = 'en' | 'fa' | 'ar' | 'tr' | 'zh';
export type Direction = 'ltr' | 'rtl';

type TranslationItem = {
  en: string;
  fa: string;
  ar: string;
  tr: string;
  zh: string;
};

type TranslationsMap = Record<string, TranslationItem>;

interface I18nContextType {
  lang: Language;
  language: Language;
  direction: Direction;
  isRtl: boolean;
  setLang: (lang: Language) => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const SUPPORTED_LANGUAGES: Language[] = ['en', 'fa', 'ar', 'tr', 'zh'];
const STORAGE_KEY = 'picex_lang';

const isSupportedLanguage = (value: unknown): value is Language => {
  return typeof value === 'string' && SUPPORTED_LANGUAGES.includes(value as Language);
};

export const translations: TranslationsMap = {
  brandName: {
    en: 'picex',
    fa: 'picex',
    ar: 'picex',
    tr: 'picex',
    zh: 'picex',
  },
  projectName: {
    en: 'picex',
    fa: 'picex',
    ar: 'picex',
    tr: 'picex',
    zh: 'picex',
  },
  appName: {
    en: 'picex',
    fa: 'picex',
    ar: 'picex',
    tr: 'picex',
    zh: 'picex',
  },
  appTitle: {
    en: 'picex',
    fa: 'picex',
    ar: 'picex',
    tr: 'picex',
    zh: 'picex',
  },
  brandPrefix: {
    en: 'pi',
    fa: 'pi',
    ar: 'pi',
    tr: 'pi',
    zh: 'pi',
  },
  brandHighlight: {
    en: 'cex',
    fa: 'cex',
    ar: 'cex',
    tr: 'cex',
    zh: 'cex',
  },
  appDescription: {
    en: 'A Pi Network powered payment and exchange experience.',
    fa: 'تجربه‌ای برای پرداخت و تبادل مبتنی بر Pi Network.',
    ar: 'تجربة دفع وتبادل مدعومة بشبكة Pi Network.',
    tr: 'Pi Network destekli ödeme ve borsa deneyimi.',
    zh: '由 Pi Network 驱动的支付和交易体验。',
  },

  home: {
    en: 'Home',
    fa: 'خانه',
    ar: 'الرئيسية',
    tr: 'Ana sayfa',
    zh: '首页',
  },
  about: {
    en: 'About',
    fa: 'درباره ما',
    ar: 'من نحن',
    tr: 'Hakkında',
    zh: '关于',
  },
  features: {
    en: 'Features',
    fa: 'امکانات',
    ar: 'المميزات',
    tr: 'Özellikler',
    zh: '功能',
  },
  history: {
    en: 'History',
    fa: 'تاریخچه',
    ar: 'التاريخ',
    tr: 'Geçmiş',
    zh: '历史',
  },
  payment: {
    en: 'Payment',
    fa: 'پرداخت',
    ar: 'الدفع',
    tr: 'Ödeme',
    zh: '支付',
  },
  payments: {
    en: 'Payments',
    fa: 'پرداخت‌ها',
    ar: 'المدفوعات',
    tr: 'Ödemeler',
    zh: '支付记录',
  },
  poll: {
    en: 'Poll',
    fa: 'نظرسنجی',
    ar: 'استطلاع',
    tr: 'Anket',
    zh: '投票',
  },
  contact: {
    en: 'Contact',
    fa: 'تماس',
    ar: 'اتصال',
    tr: 'İletişim',
    zh: '联系',
  },
  contactUs: {
    en: 'Contact us',
    fa: 'تماس با ما',
    ar: 'اتصل بنا',
    tr: 'Bize ulaşın',
    zh: '联系我们',
  },
  dashboard: {
    en: 'Dashboard',
    fa: 'داشبورد',
    ar: 'لوحة التحكم',
    tr: 'Panel',
    zh: '仪表盘',
  },
  profile: {
    en: 'Profile',
    fa: 'پروفایل',
    ar: 'الملف الشخصي',
    tr: 'Profil',
    zh: '个人资料',
  },
  settings: {
    en: 'Settings',
    fa: 'تنظیمات',
    ar: 'الإعدادات',
    tr: 'Ayarlar',
    zh: '设置',
  },

  language: {
    en: 'Language',
    fa: 'زبان',
    ar: 'اللغة',
    tr: 'Dil',
    zh: '语言',
  },
  selectLanguage: {
    en: 'Select language',
    fa: 'انتخاب زبان',
    ar: 'اختر اللغة',
    tr: 'Dil seç',
    zh: '选择语言',
  },
  english: {
    en: 'English',
    fa: 'انگلیسی',
    ar: 'الإنجليزية',
    tr: 'İngilizce',
    zh: '英语',
  },
  persian: {
    en: 'Persian',
    fa: 'فارسی',
    ar: 'الفارسية',
    tr: 'Farsça',
    zh: '波斯语',
  },
  farsi: {
    en: 'Persian',
    fa: 'فارسی',
    ar: 'الفارسية',
    tr: 'Farsça',
    zh: '波斯语',
  },
  arabic: {
    en: 'Arabic',
    fa: 'عربی',
    ar: 'العربية',
    tr: 'Arapça',
    zh: '阿拉伯语',
  },
  turkish: {
    en: 'Turkish',
    fa: 'ترکی',
    ar: 'التركية',
    tr: 'Türkçe',
    zh: '土耳其语',
  },
  chinese: {
    en: 'Chinese',
    fa: 'چینی',
    ar: 'الصينية',
    tr: 'Çince',
    zh: '中文',
  },

  login: {
    en: 'Login',
    fa: 'ورود',
    ar: 'تسجيل الدخول',
    tr: 'Giriş',
    zh: '登录',
  },
  logout: {
    en: 'Logout',
    fa: 'خروج',
    ar: 'تسجيل الخروج',
    tr: 'Çıkış',
    zh: '退出登录',
  },
  signIn: {
    en: 'Sign in',
    fa: 'ورود',
    ar: 'تسجيل الدخول',
    tr: 'Giriş yap',
    zh: '登录',
  },
  signInTitle: {
    en: 'Sign in with Pi',
    fa: 'ورود با Pi',
    ar: 'تسجيل الدخول باستخدام Pi',
    tr: 'Pi ile giriş yap',
    zh: '使用 Pi 登录',
  },
  signInDescription: {
    en: 'Connect your Pi account to access picex services securely inside Pi Browser.',
    fa: 'برای دسترسی امن به خدمات picex، حساب Pi خود را داخل Pi Browser متصل کنید.',
    ar: 'اربط حساب Pi الخاص بك للوصول إلى خدمات picex بأمان داخل Pi Browser.',
    tr: 'picex hizmetlerine Pi Browser içinde güvenli şekilde erişmek için Pi hesabınızı bağlayın.',
    zh: '在 Pi Browser 中连接您的 Pi 账户，安全访问 picex 服务。',
  },
  loginWithPi: {
    en: 'Login with Pi',
    fa: 'ورود با Pi',
    ar: 'تسجيل الدخول بـ Pi',
    tr: 'Pi ile giriş',
    zh: '使用 Pi 登录',
  },
  joinWithPi: {
    en: 'Join with Pi',
    fa: 'پیوستن با Pi',
    ar: 'الانضمام بـ Pi',
    tr: 'Pi ile katıl',
    zh: '使用 Pi 加入',
  },
  continueWithPi: {
    en: 'Continue with Pi',
    fa: 'ادامه با Pi',
    ar: 'المتابعة بـ Pi',
    tr: 'Pi ile devam et',
    zh: '使用 Pi 继续',
  },
  loginSuccess: {
    en: 'Login successful.',
    fa: 'ورود با موفقیت انجام شد.',
    ar: 'تم تسجيل الدخول بنجاح.',
    tr: 'Giriş başarılı.',
    zh: '登录成功。',
  },
  loginFailed: {
    en: 'Login failed:',
    fa: 'ورود ناموفق بود:',
    ar: 'فشل تسجيل الدخول:',
    tr: 'Giriş başarısız:',
    zh: '登录失败：',
  },
  logoutSuccess: {
    en: 'You have been logged out.',
    fa: 'با موفقیت خارج شدید.',
    ar: 'تم تسجيل الخروج بنجاح.',
    tr: 'Çıkış yaptınız.',
    zh: '您已退出登录。',
  },
  authenticating: {
    en: 'Authenticating...',
    fa: 'در حال احراز هویت...',
    ar: 'جارٍ التحقق...',
    tr: 'Kimlik doğrulanıyor...',
    zh: '正在认证...',
  },
  redirecting: {
    en: 'Redirecting...',
    fa: 'در حال انتقال...',
    ar: 'جارٍ التحويل...',
    tr: 'Yönlendiriliyor...',
    zh: '正在跳转...',
  },
  initializingPiSdk: {
    en: 'Initializing Pi SDK...',
    fa: 'در حال راه‌اندازی Pi SDK...',
    ar: 'جارٍ تهيئة Pi SDK...',
    tr: 'Pi SDK başlatılıyor...',
    zh: '正在初始化 Pi SDK...',
  },
  piSdkReady: {
    en: 'Pi SDK is ready.',
    fa: 'Pi SDK آماده است.',
    ar: 'Pi SDK جاهز.',
    tr: 'Pi SDK hazır.',
    zh: 'Pi SDK 已准备就绪。',
  },
  piSdkNotFound: {
    en: 'Pi SDK was not found. Please open picex inside Pi Browser.',
    fa: 'Pi SDK پیدا نشد. لطفاً picex را داخل Pi Browser باز کنید.',
    ar: 'لم يتم العثور على Pi SDK. يرجى فتح picex داخل Pi Browser.',
    tr: 'Pi SDK bulunamadı. Lütfen picex uygulamasını Pi Browser içinde açın.',
    zh: '未找到 Pi SDK。请在 Pi Browser 中打开 picex。',
  },
  piAuthenticateUnavailable: {
    en: 'Pi authenticate function is not available.',
    fa: 'تابع احراز هویت Pi در دسترس نیست.',
    ar: 'دالة مصادقة Pi غير متاحة.',
    tr: 'Pi kimlik doğrulama fonksiyonu kullanılamıyor.',
    zh: 'Pi 认证功能不可用。',
  },
  pleaseUsePiBrowser: {
    en: 'For the best experience, please open picex inside Pi Browser.',
    fa: 'برای بهترین تجربه، لطفاً picex را داخل Pi Browser باز کنید.',
    ar: 'لأفضل تجربة، يرجى فتح picex داخل Pi Browser.',
    tr: 'En iyi deneyim için lütfen picex uygulamasını Pi Browser içinde açın.',
    zh: '为了获得最佳体验，请在 Pi Browser 中打开 picex。',
  },
  invalidPiUserData: {
    en: 'Invalid Pi user data received.',
    fa: 'اطلاعات کاربر Pi نامعتبر است.',
    ar: 'بيانات مستخدم Pi غير صالحة.',
    tr: 'Geçersiz Pi kullanıcı verisi alındı.',
    zh: '收到的 Pi 用户数据无效。',
  },
  userCancelledOrAuthFailed: {
    en: 'User cancelled or authentication failed.',
    fa: 'کاربر عملیات را لغو کرد یا احراز هویت ناموفق بود.',
    ar: 'ألغى المستخدم العملية أو فشلت المصادقة.',
    tr: 'Kullanıcı iptal etti veya kimlik doğrulama başarısız oldu.',
    zh: '用户取消或认证失败。',
  },

  network: {
    en: 'Network',
    fa: 'شبکه',
    ar: 'الشبكة',
    tr: 'Ağ',
    zh: '网络',
  },
  mainnet: {
    en: 'Mainnet',
    fa: 'مین‌نت',
    ar: 'الشبكة الرئيسية',
    tr: 'Ana ağ',
    zh: '主网',
  },
  testnet: {
    en: 'Testnet',
    fa: 'تست‌نت',
    ar: 'شبكة الاختبار',
    tr: 'Test ağı',
    zh: '测试网',
  },

  loading: {
    en: 'Loading...',
    fa: 'در حال بارگذاری...',
    ar: 'جارٍ التحميل...',
    tr: 'Yükleniyor...',
    zh: '加载中...',
  },
  pleaseWait: {
    en: 'Please wait...',
    fa: 'لطفاً صبر کنید...',
    ar: 'يرجى الانتظار...',
    tr: 'Lütfen bekleyin...',
    zh: '请稍候...',
  },
  processing: {
    en: 'Processing...',
    fa: 'در حال پردازش...',
    ar: 'جارٍ المعالجة...',
    tr: 'İşleniyor...',
    zh: '处理中...',
  },
  success: {
    en: 'Success',
    fa: 'موفقیت',
    ar: 'نجاح',
    tr: 'Başarılı',
    zh: '成功',
  },
  error: {
    en: 'Error',
    fa: 'خطا',
    ar: 'خطأ',
    tr: 'Hata',
    zh: '错误',
  },
  warning: {
    en: 'Warning',
    fa: 'هشدار',
    ar: 'تحذير',
    tr: 'Uyarı',
    zh: '警告',
  },
  info: {
    en: 'Info',
    fa: 'اطلاعات',
    ar: 'معلومات',
    tr: 'Bilgi',
    zh: '信息',
  },
  notFound: {
    en: 'Not found',
    fa: 'یافت نشد',
    ar: 'غير موجود',
    tr: 'Bulunamadı',
    zh: '未找到',
  },
  serverError: {
    en: 'Server error',
    fa: 'خطای سرور',
    ar: 'خطأ في الخادم',
    tr: 'Sunucu hatası',
    zh: '服务器错误',
  },
  connectionError: {
    en: 'Connection error',
    fa: 'خطای اتصال',
    ar: 'خطأ في الاتصال',
    tr: 'Bağlantı hatası',
    zh: '连接错误',
  },
  apiError: {
    en: 'API error',
    fa: 'خطای API',
    ar: 'خطأ في API',
    tr: 'API hatası',
    zh: 'API 错误',
  },

  heroBadge: {
    en: 'Built for the Pi ecosystem',
    fa: 'ساخته‌شده برای اکوسیستم Pi',
    ar: 'مصمم لمنظومة Pi',
    tr: 'Pi ekosistemi için geliştirildi',
    zh: '为 Pi 生态系统而构建',
  },
  heroTitle: {
    en: 'Trade, pay, and grow with picex',
    fa: 'با picex معامله، پرداخت و رشد کنید',
    ar: 'تداول وادفع وانمُ مع picex',
    tr: 'picex ile işlem yapın، ödeme yapın ve büyüyün',
    zh: '使用 picex 交易、支付和成长',
  },
  heroSubtitle: {
    en: 'A modern Pi-powered platform',
    fa: 'یک پلتفرم مدرن مبتنی بر Pi',
    ar: 'منصة حديثة مدعومة بـ Pi',
    tr: 'Pi destekli modern bir platform',
    zh: '由 Pi 驱动的现代平台',
  },
  heroDescription: {
    en: 'picex helps Pi users experience simple payments, future exchange utilities, community features, and secure account access.',
    fa: 'picex به کاربران Pi کمک می‌کند پرداخت ساده، امکانات آینده تبادل، قابلیت‌های اجتماعی و دسترسی امن به حساب را تجربه کنند.',
    ar: 'يساعد picex مستخدمي Pi على تجربة المدفوعات البسيطة، وأدوات التبادل المستقبلية، وميزات المجتمع، والوصول الآمن للحساب.',
    tr: 'picex, Pi kullanıcılarının basit ödemeler، gelecekteki borsa araçları، topluluk özellikleri ve güvenli hesap erişimi deneyimlemesine yardımcı olur.',
    zh: 'picex 帮助 Pi 用户体验简单支付、未来交易工具、社区功能和安全账户访问。',
  },
  heroPrimaryButton: {
    en: 'Get started',
    fa: 'شروع کنید',
    ar: 'ابدأ الآن',
    tr: 'Başlayın',
    zh: '开始',
  },
  heroSecondaryButton: {
    en: 'Learn more',
    fa: 'بیشتر بدانید',
    ar: 'اعرف المزيد',
    tr: 'Daha fazla bilgi',
    zh: '了解更多',
  },
  picexHeroTitle: {
    en: 'Welcome to picex',
    fa: 'به picex خوش آمدید',
    ar: 'مرحباً بك في picex',
    tr: 'picex’e hoş geldiniz',
    zh: '欢迎来到 picex',
  },
  picexHeroDescription: {
    en: 'picex is designed for Pi Network users who want a smooth, secure, and modern digital payment experience.',
    fa: 'picex برای کاربران Pi Network طراحی شده تا تجربه‌ای روان، امن و مدرن از پرداخت دیجیتال داشته باشند.',
    ar: 'تم تصميم picex لمستخدمي Pi Network الذين يريدون تجربة دفع رقمية سهلة وآمنة وحديثة.',
    tr: 'picex, sorunsuz، güvenli ve modern bir dijital ödeme deneyimi isteyen Pi Network kullanıcıları için tasarlanmıştır.',
    zh: 'picex 专为希望获得流畅、安全、现代数字支付体验的 Pi Network 用户而设计。',
  },

  aboutTitle: {
    en: 'About picex',
    fa: 'درباره picex',
    ar: 'حول picex',
    tr: 'picex hakkında',
    zh: '关于 picex',
  },
  aboutSubtitle: {
    en: 'A project focused on Pi utility',
    fa: 'پروژه‌ای متمرکز بر کاربردپذیری Pi',
    ar: 'مشروع يركز على فائدة Pi',
    tr: 'Pi kullanım alanlarına odaklanan bir proje',
    zh: '专注于 Pi 实用性的项目',
  },
  aboutDescription: {
    en: 'picex is building a user-friendly environment for Pi-based services, payments, and digital commerce.',
    fa: 'picex در حال ساخت محیطی کاربرپسند برای خدمات، پرداخت‌ها و تجارت دیجیتال مبتنی بر Pi است.',
    ar: 'يقوم picex ببناء بيئة سهلة الاستخدام للخدمات والمدفوعات والتجارة الرقمية المعتمدة على Pi.',
    tr: 'picex, Pi tabanlı hizmetler، ödemeler ve dijital ticaret için kullanıcı dostu bir ortam oluşturuyor.',
    zh: 'picex 正在为基于 Pi 的服务、支付和数字商务构建友好的用户环境。',
  },
  picexAboutText: {
    en: 'picex is an independent project and brand focused on the Pi ecosystem.',
    fa: 'picex یک پروژه و برند مستقل با تمرکز بر اکوسیستم Pi است.',
    ar: 'picex مشروع وعلامة مستقلة تركز على منظومة Pi.',
    tr: 'picex, Pi ekosistemine odaklanan bağımsız bir proje ve markadır.',
    zh: 'picex 是一个专注于 Pi 生态系统的独立项目和品牌。',
  },

  featuresTitle: {
    en: 'Features',
    fa: 'امکانات',
    ar: 'المميزات',
    tr: 'Özellikler',
    zh: '功能',
  },
  featuresSubtitle: {
    en: 'Everything built around simplicity and trust',
    fa: 'همه‌چیز بر پایه سادگی و اعتماد ساخته شده است',
    ar: 'كل شيء مبني على البساطة والثقة',
    tr: 'Her şey sadelik ve güven üzerine kuruldu',
    zh: '一切都围绕简单和信任构建',
  },
  picexFeatureSpotTitle: {
    en: 'Why picex?',
    fa: 'چرا picex؟',
    ar: 'لماذا picex؟',
    tr: 'Neden picex?',
    zh: '为什么选择 picex？',
  },
  featureFastTitle: {
    en: 'Fast experience',
    fa: 'تجربه سریع',
    ar: 'تجربة سريعة',
    tr: 'Hızlı deneyim',
    zh: '快速体验',
  },
  featureFastDescription: {
    en: 'A lightweight interface designed for quick access and smooth user interaction.',
    fa: 'رابطی سبک برای دسترسی سریع و تعامل روان کاربران.',
    ar: 'واجهة خفيفة للوصول السريع والتفاعل السلس.',
    tr: 'Hızlı erişim ve akıcı kullanıcı etkileşimi için tasarlanmış hafif bir arayüz.',
    zh: '轻量级界面，专为快速访问和流畅交互而设计。',
  },
  featureSecureTitle: {
    en: 'Secure login',
    fa: 'ورود امن',
    ar: 'دخول آمن',
    tr: 'Güvenli giriş',
    zh: '安全登录',
  },
  featureSecureDescription: {
    en: 'Authentication is handled through Pi SDK and protected backend JWT sessions.',
    fa: 'احراز هویت از طریق Pi SDK انجام می‌شود و نشست‌های کاربر با JWT در بک‌اند محافظت می‌شوند.',
    ar: 'تتم المصادقة عبر Pi SDK ويتم حماية جلسات المستخدم عبر JWT في الخلفية.',
    tr: 'Kimlik doğrulama Pi SDK üzerinden yapılır ve backend JWT oturumlarıyla korunur.',
    zh: '认证通过 Pi SDK 完成，并由后端 JWT 会话保护。',
  },
  featurePiTitle: {
    en: 'Pi Network integration',
    fa: 'یکپارچگی با Pi Network',
    ar: 'تكامل مع Pi Network',
    tr: 'Pi Network entegrasyonu',
    zh: 'Pi Network 集成',
  },
  featurePiDescription: {
    en: 'Built to work with Pi Browser and Pi payment workflows.',
    fa: 'طراحی‌شده برای کار با Pi Browser و فرایندهای پرداخت Pi.',
    ar: 'مصمم للعمل مع Pi Browser وتدفقات الدفع الخاصة بـ Pi.',
    tr: 'Pi Browser ve Pi ödeme akışlarıyla çalışmak üzere geliştirildi.',
    zh: '为配合 Pi Browser 和 Pi 支付流程而构建。',
  },

  historyTitle: {
    en: 'Our journey',
    fa: 'مسیر ما',
    ar: 'رحلتنا',
    tr: 'Yolculuğumuz',
    zh: '我们的旅程',
  },
  historySubtitle: {
    en: 'From idea to Pi utility',
    fa: 'از ایده تا کاربرد واقعی Pi',
    ar: 'من الفكرة إلى فائدة Pi',
    tr: 'Fikirden Pi kullanımına',
    zh: '从想法到 Pi 实用场景',
  },
  historyDescription: {
    en: 'picex started with a simple goal: make Pi-based interactions easier and more useful for everyday users.',
    fa: 'picex با یک هدف ساده آغاز شد: آسان‌تر و کاربردی‌تر کردن تعاملات مبتنی بر Pi برای کاربران روزمره.',
    ar: 'بدأ picex بهدف بسيط: جعل التفاعلات المعتمدة على Pi أسهل وأكثر فائدة للمستخدمين اليوميين.',
    tr: 'picex basit bir hedefle başladı: Pi tabanlı etkileşimleri günlük kullanıcılar için daha kolay ve faydalı hale getirmek.',
    zh: 'picex 以一个简单目标开始：让基于 Pi 的交互对日常用户更简单、更有用。',
  },

  paymentTitle: {
    en: 'Pi Payment',
    fa: 'پرداخت Pi',
    ar: 'دفع Pi',
    tr: 'Pi Ödemesi',
    zh: 'Pi 支付',
  },
  paymentSubtitle: {
    en: 'Pay securely with Pi',
    fa: 'پرداخت امن با Pi',
    ar: 'ادفع بأمان باستخدام Pi',
    tr: 'Pi ile güvenli ödeme yapın',
    zh: '使用 Pi 安全支付',
  },
  paymentDescription: {
    en: 'Use Pi payments to complete supported actions inside picex.',
    fa: 'برای انجام عملیات پشتیبانی‌شده داخل picex از پرداخت‌های Pi استفاده کنید.',
    ar: 'استخدم مدفوعات Pi لإكمال الإجراءات المدعومة داخل picex.',
    tr: 'picex içinde desteklenen işlemleri tamamlamak için Pi ödemelerini kullanın.',
    zh: '使用 Pi 支付完成 picex 中支持的操作。',
  },
  paymentAmount: {
    en: 'Payment amount',
    fa: 'مبلغ پرداخت',
    ar: 'مبلغ الدفع',
    tr: 'Ödeme tutarı',
    zh: '支付金额',
  },
  amount: {
    en: 'Amount',
    fa: 'مبلغ',
    ar: 'المبلغ',
    tr: 'Tutar',
    zh: '金额',
  },
  paymentMemo: {
    en: 'Payment memo',
    fa: 'توضیح پرداخت',
    ar: 'ملاحظة الدفع',
    tr: 'Ödeme notu',
    zh: '支付备注',
  },
  payWithPi: {
    en: 'Pay with Pi',
    fa: 'پرداخت با Pi',
    ar: 'ادفع بـ Pi',
    tr: 'Pi ile öde',
    zh: '使用 Pi 支付',
  },
  paymentPending: {
    en: 'Payment is pending.',
    fa: 'پرداخت در انتظار تأیید است.',
    ar: 'الدفع قيد الانتظار.',
    tr: 'Ödeme beklemede.',
    zh: '支付待处理。',
  },
  paymentApproved: {
    en: 'Payment approved.',
    fa: 'پرداخت تأیید شد.',
    ar: 'تمت الموافقة على الدفع.',
    tr: 'Ödeme onaylandı.',
    zh: '支付已批准。',
  },
  paymentCompleted: {
    en: 'Payment completed.',
    fa: 'پرداخت کامل شد.',
    ar: 'اكتمل الدفع.',
    tr: 'Ödeme tamamlandı.',
    zh: '支付已完成。',
  },
  paymentCancelled: {
    en: 'Payment cancelled.',
    fa: 'پرداخت لغو شد.',
    ar: 'تم إلغاء الدفع.',
    tr: 'Ödeme iptal edildi.',
    zh: '支付已取消。',
  },
  paymentError: {
    en: 'Payment error.',
    fa: 'خطا در پرداخت.',
    ar: 'خطأ في الدفع.',
    tr: 'Ödeme hatası.',
    zh: '支付错误。',
  },
  paymentSuccessful: {
    en: 'Payment successful',
    fa: 'پرداخت موفق بود',
    ar: 'تم الدفع بنجاح',
    tr: 'Ödeme başarılı',
    zh: '支付成功',
  },
  transactionRegistered: {
    en: 'Your transaction has been registered successfully.',
    fa: 'تراکنش شما با موفقیت ثبت شد.',
    ar: 'تم تسجيل معاملتك بنجاح.',
    tr: 'İşleminiz başarıyla kaydedildi.',
    zh: '您的交易已成功记录。',
  },
  transactionIdentifier: {
    en: 'Transaction ID',
    fa: 'شناسه تراکنش',
    ar: 'معرّف المعاملة',
    tr: 'İşlem kimliği',
    zh: '交易 ID',
  },
  backToHome: {
    en: 'Back to home',
    fa: 'بازگشت به خانه',
    ar: 'العودة للرئيسية',
    tr: 'Ana sayfaya dön',
    zh: '返回首页',
  },

  pollTitle: {
    en: 'Community poll',
    fa: 'نظرسنجی جامعه',
    ar: 'استطلاع المجتمع',
    tr: 'Topluluk anketi',
    zh: '社区投票',
  },
  pollSubtitle: {
    en: 'Share your opinion with us',
    fa: 'نظر خود را با ما به اشتراک بگذارید',
    ar: 'شاركنا رأيك',
    tr: 'Görüşünüzü bizimle paylaşın',
    zh: '与我们分享您的意见',
  },
  pollQuestion: {
    en: 'How do you rate your picex experience?',
    fa: 'تجربه خود از picex را چگونه ارزیابی می‌کنید؟',
    ar: 'كيف تقيم تجربتك مع picex؟',
    tr: 'picex deneyiminizi nasıl değerlendirirsiniz?',
    zh: '您如何评价 picex 体验？',
  },
  pollLoading: {
    en: 'Loading poll...',
    fa: 'در حال بارگذاری نظرسنجی...',
    ar: 'جارٍ تحميل الاستطلاع...',
    tr: 'Anket yükleniyor...',
    zh: '正在加载投票...',
  },
  pollSubmit: {
    en: 'Submit vote',
    fa: 'ثبت رأی',
    ar: 'إرسال التصويت',
    tr: 'Oyu gönder',
    zh: '提交投票',
  },
  pollSubmitted: {
    en: 'Your vote has been submitted.',
    fa: 'رأی شما ثبت شد.',
    ar: 'تم إرسال تصويتك.',
    tr: 'Oyunuz gönderildi.',
    zh: '您的投票已提交。',
  },
  pollError: {
    en: 'Unable to submit your vote.',
    fa: 'امکان ثبت رأی وجود ندارد.',
    ar: 'تعذر إرسال التصويت.',
    tr: 'Oyunuz gönderilemedi.',
    zh: '无法提交您的投票。',
  },

  footerDescription: {
    en: 'picex is a Pi-focused platform for payments, services, and future exchange utilities.',
    fa: 'picex پلتفرمی متمرکز بر Pi برای پرداخت‌ها، خدمات و امکانات آینده تبادل است.',
    ar: 'picex منصة تركز على Pi للمدفوعات والخدمات وأدوات التبادل المستقبلية.',
    tr: 'picex; ödemeler، hizmetler ve gelecekteki borsa araçları için Pi odaklı bir platformdur.',
    zh: 'picex 是一个专注于 Pi 的平台，面向支付、服务和未来交易工具。',
  },
  footerQuickLinks: {
    en: 'Quick links',
    fa: 'لینک‌های سریع',
    ar: 'روابط سريعة',
    tr: 'Hızlı bağlantılar',
    zh: '快捷链接',
  },
  footerLegal: {
    en: 'Legal',
    fa: 'قوانین',
    ar: 'قانوني',
    tr: 'Yasal',
    zh: '法律',
  },
  footerRights: {
    en: 'All rights reserved.',
    fa: 'تمام حقوق محفوظ است.',
    ar: 'جميع الحقوق محفوظة.',
    tr: 'Tüm hakları saklıdır.',
    zh: '保留所有权利。',
  },
  terms: {
    en: 'Terms',
    fa: 'قوانین استفاده',
    ar: 'الشروط',
    tr: 'Şartlar',
    zh: '条款',
  },
  privacy: {
    en: 'Privacy',
    fa: 'حریم خصوصی',
    ar: 'الخصوصية',
    tr: 'Gizlilik',
    zh: '隐私',
  },
  support: {
    en: 'Support',
    fa: 'پشتیبانی',
    ar: 'الدعم',
    tr: 'Destek',
    zh: '支持',
  },

  orderBookTrading: {
    en: 'Order book trading',
    fa: 'معامله با دفتر سفارشات',
    ar: 'التداول عبر دفتر الأوامر',
    tr: 'Emir defteriyle alım satım',
    zh: '订单簿交易',
  },
  futures: {
    en: 'Futures',
    fa: 'معاملات فیوچرز',
    ar: 'العقود الآجلة',
    tr: 'Vadeli işlemler',
    zh: '期货',
  },
  plannedPerpetualLayer: {
    en: 'Planned perpetual layer',
    fa: 'لایه پرپچوال برنامه‌ریزی‌شده',
    ar: 'طبقة العقود الدائمة المخطط لها',
    tr: 'Planlanan sürekli işlem katmanı',
    zh: '计划中的永续合约层',
  },
  ai: {
    en: 'AI',
    fa: 'هوش مصنوعی',
    ar: 'الذكاء الاصطناعي',
    tr: 'Yapay zeka',
    zh: '人工智能',
  },
  onlineSupportAssistant: {
    en: 'Online support assistant',
    fa: 'دستیار پشتیبانی آنلاین',
    ar: 'مساعد الدعم عبر الإنترنت',
    tr: 'Çevrimiçi destek asistanı',
    zh: '在线支持助手',
  },
  charts: {
    en: 'Charts',
    fa: 'نمودارها',
    ar: 'الرسوم البيانية',
    tr: 'Grafikler',
    zh: '图表',
  },
  picexNativeData: {
    en: 'picex native data',
    fa: 'داده‌های بومی picex',
    ar: 'بيانات picex الأصلية',
    tr: 'picex yerel verileri',
    zh: 'picex 原生数据',
  },

  aiOnlineSupport: {
    en: 'AI Online Support',
    fa: 'پشتیبانی آنلاین با هوش مصنوعی',
    ar: 'الدعم الإلكتروني بالذكاء الاصطناعي',
    tr: 'Yapay zeka destekli çevrimiçi destek',
    zh: 'AI 在线支持',
  },
  aiSupportTitle: {
    en: 'AI Online Support',
    fa: 'پشتیبانی آنلاین با هوش مصنوعی',
    ar: 'الدعم الإلكتروني بالذكاء الاصطناعي',
    tr: 'Yapay zeka destekli çevrimiçi destek',
    zh: 'AI 在线支持',
  },
  aiSupportSubtitle: {
    en: '24/7 intelligent support for traders',
    fa: 'پشتیبانی هوشمند ۲۴ ساعته برای معامله‌گران',
    ar: 'دعم ذكي على مدار الساعة للمتداولين',
    tr: 'Yatırımcılar için 7/24 akıllı destek',
    zh: '为交易者提供 24/7 智能支持',
  },
  aiSupportDescription: {
    en: 'The picex support assistant will help users understand Pi login, payments, deposits, withdrawals, wallet safety, trading fees, order status, KYC requirements, and platform rules.',
    fa: 'دستیار پشتیبانی picex به کاربران کمک می‌کند ورود با Pi، پرداخت‌ها، واریزها، برداشت‌ها، امنیت کیف پول، کارمزد معاملات، وضعیت سفارش‌ها، الزامات KYC و قوانین پلتفرم را بهتر درک کنند.',
    ar: 'سيساعد مساعد دعم picex المستخدمين على فهم تسجيل الدخول عبر Pi، والمدفوعات، والإيداعات، والسحوبات، وأمان المحفظة، ورسوم التداول، وحالة الأوامر، ومتطلبات KYC، وقواعد المنصة.',
    tr: 'picex destek asistanı; Pi girişi، ödemeler، yatırma، çekme، cüzdan güvenliği، işlem ücretleri، emir durumu، KYC gereksinimleri ve platform kuralları hakkında kullanıcılara yardımcı olur.',
    zh: 'picex 支持助手将帮助用户了解 Pi 登录、支付、充值、提现、钱包安全、交易费用、订单状态、KYC 要求以及平台规则。',
  },
  aiSupportBulletInstantAnswers: {
    en: 'Instant answers based on picex documentation',
    fa: 'پاسخ‌های فوری بر اساس مستندات picex',
    ar: 'إجابات فورية بناءً على وثائق picex',
    tr: 'picex belgelerine dayalı anında yanıtlar',
    zh: '基于 picex 文档的即时回答',
  },
  aiSupportBulletDepositWithdrawal: {
    en: 'Guided help for deposit and withdrawal issues',
    fa: 'راهنمایی مرحله‌به‌مرحله برای مشکلات واریز و برداشت',
    ar: 'مساعدة إرشادية لمشكلات الإيداع والسحب',
    tr: 'Yatırma ve çekme sorunları için yönlendirmeli yardım',
    zh: '针对充值和提现问题的引导式帮助',
  },
  aiSupportBulletHumanEscalation: {
    en: 'Escalation to human support for risky or sensitive cases',
    fa: 'ارجاع موارد حساس یا پرریسک به پشتیبانی انسانی',
    ar: 'تصعيد الحالات الحساسة أو عالية المخاطر إلى الدعم البشري',
    tr: 'Riskli veya hassas durumlarda insan desteğine yönlendirme',
    zh: '对高风险或敏感情况升级至人工支持',
  },
  aiSupportBulletRagKnowledgeBase: {
    en: 'Future RAG knowledge base using PostgreSQL / pgvector',
    fa: 'پایگاه دانش RAG آینده با استفاده از PostgreSQL / pgvector',
    ar: 'قاعدة معرفة RAG مستقبلية باستخدام PostgreSQL / pgvector',
    tr: 'PostgreSQL / pgvector kullanan gelecekteki RAG bilgi tabanı',
    zh: '未来使用 PostgreSQL / pgvector 的 RAG 知识库',
  },
  picexAiSupport: {
    en: 'picex AI Support',
    fa: 'پشتیبانی هوش مصنوعی picex',
    ar: 'دعم picex بالذكاء الاصطناعي',
    tr: 'picex AI Desteği',
    zh: 'picex AI 支持',
  },
  aiSupportAskPlaceholder: {
    en: 'Ask me about deposits, withdrawals, Pi login, trading fees, or KYC.',
    fa: 'درباره واریز، برداشت، ورود با Pi، کارمزد معاملات یا KYC از من بپرسید.',
    ar: 'اسألني عن الإيداعات، والسحوبات، وتسجيل الدخول عبر Pi، ورسوم التداول، أو KYC.',
    tr: 'Bana yatırma، çekme، Pi girişi، işlem ücretleri veya KYC hakkında soru sor.',
    zh: '向我询问充值、提现、Pi 登录、交易费用或 KYC。',
  },
  aiSupportSampleQuestionDepositTime: {
    en: 'How long does a Pi deposit take?',
    fa: 'واریز Pi چقدر زمان می‌برد؟',
    ar: 'كم يستغرق إيداع Pi؟',
    tr: 'Pi yatırma işlemi ne kadar sürer?',
    zh: 'Pi 充值需要多长时间？',
  },
  aiSupportSampleAnswerDepositTime: {
    en: 'Deposits appear as pending first. After the required confirmation policy is met, picex credits the internal ledger and makes the balance available.',
    fa: 'واریزها ابتدا به‌صورت در انتظار نمایش داده می‌شوند. پس از برآورده شدن سیاست تأیید موردنیاز، picex موجودی را در دفتر داخلی ثبت می‌کند و آن را قابل استفاده می‌سازد.',
    ar: 'تظهر الإيداعات أولاً كحالة معلقة. بعد استيفاء سياسة التأكيد المطلوبة، يقوم picex بإضافة الرصيد إلى السجل الداخلي ويجعله متاحاً.',
    tr: 'Yatırma işlemleri önce beklemede görünür. Gerekli onay politikası tamamlandıktan sonra picex bakiyeyi iç deftere işler ve kullanılabilir hale getirir.',
    zh: '充值会先显示为待处理。达到所需确认策略后，picex 会将余额记入内部账本并使其可用。',
  },

  picexNativeMarketData: {
    en: 'picex Native Market Data',
    fa: 'داده‌های بومی بازار picex',
    ar: 'بيانات السوق الأصلية من picex',
    tr: 'picex Yerel Piyasa Verileri',
    zh: 'picex 原生市场数据',
  },
  nativeMarketDataTitle: {
    en: 'picex Native Market Data',
    fa: 'داده‌های بومی بازار picex',
    ar: 'بيانات السوق الأصلية من picex',
    tr: 'picex Yerel Piyasa Verileri',
    zh: 'picex 原生市场数据',
  },
  nativeMarketDataSubtitle: {
    en: 'Live markets powered by picex trading activity',
    fa: 'بازارهای زنده بر پایه فعالیت معاملاتی picex',
    ar: 'أسواق مباشرة مدعومة بنشاط التداول على picex',
    tr: 'picex işlem aktivitesiyle desteklenen canlı piyasalar',
    zh: '由 picex 交易活动驱动的实时市场',
  },
  nativeMarketDataDescription: {
    en: 'picex price charts are designed to be generated from our own executed trades, order book events, and OHLC candle aggregation — not from unrelated external market feeds. This gives Pi traders a cleaner view of the real picex market.',
    fa: 'نمودارهای قیمت picex طوری طراحی شده‌اند که از معاملات انجام‌شده در خود پلتفرم، رویدادهای دفتر سفارشات و تجمیع کندل‌های OHLC ساخته شوند؛ نه از فیدهای بازار خارجی و نامرتبط. این موضوع به معامله‌گران Pi دید شفاف‌تری از بازار واقعی picex می‌دهد.',
    ar: 'تم تصميم مخططات الأسعار في picex ليتم إنشاؤها من صفقاتنا المنفذة، وأحداث دفتر الأوامر، وتجميع شموع OHLC، وليس من مصادر أسعار خارجية غير مرتبطة. يمنح ذلك متداولي Pi رؤية أوضح للسوق الحقيقي على picex.',
    tr: 'picex fiyat grafikleri; alakasız harici piyasa verilerinden değil، kendi gerçekleşen işlemlerimizden، emir defteri olaylarından ve OHLC mum toplamasından üretilmek üzere tasarlanmıştır. Bu, Pi yatırımcılarına gerçek picex piyasasının daha temiz bir görünümünü sunar.',
    zh: 'picex 价格图表设计为基于我们自己的成交交易、订单簿事件和 OHLC K 线聚合生成，而不是来自无关的外部市场数据源。这让 Pi 交易者能够更清晰地看到真实的 picex 市场。',
  },

  piUsdtPair: {
    en: 'PI / USDT',
    fa: 'PI / USDT',
    ar: 'PI / USDT',
    tr: 'PI / USDT',
    zh: 'PI / USDT',
  },
  spotMarket: {
    en: 'Spot Market',
    fa: 'بازار اسپات',
    ar: 'السوق الفورية',
    tr: 'Spot piyasa',
    zh: '现货市场',
  },
  piUsdtMarketDescription: {
    en: 'Order book, trades, candles, volume',
    fa: 'دفتر سفارشات، معاملات، کندل‌ها، حجم',
    ar: 'دفتر الأوامر، الصفقات، الشموع، الحجم',
    tr: 'Emir defteri، işlemler، mumlar، hacim',
    zh: '订单簿、成交、K线、成交量',
  },
  piNightPair: {
  en: 'PI / NIGHT',
  fa: 'PI / NIGHT',
  ar: 'PI / NIGHT',
  tr: 'PI / NIGHT',
  zh: 'PI / NIGHT',
},

piNightMarketDescription: {
  en: 'Designed for future picex utility economy',
  fa: 'طراحی‌شده برای اقتصاد کاربردی آینده picex',
  ar: 'مصمم لاقتصاد المنفعة المستقبلي في picex',
  tr: 'Gelecekteki picex kullanım ekonomisi için tasarlandı',
  zh: '为未来 picex 实用经济而设计',
},

nativeMarketDataFootnote: {
  en: 'Market data is planned to be based on verified picex trading activity, internal ledgers, and exchange-generated candle data.',
  fa: 'داده‌های بازار قرار است بر پایه فعالیت معاملاتی تأییدشده picex، دفترهای داخلی و داده‌های کندلی تولیدشده توسط صرافی ساخته شوند.',
  ar: 'من المخطط أن تعتمد بيانات السوق على نشاط تداول picex الموثق، والسجلات الداخلية، وبيانات الشموع التي تولدها المنصة.',
  tr: 'Piyasa verilerinin doğrulanmış picex işlem aktivitesi, iç kayıt defterleri ve borsa tarafından üretilen mum verilerine dayanması planlanmaktadır.',
  zh: '市场数据计划基于经过验证的 picex 交易活动、内部账本以及交易所生成的 K 线数据。',
},

aiSupportInputPlaceholder: {
  en: 'Ask about deposits, withdrawals, Pi login, fees, or KYC...',
  fa: 'درباره واریز، برداشت، ورود با Pi، کارمزدها یا KYC بپرسید...',
  ar: 'اسأل عن الإيداعات، والسحوبات، وتسجيل الدخول عبر Pi، والرسوم، أو KYC...',
  tr: 'Yatırma, çekme, Pi girişi, ücretler veya KYC hakkında sorun...',
  zh: '询问充值、提现、Pi 登录、费用或 KYC...',
},

active: {
  en: 'Active',
  fa: 'فعال',
  ar: 'نشط',
  tr: 'Aktif',
  zh: '在线',
},

  },
  ecosystemPair: {
    en: 'Ecosystem Pair',
    fa: 'جفت‌ارز اکوسیستم',
    ar: 'زوج منظومة النظام',
    tr: 'Ekosistem paritesi',
    zh: '生态交易对',
  },
  piPicMarketDescription: {
    en: 'Designed for future picex utility economy',
    fa: 'طراحی‌شده برای اقتصاد کاربردی آینده picex',
    ar: 'مصمم لاقتصاد المنفعة المستقبلي في picex',
    tr: 'Gelecekteki picex kullanım ekonomisi için tasarlandı',
    zh: '为未来 picex 实用经济而设计',
  },
  piPerpPair: {
    en: 'PI-PERP',
    fa: 'PI-PERP',
    ar: 'PI-PERP',
    tr: 'PI-PERP',
    zh: 'PI-PERP',
  },
  futuresReady: {
    en: 'Futures Ready',
    fa: 'آماده برای فیوچرز',
    ar: 'جاهز للعقود الآجلة',
    tr: 'Vadeli işlemlere hazır',
    zh: '期货就绪',
  },
  piPerpMarketDescription: {
    en: 'Planned perpetual market after risk engine maturity',
    fa: 'بازار پرپچوال برنامه‌ریزی‌شده پس از بلوغ موتور ریسک',
    ar: 'سوق عقود دائمة مخطط له بعد نضج محرك المخاطر',
    tr: 'Risk motoru olgunlaştıktan sonra planlanan sürekli piyasa',
    zh: '风险引擎成熟后计划推出的永续市场',
  },
  orderBook: {
    en: 'Order book',
    fa: 'دفتر سفارشات',
    ar: 'دفتر الأوامر',
    tr: 'Emir defteri',
    zh: '订单簿',
  },
  trades: {
    en: 'Trades',
    fa: 'معاملات',
    ar: 'الصفقات',
    tr: 'İşlemler',
    zh: '成交',
  },
  candles: {
    en: 'Candles',
    fa: 'کندل‌ها',
    ar: 'الشموع',
    tr: 'Mumlar',
    zh: 'K线',
  },
  volume: {
    en: 'Volume',
    fa: 'حجم',
    ar: 'الحجم',
    tr: 'Hacim',
    zh: '成交量',
  },

  user: {
    en: 'User',
    fa: 'کاربر',
    ar: 'المستخدم',
    tr: 'Kullanıcı',
    zh: '用户',
  },
  users: {
    en: 'Users',
    fa: 'کاربران',
    ar: 'المستخدمون',
    tr: 'Kullanıcılar',
    zh: '用户',
  },
  username: {
    en: 'Username',
    fa: 'نام کاربری',
    ar: 'اسم المستخدم',
    tr: 'Kullanıcı adı',
    zh: '用户名',
  },
  userId: {
    en: 'User ID',
    fa: 'شناسه کاربر',
    ar: 'معرّف المستخدم',
    tr: 'Kullanıcı kimliği',
    zh: '用户 ID',
  },
  role: {
    en: 'Role',
    fa: 'نقش',
    ar: 'الدور',
    tr: 'Rol',
    zh: '角色',
  },
  admin: {
    en: 'Admin',
    fa: 'مدیر',
    ar: 'مدير',
    tr: 'Yönetici',
    zh: '管理员',
  },
  adminPanel: {
    en: 'Admin panel',
    fa: 'پنل مدیریت',
    ar: 'لوحة المدير',
    tr: 'Yönetici paneli',
    zh: '管理面板',
  },
  wallet: {
    en: 'Wallet',
    fa: 'کیف پول',
    ar: 'المحفظة',
    tr: 'Cüzdan',
    zh: '钱包',
  },
  balance: {
    en: 'Balance',
    fa: 'موجودی',
    ar: 'الرصيد',
    tr: 'Bakiye',
    zh: '余额',
  },
  status: {
    en: 'Status',
    fa: 'وضعیت',
    ar: 'الحالة',
    tr: 'Durum',
    zh: '状态',
  },
  date: {
    en: 'Date',
    fa: 'تاریخ',
    ar: 'التاريخ',
    tr: 'Tarih',
    zh: '日期',
  },
  transactions: {
    en: 'Transactions',
    fa: 'تراکنش‌ها',
    ar: 'المعاملات',
    tr: 'İşlemler',
    zh: '交易',
  },

  welcome: {
    en: 'Welcome',
    fa: 'خوش آمدید',
    ar: 'مرحباً',
    tr: 'Hoş geldiniz',
    zh: '欢迎',
  },
  welcomeBack: {
    en: 'Welcome back',
    fa: 'خوش برگشتید',
    ar: 'مرحباً بعودتك',
    tr: 'Tekrar hoş geldiniz',
    zh: '欢迎回来',
  },
  account: {
    en: 'Account',
    fa: 'حساب کاربری',
    ar: 'الحساب',
    tr: 'Hesap',
    zh: '账户',
  },
  guest: {
    en: 'Guest',
    fa: 'مهمان',
    ar: 'ضيف',
    tr: 'Misafir',
    zh: '访客',
  },

  save: {
    en: 'Save',
    fa: 'ذخیره',
    ar: 'حفظ',
    tr: 'Kaydet',
    zh: '保存',
  },
  cancel: {
    en: 'Cancel',
    fa: 'لغو',
    ar: 'إلغاء',
    tr: 'İptal',
    zh: '取消',
  },
  confirm: {
    en: 'Confirm',
    fa: 'تأیید',
    ar: 'تأكيد',
    tr: 'Onayla',
    zh: '确认',
  },
  close: {
    en: 'Close',
    fa: 'بستن',
    ar: 'إغلاق',
    tr: 'Kapat',
    zh: '关闭',
  },
  submit: {
    en: 'Submit',
    fa: 'ارسال',
    ar: 'إرسال',
    tr: 'Gönder',
    zh: '提交',
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const savedLang = localStorage.getItem(STORAGE_KEY);

  if (isSupportedLanguage(savedLang)) {
    return savedLang;
  }

  const browserLang = navigator.language?.toLowerCase() || '';

  if (browserLang.startsWith('fa')) return 'fa';
  if (browserLang.startsWith('ar')) return 'ar';
  if (browserLang.startsWith('tr')) return 'tr';
  if (browserLang.startsWith('zh')) return 'zh';

  return 'en';
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(() => getInitialLanguage());

  const direction: Direction = lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr';
  const isRtl = direction === 'rtl';

  const setLang = (nextLang: Language) => {
    if (!isSupportedLanguage(nextLang)) {
      return;
    }

    setLangState(nextLang);

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, nextLang);
    }
  };

  const setLanguage = setLang;

  const t = (key: string): string => {
    if (!key) return '';

    const item = translations[key];

    if (item?.[lang]) {
      return item[lang];
    }

    if (item?.en) {
      return item.en;
    }

    return key;
  };

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.lang = lang;
    document.documentElement.dir = direction;
    document.body.dir = direction;

    document.body.classList.remove('ltr', 'rtl');
    document.body.classList.add(direction);
  }, [lang, direction]);

  const value = useMemo<I18nContextType>(
    () => ({
      lang,
      language: lang,
      direction,
      isRtl,
      setLang,
      setLanguage,
      t,
    }),
    [lang, direction, isRtl]
  );

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider');
  }

  return context;
};

export default I18nContext;
