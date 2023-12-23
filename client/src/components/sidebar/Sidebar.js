// Sidebar.js

import React from 'react';
import './Sidebar.css';

const Sidebar = ({onSelectPage}) => {
    const pages = [
        {name: 'conversation', icon: 'chat.svg'},
        {name: 'contact', icon: 'add-contact.svg'},
        {name: 'group-conversation', icon: 'group-white.svg'},
        // {name: 'status', icon: 'status.svg'},
        // {name: 'calls', icon: 'call.svg'},
        {name: 'settings', icon: 'settings.svg'},
    ];

    return (
        <div className="sidebar-container">
            {pages.map((page) => (
                <div key={page.name} onClick={() => onSelectPage(page.name)}>
                    <img src={`icons/${page.icon}`} alt={page.name}/>
                </div>
            ))}
        </div>
    );
};
export default Sidebar;
