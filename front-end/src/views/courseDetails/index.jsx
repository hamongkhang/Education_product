import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BannerBook } from '../../components/banner'
import CourseDesc from './courseDesc'
import { CourseItem, CourseList } from '../../components/courses'

const CourseDetails = () => {
    const [classes, setClasses] = useState("right-0 translate-x-full");
    const notification = () => {
        setClasses("right-5 translate-x-0");
        setTimeout(() => {
            setClasses("right-0 translate-x-full");
        }, 5000);
    }
    return (
        <>
            <BannerBook/>
            <div className="xl:w-4/5 xl:px-0 px-4 w-full relative left-1/2 transform -translate-x-1/2 md:mt-5 mt-2">
                <div className="flex flex-col lg:flex-row lg:space-x-6">
                    <div className="w-full lg:w-4/6">
                        <div className="space-y-3 mt-1">
                            <h2 className="font-semibold uppercase text-xl md:text-3xl">Luyện thi thpt quốc gia 2022</h2>
                            <img src={`${window.location.origin}/assets/images/slider/city.jpg`} className="w-full h-60 md:h-96 object-cover pt-3" alt="" />
                        </div>
                        <CourseDesc />
                    </div>
                    <div className="w-full lg:w-2/6  py-4">
                        <div className="p-5 border-b-2 border-gray-400 space-y-4 rounded-md shadow-lg">
                            <div className="flex justify-center items-end space-x-3">
                                <span className="text-xl text-green-700">300.000<sup>đ</sup></span>
                                <span className="text-base line-through font-light text-gray-500">500.000<sup>đ</sup></span>
                            </div>
                            <div>
                                <div className="flex space-x-2 py-3 border-b border-gray-300">
                                    <div className="w-5 text-center"> <i className="fad fa-chalkboard-teacher text-indigo-600"></i> </div>
                                    <div> Giáo viên: <span className="text-gray-500">14</span> </div>
                                </div>
                                <div className="flex space-x-2 py-3 border-b border-gray-300">
                                    <div className="w-5 text-center"> <i className="fad fa-book-open text-indigo-600"></i> </div>
                                    <div> Bài giảng: <span className="text-gray-500">14</span> </div>
                                </div>
                                <div className="flex space-x-2 py-3 border-b border-gray-300">
                                    <div className="w-5 text-center"> <i className="fad fa-clock text-indigo-600"></i> </div>
                                    <div> Thời gian: <span className="text-gray-500">72h</span> </div>
                                </div>
                                <div className="flex space-x-2 py-3">
                                    <div className="w-5 text-center"> <i className="fad fa-user text-indigo-600"></i> </div>
                                    <div> Đã đăng ký: <span className="text-gray-500">20</span> </div>
                                </div>
                                <div className="flex space-x-2 py-3">
                                    <div className="w-5 text-center"> <i className="fad fa-edit text-indigo-600"></i> </div>
                                    <div> Cập nhật lần cuối: <span className="text-gray-500">18/12/2001</span> </div>
                                </div>
                                
                            </div>
                            <div className="flex items-center justify-center space-x-4 text-white">
                                <button className="w-full py-2 rounded-sm bg-green-700 hover:bg-green-800 space-x-2 hover:shadow-lg" onClick={notification}>
                                    <i className="far fa-cart-plus" />
                                    <span>Đăng ký</span>
                                </button>
                            </div>
                        </div>
                        <div className="space-y-3 py-5 mt-8 border-b-2 border-gray-400 space-y-4 rounded-md shadow-lg">
                            <div className="uppercase font-medium px-5">
                                Khóa học đề xuất
                            </div>
                            <div className="px-3">
                                <Link to="/" className="flex space-x-2 items-center hover:bg-blue-100 p-2 rounded-md">
                                    <img src={`${window.location.origin}/assets/images/slider/city.jpg`} className="h-14 w-14 rounded-md " alt="" />
                                    <div>
                                        <p className="break-words line-2 uppercase font-medium">LUYỆN THI THPT QUỐC GIA 2022</p>
                                    </div>
                                </Link>
                                <Link to="/" className="flex space-x-2 items-center hover:bg-blue-100 p-2 rounded-md">
                                    <img src={`${window.location.origin}/assets/images/slider/city.jpg`} className="h-14 w-14 rounded-md " alt="" />
                                    <div>
                                        <p className="break-words line-2 uppercase font-medium">LUYỆN THI THPT QUỐC GIA 2022</p>
                                    </div>
                                </Link>
                                <Link to="/" className="flex space-x-2 items-center hover:bg-blue-100 p-2 rounded-md">
                                    <img src={`${window.location.origin}/assets/images/slider/city.jpg`} className="h-14 w-14 rounded-md " alt="" />
                                    <div>
                                        <p className="break-words line-2 uppercase font-medium">LUYỆN THI THPT QUỐC GIA 2022</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className={`notification fixed top-20 transform duration-300 ${classes}`}>
                <div className="shadow-2xl bg-blue-50 rounded border-l-4 border-green-700 overflow-hidden py-5 pr-8 pl-3 space-x-4 flex items-center">
                    {/* <i className="far fa-times hover:text-red-800 text-xl absolute top-1 right-3 cursor-pointer" onClick={() => {notification(false)}}></i> */}
                    <i className="far fa-check-circle text-green-700 text-3xl"></i>
                    <span>Thêm vào giỏ hàng thành công</span>
                </div>
            </div>
        </>
    )
}
export default CourseDetails