import React from 'react'

const BookItem = (props) => {
    return (
        <div className="relative shadow-md group bg-indigo-100 overflow-hidden h-96 w-60 mr-2 rounded-lg mb-10">
            <div className="w-full h-72 flex items-center justify-center">
                <img src="./assets/images/slider/city.jpg" className="w-40 h-60 object-cover relative transform hover:translate-x-3 duration-300" alt="" />
            </div>
            <div className="px-6 text-center">
                <h3 className="font-semibold">The Perfect Marriage by Jeneva Rose</h3>
                <span className="text-indigo-500 block my-2">250.000<sup>đ</sup></span>
            </div>
            <div className="text-center w-full text-white h-12 bg-red-400 relative transform group-hover:-translate-y-10 duration-300 grid grid-cols-2">
                <button className="bg-indigo-400 hover:bg-indigo-300 h-full duration-300">Chi tiết</button>
                <button className="bg-red-400 hover:bg-red-300 duration-300">Mua ngay</button>

            </div>
        </div>
    )
}
export default BookItem