// StatusPage.js

import React from 'react';
import './StatusStyle.css';

const StatusPage = () => {
    return (
        <div className="status-page-container">
            <div className="status-header-section">
                <h2>Status Page</h2>
            </div>
            <div className="status-center-image-container">
                <img
                    src="/images/maintenance.png"
                    alt="Status Image"
                    className="call-center-image"
                />
            </div>
        </div>
    );
};
export default StatusPage;
