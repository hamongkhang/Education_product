import React from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = (props) => {
    return (
        <div
            className="relative py-28 px-5 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url("./assets/images/bg/about.jpg")` }}
        >
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
                            Đặt lại mật khẩu
                        </label>
                        <form method="#" action="#" className="mt-10 space-y-7">
                            <div>
                                <input
                                    type="password"
                                    placeholder="Mật khẩu mới"
                                    className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                                    required
                                />
                                {/* <span className="text-red-500 text-sm"> Mật khẩu không khớp</span> */}
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Xác nhận mật khẩu"
                                    className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                                    required
                                />
                                <span className="text-red-500 text-sm">
                                    {' '}
                                    Mật khẩu không khớp
                                </span>
                            </div>
                            <div>
                                <button className="bg-blue-500 w-full py-3 rounded text-white hover:shadow-xl focus:outline-none">
                                    Xác nhận
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
