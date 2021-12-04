import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import Preloader from '../preloader';

const AdminAccount = (props) => {
    const [classes, setClasses] = useState('hidden');
    const $token = localStorage.getItem('access_token');
    const $userName = localStorage.getItem('nameAccount');
    const $avatar = localStorage.getItem('avatar');
    const history = useHistory();
    const handleLoginDropdown = () => {
        classes === 'block' ? setClasses('hidden') : setClasses('block');
    };
    const [isLoading, setIsLoading] = useState(false);
    const onLogout = (e) => {
        setIsLoading(true);
        if ($token) {
            Swal.fire({
                title: 'Cảnh báo',
                text: 'Bạn có chắc chắn muốn đăng xuất?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Hủy',
                confirmButtonText: 'Đăng xuất',
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(
                        `${process.env.REACT_APP_URL_SERVER}/api/users/logout`,
                        {
                            method: 'POST',
                            headers: { Authorization: `Bearer ` + $token },
                        },
                    )
                        .then((res) => res.json())
                        .then((json) => {
                            window.localStorage.removeItem('access_token');
                            window.localStorage.removeItem('nameAccount');
                            window.localStorage.removeItem('avatar');
                            window.localStorage.removeItem('avatar_google');
                            setIsLoading(false);
                            history.push('/admin');
                        });
                }
            });
        }
        setIsLoading(false);
    };

    return (
        <div className="h-full mr-8 relative">
            {isLoading && <Preloader />}

            <div
                className={`flex items-center space-x-3 cursor-pointer`}
                onClick={handleLoginDropdown}
            >
                <div>
                    <img
                        className="h-8 w-8 object-cover rounded-full"
                        src={
                            $avatar
                                ? `${process.env.REACT_APP_URL_SERVER}/upload/images/avatar/${$avatar}`
                                : `${window.location.origin}/assets/images/slider/city.jpg`
                        }
                    />
                </div>
                <div>
                    <span>{$userName}</span>
                </div>
                <div>
                    <i className="fas fa-caret-down"></i>
                </div>
            </div>
            <div
                className={`absolute login-control top-full right-0 w-40 rounded-md overflow-hidden h-20 pt-2 ${classes} shadow-lg`}
            >
                <div className="absolute bg-white top-1 right-2 w-4 h-4 transform rotate-45" />
                <div className="absolute rounded-md overflow-hidden w-full bg-white text-black">
                    <div>
                        <Link
                            to="/tai-khoan"
                            className="w-full block px-3 py-1.5 hover:bg-indigo-300 duration-200"
                        >
                            Tài khoản
                        </Link>
                    </div>
                    <div>
                        <a
                            type="button"
                            onClick={() => onLogout()}
                            className="w-full block px-3 py-1.5 hover:bg-indigo-300 duration-200"
                        >
                            Đăng xuất
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAccount;
