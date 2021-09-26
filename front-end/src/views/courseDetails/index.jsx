import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BannerBook } from '../../components/banner'
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
                <div className="space-y-3 w-4/6">
                    <h2 className="font-semibold uppercase text-2xl">Luyện thi thpt quốc gia 2022</h2>
                    <p className="inline-block line-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui laudantium sit quos maiores quia explicabo facere, aperiam modi!Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui laudantium sit quos maiores quia explicabo facere, aperiam modi!Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui laudantium sit quos maiores quia explicabo facere, aperiam modi!Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui laudantium sit quos maiores quia explicabo facere, aperiam modi!</p>
                    <span className="inline-block"><b>Giáo viên:</b> Nguyễn Đình Kha</span>
                </div>
                <div className="flex mt-4">
                    <div className="w-4/6">
                        <img src={`${window.location.origin}/assets/images/slider/city.jpg`} className="w-full h-96" alt="" />
                    </div>
                    <div className="w-2/6 px-6 py-4">
                        <div className="px-5 pb-4 border-b-2 border-gray-600 text-center space-y-4">
                            <div>
                                <span className="font-semibold text-xl text-blue-600">Học trọn gói cả năm chỉ với</span>
                            </div>
                            <div className="flex justify-center items-end space-x-3">
                                <span className="text-3xl text-green-700">500.000<sup>đ</sup></span>
                                <span className="text-2xl line-through font-light text-gray-500">300.000<sup>đ</sup></span>
                            </div>
                            <div className="flex items-center justify-center space-x-4 text-white">
                                <button className="px-5 py-2 rounded-sm bg-green-700 hover:bg-green-800 space-x-2" onClick={notification}>
                                    <i className="far fa-cart-plus" />
                                    <span>Đăng ký</span>
                                </button>
                                <Link to="#" className="px-5 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 space-x-2">
                                    <i className="fab fa-facebook-f"></i>
                                    <span>Tư vấn</span>
                                </Link>
                            </div>
                        </div>
                        <div className="space-y-3 mt-4">
                            <div>
                                <span className="text-indigo-600">Mục tiêu khoá học: </span>
                                <ul>
                                    <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium natus sequi minima vitae inventore! Ipsam, officiis architecto.</li>
                                </ul>
                            </div>
                            <div>
                                <span className="text-indigo-600">Cấu trúc khóa học:</span>
                                <ul className="ml-5" style={{ listStyleType: "square" }}>
                                    <li>2 chuyên đề</li>
                                    <li>51 bài giảng</li>
                                </ul>
                            </div>
                            <div>
                                <span className="text-indigo-600">Liên hệ:</span>
                                <ul className="ml-5 " style={{ listStyleType: "square" }}>
                                    <li>
                                        <Link className="text-indigo-500">Facebook giáo viên</Link>
                                    </li>
                                    <li>
                                        <Link className="text-indigo-500">Group học tập</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`notification fixed top-20 transform duration-500 ${classes}`}>
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