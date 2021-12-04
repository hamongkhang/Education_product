import React, { useState, useEffect } from 'react';
import Preloader from '../preloader';

const CheckResultExam = (props) => {
    const $token = localStorage.getItem('access_token');
    const [isLoading, setIsLoading] = useState(true);
    const checkResultFunction = () => {
        setIsLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { Authorization: `Bearer ` + $token },
        };
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/payment/checkResultExam`,
            requestOptions,
        )
            .then((res) => res.json())
            .then((json) => {
                alert(json.response);
                window.location.href = process.env.REACT_APP_URL_SERVER;
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
export default CheckResultExam;
