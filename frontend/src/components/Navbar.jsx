// frontend/src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useI18n } from '../i18n/I18nContext';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  const tx = (key, fallback) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  const scrollToSection = (sectionId) => {
    const doScroll = () => {
      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else {
        console.warn(`Section not found: #${sectionId}`);
      }
    };

    if (location.pathname !== '/') {
      navigate('/');

      setTimeout(() => {
        doScroll();
      }, 250);
    } else {
      doScroll();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" className="navbar-logo-link" aria-label="picex Home">
            <img
              src={logo}
              alt="picex Logo"
              className="navbar-logo-img"
            />

            <span className="navbar-logo-text">
              pi<span>cex</span>
            </span>
          </Link>
        </div>

        {/* Main menu */}
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              {tx('home', 'Home')}
            </Link>
          </li>

          <li className="nav-item">
            <button
              type="button"
              className="nav-link nav-button"
              onClick={() => scrollToSection('markets')}
            >
              {tx('markets', 'Markets')}
            </button>
          </li>

          <li className="nav-item">
            <button
              type="button"
              className="nav-link nav-button"
              onClick={() => scrollToSection('pi-payment-panel')}
            >
              {tx('wallet', 'Wallet')}
            </button>
          </li>

          <li className="nav-item">
            <button
              type="button"
              className="nav-link nav-button"
              onClick={() => scrollToSection('features')}
            >
              {tx('features', 'Features')}
            </button>
          </li>

          <li className="nav-item">
            <button
              type="button"
              className="nav-link nav-button"
              onClick={() => scrollToSection('support-ai')}
            >
              {tx('aiSupport', 'AI Support')}
            </button>
          </li>

          <li className="nav-item">
            <button
              type="button"
              className="nav-link nav-button"
              onClick={() => scrollToSection('roadmap')}
            >
              {tx('navRoadmap', 'Roadmap')}
            </button>
          </li>

          <li className="nav-item">
            <button
              type="button"
              className="nav-link nav-button"
              onClick={() => scrollToSection('poll')}
            >
              {tx('governance', 'Governance')}
            </button>
          </li>

          <li className="nav-item">
            <button
              type="button"
              className="nav-link nav-button"
              onClick={() => scrollToSection('about')}
            >
              {tx('aboutUs', 'About')}
            </button>
          </li>

          {/* Existing routes preserved */}
          <li className="nav-item nav-item-optional">
            <Link to="/shop" className="nav-link">
              {tx('shop', 'Products')}
            </Link>
          </li>

          <li className="nav-item nav-item-optional">
            <Link to="/tasks" className="nav-link">
              {tx('tasks', 'Tasks')}
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="navbar-cta"
          onClick={() => scrollToSection('pi-payment-panel')}
        >
          {tx('joinWithPi', 'Connect Pi')}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
