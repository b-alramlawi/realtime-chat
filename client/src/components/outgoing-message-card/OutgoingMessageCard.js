// OutgoingMessageCard.js

import React from 'react';
import './OutgoingMessageCardStyle.css';

const OutgoingMessageCard = ({message, time}) => {
    return (
        <div className="outgoing-message-card">
            <div className="message-content">
                <p className="message-text">{message}</p>
                <p className="timestamp">{time}</p>
                <div className="delivery-status">
                    <span className="icon">&#10003;</span>
                </div>
            </div>
        </div>
    );
};

export default OutgoingMessageCard;
