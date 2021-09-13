import React from 'react'
import CourseItem from './courseItem'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const NextArrow = (props) => (
    <div onClick={props.onClick} className="opacity-0 btn-arrow absolute top-1/3 z-50 transform translate-y-3/4 right-2 bg-white w-8 h-8 flex items-center justify-center rounded-full shadow-md group cursor-pointer hover:opacity-70 duration-300">
        <i class="far fa-chevron-right text-base font-medium group-hover:text-blue-900"></i>
    </div>
)
const PrevArrow = (props) => (
    <div onClick={props.onClick} className="opacity-0 btn-arrow absolute top-1/3 z-50 transform translate-y-3/4 -left-4 bg-white w-8 h-8 flex items-center justify-center rounded-full shadow-md group cursor-pointer hover:opacity-70 duration-300">
        <i class="far fa-chevron-left text-base font-medium group-hover:text-blue-900"></i>
    </div>
)

const Courses = (props) => {
    const settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 3,
        slidesToScroll: 3,
        centerPadding: 0,
        swipeToSlide: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        // responsive: [
        //     {
        //       breakpoint: 1024,
        //       settings: {
        //         slidesToShow: 3,
        //         slidesToScroll: 3,
        //         infinite: true,
        //         dots: true
        //       }
        //     },
        //     {
        //       breakpoint: 600,
        //       settings: {
        //         slidesToShow: 2,
        //         slidesToScroll: 2,
        //         initialSlide: 2
        //       }
        //     },
        //     {
        //       breakpoint: 480,
        //       settings: {
        //         slidesToShow: 1,
        //         slidesToScroll: 1
        //       }
        //     }
        //   ]
      };
    return (
        <div className="relative">
            <div className="bg-indigo-300 shadow-lg rounded-lg h-12 mb-10 flex items-center justify-between">
                <div className="p-3 text-17 font-semibold">
                    Khóa học tiêu biểu
                </div>
                <div>
                    <a href="#" className="p-3 text-17 font-semibold hover:underline duration-300">Xem tất cả</a>
                </div>
            </div>

            <div className="relative pl-5 course-list">
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