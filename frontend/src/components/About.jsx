// frontend/src/components/About.jsx
import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-wrapper">
          
          {/* ستون اول: متن و توضیحات */}
          <div className="about-content">
            <h2 className="about-subtitle">درباره پروژه ما</h2>
            <h1 className="about-title">پل ارتباطی شما با آینده <span className="highlight">Pi Network</span></h1>
            <p className="about-text">
              ما در این پلتفرم، بستری امن و غیرمتمرکز را برای کاربران شبکه پای فراهم کرده‌ایم تا بتوانند 
              خدمات دیجیتال را به شکلی ساده، سریع و بدون واسطه مبادله کنند. هدف ما، قدرتمندسازی جامعه Pi 
              از طریق تکنولوژی‌های مدرن بلاک‌چین است.
            </p>
            
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">امنیت تراکنش</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">۲۴/۷</span>
                <span className="stat-label">پشتیبانی فنی</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">DAO</span>
                <span className="stat-label">حاکمیت غیرمتمرکز</span>
              </div>
            </div>
          </div>

          {/* ستون دوم: باکس چشم‌انداز (Visual Element) */}
          <div className="about-visual">
            <div className="vision-card">
              <div className="vision-icon">🚀</div>
              <h3>چشم‌انداز ما</h3>
              <p>
                ایجاد یک اکوسیستم اقتصادی خودکفا، که در آن هر کاربر Pi می‌تواند با کمترین ریسک، 
                تجارت و تعاملات مالی جهانی خود را مدیریت کند.
              </p>
              <div className="vision-badge">Web3 Ready</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
