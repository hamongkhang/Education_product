import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Preloader from '../preloader';

toast.configure();

const CodeVerificationForgot = (props) => {
    const [changePasswordForgot, setChangePasswordForgot] = useState({});
    const [textError, setTextError] = useState({
        code: '',
        password: '',
        cfpassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const addChangePasswordForgot = (event) => {
        const target = event.target;
        const field = target.name;
        const value = target.value;
        setChangePasswordForgot({
            ...changePasswordForgot,
            [field]: value,
        });
    };
    const onChangePasswordForgot = (e) => {
        setIsLoading(true);
        e.preventDefault();
        if (
            changePasswordForgot.code != '' &&
            changePasswordForgot.new_password != '' &&
            changePasswordForgot.new_password_confirmed != ''
        ) {
            const _formData = new FormData();
            _formData.append('code', changePasswordForgot.code);
            _formData.append('new_password', changePasswordForgot.new_password);
            _formData.append(
                'new_password_confirmed',
                changePasswordForgot.new_password_confirmed,
            );
            const requestOptions = {
                method: 'POST',
                body: _formData,
            };
            fetch(
                `${process.env.REACT_APP_URL_SERVER}/api/users/changePasswordForgot`,
                requestOptions,
            )
                .then((res) => res.json())
                .then((json) => {
                    let validator = {
                        code: '',
                        password: '',
                        cfpassword: '',
                    };
                    if (!json.error) {
                        toast.success(`Lấy lại mât khẩu thành công!`, {
                            position: 'top-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        history.push('/dang-nhap');
                    } else {
                        validator.code = json.error.code ? json.error.code : '';
                        validator.password = json.error.new_password
                            ? json.error.new_password
                            : '';
                        validator.cfpassword = json.error.new_password_confirmed
                            ? json.error.new_password_confirmed
                            : '';
                    }
                    // } else {
                    //     alert(json.error);
                    // }
                    setTextError(validator);
                    setIsLoading(false);
                });
        }
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
                            Nhập mã xác nhận
                        </label>
                        <form
                            onSubmit={onChangePasswordForgot}
                            className="mt-10 space-y-7"
                        >
                            <div>
                                <input
                                    type="text"
                                    name="code"
                                    onChange={(event) =>
                                        addChangePasswordForgot(event)
                                    }
                                    placeholder="Nhập mã xác nhận"
                                    className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                                    required
                                />
                                <span className="text-red-500 text-sm font-semibold">
                                    {textError.code}
                                </span>
                            </div>
                            <div className="w-full mb-4">
                                <label
                                    htmlFor="password"
                                    className="block w-full mb-0.5"
                                >
                                    Mật khẩu mới
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="new_password"
                                    onChange={(event) =>
                                        addChangePasswordForgot(event)
                                    }
                                    className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                                    placeholder="Mật khẩu mới"
                                    required
                                />
                                <span className="text-red-500 text-sm font-semibold">
                                    {textError.password}
                                </span>
                            </div>
                            <div className="w-full mb-4">
                                <label
                                    htmlFor="cfpassword"
                                    className="block w-full mb-0.5"
                                >
                                    Xác nhận mật khẩu mới
                                </label>
                                <input
                                    id="cfpassword"
                                    name="new_password_confirmed"
                                    onChange={(event) =>
                                        addChangePasswordForgot(event)
                                    }
                                    type="password"
                                    className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                                    placeholder="Xác nhận mật khẩu mới"
                                    required
                                />
                                <span className="text-red-500 text-sm font-semibold">
                                    {textError.cfpassword}
                                </span>
                            </div>
                            <div>
                                <button className="bg-blue-500 w-full py-3 rounded text-white hover:shadow-xl focus:outline-none">
                                    Xác nhận
                                </button>
                            </div>
                            <div>
                                <div className="block text-center sm:flex sm:justify-center sm:items-center">
                                    <label className="mr-2">
                                        Đã có tài khoản?
                                    </label>
                                    <Link
                                        to="/dang-nhap"
                                        className="inline-block text-blue-500 hover:text-blue-600 hover:underline"
                                    >
                                        Đăng nhập
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

export default CodeVerificationForgot;
