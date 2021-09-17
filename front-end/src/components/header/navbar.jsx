import React, { useState } from 'react'
import { Link, useLocation  } from 'react-router-dom'
import Logo from './logo'

const Navbar = (props) => {
    const location = useLocation();
    const [pathname, setPathname] = useState(location.pathname);
    return (
        <div className="flex items-center">
            <Logo/>
            <div className="nav-overlay fixed top-0 left-0 bottom-0 h-screen w-1/4 md:w-2/3 transform -translate-x-full bg-penetration-5 z-30 duration-500 cursor-pointer lg:hidden" />
            <div className="nav lg:pl-24 transform translate-x-full duration-500 fixed lg:relative top-0 right-0 lg:right-full z-30 h-screen lg:h-auto w-3/4 md:w-1/3 lg:w-auto bg-white lg:bg-transparent">
                <div className="flex justify-between items-center shadow-md p-5 lg:hidden">
                    <div className="font-semibold text-xl my-0.5">
                        <p>MENU</p>
                    </div>
                    <div className="nav-close text-2xl my-0.5 cursor-pointer hover:text-red-500">
                        <i className="far fa-times"></i>
                    </div>
                </div>
                <div className="custom-scroll overflow-y-scroll lg:overflow-y-visible menu-mobile font-medium">
                    <div className="">
                        <Link to="dang-nhap" className="md:hidden flex nav-link items-center justify-between text-white px-5 py-4 bg-green-700 hover:bg-green-800">
                            <span>Đăng nhập</span>
                            <i class="far fa-sign-in text-lg"></i>
                        </Link>
                    </div>
                    <ul className="nav-menu pt-5 lg:pt-0 flex lg:flex-row items-start mx-5 space-y-3 lg:space-y-0 flex-col text-white lg:space-x-4 uppercase tracking-wide">
                        <li className={ pathname === "/" ? 'nav-link relative active' : 'nav-link relative' }>
                            <Link to="/">Trang chủ</Link>
                        </li>
                        <li className={ pathname === "/khoa-hoc" ? 'nav-link relative active' : 'nav-link relative' }>
                            <a href="#" className="hover">Khóa học</a>
                        </li>
                        <li className={ pathname === "/sach" ? 'nav-link relative active' : 'nav-link relative' }>
                            <Link to="/sach" className="hover">Sách</Link>
                        </li>
                        <li className={ pathname === "/thi-online" ? 'nav-link relative active' : 'nav-link relative' }>
                            <a href="#" className="hover">Thi Online</a>
                        </li>
                        <li className={ pathname === "/tin-tuc" ? 'nav-link relative active' : 'nav-link relative' }>
                            <a href="#" className="hover">Tin tức</a>
                        </li>
                        {/*  */}
                        <li className={ pathname === "/luyen-thi" ? 'nav-link relative nav-link-mobile lg:hidden active' : 'nav-link nav-link-mobile lg:hidden relative' }>
                            <a href="#" className="hover">Luyện Thi 2k4</a>
                        </li>
                        <li className={ pathname === "/thpt" ? 'nav-link relative nav-link-mobile lg:hidden active' : 'nav-link nav-link-mobile lg:hidden relative' }>
                            <a href="#" className="hover">THPT</a>
                        </li>
                        <li className={ pathname === "/thcs" ? 'nav-link relative nav-link-mobile lg:hidden active' : 'nav-link nav-link-mobile lg:hidden relative' }>
                            <a href="#" className="hover">THCS</a>
                        </li>
                        <li className={ pathname === "/hoc-sinh-gioi" ? 'nav-link relative nav-link-mobile lg:hidden active' : 'nav-link nav-link-mobile lg:hidden relative' }>
                            <a href="#" className="hover">Học sinh giỏi</a>
                        </li>
                        <li className={ pathname === "/vat-ly-va-cuoc-song" ? 'nav-link relative nav-link-mobile lg:hidden active' : 'nav-link nav-link-mobile lg:hidden relative' }>
                            <a href="#" className="hover">Vật lý và cuộc sống</a>
                        </li>
                        <li className={ pathname === "/cntt-trong-day-hoc" ? 'nav-link relative nav-link-mobile lg:hidden active' : 'nav-link nav-link-mobile lg:hidden relative' }>
                            <a href="#" className="hover">CNTT trong dạy học</a>
                        </li>
                        <li className={ pathname === "/tai-lieu-mien-phi" ? 'nav-link relative nav-link-mobile lg:hidden active' : 'nav-link nav-link-mobile lg:hidden relative' }>
                            <a href="#" className="hover">Tài liệu miễn phí</a>
                        </li>
                        <li className={ pathname === "/tai-lieu-khac" ? 'nav-link relative nav-link-mobile lg:hidden active' : 'nav-link nav-link-mobile lg:hidden relative' }>
                            <a href="#" className="hover">Tài liệu khác</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Navbar