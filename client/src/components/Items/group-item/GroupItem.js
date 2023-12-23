// GroupItem.js

import React from 'react';
import './GroupItem.css';

const GroupItem = ({groupAvatar, groupName, lastGroupMessage, groupTime, onGroupClick}) => {
    return (
        <li className="group-list-item" onClick={onGroupClick}>
            <div className="group-item">
                <img src={groupAvatar || 'images/profileAvatar.png'} alt="Group-Avatar" className="group-avatar"/>
                <div className="group-info">
                    <div>
                        <h4>{groupName}</h4>
                        <p className="group-message">{lastGroupMessage}</p>
                    </div>
                </div>
                <div className="group-time">{groupTime}</div>
            </div>
            <div className="divider"></div>
        </li>
    );
};

export default GroupItem;
