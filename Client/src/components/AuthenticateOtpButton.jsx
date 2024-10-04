import React, { useState } from 'react';

const AuthenticateOtpButton = ({ methodId, onResponse }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);

    const handleAuthenticateClick = async () => {
        try {
            const response = await fetch(`http://localhost:5135/authenticate_otp?otp=${encodeURIComponent(otp)}&methodId=${encodeURIComponent(methodId)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            onResponse(result); 
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred during OTP authentication.');
            onResponse({ error: error.message }); 
        }
    };

    return (
        <div className="authenticate-container">
            <div className='email-form'>
                <input
                    required
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder='000000'
                />
                <button className="btn" onClick={handleAuthenticateClick}>Authenticate OTP</button>
            </div>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default AuthenticateOtpButton;
