// frontend/src/pages/Home.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';
import Poll from '../components/Poll';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Navbar />

      <main>
        <Hero />
        <Features />
        <About />
        <Poll />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
