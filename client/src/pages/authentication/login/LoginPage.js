// LoginPage.js

import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './LoginStyle.css';
import axios from 'axios';

const LoginPage = () => {
    const history = useHistory();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);
    const [validationError, setValidationError] = useState(null);

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
        setValidationError(null); // Reset validation error on input change
    };

    const handleLogin = async () => {
        try {
            setLoginInProgress(true);

            // Client-side validation
            if (!/^\+\d{1,3}\d{10,14}$/.test(phoneNumber)) {
                setValidationError('Invalid phone number format. Use international format, e.g., +1234567890');
                return;
            }

            // Make a POST request to your login endpoint
            const response = await axios.post('http://localhost:5000/chat/api/login', {
                phoneNumber: phoneNumber,
            });

            // Handle the response accordingly
            console.log(response.data);

            // Inside the handleLogin function, after a successful login
            history.push(`/otp/${phoneNumber}`);
        } catch (error) {
            console.error('Login failed', error);
        } finally {
            setLoginInProgress(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-welcome-background">
                <div className="login-background-image" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/welcome.jpg)`}}></div>
            </div>
            <div className="login-form-container">
                <div className="login-form-content">
                    <h1>Login</h1>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        placeholder="Enter your phone number"
                        className={`input-field ${validationError ? 'error' : ''}`}
                    />
                    {validationError && <p className="login-error-message">{validationError}</p>}
                    <button className="login-button" onClick={handleLogin} disabled={loginInProgress}>
                        {loginInProgress ? 'Logging In...' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
