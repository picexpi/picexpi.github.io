// frontend/src/components/Features.jsx
import React from 'react';
import './Features.css';

const features = [
  {
    icon: '🔐',
    title: 'ورود با کیف پول Pi',
    desc: 'بدون رمز عبور؛ با امضای دیجیتال کیف پول Pi وارد شوید. هویت شما روی بلاک‌چین تأیید می‌شود و اطلاعات شخصی‌تان هرگز روی سرور ذخیره نمی‌شود.',
  },
  {
    icon: '🛍️',
    title: 'بازارگاه غیرمتمرکز',
    desc: 'خرید و فروش مستقیم بین کاربران (P2P) با تراکنش‌های شفاف و امن که روی شبکه Pi ثبت می‌شوند؛ بدون واسطه و بدون نگرانی.',
  },
  {
    icon: '🎯',
    title: 'تسک‌ها و پاداش',
    desc: 'با انجام تسک‌های روزانه — تعامل، دعوت دوستان و بازخورد — Pi بیشتری کسب کنید و پیشرفت خود را لحظه‌ای دنبال کنید.',
  },
  {
    icon: '⚡',
    title: 'پرداخت آنی و کم‌هزینه',
    desc: 'تراکنش‌ها در چند ثانیه و با کارمزد تقریباً صفر انجام می‌شوند؛ سریع‌تر و ارزان‌تر از هر روش سنتی.',
  },
  {
    icon: '📜',
    title: 'تاریخچه شفاف',
    desc: 'تمام پرداخت‌ها و فعالیت‌های شما در یک تاریخچه شخصی، قابل جستجو و همیشه در دسترس ثبت می‌شود.',
  },
  {
    icon: '🗳️',
    title: 'جامعه خودگردان (DAO)',
    desc: 'دارندگان Pi در تصمیم‌های کلیدی پروژه مشارکت می‌کنند؛ آینده‌ی پلتفرم را جامعه تعیین می‌کند، نه یک نهاد مرکزی.',
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="features">
      <div className="features-header">
        <span className="features-badge">امکانات</span>
        <h2>چرا PiDao؟</h2>
        <p>هر چیزی که برای ورود به اقتصاد غیرمتمرکز Pi نیاز دارید، در یک پلتفرم.</p>
      </div>

      <div className="features-grid">
        {features.map((f) => (
          <div className="feature-card" key={f.title}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
