// ConversationItem.js

import React from 'react';
import './ConversationItem.css';

const ConversationItem = ({avatar, name, message, time, onClick}) => {
    return (
        <li className="conversation-list-group-item" onClick={onClick}>
            <div className="conversation-item">
                <img src={avatar || 'images/profileAvatar.png'} alt="Conversation- Avatar"
                     className="conversation-avatar"/>
                <div className="contact-info">
                    <div>
                        <h4>{name}</h4>
                        <p className="conversation-message">{message}</p>
                    </div>
                </div>
                <div className="conversation-time">{time}</div>
            </div>
            <div className="divider"></div>
        </li>
    );
};

export default ConversationItem;
