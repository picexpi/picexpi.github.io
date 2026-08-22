// frontend/src/pages/Home.tsx
import React from 'react';
import './Home.css';

import Navbar from '../components/Navbar';
import LanguageSwitcher from '../components/LanguageSwitcher';
import PiPaymentPanel from '../components/PiPaymentPanel';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Roadmap from '../components/Roadmap';
import Poll from '../components/Poll';
import About from '../components/About';
import Footer from '../components/Footer';
import NativeMarketData from '../components/NativeMarketData';
import AISupportSection from '../components/AISupportSection';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Navbar />

      <main className="home-main">
        <div className="home-language-switcher">
          <LanguageSwitcher />
        </div>

        <Hero />

        <NativeMarketData />

        <div className="home-pi-panel">
          <PiPaymentPanel />
        </div>

        <AISupportSection />

        <Features />

        <Roadmap />

        <Poll />

        <About />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
