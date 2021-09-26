import React from 'react'
import ArticleItem from './articleItem'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { NextArrow, PrevArrow } from '../customArrowsSlider'

const ArticleList = (props) => {
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
        <div className="mt-10">
            <div className="font-bold text-3xl text-center mb-10 uppercase">
                Bài viết nổi bật
            </div>
            <div className="custom-btn-arrow">
                <Slider {...settings}>
                    <ArticleItem/>
                    <ArticleItem/>
                    <ArticleItem/>
                    <ArticleItem/>
                    <ArticleItem/>
                </Slider>
            </div>
        </div>
    )
}
export default ArticleList