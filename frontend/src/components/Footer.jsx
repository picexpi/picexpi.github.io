// frontend/src/components/Footer.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Footer.css';
import { useI18n } from '../i18n/I18nContext';

const Footer = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

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
    <footer className="footer">
      <Link to="/" className="footer-logo">
        PiDao
      </Link>

      <ul className="footer-links">
        <li>
          <button
            type="button"
            onClick={() => scrollToSection('features')}
            style={footerButtonStyle}
          >
            {t('features')}
          </button>
        </li>

        <li>
          <button
            type="button"
            onClick={() => scrollToSection('poll')}
            style={footerButtonStyle}
          >
            {t('governance')}
          </button>
        </li>

        <li>
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            style={footerButtonStyle}
          >
            {t('aboutUs')}
          </button>
        </li>
      </ul>

      <div className="copyright">
        <p>
          &copy; {new Date().getFullYear()} PiDao {t('project')}.{' '}
          {t('footerRights')}
        </p>
      </div>
    </footer>
  );
};

const footerButtonStyle = {
  background: 'none',
  border: 'none',
  padding: 0,
  margin: 0,
  color: 'inherit',
  cursor: 'pointer',
  font: 'inherit',
  textDecoration: 'none',
};

export default Footer;
