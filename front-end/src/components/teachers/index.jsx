import React, { useState, useEffect } from 'react';
import TeacherItem from './teacherItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../customArrowsSlider';

const Teachers = (props) => {
    const [teacher, setTeacher] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/teacher/getTeacher`)
            .then((response) => response.json())
            .then((data) => setTeacher(data.data));
        return () => {};
    }, []);
    const settings = {
        infinite: false,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 3,
        slidesToScroll: 1,
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
        <div className="mt-10">
            <div className="font-bold text-3xl text-center mb-10 uppercase">
                Đội ngũ giáo viên
            </div>
            <div className="relative custom-btn-arrow">
                <Slider {...settings}>
                    {teacher.map((item) => {
                        return <TeacherItem data={item} />;
                    })}
                </Slider>
            </div>
        </div>
    );
};
export default Teachers;
