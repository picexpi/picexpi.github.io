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
  // Brand
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

  // Only for Navbar/Header special logo if needed
  brandLogoPrefix: {
    en: 'pi',
    fa: 'pi',
    ar: 'pi',
    tr: 'pi',
    zh: 'pi',
  },
  brandLogoHighlight: {
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

  // Common
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
  aboutUs: {
    en: 'About picex',
    fa: 'درباره picex',
    ar: 'حول picex',
    tr: 'picex hakkında',
    zh: '关于 picex',
  },
  features: {
    en: 'Features',
    fa: 'امکانات',
    ar: 'المميزات',
    tr: 'Özellikler',
    zh: '功能',
  },
  markets: {
    en: 'Markets',
    fa: 'بازارها',
    ar: 'الأسواق',
    tr: 'Piyasalar',
    zh: '市场',
  },
  wallet: {
    en: 'Wallet',
    fa: 'کیف پول',
    ar: 'المحفظة',
    tr: 'Cüzdan',
    zh: '钱包',
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
  governance: {
    en: 'Governance',
    fa: 'حاکمیت',
    ar: 'الحوكمة',
    tr: 'Yönetişim',
    zh: '治理',
  },
  aiSupport: {
    en: 'AI Support',
    fa: 'پشتیبانی هوش مصنوعی',
    ar: 'دعم الذكاء الاصطناعي',
    tr: 'AI Desteği',
    zh: 'AI 支持',
  },
  tasks: {
    en: 'Tasks',
    fa: 'وظایف',
    ar: 'المهام',
    tr: 'Görevler',
    zh: '任务',
  },
  navRoadmap: {
    en: 'Roadmap',
    fa: 'نقشه راه',
    ar: 'خارطة الطريق',
    tr: 'Yol haritası',
    zh: '路线图',
  },
  shop: {
    en: 'Products',
    fa: 'محصولات',
    ar: 'المنتجات',
    tr: 'Ürünler',
    zh: '产品',
  },
  tradingProducts: {
    en: 'Trading Products',
    fa: 'محصولات معاملاتی',
    ar: 'منتجات التداول',
    tr: 'Alım satım ürünleri',
    zh: '交易产品',
  },
  whitepaper: {
    en: 'Whitepaper',
    fa: 'وایت‌پیپر',
    ar: 'الورقة البيضاء',
    tr: 'Whitepaper',
    zh: '白皮书',
  },
  terms: {
    en: 'Terms',
    fa: 'قوانین',
    ar: 'الشروط',
    tr: 'Şartlar',
    zh: '条款',
  },
  termsOfService: {
    en: 'Terms of Service',
    fa: 'شرایط استفاده',
    ar: 'شروط الخدمة',
    tr: 'Hizmet şartları',
    zh: '服务条款',
  },
  privacy: {
    en: 'Privacy',
    fa: 'حریم خصوصی',
    ar: 'الخصوصية',
    tr: 'Gizlilik',
    zh: '隐私',
  },
  privacyPolicy: {
    en: 'Privacy Policy',
    fa: 'سیاست حریم خصوصی',
    ar: 'سياسة الخصوصية',
    tr: 'Gizlilik politikası',
    zh: '隐私政策',
  },
  support: {
    en: 'Support',
    fa: 'پشتیبانی',
    ar: 'الدعم',
    tr: 'Destek',
    zh: '支持',
  },
  send: {
    en: 'Send',
    fa: 'ارسال',
    ar: 'إرسال',
    tr: 'Gönder',
    zh: '发送',
  },
  active: {
    en: 'Active',
    fa: 'فعال',
    ar: 'نشط',
    tr: 'Aktif',
    zh: '在线',
  },

  // Language
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

  // Auth / Pi SDK
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
  loginWithPi: {
    en: 'Login with Pi',
    fa: 'ورود با Pi',
    ar: 'تسجيل الدخول بـ Pi',
    tr: 'Pi ile giriş',
    zh: '使用 Pi 登录',
  },
  joinWithPi: {
    en: 'Connect with Pi',
    fa: 'اتصال با Pi',
    ar: 'الاتصال بـ Pi',
    tr: 'Pi ile bağlan',
    zh: '连接 Pi',
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

  // Network
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

  // Hero
  picexBadge: {
    en: 'picex · Hybrid Trading Hub for Pi Network',
    fa: 'picex · مرکز معاملاتی هیبرید برای Pi Network',
    ar: 'picex · مركز تداول هجين لشبكة Pi Network',
    tr: 'picex · Pi Network için hibrit işlem merkezi',
    zh: 'picex · Pi Network 混合交易中心',
  },
  picexHeroTitle: {
    en: 'Trade Pi assets with speed, low fees, and intelligent support',
    fa: 'دارایی‌های Pi را با سرعت، کارمزد کم و پشتیبانی هوشمند معامله کنید',
    ar: 'تداول أصول Pi بسرعة ورسوم منخفضة ودعم ذكي',
    tr: 'Pi varlıklarını hız, düşük ücret ve akıllı destekle alıp satın',
    zh: '以高速、低费用和智能支持交易 Pi 资产',
  },
  picexHeroDescription: {
    en: 'picex combines a fast off-chain matching engine, Pi-based settlement, native market data, AI online support, and a wallet-first trading experience for the Pi Network ecosystem.',
    fa: 'picex موتور تطبیق سریع خارج از زنجیره، تسویه مبتنی بر Pi، داده‌های بومی بازار، پشتیبانی آنلاین هوش مصنوعی و تجربه معاملاتی کیف‌پول‌محور را برای اکوسیستم Pi Network ترکیب می‌کند.',
    ar: 'يجمع picex بين محرك مطابقة سريع خارج السلسلة، وتسوية قائمة على Pi، وبيانات سوق أصلية، ودعم ذكاء اصطناعي عبر الإنترنت، وتجربة تداول تركز على المحفظة لمنظومة Pi Network.',
    tr: 'picex, Pi Network ekosistemi için hızlı zincir dışı eşleştirme motoru, Pi tabanlı mutabakat, yerel piyasa verileri, AI çevrimiçi destek ve cüzdan öncelikli işlem deneyimini birleştirir.',
    zh: 'picex 为 Pi Network 生态系统结合了快速链下撮合引擎、基于 Pi 的结算、原生市场数据、AI 在线支持以及钱包优先的交易体验。',
  },
  exploreMarkets: {
    en: 'Explore Markets',
    fa: 'مشاهده بازارها',
    ar: 'استكشاف الأسواق',
    tr: 'Piyasaları keşfet',
    zh: '探索市场',
  },
  spot: {
    en: 'Spot',
    fa: 'اسپات',
    ar: 'فوري',
    tr: 'Spot',
    zh: '现货',
  },

  // About
  picexAboutKicker: {
    en: 'About picex',
    fa: 'درباره picex',
    ar: 'حول picex',
    tr: 'picex hakkında',
    zh: '关于 picex',
  },
  picexAboutSubtitle: {
    en: 'A hybrid exchange layer for the Pi ecosystem',
    fa: 'یک لایه صرافی هیبرید برای اکوسیستم Pi',
    ar: 'طبقة تداول هجينة لمنظومة Pi',
    tr: 'Pi ekosistemi için hibrit borsa katmanı',
    zh: 'Pi 生态系统的混合交易层',
  },
  picexAboutTitleBefore: {
    en: 'Built to turn Pi into a',
    fa: 'ساخته‌شده برای تبدیل Pi به یک',
    ar: 'تم بناؤه لتحويل Pi إلى',
    tr: 'Pi’yi şuna dönüştürmek için geliştirildi:',
    zh: '旨在将 Pi 转变为',
  },
  picexAboutTitleHighlight: {
    en: 'tradable market experience',
    fa: 'تجربه بازار قابل معامله',
    ar: 'تجربة سوق قابلة للتداول',
    tr: 'alınıp satılabilir piyasa deneyimi',
    zh: '可交易的市场体验',
  },
  picexAboutText: {
    en: 'picex is designed as a high-performance hybrid trading platform for the Pi Network ecosystem. It combines fast off-chain order matching with secure settlement, Pi-based identity flows, low-fee trading, and native market data generated from picex activity.',
    fa: 'picex به‌عنوان یک پلتفرم معاملاتی هیبرید و پرسرعت برای اکوسیستم Pi Network طراحی شده است. این پلتفرم تطبیق سریع سفارش خارج از زنجیره را با تسویه امن، جریان‌های هویتی مبتنی بر Pi، معاملات کم‌کارمزد و داده‌های بومی بازار تولیدشده از فعالیت picex ترکیب می‌کند.',
    ar: 'تم تصميم picex كمنصة تداول هجينة عالية الأداء لمنظومة Pi Network. فهي تجمع بين مطابقة الأوامر السريعة خارج السلسلة والتسوية الآمنة وتدفقات الهوية القائمة على Pi والتداول منخفض الرسوم وبيانات السوق الأصلية الناتجة عن نشاط picex.',
    tr: 'picex, Pi Network ekosistemi için yüksek performanslı hibrit bir işlem platformu olarak tasarlanmıştır. Hızlı zincir dışı emir eşleştirmeyi güvenli mutabakat, Pi tabanlı kimlik akışları, düşük ücretli işlem ve picex etkinliğinden üretilen yerel piyasa verileriyle birleştirir.',
    zh: 'picex 被设计为 Pi Network 生态系统的高性能混合交易平台。它将快速链下订单撮合、安全结算、基于 Pi 的身份流程、低费用交易以及由 picex 活动生成的原生市场数据结合在一起。',
  },
  picexAboutTextSecondary: {
    en: 'The goal is not to replace the Pi ecosystem, but to build a professional trading hub on top of it: spot markets first, wallet operations and native charts next, then AI support, governance, and futures once the risk engine is mature.',
    fa: 'هدف جایگزینی اکوسیستم Pi نیست، بلکه ساخت یک مرکز معاملاتی حرفه‌ای روی آن است: ابتدا بازارهای اسپات، سپس عملیات کیف پول و نمودارهای بومی، و بعد از بلوغ موتور ریسک، پشتیبانی هوش مصنوعی، حاکمیت و معاملات فیوچرز.',
    ar: 'الهدف ليس استبدال منظومة Pi، بل بناء مركز تداول احترافي فوقها: الأسواق الفورية أولاً، ثم عمليات المحفظة والرسوم البيانية الأصلية، وبعد نضج محرك المخاطر دعم الذكاء الاصطناعي والحوكمة والعقود الآجلة.',
    tr: 'Amaç Pi ekosisteminin yerini almak değil, onun üzerinde profesyonel bir işlem merkezi oluşturmaktır: önce spot piyasalar, ardından cüzdan işlemleri ve yerel grafikler, risk motoru olgunlaştığında ise AI destek, yönetişim ve vadeli işlemler.',
    zh: '目标不是取代 Pi 生态系统，而是在其之上构建专业交易中心：首先是现货市场，其次是钱包操作和原生图表，然后在风险引擎成熟后推出 AI 支持、治理和期货。',
  },
  picexStatCex: {
    en: 'Fast internal matching',
    fa: 'تطبیق سریع داخلی',
    ar: 'مطابقة داخلية سريعة',
    tr: 'Hızlı dahili eşleştirme',
    zh: '快速内部撮合',
  },
  picexStatPi: {
    en: 'Pi identity and settlement',
    fa: 'هویت و تسویه مبتنی بر Pi',
    ar: 'هوية وتسوية قائمة على Pi',
    tr: 'Pi kimliği ve mutabakatı',
    zh: 'Pi 身份与结算',
  },
  picexStatAi: {
    en: 'Smart support layer',
    fa: 'لایه پشتیبانی هوشمند',
    ar: 'طبقة دعم ذكية',
    tr: 'Akıllı destek katmanı',
    zh: '智能支持层',
  },
  picexVisionLabel: {
    en: 'picex Hybrid Engine',
    fa: 'موتور هیبرید picex',
    ar: 'محرك picex الهجين',
    tr: 'picex Hibrit Motoru',
    zh: 'picex 混合引擎',
  },
  picexMissionTitle: {
    en: 'Speed where traders need it, settlement where trust matters',
    fa: 'سرعت در جایی که معامله‌گران نیاز دارند، تسویه در جایی که اعتماد مهم است',
    ar: 'السرعة حيث يحتاجها المتداولون، والتسوية حيث تكون الثقة مهمة',
    tr: 'Yatırımcıların ihtiyaç duyduğu yerde hız, güvenin önemli olduğu yerde mutabakat',
    zh: '交易者需要速度的地方提供速度，信任重要的地方提供结算',
  },
  picexMissionText: {
    en: 'Orders are designed to be matched quickly inside the picex trading engine, while deposits, withdrawals, account rules, and final settlement remain auditable through a controlled wallet and ledger architecture.',
    fa: 'سفارش‌ها طوری طراحی شده‌اند که در موتور معاملاتی picex سریع تطبیق داده شوند، در حالی که واریزها، برداشت‌ها، قوانین حساب و تسویه نهایی از طریق معماری کنترل‌شده کیف پول و دفتر داخلی قابل حسابرسی باقی می‌مانند.',
    ar: 'تم تصميم الأوامر لتتم مطابقتها بسرعة داخل محرك تداول picex، بينما تبقى الإيداعات والسحوبات وقواعد الحساب والتسوية النهائية قابلة للتدقيق عبر بنية محفظة وسجل محكمة.',
    tr: 'Emirler picex işlem motoru içinde hızlı şekilde eşleşecek biçimde tasarlanırken; yatırma, çekme, hesap kuralları ve nihai mutabakat kontrollü cüzdan ve kayıt mimarisiyle denetlenebilir kalır.',
    zh: '订单被设计为在 picex 交易引擎内快速撮合，而充值、提现、账户规则和最终结算则通过受控的钱包和账本架构保持可审计。',
  },
  picexPointOrderbook: {
    en: 'Order book trading for spot markets',
    fa: 'معامله با دفتر سفارشات برای بازارهای اسپات',
    ar: 'تداول دفتر الأوامر للأسواق الفورية',
    tr: 'Spot piyasalar için emir defteri işlemleri',
    zh: '现货市场订单簿交易',
  },
  picexPointWallet: {
    en: 'Wallet operations with hot and cold treasury controls',
    fa: 'عملیات کیف پول با کنترل خزانه گرم و سرد',
    ar: 'عمليات المحفظة مع ضوابط الخزائن الساخنة والباردة',
    tr: 'Sıcak ve soğuk hazine kontrolleriyle cüzdan işlemleri',
    zh: '带冷热金库控制的钱包操作',
  },
  picexPointCharts: {
    en: 'Native charts based on picex market activity',
    fa: 'نمودارهای بومی بر اساس فعالیت بازار picex',
    ar: 'رسوم بيانية أصلية مبنية على نشاط سوق picex',
    tr: 'picex piyasa aktivitesine dayalı yerel grafikler',
    zh: '基于 picex 市场活动的原生图表',
  },
  picexPointAi: {
    en: 'AI support for user guidance and issue resolution',
    fa: 'پشتیبانی هوش مصنوعی برای راهنمایی کاربر و حل مشکلات',
    ar: 'دعم الذكاء الاصطناعي لإرشاد المستخدم وحل المشكلات',
    tr: 'Kullanıcı yönlendirmesi ve sorun çözümü için AI destek',
    zh: '用于用户指导和问题解决的 AI 支持',
  },
  picexVisionBadge: {
    en: 'Pi-first exchange infrastructure',
    fa: 'زیرساخت صرافی Pi-first',
    ar: 'بنية تداول تضع Pi أولاً',
    tr: 'Pi öncelikli borsa altyapısı',
    zh: 'Pi 优先的交易基础设施',
  },

  // Features
  picexFeaturesKicker: {
    en: 'picex Core Infrastructure',
    fa: 'زیرساخت اصلی picex',
    ar: 'البنية الأساسية لـ picex',
    tr: 'picex Temel Altyapısı',
    zh: 'picex 核心基础设施',
  },
  picexFeaturesTitle: {
    en: 'Built for high-performance Pi trading',
    fa: 'ساخته‌شده برای معاملات پرسرعت Pi',
    ar: 'مصمم لتداول Pi عالي الأداء',
    tr: 'Yüksek performanslı Pi işlemleri için geliştirildi',
    zh: '为高性能 Pi 交易而构建',
  },
  picexFeaturesIntro: {
    en: 'picex combines exchange-grade speed, Pi ecosystem access, wallet operations, native market data, and AI-powered support into one unified trading experience.',
    fa: 'picex سرعت در سطح صرافی، دسترسی به اکوسیستم Pi، عملیات کیف پول، داده‌های بومی بازار و پشتیبانی مبتنی بر هوش مصنوعی را در یک تجربه معاملاتی یکپارچه ترکیب می‌کند.',
    ar: 'يجمع picex بين سرعة على مستوى منصات التداول، والوصول إلى منظومة Pi، وعمليات المحفظة، وبيانات السوق الأصلية، والدعم المدعوم بالذكاء الاصطناعي في تجربة تداول موحدة.',
    tr: 'picex; borsa seviyesinde hız, Pi ekosistemi erişimi, cüzdan işlemleri, yerel piyasa verileri ve AI destekli yardımı tek bir işlem deneyiminde birleştirir.',
    zh: 'picex 将交易所级速度、Pi 生态访问、钱包操作、原生市场数据和 AI 支持整合到统一的交易体验中。',
  },
  picexFeatureSpotTitle: {
    en: 'Spot Trading',
    fa: 'معاملات اسپات',
    ar: 'التداول الفوري',
    tr: 'Spot İşlem',
    zh: '现货交易',
  },
  picexFeatureSpotDescription: {
    en: 'Trade Pi-based assets through a fast order book experience designed for real-time spot markets.',
    fa: 'دارایی‌های مبتنی بر Pi را از طریق تجربه دفتر سفارشات سریع و طراحی‌شده برای بازارهای اسپات لحظه‌ای معامله کنید.',
    ar: 'تداول الأصول القائمة على Pi من خلال تجربة دفتر أوامر سريعة مصممة للأسواق الفورية اللحظية.',
    tr: 'Pi tabanlı varlıkları gerçek zamanlı spot piyasalar için tasarlanmış hızlı bir emir defteri deneyimiyle alıp satın.',
    zh: '通过专为实时现货市场设计的快速订单簿体验交易基于 Pi 的资产。',
  },
  picexFeatureFuturesTitle: {
    en: 'Futures Ready Architecture',
    fa: 'معماری آماده برای فیوچرز',
    ar: 'بنية جاهزة للعقود الآجلة',
    tr: 'Vadeli işlemlere hazır mimari',
    zh: '期货就绪架构',
  },
  picexFeatureFuturesDescription: {
    en: 'picex is designed to support perpetual futures after the risk engine, margin system, and liquidation layer are mature.',
    fa: 'picex طوری طراحی شده که پس از بلوغ موتور ریسک، سیستم مارجین و لایه لیکوییدیشن، از معاملات پرپچوال پشتیبانی کند.',
    ar: 'تم تصميم picex لدعم العقود الدائمة بعد نضج محرك المخاطر ونظام الهامش وطبقة التصفية.',
    tr: 'picex; risk motoru, marjin sistemi ve likidasyon katmanı olgunlaştıktan sonra sürekli vadeli işlemleri destekleyecek şekilde tasarlanmıştır.',
    zh: 'picex 被设计为在风险引擎、保证金系统和清算层成熟后支持永续期货。',
  },
  picexFeatureWalletTitle: {
    en: 'Wallet, Deposit & Withdraw',
    fa: 'کیف پول، واریز و برداشت',
    ar: 'المحفظة والإيداع والسحب',
    tr: 'Cüzdan, yatırma ve çekme',
    zh: '钱包、充值与提现',
  },
  picexFeatureWalletDescription: {
    en: 'A wallet-first flow for deposits, pending balances, withdrawals, hot wallet operations, and cold wallet treasury controls.',
    fa: 'یک جریان کیف‌پول‌محور برای واریزها، موجودی‌های در انتظار، برداشت‌ها، عملیات کیف پول گرم و کنترل خزانه سرد.',
    ar: 'تدفق يركز على المحفظة للإيداعات والأرصدة المعلقة والسحوبات وعمليات المحفظة الساخنة وضوابط الخزينة الباردة.',
    tr: 'Yatırma, bekleyen bakiyeler, çekme, sıcak cüzdan işlemleri ve soğuk cüzdan hazine kontrolleri için cüzdan öncelikli akış.',
    zh: '面向充值、待处理余额、提现、热钱包操作和冷钱包金库控制的钱包优先流程。',
  },
  picexFeaturePiTitle: {
    en: 'Pi Login & KYC-Aware Access',
    fa: 'ورود با Pi و دسترسی آگاه از KYC',
    ar: 'تسجيل الدخول عبر Pi ووصول مراعي لـ KYC',
    tr: 'Pi girişi ve KYC uyumlu erişim',
    zh: 'Pi 登录与 KYC 感知访问',
  },
  picexFeaturePiDescription: {
    en: 'Users connect through Pi identity flows while picex applies account limits, KYC-aware access, and safer trading rules.',
    fa: 'کاربران از طریق جریان‌های هویتی Pi متصل می‌شوند و picex محدودیت‌های حساب، دسترسی آگاه از KYC و قوانین معاملاتی امن‌تر را اعمال می‌کند.',
    ar: 'يتصل المستخدمون عبر تدفقات هوية Pi بينما يطبق picex حدود الحساب والوصول المراعي لـ KYC وقواعد تداول أكثر أماناً.',
    tr: 'Kullanıcılar Pi kimlik akışlarıyla bağlanırken picex hesap limitleri, KYC uyumlu erişim ve daha güvenli işlem kuralları uygular.',
    zh: '用户通过 Pi 身份流程连接，同时 picex 应用账户限制、KYC 感知访问和更安全的交易规则。',
  },
  picexFeatureChartsTitle: {
    en: 'Native picex Charts',
    fa: 'نمودارهای بومی picex',
    ar: 'رسوم picex البيانية الأصلية',
    tr: 'Yerel picex grafikleri',
    zh: 'picex 原生图表',
  },
  picexFeatureChartsDescription: {
    en: 'Price charts are planned to be generated from picex’s own executed trades, order book events, and OHLC candles.',
    fa: 'نمودارهای قیمت قرار است از معاملات انجام‌شده خود picex، رویدادهای دفتر سفارشات و کندل‌های OHLC تولید شوند.',
    ar: 'من المخطط توليد مخططات الأسعار من صفقات picex المنفذة وأحداث دفتر الأوامر وشموع OHLC.',
    tr: 'Fiyat grafiklerinin picex’in kendi gerçekleşen işlemleri, emir defteri olayları ve OHLC mumlarından üretilmesi planlanmaktadır.',
    zh: '价格图表计划由 picex 自身的成交交易、订单簿事件和 OHLC K 线生成。',
  },
  picexFeatureAiTitle: {
    en: 'AI Online Support',
    fa: 'پشتیبانی آنلاین هوش مصنوعی',
    ar: 'الدعم الإلكتروني بالذكاء الاصطناعي',
    tr: 'AI çevrimiçi destek',
    zh: 'AI 在线支持',
  },
  picexFeatureAiDescription: {
    en: 'An intelligent support assistant will help users with Pi login, payments, deposits, withdrawals, KYC, fees, and order issues.',
    fa: 'یک دستیار پشتیبانی هوشمند به کاربران در ورود با Pi، پرداخت‌ها، واریزها، برداشت‌ها، KYC، کارمزدها و مشکلات سفارش کمک می‌کند.',
    ar: 'سيساعد مساعد دعم ذكي المستخدمين في تسجيل الدخول عبر Pi والمدفوعات والإيداعات والسحوبات وKYC والرسوم ومشكلات الأوامر.',
    tr: 'Akıllı destek asistanı; Pi girişi, ödemeler, yatırma, çekme, KYC, ücretler ve emir sorunlarında kullanıcılara yardımcı olur.',
    zh: '智能支持助手将帮助用户处理 Pi 登录、支付、充值、提现、KYC、费用和订单问题。',
  },

  // Trading / Market terms
  orderBookTrading: {
    en: 'Order book trading',
    fa: 'معامله با دفتر سفارشات',
    ar: 'التداول عبر دفتر الأوامر',
    tr: 'Emir defteriyle işlem',
    zh: '订单簿交易',
  },
  futures: {
    en: 'Futures',
    fa: 'فیوچرز',
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

  // Native Market Data
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
    tr: 'picex fiyat grafikleri; alakasız harici piyasa verilerinden değil, kendi gerçekleşen işlemlerimizden, emir defteri olaylarından ve OHLC mum toplamasından üretilmek üzere tasarlanmıştır. Bu, Pi yatırımcılarına gerçek picex piyasasının daha temiz bir görünümünü sunar.',
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
    tr: 'Emir defteri, işlemler, mumlar, hacim',
    zh: '订单簿、成交、K线、成交量',
  },
  piNightPair: {
    en: 'PI / NIGHT',
    fa: 'PI / NIGHT',
    ar: 'PI / NIGHT',
    tr: 'PI / NIGHT',
    zh: 'PI / NIGHT',
  },
  ecosystemPair: {
    en: 'Ecosystem Pair',
    fa: 'جفت‌ارز اکوسیستم',
    ar: 'زوج منظومة النظام',
    tr: 'Ekosistem paritesi',
    zh: '生态交易对',
  },
  piNightMarketDescription: {
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
  nativeMarketDataFootnote: {
    en: 'Market data is planned to be based on verified picex trading activity, internal ledgers, and exchange-generated candle data.',
    fa: 'داده‌های بازار قرار است بر پایه فعالیت معاملاتی تأییدشده picex، دفترهای داخلی و داده‌های کندلی تولیدشده توسط صرافی ساخته شوند.',
    ar: 'من المخطط أن تعتمد بيانات السوق على نشاط تداول picex الموثق، والسجلات الداخلية، وبيانات الشموع التي تولدها المنصة.',
    tr: 'Piyasa verilerinin doğrulanmış picex işlem aktivitesi, iç kayıt defterleri ve borsa tarafından üretilen mum verilerine dayanması planlanmaktadır.',
    zh: '市场数据计划基于经过验证的 picex 交易活动、内部账本以及交易所生成的 K 线数据。',
  },

  // AI Support
  aiOnlineSupport: {
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
    tr: 'picex destek asistanı; Pi girişi, ödemeler, yatırma, çekme, cüzdan güvenliği, işlem ücretleri, emir durumu, KYC gereksinimleri ve platform kuralları hakkında kullanıcılara yardımcı olur.',
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
    tr: 'Bana yatırma, çekme, Pi girişi, işlem ücretleri veya KYC hakkında soru sor.',
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
  aiSupportInputPlaceholder: {
    en: 'Ask about deposits, withdrawals, Pi login, fees, or KYC...',
    fa: 'درباره واریز، برداشت، ورود با Pi، کارمزدها یا KYC بپرسید...',
    ar: 'اسأل عن الإيداعات، والسحوبات، وتسجيل الدخول عبر Pi، والرسوم، أو KYC...',
    tr: 'Yatırma, çekme, Pi girişi, ücretler veya KYC hakkında sorun...',
    zh: '询问充值、提现、Pi 登录、费用或 KYC...',
  },

  // Wallet / Pi Payment Panel
  picexWalletAccess: {
    en: 'picex Wallet Access',
    fa: 'دسترسی کیف پول picex',
    ar: 'الوصول إلى محفظة picex',
    tr: 'picex Cüzdan Erişimi',
    zh: 'picex 钱包访问',
  },
  connectPiCreatePayment: {
    en: 'Connect Pi & Create Payment',
    fa: 'اتصال Pi و ایجاد پرداخت',
    ar: 'الاتصال بـ Pi وإنشاء الدفع',
    tr: 'Pi’ye bağlan ve ödeme oluştur',
    zh: '连接 Pi 并创建支付',
  },
  walletAccessDescription: {
    en: 'Login with Pi to access picex wallet features. This panel currently keeps the existing Pi payment flow and prepares the foundation for future deposit and withdrawal operations.',
    fa: 'برای دسترسی به امکانات کیف پول picex با Pi وارد شوید. این پنل فعلاً جریان پرداخت Pi موجود را حفظ می‌کند و پایه عملیات واریز و برداشت آینده را آماده می‌سازد.',
    ar: 'سجّل الدخول باستخدام Pi للوصول إلى ميزات محفظة picex. يحافظ هذا اللوح حالياً على تدفق دفع Pi الحالي ويجهز الأساس لعمليات الإيداع والسحب المستقبلية.',
    tr: 'picex cüzdan özelliklerine erişmek için Pi ile giriş yapın. Bu panel şu anda mevcut Pi ödeme akışını korur ve gelecekteki yatırma/çekme işlemleri için temel hazırlar.',
    zh: '使用 Pi 登录以访问 picex 钱包功能。此面板当前保留现有的 Pi 支付流程，并为未来的充值和提现操作奠定基础。',
  },
  piAmount: {
    en: 'Pi Amount',
    fa: 'مقدار Pi',
    ar: 'مبلغ Pi',
    tr: 'Pi miktarı',
    zh: 'Pi 数量',
  },
  minMaxPiAmount: {
    en: 'Min: {min} Pi / Max: {max} Pi',
    fa: 'حداقل: {min} Pi / حداکثر: {max} Pi',
    ar: 'الحد الأدنى: {min} Pi / الحد الأقصى: {max} Pi',
    tr: 'Min: {min} Pi / Maks: {max} Pi',
    zh: '最小：{min} Pi / 最大：{max} Pi',
  },
  createPiPayment: {
    en: 'Create Pi Payment',
    fa: 'ایجاد پرداخت Pi',
    ar: 'إنشاء دفع Pi',
    tr: 'Pi ödemesi oluştur',
    zh: '创建 Pi 支付',
  },
  paymentCompletedWalletUpdated: {
    en: 'Payment completed successfully. Your picex wallet/payment record is updated. TXID:',
    fa: 'پرداخت با موفقیت تکمیل شد. رکورد کیف پول/پرداخت picex شما به‌روزرسانی شد. TXID:',
    ar: 'تم إكمال الدفع بنجاح. تم تحديث سجل محفظة/دفع picex الخاص بك. TXID:',
    tr: 'Ödeme başarıyla tamamlandı. picex cüzdan/ödeme kaydınız güncellendi. TXID:',
    zh: '支付已成功完成。您的 picex 钱包/支付记录已更新。TXID：',
  },

  // Poll
  picexPollQuestion: {
    en: 'Should picex let users vote on which new coins or trading pairs should be added to the platform?',
    fa: 'آیا موافقید کاربران picex بتوانند درباره اضافه شدن سکه‌ها یا جفت‌ارزهای معاملاتی جدید به پلتفرم رأی بدهند؟',
    ar: 'هل توافق على أن يتيح picex للمستخدمين التصويت على العملات أو أزواج التداول الجديدة التي يجب إضافتها إلى المنصة؟',
    tr: 'picex kullanıcılarının platforma eklenecek yeni coinler veya işlem çiftleri hakkında oy kullanabilmesini ister misiniz?',
    zh: '您是否希望 picex 允许用户投票决定平台应新增哪些币种或交易对？',
  },
  picexPollDescription: {
    en: 'picex governance polls help the community guide product priorities such as spot trading, wallet operations, AI support, native charts, and futures readiness.',
    fa: 'نظرسنجی‌های حاکمیتی picex به جامعه کمک می‌کند اولویت‌های محصول مانند معاملات اسپات، عملیات کیف پول، پشتیبانی هوش مصنوعی، نمودارهای بومی و آمادگی فیوچرز را هدایت کند.',
    ar: 'تساعد استطلاعات حوكمة picex المجتمع على توجيه أولويات المنتج مثل التداول الفوري وعمليات المحفظة ودعم الذكاء الاصطناعي والرسوم البيانية الأصلية والاستعداد للعقود الآجلة.',
    tr: 'picex yönetişim anketleri; spot işlemler, cüzdan operasyonları, AI destek, yerel grafikler ve vadeli işlem hazırlığı gibi ürün önceliklerini topluluğun yönlendirmesine yardımcı olur.',
    zh: 'picex 治理投票帮助社区指导产品优先级，例如现货交易、钱包操作、AI 支持、原生图表和期货准备。',
  },
  pollLoading: {
    en: 'Loading governance poll...',
    fa: 'در حال بارگذاری نظرسنجی حاکمیتی...',
    ar: 'جارٍ تحميل استطلاع الحوكمة...',
    tr: 'Yönetişim anketi yükleniyor...',
    zh: '正在加载治理投票...',
  },
  totalVotes: {
    en: 'Total votes',
    fa: 'مجموع رأی‌ها',
    ar: 'إجمالي الأصوات',
    tr: 'Toplam oy',
    zh: '总票数',
  },
  pollYes: {
    en: 'Yes',
    fa: 'بله',
    ar: 'نعم',
    tr: 'Evet',
    zh: '是',
  },
  pollNo: {
    en: 'No',
    fa: 'خیر',
    ar: 'لا',
    tr: 'Hayır',
    zh: '否',
  },
  yesLabel: {
    en: 'Yes',
    fa: 'بله',
    ar: 'نعم',
    tr: 'Evet',
    zh: '是',
  },
  noLabel: {
    en: 'No',
    fa: 'خیر',
    ar: 'لا',
    tr: 'Hayır',
    zh: '否',
  },
  yourVote: {
    en: 'Your vote',
    fa: 'رأی شما',
    ar: 'تصويتك',
    tr: 'Oyunuz',
    zh: '您的投票',
  },
  voteDate: {
    en: 'Vote date',
    fa: 'تاریخ رأی',
    ar: 'تاريخ التصويت',
    tr: 'Oy tarihi',
    zh: '投票日期',
  },
  voteHistory: {
    en: 'Vote history',
    fa: 'تاریخچه رأی',
    ar: 'سجل التصويت',
    tr: 'Oy geçmişi',
    zh: '投票历史',
  },
  pollLoginRequired: {
    en: 'Please connect with Pi before voting.',
    fa: 'لطفاً قبل از رأی دادن با Pi متصل شوید.',
    ar: 'يرجى الاتصال بـ Pi قبل التصويت.',
    tr: 'Oy vermeden önce Pi ile bağlanın.',
    zh: '投票前请先连接 Pi。',
  },
  pollAlreadyVoted: {
    en: 'You have already voted in this poll.',
    fa: 'شما قبلاً در این نظرسنجی رأی داده‌اید.',
    ar: 'لقد صوّت بالفعل في هذا الاستطلاع.',
    tr: 'Bu ankette zaten oy kullandınız.',
    zh: '您已在此投票中投过票。',
  },
  pollVoteSuccess: {
    en: 'Your vote has been recorded successfully.',
    fa: 'رأی شما با موفقیت ثبت شد.',
    ar: 'تم تسجيل صوتك بنجاح.',
    tr: 'Oyunuz başarıyla kaydedildi.',
    zh: '您的投票已成功记录。',
  },
  pollConnectionError: {
    en: 'Unable to connect to the poll service.',
    fa: 'امکان اتصال به سرویس نظرسنجی وجود ندارد.',
    ar: 'تعذر الاتصال بخدمة الاستطلاع.',
    tr: 'Anket servisine bağlanılamıyor.',
    zh: '无法连接投票服务。',
  },

  // Roadmap
  picexRoadmapKicker: {
    en: 'picex Roadmap',
    fa: 'نقشه راه picex',
    ar: 'خارطة طريق picex',
    tr: 'picex Yol Haritası',
    zh: 'picex 路线图',
  },
  picexRoadmapTitle: {
    en: 'From Pi payment app to trading infrastructure',
    fa: 'از اپ پرداخت Pi تا زیرساخت معاملاتی',
    ar: 'من تطبيق دفع Pi إلى بنية تداول',
    tr: 'Pi ödeme uygulamasından işlem altyapısına',
    zh: '从 Pi 支付应用到交易基础设施',
  },
  picexRoadmapIntro: {
    en: 'picex will evolve step by step: first preserving Pi login, payment, poll, and user flows, then expanding toward wallet operations, spot trading, native charts, AI support, and futures-ready infrastructure.',
    fa: 'picex مرحله‌به‌مرحله تکامل پیدا می‌کند: ابتدا حفظ جریان‌های ورود Pi، پرداخت، نظرسنجی و کاربر، سپس گسترش به عملیات کیف پول، معاملات اسپات، نمودارهای بومی، پشتیبانی هوش مصنوعی و زیرساخت آماده فیوچرز.',
    ar: 'سيتطور picex خطوة بخطوة: أولاً الحفاظ على تسجيل الدخول عبر Pi والدفع والاستطلاعات وتدفقات المستخدم، ثم التوسع نحو عمليات المحفظة والتداول الفوري والرسوم البيانية الأصلية ودعم الذكاء الاصطناعي والبنية الجاهزة للعقود الآجلة.',
    tr: 'picex adım adım gelişecektir: önce Pi girişi, ödeme, anket ve kullanıcı akışlarını koruyacak; ardından cüzdan işlemleri, spot alım satım, yerel grafikler, AI destek ve vadeli işlemlere hazır altyapıya genişleyecektir.',
    zh: 'picex 将逐步发展：首先保留 Pi 登录、支付、投票和用户流程，然后扩展到钱包操作、现货交易、原生图表、AI 支持和期货就绪基础设施。',
  },

  // Footer
  picexFooterBadge: {
    en: 'Hybrid Trading Hub for Pi Network',
    fa: 'مرکز معاملاتی هیبرید برای Pi Network',
    ar: 'مركز تداول هجين لشبكة Pi Network',
    tr: 'Pi Network için hibrit işlem merkezi',
    zh: 'Pi Network 混合交易中心',
  },
  picexFooterDescription: {
    en: 'picex is a Pi-first hybrid exchange experience combining fast trading, Pi login, payment flows, native market data, AI support, and a wallet-ready architecture for future deposit and withdrawal operations.',
    fa: 'picex یک تجربه صرافی هیبرید و Pi-first است که معاملات سریع، ورود با Pi، جریان‌های پرداخت، داده‌های بومی بازار، پشتیبانی هوش مصنوعی و معماری آماده کیف پول برای عملیات واریز و برداشت آینده را ترکیب می‌کند.',
    ar: 'picex تجربة تداول هجينة تضع Pi أولاً وتجمع بين التداول السريع وتسجيل الدخول عبر Pi وتدفقات الدفع وبيانات السوق الأصلية ودعم الذكاء الاصطناعي وبنية جاهزة للمحفظة لعمليات الإيداع والسحب المستقبلية.',
    tr: 'picex; hızlı işlem, Pi girişi, ödeme akışları, yerel piyasa verileri, AI destek ve gelecekteki yatırma/çekme işlemleri için cüzdana hazır mimariyi birleştiren Pi öncelikli hibrit borsa deneyimidir.',
    zh: 'picex 是 Pi 优先的混合交易体验，结合快速交易、Pi 登录、支付流程、原生市场数据、AI 支持以及面向未来充值和提现的钱包就绪架构。',
  },
  footerExchange: {
    en: 'Exchange',
    fa: 'صرافی',
    ar: 'التداول',
    tr: 'Borsa',
    zh: '交易所',
  },
  footerCommunity: {
    en: 'Community',
    fa: 'جامعه',
    ar: 'المجتمع',
    tr: 'Topluluk',
    zh: '社区',
  },
  footerResources: {
    en: 'Resources',
    fa: 'منابع',
    ar: 'الموارد',
    tr: 'Kaynaklar',
    zh: '资源',
  },
  picexFooterNote: {
    en: 'picex is under active development. Trading, wallet, deposit, withdrawal, futures, and AI support features must be tested, audited, and reviewed for compliance before production use. Pi SDK functionality depends on the official Pi Network Developer Platform and current network availability.',
    fa: 'picex در حال توسعه فعال است. قابلیت‌های معامله، کیف پول، واریز، برداشت، فیوچرز و پشتیبانی هوش مصنوعی باید پیش از استفاده نهایی تست، حسابرسی و از نظر تطبیق با قوانین بررسی شوند. عملکرد Pi SDK به پلتفرم رسمی توسعه‌دهندگان Pi Network و وضعیت فعلی شبکه وابسته است.',
    ar: 'picex قيد التطوير النشط. يجب اختبار ميزات التداول والمحفظة والإيداع والسحب والعقود الآجلة ودعم الذكاء الاصطناعي وتدقيقها ومراجعتها من ناحية الامتثال قبل الاستخدام الإنتاجي. تعتمد وظائف Pi SDK على منصة مطوري Pi Network الرسمية وتوفر الشبكة الحالي.',
    tr: 'picex aktif geliştirme aşamasındadır. Alım satım, cüzdan, yatırma, çekme, vadeli işlemler ve AI destek özellikleri üretim kullanımından önce test edilmeli, denetlenmeli ve uyumluluk açısından incelenmelidir. Pi SDK işlevselliği resmi Pi Network Developer Platformu’na ve mevcut ağ erişilebilirliğine bağlıdır.',
    zh: 'picex 正在积极开发中。交易、钱包、充值、提现、期货和 AI 支持功能在生产使用前必须经过测试、审计和合规审查。Pi SDK 功能取决于官方 Pi Network 开发者平台和当前网络可用性。',
  },
  footerRights: {
    en: 'All rights reserved.',
    fa: 'تمام حقوق محفوظ است.',
    ar: 'جميع الحقوق محفوظة.',
    tr: 'Tüm hakları saklıdır.',
    zh: '保留所有权利。',
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
    if (!isSupportedLanguage(nextLang)) return;

    setLangState(nextLang);

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, nextLang);
    }
  };

  const setLanguage = setLang;

  const t = (key: string): string => {
    if (!key) return '';

    const item = translations[key];

    if (item?.[lang]) return item[lang];
    if (item?.en) return item.en;

    return key;
  };

  useEffect(() => {
    if (typeof document === 'undefined') return;

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
