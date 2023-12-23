// ContactItem.js

import React from 'react';
import './ContactItem.css';

const ContactItem = ({avatar, name, status, onClick}) => {
    return (
        <li className="contact-list-group-item" onClick={onClick}>
            <div className="contact-item">
                <img src={avatar} alt={`${name}'s Avatar`} className="contact-avatar"/>
                <div className="contact-info">
                    <h4>{name}</h4>
                    <p>{status}</p>
                </div>
            </div>
        </li>
    );
};

export default ContactItem;
