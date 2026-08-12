// frontend/src/components/Features.jsx
import React from 'react';
import './Features.css';

const features = [
  {
    title: "پرداخت‌های امن با Pi",
    description: "انتقال سریع و شفاف دارایی‌های دیجیتال بر پایه پروتکل‌های امن شبکه پای.",
    icon: "🔐"
  },
  {
    title: "تعامل غیرمتمرکز (DAO)",
    description: "مشارکت در تصمیم‌گیری‌های شبکه و تاثیرگذاری بر آینده اکوسیستم بلاک‌چین.",
    icon: "🌐"
  },
  {
    title: "پنل مدیریت تراکنش",
    description: "مشاهده لحظه‌ای تاریخچه پرداخت‌ها و مدیریت موجودی در یک محیط کاربرپسند.",
    icon: "📊"
  },
  {
    title: "پشتیبانی از محصولات دیجیتال",
    description: "دسترسی به طیف وسیعی از خدمات و کالاهای دیجیتال در فروشگاه اختصاصی.",
    icon: "🛒"
  }
];

const Features = () => {
  return (
    <section id="features" className="features-section">
      <div className="container">
        <h2 className="section-title">ویژگی‌های کلیدی سیستم</h2>
        <div className="features-grid">
          {features.map((f, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">{f.icon}</span>
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-description">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
