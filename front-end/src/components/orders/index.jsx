import React, { useState, useEffect } from 'react';
import OrderItem from './orderItem';
import Preloader from '../preloader';

const Orders = (props) => {
    const [paymentInfor, setPaymentInfor] = useState([]);
    const $token = localStorage.getItem('access_token');
    const [isLoading, setIsLoading] = useState(true);

    const getApiSecond = () => {
        setIsLoading(true);
        fetch('http://localhost:8000/api/history/getHistory', {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                setPaymentInfor(data.data[1].reverse());
            });
        setIsLoading(false);
    };

    useEffect(() => {
        getApiSecond();
    }, []);
    return (
        <div>
            {isLoading && <Preloader />}
            <div className="uppercase font-semibold mt-5">
                <div className="text-xl sm:text-2xl">Đơn hàng</div>
            </div>
            <div className="space-y-3">
                {paymentInfor.map((item, i) => {
                    return <OrderItem paymentId={item} />;
                })}
            </div>
        </div>
    );
};
export default Orders;
