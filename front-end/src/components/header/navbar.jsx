import React from 'react'
import Logo from './logo'

const Navbar = (props) => {
    return (
        <div className="flex items-center">
            <Logo/>
            <div className="ml-10">
                <ul className="flex nav-menu text-white font-medium space-x-4 uppercase tracking-wide">
                    <li className="nav-link relative">
                        <a href="http://" className="hover">Trang chủ</a>
                    </li>
                    <li className="nav-link relative">
                        <a href="http://" className="hover">Khóa học</a>
                    </li>
                    <li className="nav-link relative">
                        <a href="http://" className="hover">Sách</a>
                    </li>
                    <li className="nav-link relative">
                        <a href="http://" className="hover">Thi Online</a>
                    </li>
                    <li className="nav-link relative">
                        <a href="http://" className="hover">Tin tức</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Navbar