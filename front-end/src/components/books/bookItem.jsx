import React from 'react'

const BookItem = (props) => {
    return (
        <div className="shadow-md bg-indigo-100 overflow-hidden h-96 mr-2 rounded-md mb-10">
            <div className="w-full h-64 flex items-center justify-center">
                <img src="./assets/images/slider/city.jpg" className="w-40 h-52 object-cover transform hover:translate-x-3 duration-300" alt="" />
            </div>
            <div className="px-6 text-center h-10">
                <label htmlFor="" className="text-indigo-600 font-semibold">390.000<sup>đ</sup></label>
                <label htmlFor="" className="line-through text-xs ml-2">490.000<sup>đ</sup></label>
                <h3 className="font-semibold line-2">{props.name}</h3>
            </div>
            {/* <div className="text-center w-full text-white h-12 bg-red-400 relative transform group-hover:translate-y-10 translate-y-19 duration-300 grid grid-cols-2">
                <button className="bg-indigo-400 hover:bg-indigo-300 h-full duration-300">Chi tiết</button>
                <button className="bg-red-400 hover:bg-red-300 duration-300">Mua ngay</button>
            </div> */}
            <div className="px-4 py-3 mt-10 flex justify-between border-t border-gray-300">
                
                <a href="#" className="space-x-2 group">
                    <span className="font-semibold group-hover:text-green-700">Mua ngay</span>
                    <i className="far fa-cart-plus transform duration-300 group-hover:translate-x-1.5 group-hover:text-green-700"></i>
                </a>
                <a href="#" className="space-x-2 group">
                    <span className="font-semibold group-hover:text-indigo-600">Chi tiết</span>
                    <i className="far fa-arrow-right transform duration-300 group-hover:translate-x-1.5 group-hover:text-indigo-600"></i>
                </a>
            </div>
        </div>
    )
}
export default BookItem