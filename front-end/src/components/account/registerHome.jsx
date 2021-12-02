import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Preloader from '../preloader';

const RegisterHome = (props) => {
    const [registerUser, setRegisterUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [textError, setTextError] = useState({
        fullName: '',
        nameAccount: '',
        linkFB: '',
        phone: '',
        email: '',
        birthday: '',
        password: '',
        confirm_password: '',
        address: '',
        sex: '',
    });
    const history = useHistory();

    const addAccount = (event) => {
        const target = event.target;
        const field = target.name;
        const value = target.value;
        setRegisterUser({
            ...registerUser,
            [field]: value,
        });
    };

    const onRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (
            registerUser.email != '' &&
            registerUser.password != '' &&
            registerUser.fullName != '' &&
            registerUser.confirm_password != '' &&
            registerUser.sex != '' &&
            registerUser.phone != '' &&
            registerUser.address != '' &&
            registerUser.birthday != '' &&
            registerUser.linkFB != '' &&
            registerUser.nameAccount != ''
        ) {
            const _formData = new FormData();
            _formData.append('email', registerUser.email);
            _formData.append('fullName', registerUser.fullName);
            _formData.append('nameAccount', registerUser.nameAccount);
            _formData.append('linkFB', registerUser.linkFB);
            _formData.append('phone', registerUser.phone);
            _formData.append('address', registerUser.address);
            _formData.append('birthday', registerUser.birthday);
            _formData.append('password', registerUser.password);
            if (registerUser.sex === 'Nam') {
                _formData.append('sex', 'male');
            } else if (registerUser.sex === 'Nữ') {
                _formData.append('sex', 'female');
            } else {
                _formData.append('sex', 'other');
            }
            _formData.append('confirm_password', registerUser.confirm_password);
            const requestOptions = {
                method: 'POST',
                body: _formData,
            };
            fetch('http://127.0.0.1:8000/api/users/getCode', requestOptions)
                .then((res) => res.json())
                .then((json) => {
                    let validator = {
                        fullName: '',
                        nameAccount: '',
                        linkFB: '',
                        phone: '',
                        email: '',
                        birthday: '',
                        password: '',
                        confirm_password: '',
                        address: '',
                        sex: '',
                    };
                    if (!json.error) {
                        history.push('/xac-nhan-ma');
                    } else {
                        validator.fullName = json.error.fullName
                            ? json.error.fullName
                            : '';
                        validator.nameAccount = json.error.nameAccount
                            ? json.error.nameAccount
                            : '';
                        validator.linkFB = json.error.linkFB
                            ? json.error.linkFB
                            : '';
                        validator.phone = json.error.phone
                            ? json.error.phone
                            : '';
                        validator.email = json.error.email
                            ? json.error.email
                            : '';
                        validator.birthday = json.error.birthday
                            ? json.error.birthday
                            : '';
                        validator.password = json.error.password
                            ? json.error.password
                            : '';
                        validator.confirm_password = json.error.confirm_password
                            ? json.error.confirm_password
                            : '';
                        validator.address = json.error.address
                            ? json.error.address
                            : '';
                        validator.sex = json.error.sex ? json.error.sex : '';
                        // } else {
                        //     alert(json.error);
                        // }
                    }
                    setTextError(validator);
                    setIsLoading(false);
                });
        } else {
            alert('Không được bỏ trống');
        }
        setIsLoading(false);
    };
    return (
        <section
            className="rounded-lg relative overflow-hidden shadow-md w-full py-10 m-0 bg-cover bg-center  bg-no-repeat"
            style={{ backgroundImage: `url("./assets/images/bg/about.jpg")` }}
        >
            {/* <div className="absolute md:h-32 md:w-32 h-10 w-10 bg-pink-600 top-10 md:-left-16 -left-2 transform rotate-180 animate-spin" />
            <div className="absolute md:h-20 md:w-20 h-10 w-10 bg-indigo-600 top-10 right-4 transform animate-bounce rounded-full" />
            <div className="absolute bottom-8 md:right-8 right-2/4 transform animate-spin -translate-x-3/4 -translate-y-3/4 text-7xl">
                <i class="fad fa-pen text-green-600"></i>
            </div>
            <div className="absolute -bottom-1 md:right-20 right-2/3 transform transition animate-spin text-8xl">
                <i class="fad fa-ruler-triangle text-pink-200"></i>
            </div> */}
            {isLoading && <Preloader />}
            <div className="flex items-center justify-center bg-indigo-200 shadow-md lg:w-2/4 md:w-3/4  md:mx-auto rounded-lg md:my-10 m-5">
                <form
                    onSubmit={onRegister}
                    className="w-full px-5 font-semibold"
                >
                    <div className="text-3xl text-center my-5 uppercase">
                        <h3>Đăng ký</h3>
                    </div>
                    <div>
                        <div>
                            <div className="md:flex md:space-x-4">
                                <div className="w-full mb-4">
                                    <label
                                        htmlFor="name"
                                        className="block w-full mb-0.5"
                                    >
                                        Họ và tên
                                    </label>
                                    <input
                                        id="name"
                                        name="fullName"
                                        onChange={(event) => addAccount(event)}
                                        type="text"
                                        className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                                        placeholder="Họ và tên"
                                        required
                                    />
                                    <span className="text-red-500 text-sm">
                                        {textError.fullName}
                                    </span>
                                </div>
                                <div className="w-full mb-4">
                                    <label
                                        htmlFor="username"
                                        className="block w-full mb-0.5"
                                    >
                                        Tên đăng nhập
                                    </label>
                                    <input
                                        id="username"
                                        name="nameAccount"
                                        onChange={(event) => addAccount(event)}
                                        type="text"
                                        className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                                        placeholder="Tên đăng nhập"
                                        required
                                    />
                                    <span className="text-red-500 text-sm">
                                        {textError.nameAccount}
                                    </span>
                                </div>
                            </div>
                            <div className="md:flex md:space-x-4">
                                <div className="w-full mb-4">
                                    <label
                                        htmlFor="facebookUrl"
                                        className="block w-full mb-0.5"
                                    >
                                        Link Facebook
                                    </label>
                                    <input
                                        id="facebookUrl"
                                        name="linkFB"
                                        onChange={(event) => addAccount(event)}
                                        type="text"
                                        className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                                        placeholder="VD: https://www.facebook.com/vatly365"
                                        required
                                    />
                                    <span className="text-red-500 text-sm">
                                        {textError.linkFB}
                                    </span>
                                </div>
                                <div className="w-full mb-4">
                                    <label
                                        htmlFor="phone"
                                        className="block w-full mb-0.5"
                                    >
                                        Số điện thoại
                                    </label>
                                    <input
                                        id="phone"
                                        type="text"
                                        name="phone"
                                        onChange={(event) => addAccount(event)}
                                        className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                                        placeholder="Số điện thoại"
                                        required
                                    />
                                    <span className="text-red-500 text-sm">
                                        {textError.phone}
                                    </span>
                                </div>
                            </div>
                            <div className="md:flex md:space-x-4">
                                <div className="w-full mb-4">
                                    <label
                                        htmlFor="address"
                                        className="block w-full mb-0.5"
                                    >
                                        Địa chỉ
                                    </label>
                                    <input
                                        id="address"
                                        name="address"
                                        onChange={(event) => addAccount(event)}
                                        type="text"
                                        className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                                        placeholder="Địa chỉ"
                                        required
                                    />
                                    <span className="text-red-500 text-sm">
                                        {textError.address}
                                    </span>
                                </div>
                                <div className="w-full mb-4">
                                    <label
                                        htmlFor="gender"
                                        className="block w-full mb-0.5"
                                    >
                                        Giới tính
                                    </label>
                                    <select
                                        name="gender"
                                        name="sex"
                                        onChange={(event) => addAccount(event)}
                                        id=""
                                        className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                                    >
                                        <option value="Khác" name="sex">
                                            Khác
                                        </option>
                                        <option value="Nam" name="sex">
                                            Nam
                                        </option>
                                        <option value="Nữ" name="sex">
                                            Nữ
                                        </option>
                                    </select>
                                    <span className="text-red-500 text-sm">
                                        {textError.sex}
                                    </span>
                                </div>
                            </div>
                            <div className="md:flex md:space-x-4">
                                <div className="w-full mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block w-full mb-0.5 "
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        onChange={(event) => addAccount(event)}
                                        type="email"
                                        className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                                        placeholder="Email"
                                        required
                                    />
                                    <span className="text-red-500 text-sm">
                                        {textError.email}
                                    </span>
                                </div>
                                <div className="w-full mb-4">
                                    <label
                                        htmlFor="birthday"
                                        className="block w-full mb-0.5"
                                    >
                                        Ngày sinh
                                    </label>
                                    <input
                                        id="birthday"
                                        name="birthday"
                                        onChange={(event) => addAccount(event)}
                                        type="date"
                                        className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                                        placeholder="Xác nhận mật khẩu"
                                        required
                                    />
                                    <span className="text-red-500 text-sm">
                                        {textError.birthday}
                                    </span>
                                </div>
                            </div>
                            <div className="md:flex md:space-x-4">
                                <div className="w-full mb-4">
                                    <label
                                        htmlFor="password"
                                        className="block w-full mb-0.5"
                                    >
                                        Mật khẩu
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        onChange={(event) => addAccount(event)}
                                        type="password"
                                        className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                                        placeholder="Mật khẩu"
                                        required
                                    />
                                    <span className="text-red-500 text-sm">
                                        {textError.password}
                                    </span>
                                </div>
                                <div className="w-full mb-4">
                                    <label
                                        htmlFor="cfpassword"
                                        className="block w-full mb-0.5"
                                    >
                                        Xác nhận mật khẩu
                                    </label>
                                    <input
                                        id="cfpassword"
                                        name="confirm_password"
                                        onChange={(event) => addAccount(event)}
                                        type="password"
                                        className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                                        placeholder="Xác nhận mật khẩu"
                                        required
                                    />
                                    <span className="text-red-500 text-sm">
                                        {textError.confirm_password}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="float-right mb-5">
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 hover:shadow-xl font-semibold duration-300"
                            >
                                Đăng ký
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default RegisterHome;
