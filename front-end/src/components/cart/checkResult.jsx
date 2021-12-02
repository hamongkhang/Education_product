import React, { useState, useEffect } from 'react';
import Preloader from '../preloader';

const CheckResult = (props) => {
    const $token = localStorage.getItem('access_token');
    const [isLoading, setIsLoading] = useState(true);
    const checkResultFunction = () => {
        setIsLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { Authorization: `Bearer ` + $token },
        };
        fetch('http://127.0.0.1:8000/api/payment/checkResult', requestOptions)
            .then((res) => res.json())
            .then((json) => {
                alert(json.response);
                window.location.href = 'http://localhost:3000/';
            });
        setIsLoading(false);
    };

    useEffect(() => {
        if ($token) {
            checkResultFunction();
        }
    }, []);

    return <div>{isLoading && <Preloader />}</div>;
};
export default CheckResult;
