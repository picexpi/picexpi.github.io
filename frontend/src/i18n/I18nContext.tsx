// frontend/src/i18n/I18nContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'fa' | 'en' | 'tr' | 'zh' | 'hi' | 'ar';

type TranslationEntry = Partial<Record<Language, string>> & { en: string };

type Translations = Record<string, TranslationEntry>;

export const supportedLanguages: Language[] = [
  'fa',
  'en',
  'tr',
  'zh',
  'hi',
  'ar',
];

export const languageLabels: Record<Language, string> = {
  fa: 'فارسی',
  en: 'English',
  tr: 'Türkçe',
  zh: '中文',
  hi: 'हिन्दी',
  ar: 'العربية',
};

const translations: Translations = {
  // -------------------------
  // App / Common
  // -------------------------

  appTitle: {
    fa: 'picex',
    en: 'picex',
    tr: 'picex',
    zh: 'picex',
    hi: 'picex',
    ar: 'picex',
  },

  brandName: {
    fa: 'picex',
    en: 'picex',
    tr: 'picex',
    zh: 'picex',
    hi: 'picex',
    ar: 'picex',
  },

  language: {
    fa: 'زبان',
    en: 'Language',
    tr: 'Dil',
    zh: '语言',
    hi: 'भाषा',
    ar: 'اللغة',
  },

  home: {
    fa: 'خانه',
    en: 'Home',
    tr: 'Ana Sayfa',
    zh: '首页',
    hi: 'होम',
    ar: 'الرئيسية',
  },

  markets: {
    fa: 'بازارها',
    en: 'Markets',
    tr: 'Piyasalar',
    zh: '市场',
    hi: 'बाज़ार',
    ar: 'الأسواق',
  },

  wallet: {
    fa: 'کیف پول',
    en: 'Wallet',
    tr: 'Cüzdan',
    zh: '钱包',
    hi: 'वॉलेट',
    ar: 'المحفظة',
  },

  features: {
    fa: 'ویژگی‌ها',
    en: 'Features',
    tr: 'Özellikler',
    zh: '功能',
    hi: 'विशेषताएँ',
    ar: 'الميزات',
  },

  aiSupport: {
    fa: 'پشتیبانی هوش مصنوعی',
    en: 'AI Support',
    tr: 'Yapay Zeka Desteği',
    zh: 'AI 支持',
    hi: 'AI सहायता',
    ar: 'دعم الذكاء الاصطناعي',
  },

  navRoadmap: {
    fa: 'نقشه راه',
    en: 'Roadmap',
    tr: 'Yol Haritası',
    zh: '路线图',
    hi: 'रोडमैप',
    ar: 'خارطة الطريق',
  },

  governance: {
    fa: 'حاکمیت',
    en: 'Governance',
    tr: 'Yönetişim',
    zh: '治理',
    hi: 'शासन',
    ar: 'الحوكمة',
  },

  aboutUs: {
    fa: 'درباره picex',
    en: 'About picex',
    tr: 'picex Hakkında',
    zh: '关于 picex',
    hi: 'picex के बारे में',
    ar: 'حول picex',
  },

  shop: {
    fa: 'محصولات معاملاتی',
    en: 'Trading Products',
    tr: 'İşlem Ürünleri',
    zh: '交易产品',
    hi: 'ट्रेडिंग उत्पाद',
    ar: 'منتجات التداول',
  },

  tradingProducts: {
    fa: 'محصولات معاملاتی',
    en: 'Trading Products',
    tr: 'İşlem Ürünleri',
    zh: '交易产品',
    hi: 'ट्रेडिंग उत्पाद',
    ar: 'منتجات التداول',
  },

  tasks: {
    fa: 'تسک‌ها',
    en: 'Tasks',
    tr: 'Görevler',
    zh: '任务',
    hi: 'कार्य',
    ar: 'المهام',
  },

  login: {
    fa: 'ورود',
    en: 'Login',
    tr: 'Giriş',
    zh: '登录',
    hi: 'लॉगिन',
    ar: 'تسجيل الدخول',
  },

  logout: {
    fa: 'خروج',
    en: 'Logout',
    tr: 'Çıkış',
    zh: '退出',
    hi: 'लॉगआउट',
    ar: 'تسجيل الخروج',
  },

  loading: {
    fa: 'در حال بارگذاری...',
    en: 'Loading...',
    tr: 'Yükleniyor...',
    zh: '加载中...',
    hi: 'लोड हो रहा है...',
    ar: 'جارٍ التحميل...',
  },

  connectingToServer: {
    fa: 'در حال اتصال به سرور...',
    en: 'Connecting to server...',
    tr: 'Sunucuya bağlanılıyor...',
    zh: '正在连接服务器...',
    hi: 'सर्वर से कनेक्ट हो रहा है...',
    ar: 'جارٍ الاتصال بالخادم...',
  },

  pleaseWait: {
    fa: 'لطفاً صبر کنید...',
    en: 'Please wait...',
    tr: 'Lütfen bekleyin...',
    zh: '请稍候...',
    hi: 'कृपया प्रतीक्षा करें...',
    ar: 'يرجى الانتظار...',
  },

  redirecting: {
    fa: 'در حال انتقال...',
    en: 'Redirecting...',
    tr: 'Yönlendiriliyor...',
    zh: '正在跳转...',
    hi: 'रीडायरेक्ट किया जा रहा है...',
    ar: 'جارٍ التحويل...',
  },

  processing: {
    fa: 'در حال پردازش...',
    en: 'Processing...',
    tr: 'İşleniyor...',
    zh: '处理中...',
    hi: 'प्रोसेस हो रहा है...',
    ar: 'جارٍ المعالجة...',
  },

  completed: {
    fa: 'تکمیل شده',
    en: 'Completed',
    tr: 'Tamamlandı',
    zh: '已完成',
    hi: 'पूर्ण',
    ar: 'مكتمل',
  },

  available: {
    fa: 'در دسترس',
    en: 'Available',
    tr: 'Mevcut',
    zh: '可用',
    hi: 'उपलब्ध',
    ar: 'متاح',
  },

  comingSoon: {
    fa: 'به‌زودی',
    en: 'Coming soon',
    tr: 'Yakında',
    zh: '即将推出',
    hi: 'जल्द आ रहा है',
    ar: 'قريباً',
  },

  soon: {
    fa: 'به‌زودی',
    en: 'Soon',
    tr: 'Yakında',
    zh: '即将',
    hi: 'जल्द',
    ar: 'قريباً',
  },

  unknown: {
    fa: 'نامشخص',
    en: 'Unknown',
    tr: 'Bilinmiyor',
    zh: '未知',
    hi: 'अज्ञात',
    ar: 'غير معروف',
  },

  serverConnectionError: {
    fa: 'خطا در اتصال به سرور. لطفاً دوباره تلاش کنید.',
    en: 'Server connection error. Please try again.',
    tr: 'Sunucu bağlantı hatası. Lütfen tekrar deneyin.',
    zh: '服务器连接错误。请重试。',
    hi: 'सर्वर कनेक्शन त्रुटि। कृपया पुनः प्रयास करें।',
    ar: 'خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.',
  },

  authContextMissing: {
    fa: 'سیستم احراز هویت در دسترس نیست.',
    en: 'Auth context is not available.',
    tr: 'Kimlik doğrulama sistemi mevcut değil.',
    zh: '认证系统不可用。',
    hi: 'प्रमाणीकरण प्रणाली उपलब्ध नहीं है।',
    ar: 'نظام المصادقة غير متاح.',
  },

  // -------------------------
  // Pi Auth / Sign In
  // -------------------------

  loginWithPi: {
    fa: 'ورود با Pi',
    en: 'Login with Pi',
    tr: 'Pi ile Giriş',
    zh: '使用 Pi 登录',
    hi: 'Pi से लॉगिन करें',
    ar: 'تسجيل الدخول باستخدام Pi',
  },

  loginWithPiWallet: {
    fa: 'ورود با کیف پول Pi',
    en: 'Login with Pi Wallet',
    tr: 'Pi Wallet ile Giriş',
    zh: '使用 Pi 钱包登录',
    hi: 'Pi Wallet से लॉगिन करें',
    ar: 'تسجيل الدخول بمحفظة Pi',
  },

  joinWithPi: {
    fa: 'اتصال با Pi',
    en: 'Connect with Pi',
    tr: 'Pi ile Bağlan',
    zh: '连接 Pi',
    hi: 'Pi से कनेक्ट करें',
    ar: 'الاتصال بـ Pi',
  },

  welcome: {
    fa: 'خوش آمدید',
    en: 'Welcome',
    tr: 'Hoş geldiniz',
    zh: '欢迎',
    hi: 'स्वागत है',
    ar: 'مرحباً',
  },

  signInTitle: {
    fa: 'ورود به picex',
    en: 'Sign in to picex',
    tr: 'picex’e Giriş',
    zh: '登录 picex',
    hi: 'picex में साइन इन करें',
    ar: 'تسجيل الدخول إلى picex',
  },

  signInDescription: {
    fa: 'با حساب Pi Network خود وارد شوید و به ابزارهای معاملاتی، پرداخت، کیف پول و حاکمیت picex دسترسی داشته باشید.',
    en: 'Sign in with your Pi Network account to access picex trading tools, payments, wallet features, and governance.',
    tr: 'picex işlem araçlarına, ödemelere, cüzdan özelliklerine ve yönetişime erişmek için Pi Network hesabınızla giriş yapın.',
    zh: '使用您的 Pi Network 账户登录，以访问 picex 交易工具、支付、钱包功能和治理。',
    hi: 'picex ट्रेडिंग टूल्स, भुगतान, वॉलेट सुविधाओं और गवर्नेंस तक पहुँचने के लिए अपने Pi Network खाते से साइन इन करें।',
    ar: 'سجّل الدخول باستخدام حساب Pi Network للوصول إلى أدوات التداول والمدفوعات والمحفظة والحوكمة في picex.',
  },

  piLoginTitle: {
    fa: 'اتصال به picex با حساب Pi',
    en: 'Connect to picex with your Pi account',
    tr: 'Pi hesabınızla picex’e bağlanın',
    zh: '使用您的 Pi 账户连接 picex',
    hi: 'अपने Pi खाते से picex से जुड़ें',
    ar: 'اتصل بـ picex باستخدام حساب Pi الخاص بك',
  },

  piLoginDescription: {
    fa: 'برای استفاده از پرداخت‌ها، رأی‌گیری، کیف پول و امکانات آینده معاملاتی، ابتدا با Pi Browser وارد شوید.',
    en: 'To use payments, governance, wallet access, and future trading features, sign in using Pi Browser first.',
    tr: 'Ödemeler, yönetişim, cüzdan erişimi ve gelecekteki işlem özellikleri için önce Pi Browser ile giriş yapın.',
    zh: '要使用支付、治理、钱包访问和未来交易功能，请先使用 Pi Browser 登录。',
    hi: 'भुगतान, गवर्नेंस, वॉलेट एक्सेस और भविष्य की ट्रेडिंग सुविधाओं का उपयोग करने के लिए पहले Pi Browser से साइन इन करें।',
    ar: 'لاستخدام المدفوعات والحوكمة والوصول إلى المحفظة وميزات التداول المستقبلية، سجّل الدخول أولاً عبر Pi Browser.',
  },

  initializingPiSdk: {
    fa: 'در حال راه‌اندازی Pi SDK برای picex...',
    en: 'Initializing Pi SDK for picex...',
    tr: 'picex için Pi SDK başlatılıyor...',
    zh: '正在为 picex 初始化 Pi SDK...',
    hi: 'picex के लिए Pi SDK प्रारंभ हो रहा है...',
    ar: 'جارٍ تهيئة Pi SDK لـ picex...',
  },

  piSdkNotFound: {
    fa: 'Pi SDK پیدا نشد. لطفاً picex را داخل Pi Browser باز کنید.',
    en: 'Pi SDK not found. Please open picex inside Pi Browser.',
    tr: 'Pi SDK bulunamadı. Lütfen picex’i Pi Browser içinde açın.',
    zh: '未找到 Pi SDK。请在 Pi Browser 中打开 picex。',
    hi: 'Pi SDK नहीं मिला। कृपया picex को Pi Browser में खोलें।',
    ar: 'لم يتم العثور على Pi SDK. يرجى فتح picex داخل Pi Browser.',
  },

  piSdkReady: {
    fa: 'Pi SDK برای picex آماده است.',
    en: 'Pi SDK is ready for picex.',
    tr: 'Pi SDK picex için hazır.',
    zh: 'Pi SDK 已为 picex 准备就绪。',
    hi: 'Pi SDK picex के लिए तैयार है।',
    ar: 'Pi SDK جاهز لـ picex.',
  },

  authenticating: {
    fa: 'در حال احراز هویت با Pi برای picex...',
    en: 'Authenticating with Pi for picex...',
    tr: 'picex için Pi ile kimlik doğrulanıyor...',
    zh: '正在为 picex 使用 Pi 认证...',
    hi: 'picex के लिए Pi से प्रमाणीकरण हो रहा है...',
    ar: 'جارٍ المصادقة باستخدام Pi لـ picex...',
  },

  loginSuccess: {
    fa: 'ورود به picex موفق بود.',
    en: 'picex login successful.',
    tr: 'picex girişi başarılı.',
    zh: 'picex 登录成功。',
    hi: 'picex लॉगिन सफल रहा।',
    ar: 'تم تسجيل الدخول إلى picex بنجاح.',
  },

  loginFailed: {
    fa: 'ورود ناموفق بود.',
    en: 'Login failed.',
    tr: 'Giriş başarısız.',
    zh: '登录失败。',
    hi: 'लॉगिन विफल रहा।',
    ar: 'فشل تسجيل الدخول.',
  },

  pleaseUsePiBrowser: {
    fa: 'برای بهترین تجربه Pi SDK، لطفاً از Pi Browser استفاده کنید.',
    en: 'Please use Pi Browser for the best Pi SDK experience.',
    tr: 'En iyi Pi SDK deneyimi için lütfen Pi Browser kullanın.',
    zh: '请使用 Pi Browser 以获得最佳 Pi SDK 体验。',
    hi: 'सर्वश्रेष्ठ Pi SDK अनुभव के लिए कृपया Pi Browser का उपयोग करें।',
    ar: 'يرجى استخدام Pi Browser للحصول على أفضل تجربة Pi SDK.',
  },

  incompletePaymentFound: {
    fa: 'یک پرداخت نیمه‌تمام پیدا شد. لطفاً آن را در Pi Browser تکمیل یا لغو کنید.',
    en: 'Incomplete payment found. Please complete or cancel it in Pi Browser.',
    tr: 'Tamamlanmamış ödeme bulundu. Lütfen Pi Browser içinde tamamlayın veya iptal edin.',
    zh: '发现未完成的付款。请在 Pi Browser 中完成或取消。',
    hi: 'अधूरा भुगतान मिला। कृपया इसे Pi Browser में पूरा या रद्द करें।',
    ar: 'تم العثور على دفعة غير مكتملة. يرجى إكمالها أو إلغاؤها داخل Pi Browser.',
  },

  network: {
    fa: 'شبکه',
    en: 'Network',
    tr: 'Ağ',
    zh: '网络',
    hi: 'नेटवर्क',
    ar: 'الشبكة',
  },

  testnet: {
    fa: 'تست‌نت / Sandbox',
    en: 'Testnet / Sandbox',
    tr: 'Testnet / Sandbox',
    zh: '测试网 / Sandbox',
    hi: 'टेस्टनेट / Sandbox',
    ar: 'شبكة الاختبار / Sandbox',
  },

  mainnet: {
    fa: 'مین‌نت',
    en: 'Mainnet',
    tr: 'Mainnet',
    zh: '主网',
    hi: 'मेननेट',
    ar: 'الشبكة الرئيسية',
  },

  // -------------------------
  // Hero
  // -------------------------

  picexBadge: {
    fa: 'picex · هاب معاملاتی هیبرید برای Pi Network',
    en: 'picex · Hybrid Trading Hub for Pi Network',
    tr: 'picex · Pi Network için Hibrit İşlem Merkezi',
    zh: 'picex · Pi Network 混合交易中心',
    hi: 'picex · Pi Network के लिए हाइब्रिड ट्रेडिंग हब',
    ar: 'picex · مركز تداول هجين لشبكة Pi',
  },

  picexHeroTitle: {
    fa: 'دارایی‌های Pi را با سرعت، کارمزد پایین و پشتیبانی هوشمند معامله کنید',
    en: 'Trade Pi assets with speed, low fees, and intelligent support',
    tr: 'Pi varlıklarını hız, düşük ücret ve akıllı destek ile alıp satın',
    zh: '以高速、低费用和智能支持交易 Pi 资产',
    hi: 'Pi संपत्तियों का तेज़ी, कम शुल्क और बुद्धिमान सहायता के साथ ट्रेड करें',
    ar: 'تداول أصول Pi بسرعة ورسوم منخفضة ودعم ذكي',
  },

  picexHeroDescription: {
    fa: 'picex موتور تطبیق سریع آف‌چین، تسویه مبتنی بر Pi، داده بازار اختصاصی، پشتیبانی هوش مصنوعی و تجربه کیف پول‌محور را برای اکوسیستم Pi Network ترکیب می‌کند.',
    en: 'picex combines a fast off-chain matching engine, Pi-based settlement, native market data, AI online support, and a wallet-first trading experience for the Pi Network ecosystem.',
    tr: 'picex, Pi Network ekosistemi için hızlı off-chain eşleştirme motoru, Pi tabanlı uzlaşma, yerel piyasa verisi, yapay zeka desteği ve cüzdan odaklı işlem deneyimini birleştirir.',
    zh: 'picex 为 Pi Network 生态系统结合了高速链下撮合引擎、基于 Pi 的结算、原生市场数据、AI 在线支持和钱包优先的交易体验。',
    hi: 'picex Pi Network पारिस्थितिकी तंत्र के लिए तेज़ ऑफ-चेन मैचिंग इंजन, Pi-आधारित सेटलमेंट, नेटिव मार्केट डेटा, AI ऑनलाइन सहायता और वॉलेट-फर्स्ट ट्रेडिंग अनुभव को जोड़ता है।',
    ar: 'يجمع picex بين محرك مطابقة سريع خارج السلسلة، وتسوية قائمة على Pi، وبيانات سوق أصلية، ودعم ذكي، وتجربة تداول تعتمد على المحفظة أولاً لنظام Pi Network.',
  },

  exploreMarkets: {
    fa: 'مشاهده بازارها',
    en: 'Explore Markets',
    tr: 'Piyasaları Keşfet',
    zh: '探索市场',
    hi: 'बाज़ार देखें',
    ar: 'استكشف الأسواق',
  },

  // -------------------------
  // Features
  // -------------------------

  picexFeaturesKicker: {
    fa: 'زیرساخت اصلی picex',
    en: 'picex Core Infrastructure',
    tr: 'picex Temel Altyapısı',
    zh: 'picex 核心基础设施',
    hi: 'picex मुख्य आधारभूत संरचना',
    ar: 'البنية الأساسية لـ picex',
  },

  picexFeaturesTitle: {
    fa: 'ساخته‌شده برای معاملات پرسرعت در اکوسیستم Pi',
    en: 'Built for high-performance Pi trading',
    tr: 'Yüksek performanslı Pi işlemleri için tasarlandı',
    zh: '为高性能 Pi 交易而构建',
    hi: 'उच्च-प्रदर्शन Pi ट्रेडिंग के लिए निर्मित',
    ar: 'مصمم لتداول Pi عالي الأداء',
  },

  picexFeaturesIntro: {
    fa: 'picex سرعت صرافی‌های حرفه‌ای، دسترسی به اکوسیستم Pi، عملیات کیف پول، داده بازار اختصاصی و پشتیبانی هوش مصنوعی را در یک تجربه واحد ترکیب می‌کند.',
    en: 'picex combines exchange-grade speed, Pi ecosystem access, wallet operations, native market data, and AI-powered support into one unified trading experience.',
    tr: 'picex; borsa seviyesinde hız, Pi ekosistemi erişimi, cüzdan operasyonları, yerel piyasa verisi ve yapay zeka destekli yardımı tek bir işlem deneyiminde birleştirir.',
    zh: 'picex 将交易所级速度、Pi 生态访问、钱包操作、原生市场数据和 AI 支持整合为统一的交易体验。',
    hi: 'picex एक्सचेंज-ग्रेड गति, Pi इकोसिस्टम एक्सेस, वॉलेट संचालन, नेटिव मार्केट डेटा और AI-संचालित सहायता को एकीकृत ट्रेडिंग अनुभव में जोड़ता है।',
    ar: 'يجمع picex بين سرعة بمستوى البورصات، والوصول إلى نظام Pi، وعمليات المحفظة، وبيانات السوق الأصلية، والدعم المدعوم بالذكاء الاصطناعي في تجربة تداول موحدة.',
  },

  picexFeatureSpotTitle: {
    fa: 'معاملات اسپات',
    en: 'Spot Trading',
    tr: 'Spot İşlemler',
    zh: '现货交易',
    hi: 'स्पॉट ट्रेडिंग',
    ar: 'التداول الفوري',
  },

  picexFeatureSpotDescription: {
    fa: 'معامله دارایی‌های مبتنی بر Pi از طریق تجربه دفتر سفارش سریع و مناسب بازارهای لحظه‌ای.',
    en: 'Trade Pi-based assets through a fast order book experience designed for real-time spot markets.',
    tr: 'Gerçek zamanlı spot piyasalar için tasarlanmış hızlı emir defteri deneyimiyle Pi tabanlı varlıkları alıp satın.',
    zh: '通过为实时现货市场设计的高速订单簿体验交易基于 Pi 的资产。',
    hi: 'रीयल-टाइम स्पॉट बाज़ारों के लिए डिज़ाइन किए गए तेज़ ऑर्डर बुक अनुभव के माध्यम से Pi-आधारित संपत्तियों का ट्रेड करें।',
    ar: 'تداول الأصول القائمة على Pi عبر تجربة دفتر أوامر سريعة مصممة للأسواق الفورية.',
  },

  picexFeatureFuturesTitle: {
    fa: 'معماری آماده فیوچرز',
    en: 'Futures Ready Architecture',
    tr: 'Vadeli İşlemlere Hazır Mimari',
    zh: '期货就绪架构',
    hi: 'फ्यूचर्स-रेडी आर्किटेक्चर',
    ar: 'معمارية جاهزة للعقود الآجلة',
  },

  picexFeatureFuturesDescription: {
    fa: 'picex برای پشتیبانی از معاملات دائمی پس از بلوغ موتور ریسک، سیستم مارجین و لایه لیکوییدیشن طراحی می‌شود.',
    en: 'picex is designed to support perpetual futures after the risk engine, margin system, and liquidation layer are mature.',
    tr: 'picex, risk motoru, marjin sistemi ve likidasyon katmanı olgunlaştıktan sonra sürekli vadeli işlemleri destekleyecek şekilde tasarlanır.',
    zh: 'picex 设计为在风险引擎、保证金系统和清算层成熟后支持永续期货。',
    hi: 'picex को जोखिम इंजन, मार्जिन सिस्टम और लिक्विडेशन लेयर परिपक्व होने के बाद पर्पेचुअल फ्यूचर्स का समर्थन करने के लिए डिज़ाइन किया गया है।',
    ar: 'تم تصميم picex لدعم العقود الآجلة الدائمة بعد نضج محرك المخاطر ونظام الهامش وطبقة التصفية.',
  },

  picexFeatureWalletTitle: {
    fa: 'کیف پول، واریز و برداشت',
    en: 'Wallet, Deposit & Withdraw',
    tr: 'Cüzdan, Yatırma ve Çekme',
    zh: '钱包、充值与提现',
    hi: 'वॉलेट, जमा और निकासी',
    ar: 'المحفظة والإيداع والسحب',
  },

  picexFeatureWalletDescription: {
    fa: 'جریان کیف پول‌محور برای واریزها، موجودی‌های در انتظار، درخواست‌های برداشت، عملیات کیف پول گرم و کنترل خزانه سرد.',
    en: 'A wallet-first flow for deposits, pending balances, withdrawals, hot wallet operations, and cold wallet treasury controls.',
    tr: 'Yatırmalar, bekleyen bakiyeler, çekimler, sıcak cüzdan operasyonları ve soğuk cüzdan hazine kontrolleri için cüzdan odaklı akış.',
    zh: '面向钱包的流程，支持充值、待处理余额、提现、热钱包操作和冷钱包资金控制。',
    hi: 'जमा, लंबित बैलेंस, निकासी, हॉट वॉलेट संचालन और कोल्ड वॉलेट ट्रेजरी नियंत्रण के लिए वॉलेट-फर्स्ट प्रवाह।',
    ar: 'تدفق يعتمد على المحفظة للإيداعات والأرصدة المعلقة والسحوبات وعمليات المحفظة الساخنة وضوابط خزينة المحفظة الباردة.',
  },

  picexFeaturePiTitle: {
    fa: 'ورود Pi و دسترسی مبتنی بر KYC',
    en: 'Pi Login & KYC-Aware Access',
    tr: 'Pi Girişi ve KYC Odaklı Erişim',
    zh: 'Pi 登录与 KYC 感知访问',
    hi: 'Pi लॉगिन और KYC-जागरूक एक्सेस',
    ar: 'تسجيل الدخول عبر Pi ووصول مرتبط بـ KYC',
  },

  picexFeaturePiDescription: {
    fa: 'کاربران از طریق جریان هویتی Pi متصل می‌شوند و picex محدودیت حساب، دسترسی مبتنی بر KYC و قوانین معاملاتی امن‌تر را اعمال می‌کند.',
    en: 'Users connect through Pi identity flows while picex applies account limits, KYC-aware access, and safer trading rules.',
    tr: 'Kullanıcılar Pi kimlik akışlarıyla bağlanırken picex hesap limitleri, KYC odaklı erişim ve daha güvenli işlem kuralları uygular.',
    zh: '用户通过 Pi 身份流程连接，同时 picex 应用账户限制、KYC 感知访问和更安全的交易规则。',
    hi: 'उपयोगकर्ता Pi पहचान प्रवाह के माध्यम से जुड़ते हैं, जबकि picex खाता सीमाएँ, KYC-जागरूक एक्सेस और सुरक्षित ट्रेडिंग नियम लागू करता है।',
    ar: 'يتصل المستخدمون عبر تدفقات هوية Pi بينما يطبق picex حدود الحساب والوصول المرتبط بـ KYC وقواعد تداول أكثر أماناً.',
  },

  picexFeatureChartsTitle: {
    fa: 'نمودارهای اختصاصی picex',
    en: 'Native picex Charts',
    tr: 'Yerel picex Grafikleri',
    zh: 'picex 原生图表',
    hi: 'नेटिव picex चार्ट',
    ar: 'مخططات picex الأصلية',
  },

  picexFeatureChartsDescription: {
    fa: 'نمودارهای قیمت بر اساس معاملات انجام‌شده، رویدادهای دفتر سفارش و کندل‌های OHLC خود picex تولید می‌شوند.',
    en: 'Price charts are planned to be generated from picex’s own executed trades, order book events, and OHLC candles.',
    tr: 'Fiyat grafiklerinin picex’in kendi gerçekleşen işlemleri, emir defteri olayları ve OHLC mumlarından üretilmesi planlanır.',
    zh: '价格图表计划由 picex 自身的已执行交易、订单簿事件和 OHLC K 线生成。',
    hi: 'मूल्य चार्ट picex के अपने निष्पादित ट्रेड, ऑर्डर बुक इवेंट और OHLC कैंडल से बनाए जाने की योजना है।',
    ar: 'من المخطط إنشاء مخططات الأسعار من صفقات picex المنفذة وأحداث دفتر الأوامر وشموع OHLC الخاصة بها.',
  },

  picexFeatureAiTitle: {
    fa: 'پشتیبانی آنلاین هوش مصنوعی',
    en: 'AI Online Support',
    tr: 'Yapay Zeka Online Destek',
    zh: 'AI 在线支持',
    hi: 'AI ऑनलाइन सहायता',
    ar: 'دعم ذكي مباشر',
  },

  picexFeatureAiDescription: {
    fa: 'دستیار هوشمند به کاربران درباره ورود Pi، پرداخت‌ها، واریز، برداشت، KYC، کارمزدها و وضعیت سفارش کمک می‌کند.',
    en: 'An intelligent support assistant will help users with Pi login, payments, deposits, withdrawals, KYC, fees, and order issues.',
    tr: 'Akıllı destek asistanı; Pi girişi, ödemeler, yatırma, çekme, KYC, ücretler ve emir sorunlarında kullanıcılara yardımcı olur.',
    zh: '智能支持助手将帮助用户处理 Pi 登录、支付、充值、提现、KYC、费用和订单问题。',
    hi: 'एक बुद्धिमान सहायता सहायक उपयोगकर्ताओं को Pi लॉगिन, भुगतान, जमा, निकासी, KYC, शुल्क और ऑर्डर समस्याओं में मदद करेगा।',
    ar: 'سيساعد المساعد الذكي المستخدمين في تسجيل الدخول عبر Pi والمدفوعات والإيداعات والسحوبات وKYC والرسوم ومشكلات الأوامر.',
  },

  // -------------------------
  // Roadmap
  // -------------------------

  picexRoadmapKicker: {
    fa: 'نقشه راه picex',
    en: 'picex Roadmap',
    tr: 'picex Yol Haritası',
    zh: 'picex 路线图',
    hi: 'picex रोडमैप',
    ar: 'خارطة طريق picex',
  },

  picexRoadmapTitle: {
    fa: 'از اپ پرداخت Pi تا زیرساخت معاملاتی',
    en: 'From Pi payment app to trading infrastructure',
    tr: 'Pi ödeme uygulamasından işlem altyapısına',
    zh: '从 Pi 支付应用到交易基础设施',
    hi: 'Pi भुगतान ऐप से ट्रेडिंग इंफ्रास्ट्रक्चर तक',
    ar: 'من تطبيق دفع Pi إلى بنية تداول تحتية',
  },

  picexRoadmapIntro: {
    fa: 'picex مرحله‌به‌مرحله رشد می‌کند: ابتدا حفظ ورود Pi، پرداخت، رأی‌گیری و جریان کاربر؛ سپس توسعه کیف پول، بازار اسپات، نمودار اختصاصی، پشتیبانی هوش مصنوعی و زیرساخت آماده فیوچرز.',
    en: 'picex will evolve step by step: first preserving Pi login, payment, poll, and user flows, then expanding toward wallet operations, spot trading, native charts, AI support, and futures-ready infrastructure.',
    tr: 'picex adım adım gelişir: önce Pi girişi, ödeme, anket ve kullanıcı akışları korunur; ardından cüzdan işlemleri, spot alım satım, yerel grafikler, yapay zeka desteği ve vadeli işlemlere hazır altyapıya genişler.',
    zh: 'picex 将逐步发展：首先保留 Pi 登录、支付、投票和用户流程，然后扩展到钱包操作、现货交易、原生图表、AI 支持和期货就绪基础设施。',
    hi: 'picex चरणबद्ध रूप से विकसित होगा: पहले Pi लॉगिन, भुगतान, पोल और उपयोगकर्ता प्रवाह को सुरक्षित रखते हुए, फिर वॉलेट संचालन, स्पॉट ट्रेडिंग, नेटिव चार्ट, AI सहायता और फ्यूचर्स-रेडी इंफ्रास्ट्रक्चर तक विस्तार करेगा।',
    ar: 'سيتطور picex خطوة بخطوة: أولاً الحفاظ على تسجيل الدخول عبر Pi والمدفوعات والتصويت وتدفقات المستخدم، ثم التوسع نحو عمليات المحفظة والتداول الفوري والمخططات الأصلية والدعم الذكي والبنية الجاهزة للعقود الآجلة.',
  },

  picexRoadmapStep1Title: {
    fa: 'زیرساخت پایه و اتصال Pi',
    en: 'Foundation & Pi Integration',
    tr: 'Temel Altyapı ve Pi Entegrasyonu',
    zh: '基础架构与 Pi 集成',
    hi: 'फाउंडेशन और Pi इंटीग्रेशन',
    ar: 'الأساس وتكامل Pi',
  },

  picexRoadmapStep1Description: {
    fa: 'ساخت فرانت React/Vite، بک‌اند Node/Express، ذخیره‌سازی PostgreSQL، ورود Pi، جریان پرداخت، احراز هویت و ساختار API امن.',
    en: 'Build the base React/Vite frontend, Node.js/Express backend, PostgreSQL storage, Pi login, payment flow, authentication, and secure API structure.',
    tr: 'Temel React/Vite frontend, Node.js/Express backend, PostgreSQL depolama, Pi girişi, ödeme akışı, kimlik doğrulama ve güvenli API yapısını oluşturma.',
    zh: '构建基础 React/Vite 前端、Node.js/Express 后端、PostgreSQL 存储、Pi 登录、支付流程、认证和安全 API 结构。',
    hi: 'बेस React/Vite फ्रंटएंड, Node.js/Express बैकएंड, PostgreSQL स्टोरेज, Pi लॉगिन, भुगतान प्रवाह, प्रमाणीकरण और सुरक्षित API संरचना बनाना।',
    ar: 'بناء واجهة React/Vite الأساسية، وخلفية Node.js/Express، وتخزين PostgreSQL، وتسجيل دخول Pi، وتدفق الدفع، والمصادقة، وبنية API آمنة.',
  },

  picexRoadmapStep2Title: {
    fa: 'لایه کیف پول، واریز و برداشت',
    en: 'Wallet, Deposit & Withdraw Layer',
    tr: 'Cüzdan, Yatırma ve Çekme Katmanı',
    zh: '钱包、充值与提现层',
    hi: 'वॉलेट, जमा और निकासी लेयर',
    ar: 'طبقة المحفظة والإيداع والسحب',
  },

  picexRoadmapStep2Description: {
    fa: 'طراحی موجودی داخلی، واریزهای در انتظار، درخواست برداشت، نگاشت آدرس، عملیات کیف پول گرم، سیاست کیف پول سرد و تطبیق موجودی.',
    en: 'Design internal balances, pending deposits, withdrawal requests, address mapping, hot wallet operations, cold wallet policy, and reconciliation.',
    tr: 'Dahili bakiyeler, bekleyen yatırmalar, çekim talepleri, adres eşleştirme, sıcak cüzdan operasyonları, soğuk cüzdan politikası ve mutabakat tasarımı.',
    zh: '设计内部余额、待处理充值、提现请求、地址映射、热钱包操作、冷钱包策略和对账。',
    hi: 'आंतरिक बैलेंस, लंबित जमा, निकासी अनुरोध, एड्रेस मैपिंग, हॉट वॉलेट संचालन, कोल्ड वॉलेट नीति और रिकंसिलिएशन डिज़ाइन करना।',
    ar: 'تصميم الأرصدة الداخلية، والإيداعات المعلقة، وطلبات السحب، وربط العناوين، وعمليات المحفظة الساخنة، وسياسة المحفظة الباردة، والمطابقة.',
  },

  picexRoadmapStep3Title: {
    fa: 'بازار اسپات و دفتر سفارش',
    en: 'Spot Market & Order Book',
    tr: 'Spot Piyasa ve Emir Defteri',
    zh: '现货市场与订单簿',
    hi: 'स्पॉट मार्केट और ऑर्डर बुक',
    ar: 'السوق الفوري ودفتر الأوامر',
  },

  picexRoadmapStep3Description: {
    fa: 'راه‌اندازی معاملات اسپات با سفارش محدود و بازار، تسویه دفترکل داخلی، تاریخچه معاملات، وضعیت سفارش و کارمزد پایین Maker/Taker.',
    en: 'Launch spot trading with limit and market orders, internal ledger settlement, trade history, order status, and low maker/taker fees.',
    tr: 'Limit ve piyasa emirleri, dahili defter uzlaşması, işlem geçmişi, emir durumu ve düşük maker/taker ücretleriyle spot işlemleri başlatma.',
    zh: '推出支持限价单和市价单、内部账本结算、交易历史、订单状态和低 maker/taker 费用的现货交易。',
    hi: 'लिमिट और मार्केट ऑर्डर, आंतरिक लेजर सेटलमेंट, ट्रेड हिस्ट्री, ऑर्डर स्टेटस और कम maker/taker फीस के साथ स्पॉट ट्रेडिंग लॉन्च करना।',
    ar: 'إطلاق التداول الفوري بأوامر محددة وسوقية، وتسوية دفتر داخلي، وسجل تداول، وحالة أوامر، ورسوم maker/taker منخفضة.',
  },

  picexRoadmapStep4Title: {
    fa: 'نمودارها و داده بازار اختصاصی',
    en: 'Native Charts & Market Data',
    tr: 'Yerel Grafikler ve Piyasa Verisi',
    zh: '原生图表与市场数据',
    hi: 'नेटिव चार्ट और मार्केट डेटा',
    ar: 'المخططات وبيانات السوق الأصلية',
  },

  picexRoadmapStep4Description: {
    fa: 'تولید کندل‌های OHLC، تیکرها، عمق بازار، snapshot دفتر سفارش و بروزرسانی لحظه‌ای از داده داخلی picex.',
    en: 'Generate picex-native OHLC candles, tickers, depth, order book snapshots, and real-time chart updates from internal trade data.',
    tr: 'Dahili işlem verilerinden picex yerel OHLC mumları, tickerlar, derinlik, emir defteri görüntüleri ve gerçek zamanlı grafik güncellemeleri oluşturma.',
    zh: '从内部交易数据生成 picex 原生 OHLC K 线、行情、深度、订单簿快照和实时图表更新。',
    hi: 'आंतरिक ट्रेड डेटा से picex-नेटिव OHLC कैंडल, टिकर, डेप्थ, ऑर्डर बुक स्नैपशॉट और रीयल-टाइम चार्ट अपडेट जनरेट करना।',
    ar: 'إنشاء شموع OHLC أصلية لـ picex، ومؤشرات، وعمق سوق، ولقطات دفتر الأوامر، وتحديثات مخططات فورية من بيانات التداول الداخلية.',
  },

  picexRoadmapStep5Title: {
    fa: 'پشتیبانی هوش مصنوعی و پایگاه دانش',
    en: 'AI Support & Knowledge Base',
    tr: 'Yapay Zeka Desteği ve Bilgi Tabanı',
    zh: 'AI 支持与知识库',
    hi: 'AI सहायता और ज्ञान आधार',
    ar: 'الدعم الذكي وقاعدة المعرفة',
  },

  picexRoadmapStep5Description: {
    fa: 'افزودن دستیار پشتیبانی هوش مصنوعی با پاسخ‌های مبتنی بر مستندات برای واریز، برداشت، ورود Pi، کارمزدها، KYC، خطاهای پرداخت و وضعیت سفارش.',
    en: 'Add AI online support with documentation-based answers for deposits, withdrawals, Pi login, fees, KYC, payment errors, and order issues.',
    tr: 'Yatırma, çekme, Pi girişi, ücretler, KYC, ödeme hataları ve emir sorunları için dokümantasyon tabanlı cevaplar veren yapay zeka desteği ekleme.',
    zh: '添加基于文档回答充值、提现、Pi 登录、费用、KYC、支付错误和订单问题的 AI 在线支持。',
    hi: 'जमा, निकासी, Pi लॉगिन, फीस, KYC, भुगतान त्रुटियों और ऑर्डर समस्याओं के लिए दस्तावेज़-आधारित उत्तरों वाला AI ऑनलाइन समर्थन जोड़ना।',
    ar: 'إضافة دعم ذكي مباشر بإجابات مبنية على الوثائق للإيداعات والسحوبات وتسجيل دخول Pi والرسوم وKYC وأخطاء الدفع ومشكلات الأوامر.',
  },

  picexRoadmapStep6Title: {
    fa: 'فیوچرز، موتور ریسک و مقیاس‌پذیری',
    en: 'Futures, Risk Engine & Scaling',
    tr: 'Vadeli İşlemler, Risk Motoru ve Ölçekleme',
    zh: '期货、风险引擎与扩展',
    hi: 'फ्यूचर्स, जोखिम इंजन और स्केलिंग',
    ar: 'العقود الآجلة ومحرك المخاطر والتوسع',
  },

  picexRoadmapStep6Description: {
    fa: 'پس از بلوغ نقدینگی و عملیات، افزودن فیوچرز دائمی، کنترل مارجین، موتور لیکوییدیشن، کنترل ریسک، مقیاس‌پذیری Docker/Nginx و API بازارسازها.',
    en: 'After liquidity and operational maturity, add perpetual futures, margin checks, liquidation engine, risk controls, Docker/Nginx scaling, and API access.',
    tr: 'Likidite ve operasyonel olgunluktan sonra sürekli vadeli işlemler, marjin kontrolleri, likidasyon motoru, risk kontrolleri, Docker/Nginx ölçekleme ve API erişimi ekleme.',
    zh: '在流动性和运营成熟后，添加永续期货、保证金检查、清算引擎、风险控制、Docker/Nginx 扩展和 API 访问。',
    hi: 'लिक्विडिटी और संचालन परिपक्व होने के बाद पर्पेचुअल फ्यूचर्स, मार्जिन चेक, लिक्विडेशन इंजन, जोखिम नियंत्रण, Docker/Nginx स्केलिंग और API एक्सेस जोड़ना।',
    ar: 'بعد نضج السيولة والعمليات، إضافة العقود الآجلة الدائمة، وفحوصات الهامش، ومحرك التصفية، وضوابط المخاطر، وتوسيع Docker/Nginx، ووصول API.',
  },

  roadmapStatusDesign: {
    fa: 'طراحی / ساخت',
    en: 'Design / Build',
    tr: 'Tasarım / İnşa',
    zh: '设计 / 构建',
    hi: 'डिज़ाइन / निर्माण',
    ar: 'تصميم / بناء',
  },

  roadmapStatusPlanned: {
    fa: 'برنامه‌ریزی‌شده',
    en: 'Planned',
    tr: 'Planlandı',
    zh: '已规划',
    hi: 'योजनाबद्ध',
    ar: 'مخطط',
  },

  roadmapStatusCore: {
    fa: 'فاز اصلی',
    en: 'Core Phase',
    tr: 'Ana Aşama',
    zh: '核心阶段',
    hi: 'मुख्य चरण',
    ar: 'المرحلة الأساسية',
  },

  roadmapStatusMarket: {
    fa: 'داده بازار',
    en: 'Market Data',
    tr: 'Piyasa Verisi',
    zh: '市场数据',
    hi: 'मार्केट डेटा',
    ar: 'بيانات السوق',
  },

  roadmapStatusAi: {
    fa: 'لایه هوش مصنوعی',
    en: 'AI Layer',
    tr: 'Yapay Zeka Katmanı',
    zh: 'AI 层',
    hi: 'AI लेयर',
    ar: 'طبقة الذكاء الاصطناعي',
  },

  roadmapStatusFuture: {
    fa: 'فاز آینده',
    en: 'Future Phase',
    tr: 'Gelecek Aşama',
    zh: '未来阶段',
    hi: 'भविष्य चरण',
    ar: 'المرحلة المستقبلية',
  },

  // -------------------------
  // About
  // -------------------------

  picexAboutKicker: {
    fa: 'درباره picex',
    en: 'About picex',
    tr: 'picex Hakkında',
    zh: '关于 picex',
    hi: 'picex के बारे में',
    ar: 'حول picex',
  },

  picexAboutSubtitle: {
    fa: 'لایه صرافی هیبرید برای اکوسیستم Pi',
    en: 'A hybrid exchange layer for the Pi ecosystem',
    tr: 'Pi ekosistemi için hibrit borsa katmanı',
    zh: '面向 Pi 生态系统的混合交易层',
    hi: 'Pi पारिस्थितिकी तंत्र के लिए हाइब्रिड एक्सचेंज लेयर',
    ar: 'طبقة تداول هجينة لنظام Pi',
  },

  picexAboutTitleBefore: {
    fa: 'ساخته‌شده برای تبدیل Pi به',
    en: 'Built to turn Pi into a',
    tr: 'Pi’yi dönüştürmek için tasarlandı:',
    zh: '旨在将 Pi 转变为',
    hi: 'Pi को बदलने के लिए निर्मित',
    ar: 'مصمم لتحويل Pi إلى',
  },

  picexAboutTitleHighlight: {
    fa: 'تجربه معاملاتی واقعی',
    en: 'tradable market experience',
    tr: 'işlem yapılabilir bir piyasa deneyimi',
    zh: '可交易的市场体验',
    hi: 'ट्रेडेबल मार्केट अनुभव',
    ar: 'تجربة سوق قابلة للتداول',
  },

  picexAboutText: {
    fa: 'picex به‌عنوان یک پلتفرم معاملاتی هیبرید پرسرعت برای اکوسیستم Pi Network طراحی شده است. این پروژه موتور تطبیق آف‌چین، تسویه امن، جریان هویتی Pi، معاملات کم‌کارمزد و داده بازار اختصاصی را ترکیب می‌کند.',
    en: 'picex is designed as a high-performance hybrid trading platform for the Pi Network ecosystem. It combines fast off-chain order matching with secure settlement, Pi-based identity flows, low-fee trading, and native market data generated from picex activity.',
    tr: 'picex, Pi Network ekosistemi için yüksek performanslı hibrit bir işlem platformu olarak tasarlanmıştır. Hızlı off-chain emir eşleştirme, güvenli uzlaşma, Pi tabanlı kimlik akışları, düşük ücretli işlem ve picex aktivitesinden üretilen yerel piyasa verisini birleştirir.',
    zh: 'picex 被设计为 Pi Network 生态系统的高性能混合交易平台。它结合了快速链下订单撮合、安全结算、基于 Pi 的身份流程、低费用交易以及由 picex 活动生成的原生市场数据。',
    hi: 'picex को Pi Network पारिस्थितिकी तंत्र के लिए उच्च-प्रदर्शन हाइब्रिड ट्रेडिंग प्लेटफ़ॉर्म के रूप में डिज़ाइन किया गया है। यह तेज़ ऑफ-चेन ऑर्डर मैचिंग, सुरक्षित सेटलमेंट, Pi-आधारित पहचान प्रवाह, कम शुल्क ट्रेडिंग और picex गतिविधि से बने नेटिव मार्केट डेटा को जोड़ता है।',
    ar: 'تم تصميم picex كمنصة تداول هجينة عالية الأداء لنظام Pi Network. فهي تجمع بين مطابقة أوامر سريعة خارج السلسلة، وتسوية آمنة، وتدفقات هوية قائمة على Pi، وتداول منخفض الرسوم، وبيانات سوق أصلية ناتجة عن نشاط picex.',
  },

  picexAboutTextSecondary: {
    fa: 'هدف picex جایگزینی اکوسیستم Pi نیست؛ هدف ساخت یک هاب معاملاتی حرفه‌ای روی آن است: ابتدا بازار اسپات، سپس عملیات کیف پول و نمودار اختصاصی، بعد پشتیبانی هوش مصنوعی، حاکمیت و در نهایت فیوچرز پس از بلوغ موتور ریسک.',
    en: 'The goal is not to replace the Pi ecosystem, but to build a professional trading hub on top of it: spot markets first, wallet operations and native charts next, then AI support, governance, and futures once the risk engine is mature.',
    tr: 'Amaç Pi ekosisteminin yerini almak değil, onun üzerinde profesyonel bir işlem merkezi oluşturmaktır: önce spot piyasalar, ardından cüzdan operasyonları ve yerel grafikler, sonra yapay zeka desteği, yönetişim ve risk motoru olgunlaştığında vadeli işlemler.',
    zh: '目标不是取代 Pi 生态系统，而是在其之上构建专业交易中心：首先是现货市场，其次是钱包操作和原生图表，然后是 AI 支持、治理，并在风险引擎成熟后推出期货。',
    hi: 'लक्ष्य Pi इकोसिस्टम को बदलना नहीं है, बल्कि उसके ऊपर एक पेशेवर ट्रेडिंग हब बनाना है: पहले स्पॉट मार्केट, फिर वॉलेट संचालन और नेटिव चार्ट, फिर AI सहायता, गवर्नेंस और जोखिम इंजन परिपक्व होने के बाद फ्यूचर्स।',
    ar: 'الهدف ليس استبدال نظام Pi، بل بناء مركز تداول احترافي فوقه: الأسواق الفورية أولاً، ثم عمليات المحفظة والمخططات الأصلية، ثم الدعم الذكي والحوكمة، وأخيراً العقود الآجلة بعد نضج محرك المخاطر.',
  },

  picexStatCex: {
    fa: 'تطبیق داخلی سریع',
    en: 'Fast internal matching',
    tr: 'Hızlı dahili eşleştirme',
    zh: '快速内部撮合',
    hi: 'तेज़ आंतरिक मैचिंग',
    ar: 'مطابقة داخلية سريعة',
  },

  picexStatPi: {
    fa: 'هویت و تسویه Pi',
    en: 'Pi identity and settlement',
    tr: 'Pi kimliği ve uzlaşma',
    zh: 'Pi 身份与结算',
    hi: 'Pi पहचान और सेटलमेंट',
    ar: 'هوية وتسوية Pi',
  },

  picexStatAi: {
    fa: 'لایه پشتیبانی هوشمند',
    en: 'Smart support layer',
    tr: 'Akıllı destek katmanı',
    zh: '智能支持层',
    hi: 'स्मार्ट सपोर्ट लेयर',
    ar: 'طبقة دعم ذكية',
  },

  picexVisionLabel: {
    fa: 'موتور هیبرید picex',
    en: 'picex Hybrid Engine',
    tr: 'picex Hibrit Motoru',
    zh: 'picex 混合引擎',
    hi: 'picex हाइब्रिड इंजन',
    ar: 'محرك picex الهجين',
  },

  picexMissionTitle: {
    fa: 'سرعت در جایی که معامله‌گر نیاز دارد، تسویه در جایی که اعتماد مهم است',
    en: 'Speed where traders need it, settlement where trust matters',
    tr: 'Yatırımcının ihtiyaç duyduğu yerde hız, güvenin önemli olduğu yerde uzlaşma',
    zh: '交易者需要速度的地方提供速度，信任重要的地方进行结算',
    hi: 'जहाँ ट्रेडर को गति चाहिए वहाँ गति, जहाँ भरोसा ज़रूरी है वहाँ सेटलमेंट',
    ar: 'السرعة حيث يحتاجها المتداولون، والتسوية حيث تكون الثقة مهمة',
  },

  picexMissionText: {
    fa: 'سفارش‌ها برای تطبیق سریع در موتور معاملاتی picex طراحی می‌شوند، در حالی که واریز، برداشت، قوانین حساب و تسویه نهایی از طریق معماری کنترل‌شده کیف پول و دفترکل قابل حسابرسی می‌مانند.',
    en: 'Orders are designed to be matched quickly inside the picex trading engine, while deposits, withdrawals, account rules, and final settlement remain auditable through a controlled wallet and ledger architecture.',
    tr: 'Emirler picex işlem motorunda hızlı eşleşecek şekilde tasarlanırken yatırmalar, çekimler, hesap kuralları ve nihai uzlaşma kontrollü cüzdan ve defter mimarisiyle denetlenebilir kalır.',
    zh: '订单设计为在 picex 交易引擎内快速撮合，而充值、提现、账户规则和最终结算则通过受控的钱包和账本架构保持可审计。',
    hi: 'ऑर्डर picex ट्रेडिंग इंजन के अंदर तेज़ी से मैच होने के लिए डिज़ाइन किए गए हैं, जबकि जमा, निकासी, खाता नियम और अंतिम सेटलमेंट नियंत्रित वॉलेट और लेजर आर्किटेक्चर के माध्यम से ऑडिट योग्य रहते हैं।',
    ar: 'تم تصميم الأوامر لتتم مطابقتها بسرعة داخل محرك تداول picex، بينما تبقى الإيداعات والسحوبات وقواعد الحساب والتسوية النهائية قابلة للتدقيق عبر بنية محفظة ودفتر أستاذ محكومة.',
  },

  picexPointOrderbook: {
    fa: 'معاملات دفتر سفارش برای بازارهای اسپات',
    en: 'Order book trading for spot markets',
    tr: 'Spot piyasalar için emir defteri işlemleri',
    zh: '面向现货市场的订单簿交易',
    hi: 'स्पॉट मार्केट के लिए ऑर्डर बुक ट्रेडिंग',
    ar: 'تداول دفتر الأوامر للأسواق الفورية',
  },

  picexPointWallet: {
    fa: 'عملیات کیف پول با کنترل خزانه گرم و سرد',
    en: 'Wallet operations with hot and cold treasury controls',
    tr: 'Sıcak ve soğuk hazine kontrolleriyle cüzdan operasyonları',
    zh: '具备热/冷资金库控制的钱包操作',
    hi: 'हॉट और कोल्ड ट्रेजरी नियंत्रणों के साथ वॉलेट संचालन',
    ar: 'عمليات محفظة مع ضوابط خزينة ساخنة وباردة',
  },

  picexPointCharts: {
    fa: 'نمودارهای اختصاصی بر اساس فعالیت بازار picex',
    en: 'Native charts based on picex market activity',
    tr: 'picex piyasa aktivitesine dayalı yerel grafikler',
    zh: '基于 picex 市场活动的原生图表',
    hi: 'picex मार्केट गतिविधि पर आधारित नेटिव चार्ट',
    ar: 'مخططات أصلية مبنية على نشاط سوق picex',
  },

  picexPointAi: {
    fa: 'پشتیبانی هوش مصنوعی برای راهنمایی کاربر و حل مشکل',
    en: 'AI support for user guidance and issue resolution',
    tr: 'Kullanıcı rehberliği ve sorun çözümü için yapay zeka desteği',
    zh: '用于用户指导和问题解决的 AI 支持',
    hi: 'उपयोगकर्ता मार्गदर्शन और समस्या समाधान के लिए AI सहायता',
    ar: 'دعم ذكاء اصطناعي لإرشاد المستخدم وحل المشكلات',
  },

  picexVisionBadge: {
    fa: 'زیرساخت صرافی Pi-first',
    en: 'Pi-first exchange infrastructure',
    tr: 'Pi odaklı borsa altyapısı',
    zh: 'Pi 优先的交易所基础设施',
    hi: 'Pi-first एक्सचेंज इंफ्रास्ट्रक्चर',
    ar: 'بنية تداول تضع Pi أولاً',
  },

  // -------------------------
  // Poll / Governance
  // -------------------------

  picexPollQuestion: {
    fa: 'آیا موافقید picex ابتدا بازار اسپات و واریز/برداشت کیف پول را قبل از راه‌اندازی فیوچرز اولویت دهد؟',
    en: 'Should picex prioritize Spot Market and Wallet Deposit/Withdraw before launching Futures?',
    tr: 'picex, vadeli işlemleri başlatmadan önce Spot Piyasa ve Cüzdan Yatırma/Çekme özelliklerine öncelik vermeli mi?',
    zh: 'picex 是否应在推出期货之前优先开发现货市场和钱包充值/提现？',
    hi: 'क्या picex को फ्यूचर्स लॉन्च करने से पहले स्पॉट मार्केट और वॉलेट जमा/निकासी को प्राथमिकता देनी चाहिए?',
    ar: 'هل يجب أن يعطي picex الأولوية للسوق الفوري والإيداع/السحب من المحفظة قبل إطلاق العقود الآجلة؟',
  },

  picexPollDescription: {
    fa: 'رأی‌گیری‌های حاکمیتی picex به جامعه کمک می‌کند اولویت‌های محصول مانند معاملات اسپات، عملیات کیف پول، پشتیبانی هوش مصنوعی، نمودارهای اختصاصی و آمادگی فیوچرز را جهت‌دهی کند.',
    en: 'picex governance polls help the community guide product priorities such as spot trading, wallet operations, AI support, native charts, and futures readiness.',
    tr: 'picex yönetişim anketleri; spot işlemler, cüzdan operasyonları, yapay zeka desteği, yerel grafikler ve vadeli işlemlere hazırlık gibi ürün önceliklerini topluluğun yönlendirmesine yardımcı olur.',
    zh: 'picex 治理投票帮助社区指导产品优先级，例如现货交易、钱包操作、AI 支持、原生图表和期货准备。',
    hi: 'picex गवर्नेंस पोल समुदाय को स्पॉट ट्रेडिंग, वॉलेट संचालन, AI सहायता, नेटिव चार्ट और फ्यूचर्स तैयारी जैसी उत्पाद प्राथमिकताओं को दिशा देने में मदद करते हैं।',
    ar: 'تساعد استطلاعات حوكمة picex المجتمع على توجيه أولويات المنتج مثل التداول الفوري وعمليات المحفظة والدعم الذكي والمخططات الأصلية والاستعداد للعقود الآجلة.',
  },

  pollYes: {
    fa: 'بله، ابتدا اسپات و کیف پول',
    en: 'Yes, Spot and Wallet first',
    tr: 'Evet, önce Spot ve Cüzdan',
    zh: '是，先做现货和钱包',
    hi: 'हाँ, पहले स्पॉट और वॉलेट',
    ar: 'نعم، السوق الفوري والمحفظة أولاً',
  },

  pollNo: {
    fa: 'خیر، فیوچرز را زودتر اضافه کنیم',
    en: 'No, launch Futures earlier',
    tr: 'Hayır, Vadeli işlemler daha erken başlasın',
    zh: '不，先更早推出期货',
    hi: 'नहीं, फ्यूचर्स पहले लॉन्च करें',
    ar: 'لا، أطلقوا العقود الآجلة مبكراً',
  },

  yesLabel: {
    fa: 'بله',
    en: 'Yes',
    tr: 'Evet',
    zh: '是',
    hi: 'हाँ',
    ar: 'نعم',
  },

  noLabel: {
    fa: 'خیر',
    en: 'No',
    tr: 'Hayır',
    zh: '否',
    hi: 'नहीं',
    ar: 'لا',
  },

  pollLoading: {
    fa: 'در حال دریافت رأی‌گیری حاکمیتی picex...',
    en: 'Loading picex governance poll...',
    tr: 'picex yönetişim anketi yükleniyor...',
    zh: '正在加载 picex 治理投票...',
    hi: 'picex गवर्नेंस पोल लोड हो रहा है...',
    ar: 'جارٍ تحميل استطلاع حوكمة picex...',
  },

  pollLoginRequired: {
    fa: 'برای ثبت رأی باید ابتدا با Pi وارد شوید.',
    en: 'You must login with Pi before voting.',
    tr: 'Oy vermeden önce Pi ile giriş yapmalısınız.',
    zh: '投票前必须使用 Pi 登录。',
    hi: 'मतदान से पहले आपको Pi से लॉगिन करना होगा।',
    ar: 'يجب تسجيل الدخول باستخدام Pi قبل التصويت.',
  },

  pollAlreadyVoted: {
    fa: 'شما قبلاً در این رأی‌گیری شرکت کرده‌اید.',
    en: 'You have already voted in this poll.',
    tr: 'Bu ankette zaten oy kullandınız.',
    zh: '您已经在此投票中投过票。',
    hi: 'आप इस मतदान में पहले ही वोट कर चुके हैं।',
    ar: 'لقد قمت بالتصويت في هذا الاستطلاع من قبل.',
  },

  pollVoteSuccess: {
    fa: 'رأی شما با موفقیت ثبت شد.',
    en: 'Your vote has been recorded successfully.',
    tr: 'Oyunuz başarıyla kaydedildi.',
    zh: '您的投票已成功记录。',
    hi: 'आपका वोट सफलतापूर्वक दर्ज कर लिया गया है।',
    ar: 'تم تسجيل صوتك بنجاح.',
  },

  totalVotes: {
    fa: 'مجموع رأی‌ها',
    en: 'Total votes',
    tr: 'Toplam oy',
    zh: '总票数',
    hi: 'कुल वोट',
    ar: 'إجمالي الأصوات',
  },

  yourVote: {
    fa: 'رأی شما',
    en: 'Your vote',
    tr: 'Oyunuz',
    zh: '您的投票',
    hi: 'आपका वोट',
    ar: 'صوتك',
  },

  voteDate: {
    fa: 'تاریخ رأی',
    en: 'Vote date',
    tr: 'Oy tarihi',
    zh: '投票日期',
    hi: 'मतदान तिथि',
    ar: 'تاريخ التصويت',
  },

  voteHistory: {
    fa: 'تاریخچه رأی شما',
    en: 'Your vote history',
    tr: 'Oy geçmişiniz',
    zh: '您的投票历史',
    hi: 'आपका मतदान इतिहास',
    ar: 'سجل تصويتك',
  },

  pollConnectionError: {
    fa: 'خطا در ارتباط با سرور رأی‌گیری.',
    en: 'Error connecting to poll server.',
    tr: 'Anket sunucusuna bağlanırken hata oluştu.',
    zh: '连接投票服务器时出错。',
    hi: 'मतदान सर्वर से कनेक्ट करने में त्रुटि।',
    ar: 'حدث خطأ أثناء الاتصال بخادم التصويت.',
  },

  // -------------------------
  // Products / Market Modules
  // -------------------------

  picexProductsTitle: {
    fa: 'بازارها، ابزارهای کیف پول و ماژول‌های صرافی',
    en: 'Markets, wallet tools, and exchange modules',
    tr: 'Piyasalar, cüzdan araçları ve borsa modülleri',
    zh: '市场、钱包工具和交易所模块',
    hi: 'बाज़ार, वॉलेट टूल और एक्सचेंज मॉड्यूल',
    ar: 'الأسواق وأدوات المحفظة ووحدات التداول',
  },

  picexProductsSubtitle: {
    fa: 'ماژول‌های اصلی picex را ببینید: بازار اسپات، عملیات کیف پول، نمودارهای اختصاصی، پشتیبانی هوش مصنوعی، حاکمیت و زیرساخت آماده فیوچرز.',
    en: 'Explore the product modules that shape picex: spot markets, wallet operations, native charts, AI support, governance, and futures-ready infrastructure.',
    tr: 'picex’i şekillendiren ürün modüllerini keşfedin: spot piyasalar, cüzdan operasyonları, yerel grafikler, yapay zeka desteği, yönetişim ve vadeli işlemlere hazır altyapı.',
    zh: '探索构成 picex 的产品模块：现货市场、钱包操作、原生图表、AI 支持、治理和期货就绪基础设施。',
    hi: 'picex को आकार देने वाले उत्पाद मॉड्यूल देखें: स्पॉट मार्केट, वॉलेट संचालन, नेटिव चार्ट, AI सहायता, गवर्नेंस और फ्यूचर्स-रेडी इंफ्रास्ट्रक्चर।',
    ar: 'استكشف وحدات المنتج التي تشكل picex: الأسواق الفورية وعمليات المحفظة والمخططات الأصلية والدعم الذكي والحوكمة والبنية الجاهزة للعقود الآجلة.',
  },

  buyNow: {
    fa: 'باز کردن',
    en: 'Open',
    tr: 'Aç',
    zh: '打开',
    hi: 'खोलें',
    ar: 'فتح',
  },

  purchaseSuccess: {
    fa: 'عملیات با موفقیت انجام شد',
    en: 'Action completed successfully',
    tr: 'İşlem başarıyla tamamlandı',
    zh: '操作成功完成',
    hi: 'क्रिया सफलतापूर्वक पूरी हुई',
    ar: 'تم تنفيذ العملية بنجاح',
  },

  purchaseError: {
    fa: 'خطا در عملیات. دوباره تلاش کنید.',
    en: 'Action error. Please try again.',
    tr: 'İşlem hatası. Lütfen tekrar deneyin.',
    zh: '操作错误。请重试。',
    hi: 'क्रिया त्रुटि। कृपया पुनः प्रयास करें।',
    ar: 'خطأ في العملية. يرجى المحاولة مرة أخرى.',
  },

  // -------------------------
  // Payment / History / Success
  // -------------------------

  paymentSuccessful: {
    fa: 'پرداخت موفقیت‌آمیز بود!',
    en: 'Payment was successful!',
    tr: 'Ödeme başarılı!',
    zh: '支付成功！',
    hi: 'भुगतान सफल रहा!',
    ar: 'تم الدفع بنجاح!',
  },

  transactionRegistered: {
    fa: 'پرداخت شما با موفقیت در picex ثبت شد.',
    en: 'Your payment was successfully registered in picex.',
    tr: 'Ödemeniz picex içinde başarıyla kaydedildi.',
    zh: '您的付款已成功记录在 picex 中。',
    hi: 'आपका भुगतान picex में सफलतापूर्वक दर्ज हो गया।',
    ar: 'تم تسجيل دفعتك بنجاح في picex.',
  },

  transactionId: {
    fa: 'شناسه تراکنش',
    en: 'Transaction ID',
    tr: 'İşlem ID',
    zh: '交易 ID',
    hi: 'लेनदेन ID',
    ar: 'معرّف المعاملة',
  },

  transactionIdentifier: {
    fa: 'شناسه تراکنش',
    en: 'Transaction ID',
    tr: 'İşlem Kimliği',
    zh: '交易标识',
    hi: 'लेनदेन पहचान',
    ar: 'معرّف المعاملة',
  },

  amount: {
    fa: 'مبلغ',
    en: 'Amount',
    tr: 'Tutar',
    zh: '金额',
    hi: 'राशि',
    ar: 'المبلغ',
  },

  product: {
    fa: 'هدف',
    en: 'Purpose',
    tr: 'Amaç',
    zh: '用途',
    hi: 'उद्देश्य',
    ar: 'الغرض',
  },

  status: {
    fa: 'وضعیت',
    en: 'Status',
    tr: 'Durum',
    zh: '状态',
    hi: 'स्थिति',
    ar: 'الحالة',
  },

  date: {
    fa: 'تاریخ',
    en: 'Date',
    tr: 'Tarih',
    zh: '日期',
    hi: 'तारीख',
    ar: 'التاريخ',
  },

  successful: {
    fa: 'موفق',
    en: 'Successful',
    tr: 'Başarılı',
    zh: '成功',
    hi: 'सफल',
    ar: 'ناجح',
  },

  failed: {
    fa: 'ناموفق',
    en: 'Failed',
    tr: 'Başarısız',
    zh: '失败',
    hi: 'विफल',
    ar: 'فشل',
  },

  pending: {
    fa: 'در انتظار',
    en: 'Pending',
    tr: 'Beklemede',
    zh: '待处理',
    hi: 'लंबित',
    ar: 'قيد الانتظار',
  },

  approved: {
    fa: 'تأیید شده',
    en: 'Approved',
    tr: 'Onaylandı',
    zh: '已批准',
    hi: 'स्वीकृत',
    ar: 'تمت الموافقة',
  },

  cancelled: {
    fa: 'لغو شده',
    en: 'Cancelled',
    tr: 'İptal edildi',
    zh: '已取消',
    hi: 'रद्द',
    ar: 'ملغى',
  },

  historyTitle: {
    fa: 'تاریخچه پرداخت و فعالیت کیف پول',
    en: 'Payment & Wallet Activity',
    tr: 'Ödeme ve Cüzdan Aktivitesi',
    zh: '支付与钱包活动',
    hi: 'भुगतान और वॉलेट गतिविधि',
    ar: 'نشاط الدفع والمحفظة',
  },

  picexHistorySubtitle: {
    fa: 'تأییدها، تکمیل پرداخت‌ها، شناسه تراکنش‌ها و در آینده سوابق واریز و برداشت کیف پول خود را دنبال کنید.',
    en: 'Track your Pi payment approvals, completions, transaction IDs, and future wallet-related activity records.',
    tr: 'Pi ödeme onaylarınızı, tamamlamalarınızı, işlem kimliklerinizi ve gelecekteki cüzdan kayıtlarınızı takip edin.',
    zh: '跟踪您的 Pi 支付批准、完成、交易 ID 以及未来的钱包相关活动记录。',
    hi: 'अपने Pi भुगतान अनुमोदन, पूर्णता, लेनदेन ID और भविष्य के वॉलेट-संबंधित गतिविधि रिकॉर्ड ट्रैक करें।',
    ar: 'تتبع موافقات مدفوعات Pi وإكمالها ومعرفات المعاملات وسجلات نشاط المحفظة المستقبلية.',
  },

  noTransactions: {
    fa: 'هنوز هیچ تراکنشی ثبت نشده است.',
    en: 'No transactions have been recorded yet.',
    tr: 'Henüz hiç işlem kaydedilmedi.',
    zh: '尚未记录任何交易。',
    hi: 'अभी तक कोई लेनदेन दर्ज नहीं हुआ है।',
    ar: 'لم يتم تسجيل أي معاملات بعد.',
  },

  backToHome: {
    fa: 'بازگشت به خانه',
    en: 'Back to Home',
    tr: 'Ana Sayfaya Dön',
    zh: '返回首页',
    hi: 'होम पर वापस जाएँ',
    ar: 'العودة إلى الرئيسية',
  },

  // -------------------------
  // Engagement Tasks
  // -------------------------

  tasksTitle: {
    fa: 'تسک‌های جامعه picex',
    en: 'picex Community Tasks',
    tr: 'picex Topluluk Görevleri',
    zh: 'picex 社区任务',
    hi: 'picex सामुदायिक कार्य',
    ar: 'مهام مجتمع picex',
  },

  tasksSubtitle: {
    fa: 'تسک‌های آموزشی و اجتماعی را کامل کنید و با ورود Pi، حاکمیت، امنیت کیف پول، داده بازار و پشتیبانی هوشمند picex آشنا شوید.',
    en: 'Complete educational and community tasks to learn how picex works: Pi login, governance, wallet safety, market data, AI support, and future trading modules.',
    tr: 'picex’in nasıl çalıştığını öğrenmek için eğitim ve topluluk görevlerini tamamlayın: Pi girişi, yönetişim, cüzdan güvenliği, piyasa verisi, yapay zeka desteği ve gelecekteki işlem modülleri.',
    zh: '完成教育和社区任务，了解 picex 的工作方式：Pi 登录、治理、钱包安全、市场数据、AI 支持和未来交易模块。',
    hi: 'picex कैसे काम करता है यह सीखने के लिए शैक्षिक और सामुदायिक कार्य पूरे करें: Pi लॉगिन, गवर्नेंस, वॉलेट सुरक्षा, मार्केट डेटा, AI सहायता और भविष्य के ट्रेडिंग मॉड्यूल।',
    ar: 'أكمل المهام التعليمية والمجتمعية لتتعلم كيف يعمل picex: تسجيل دخول Pi، الحوكمة، أمان المحفظة، بيانات السوق، الدعم الذكي، ووحدات التداول المستقبلية.',
  },

  tasksCompleted: {
    fa: 'تسک تکمیل شده',
    en: 'tasks completed',
    tr: 'görev tamamlandı',
    zh: '任务已完成',
    hi: 'कार्य पूर्ण',
    ar: 'مهام مكتملة',
  },

  taskConnectPiTitle: {
    fa: 'اتصال با Pi',
    en: 'Connect with Pi',
    tr: 'Pi ile Bağlan',
    zh: '连接 Pi',
    hi: 'Pi से कनेक्ट करें',
    ar: 'الاتصال بـ Pi',
  },

  taskConnectPiDescription: {
    fa: 'حساب Pi خود را متصل کنید تا رأی‌گیری، پرداخت، کیف پول و امکانات آینده معاملاتی picex فعال شود.',
    en: 'Connect your Pi account to unlock picex governance, payments, wallet access, and future trading features.',
    tr: 'picex yönetişimi, ödemeler, cüzdan erişimi ve gelecekteki işlem özellikleri için Pi hesabınızı bağlayın.',
    zh: '连接您的 Pi 账户以解锁 picex 治理、支付、钱包访问和未来交易功能。',
    hi: 'picex गवर्नेंस, भुगतान, वॉलेट एक्सेस और भविष्य की ट्रेडिंग सुविधाओं को अनलॉक करने के लिए अपना Pi खाता कनेक्ट करें।',
    ar: 'اربط حساب Pi الخاص بك لفتح حوكمة picex والمدفوعات والوصول إلى المحفظة وميزات التداول المستقبلية.',
  },

  taskJoinGovernanceTitle: {
    fa: 'شرکت در حاکمیت picex',
    en: 'Vote in picex Governance',
    tr: 'picex Yönetişiminde Oy Ver',
    zh: '参与 picex 治理投票',
    hi: 'picex गवर्नेंस में वोट करें',
    ar: 'صوّت في حوكمة picex',
  },

  taskJoinGovernanceDescription: {
    fa: 'در رأی‌گیری‌های جامعه شرکت کنید و به اولویت‌بندی بازار اسپات، عملیات کیف پول، AI و فیوچرز کمک کنید.',
    en: 'Participate in community polls and help prioritize spot trading, wallet operations, AI support, and futures readiness.',
    tr: 'Topluluk anketlerine katılın ve spot işlemler, cüzdan operasyonları, yapay zeka desteği ve vadeli işlemlere hazırlık önceliklerine yardımcı olun.',
    zh: '参与社区投票，帮助确定现货交易、钱包操作、AI 支持和期货准备的优先级。',
    hi: 'सामुदायिक पोल में भाग लें और स्पॉट ट्रेडिंग, वॉलेट संचालन, AI सहायता और फ्यूचर्स तैयारी को प्राथमिकता देने में मदद करें।',
    ar: 'شارك في استطلاعات المجتمع وساعد في تحديد أولويات التداول الفوري وعمليات المحفظة والدعم الذكي والاستعداد للعقود الآجلة.',
  },

  taskLearnWalletTitle: {
    fa: 'یادگیری امنیت کیف پول',
    en: 'Learn Wallet Safety',
    tr: 'Cüzdan Güvenliğini Öğren',
    zh: '学习钱包安全',
    hi: 'वॉलेट सुरक्षा सीखें',
    ar: 'تعلم أمان المحفظة',
  },

  taskLearnWalletDescription: {
    fa: 'قبل از استفاده از امکانات کیف پول، درباره آدرس واریز، صف برداشت، کیف پول گرم، کیف پول سرد و تطبیق موجودی یاد بگیرید.',
    en: 'Read about deposit addresses, withdrawal queues, hot wallets, cold wallets, and reconciliation before using exchange wallet features.',
    tr: 'Borsa cüzdan özelliklerini kullanmadan önce yatırma adresleri, çekim kuyrukları, sıcak cüzdanlar, soğuk cüzdanlar ve mutabakat hakkında bilgi edinin.',
    zh: '在使用交易所钱包功能之前，了解充值地址、提现队列、热钱包、冷钱包和对账。',
    hi: 'एक्सचेंज वॉलेट सुविधाओं का उपयोग करने से पहले जमा पते, निकासी कतार, हॉट वॉलेट, कोल्ड वॉलेट और रिकंसिलिएशन के बारे में पढ़ें।',
    ar: 'اقرأ عن عناوين الإيداع وقوائم السحب والمحافظ الساخنة والباردة والمطابقة قبل استخدام ميزات محفظة المنصة.',
  },

  taskExploreMarketsTitle: {
    fa: 'بررسی بازارهای picex',
    en: 'Explore picex Markets',
    tr: 'picex Piyasalarını Keşfet',
    zh: '探索 picex 市场',
    hi: 'picex बाज़ार देखें',
    ar: 'استكشف أسواق picex',
  },

  taskExploreMarketsDescription: {
    fa: 'تجربه آینده بازار اسپات، نمودار اختصاصی، دفتر سفارش و ماژول‌های معاملاتی را بررسی کنید.',
    en: 'Preview the future spot market experience, native chart data, order book design, and trading modules.',
    tr: 'Gelecekteki spot piyasa deneyimini, yerel grafik verilerini, emir defteri tasarımını ve işlem modüllerini önizleyin.',
    zh: '预览未来的现货市场体验、原生图表数据、订单簿设计和交易模块。',
    hi: 'भविष्य के स्पॉट मार्केट अनुभव, नेटिव चार्ट डेटा, ऑर्डर बुक डिज़ाइन और ट्रेडिंग मॉड्यूल का पूर्वावलोकन करें।',
    ar: 'عاين تجربة السوق الفوري المستقبلية وبيانات المخططات الأصلية وتصميم دفتر الأوامر ووحدات التداول.',
  },

  taskTryAiSupportTitle: {
    fa: 'آزمایش پشتیبانی هوش مصنوعی',
    en: 'Try AI Support',
    tr: 'Yapay Zeka Desteğini Dene',
    zh: '试用 AI 支持',
    hi: 'AI सहायता आज़माएँ',
    ar: 'جرّب الدعم الذكي',
  },

  taskTryAiSupportDescription: {
    fa: 'از دستیار هوش مصنوعی آینده برای سوالات مربوط به ورود Pi، پرداخت، واریز، برداشت، KYC و کارمزدها استفاده کنید.',
    en: 'Use the future AI support assistant for questions about Pi login, payments, deposits, withdrawals, KYC, and fees.',
    tr: 'Pi girişi, ödemeler, yatırmalar, çekimler, KYC ve ücretlerle ilgili sorular için gelecekteki yapay zeka destek asistanını kullanın.',
    zh: '使用未来的 AI 支持助手来解答关于 Pi 登录、支付、充值、提现、KYC 和费用的问题。',
    hi: 'Pi लॉगिन, भुगतान, जमा, निकासी, KYC और फीस से जुड़े सवालों के लिए भविष्य के AI सहायता सहायक का उपयोग करें।',
    ar: 'استخدم مساعد الدعم الذكي المستقبلي للأسئلة حول تسجيل دخول Pi والمدفوعات والإيداعات والسحوبات وKYC والرسوم.',
  },

  taskReadWhitepaperTitle: {
    fa: 'مطالعه وایت‌پیپر picex',
    en: 'Read the picex Whitepaper',
    tr: 'picex Whitepaper’ını Oku',
    zh: '阅读 picex 白皮书',
    hi: 'picex व्हाइटपेपर पढ़ें',
    ar: 'اقرأ الورقة البيضاء لـ picex',
  },

  taskReadWhitepaperDescription: {
    fa: 'معماری صرافی هیبرید، دفترکل داخلی، لایه تسویه Pi، فرضیات توکن و نقشه راه را مطالعه کنید.',
    en: 'Understand the hybrid exchange architecture, internal ledger, Pi settlement layer, token assumptions, and roadmap.',
    tr: 'Hibrit borsa mimarisini, dahili defteri, Pi uzlaşma katmanını, token varsayımlarını ve yol haritasını anlayın.',
    zh: '了解混合交易所架构、内部账本、Pi 结算层、代币假设和路线图。',
    hi: 'हाइब्रिड एक्सचेंज आर्किटेक्चर, आंतरिक लेजर, Pi सेटलमेंट लेयर, टोकन मान्यताओं और रोडमैप को समझें।',
    ar: 'افهم معمارية التداول الهجينة، ودفتر الأستاذ الداخلي، وطبقة تسوية Pi، وافتراضات الرمز، وخارطة الطريق.',
  },

  reward: {
    fa: 'پاداش',
    en: 'Reward',
    tr: 'Ödül',
    zh: '奖励',
    hi: 'पुरस्कार',
    ar: 'مكافأة',
  },

  claim: {
    fa: 'دریافت',
    en: 'Claim',
    tr: 'Talep Et',
    zh: '领取',
    hi: 'दावा करें',
    ar: 'المطالبة',
  },

  claimed: {
    fa: 'دریافت شد',
    en: 'Claimed',
    tr: 'Alındı',
    zh: '已领取',
    hi: 'दावा किया गया',
    ar: 'تمت المطالبة',
  },

  // -------------------------
  // Footer
  // -------------------------

  picexFooterBadge: {
    fa: 'هاب معاملاتی هیبرید برای Pi Network',
    en: 'Hybrid Trading Hub for Pi Network',
    tr: 'Pi Network için Hibrit İşlem Merkezi',
    zh: 'Pi Network 混合交易中心',
    hi: 'Pi Network के लिए हाइब्रिड ट्रेडिंग हब',
    ar: 'مركز تداول هجين لشبكة Pi',
  },

  picexFooterDescription: {
    fa: 'picex تجربه‌ای Pi-first برای صرافی هیبرید است که معاملات سریع، ورود Pi، جریان پرداخت، داده بازار اختصاصی، پشتیبانی هوش مصنوعی و معماری آماده کیف پول را ترکیب می‌کند.',
    en: 'picex is a Pi-first hybrid exchange experience combining fast trading, Pi login, payment flows, native market data, AI support, and a wallet-ready architecture.',
    tr: 'picex; hızlı işlem, Pi girişi, ödeme akışları, yerel piyasa verisi, yapay zeka desteği ve cüzdana hazır mimariyi birleştiren Pi odaklı hibrit borsa deneyimidir.',
    zh: 'picex 是一种 Pi 优先的混合交易体验，结合了快速交易、Pi 登录、支付流程、原生市场数据、AI 支持和钱包就绪架构。',
    hi: 'picex एक Pi-first हाइब्रिड एक्सचेंज अनुभव है जो तेज़ ट्रेडिंग, Pi लॉगिन, भुगतान प्रवाह, नेटिव मार्केट डेटा, AI सहायता और वॉलेट-रेडी आर्किटेक्चर को जोड़ता है।',
    ar: 'picex تجربة تداول هجينة تضع Pi أولاً، تجمع بين التداول السريع وتسجيل دخول Pi وتدفقات الدفع وبيانات السوق الأصلية والدعم الذكي وبنية جاهزة للمحفظة.',
  },

  footerExchange: {
    fa: 'صرافی',
    en: 'Exchange',
    tr: 'Borsa',
    zh: '交易所',
    hi: 'एक्सचेंज',
    ar: 'المنصة',
  },

  footerCommunity: {
    fa: 'جامعه',
    en: 'Community',
    tr: 'Topluluk',
    zh: '社区',
    hi: 'समुदाय',
    ar: 'المجتمع',
  },

  footerResources: {
    fa: 'منابع',
    en: 'Resources',
    tr: 'Kaynaklar',
    zh: '资源',
    hi: 'संसाधन',
    ar: 'الموارد',
  },

  picexFooterNote: {
    fa: 'picex در حال توسعه فعال است. قابلیت‌های معامله، کیف پول، واریز، برداشت، فیوچرز و پشتیبانی هوش مصنوعی باید قبل از استفاده عملیاتی تست، ممیزی و از نظر انطباق بررسی شوند.',
    en: 'picex is under active development. Trading, wallet, deposit, withdrawal, futures, and AI support features must be tested, audited, and reviewed for compliance before production use.',
    tr: 'picex aktif olarak geliştirilmektedir. İşlem, cüzdan, yatırma, çekme, vadeli işlemler ve yapay zeka desteği özellikleri üretimden önce test edilmeli, denetlenmeli ve uyumluluk açısından incelenmelidir.',
    zh: 'picex 正在积极开发中。交易、钱包、充值、提现、期货和 AI 支持功能在生产使用前必须经过测试、审计和合规审查。',
    hi: 'picex सक्रिय विकास में है। ट्रेडिंग, वॉलेट, जमा, निकासी, फ्यूचर्स और AI सहायता सुविधाओं को उत्पादन उपयोग से पहले परीक्षण, ऑडिट और अनुपालन समीक्षा से गुजरना चाहिए।',
    ar: 'picex قيد التطوير النشط. يجب اختبار ميزات التداول والمحفظة والإيداع والسحب والعقود الآجلة والدعم الذكي وتدقيقها ومراجعتها من حيث الامتثال قبل الاستخدام الإنتاجي.',
  },

  footerRights: {
    fa: 'تمام حقوق محفوظ است.',
    en: 'All rights reserved.',
    tr: 'Tüm hakları saklıdır.',
    zh: '版权所有。',
    hi: 'सर्वाधिकार सुरक्षित।',
    ar: 'جميع الحقوق محفوظة.',
  },

  privacyPolicy: {
    fa: 'سیاست حفظ حریم خصوصی',
    en: 'Privacy Policy',
    tr: 'Gizlilik Politikası',
    zh: '隐私政策',
    hi: 'गोपनीयता नीति',
    ar: 'سياسة الخصوصية',
  },

  termsOfService: {
    fa: 'شرایط استفاده',
    en: 'Terms of Service',
    tr: 'Kullanım Şartları',
    zh: '服务条款',
    hi: 'सेवा की शर्तें',
    ar: 'شروط الخدمة',
  },

  whitepaper: {
    fa: 'وایت‌پیپر',
    en: 'Whitepaper',
    tr: 'Whitepaper',
    zh: '白皮书',
    hi: 'व्हाइटपेपर',
    ar: 'الورقة البيضاء',
  },

  // -------------------------
  // Architecture / Former DIG Page
  // -------------------------

  picexArchitecturePageTitle: {
    fa: 'معماری صرافی هیبرید picex',
    en: 'picex Hybrid Exchange Architecture',
    tr: 'picex Hibrit Borsa Mimarisi',
    zh: 'picex 混合交易所架构',
    hi: 'picex हाइब्रिड एक्सचेंज आर्किटेक्चर',
    ar: 'معمارية منصة picex الهجينة',
  },

  picexArchitecturePageLead: {
    fa: 'مروری فنی بر اینکه چگونه picex از یک اپ ورود و پرداخت Pi به یک هاب معاملاتی هیبرید با کیف پول، نمودار اختصاصی، پشتیبانی هوش مصنوعی و زیرساخت آینده فیوچرز تبدیل می‌شود.',
    en: 'A technical overview of how picex evolves from a Pi login and payment application into a hybrid trading hub with wallet operations, native charts, AI support, and future futures infrastructure.',
    tr: 'picex’in Pi giriş ve ödeme uygulamasından cüzdan operasyonları, yerel grafikler, yapay zeka desteği ve gelecekteki vadeli işlem altyapısına sahip hibrit bir işlem merkezine nasıl dönüştüğüne dair teknik bir genel bakış.',
    zh: '技术概览：picex 如何从 Pi 登录和支付应用发展为具有钱包操作、原生图表、AI 支持和未来期货基础设施的混合交易中心。',
    hi: 'एक तकनीकी अवलोकन कि picex कैसे Pi लॉगिन और भुगतान एप्लिकेशन से वॉलेट संचालन, नेटिव चार्ट, AI सहायता और भविष्य की फ्यूचर्स इंफ्रास्ट्रक्चर वाले हाइब्रिड ट्रेडिंग हब में विकसित होता है।',
    ar: 'نظرة تقنية على كيفية تطور picex من تطبيق لتسجيل دخول ومدفوعات Pi إلى مركز تداول هجين مع عمليات محفظة ومخططات أصلية ودعم ذكي وبنية مستقبلية للعقود الآجلة.',
  },

  picexWhatTitle: {
    fa: 'picex چیست؟',
    en: 'What is picex?',
    tr: 'picex Nedir?',
    zh: '什么是 picex？',
    hi: 'picex क्या है?',
    ar: 'ما هو picex؟',
  },

  picexWhatText: {
    fa: 'picex یک مفهوم صرافی هیبرید Pi-first است. عملیات معاملاتی سریع در سیستم داخلی تطبیق و دفترکل انجام می‌شود، در حالی که ورود Pi، پرداخت‌ها، واریز، برداشت و قوانین تسویه به اکوسیستم Pi متصل می‌مانند.',
    en: 'picex is a Pi-first hybrid exchange concept. It keeps fast trading operations inside an internal matching and ledger system, while Pi login, Pi payments, deposits, withdrawals, and settlement rules connect the platform to the Pi ecosystem.',
    tr: 'picex, Pi odaklı bir hibrit borsa konseptidir. Hızlı işlem operasyonlarını dahili eşleştirme ve defter sistemi içinde tutarken Pi girişi, Pi ödemeleri, yatırmalar, çekimler ve uzlaşma kuralları platformu Pi ekosistemine bağlar.',
    zh: 'picex 是一个 Pi 优先的混合交易所概念。它将快速交易操作保留在内部撮合和账本系统中，同时 Pi 登录、Pi 支付、充值、提现和结算规则将平台连接到 Pi 生态系统。',
    hi: 'picex एक Pi-first हाइब्रिड एक्सचेंज अवधारणा है। यह तेज़ ट्रेडिंग संचालन को आंतरिक मैचिंग और लेजर सिस्टम के अंदर रखता है, जबकि Pi लॉगिन, Pi भुगतान, जमा, निकासी और सेटलमेंट नियम प्लेटफ़ॉर्म को Pi इकोसिस्टम से जोड़ते हैं।',
    ar: 'picex مفهوم منصة تداول هجينة تضع Pi أولاً. فهي تبقي عمليات التداول السريعة داخل نظام مطابقة ودفتر أستاذ داخلي، بينما يربط تسجيل دخول Pi ومدفوعات Pi والإيداعات والسحوبات وقواعد التسوية المنصة بنظام Pi.',
  },

  picexArchMatchingTitle: {
    fa: 'موتور تطبیق آف‌چین',
    en: 'Off-chain Matching Engine',
    tr: 'Off-chain Eşleştirme Motoru',
    zh: '链下撮合引擎',
    hi: 'ऑफ-चेन मैचिंग इंजन',
    ar: 'محرك مطابقة خارج السلسلة',
  },

  picexArchMatchingText: {
    fa: 'سفارش‌ها در یک موتور کم‌تاخیر بک‌اند تطبیق داده می‌شوند تا معامله‌گران تجربه‌ای سریع شبیه صرافی‌های مدرن داشته باشند.',
    en: 'Orders are planned to be matched inside a low-latency backend engine so traders can experience fast execution similar to modern centralized exchanges.',
    tr: 'Emirlerin düşük gecikmeli bir backend motorunda eşleştirilmesi planlanır, böylece yatırımcılar modern merkezi borsalara benzer hızlı yürütme deneyimi yaşayabilir.',
    zh: '订单计划在低延迟后端引擎内撮合，使交易者能够获得类似现代中心化交易所的快速执行体验。',
    hi: 'ऑर्डर कम-लेटेंसी बैकएंड इंजन के अंदर मैच किए जाने की योजना है ताकि ट्रेडर आधुनिक केंद्रीकृत एक्सचेंज जैसी तेज़ निष्पादन सुविधा अनुभव कर सकें।',
    ar: 'من المخطط مطابقة الأوامر داخل محرك خلفي منخفض التأخير حتى يحصل المتداولون على تنفيذ سريع يشبه المنصات المركزية الحديثة.',
  },

  picexArchWalletTitle: {
    fa: 'لایه کیف پول و تسویه',
    en: 'Wallet & Settlement Layer',
    tr: 'Cüzdan ve Uzlaşma Katmanı',
    zh: '钱包与结算层',
    hi: 'वॉलेट और सेटलमेंट लेयर',
    ar: 'طبقة المحفظة والتسوية',
  },

  picexArchWalletText: {
    fa: 'واریزها، برداشت‌ها، موجودی‌های در انتظار، عملیات کیف پول گرم، خزانه سرد و تطبیق موجودی از موتور معاملات جدا نگه داشته می‌شوند.',
    en: 'Deposits, withdrawals, pending balances, hot wallet operations, cold wallet treasury, and reconciliation are separated from the trading engine.',
    tr: 'Yatırmalar, çekimler, bekleyen bakiyeler, sıcak cüzdan operasyonları, soğuk cüzdan hazinesi ve mutabakat işlem motorundan ayrılır.',
    zh: '充值、提现、待处理余额、热钱包操作、冷钱包资金库和对账与交易引擎分离。',
    hi: 'जमा, निकासी, लंबित बैलेंस, हॉट वॉलेट संचालन, कोल्ड वॉलेट ट्रेजरी और रिकंसिलिएशन को ट्रेडिंग इंजन से अलग रखा जाता है।',
    ar: 'يتم فصل الإيداعات والسحوبات والأرصدة المعلقة وعمليات المحفظة الساخنة وخزينة المحفظة الباردة والمطابقة عن محرك التداول.',
  },

  picexArchPiTitle: {
    fa: 'هویت و پرداخت‌های Pi',
    en: 'Pi Identity & Payment Flows',
    tr: 'Pi Kimliği ve Ödeme Akışları',
    zh: 'Pi 身份与支付流程',
    hi: 'Pi पहचान और भुगतान प्रवाह',
    ar: 'هوية Pi وتدفقات الدفع',
  },

  picexArchPiText: {
    fa: 'Pi SDK برای ورود و مجوز پرداخت در موارد پشتیبانی‌شده استفاده می‌شود، در حالی که نگه‌داری دارایی و حسابداری دفترکل توسط زیرساخت picex کنترل می‌شود.',
    en: 'Pi SDK is used for login and payment authorization where supported, while custody and ledger accounting remain controlled by picex infrastructure.',
    tr: 'Pi SDK, desteklenen yerlerde giriş ve ödeme yetkilendirmesi için kullanılır; saklama ve defter muhasebesi ise picex altyapısı tarafından kontrol edilir.',
    zh: 'Pi SDK 用于支持的登录和支付授权场景，而托管和账本会计仍由 picex 基础设施控制。',
    hi: 'Pi SDK का उपयोग जहाँ समर्थित हो वहाँ लॉगिन और भुगतान अनुमति के लिए किया जाता है, जबकि कस्टडी और लेजर अकाउंटिंग picex इंफ्रास्ट्रक्चर द्वारा नियंत्रित रहती है।',
    ar: 'يُستخدم Pi SDK لتسجيل الدخول وتفويض الدفع حيثما كان مدعوماً، بينما تبقى الحفظ ومحاسبة دفتر الأستاذ تحت سيطرة بنية picex.',
  },

  picexArchChartsTitle: {
    fa: 'داده بازار اختصاصی',
    en: 'Native Market Data',
    tr: 'Yerel Piyasa Verisi',
    zh: '原生市场数据',
    hi: 'नेटिव मार्केट डेटा',
    ar: 'بيانات سوق أصلية',
  },

  picexArchChartsText: {
    fa: 'نمودارها، تیکرها، معاملات و کندل‌های OHLC از معاملات انجام‌شده و داده دفتر سفارش داخلی picex تولید می‌شوند.',
    en: 'Charts, tickers, trades, and OHLC candles are designed to come from picex internal executed trades and order book data.',
    tr: 'Grafikler, tickerlar, işlemler ve OHLC mumları picex’in dahili gerçekleşen işlemleri ve emir defteri verilerinden gelecek şekilde tasarlanır.',
    zh: '图表、行情、交易和 OHLC K 线设计为来自 picex 内部已执行交易和订单簿数据。',
    hi: 'चार्ट, टिकर, ट्रेड और OHLC कैंडल picex के आंतरिक निष्पादित ट्रेड और ऑर्डर बुक डेटा से आने के लिए डिज़ाइन किए गए हैं।',
    ar: 'تم تصميم المخططات والمؤشرات والصفقات وشموع OHLC لتأتي من صفقات picex الداخلية وبيانات دفتر الأوامر.',
  },

  picexArchAiTitle: {
    fa: 'لایه پشتیبانی هوش مصنوعی',
    en: 'AI Support Layer',
    tr: 'Yapay Zeka Destek Katmanı',
    zh: 'AI 支持层',
    hi: 'AI सहायता लेयर',
    ar: 'طبقة الدعم الذكي',
  },

  picexArchAiText: {
    fa: 'پشتیبانی هوش مصنوعی با استفاده از مستندات picex، قوانین کیف پول، جریان پرداخت، سیاست KYC و راهنمای رفع خطا به سوالات کاربران پاسخ می‌دهد.',
    en: 'AI support will answer user questions using picex documentation, wallet rules, payment flows, KYC policy, and troubleshooting guides.',
    tr: 'Yapay zeka desteği, picex dokümantasyonu, cüzdan kuralları, ödeme akışları, KYC politikası ve sorun giderme kılavuzlarını kullanarak kullanıcı sorularını yanıtlar.',
    zh: 'AI 支持将使用 picex 文档、钱包规则、支付流程、KYC 政策和故障排除指南回答用户问题。',
    hi: 'AI सहायता picex दस्तावेज़, वॉलेट नियम, भुगतान प्रवाह, KYC नीति और ट्रबलशूटिंग गाइड का उपयोग करके उपयोगकर्ता प्रश्नों का उत्तर देगी।',
    ar: 'سيجيب الدعم الذكي عن أسئلة المستخدمين باستخدام وثائق picex وقواعد المحفظة وتدفقات الدفع وسياسة KYC وأدلة استكشاف الأخطاء.',
  },

  picexArchRiskTitle: {
    fa: 'ریسک، KYC و کنترل انطباق',
    en: 'Risk, KYC & Compliance Controls',
    tr: 'Risk, KYC ve Uyumluluk Kontrolleri',
    zh: '风险、KYC 与合规控制',
    hi: 'जोखिम, KYC और अनुपालन नियंत्रण',
    ar: 'ضوابط المخاطر وKYC والامتثال',
  },

  picexArchRiskText: {
    fa: 'محدودیت حساب، بررسی برداشت‌ها، هشدار فعالیت مشکوک و کنترل‌های آینده مشتقات بخشی از چارچوب مدیریت ریسک هستند.',
    en: 'Account limits, withdrawal reviews, suspicious activity alerts, and future derivatives controls are part of the operational risk framework.',
    tr: 'Hesap limitleri, çekim incelemeleri, şüpheli etkinlik uyarıları ve gelecekteki türev kontrolleri operasyonel risk çerçevesinin parçasıdır.',
    zh: '账户限制、提现审查、可疑活动警报和未来衍生品控制是运营风险框架的一部分。',
    hi: 'खाता सीमाएँ, निकासी समीक्षा, संदिग्ध गतिविधि अलर्ट और भविष्य के डेरिवेटिव नियंत्रण संचालन जोखिम ढाँचे का हिस्सा हैं।',
    ar: 'حدود الحساب ومراجعات السحب وتنبيهات النشاط المشبوه وضوابط المشتقات المستقبلية جزء من إطار المخاطر التشغيلية.',
  },

  picexManifestoRoadmapTitle: {
    fa: 'نقشه راه فنی',
    en: 'Technical Roadmap',
    tr: 'Teknik Yol Haritası',
    zh: '技术路线图',
    hi: 'तकनीकी रोडमैप',
    ar: 'خارطة الطريق التقنية',
  },

  picexManifestoRoadmapIntro: {
    fa: 'پروژه باید مرحله‌ای رشد کند: ابتدا حفظ ورود Pi، Poll و پرداخت، سپس افزودن کیف پول، بازار اسپات، داده نمودار، AI و در نهایت فیوچرز پس از بلوغ کنترل ریسک.',
    en: 'The project should grow in controlled phases: preserve the working Pi login, poll, and payment flows first, then add wallet operations, spot markets, native chart data, AI support, and futures only after risk controls are mature.',
    tr: 'Proje kontrollü aşamalarla büyümelidir: önce çalışan Pi girişi, anket ve ödeme akışları korunur; ardından cüzdan operasyonları, spot piyasalar, yerel grafik verisi, yapay zeka desteği ve risk kontrolleri olgunlaştığında vadeli işlemler eklenir.',
    zh: '项目应按受控阶段发展：首先保留可用的 Pi 登录、投票和支付流程，然后添加钱包操作、现货市场、原生图表数据、AI 支持，并在风险控制成熟后再添加期货。',
    hi: 'परियोजना को नियंत्रित चरणों में बढ़ना चाहिए: पहले कार्यरत Pi लॉगिन, पोल और भुगतान प्रवाह को सुरक्षित रखें, फिर वॉलेट संचालन, स्पॉट मार्केट, नेटिव चार्ट डेटा, AI सहायता और जोखिम नियंत्रण परिपक्व होने के बाद ही फ्यूचर्स जोड़ें।',
    ar: 'يجب أن ينمو المشروع على مراحل محكومة: الحفاظ أولاً على تسجيل دخول Pi والتصويت وتدفقات الدفع العاملة، ثم إضافة عمليات المحفظة والأسواق الفورية وبيانات المخططات الأصلية والدعم الذكي، والعقود الآجلة فقط بعد نضج ضوابط المخاطر.',
  },

  picexDisclaimerTitle: {
    fa: 'یادداشت فنی مهم',
    en: 'Important technical disclaimer',
    tr: 'Önemli teknik sorumluluk reddi',
    zh: '重要技术免责声明',
    hi: 'महत्वपूर्ण तकनीकी अस्वीकरण',
    ar: 'إخلاء مسؤولية تقني مهم',
  },

  picexDisclaimerText: {
    fa: 'Pi SDK نباید به‌عنوان سیستم کامل کیف پول custodial در نظر گرفته شود. ورود، احراز هویت و پرداخت باید از دفترکل داخلی، پایش بلاکچین، کیف پول گرم، کیف پول سرد، تطبیق موجودی، KYC و کنترل برداشت جدا باشند.',
    en: 'Pi SDK should not be treated as a complete custodial wallet system. Login, authentication, and payment flows must be separated from internal ledger accounting, blockchain monitoring, hot wallet, cold wallet, reconciliation, KYC, and withdrawal controls.',
    tr: 'Pi SDK tam bir saklama cüzdan sistemi olarak görülmemelidir. Giriş, kimlik doğrulama ve ödeme akışları; dahili defter muhasebesi, blockchain izleme, sıcak cüzdan, soğuk cüzdan, mutabakat, KYC ve çekim kontrollerinden ayrılmalıdır.',
    zh: 'Pi SDK 不应被视为完整的托管钱包系统。登录、认证和支付流程必须与内部账本会计、区块链监控、热钱包、冷钱包、对账、KYC 和提现控制分离。',
    hi: 'Pi SDK को पूर्ण कस्टोडियल वॉलेट सिस्टम नहीं माना जाना चाहिए। लॉगिन, प्रमाणीकरण और भुगतान प्रवाह को आंतरिक लेजर अकाउंटिंग, ब्लॉकचेन मॉनिटरिंग, हॉट वॉलेट, कोल्ड वॉलेट, रिकंसिलिएशन, KYC और निकासी नियंत्रणों से अलग रखना चाहिए।',
    ar: 'لا ينبغي اعتبار Pi SDK نظام محفظة حفظ كامل. يجب فصل تسجيل الدخول والمصادقة وتدفقات الدفع عن محاسبة دفتر الأستاذ الداخلي ومراقبة البلوكشين والمحفظة الساخنة والباردة والمطابقة وKYC وضوابط السحب.',
  },
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  supportedLanguages: Language[];
  languageLabels: Record<Language, string>;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const isSupportedLanguage = (value: string | null): value is Language => {
  return Boolean(value && supportedLanguages.includes(value as Language));
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Language>('fa');

  useEffect(() => {
    const savedPicexLang = localStorage.getItem('picex_lang');
    const savedLegacyLang = localStorage.getItem('pidao_lang');

    if (isSupportedLanguage(savedPicexLang)) {
      setLangState(savedPicexLang);
      return;
    }

    if (isSupportedLanguage(savedLegacyLang)) {
      setLangState(savedLegacyLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;

    document.documentElement.dir =
      lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('picex_lang', newLang);
  };

  const t = (key: string) => {
    return translations[key]?.[lang] || translations[key]?.en || key;
  };

  return (
    <I18nContext.Provider
      value={{
        lang,
        setLang,
        t,
        supportedLanguages,
        languageLabels,
      }}
    >
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
