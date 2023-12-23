// UserInfoBox.js
import React from 'react';
import './UserInfoBox.css';

const UserInfoBox = () => {
    return (
        <div className="info-box">
            <h2>User Information</h2>
            <div className="info-item">
                <span className="label">Token:</span>
                <span id="token" className="value">{localStorage.getItem('authToken') || 'N/A'}</span>
            </div>
            <div className="info-item">
                <span className="label">User ID:</span>
                <span id="userId" className="value">{localStorage.getItem('userId') || 'N/A'}</span>
            </div>
            <div className="info-item">
                <span className="label">Phone Number:</span>
                <span id="phoneNumber" className="value">{localStorage.getItem('phoneNumber') || 'N/A'}</span>
            </div>
        </div>
    );
};

export default UserInfoBox;
