import React, { useState } from 'react';
// import './AuthenticateOtpButton.css'; // Import the CSS file for styling

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
            onResponse(result); // Pass the result to the parent component
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred during OTP authentication.');
            onResponse({ error: error.message }); // Pass the error to the parent component
        }
    };

    return (
        <div className="authenticate-container">
            <label>
                OTP:
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
            </label>
            <button className="btn" onClick={handleAuthenticateClick}>Authenticate OTP</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default AuthenticateOtpButton;
