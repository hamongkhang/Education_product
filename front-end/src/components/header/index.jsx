import React, { useState } from 'react';
import AccountControls from './accountControls';
import Navbar from './navbar';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

toast.configure();

const Header = (props) => {
    const { setReRender } = props;
    const history = useHistory();
    const $token = localStorage.getItem('access_token');
    const onLogout = (e) => {
        if ($token) {
            Swal.fire({
                title: 'Xác nhận đăng xuất!',
                text: 'Bạn có chắc chắn muốn đăng xuất không?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#4f46e5',
                cancelButtonColor: '#ef4444',
                confirmButtonText: 'Đăng xuất',
                cancelButtonText: 'Hủy',
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
                            toast.success(`Đăng xuất thành công!`, {
                                position: 'top-center',
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            setReRender(false);
                            history.push('dang-nhap');
                        });
                }
            });
        } else {
            // history.replace('dang-nhap')
            toast.warn(`Bạn chưa đăng nhập!`, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="header">
            <div className="max-w-screen-2xl w-screen header-fixed h-19 fixed top-0 z-30 duration-300">
                <div className="w-11/12 mx-auto mt-2">
                    <div className="flex items-center justify-between z-30">
                        <Navbar {...props} onLogout={onLogout} />
                        <AccountControls {...props} onLogout={onLogout} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Header;
