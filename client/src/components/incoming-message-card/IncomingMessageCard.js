// IncomingMessageCard.js

import React from 'react';
import './IncomingMessageCardStyle.css';

const IncomingMessageCard = ({message, time}) => {
    return (<div className="incoming-card">
        <div className="message-content">
            <p className="message-text">{message}</p>
            <p className="timestamp">{time}</p>
        </div>
    </div>);
};

export default IncomingMessageCard;
