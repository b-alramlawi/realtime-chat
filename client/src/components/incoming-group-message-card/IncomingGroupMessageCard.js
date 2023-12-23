// IncomingGroupMessageCard.js

import React from 'react';
import './IncomingGroupMessageCardStyle.css';

const IncomingGroupMessageCard = ({message, time, senderName, senderImage}) => {
    return (<div className="incoming-group-card">
        <div className="group-sender-content">
            <img src={senderImage} alt={`${senderName}'s profile`} className="group-sender-image"/>
            <p className="group-sender-name">{senderName}</p>
        </div>
        <div className="group-message-content">
            <p className="group-message-text">{message}</p>
            <p className="group-timestamp">{time}</p>
        </div>
    </div>);
};

export default IncomingGroupMessageCard;
