import React, { useState } from 'react'
import OrderDetailsItem from './orderDetailsItem';

const OrderItem = (props) => {
    const [classIcon, setClassIcon] = useState("down");
    const [classOrder, setClassOrder] = useState("hidden");
    const handleClick = () => {
        if(classIcon === "down") {
            setClassIcon("right");
            setClassOrder("block");
        } else {
            setClassIcon("down");
            setClassOrder("hidden");
        }
    }

    return (
        <div className="shadow-md rounded-sm p-5 bg-white">
            <div className="block xs:flex justify-between items-center leading-7 cursor-pointer" onClick={handleClick}>
                <div className="flex text-indigo-500">
                    <div className="w-5" >
                        <i className={`fad fa-chevron-${classIcon} duration-300`} />
                    </div>
                    <span>#1101</span>
                </div>
                <div>11/04/2021 16:11:53</div>
                <div className="inline bg-green-500 text-white px-3 py-1 rounded-md">Đã xác nhận</div>
                <div>390.000<sup>đ</sup></div>
            </div>
            <div className={`overflow-hidden sm1:ml-5 ${classOrder} mt-3`}>
                <OrderDetailsItem/>
                <OrderDetailsItem/>
            </div>
        </div>
    )
}

export default OrderItem