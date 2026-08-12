import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="home-page-wrapper">
      {/* استفاده از کامپوننت‌های اصلی برای هماهنگی کامل */}
      <Navbar />
      
      <main>
        {/* کامپوننت Hero حالا مسئول نمایش پیام خوش‌آمدگویی و دکمه اصلی است */}
        <Hero />
        
        {/* اگر می‌خواهید بخش‌های دیگری مثل ویژگی‌ها را اینجا اضافه کنید، می‌توانید اضافه کنید */}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
