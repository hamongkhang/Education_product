import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Preloader from '../preloader';

const CodeVerification = (props) => {
    const [codeRegister, setCodeRegister] = useState({});
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    const addCodeRegister = (event) => {
        const target = event.target;
        const field = target.name;
        const value = target.value;
        setCodeRegister({
            ...codeRegister,
            [field]: value,
        });
    };
    const onGetCodeRegister = (e) => {
        setIsLoading(true);
        e.preventDefault();
        if (codeRegister.code != '') {
            const _formData = new FormData();
            _formData.append('code', codeRegister.code);
            const requestOptions = {
                method: 'POST',
                body: _formData,
            };
            fetch('http://127.0.0.1:8000/api/users/register', requestOptions)
                .then((res) => res.json())
                .then((json) => {
                    if (!json.error) {
                        history.push('/');
                    } else if (json.error.code) {
                        alert(json.error.code);
                    } else {
                        alert(json.error);
                    }
                    setIsLoading(false);
                });
        } else {
            alert('Không được bỏ trống');
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
                            Nhập mã xác nhận
                        </label>
                        <form
                            onSubmit={onGetCodeRegister}
                            className="mt-10 space-y-7"
                        >
                            <div>
                                <input
                                    type="text"
                                    name="code"
                                    onChange={(event) => addCodeRegister(event)}
                                    placeholder="Nhập mã xác nhận"
                                    className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                                    required
                                />
                                <span className="text-red-500 text-sm">
                                    {' '}
                                    Mã xác minh không khớp!
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

export default CodeVerification;
