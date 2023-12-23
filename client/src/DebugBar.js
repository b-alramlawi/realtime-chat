// DebugBar.js
import React from 'react';

const DebugBar = () => {
    const ribbonStyle = {
        position: 'fixed',
        top: 20,
        right: 70,
        zIndex: 9999,
        backgroundColor: '#f4ed61',
        color: '#1c1e1f',
        padding: '2px 8px',
        transformOrigin: '0% 0%',
        fontSize: '10px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 8px 24px rgba(0.9, 0.9, 0.9, 0.9)',
    };

    return (
        <div style={ribbonStyle}>
            <strong>Under Development</strong>
        </div>
    );
};

export default DebugBar;
