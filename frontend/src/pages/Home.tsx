import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import './Home.css'; // فرض بر این است که استایل‌های خاص صفحه اصلی اینجا هستند

const Home: React.FC = () => {
  return (
    <div className="home-page-wrapper">
      <Navbar />
      
      <main className="home-main-content">
        {/* بخش Hero مسئول خوش‌آمدگویی است */}
        <Hero />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
