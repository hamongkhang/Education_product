import React from 'react'
import ArticleItem from './articleItem'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Articles = (props) => {
    const settings = {
        infinite: false,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerPadding: 0,
        swipeToSlide: true,
        // nextArrow: <NextArrow />,
        // prevArrow: <PrevArrow />,
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
        <div className="mt-20">
            <div className="font-bold text-3xl text-center mb-10">
                Bài viết nổi bật
            </div>
            <Slider {...settings}>
                <ArticleItem/>
                <ArticleItem/>
                <ArticleItem/>
                <ArticleItem/>
                <ArticleItem/>
            </Slider>
        </div>
    )
}
export default Articles