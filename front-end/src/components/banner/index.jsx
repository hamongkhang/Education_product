import React from 'react'
import BannerItem from './bannerItem'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const NextArrow = (props) => (
    <div onClick={props.onClick} className="opacity-0 group-hover:opacity-100 absolute top-1/2 z-10 transform -translate-y-1/2 right-2 w-10 h-10 flex items-center justify-center rounded-full group cursor-pointer hover:opacity-70 duration-300">
        <i class="far fa-chevron-right text-3xl font-medium text-white hover:text-gray-500 duration-300"></i>
    </div>
)
const PrevArrow = (props) => (
    <div onClick={props.onClick} className="opacity-0 group-hover:opacity-100 absolute top-1/2 z-10 transform -translate-y-1/2 left-2 w-10 h-10 flex items-center justify-center rounded-full group cursor-pointer hover:opacity-70 duration-300">
        <i class="far fa-chevron-left text-3xl font-medium text-white hover:text-gray-500 duration-300"></i>
    </div>
)

const Banner = (props) => {
    const settings = {
        // dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: 0,
        // variableWidth: true,
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
        <div className="group">
            <Slider {...settings}>
                <BannerItem/>
                <BannerItem/>
                <BannerItem/>
            </Slider>
        </div>
    )
}
export default Banner