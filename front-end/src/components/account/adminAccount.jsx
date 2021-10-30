import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const AdminAccount = (props) => {
    const [classes, setClasses] = useState('hidden');
    const handleLoginDropdown = () => {
            classes === 'block' ? setClasses('hidden') : setClasses('block');
    };

    return (
        <div className="h-full mr-8 relative">
            <div className={`flex items-center space-x-3 cursor-pointer`} onClick={handleLoginDropdown}>
                <div>
                    <img className="h-8 w-8 object-cover rounded-full" src={`${window.location.origin}/assets/images/slider/city.jpg`} />
                </div>
                <div>
                    <span>Ax Nguyễn</span>
                </div>
                <div>
                    <i className="fas fa-caret-down"></i>
                </div>
            </div>
            <div className={`absolute login-control top-full right-0 w-40 rounded-md overflow-hidden h-20 pt-2 ${classes} shadow-lg`}>
                <div className="absolute bg-white top-1 right-2 w-4 h-4 transform rotate-45"/>
                <div className="absolute rounded-md overflow-hidden w-full bg-white text-black">
                    <div>
                        <Link to="/tai-khoan" className="w-full block px-3 py-1.5 hover:bg-indigo-300 duration-200" >Tài khoản</Link>
                    </div>
                    <div>
                        <Link to="/" className="w-full block px-3 py-1.5 hover:bg-indigo-300 duration-200" >Đăng xuất</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminAccount