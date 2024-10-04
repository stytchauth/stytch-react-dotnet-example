import React, { useState } from 'react';
import AuthenticateOtpButton from './AuthenticateOtpButton'; 
import '../styles/LoginPage.css';

const ParentComponent = ({ onResponse }) => {
    const [methodId, setMethodID] = useState(null);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false); 

    const handleButtonClick = async () => {
        console.log(email);
        try {
            const response = await fetch(`http://localhost:5135/send_otp?email=${encodeURIComponent(email)}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            onResponse(result); 
            const emailId = result.emailId;

            console.log('Result:', result);
            setMethodID(emailId);
            setShowOtpInput(true); 
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred.');
        }
    };

    return (
        <div className="authenticate-container">
            {!showOtpInput && ( 
                <div className='email-form'>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='example@email.com'
                    />
                    <button className="btn" onClick={handleButtonClick}>Send OTP</button>
                </div>
            )}

            {showOtpInput && ( 
                <div className='otp-form'>
                    <AuthenticateOtpButton methodId={methodId} onResponse={onResponse} />
                </div>
            )}

            {error && <p>{error}</p>}
        </div>
    );
};

export default ParentComponent;
