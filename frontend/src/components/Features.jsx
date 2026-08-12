import React from 'react';
import './Features.css';

const features = [
  {
    title: "پرداخت‌های امن با Pi",
    description: "انتقال سریع و شفاف دارایی‌های دیجیتال مبتنی بر شبکه پای در محیطی کاملاً امن.",
    icon: "🔐"
  },
  {
    title: "تعامل غیرمتمرکز (DAO)",
    description: "مشارکت در تصمیم‌گیری‌ها و مدیریت اکوسیستم به صورت توزیع شده و شفاف.",
    icon: "🌐"
  },
  {
    title: "پنل کاربری پیشرفته",
    description: "مدیریت کامل تراکنش‌ها، مشاهده تاریخچه و کنترل کیف پول در یک محیط یکپارچه.",
    icon: "📊"
  }
];

const Features = () => {
  return (
    <section id="features" className="features-section">
      <h2 className="section-title">ویژگی‌های ما</h2>
      <div className="features-grid">
        {features.map((f, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
