import React from 'react'
import CourseItem from './courseItem'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { NextArrow, PrevArrow } from '../customArrowsSlider'

const Courses = (props) => {
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
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
          ]
      };
    return (
        <div className="relative">
            <div className="bg-green-700 shadow-lg rounded-md h-12 mb-10 flex items-center justify-between relative overflow-hidden text-white">
                <div className="w-40 h-40 rounded-full bg-yellow-700 absolute z-0 -top-3/4 -right-5"/>
                <div className="p-3 text-17 font-semibold uppercase">
                    Khóa học nổi bậc
                </div>
                <div className="z-10">
                    <a href="#" className="p-3 text-17 font-semibold hover:underline duration-300 ">Xem tất cả</a>
                </div>
            </div>

            <div className="relative custom-btn-arrow">
                <Slider {...settings}>
                    <CourseItem/>
                    <CourseItem/>
                    <CourseItem/>
                    <CourseItem/>
                    <CourseItem/>
                    <CourseItem/>
                </Slider>
            </div>
        </div>
    )
}
export default Courses