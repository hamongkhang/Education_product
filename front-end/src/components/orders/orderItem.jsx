import React, { useState, useEffect } from 'react';
import OrderDetailsItem from './orderDetailsItem';
import Preloader from '../preloader';

const OrderItem = (props) => {
    const [classIcon, setClassIcon] = useState('down');
    const [classOrder, setClassOrder] = useState('hidden');
    const [history, setHistory] = useState([]);
    const [type, setType] = useState([]);
    const $token = localStorage.getItem('access_token');
    const [isLoading, setIsLoading] = useState(true);

    const getApiFirst = () => {
        setIsLoading(true);
        const _formData = new FormData();
        _formData.append('id_payment', props.paymentId.orderId);
        fetch('http://localhost:8000/api/history/getHistoryProduct', {
            method: 'POST',
            headers: { Authorization: `Bearer ` + $token },
            body: _formData,
        })
            .then((response) => response.json())
            .then((data) => {
                setHistory(data.data.reverse());
                setIsLoading(false);
            });
    };
    const getApiSecond = () => {
        setIsLoading(true);
        const _formData = new FormData();
        _formData.append('id_payment', props.paymentId.orderId);
        fetch('http://localhost:8000/api/history/getHistoryType', {
            method: 'POST',
            headers: { Authorization: `Bearer ` + $token },
            body: _formData,
        })
            .then((response) => response.json())
            .then((data) => {
                setType(data.data.reverse());
                setIsLoading(false);
            });
    };
    const handleClick = () => {
        if (classIcon === 'down') {
            setClassIcon('right');
            setClassOrder('block');
        } else {
            setClassIcon('down');
            setClassOrder('hidden');
        }
    };
    useEffect(() => {
        getApiFirst();
        getApiSecond();
    }, []);

    return (
        <div className="shadow-md rounded-sm p-5 bg-white">
            <div
                className="block xs:flex justify-between items-center leading-7 cursor-pointer"
                onClick={handleClick}
            >
                {isLoading && <Preloader />}
                <div className="flex text-indigo-500">
                    <div className="w-5">
                        <i
                            className={`fad fa-chevron-${classIcon} duration-300`}
                        />
                    </div>
                    <span>{props.paymentId.orderId}</span>
                </div>
                <div>{props.paymentId.created_at}</div>
                <div className="inline bg-green-500 text-white px-3 py-1 rounded-md">
                    Đã xác nhận
                </div>
                <div>
                    {props.paymentId.amount}
                    <sup> đ</sup>
                </div>
            </div>
            <div className={`overflow-hidden sm1:ml-5 ${classOrder} mt-3`}>
                {history &&
                    history.map((item, i) => {
                        if (item) {
                            return (
                                <OrderDetailsItem
                                    key={i}
                                    product={item}
                                    type={type[i]}
                                />
                            );
                        } else {
                            <></>;
                        }
                    })}
            </div>
        </div>
    );
};

export default OrderItem;
