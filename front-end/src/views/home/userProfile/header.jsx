import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../components/header/logo';
import { LoginName } from '../../../components/account';

const UserProfileHeader = (props) => {
    const [classOverlay, setClassOverlay] = useState('-translate-x-full');
    const [classNav, setClassNav] = useState('translate-x-full');
    const handleNav = () => {
        if (classNav === 'translate-x-full') {
            setClassOverlay('translate-x-0');
            setClassNav('translate-x-0');
        } else {
            setClassOverlay('-translate-x-full');
            setClassNav('translate-x-full');
        }
    };
    return (
        <div className="shadow-md fixed top-0 w-full bg-white z-30 max-w-screen-2xl mx-auto">
            <div
                className={`fixed top-0 left-0 bottom-0 h-screen w-1/4 md:w-2/3 transform bg-penetration-5 z-30 duration-500 cursor-pointer lg:hidden ${classOverlay}`}
                onClick={handleNav}
            />
            <div className="w-11/12 mx-auto h-19 flex items-center justify-between">
                <Logo />
                <nav
                    className={`fixed xs:static w-3/4 xs:w-auto top-0 right-0 xs:right-auto bottom-0 bg-white xs:bg-transparent flex flex-col xs:flex-row xs:items-center space-x-4 text-lg font-medium uppercase tracking-wide transform duration-300 ${classNav} xs:translate-x-0`}
                >
                    <div className="flex justify-between items-center shadow-md p-5 xs:hidden">
                        <div className="font-semibold text-xl my-0.5">
                            <p>MENU</p>
                        </div>
                        <div
                            className="nav-close text-2xl my-0.5 cursor-pointer hover:text-red-500"
                            onClick={handleNav}
                        >
                            <i className="far fa-times"></i>
                        </div>
                    </div>
                    <div>
                        <Link
                            to="/tai-khoan/khoa-hoc"
                            className="hover:text-green-500 duration-200 px-1 xs:px-0 mt-5 xs:my-0 my-1.5 block"
                        >
                            Khóa học
                        </Link>
                    </div>
                    <div>
                        <Link
                            to="/tai-khoan/don-hang"
                            className="hover:text-green-500 duration-200 px-1 xs:px-0 xs:my-0 my-1.5 block"
                        >
                            Lịch sử mua
                        </Link>
                    </div>
                    <div>
                        <Link
                            to="/tai-khoan/thong-tin"
                            className="hover:text-green-500 duration-200 px-1 xs:px-0 xs:my-0 my-1.5 block"
                        >
                            Tài khoản
                        </Link>
                    </div>
                </nav>
                <div
                    className="w-6 text-2xl flex xs:hidden items-center cursor-pointer hover:opacity-70"
                    onClick={handleNav}
                >
                    <i class="far fa-bars"></i>
                </div>
            </div>
        </div>
    );
};

export default UserProfileHeader;
