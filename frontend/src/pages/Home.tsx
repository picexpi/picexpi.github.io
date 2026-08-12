// frontend/src/pages/Home.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features'; // اضافه کن
import About from '../components/About';     // اضافه کن
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <About />
        {/* سایر بخش‌ها مثل Shop یا Tasks اگر در Home هستند */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
