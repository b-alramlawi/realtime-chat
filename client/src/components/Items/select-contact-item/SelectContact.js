// SelectContact.js

import React from 'react';
import './SelectContact.css';

const SelectContact = ({avatar, name, isSelected, onCheckboxChange}) => {
    return (
        <li className={`contact-list-item ${isSelected ? 'selected' : ''}`}>
            <div className="contact-item">
                <img src={avatar} alt={`${name}'s Avatar`} className="contact-avatar"/>
                <div className="contact-info">
                    <h4>{name}</h4>
                </div>
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => onCheckboxChange(e.target.checked)}
                    />
                </div>
            </div>
        </li>
    );
};

export default SelectContact;

