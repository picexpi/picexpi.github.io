// frontend/src/i18n/translations/aiSupport.ts
import type { TranslationsMap } from './types';

export const aiSupportTranslations: TranslationsMap = {
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
};
