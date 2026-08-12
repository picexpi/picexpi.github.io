import React from 'react';
import './Hero.css';
import { useAuth } from '../context/AuthContext'; // اضافه شده برای استفاده از تابع لاگین

const Hero = () => {
  const { login } = useAuth();

  return (
    <section className="hero">
      <h1>Decentralize Your Future with PiDao</h1>
      <p>The next generation of autonomous decision-making. Empowering communities through transparent governance.</p>
      
      <div className="hero-btns">
        {/* دکمه اصلی و اولویت‌دار */}
        <button onClick={login} className="btn-primary">
          🔐 Login with Pi Wallet
        </button>
      </div>
    </section>
  );
};

export default Hero;
