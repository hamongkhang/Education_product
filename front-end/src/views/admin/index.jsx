import React, { useState, useEffect } from 'react';
import Preloader from '../../components/preloader';

const analyzes = [
    {
        name: 'Sales',
        bgColor: 'bg-indigo-400',
        icon: 'fa-analytics',
        type: true,
    },
    {
        name: 'Orders',
        bgColor: 'bg-blue-500',
        icon: 'fa-cube',
        type: true,
    },
    {
        name: 'Customers',
        bgColor: 'bg-yellow-500',
        icon: 'fa-user',
        type: true,
    },
];

const Dashboard = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const $token = localStorage.getItem('access_token');
    const [users, setUsers] = useState([]);
    const [order, setOrder] = useState([]);
    const [render, setRender] = useState([]);
    const [money, setMoney] = useState(null);
    const [today, setToday] = useState(null);
    const [yesterday, setYesterday] = useState(null);
    const [week, setWeek] = useState(null);
    const [month, setMonth] = useState(null);

    const getUser = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/users/getAllUser`, {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.data);
                setIsLoading(false);
            });
    };
    const getOrder = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/order/getOrder`, {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                setOrder(data.data);
                setIsLoading(false);
            });
    };
    const getMoney = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/order/getMoney`, {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                setIsLoading(false);
                setMoney(
                    String(data.data).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                );
            });
    };
    const getCount = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/order/getCount`, {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                setToday(
                    String(data.data[0]).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                );
                setYesterday(
                    String(data.data[1]).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                );
                setWeek(
                    String(data.data[2]).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                );
                setMonth(
                    String(data.data[3]).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                );
                setIsLoading(false);
            });
    };
    useEffect(() => {
        if ($token) {
            getUser();
            getOrder();
            getMoney();
            getCount();
        }
    }, [render]);
    return (
        <div>
            {isLoading && <Preloader />}
            <div className="grid grid-cols-3 gap-x-8">
                {analyzes.map((item, index) => (
                    <div
                        key={index}
                        className={`shadow-md rounded p-5 text-white ${item.bgColor}`}
                    >
                        <h6 className="flex items-center justify-between">
                            {item.name}
                            <small className="opacity-7">Last 30 days</small>
                        </h6>
                        <div className="flex items-center justify-between mt-8">
                            <div className="text-4xl">
                                {item.name === 'Customers'
                                    ? users.length + ' users'
                                    : item.name === 'Orders'
                                    ? order.length + ' orders'
                                    : item.name === 'Sales'
                                    ? money + ' đ'
                                    : ''}{' '}
                            </div>
                            <div className="h-16 w-16 border-white border-2 rounded-full overflow-hidden flex items-center justify-center">
                                <i className={`fal ${item.icon} text-2xl`}></i>
                            </div>
                        </div>
                        <p className="">
                            {item.type ? (
                                <i className="fal fa-long-arrow-up"></i>
                            ) : (
                                <i className="fal fa-long-arrow-down"></i>
                            )}{' '}
                            1.59%
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white rounded shadow-md">
                <div className="grid grid-cols-4 p-5">
                    <div>
                        <p className="mb-2">This Year</p>
                        <div className="flex items-end">
                            <h2 className="text-3xl mr-2">
                                {week} <sup>đ</sup>
                            </h2>
                            <span className="">
                                <i className="fal fa-long-arrow-down mr-2"></i>
                                <span className="text-xs text-red-600 inline-flex px-2 py-1 bg-red-200 rounded">
                                    1.9%
                                </span>
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="mb-2">This Month</p>
                        <div className="flex items-end">
                            <h2 className="text-3xl mr-2">
                                {month} <sup>đ</sup>
                            </h2>
                            <span className="">
                                <i className="fal fa-long-arrow-up mr-2"></i>
                                <span className="text-xs text-green-600 inline-flex px-2 py-1 bg-green-200 rounded">
                                    1.9%
                                </span>
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="mb-2">Yesterday</p>
                        <div className="flex items-end">
                            <h2 className="text-3xl mr-2">
                                {yesterday} <sup>đ</sup>
                            </h2>
                            <span className="">
                                <i className="fal fa-long-arrow-up mr-2"></i>
                                <span className="text-xs text-green-600 inline-flex px-2 py-1 bg-green-200 rounded">
                                    2.2%
                                </span>
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="mb-2">Today</p>
                        <div className="flex items-end">
                            <h2 className="text-3xl mr-2">
                                {today} <sup>đ</sup>
                            </h2>
                            <span className="">
                                <i className="fal fa-long-arrow-down mr-2"></i>
                                <span className="text-xs text-red-600 inline-flex px-2 py-1 bg-red-200 rounded">
                                    1.9%
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
