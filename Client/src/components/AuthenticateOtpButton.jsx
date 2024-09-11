import React, { useState } from 'react';

const AuthenticateOtpButton = () => {
    const [otp, setOtp] = useState('');
    const [methodId, setMethodId] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleAuthenticateClick = async () => {
        try {
            const response = await fetch(`http://localhost:5135/authenticate_otp?otp=${encodeURIComponent(otp)}&methodId=${encodeURIComponent(methodId)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            setResponse(result);
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred during OTP authentication.');
        }
    };

    return (
        <div>
            <div>
                <label>
                    OTP:
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Method ID:
                    <input
                        type="text"
                        value={methodId}
                        onChange={(e) => setMethodId(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={handleAuthenticateClick}>Authenticate OTP</button>
            <div>
                {error && <p>{error}</p>}
                {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
            </div>
        </div>
    );
};

export default AuthenticateOtpButton;
