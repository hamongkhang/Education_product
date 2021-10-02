import React from 'react'
import { Link } from 'react-router-dom'

const EnrolledCourseItem = (props) => (
    <div className="shadow-md rounded overflow-hidden box-content">
        <div>
            <img src={`${window.location.origin}/assets/images/slider/city.jpg`} className="w-full h-44 object-cover" alt="" />
        </div>
        <div className="m-5 space-y-3">
            <div>
                <Link to="/" className="line-2 font-semibold hover:text-green-500 duration-200">{ props.name }</Link>
            </div>
            <div>
                <div className="flex justify-between items-center">
                    <div className="space-x-2">
                        <i className="fad fa-book-open text-indigo-300"></i>
                        <span className="text-15 text-gray-500">43 Video</span>
                    </div>
                    <div className="space-x-2">
                        <i className="fad fa-clock text-indigo-600"></i>
                        <span className="text-15 text-gray-500">3h52p</span>
                    </div>
                    {/* <div></div> */}
                </div>
                <div className="relative h-1 bg-gray-300">
                    <div className="absolute w-4/6 bg-green-500 inset-0 h-full duration-300" style={{ width: '95%' }}></div>
                </div>
            </div>
            <div className="">
                <Link to="/" className="w-full block font-medium tracking-widest bg-green-500 hover:opacity-80 text-center py-2 text-white uppercase duration-200 rounded">Học</Link>
            </div>
            <div className="text-13 text-gray-500 text-center">
                <span>Đăng ký ngày: 18/12/2001</span>
            </div>
        </div>
    </div>
)

export default EnrolledCourseItem