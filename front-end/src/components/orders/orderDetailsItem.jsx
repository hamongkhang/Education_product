import React from 'react';
import { Link } from 'react-router-dom';
import OrderCourse from './orderCourse';
import OrderBook from './orderBook';

const OrderDetailsItem = (props) => {
    if (props.type == 'book') {
        return (
            <div className="relative border-t-2 border-gray-400 py-2 xs:py-5 flex items-center space-x-2 sm1:space-x-5">
                <div className="w-16 h-12 xs:w-30 xs:h-24 sm1:w-40 sm1:h-28 bg-gray-400 mx-auto">
                    <OrderBook image={props.product.image} />
                </div>
                <div className="flex w-full items-center justify-between">
                    <div>
                        <Link className="line-1 xs:line-2 font-semibold hover:text-indigo-500 duration-100">
                            {props.product.name} .
                        </Link>
                        <span className="text-gray-500 text-sm">Sách</span>
                    </div>
                </div>
                <div className="absolute bottom-2 xs:bottom-5 right-0 text-sm">
                    {props.product.promotion_price}
                    <sup>đ</sup>
                </div>
            </div>
        );
    } else {
        return (
            <div className="relative border-t-2 border-gray-400 py-2 xs:py-5 flex items-center space-x-2 sm1:space-x-5">
                <div className="w-16 h-12 xs:w-30 xs:h-24 sm1:w-40 sm1:h-28 bg-gray-400 mx-auto">
                    <OrderCourse image={props.product.image} />
                </div>
                <div className="flex w-full items-center justify-between">
                    <div>
                        <Link className="line-1 xs:line-2 font-semibold hover:text-indigo-500 duration-100">
                            {props.product.name} .
                        </Link>
                        <span className="text-gray-500 text-sm">Khóa học</span>
                    </div>
                </div>
                <div className="absolute bottom-2 xs:bottom-5 right-0 text-sm">
                    {props.product.promotion_price}
                    <sup>đ</sup>
                </div>
            </div>
        );
    }
};
export default OrderDetailsItem;
