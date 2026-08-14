// frontend/src/pages/Home.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import LanguageSwitcher from '../components/LanguageSwitcher';
import PiTestnetPayment from '../components/PiTestnetPayment';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Poll from '../components/Poll';
import About from '../components/About';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Navbar />

      <main>
        {/* انتخاب زبان */}
        <LanguageSwitcher />

        {/* پنل اصلی و سالم Login/Payment پای - منتقل شده به اول صفحه */}
        <div id="pi-payment-panel">
          <PiTestnetPayment />
        </div>

        {/* Hero بدون Login */}
        <Hero />

        <Features />
        <Poll />
        <About />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
