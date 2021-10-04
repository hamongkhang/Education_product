import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CartItem = (props) => {
    const [amount, setAmount] = useState(1);
    const increase = () => {
        setAmount(amount + 1)
    }
    const decrease = () => {
        setAmount(amount - 1)
    }
    return (
        <div className="flex mb-4">
            <div>
                <img src="./assets/images/slider/city.jpg" className="w-28 h-24 object-cover" alt="" />
            </div>
            <div className="pl-5 w-9/12">
                <div className="flex items-start">
                    <Link to="/">
                        <h3 className="line-2 hover:text-indigo-500 duration-300">Lorem ipsum dolor sit amet consectetur adipisicing elitorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                    </Link>
                    <button className="hover:text-red-500 text-lg">
                        <i className="far fa-times"></i>
                    </button>
                </div>
                    
                <div className="flex mt-3 justify-between">
                    <div className="flex">
                        <button className="border-2 border-gray-300 w-8 h-6 flex items-center justify-center hover:bg-indigo-300 hover:border-indigo-300" onClick={decrease}>
                            -
                        </button>
                        <span className="border-t-2 border-b-2 border-gray-300 w-8 h-6 flex items-center justify-center">
                            { amount }
                        </span>
                        <button className="border-2 border-gray-300 w-8 h-6 flex items-center justify-center hover:bg-indigo-300 hover:border-indigo-300" onClick={increase} >
                            +
                        </button>
                    </div>
                    <div>
                        <span className="text-indigo-500 font-semibold">
                            390.000<sup>đ</sup>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem