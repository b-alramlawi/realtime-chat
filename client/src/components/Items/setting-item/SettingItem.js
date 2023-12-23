// SettingItem.js
import React from 'react';
import './SettingItem.css';

const SettingItem = ({avatar, name, onClick}) => {
    return (
        <li className="setting-list-group-item" onClick={onClick}>
            <div className="setting-item">
                <img src={avatar} alt={`${name}'s Avatar`} className="setting-avatar"/>
                <div className="setting-info">
                    <h4>{name}</h4>
                </div>
            </div>
            <div className="divider"></div>
        </li>
    );
};

export default SettingItem;
