// ConfirmationDialog.js

import React from 'react';
import './ConfirmationDialog.css';

const ConfirmationDialog = ({isOpen, onClose, onConfirm, text}) => {
    return (
        <div className={`confirmation-dialog ${isOpen ? 'open' : ''}`}>
            <div className="dialog-content">
                <h3>{text}</h3>
                <div className="button-container">
                    <button className="button-action" onClick={onConfirm}>Logout</button>
                    <button className="button-action" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
