import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const LoginName = (props) => {
    const [classes, setClasses] = useState('hidden');
    const handleLoginDropdown = () => {
            classes === 'block' ? setClasses('hidden') : setClasses('block');
    };
    const $token=localStorage.getItem('access_token');
    const onLogout = (e) => {
        if($token){
        if (window.confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
            fetch('http://localhost:8000/api/users/logout', {
                method: "POST",
                headers: {"Authorization": `Bearer `+$token}
              })
            .then(res => res.json())
            .then(json => {
                alert("dung r!!!");
                console.log(json)
                window.localStorage.removeItem('access_token');
            });
        }}else{
            alert("Chưa đăng nhập!!!")
        }
      };
console.log($token)
    return (
        <div className="login-name cursor-pointer font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 duration-200 rounded-md hover:rounded-none space-x-2 relative" onClick={handleLoginDropdown}>
                <img src={`${window.location.origin}/assets/images/slider/city.jpg`} className="w-9 h-9 object-cover rounded-md hover:opacity-90" alt="" />
            <div className={`absolute login-control top-full right-0 w-40 rounded-md overflow-hidden h-20 pt-2 ${classes}`}>
                <div className="absolute bg-indigo-100 top-1 right-2 w-4 h-4 transform rotate-45"/>
                <div className="absolute rounded-md overflow-hidden w-full bg-indigo-100">
                    <div>
                        <Link to="/tai-khoan" className="w-full block px-3 py-1.5 hover:bg-indigo-300 duration-200" >Tài khoản</Link>
                    </div>
                    <div>
                        <Link to="/" onClick={(event) => onLogout(event)} className="w-full block px-3 py-1.5 hover:bg-indigo-300 duration-200" >Đăng xuất</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginName