import React, { useState } from 'react';
import AuthenticateOtpButton from './AuthenticateOtpButton'; // Ensure the path is correct
import '../styles/LoginPage.css';

const ParentComponent = ({ onResponse }) => {
    const [methodId, setMethodID] = useState(null);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');


    const handleButtonClick = async () => {
        console.log(email);
        try {
            const response = await fetch(`http://localhost:5135/send_otp?email=${encodeURIComponent(email)}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            onResponse(result); // Pass the result to the parent component
            const emailId = result.emailId;

            console.log('Result:', result);
            setMethodID(emailId);
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred.');
        }
    };

    return (
        <div className="authenticate-container">
            <label>
                Email:
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <button className="btn" onClick={handleButtonClick}>Send OTP</button>
            {methodId && <AuthenticateOtpButton methodId={methodId} onResponse={onResponse} />}
            {error && <p>{error}</p>}
        </div>
    );
};

export default ParentComponent;
