import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import Preloader from '../preloader';

toast.configure();

const Login = (props) => {
    const { changeRender, setReRender } = props;
    const [user, setUser] = useState({});
    const match = useRouteMatch();
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const addUser = (event) => {
        const target = event.target;
        const field = target.name;
        const value = target.value;
        setUser({
            ...user,
            [field]: value,
        });
    };
    const value = queryString.parse(props.location.search);
    const nameAccount = value.nameAccount;
    const avatar = value.avatar;
    const avatar_google = value.avatar_google;
    const access_token = value.access_token;
    const error = value.error;
    useEffect(() => {
        if (access_token) {
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('nameAccount', nameAccount);
            if (avatar_google) {
                localStorage.setItem('avatar_google', avatar_google);
            } else {
                localStorage.setItem('avatar', avatar);
            }
            // alert('dung r!!!');
            // toast.success(`Đăng nhập thành công!`, {
            //     position: "bottom-left",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            // });

            changeRender();
            setReRender(true);
            history.push('/tai-khoan');
        } else if (error) {
            alert(error);
        }
    }, []);

    const loginGoogle = (event) => {
        setIsLoading(true);
        const requestOptions = {
            method: 'GET',
        };
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/auth/redirect/google`,
            requestOptions,
        )
            .then((res) => res.json())
            .then((json) => {
                setIsLoading(false);
                window.location.href = json.link;
            });
    };
    const loginFacebook = (event) => {
        setIsLoading(true);
        const requestOptions = {
            method: 'GET',
        };
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/auth/facebook`,
            requestOptions,
        )
            .then((res) => res.json())
            .then((json) => {
                setIsLoading(false);
                window.location.href = json.link;
            });
    };

    const onLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (user.email != '' && user.password != '') {
            const _formData = new FormData();
            _formData.append('email', user.email);
            _formData.append('password', user.password);
            const requestOptions = {
                method: 'POST',
                body: _formData,
            };
            fetch(
                `${process.env.REACT_APP_URL_SERVER}/api/users/login`,
                requestOptions,
            )
                .then((res) => res.json())
                .then((json) => {
                    if (json.error === 'Unauthorized') {
                        // alert('Sai roi!!!');
                        toast.error(`Thông tin đăng nhập không chính xác!`, {
                            position: 'top-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else if (json.error === 'Blocked') {
                        toast.warn(`Tài khoản của bạn đã bị khóa!`, {
                            position: 'top-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else {
                        // if(json.access_token) {
                        localStorage.setItem('access_token', json.access_token);
                        localStorage.setItem(
                            'nameAccount',
                            json.user.nameAccount,
                        );
                        localStorage.setItem('avatar', json.user.avatar);
                        // alert('dung r!!!');
                        toast.success(`Đăng nhập thành công!`, {
                            position: 'top-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setReRender(true);
                        setIsLoading(false);
                        history.push('/');
                        // }
                    }
                });
        }
        setIsLoading(false);
    };
    return (
        <div
            className="relative py-28 px-5 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url("./assets/images/bg/about.jpg")` }}
        >
            {isLoading && <Preloader />}
            <div className="bg-penetration-5 absolute inset-0 w-full h-full"></div>
            <div className="relative flex flex-col sm:justify-center items-center mt-5">
                <div className="relative sm:max-w-sm w-full">
                    <div className="hidden md:block bg-blue-400 shadow-xl w-full h-full rounded-xl absolute transform rotate-12" />
                    <div className="hidden md:block bg-blue-300 shadow-xl w-full h-full rounded-xl absolute transform rotate-6" />
                    <div className="relative w-full rounded-xl  px-6 py-4 bg-blue-100 shadow-md">
                        <label
                            htmlFor
                            className="block mt-3 text-xl text-gray-700 text-center font-semibold"
                        >
                            Đăng nhập
                        </label>
                        <form onSubmit={onLogin} className="mt-10 font-medium">
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    onChange={(event) => addUser(event)}
                                    className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                                    required
                                />
                            </div>
                            <div className="mt-7">
                                <input
                                    type="password"
                                    placeholder="Mật khẩu"
                                    name="password"
                                    onChange={(event) => addUser(event)}
                                    className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                                    required
                                />
                            </div>
                            <div className="mt-7 flex">
                                <label
                                    htmlFor="remember_me"
                                    className="inline-flex items-center w-full cursor-pointer"
                                >
                                    <input
                                        id="remember_me"
                                        type="checkbox"
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        name="remember"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        Nhớ mật khẩu
                                    </span>
                                </label>
                                <div className="w-full text-right">
                                    <Link
                                        to="/quen-mat-khau"
                                        className="hover:underline text-sm text-gray-600 hover:text-gray-900"
                                        href="#"
                                    >
                                        Quên mật khẩu?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-7">
                                <button
                                    type="submit"
                                    className="bg-blue-500 w-full py-3 rounded text-white hover:shadow-xl focus:outline-none"
                                >
                                    Đăng nhập
                                </button>
                            </div>
                            <div className="flex mt-7 items-center text-center">
                                <hr className="border-gray-300 border-1 w-1/2 sm:w-full " />
                                <label className="inline-block font-medium text-sm text-gray-600 w-full">
                                    Đăng nhập bằng
                                </label>
                                <hr className="border-gray-300 border-1 w-1/2 sm:w-full " />
                            </div>
                            <div className="flex mt-7 justify-center w-full ">
                                <button
                                    type="button"
                                    className="mr-5 bg-blue-500 border-none px-4 py-2 rounded cursor-pointer text-white space-x-2 hover:shadow-xl"
                                >
                                    <i class="fab fa-facebook-f"></i>
                                    <span
                                        onClick={(event) =>
                                            loginFacebook(event)
                                        }
                                    >
                                        Facebook
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    className="bg-red-500 border-none px-4 py-2 rounded-md cursor-pointer text-white space-x-2 hover:shadow-xl"
                                >
                                    <i class="fab fa-google"></i>
                                    <span
                                        onClick={(event) => loginGoogle(event)}
                                    >
                                        Google
                                    </span>
                                </button>
                            </div>
                            <div className="mt-7">
                                <div className="block text-center sm:flex sm:justify-center sm:items-center">
                                    <label className="mr-2">
                                        Chưa có tài khoản?
                                    </label>
                                    <Link
                                        to="/dang-ky"
                                        className="inline-block text-blue-500 hover:text-blue-600 hover:underline"
                                    >
                                        Tạo tài khoản
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
