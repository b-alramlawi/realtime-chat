// WelcomePage.js

import React from 'react';
import './WelcomeStyle.css';
import UserInfoBox from "../../components/UserInfoBox";

const WelcomePage = () => {
    return (
        <div className="welcome-container">
            <img src="/images/logo.png" alt="Logo" className="logo"/>
            <h1 className="title">ChatApp for Web</h1>
            <p className="description">Connect and communicate effortlessly. Enjoy seamless messaging on multiple
                devices simultaneously.</p>
            {/*<UserInfoBox/>*/}
        </div>
    );
};

export default WelcomePage;
