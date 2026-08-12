import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, isAuthenticated, login, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="logo">PiDao</div>
            
            <div className="nav-links">
                {/* انتخابگر زبان */}
                <select className="lang-selector">
                    <option value="en">English</option>
                    <option value="fa">فارسی</option>
                </select>

                <a href="#features">Features</a>
                <a href="#about">About</a>
                
                {!isAuthenticated ? (
                    <button className="btn-login" onClick={login}>
                        Login with Pi
                    </button>
                ) : (
                    <div className="user-menu">
                        <span className="username">@{user?.username || 'User'}</span>
                        <button className="btn-logout" onClick={logout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
