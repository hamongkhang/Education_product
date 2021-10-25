import React, { useState, useRef, useEffect } from 'react'


const CheckResultExam = (props) => {
    const $token=localStorage.getItem('access_token');

    const checkResultFunction = ()=>{
        const requestOptions = {
            method: 'POST',
            headers: {"Authorization": `Bearer `+$token}
        };
        fetch('http://127.0.0.1:8000/api/payment/checkResultExam', requestOptions)
        .then(res => res.json())
        .then(json => {
           alert(json.response);
           window.location.href = "http://localhost:3000/";
        });
    } 

    useEffect(() => {
        if($token){
            checkResultFunction();
        }
    }, []);

    return (
        <div>

        </div>
    )
}
export default CheckResultExam