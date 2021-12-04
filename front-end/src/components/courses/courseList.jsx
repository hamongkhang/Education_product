import React, { useState, useEffect } from 'react';
import CourseItem from './courseItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../customArrowsSlider';
import Preloader from '../preloader';

const arr = [
    {
        name: '12',
    },
    {
        name: 'THPT',
    },
    {
        name: '11',
    },
    {
        name: '10',
    },
];

const CourseList = (props) => {
    const [course, setCourse] = useState([]);
    const [count, setCount] = useState([]);
    const [admin, setAdmin] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const $token = localStorage.getItem('access_token');

    const getAdmin = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/users/getAdmin`)
            .then((response) => response.json())
            .then((data) => {
                setAdmin(data.data);
                setIsLoading(false);
            });
    };

    const getApiSecond = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/getCourses`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                setCourse(data.data);
                setIsLoading(false);
            });
    };

    const tinhTong = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/getCourseHome`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                setCount(data.data);
                setIsLoading(false);
            });
        return () => {
            for (var i = 0; i < count.length; i++) {
                if (count[i] == null) {
                    count[i] = 0;
                }
            }
        };
    };

    useEffect(() => {
        getApiSecond();
        tinhTong();
        getAdmin();
    }, []);
    const settings = {
        infinite: false,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 3,
        slidesToScroll: 3,
        centerPadding: 0,
        swipeToSlide: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="relative">
            {isLoading && <Preloader />}
            <div className="bg-purple-800 shadow-lg rounded-md h-12 mb-10 flex items-center justify-between relative overflow-hidden text-white">
                <div className="w-40 h-40 rounded-full bg-yellow-400 border-4 border-white absolute z-0 -top-3/4 -right-5" />
                <div className="p-3 text-17 font-semibold uppercase">
                    Khóa học nổi bậc
                </div>
                <div className="z-10">
                    <a
                        href="/khoa-hoc"
                        className="p-3 text-17 font-semibold hover:underline duration-300 "
                    >
                        Xem tất cả
                    </a>
                </div>
            </div>

            <div className="relative custom-btn-arrow">
                <Slider {...settings}>
                    {course.map((item, i) => {
                        return (
                            <CourseItem
                                admin={admin}
                                data={item}
                                count={count[i]}
                            />
                        );
                    })}
                </Slider>
            </div>
        </div>
    );
};
export default CourseList;
