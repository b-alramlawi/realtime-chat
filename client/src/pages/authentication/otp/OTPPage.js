// OTPPage.js

import React, {useState, useRef} from 'react';
import './OTPStyle.css';
import axios from 'axios';
import {useHistory, useParams} from 'react-router-dom';

const OTPPage = () => {
    const history = useHistory();
    const {phoneNumber} = useParams();
    const [otp, setOtp] = useState(['', '', '', '']);
    const [validationError, setValidationError] = useState('');
    const [verificationErrorMessage, setVerificationErrorMessage] = useState('');
    const inputRefs = useRef([...Array(4)].map(() => React.createRef()));

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;

        if (value !== '' && index < 3) {
            // Move focus to the next input
            inputRefs.current[index + 1].current.focus();
        }

        setOtp(newOtp);
        setValidationError(''); // Reset validation error on OTP change
    };

    const handleVerify = async () => {
        try {
            // Clear any previous error messages
            setValidationError('');
            setVerificationErrorMessage('');

            // Client-side validation
            if (!/^\d{4}$/.test(otp.join(''))) {
                setValidationError('Invalid OTP format. Must be a 4-digit number.');
                return;
            }

            // Make a POST request to your verify endpoint
            const response = await axios.post('http://localhost:5000/chat/api/verify', {
                phoneNumber: phoneNumber,
                verificationCode: otp.join(''),
            });

            if (response.status === 200) {
                // Login successful
                console.log('Login successful');

                // Extract the token and user ID from the response
                const token = response.data.data.token;
                const userId = response.data.data.user._id;
                const userPhoneNumber = response.data.data.user.phoneNumber;

                // Store the token and user ID in localStorage
                localStorage.setItem('authToken', token);
                localStorage.setItem('userId', userId);
                localStorage.setItem('phoneNumber', userPhoneNumber);

                // Delay the redirection by 2 seconds
                setTimeout(() => {
                    history.push('/home');
                }, 2000);
            } else {
                // Login failed
                console.error('Login failed');
                setVerificationErrorMessage('Incorrect verification code. Please try again.');
            }

            // Handle the response accordingly
            console.log(response.data);
        } catch (error) {
            console.error('Verification failed', error);
        }
    };


    return (
        <div className="otp-page">
            <div className="otp-welcome-background">
                <div className="otp-background-image"
                     style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/welcome.jpg)`}}></div>
            </div>
            <div className="otp-container">
                <h1>Enter OTP</h1>
                <div className="otp-input-container">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="number"
                            inputMode="numeric"
                            min="0"
                            max="9"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            ref={inputRefs.current[index]}
                        />
                    ))}
                </div>
                {validationError && <p className="error-message">{validationError}</p>}
                {verificationErrorMessage && <p className="error-message">{verificationErrorMessage}</p>}
                <button className="verify-button" onClick={handleVerify}>
                    Verify
                </button>
            </div>
        </div>
    );
};
export default OTPPage;
