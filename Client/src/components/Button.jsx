import React, { useState } from 'react';

const Button = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleButtonClick = async () => {
        try {
            const response = await fetch("http://localhost:5135/weatherforecast");
            // Check if the response status is OK (status in the range 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parse the JSON response
            const result = await response.json();

            console.log('Result:', result); // Log the parsed result
            setData(result);
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred.');
        }
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Make Network Request</button>
            <div>
                {error && <p>{error}</p>}
                {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            </div>
        </div>
    );
};

export default Button;
