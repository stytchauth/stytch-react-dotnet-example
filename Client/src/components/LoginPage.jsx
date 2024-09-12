import React, { useState } from 'react';
import AuthenticateOtpButton from './AuthenticateOtpButton'; 
import SendOtpButton from './SendOtpButton'
import '../styles/LoginPage.css'; // Import the CSS file for styling

const LoginPage = () => {
    const [apiResponse, setApiResponse] = useState(null);

    const handleResponse = (response) => {
        setApiResponse(response);
    };

    return (
        <div className="login-page">
            <div className="modal">
                <h1>Login with .NET SDK</h1>
                <SendOtpButton onResponse={handleResponse} />
            </div>
            <div className="response-container">
                <h2>API Response</h2>
                {apiResponse ? (
                    <pre className="response-box">{JSON.stringify(apiResponse, null, 2)}</pre>
                ) : (
                    <p>No response yet</p>
                )}
            </div>
        </div>
    );
};

export default LoginPage;