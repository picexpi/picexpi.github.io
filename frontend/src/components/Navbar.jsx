// frontend/src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* بخش لوگو - جایگزین Header قبلی */}
        <div className="navbar-logo">
          <Link to="/">Pi<span>DAO</span></Link>
        </div>

        {/* منوی اصلی */}
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">خانه</Link>
          </li>
          <li className="nav-item">
            <a href="/#features" className="nav-link">ویژگی‌ها</a>
          </li>
          <li className="nav-item">
            <a href="/#about" className="nav-link">درباره ما</a>
          </li>
          <li className="nav-item">
            <Link to="/shop" className="nav-link">فروشگاه</Link>
          </li>
          <li className="nav-item">
            <Link to="/tasks" className="nav-link">تسک‌ها</Link>
          </li>
        </ul>

        {/* دکمه ورود */}
        <div className="nav-auth">
          <Link to="/signin" className="btn-signin">ورود</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
