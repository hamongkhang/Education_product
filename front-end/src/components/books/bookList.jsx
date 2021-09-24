import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import BookItem from './bookItem'
import { Link } from 'react-router-dom'
import { NextArrow, PrevArrow } from '../customArrowsSlider'

const BookList = (props) => {
    const settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 4,
        slidesToScroll: 4,
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
            <div className="bg-green-700 shadow-md rounded-md h-12 my-10 flex items-center justify-between relative overflow-hidden z-0 text-white">
            {/* <div className="w-40 h-40 bg-green-600 transform rotate-45 absolute z-0 -right-16"/> */}
            <div className="w-40 h-40 rounded-full bg-yellow-700 absolute z-0 -top-3/4 -right-5"/>
                <div className="p-3 text-17 font-semibold uppercase ">
                    Sách
                </div>
                <div className="z-10">
                    <Link to="/sach" className="p-3 text-17 font-semibold hover:underline duration-300">Xem tất cả</Link>
                </div>
            </div>

            <div className="relative custom-btn-arrow">
                <Slider {...settings}>
                    <BookItem/>
                    <BookItem/>
                    <BookItem/>
                    <BookItem/>
                    <BookItem/>
                    <BookItem/>
                    <BookItem/>
                    <BookItem/>
                    <BookItem/>
                    <BookItem/>
                </Slider>
            </div>
        </div>
    )
}
export default BookList