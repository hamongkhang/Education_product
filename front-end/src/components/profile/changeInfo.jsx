import React, { useState, useEffect, Profiler } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Avt from './avt';
import { toast } from 'react-toastify';
import Preloader from '../preloader';

toast.configure();

const ChangeInfo = (props) => {
    const [updateProfile, setUpdateProfile] = useState([]);
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
    const $token = localStorage.getItem('access_token');

    const addUpdateProfile = (event) => {
        const target = event.target;
        const field = target.name;
        const value = target.value;
        setUpdateProfile({
            ...updateProfile,
            [field]: value,
        });
    };
    const onUpdateProfile = (e) => {
        e.preventDefault();
        if ($token) {
            setIsLoading(true);
            const _formData = new FormData();
            _formData.append('email', updateProfile.email);
            _formData.append('fullName', updateProfile.fullName);
            _formData.append('nameAccount', updateProfile.nameAccount);
            _formData.append('linkFB', updateProfile.linkFB);
            _formData.append('phone', updateProfile.phone);
            _formData.append('address', updateProfile.address);
            _formData.append('birthday', updateProfile.birthday);
            if (updateProfile.sex === 'Nam') {
                _formData.append('sex', 'male');
            } else if (updateProfile.sex === 'Nữ') {
                _formData.append('sex', 'female');
            } else if (updateProfile.sex === 'Khác') {
                _formData.append('sex', 'other');
            }
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
                        toast.success(`Cập nhật thành công!`, {
                            position: 'top-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        history.push('/');
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
        }
    };
    return (
        <div className="bg-indigo-100 p-5 shadow-lg">
            {isLoading && <Preloader />}
            <div className="text-center text-xl uppercase font-semibold mb-5">
                Cập nhật thông tin cá nhân
            </div>
            <form onSubmit={onUpdateProfile} className="font-semibold">
                <div className="md1:flex md1:space-x-4">
                    <div className="w-full mb-4">
                        <label htmlFor="name" className="block w-full mb-0.5">
                            Họ và tên
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="fullName"
                            onChange={(event) => addUpdateProfile(event)}
                            className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                            defaultValue={props.profile.fullName}
                            required
                        />
                        <span className="text-red-500 text-sm">
                            {textError.fullName}
                        </span>
                    </div>
                    <div className="w-full mb-4">
                        <label
                            htmlFor="facebookUrl"
                            className="block w-full mb-0.5"
                        >
                            Link Facebook
                        </label>
                        <input
                            id="facebookUrl"
                            type="text"
                            name="linkFB"
                            onChange={(event) => addUpdateProfile(event)}
                            className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                            defaultValue={props.profile.linkFB}
                            required
                        />
                        <span className="text-red-500 text-sm">
                            {textError.linkFB}
                        </span>
                    </div>
                </div>
                <div className="md1:flex md1:space-x-4">
                    <div className="w-full mb-4">
                        <label htmlFor="phone" className="block w-full mb-0.5">
                            Số điện thoại
                        </label>
                        <input
                            id="phone"
                            type="text"
                            name="phone"
                            onChange={(event) => addUpdateProfile(event)}
                            className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                            defaultValue={props.profile.phone}
                            required
                        />
                        <span className="text-red-500 text-sm">
                            {textError.phone}
                        </span>
                    </div>
                    <div className="w-full mb-4">
                        <label htmlFor="gender" className="block w-full mb-0.5">
                            Giới tính
                        </label>
                        <select
                            name="gender"
                            name="sex"
                            onChange={(event) => addUpdateProfile(event)}
                            id="s"
                            className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                        >
                            {props.option.option1}
                            {props.option.option2}
                            {props.option.option3}
                        </select>
                        <span className="text-red-500 text-sm">
                            {textError.sex}
                        </span>
                    </div>
                    <div className="w-full mb-4">
                        <label
                            htmlFor="birthday"
                            className="block w-full mb-0.5"
                        >
                            Sinh nhật
                        </label>
                        <input
                            id="birthday"
                            type="date"
                            name="birthday"
                            onChange={(event) => addUpdateProfile(event)}
                            defaultValue={props.profile.birthday}
                            className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                            required
                        />
                        <span className="text-red-500 text-sm">
                            {textError.birthday}
                        </span>
                    </div>
                </div>
                <div className="md1:flex md1:space-x-4">
                    <div className="w-full mb-4">
                        <label
                            htmlFor="address"
                            className="block w-full mb-0.5"
                        >
                            Địa chỉ
                        </label>
                        <input
                            id="address"
                            type="text"
                            name="address"
                            onChange={(event) => addUpdateProfile(event)}
                            className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                            defaultValue={props.profile.address}
                            required
                        />
                        <span className="text-red-500 text-sm">
                            {textError.address}
                        </span>
                    </div>
                    <div className="w-full mb-4">
                        <label htmlFor="email" className="block w-full mb-0.5 ">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            onChange={(event) => addUpdateProfile(event)}
                            className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded outline-none border-2"
                            defaultValue={props.profile.email}
                            required
                        />
                        <span className="text-red-500 text-sm">
                            {textError.email}
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 hover:shadow-xl font-semibold duration-300"
                    >
                        Cập nhật
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangeInfo;
