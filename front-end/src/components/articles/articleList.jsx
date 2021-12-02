import React, { useState, useEffect } from 'react';
import ArticleItem from './articleItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../customArrowsSlider';
import Preloader from '../preloader';

const ArticleList = (props) => {
    const [featuredPost, setFeaturedPost] = useState([]);
    const $user = window.localStorage.getItem('nameAccount');
    const [isLoading, setIsLoading] = useState(true);
    const $token = localStorage.getItem('access_token');

    useEffect(() => {
        setIsLoading(true);
        if ($token) {
            fetch('http://localhost:8000/api/featuredPost/getFeaturedPost', {
                method: 'GET',
                headers: { Authorization: `Bearer ` + $token },
            })
                .then((response) => response.json())
                .then((data) => {
                    setFeaturedPost(data.data);
                    setIsLoading(false);
                });
        } else {
            fetch('http://localhost:8000/api/featuredPost/getFeaturedPost', {
                method: 'GET',
            })
                .then((response) => response.json())
                .then((data) => {
                    setFeaturedPost(data.data);
                    setIsLoading(false);
                });
        }
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
        <div className="">
            {isLoading && <Preloader />}
            <div className="font-bold text-3xl text-center mb-10 uppercase">
                Bài viết nổi bật
            </div>
            <div className="custom-btn-arrow">
                <Slider {...settings}>
                    {featuredPost.map((item) => {
                        return <ArticleItem data={item} user={$user} />;
                    })}
                </Slider>
            </div>
        </div>
    );
};
export default ArticleList;
