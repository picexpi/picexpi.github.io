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

  navDig: {
    fa: 'معرفی DIG',
    en: 'DIG',
    tr: 'DIG',
  },

  features: {
    fa: 'ویژگی‌ها',
    en: 'Features',
    tr: 'Özellikler',
  },

  navRoadmap: {
    fa: 'مسیر راه',
    en: 'Roadmap',
    tr: 'Yol Haritası',
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

  // -------------------------
  // Pi Auth / Sign In
  // -------------------------

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

  joinWithPi: {
    fa: 'ورود با Pi و مشارکت',
    en: 'Join with Pi',
    tr: 'Pi ile Katıl',
  },

  welcome: {
    fa: 'خوش آمدی',
    en: 'Welcome',
    tr: 'Hoş geldin',
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

  // -------------------------
  // DIG / Hero
  // -------------------------

  digShortName: {
    fa: 'DIG',
    en: 'DIG',
    tr: 'DIG',
  },

  digFullName: {
    fa: 'دولت بین‌المللی غیرمتمرکز',
    en: 'Decentralized International Government',
    tr: 'Merkeziyetsiz Uluslararası Hükümet',
  },

  digHeroTitle: {
    fa: 'تصمیم‌گیری جهانی را غیرمتمرکز کنیم',
    en: 'Decentralizing Global Decision-Making',
    tr: 'Küresel Karar Almayı Merkeziyetsizleştirelim',
  },

  digHeroDescription: {
    fa: 'PiDao گامی اولیه برای ساخت زیرساختی شفاف، مردمی و غیرمتمرکز است؛ جایی که آینده تصمیم‌گیری جهانی می‌تواند با رأی مستقیم مردم شکل بگیرد.',
    en: 'PiDao is an early step toward building a transparent, people-powered, decentralized infrastructure where the future of global decision-making can be shaped by direct public participation.',
    tr: 'PiDao, küresel karar alma süreçlerinin doğrudan halk katılımıyla şekillenebileceği şeffaf, topluluk odaklı ve merkeziyetsiz bir altyapı oluşturma yolunda ilk adımdır.',
  },

  exploreDig: {
    fa: 'آشنایی با DIG',
    en: 'Explore DIG',
    tr: 'DIG’i Keşfet',
  },

  // -------------------------
  // About
  // -------------------------

  aboutDigKicker: {
    fa: 'PiDao + DIG',
    en: 'PiDao + DIG',
    tr: 'PiDao + DIG',
  },

  aboutDigSubtitle: {
    fa: 'درباره چشم‌انداز ما',
    en: 'About Our Vision',
    tr: 'Vizyonumuz Hakkında',
  },

  aboutDigTitleBefore: {
    fa: 'از جامعه Pi تا',
    en: 'From the Pi community to',
    tr: 'Pi topluluğundan',
  },

  aboutDigTitleHighlight: {
    fa: 'تصمیم‌گیری جهانی غیرمتمرکز',
    en: 'Decentralized Global Decision-Making',
    tr: 'Merkeziyetsiz Küresel Karar Almaya',
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
  },

  statPiIdentity: {
    fa: 'هویت و مشارکت',
    en: 'Identity & Participation',
    tr: 'Kimlik ve Katılım',
  },

  statPeopleVoting: {
    fa: 'رأی مستقیم مردم',
    en: 'Direct Public Voting',
    tr: 'Doğrudan Halk Oylaması',
  },

  digMissionTitle: {
    fa: 'مأموریت DIG',
    en: 'DIG Mission',
    tr: 'DIG Misyonu',
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
  },

  digPointTransparency: {
    fa: 'فرآیندهای قابل بررسی و مقاوم در برابر دستکاری',
    en: 'Verifiable and tamper-resistant processes',
    tr: 'Doğrulanabilir ve müdahaleye dayanıklı süreçler',
  },

  digPointUnity: {
    fa: 'حرکت تدریجی به سمت اتحاد و تصمیم‌گیری جهانی',
    en: 'A gradual move toward unity and global decision-making',
    tr: 'Birlik ve küresel karar almaya doğru kademeli ilerleme',
  },

  digVisionBadge: {
    fa: 'مسیر آینده',
    en: 'Future Path',
    tr: 'Gelecek Yolu',
  },

  // -------------------------
  // Features
  // -------------------------

  digFeaturesSectionTitle: {
    fa: 'زیرساخت‌های اصلی DIG',
    en: 'Core DIG Infrastructure',
    tr: 'DIG Temel Altyapısı',
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
  },

  pollDescription: {
    fa: 'این رأی‌گیری یک نمونه اولیه برای سنجش مشارکت جامعه در تصمیم‌گیری‌های غیرمتمرکز جهانی است. هر کاربر واردشده با Pi فقط یک رأی می‌تواند ثبت کند.',
    en: 'This poll is an early prototype for measuring community participation in decentralized global decision-making. Each Pi-authenticated user can submit only one vote.',
    tr: 'Bu anket, merkeziyetsiz küresel karar alma süreçlerinde topluluk katılımını ölçmek için erken bir prototiptir. Pi ile doğrulanan her kullanıcı yalnızca bir oy kullanabilir.',
  },

  pollYes: {
    fa: 'بله، از تصمیم‌گیری مردمی حمایت می‌کنم',
    en: 'Yes, I support people-driven decision-making',
    tr: 'Evet, halk odaklı karar almayı destekliyorum',
  },

  pollNo: {
    fa: 'خیر، فعلاً مدل متمرکز بهتر است',
    en: 'No, the centralized model is better for now',
    tr: 'Hayır, şimdilik merkezi model daha iyi',
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

  // -------------------------
  // DIG Page / Manifesto
  // -------------------------

  digPageTitle: {
    fa: 'مانیفست دولت بین‌المللی غیرمتمرکز',
    en: 'Decentralized International Government Manifesto',
    tr: 'Merkeziyetsiz Uluslararası Hükümet Manifestosu',
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

  paymentSuccessful: {
    fa: 'پرداخت موفقیت‌آمیز بود!',
    en: 'Payment was successful!',
    tr: 'Ödeme başarılı!',
  },

  transactionRegistered: {
    fa: 'تراکنش شما با موفقیت در شبکه ثبت شد.',
    en: 'Your transaction was successfully registered on the network.',
    tr: 'İşleminiz ağ üzerinde başarıyla kaydedildi.',
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

  backToHome: {
    fa: 'بازگشت به صفحه اصلی',
    en: 'Back to Home',
    tr: 'Ana Sayfaya Dön',
  },

  // -------------------------
  // Tasks
  // -------------------------

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
