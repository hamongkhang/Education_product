import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const LoginName = (props) => {
    const [classes, setClasses] = useState('h-0 rotate-45');
    const [classIcon, setClassIcon] = useState('fa-caret-down');
    const handleLoginDropdown = () => {
            classes === 'h-18 rotate-0' ? setClasses('h-0 rotate-45') : setClasses('h-18 rotate-0');
            classIcon === 'fa-caret-up' ? setClassIcon('fa-caret-down') : setClassIcon('fa-caret-up')
    };

    return (
        <div className="login-name cursor-pointer font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 duration-200 rounded-md hover:rounded-none px-3 py-2 space-x-2 relative" onClick={handleLoginDropdown}>
            <span className="">Nguyễn Đình Kha</span>
            <i className={`fas ${classIcon}`} />
            <div className={`absolute login-control duration-200 transform top-full -left-2 w-full bg-indigo-100 rounded-md overflow-hidden ${classes}`}>
                <div>
                    <Link to="/tai-khoan" className="w-full block px-3 py-1.5 hover:bg-indigo-300 duration-200" >Tài khoản</Link>
                </div>
                <div>
                    <Link to="/" className="w-full block px-3 py-1.5 hover:bg-indigo-300 duration-200" >Đăng xuất</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginName