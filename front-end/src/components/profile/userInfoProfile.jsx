import React, { useState, useEffect, Profiler } from 'react';
import ChangePassword from './changePassword';
import Avt from './avt';
import ChangeInfo from './changeInfo';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Preloader from '../preloader';

toast.configure();

const UserInfoProfile = (props) => {
    const [profile, setProfile] = useState([]);
    const [option, setOption] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const $token = localStorage.getItem('access_token');
    const requestOptions = {
        method: 'POST',
        headers: { Authorization: `Bearer ` + $token },
    };

    const handleCheckLoggedIn = () => {
        // if
        // ...
    };

    useEffect(() => {
        handleCheckLoggedIn();
    }, []);

    useEffect(() => {
        setIsLoading(true);
        if ($token) {
            fetch('http://localhost:8000/api/users/userProfile', requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    setProfile(data);
                    setIsLoading(false);
                    if (data.sex === 'female') {
                        setOption({
                            option1: <option value="Khác">Khác</option>,
                            option2: <option value="Nam">Nam</option>,
                            option3: (
                                <option selected value="Nữ">
                                    Nữ
                                </option>
                            ),
                        });
                    } else if (data.sex === 'male') {
                        setOption({
                            option1: <option value="Khác">Khác</option>,
                            option2: (
                                <option selected value="Nam">
                                    Nam
                                </option>
                            ),
                            option3: <option value="Nữ">Nữ</option>,
                        });
                    } else {
                        setOption({
                            option1: (
                                <option selected value="Khác">
                                    Khác
                                </option>
                            ),
                            option2: <option value="Nam">Nam</option>,
                            option3: <option value="Nữ">Nữ</option>,
                        });
                    }
                });
            return () => {};
        } else {
            toast.warn(`Bạn chưa đăng nhập!`, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            history.push('dang-nhap');
        }
        setIsLoading(false);
    }, []);
    return (
        <div className="md:flex md:space-x-10">
            {isLoading && <Preloader />}
            <Avt profile={profile} />
            <div className="space-y-10">
                <ChangeInfo profile={profile} option={option} />
                <ChangePassword />
            </div>
        </div>
    );
};

export default UserInfoProfile;
