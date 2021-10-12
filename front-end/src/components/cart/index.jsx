import React from 'react'
import CartItem from './cartItem'

const Cart = (props) => (
    <div>
        <div className="fixed cart-area transform translate-x-full top-0 right-0 bottom-0 overflow-hidden bg-white w-full md:w-1/2 lg:w-2/6 shadow-2xl z-30 duration-500">
            <div className="flex justify-between items-center h-19 mb-5 shadow-md px-5 py-3">
                <span className="text-lg font-semibold tracking-wide uppercase">Giỏ hàng</span>
                <button className="text-2xl cart-close hover:text-red-500 duration-200">
                    <i className="far fa-times"></i>
                </button>
            </div>
            <div className="px-5 custom-scroll overflow-y-scroll" style={{ height: "calc(100vh - 250px)" }}>
                <CartItem/>
                <CartItem/>
            </div>
            <div className="mt-5 p-5 border-t-2 border-gray-500">
                <div className="flex justify-between items-center font-semibold">
                    <p>Tổng tiền</p>
                    <span className="text-indigo-500">990.000<sup>đ</sup></span>
                </div>
                <div>
                    <button className="w-full h-12 bg-indigo-700 rounded-md mt-3 font-semibold text-white hover:bg-indigo-600 duration-200">Thanh toán</button>
                </div>
            </div>
        </div>
        <div className="cart-overlay fixed top-0 bottom-0 left-0 z-30 transform -translate-x-full duration-500 bg-penetration-5 cursor-pointer w-0 md:w-1/2 lg:w-4/6"></div>
    </div>
)
export default Cart