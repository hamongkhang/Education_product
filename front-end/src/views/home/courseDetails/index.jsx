import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import { BannerBook } from '../../../components/banner';
import CourseDesc from './courseDesc';
import moment from 'moment';
import { toast } from 'react-toastify';

toast.configure();

const CourseDetails = (props) => {
    const $link = `${process.env.REACT_APP_URL_SERVER}/upload/images/course/`;
    // const [classes, setClasses] = useState('right-0 translate-x-full');
    const match = useRouteMatch();
    const [post, setPost] = useState([]);
    const [course, setCourse] = useState([]);
    const [count, setCount] = useState([]);
    const $token = localStorage.getItem('access_token');
    const { changeRender } = props;
    const getApiFist = () => {
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/getCourses`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => setPost(data.data));
        return () => {};
    };
    const addToCart = (product_id) => {
        if ($token) {
            const _formData = new FormData();
            _formData.append('product_id', product_id);
            _formData.append('type', 'course');
            const requestOptions = {
                method: 'POST',
                headers: { Authorization: `Bearer ` + $token },
                body: _formData,
            };
            fetch(
                `${process.env.REACT_APP_URL_SERVER}/api/cart/addCart`,
                requestOptions,
            )
                .then((res) => res.json())
                .then((json) => {
                    changeRender();
                    if (json.success) {
                        toast.success(`Thêm vào giỏ hàng thành công!`, {
                            position: 'top-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else {
                        toast.info(`${json.description}`, {
                            position: 'top-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                });
        } else {
            toast.warn(`Vui lòng đăng nhập trước khi thêm vào giỏ hàng!`, {
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
    // const notification = () => {
    //     setClasses('right-5 translate-x-0');
    //     setTimeout(() => {
    //         setClasses('right-0 translate-x-full');
    //     }, 5000);
    // };

    const getCountLesson = () => {
        const _formData = new FormData();
        _formData.append('id', match.params.id);
        const requestOptions = {
            method: 'POST',
            body: _formData,
        };
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/getCountLesson`,
            requestOptions,
        )
            .then((res) => res.json())
            .then((data) => setCount(data.data));
        return () => {};
    };
    useEffect(() => {
        getApiFist();
        getCountLesson();
        if ($token) {
            const _formData = new FormData();
            _formData.append('id', match.params.id);
            const requestOptions = {
                method: 'POST',
                body: _formData,
                headers: { Authorization: `Bearer ` + $token },
            };
            fetch(
                `${process.env.REACT_APP_URL_SERVER}/api/getOneCourse`,
                requestOptions,
            )
                .then((response) => response.json())
                .then((data) => setCourse(data.course));
            return () => {};
        } else {
            const _formData = new FormData();
            _formData.append('id', match.params.id);
            const requestOptions = {
                method: 'POST',
                body: _formData,
            };
            fetch(
                `${process.env.REACT_APP_URL_SERVER}/api/getOneCourse`,
                requestOptions,
            )
                .then((response) => response.json())
                .then((data) => setCourse(data.course));
            return () => {};
        }
    }, []);
    return (
        <>
            <BannerBook />
            <div className="xl:w-4/5 xl:px-0 px-4 w-full relative left-1/2 transform -translate-x-1/2 md:mt-5 mt-2">
                <div className="flex flex-col-reverse lg:flex-row lg:space-x-6">
                    <div className="w-full lg:w-4/6">
                        <div className="space-y-3 mt-1">
                            <h2 className="font-semibold uppercase text-xl md:text-3xl">
                                {course.name}
                            </h2>
                            <img
                                src={$link + course.image}
                                className="w-full h-60 md:h-96 object-cover pt-3"
                                alt=""
                            />
                        </div>
                        <CourseDesc data={course} />
                    </div>
                    <div className="w-full lg:w-2/6 py-4">
                        <div className="p-5 border-b-2 border-gray-400 space-y-4 rounded-md shadow-lg bg-white">
                            <div className="flex justify-center items-end space-x-3">
                                <span className="text-xl text-green-700">
                                    {course.promotion_price}
                                    <sup> đ</sup>
                                </span>
                                <span className="text-base line-through font-light text-gray-500">
                                    {course.Initial_price}
                                    <sup>đ</sup>
                                </span>
                            </div>
                            <div>
                                <div className="flex space-x-2 py-3 border-b border-gray-300">
                                    <div className="w-5 text-center">
                                        {' '}
                                        <i className="fad fa-chalkboard-teacher text-indigo-600"></i>{' '}
                                    </div>
                                    <div>
                                        {' '}
                                        Giáo viên:{' '}
                                        <span className="text-gray-500">
                                            Trần Quốc Quân
                                        </span>{' '}
                                    </div>
                                </div>
                                <div className="flex space-x-2 py-3 border-b border-gray-300">
                                    <div className="w-5 text-center">
                                        {' '}
                                        <i className="fad fa-book-open text-indigo-600"></i>{' '}
                                    </div>
                                    <div>
                                        {' '}
                                        Bài giảng:{' '}
                                        <span className="text-gray-500">
                                            {count} bài giảng
                                        </span>{' '}
                                    </div>
                                </div>
                                <div className="flex space-x-2 py-3 border-b border-gray-300">
                                    <div className="w-5 text-center">
                                        {' '}
                                        <i className="fad fa-clock text-indigo-600"></i>{' '}
                                    </div>
                                    <div>
                                        {' '}
                                        Thời gian:{' '}
                                        <span className="text-gray-500">
                                            72h
                                        </span>{' '}
                                    </div>
                                </div>
                                <div className="flex space-x-2 py-3 border-b border-gray-300">
                                    <div className="w-5 text-center">
                                        {' '}
                                        <i className="fad fa-user text-indigo-600"></i>{' '}
                                    </div>
                                    <div>
                                        {' '}
                                        Đã đăng ký:{' '}
                                        <span className="text-gray-500">
                                            ***
                                        </span>{' '}
                                    </div>
                                </div>
                                <div className="flex space-x-2 py-3">
                                    <div className="w-5 text-center">
                                        {' '}
                                        <i className="fad fa-edit text-indigo-600"></i>{' '}
                                    </div>
                                    <div>
                                        {' '}
                                        Cập nhật lần cuối:{' '}
                                        <span className="text-gray-500">
                                            {moment(course.updated_at).format(
                                                'DD-MM-YYYY',
                                            )}
                                        </span>{' '}
                                    </div>
                                </div>
                            </div>
                            <div
                                className="flex items-center justify-center space-x-4 text-white"
                                onClick={() => addToCart(course.id)}
                            >
                                <button className="w-full py-2 rounded-sm bg-green-700 hover:bg-green-800 space-x-2 hover:shadow-lg">
                                    <i className="far fa-cart-plus" />
                                    <span>Đăng ký</span>
                                </button>
                            </div>
                        </div>
                        <div className="space-y-3 py-5 mt-8 border-b-2 border-gray-400 space-y-4 rounded-md shadow-lg bg-white">
                            <div className="uppercase font-medium px-5">
                                Khóa học đề xuất
                                <hr className="border-b border-gray-300 mt-2" />
                            </div>
                            <div className="px-3">
                                {post.map((item, i) => {
                                    if (i < 3) {
                                        return (
                                            <Link
                                                to={'/khoa-hoc/' + item.id}
                                                className="flex space-x-2 items-center hover:bg-blue-100 p-2 rounded-md"
                                            >
                                                <img
                                                    src={$link + item.image}
                                                    className="h-14 w-14 rounded-md object-scale-down"
                                                    alt=""
                                                />
                                                <div>
                                                    <p className="break-words line-2 uppercase font-medium">
                                                        {item.name}
                                                    </p>
                                                </div>
                                            </Link>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div
                className={`notification fixed top-20 transform duration-300 ${classes}`}
            >
                <div className="shadow-2xl bg-blue-50 rounded border-l-4 border-green-700 overflow-hidden py-5 pr-8 pl-3 space-x-4 flex items-center">
                    <i className="far fa-times hover:text-red-800 text-xl absolute top-1 right-3 cursor-pointer" onClick={() => {notification(false)}}></i>
                    <i className="far fa-check-circle text-green-700 text-3xl"></i>
                    <span>Thêm vào giỏ hàng thành công</span>
                </div>
            </div> */}
        </>
    );
};
export default CourseDetails;
