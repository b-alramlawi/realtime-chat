// FailedMessage.js

import React from 'react';
import './FailedMessageStyle.css';

function FailedMessage({message}) {
    return (<div className="failed-message">
            <p className="message-text">{message}</p>
        </div>);
}

export default FailedMessage;
