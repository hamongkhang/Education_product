import React from 'react'
import OrderItem from './orderItem'

const Orders = (props) => (
    <div>
        <div className="uppercase font-semibold mt-5">
            <div className="text-xl sm:text-2xl">Đơn hàng</div>
        </div>
        <div className="space-y-3">
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
        </div>
    </div>
)

export default Orders