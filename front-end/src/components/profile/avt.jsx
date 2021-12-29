import React, { useState, useEffect, Profiler } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import Preloader from '../preloader';

toast.configure();

const Avt = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const $link = `${process.env.REACT_APP_URL_SERVER}/upload/images/avatar/`;
    const history = useHistory();
    const [avtFb, setAvtFb] = useState('');
    const $token = localStorage.getItem('access_token');

    const handleCheckLoggedIn = () => {
        if (localStorage.getItem('avatar_google')) {
            let avtFb = localStorage.getItem('avatar_google');
            setAvtFb(avtFb);
        }
    };

    useEffect(() => {
        handleCheckLoggedIn();
    }, []);

    const addAvatar = (event) => {
        const target = event.target;
        if ($token) {
            setIsLoading(true);
            window.localStorage.removeItem('avatar_google');
            window.localStorage.setItem('avatar', event.target.files[0].name);
            const _formData = new FormData();
            _formData.append('avatar', event.target.files[0]);
            const requestOptions = {
                method: 'POST',
                body: _formData,
                headers: { Authorization: `Bearer ` + $token },
            };
            fetch(
                `${process.env.REACT_APP_URL_SERVER}/api/users/updateProfile`,
                requestOptions,
            )
                .then((res) => res.json())
                .then((json) => {
                    setIsLoading(false);
                    if (!json.error) {
                        // alert('Update avatar thành công');
                        toast.success(`Cập nhật ảnh đại diện thành công!`, {
                            position: 'top-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        window.location.reload();
                    } else {
                        if (json.error.avatar) {
                            // alert(json.error.avatar);
                            toast.error(`${json.error.avatar}`, {
                                position: 'top-center',
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        } else {
                            // alert(json.error);
                            toast.error(`${json.error}`, {
                                position: 'top-center',
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }
                    }
                });
        } else {
            // alert('Không được bỏ trống');
            toast.warn(`Không được bỏ trống!`, {
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
    if (localStorage.getItem('avatar_google')) {
        return (
            <form encType="multipart/form-data">
                {isLoading && <Preloader />}
                <div className="group">
                    <div className="mx-auto relative w-64 h-64 md:w-80 md:h-80 border-red-600 border rounded-lg mb-10 md:mb-0">
                        <img
                            src={localStorage.getItem('avatar_google')}
                            className="w-full h-full mb-10 md:mb-0 object-cover rounded-lg"
                            alt=""
                        />
                        {!avtFb && (
                            <label
                                htmlFor="avt"
                                className="w-4/5 text-center opacity-0 group-hover:opacity-100 block py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-15 font-semibold absolute bottom-5 transform left-1/2 -translate-x-1/2 duration-300 text-white"
                            >
                                {' '}
                                <i className="fad fa-camera mr-2"></i>{' '}
                                <span> Đổi ảnh</span>
                            </label>
                        )}
                        <input
                            type="file"
                            name="avatar"
                            onChange={(event) => addAvatar(event)}
                            id="avt"
                            hidden
                        />
                    </div>
                </div>
            </form>
        );
    } else {
        return (
            <form encType="multipart/form-data">
                <div className="group">
                    <div className="mx-auto relative w-64 h-64 md:w-80 md:h-80 border-red-600 border rounded-lg mb-10 md:mb-0">
                        <img
                            src={$link + props.profile.avatar}
                            className="w-full h-full mb-10 md:mb-0 object-cover rounded-lg"
                            alt=""
                        />
                        <label
                            htmlFor="avt"
                            className="w-4/5 text-center opacity-0 group-hover:opacity-100 block py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-15 font-semibold absolute bottom-5 transform left-1/2 -translate-x-1/2 duration-300 text-white"
                        >
                            {' '}
                            <i className="fad fa-camera mr-2"></i>{' '}
                            <span> Đổi ảnh</span>
                        </label>
                        <input
                            type="file"
                            name="avatar"
                            onChange={(event) => addAvatar(event)}
                            id="avt"
                            hidden
                        />
                    </div>
                </div>
            </form>
        );
    }
};

export default Avt;
