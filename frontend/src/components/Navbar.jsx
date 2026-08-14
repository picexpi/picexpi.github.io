// frontend/src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useI18n } from '../i18n/I18nContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { t } = useI18n();
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = auth?.isAuthenticated;
  const user = auth?.user;

  const handleLogout = () => {
    auth?.logout();
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

    /**
     * اگر در صفحه اصلی نیستیم، اول برو صفحه اصلی،
     * بعد کمی صبر کن تا Home رندر شود، سپس اسکرول کن.
     */
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
        {/* لوگو */}
        <div className="navbar-logo">
          <Link to="/">
            Pi<span>DAO</span>
          </Link>
        </div>

        {/* منوی اصلی */}
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              {t('home')}
            </Link>
          </li>

          <li className="nav-item">
            <button
              type="button"
              className="nav-link"
              onClick={() => scrollToSection('features')}
              style={navButtonStyle}
            >
              {t('features')}
            </button>
          </li>

          <li className="nav-item">
            <button
              type="button"
              className="nav-link"
              onClick={() => scrollToSection('poll')}
              style={navButtonStyle}
            >
              {t('governance')}
            </button>
          </li>

          <li className="nav-item">
            <button
              type="button"
              className="nav-link"
              onClick={() => scrollToSection('about')}
              style={navButtonStyle}
            >
              {t('aboutUs')}
            </button>
          </li>

          <li className="nav-item">
            <Link to="/shop" className="nav-link">
              {t('shop')}
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/tasks" className="nav-link">
              {t('tasks')}
            </Link>
          </li>
        </ul>

        {/* ورود / خروج */}
        <div className="nav-auth">
          {!isAuthenticated ? (
            <Link to="/login" className="btn-signin">
              {t('login')}
            </Link>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span
                style={{
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                @{user?.username || 'Pi User'}
              </span>

              <button
                onClick={handleLogout}
                className="btn-signin"
                style={{
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {t('logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const navButtonStyle = {
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  font: 'inherit',
};

export default Navbar;
