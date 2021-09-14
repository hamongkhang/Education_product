import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './logo'

const Navbar = (props) => {
    return (
        <div className="flex items-center relative">
            <Logo/>
            <div className="nav-overlay fixed top-0 left-0 bottom-0 h-screen w-1/4 md:w-2/3 transform -translate-x-full bg-penetration-5 z-30 duration-500 cursor-pointer lg:hidden" />
            <div className="nav lg:pl-24  transform translate-x-full duration-500 fixed lg:relative top-0 right-0 lg:right-full z-30 h-screen lg:h-auto w-3/4 md:w-1/3 lg:w-auto bg-white lg:bg-transparent">
                <div className="flex justify-between items-center shadow-md p-5 lg:hidden">
                    <div className="font-semibold text-xl my-0.5">
                        <p>MENU</p>
                    </div>
                    <div className="nav-close text-2xl my-0.5 cursor-pointer hover:text-red-500">
                        <i className="far fa-times"></i>
                    </div>
                </div>
                <div className="custom-scroll overflow-y-scroll lg:overflow-y-visible menu-mobile">
                    <ul className="nav-menu pt-5 lg:pt-0 flex lg:flex-row items-start mx-5 space-y-3 lg:space-y-0 flex-col text-white font-medium lg:space-x-4 uppercase tracking-wide">
                        <li className="nav-link active relative">
                            <Link to="/">Trang chủ</Link>
                        </li>
                        <li className="nav-link relative">
                            <a href="#" className="hover">Khóa học</a>
                        </li>
                        <li className="nav-link relative">
                            <a href="#" className="hover">Sách</a>
                        </li>
                        <li className="nav-link relative">
                            <a href="#" className="hover">Thi Online</a>
                        </li>
                        <li className="nav-link relative">
                            <a href="#" className="hover">Tin tức</a>
                        </li>
                        {/*  */}
                        <li className="nav-link nav-link-mobile lg:hidden relative">
                            <a href="#" className="hover">Luyện Thi 2k4</a>
                        </li>
                        <li className="nav-link nav-link-mobile lg:hidden relative">
                            <a href="#" className="hover">THPT</a>
                        </li>
                        <li className="nav-link nav-link-mobile lg:hidden relative">
                            <a href="#" className="hover">THCS</a>
                        </li>
                        <li className="nav-link nav-link-mobile lg:hidden relative">
                            <a href="#" className="hover">Học sinh giỏi</a>
                        </li>
                        <li className="nav-link nav-link-mobile lg:hidden relative">
                            <a href="#" className="hover">Vật lý và cuộc sống</a>
                        </li>
                        <li className="nav-link nav-link-mobile lg:hidden relative">
                            <a href="#" className="hover">CNTT trong dạy học</a>
                        </li>
                        <li className="nav-link nav-link-mobile lg:hidden relative">
                            <a href="#" className="hover">Tài liệu miễn phí</a>
                        </li>
                        <li className="nav-link nav-link-mobile lg:hidden relative">
                            <a href="#" className="hover">Tài liệu khác</a>
                        </li>
                        {/*  */}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Navbar