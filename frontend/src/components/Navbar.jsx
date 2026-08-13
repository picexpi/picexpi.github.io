// frontend/src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useI18n } from '../i18n/I18nContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { t } = useI18n();
  const auth = useAuth();

  const isAuthenticated = auth?.isAuthenticated;
  const user = auth?.user;

  const handleLogout = () => {
    auth?.logout();
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
            <a href="#features" className="nav-link">
              {t('features')}
            </a>
          </li>

          <li className="nav-item">
            <a href="#about" className="nav-link">
              {t('aboutUs')}
            </a>
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

export default Navbar;
