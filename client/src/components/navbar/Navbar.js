// Navbar.js

import React from 'react';
import './NavbarStyle.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src="/images/logo.png" alt="Logo" className="logo-icon" />
                    Chat App
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
