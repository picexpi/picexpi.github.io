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
  appTitle: {
    fa: 'Pi DAO',
    en: 'Pi DAO',
    tr: 'Pi DAO',
    zh: 'Pi DAO',
    hi: 'Pi DAO',
    ar: 'Pi DAO',
  },

  brandName: {
    fa: 'PiDao',
    en: 'PiDao',
    tr: 'PiDao',
    zh: 'PiDao',
    hi: 'PiDao',
    ar: 'PiDao',
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

  navDig: {
    fa: 'معرفی DIG',
    en: 'DIG',
    tr: 'DIG',
    zh: 'DIG',
    hi: 'DIG',
    ar: 'DIG',
  },

  features: {
    fa: 'ویژگی‌ها',
    en: 'Features',
    tr: 'Özellikler',
    zh: '功能',
    hi: 'विशेषताएँ',
    ar: 'الميزات',
  },

  navRoadmap: {
    fa: 'مسیر راه',
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
    fa: 'درباره ما',
    en: 'About Us',
    tr: 'Hakkımızda',
    zh: '关于我们',
    hi: 'हमारे बारे में',
    ar: 'من نحن',
  },

  shop: {
    fa: 'فروشگاه',
    en: 'Shop',
    tr: 'Mağaza',
    zh: '商店',
    hi: 'दुकान',
    ar: 'المتجر',
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
    fa: 'ورود با Pi و مشارکت',
    en: 'Join with Pi',
    tr: 'Pi ile Katıl',
    zh: '使用 Pi 参与',
    hi: 'Pi के साथ जुड़ें',
    ar: 'شارك باستخدام Pi',
  },

  welcome: {
    fa: 'خوش آمدی',
    en: 'Welcome',
    tr: 'Hoş geldin',
    zh: '欢迎',
    hi: 'स्वागत है',
    ar: 'مرحباً',
  },

  signInTitle: {
    fa: 'ورود به Pi DAO',
    en: 'Pi DAO Login',
    tr: 'Pi DAO Giriş',
    zh: 'Pi DAO 登录',
    hi: 'Pi DAO लॉगिन',
    ar: 'تسجيل الدخول إلى Pi DAO',
  },

  signInDescription: {
    fa: 'با حساب Pi Network خود وارد شوید.',
    en: 'Sign in with your Pi Network account.',
    tr: 'Pi Network hesabınızla giriş yapın.',
    zh: '使用您的 Pi Network 账户登录。',
    hi: 'अपने Pi Network खाते से साइन इन करें।',
    ar: 'سجّل الدخول باستخدام حساب Pi Network الخاص بك.',
  },

  piLoginTitle: {
    fa: 'ورود به پلتفرم با حساب Pi',
    en: 'Sign in with your Pi account',
    tr: 'Pi hesabınızla giriş yapın',
    zh: '使用您的 Pi 账户登录',
    hi: 'अपने Pi खाते से साइन इन करें',
    ar: 'سجّل الدخول باستخدام حساب Pi الخاص بك',
  },

  piLoginDescription: {
    fa: 'برای تعامل با برنامه، ابتدا با مرورگر Pi وارد شوید.',
    en: 'To interact with the app, please sign in using Pi Browser.',
    tr: 'Uygulamayla etkileşim için Pi Browser ile giriş yapın.',
    zh: '要与应用交互，请使用 Pi Browser 登录。',
    hi: 'ऐप से इंटरैक्ट करने के लिए कृपया Pi Browser से साइन इन करें।',
    ar: 'للتفاعل مع التطبيق، يرجى تسجيل الدخول باستخدام متصفح Pi.',
  },

  initializingPiSdk: {
    fa: 'در حال راه‌اندازی Pi SDK...',
    en: 'Initializing Pi SDK...',
    tr: 'Pi SDK başlatılıyor...',
    zh: '正在初始化 Pi SDK...',
    hi: 'Pi SDK प्रारंभ हो रहा है...',
    ar: 'جارٍ تهيئة Pi SDK...',
  },

  piSdkNotFound: {
    fa: 'Pi SDK پیدا نشد. لطفاً سایت را داخل Pi Browser باز کنید.',
    en: 'Pi SDK not found. Please open this website inside Pi Browser.',
    tr: 'Pi SDK bulunamadı. Lütfen siteyi Pi Browser içinde açın.',
    zh: '未找到 Pi SDK。请在 Pi Browser 中打开此网站。',
    hi: 'Pi SDK नहीं मिला। कृपया इस वेबसाइट को Pi Browser में खोलें।',
    ar: 'لم يتم العثور على Pi SDK. يرجى فتح هذا الموقع داخل متصفح Pi.',
  },

  piSdkReady: {
    fa: 'Pi SDK آماده است.',
    en: 'Pi SDK is ready.',
    tr: 'Pi SDK hazır.',
    zh: 'Pi SDK 已准备就绪。',
    hi: 'Pi SDK तैयार है।',
    ar: 'Pi SDK جاهز.',
  },

  piSdkReadyLogin: {
    fa: 'Pi SDK آماده است. می‌توانید با Pi وارد شوید.',
    en: 'Pi SDK is ready. You can login with Pi.',
    tr: 'Pi SDK hazır. Pi ile giriş yapabilirsiniz.',
    zh: 'Pi SDK 已准备就绪。您可以使用 Pi 登录。',
    hi: 'Pi SDK तैयार है। आप Pi से लॉगिन कर सकते हैं।',
    ar: 'Pi SDK جاهز. يمكنك تسجيل الدخول باستخدام Pi.',
  },

  authenticating: {
    fa: 'در حال احراز هویت با Pi...',
    en: 'Authenticating with Pi...',
    tr: 'Pi ile kimlik doğrulanıyor...',
    zh: '正在使用 Pi 认证...',
    hi: 'Pi से प्रमाणीकरण हो रहा है...',
    ar: 'جارٍ المصادقة باستخدام Pi...',
  },

  loginSuccess: {
    fa: 'ورود موفق بود.',
    en: 'Login successful.',
    tr: 'Giriş başarılı.',
    zh: '登录成功。',
    hi: 'लॉगिन सफल रहा।',
    ar: 'تم تسجيل الدخول بنجاح.',
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
    fa: 'لطفاً برای احراز هویت از Pi Browser استفاده کنید.',
    en: 'Please use Pi Browser for authentication.',
    tr: 'Kimlik doğrulama için lütfen Pi Browser kullanın.',
    zh: '请使用 Pi Browser 进行认证。',
    hi: 'प्रमाणीकरण के लिए कृपया Pi Browser का उपयोग करें।',
    ar: 'يرجى استخدام متصفح Pi للمصادقة.',
  },

  incompletePaymentFound: {
    fa: 'یک پرداخت نیمه‌تمام پیدا شد. لطفاً آن را در کیف پول Pi تکمیل یا لغو کنید.',
    en: 'Incomplete payment found. Please complete or cancel it in Pi Wallet.',
    tr: 'Tamamlanmamış ödeme bulundu. Lütfen Pi Wallet içinde tamamlayın veya iptal edin.',
    zh: '发现未完成的付款。请在 Pi Wallet 中完成或取消。',
    hi: 'अधूरा भुगतान मिला। कृपया इसे Pi Wallet में पूरा या रद्द करें।',
    ar: 'تم العثور على دفعة غير مكتملة. يرجى إكمالها أو إلغاؤها في محفظة Pi.',
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
  // DIG / Hero
  // -------------------------

  digShortName: {
    fa: 'DIG',
    en: 'DIG',
    tr: 'DIG',
    zh: 'DIG',
    hi: 'DIG',
    ar: 'DIG',
  },

  digFullName: {
    fa: 'دولت بین‌المللی غیرمتمرکز',
    en: 'Decentralized International Government',
    tr: 'Merkeziyetsiz Uluslararası Hükümet',
    zh: '去中心化国际政府',
    hi: 'विकेंद्रीकृत अंतरराष्ट्रीय सरकार',
    ar: 'الحكومة الدولية اللامركزية',
  },

  digHeroTitle: {
    fa: 'تصمیم‌گیری جهانی را غیرمتمرکز کنیم',
    en: 'Decentralizing Global Decision-Making',
    tr: 'Küresel Karar Almayı Merkeziyetsizleştirelim',
    zh: '让全球决策走向去中心化',
    hi: 'वैश्विक निर्णय प्रक्रिया को विकेंद्रीकृत करें',
    ar: 'نحو لامركزية صناعة القرار العالمي',
  },

  digHeroDescription: {
    fa: 'PiDao گامی اولیه برای ساخت زیرساختی شفاف، مردمی و غیرمتمرکز است؛ جایی که آینده تصمیم‌گیری جهانی می‌تواند با رأی مستقیم مردم شکل بگیرد.',
    en: 'PiDao is an early step toward building a transparent, people-powered, decentralized infrastructure where the future of global decision-making can be shaped by direct public participation.',
    tr: 'PiDao, küresel karar alma süreçlerinin doğrudan halk katılımıyla şekillenebileceği şeffaf, topluluk odaklı ve merkeziyetsiz bir altyapı oluşturma yolunda ilk adımdır.',
    zh: 'PiDao 是构建透明、由人民驱动、去中心化基础设施的早期一步，让全球决策的未来能够由公众直接参与塑造。',
    hi: 'PiDao एक पारदर्शी, जन-संचालित और विकेंद्रीकृत आधारभूत संरचना बनाने की शुरुआती पहल है, जहाँ वैश्विक निर्णयों का भविष्य जनता की सीधी भागीदारी से आकार ले सकता है।',
    ar: 'PiDao خطوة أولية لبناء بنية تحتية شفافة ولامركزية يقودها الناس، حيث يمكن أن يتشكل مستقبل القرار العالمي عبر المشاركة المباشرة للجمهور.',
  },

  exploreDig: {
    fa: 'آشنایی با DIG',
    en: 'Explore DIG',
    tr: 'DIG’i Keşfet',
    zh: '了解 DIG',
    hi: 'DIG को जानें',
    ar: 'استكشف DIG',
  },

  // -------------------------
  // About
  // -------------------------

  aboutDigKicker: {
    fa: 'PiDao + DIG',
    en: 'PiDao + DIG',
    tr: 'PiDao + DIG',
    zh: 'PiDao + DIG',
    hi: 'PiDao + DIG',
    ar: 'PiDao + DIG',
  },

  aboutDigSubtitle: {
    fa: 'درباره چشم‌انداز ما',
    en: 'About Our Vision',
    tr: 'Vizyonumuz Hakkında',
    zh: '关于我们的愿景',
    hi: 'हमारे दृष्टिकोण के बारे में',
    ar: 'حول رؤيتنا',
  },

  aboutDigTitleBefore: {
    fa: 'از جامعه Pi تا',
    en: 'From the Pi community to',
    tr: 'Pi topluluğundan',
    zh: '从 Pi 社区走向',
    hi: 'Pi समुदाय से',
    ar: 'من مجتمع Pi إلى',
  },

  aboutDigTitleHighlight: {
    fa: 'تصمیم‌گیری جهانی غیرمتمرکز',
    en: 'Decentralized Global Decision-Making',
    tr: 'Merkeziyetsiz Küresel Karar Almaya',
    zh: '去中心化全球决策',
    hi: 'विकेंद्रीकृत वैश्विक निर्णय प्रक्रिया',
    ar: 'صناعة قرار عالمية لامركزية',
  },

  aboutDigText: {
    fa: 'PiDao یک زیرساخت اولیه برای مشارکت، رأی‌گیری، پرداخت‌های Pi و ساخت جامعه‌ای است که می‌تواند به‌تدریج به سمت چشم‌انداز DIG حرکت کند؛ مدلی که در آن مردم نقش مستقیم‌تری در تصمیم‌گیری‌های مهم خواهند داشت.',
    en: 'PiDao is an early infrastructure for participation, voting, Pi payments, and building a community that can gradually move toward the DIG vision: a model where people can play a more direct role in important decisions.',
    tr: 'PiDao; katılım, oylama, Pi ödemeleri ve zamanla DIG vizyonuna ilerleyebilecek bir topluluk oluşturmak için erken bir altyapıdır. Bu modelde insanlar önemli kararlarda daha doğrudan rol alabilir.',
  },

  aboutDigTextSecondary: {
    fa: 'هدف فعلی ما ساخت ابزارهای آزمایشی، سنجش مشارکت جامعه و ایجاد مسیر تدریجی برای حاکمیت شفاف، مردمی و غیرمتمرکز است.',
    en: 'Our current goal is to build experimental tools, measure community participation, and create a gradual path toward transparent, people-powered, decentralized governance.',
    tr: 'Mevcut hedefimiz; deneysel araçlar oluşturmak, topluluk katılımını ölçmek ve şeffaf, halk odaklı, merkeziyetsiz yönetişime doğru kademeli bir yol oluşturmaktır.',
  },

  statGlobalGovernance: {
    fa: 'حاکمیت جهانی',
    en: 'Global Governance',
    tr: 'Küresel Yönetişim',
    zh: '全球治理',
    hi: 'वैश्विक शासन',
    ar: 'الحوكمة العالمية',
  },

  statPiIdentity: {
    fa: 'هویت و مشارکت',
    en: 'Identity & Participation',
    tr: 'Kimlik ve Katılım',
    zh: '身份与参与',
    hi: 'पहचान और भागीदारी',
    ar: 'الهوية والمشاركة',
  },

  statPeopleVoting: {
    fa: 'رأی مستقیم مردم',
    en: 'Direct Public Voting',
    tr: 'Doğrudan Halk Oylaması',
    zh: '公众直接投票',
    hi: 'जनता का प्रत्यक्ष मतदान',
    ar: 'تصويت مباشر من الناس',
  },

  digMissionTitle: {
    fa: 'مأموریت DIG',
    en: 'DIG Mission',
    tr: 'DIG Misyonu',
    zh: 'DIG 使命',
    hi: 'DIG मिशन',
    ar: 'مهمة DIG',
  },

  digMissionText: {
    fa: 'هدف DIG ایجاد بستری شفاف، ضدتقلب و جهانی برای رأی‌گیری، قانون‌گذاری مردمی، حل اختلافات و در آینده بررسی سیستم مالی غیرمتمرکز بین‌المللی است.',
    en: 'DIG aims to create a transparent, tamper-resistant, global platform for voting, people-driven legislation, conflict resolution, and later exploring an international decentralized financial system.',
    tr: 'DIG; oylama, halk odaklı yasa yapımı, uyuşmazlık çözümü ve ileride uluslararası merkeziyetsiz bir finansal sistemi araştırmak için şeffaf, müdahaleye dayanıklı ve küresel bir platform oluşturmayı amaçlar.',
  },

  digPointVoting: {
    fa: 'رأی‌گیری شفاف و مشارکت مستقیم مردم',
    en: 'Transparent voting and direct public participation',
    tr: 'Şeffaf oylama ve doğrudan halk katılımı',
    zh: '透明投票与公众直接参与',
    hi: 'पारदर्शी मतदान और जनता की सीधी भागीदारी',
    ar: 'تصويت شفاف ومشاركة مباشرة من الناس',
  },

  digPointTransparency: {
    fa: 'فرآیندهای قابل بررسی و مقاوم در برابر دستکاری',
    en: 'Verifiable and tamper-resistant processes',
    tr: 'Doğrulanabilir ve müdahaleye dayanıklı süreçler',
    zh: '可验证且抗篡改的流程',
    hi: 'सत्यापनीय और छेड़छाड़-रोधी प्रक्रियाएँ',
    ar: 'عمليات قابلة للتحقق ومقاومة للتلاعب',
  },

  digPointUnity: {
    fa: 'حرکت تدریجی به سمت اتحاد و تصمیم‌گیری جهانی',
    en: 'A gradual move toward unity and global decision-making',
    tr: 'Birlik ve küresel karar almaya doğru kademeli ilerleme',
    zh: '逐步走向团结与全球决策',
    hi: 'एकता और वैश्विक निर्णय की ओर क्रमिक बढ़त',
    ar: 'تحرك تدريجي نحو الوحدة وصناعة القرار العالمي',
  },

  digVisionBadge: {
    fa: 'مسیر آینده',
    en: 'Future Path',
    tr: 'Gelecek Yolu',
    zh: '未来路径',
    hi: 'भविष्य का मार्ग',
    ar: 'مسار المستقبل',
  },

  // -------------------------
  // Features
  // -------------------------

  digFeaturesSectionTitle: {
    fa: 'زیرساخت‌های اصلی DIG',
    en: 'Core DIG Infrastructure',
    tr: 'DIG Temel Altyapısı',
    zh: 'DIG 核心基础设施',
    hi: 'DIG की मुख्य आधारभूत संरचना',
    ar: 'البنية الأساسية لـ DIG',
  },

  digFeaturesSectionIntro: {
    fa: 'DIG فقط یک ایده سیاسی نیست؛ یک مسیر فنی، اجتماعی و اقتصادی برای ساخت تصمیم‌گیری شفاف، مشارکتی و جهانی است.',
    en: 'DIG is not only a political idea; it is a technical, social, and economic path toward transparent, participatory, and global decision-making.',
    tr: 'DIG yalnızca politik bir fikir değildir; şeffaf, katılımcı ve küresel karar alma için teknik, sosyal ve ekonomik bir yoldur.',
  },

  featureGlobalVotingTitle: {
    fa: 'رأی‌گیری جهانی',
    en: 'Global Voting',
    tr: 'Küresel Oylama',
    zh: '全球投票',
    hi: 'वैश्विक मतदान',
    ar: 'التصويت العالمي',
  },

  featureGlobalVotingDescription: {
    fa: 'ایجاد سازوکاری برای مشارکت مستقیم مردم در موضوعات مهم جهانی، بدون وابستگی کامل به ساختارهای متمرکز.',
    en: 'Creating a mechanism for direct public participation in important global issues without full dependence on centralized structures.',
    tr: 'Merkezi yapılara tamamen bağımlı olmadan önemli küresel konularda doğrudan halk katılımı için bir mekanizma oluşturmak.',
  },

  featureTransparentGovernanceTitle: {
    fa: 'حاکمیت شفاف',
    en: 'Transparent Governance',
    tr: 'Şeffaf Yönetişim',
    zh: '透明治理',
    hi: 'पारदर्शी शासन',
    ar: 'حوكمة شفافة',
  },

  featureTransparentGovernanceDescription: {
    fa: 'تصمیم‌ها، رأی‌ها و نتایج باید تا حد امکان قابل بررسی، شفاف و مقاوم در برابر دستکاری باشند.',
    en: 'Decisions, votes, and results should be as verifiable, transparent, and tamper-resistant as possible.',
    tr: 'Kararlar, oylar ve sonuçlar mümkün olduğunca doğrulanabilir, şeffaf ve müdahaleye dayanıklı olmalıdır.',
  },

  featurePiIdentityTitle: {
    fa: 'هویت و مشارکت با Pi',
    en: 'Pi Identity & Participation',
    tr: 'Pi Kimliği ve Katılım',
    zh: 'Pi 身份与参与',
    hi: 'Pi पहचान और भागीदारी',
    ar: 'هوية Pi والمشاركة',
  },

  featurePiIdentityDescription: {
    fa: 'Pi Network می‌تواند نقطه شروعی برای ورود کاربران، کاهش رأی‌های تکراری و ایجاد جامعه اولیه مشارکت‌کنندگان باشد.',
    en: 'Pi Network can be a starting point for user entry, reducing duplicate votes, and forming an early community of participants.',
    tr: 'Pi Network; kullanıcı girişi, tekrar oyların azaltılması ve ilk katılımcı topluluğunun oluşması için bir başlangıç noktası olabilir.',
  },

  featureDaoInfrastructureTitle: {
    fa: 'زیرساخت DAO',
    en: 'DAO Infrastructure',
    tr: 'DAO Altyapısı',
    zh: 'DAO 基础设施',
    hi: 'DAO आधारभूत संरचना',
    ar: 'بنية DAO الأساسية',
  },

  featureDaoInfrastructureDescription: {
    fa: 'ساختار DAO می‌تواند پایه‌ای برای پیشنهادها، رأی‌گیری‌ها، تصمیم‌سازی جمعی و توسعه تدریجی حاکمیت غیرمتمرکز باشد.',
    en: 'DAO structure can become a foundation for proposals, voting, collective decision-making, and the gradual development of decentralized governance.',
    tr: 'DAO yapısı; öneriler, oylamalar, kolektif karar alma ve merkeziyetsiz yönetişimin kademeli gelişimi için temel olabilir.',
  },

  featureDigitalEconomyTitle: {
    fa: 'اقتصاد دیجیتال',
    en: 'Digital Economy',
    tr: 'Dijital Ekonomi',
    zh: '数字经济',
    hi: 'डिजिटल अर्थव्यवस्था',
    ar: 'الاقتصاد الرقمي',
  },

  featureDigitalEconomyDescription: {
    fa: 'فروشگاه، پرداخت‌های Pi و خدمات دیجیتال می‌توانند پایه‌های اولیه یک اقتصاد مردمی و غیرمتمرکز را شکل دهند.',
    en: 'The marketplace, Pi payments, and digital services can form the early foundations of a people-powered decentralized economy.',
    tr: 'Pazar yeri, Pi ödemeleri ve dijital hizmetler, topluluk odaklı merkeziyetsiz bir ekonominin ilk temellerini oluşturabilir.',
  },

  featureConflictResolutionTitle: {
    fa: 'حل اختلاف با رأی مردم',
    en: 'People-Driven Conflict Resolution',
    tr: 'Halk Odaklı Uyuşmazlık Çözümü',
    zh: '由人民驱动的争端解决',
    hi: 'जन-आधारित विवाद समाधान',
    ar: 'حل النزاعات بمشاركة الناس',
  },

  featureConflictResolutionDescription: {
    fa: 'در چشم‌انداز DIG، اختلافات بزرگ می‌توانند به‌تدریج با سازوکارهای شفاف، چندمرحله‌ای و مبتنی بر رأی عمومی بررسی شوند.',
    en: 'In the DIG vision, major disputes can gradually be examined through transparent, multi-step mechanisms based on public voting.',
    tr: 'DIG vizyonunda büyük anlaşmazlıklar, kamu oylamasına dayalı şeffaf ve çok aşamalı mekanizmalarla kademeli olarak değerlendirilebilir.',
  },

  // -------------------------
  // Roadmap
  // -------------------------

  roadmapTitle: {
    fa: 'مسیر راه DIG',
    en: 'DIG Roadmap',
    tr: 'DIG Yol Haritası',
    zh: 'DIG 路线图',
    hi: 'DIG रोडमैप',
    ar: 'خارطة طريق DIG',
  },

  roadmapIntro: {
    fa: 'DIG یک تغییر یک‌مرحله‌ای نیست؛ مسیری تدریجی برای ساخت اعتماد، مشارکت، رأی‌گیری، حاکمیت و اقتصاد غیرمتمرکز جهانی است.',
    en: 'DIG is not a one-step change; it is a gradual path toward building trust, participation, voting, governance, and a decentralized global economy.',
    tr: 'DIG tek aşamalı bir değişim değildir; güven, katılım, oylama, yönetişim ve merkeziyetsiz küresel ekonomi inşa etmeye yönelik kademeli bir yoldur.',
  },

  roadmapStep1Title: {
    fa: 'جامعه اولیه PiDao',
    en: 'Early PiDao Community',
    tr: 'İlk PiDao Topluluğu',
    zh: '早期 PiDao 社区',
    hi: 'प्रारंभिक PiDao समुदाय',
    ar: 'مجتمع PiDao الأولي',
  },

  roadmapStep1Description: {
    fa: 'شروع پروژه با ایجاد جامعه‌ای از کاربران Pi، علاقه‌مندان به DAO و افرادی که به تصمیم‌گیری شفاف و مردمی باور دارند.',
    en: 'Starting the project by building a community of Pi users, DAO supporters, and people who believe in transparent, people-driven decision-making.',
    tr: 'Projeye Pi kullanıcıları, DAO destekçileri ve şeffaf, halk odaklı karar almaya inanan kişilerden oluşan bir toplulukla başlamak.',
  },

  roadmapStep2Title: {
    fa: 'رأی‌گیری‌های آزمایشی',
    en: 'Experimental Voting',
    tr: 'Deneysel Oylamalar',
    zh: '实验性投票',
    hi: 'प्रायोगिक मतदान',
    ar: 'تصويت تجريبي',
  },

  roadmapStep2Description: {
    fa: 'اجرای رأی‌گیری‌های ساده برای سنجش مشارکت، رفتار جامعه و آمادگی کاربران برای تصمیم‌گیری غیرمتمرکز.',
    en: 'Running simple voting experiments to measure participation, community behavior, and user readiness for decentralized decision-making.',
    tr: 'Katılımı, topluluk davranışını ve kullanıcıların merkeziyetsiz karar almaya hazır olup olmadığını ölçmek için basit oylamalar yürütmek.',
  },

  roadmapStep3Title: {
    fa: 'احراز هویت با Pi',
    en: 'Pi Authentication',
    tr: 'Pi Kimlik Doğrulaması',
    zh: 'Pi 身份认证',
    hi: 'Pi प्रमाणीकरण',
    ar: 'مصادقة Pi',
  },

  roadmapStep3Description: {
    fa: 'استفاده از Pi SDK برای ورود کاربران، کاهش رأی‌های تکراری و ایجاد پایه‌ای اولیه برای مشارکت معتبرتر.',
    en: 'Using the Pi SDK for user login, reducing duplicate votes, and creating an early foundation for more trusted participation.',
    tr: 'Kullanıcı girişi, tekrar oyların azaltılması ve daha güvenilir katılım için Pi SDK kullanmak.',
  },

  roadmapStep4Title: {
    fa: 'زیرساخت DAO',
    en: 'DAO Infrastructure',
    tr: 'DAO Altyapısı',
    zh: 'DAO 基础设施',
    hi: 'DAO आधारभूत संरचना',
    ar: 'بنية DAO الأساسية',
  },

  roadmapStep4Description: {
    fa: 'توسعه تدریجی ساختار پیشنهادها، رأی‌گیری‌ها، سوابق تصمیم‌گیری و مشارکت جامعه در مدیریت پروژه.',
    en: 'Gradually developing proposals, voting flows, decision records, and community participation in project governance.',
    tr: 'Öneriler, oylama süreçleri, karar kayıtları ve proje yönetişiminde topluluk katılımını kademeli olarak geliştirmek.',
  },

  roadmapStep5Title: {
    fa: 'حرکت به سمت DIG',
    en: 'Moving Toward DIG',
    tr: 'DIG’e Doğru İlerleme',
    zh: '迈向 DIG',
    hi: 'DIG की ओर बढ़ना',
    ar: 'التحرك نحو DIG',
  },

  roadmapStep5Description: {
    fa: 'گسترش مفهوم از یک جامعه دیجیتال به مدلی برای بررسی موضوعات بزرگ‌تر و تصمیم‌گیری‌های جهانی با مشارکت مستقیم مردم.',
    en: 'Expanding the concept from a digital community into a model for examining larger issues and global decisions through direct public participation.',
    tr: 'Kavramı dijital bir topluluktan, daha büyük konuların ve küresel kararların doğrudan halk katılımıyla ele alındığı bir modele genişletmek.',
  },

  roadmapStep6Title: {
    fa: 'بررسی DIB',
    en: 'Exploring DIB',
    tr: 'DIB Araştırması',
    zh: '探索 DIB',
    hi: 'DIB की खोज',
    ar: 'استكشاف DIB',
  },

  roadmapStep6Description: {
    fa: 'در مراحل بعدی، بررسی امکان ایجاد بانک یا سیستم مالی بین‌المللی غیرمتمرکز به عنوان مکمل اقتصادی DIG.',
    en: 'In later phases, exploring the possibility of an international decentralized bank or financial system as the economic complement to DIG.',
    tr: 'Sonraki aşamalarda DIG’in ekonomik tamamlayıcısı olarak uluslararası merkeziyetsiz bir banka veya finansal sistem olasılığını araştırmak.',
  },

  // -------------------------
  // Poll
  // -------------------------

  pollQuestion: {
    fa: 'آیا موافقید بخشی از تصمیم‌گیری‌های مهم جهانی به‌تدریج با رأی مستقیم مردم انجام شود؟',
    en: 'Do you support gradually moving part of major global decision-making toward direct public voting?',
    tr: 'Önemli küresel kararların bir bölümünün kademeli olarak doğrudan halk oylamasına taşınmasını destekliyor musunuz?',
    zh: '您是否支持逐步将部分重大全球决策转向公众直接投票？',
    hi: 'क्या आप प्रमुख वैश्विक निर्णयों के एक हिस्से को धीरे-धीरे जनता के प्रत्यक्ष मतदान की ओर ले जाने का समर्थन करते हैं?',
    ar: 'هل تؤيد نقل جزء من القرارات العالمية المهمة تدريجياً نحو التصويت المباشر من الناس؟',
  },

  pollDescription: {
    fa: 'این رأی‌گیری یک نمونه اولیه برای سنجش مشارکت جامعه در تصمیم‌گیری‌های غیرمتمرکز جهانی است. هر کاربر واردشده با Pi فقط یک رأی می‌تواند ثبت کند.',
    en: 'This poll is an early prototype for measuring community participation in decentralized global decision-making. Each Pi-authenticated user can submit only one vote.',
    tr: 'Bu anket, merkeziyetsiz küresel karar alma süreçlerinde topluluk katılımını ölçmek için erken bir prototiptir. Pi ile doğrulanan her kullanıcı yalnızca bir oy kullanabilir.',
    zh: '这是一个用于衡量社区参与去中心化全球决策的早期原型。每个通过 Pi 认证的用户只能投一票。',
    hi: 'यह विकेंद्रीकृत वैश्विक निर्णय प्रक्रिया में समुदाय की भागीदारी मापने का एक प्रारंभिक प्रोटोटाइप है। प्रत्येक Pi-प्रमाणित उपयोगकर्ता केवल एक वोट दे सकता है।',
    ar: 'هذا التصويت نموذج أولي لقياس مشاركة المجتمع في صناعة القرار العالمي اللامركزي. يمكن لكل مستخدم موثق عبر Pi تسجيل صوت واحد فقط.',
  },

  pollYes: {
    fa: 'بله، از تصمیم‌گیری مردمی حمایت می‌کنم',
    en: 'Yes, I support people-driven decision-making',
    tr: 'Evet, halk odaklı karar almayı destekliyorum',
    zh: '是的，我支持由人民驱动的决策',
    hi: 'हाँ, मैं जन-आधारित निर्णय प्रक्रिया का समर्थन करता हूँ',
    ar: 'نعم، أؤيد صناعة القرار بمشاركة الناس',
  },

  pollNo: {
    fa: 'خیر، فعلاً مدل متمرکز بهتر است',
    en: 'No, the centralized model is better for now',
    tr: 'Hayır, şimdilik merkezi model daha iyi',
    zh: '不，目前中心化模式更合适',
    hi: 'नहीं, फिलहाल केंद्रीकृत मॉडल बेहतर है',
    ar: 'لا، النموذج المركزي أفضل حالياً',
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
    fa: 'در حال دریافت نتایج رأی‌گیری...',
    en: 'Loading poll results...',
    tr: 'Anket sonuçları yükleniyor...',
    zh: '正在加载投票结果...',
    hi: 'मतदान परिणाम लोड हो रहे हैं...',
    ar: 'جارٍ تحميل نتائج التصويت...',
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
  // DIG Page / Manifesto
  // -------------------------

  digPageTitle: {
    fa: 'مانیفست دولت بین‌المللی غیرمتمرکز',
    en: 'Decentralized International Government Manifesto',
    tr: 'Merkeziyetsiz Uluslararası Hükümet Manifestosu',
    zh: '去中心化国际政府宣言',
    hi: 'विकेंद्रीकृत अंतरराष्ट्रीय सरकार घोषणापत्र',
    ar: 'بيان الحكومة الدولية اللامركزية',
  },

  digPageLead: {
    fa: 'DIG چشم‌اندازی برای آینده‌ای است که در آن بخشی از تصمیم‌گیری‌های بزرگ جهانی می‌تواند شفاف‌تر، مردمی‌تر و با مشارکت مستقیم انسان‌ها انجام شود.',
    en: 'DIG is a vision for a future where part of major global decision-making can become more transparent, people-powered, and directly participatory.',
    tr: 'DIG, büyük küresel kararların bir bölümünün daha şeffaf, halk odaklı ve doğrudan katılımcı hale gelebileceği bir gelecek vizyonudur.',
  },

  digWhatTitle: {
    fa: 'DIG چیست؟',
    en: 'What is DIG?',
    tr: 'DIG Nedir?',
    zh: '什么是 DIG？',
    hi: 'DIG क्या है?',
    ar: 'ما هو DIG؟',
  },

  digWhatText: {
    fa: 'DIG یا دولت بین‌المللی غیرمتمرکز، یک مدل پیشنهادی برای تصمیم‌گیری جهانی است؛ مدلی که تلاش می‌کند به‌تدریج نقش مردم را در رأی‌گیری، قانون‌گذاری، حل اختلافات و مدیریت مسائل جهانی پررنگ‌تر کند.',
    en: 'DIG, or Decentralized International Government, is a proposed model for global decision-making that aims to gradually increase the role of people in voting, legislation, conflict resolution, and global issue management.',
    tr: 'DIG yani Merkeziyetsiz Uluslararası Hükümet, halkın oylama, yasa yapımı, uyuşmazlık çözümü ve küresel sorunların yönetimindeki rolünü kademeli olarak artırmayı amaçlayan önerilen bir karar alma modelidir.',
  },

  digVotingTitle: {
    fa: 'رأی مستقیم مردم',
    en: 'Direct Public Voting',
    tr: 'Doğrudan Halk Oylaması',
    zh: '公众直接投票',
    hi: 'जनता का प्रत्यक्ष मतदान',
    ar: 'تصويت مباشر من الناس',
  },

  digVotingText: {
    fa: 'در چشم‌انداز DIG، رأی‌گیری‌های شفاف و ضدتقلب می‌توانند به ابزاری برای سنجش اراده عمومی در موضوعات مهم تبدیل شوند.',
    en: 'In the DIG vision, transparent and tamper-resistant voting can become a tool for measuring public will on important issues.',
    tr: 'DIG vizyonunda şeffaf ve müdahaleye dayanıklı oylamalar, önemli konularda halk iradesini ölçmek için bir araç olabilir.',
  },

  digTransparencyTitle: {
    fa: 'شفافیت و اعتماد',
    en: 'Transparency & Trust',
    tr: 'Şeffaflık ve Güven',
    zh: '透明与信任',
    hi: 'पारदर्शिता और विश्वास',
    ar: 'الشفافية والثقة',
  },

  digTransparencyText: {
    fa: 'تصمیم‌گیری غیرمتمرکز بدون شفافیت ممکن نیست. هدف، ساخت سازوکارهایی است که رأی‌ها، نتایج و فرآیندها تا حد امکان قابل بررسی باشند.',
    en: 'Decentralized decision-making is impossible without transparency. The goal is to build mechanisms where votes, results, and processes are as verifiable as possible.',
    tr: 'Şeffaflık olmadan merkeziyetsiz karar alma mümkün değildir. Amaç; oyların, sonuçların ve süreçlerin mümkün olduğunca doğrulanabilir olduğu mekanizmalar oluşturmaktır.',
  },

  digPiRoleTitle: {
    fa: 'نقش Pi Network',
    en: 'Role of Pi Network',
    tr: 'Pi Network’ün Rolü',
    zh: 'Pi Network 的角色',
    hi: 'Pi Network की भूमिका',
    ar: 'دور Pi Network',
  },

  digPiRoleText: {
    fa: 'Pi می‌تواند نقطه شروعی برای ورود کاربران، مشارکت اولیه، پرداخت‌ها و کاهش رأی‌های تکراری باشد؛ نه پایان مسیر، بلکه آغاز جامعه DIG.',
    en: 'Pi can be a starting point for user entry, early participation, payments, and reducing duplicate votes—not the final destination, but the beginning of the DIG community.',
    tr: 'Pi; kullanıcı girişi, erken katılım, ödemeler ve tekrar oyların azaltılması için bir başlangıç noktası olabilir; son hedef değil, DIG topluluğunun başlangıcıdır.',
  },

  digConflictTitle: {
    fa: 'حل اختلافات جهانی',
    en: 'Global Conflict Resolution',
    tr: 'Küresel Uyuşmazlık Çözümü',
    zh: '全球冲突解决',
    hi: 'वैश्विक विवाद समाधान',
    ar: 'حل النزاعات العالمية',
  },

  digConflictText: {
    fa: 'در آینده، DIG می‌تواند مدل‌هایی آزمایشی برای بررسی اختلافات و بحران‌ها با رأی‌گیری چندمرحله‌ای و مشارکت عمومی ارائه دهد.',
    en: 'In the future, DIG can provide experimental models for examining disputes and crises through multi-step voting and public participation.',
    tr: 'Gelecekte DIG, uyuşmazlıkları ve krizleri çok aşamalı oylama ve halk katılımıyla değerlendirmek için deneysel modeller sunabilir.',
  },

  digDibTitle: {
    fa: 'DIB و اقتصاد غیرمتمرکز',
    en: 'DIB & Decentralized Economy',
    tr: 'DIB ve Merkeziyetsiz Ekonomi',
    zh: 'DIB 与去中心化经济',
    hi: 'DIB और विकेंद्रीकृत अर्थव्यवस्था',
    ar: 'DIB والاقتصاد اللامركزي',
  },

  digDibText: {
    fa: 'DIB می‌تواند در آینده به عنوان ایده‌ای برای بانک یا سیستم مالی بین‌المللی غیرمتمرکز بررسی شود؛ مکملی اقتصادی برای DIG.',
    en: 'DIB can later be explored as an idea for an international decentralized bank or financial system: an economic complement to DIG.',
    tr: 'DIB, ileride uluslararası merkeziyetsiz bir banka veya finansal sistem fikri olarak araştırılabilir; DIG’in ekonomik tamamlayıcısıdır.',
  },

  digManifestoRoadmapTitle: {
    fa: 'مسیر توسعه DIG',
    en: 'DIG Development Path',
    tr: 'DIG Gelişim Yolu',
    zh: 'DIG 发展路径',
    hi: 'DIG विकास पथ',
    ar: 'مسار تطوير DIG',
  },

  digManifestoRoadmapIntro: {
    fa: 'این مسیر مرحله‌ای است. ابتدا جامعه، ابزار و رأی‌گیری آزمایشی ساخته می‌شود؛ سپس مدل‌های بزرگ‌تر تصمیم‌گیری و اقتصاد غیرمتمرکز بررسی می‌شوند.',
    en: 'This path is gradual. First, the community, tools, and experimental voting are built; then larger decision-making and decentralized economy models are explored.',
    tr: 'Bu yol kademelidir. Önce topluluk, araçlar ve deneysel oylama oluşturulur; ardından daha büyük karar alma ve merkeziyetsiz ekonomi modelleri araştırılır.',
  },

  digDisclaimerTitle: {
    fa: 'یادداشت مهم',
    en: 'Important Note',
    tr: 'Önemli Not',
    zh: '重要说明',
    hi: 'महत्वपूर्ण नोट',
    ar: 'ملاحظة مهمة',
  },

  digDisclaimerText: {
    fa: 'DIG در این مرحله یک چشم‌انداز، ایده و مسیر توسعه است. هدف فعلی، ساخت ابزارهای آزمایشی، سنجش مشارکت جامعه و حرکت تدریجی به سمت سازوکارهای شفاف‌تر برای تصمیم‌گیری مردمی است.',
    en: 'At this stage, DIG is a vision, idea, and development path. The current goal is to build experimental tools, measure community participation, and gradually move toward more transparent mechanisms for people-driven decision-making.',
    tr: 'Bu aşamada DIG bir vizyon, fikir ve gelişim yoludur. Mevcut hedef; deneysel araçlar oluşturmak, topluluk katılımını ölçmek ve halk odaklı karar alma için daha şeffaf mekanizmalara kademeli olarak ilerlemektir.',
  },

  // -------------------------
  // Shop / Products / Payments
  // -------------------------

  shopTitle: {
    fa: 'بازار Pi DAO',
    en: 'Pi DAO Marketplace',
    tr: 'Pi DAO Pazarı',
    zh: 'Pi DAO 市场',
    hi: 'Pi DAO मार्केटप्लेस',
    ar: 'سوق Pi DAO',
  },

  shopSubtitle: {
    fa: 'محصولات دیجیتال با امنیت بلاک‌چین',
    en: 'Digital products secured by blockchain',
    tr: 'Blockchain güvenliğiyle dijital ürünler',
    zh: '由区块链保护的数字产品',
    hi: 'ब्लॉकचेन द्वारा सुरक्षित डिजिटल उत्पाद',
    ar: 'منتجات رقمية مؤمنة عبر البلوكشين',
  },

  buyNow: {
    fa: 'خرید',
    en: 'Buy Now',
    tr: 'Satın Al',
    zh: '立即购买',
    hi: 'अभी खरीदें',
    ar: 'اشترِ الآن',
  },

  purchaseSuccess: {
    fa: 'خرید با موفقیت انجام شد',
    en: 'Purchase completed successfully',
    tr: 'Satın alma başarıyla tamamlandı',
    zh: '购买成功完成',
    hi: 'खरीद सफलतापूर्वक पूरी हुई',
    ar: 'تمت عملية الشراء بنجاح',
  },

  purchaseError: {
    fa: 'خطا در تراکنش. دوباره تلاش کنید.',
    en: 'Transaction error. Please try again.',
    tr: 'İşlem hatası. Lütfen tekrar deneyin.',
    zh: '交易错误。请重试。',
    hi: 'लेनदेन त्रुटि। कृपया पुनः प्रयास करें।',
    ar: 'خطأ في المعاملة. يرجى المحاولة مرة أخرى.',
  },

  productDigitalArtName: {
    fa: 'هنر دیجیتال Pi',
    en: 'Pi Digital Art',
    tr: 'Pi Dijital Sanat',
    zh: 'Pi 数字艺术',
    hi: 'Pi डिजिटल आर्ट',
    ar: 'فن Pi الرقمي',
  },

  productDigitalArtDesc: {
    fa: 'مجموعه اختصاصی NFT برای کاربران Pi.',
    en: 'Exclusive NFT collection for Pi users.',
    tr: 'Pi kullanıcıları için özel NFT koleksiyonu.',
    zh: '面向 Pi 用户的专属 NFT 收藏。',
    hi: 'Pi उपयोगकर्ताओं के लिए विशेष NFT संग्रह।',
    ar: 'مجموعة NFT حصرية لمستخدمي Pi.',
  },

  productMembershipName: {
    fa: 'عضویت Pi',
    en: 'Pi Membership',
    tr: 'Pi Üyeliği',
    zh: 'Pi 会员',
    hi: 'Pi सदस्यता',
    ar: 'عضوية Pi',
  },

  productMembershipDesc: {
    fa: 'دسترسی به حق رأی ممتاز DAO.',
    en: 'Access to premium DAO voting rights.',
    tr: 'Premium DAO oy haklarına erişim.',
    zh: '获得高级 DAO 投票权。',
    hi: 'प्रीमियम DAO मतदान अधिकारों तक पहुँच।',
    ar: 'الوصول إلى حقوق تصويت DAO المميزة.',
  },

  productCourseName: {
    fa: 'دوره کریپتو',
    en: 'Crypto Course',
    tr: 'Kripto Kursu',
    zh: '加密课程',
    hi: 'क्रिप्टो कोर्स',
    ar: 'دورة كريبتو',
  },

  productCourseDesc: {
    fa: 'یاد بگیرید چگونه کوین‌های کوچک بازار را معامله کنید.',
    en: 'Learn how to trade micro-cap coins.',
    tr: 'Mikro piyasa değerli coinleri nasıl trade edeceğinizi öğrenin.',
    zh: '学习如何交易小市值代币。',
    hi: 'माइक्रो-कैप कॉइन ट्रेड करना सीखें।',
    ar: 'تعلّم كيفية تداول العملات ذات القيمة السوقية الصغيرة.',
  },

  paymentSuccessful: {
    fa: 'پرداخت موفقیت‌آمیز بود!',
    en: 'Payment was successful!',
    tr: 'Ödeme başarılı!',
    zh: '支付成功！',
    hi: 'भुगतान सफल रहा!',
    ar: 'تم الدفع بنجاح!',
  },

  transactionRegistered: {
    fa: 'تراکنش شما با موفقیت در شبکه ثبت شد.',
    en: 'Your transaction was successfully registered on the network.',
    tr: 'İşleminiz ağ üzerinde başarıyla kaydedildi.',
    zh: '您的交易已成功在网络上注册。',
    hi: 'आपका लेनदेन नेटवर्क पर सफलतापूर्वक दर्ज हो गया।',
    ar: 'تم تسجيل معاملتك بنجاح على الشبكة.',
  },

  transactionId: {
    fa: 'ID تراکنش',
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
    fa: 'محصول',
    en: 'Product',
    tr: 'Ürün',
    zh: '产品',
    hi: 'उत्पाद',
    ar: 'المنتج',
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
    fa: '📜 تاریخچه تراکنش‌های PiDao',
    en: '📜 PiDao Transaction History',
    tr: '📜 PiDao İşlem Geçmişi',
    zh: '📜 PiDao 交易历史',
    hi: '📜 PiDao लेनदेन इतिहास',
    ar: '📜 سجل معاملات PiDao',
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
    fa: 'بازگشت به صفحه اصلی',
    en: 'Back to Home',
    tr: 'Ana Sayfaya Dön',
    zh: '返回首页',
    hi: 'होम पर वापस जाएँ',
    ar: 'العودة إلى الرئيسية',
  },

  // -------------------------
  // Tasks
  // -------------------------

  tasksTitle: {
    fa: 'تسک‌های روزانه تعامل',
    en: 'Daily Engagement Tasks',
    tr: 'Günlük Etkileşim Görevleri',
    zh: '每日互动任务',
    hi: 'दैनिक सहभागिता कार्य',
    ar: 'مهام التفاعل اليومية',
  },

  tasksSubtitle: {
    fa: 'این تسک‌ها را کامل کنید و پاداش Pi دریافت کنید.',
    en: 'Complete these tasks to earn Pi rewards.',
    tr: 'Pi ödülleri kazanmak için bu görevleri tamamlayın.',
    zh: '完成这些任务以获得 Pi 奖励。',
    hi: 'Pi पुरस्कार पाने के लिए इन कार्यों को पूरा करें।',
    ar: 'أكمل هذه المهام لكسب مكافآت Pi.',
  },

  taskWatchVideo: {
    fa: 'تماشای تبلیغ ویدیویی',
    en: 'Watch Video Ad',
    tr: 'Video Reklam İzle',
    zh: '观看视频广告',
    hi: 'वीडियो विज्ञापन देखें',
    ar: 'شاهد إعلان فيديو',
  },

  taskJoinPoll: {
    fa: 'شرکت در نظرسنجی جامعه',
    en: 'Join Community Poll',
    tr: 'Topluluk Anketine Katıl',
    zh: '参与社区投票',
    hi: 'समुदाय मतदान में शामिल हों',
    ar: 'شارك في تصويت المجتمع',
  },

  taskDailyCheckin: {
    fa: 'ورود روزانه',
    en: 'Daily Check-in',
    tr: 'Günlük Giriş',
    zh: '每日签到',
    hi: 'दैनिक चेक-इन',
    ar: 'تسجيل الحضور اليومي',
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

  // -------------------------
  // Footer
  // -------------------------

  footerDescription: {
    fa: 'PiDao زیرساختی اولیه برای مشارکت، رأی‌گیری، پرداخت‌های Pi و حرکت تدریجی به سمت چشم‌انداز DIG است؛ مدلی شفاف‌تر و مردمی‌تر برای تصمیم‌گیری جهانی.',
    en: 'PiDao is an early infrastructure for participation, voting, Pi payments, and a gradual move toward the DIG vision: a more transparent and people-powered model for global decision-making.',
    tr: 'PiDao; katılım, oylama, Pi ödemeleri ve DIG vizyonuna kademeli geçiş için erken bir altyapıdır: küresel karar alma için daha şeffaf ve halk odaklı bir model.',
  },

  footerNote: {
    fa: 'DIG در این مرحله یک چشم‌انداز و مسیر توسعه است. هدف فعلی، ساخت ابزارهای آزمایشی، جامعه اولیه و سازوکارهای شفاف برای مشارکت مردم است.',
    en: 'At this stage, DIG is a vision and development path. The current goal is to build experimental tools, an early community, and transparent mechanisms for public participation.',
    tr: 'Bu aşamada DIG bir vizyon ve gelişim yoludur. Mevcut amaç; deneysel araçlar, erken bir topluluk ve halk katılımı için şeffaf mekanizmalar oluşturmaktır.',
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
    const savedLang = localStorage.getItem('pidao_lang');

    if (isSupportedLanguage(savedLang)) {
      setLangState(savedLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;

    /**
     * فارسی و عربی راست‌چین هستند.
     * انگلیسی، ترکی، چینی و هندی چپ‌چین هستند.
     */
    document.documentElement.dir =
      lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('pidao_lang', newLang);
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
