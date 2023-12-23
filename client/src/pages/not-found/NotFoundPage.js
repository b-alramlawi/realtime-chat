// NotFoundPage.js

import React from 'react';
import './NotFoundStyle.css';

function NotFoundPage() {
    return (
        <div className="not-found-page">
            <img src="images/404-not-found.svg" alt="Page Not Found" className="not-found-image"/>
            <h3 className="not-found-title">Oops, the page you are looking for does not exist.</h3>
            <a href="/login" className="not-found-button">Go to Login</a>
        </div>
    );
}

export default NotFoundPage;
