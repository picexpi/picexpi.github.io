// frontend/src/pages/Home.tsx
import React from 'react';
import './Home.css';

import Navbar from '../components/Navbar';
import LanguageSwitcher from '../components/LanguageSwitcher';
import PiTestnetPayment from '../components/PiPayment';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Roadmap from '../components/Roadmap';
import Poll from '../components/Poll';
import About from '../components/About';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Navbar />

      <main className="home-main">
        {/* انتخاب زبان */}
        <div className="home-language-switcher">
          <LanguageSwitcher />
        </div>

        {/* معرفی اصلی پروژه DIG / PiDao */}
        <Hero />

        {/* پنل ورود / پرداخت Pi */}
        <section id="pi-payment-panel" className="home-pi-panel">
          <PiPayment />
        </section>

        {/* زیرساخت‌ها و ویژگی‌های DIG */}
        <Features />

        {/* مسیر راه پروژه */}
        <Roadmap />

        {/* نمونه اولیه رأی‌گیری غیرمتمرکز */}
        <Poll />

        {/* درباره پروژه */}
        <About />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
