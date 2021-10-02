import React from 'react'
import { Link } from 'react-router-dom';
import OrderCourse from './orderCourse';
import OrderBook from './orderBook';

const OrderDetailsItem = (props) => (
    <div className="relative border-t-2 border-gray-400 py-2 xs:py-5 flex items-center space-x-2 sm1:space-x-5">
        <div className="w-16 h-12 xs:w-30 xs:h-24 sm1:w-40 sm1:h-28 bg-gray-400 mx-auto">
            {/* <OrderCourse /> */}
            <OrderBook />
        </div>
        <div className="flex w-full items-center justify-between">
            <div>
                <Link className="line-1 xs:line-2 font-semibold hover:text-indigo-500 duration-100">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</Link>
                <span className="text-gray-500 text-sm">Khoa hoc</span>
            </div>
        </div>
            <div className="absolute bottom-2 xs:bottom-5 right-0 text-sm">
                390.000<sup>đ</sup>
            </div>
    </div>
)

export default OrderDetailsItem