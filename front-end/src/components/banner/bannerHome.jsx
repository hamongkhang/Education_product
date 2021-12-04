import React, { useState, useEffect } from 'react';
import BannerItem from './bannerItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Preloader from '../preloader';

const NextArrow = (props) => (
    <div
        onClick={props.onClick}
        className="opacity-0 group-hover:opacity-100 absolute top-1/2 z-10 transform -translate-y-1/2 right-2 w-10 h-10 flex items-center justify-center rounded-full group cursor-pointer hover:opacity-70 duration-300"
    >
        <i class="far fa-chevron-right lg:text-3xl text-lg font-medium text-white hover:text-gray-500 duration-300"></i>
    </div>
);
const PrevArrow = (props) => (
    <div
        onClick={props.onClick}
        className="opacity-0 group-hover:opacity-100 absolute top-1/2 z-10 transform -translate-y-1/2 left-2 w-10 h-10 flex items-center justify-center rounded-full group cursor-pointer hover:opacity-70 duration-300"
    >
        <i class="far fa-chevron-left lg:text-3xl text-lg font-medium text-white hover:text-gray-500 duration-300"></i>
    </div>
);

const BannerHome = (props) => {
    const [banner, setBanner] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/banner/getBanner`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => setBanner(data.data));
        setIsLoading(false);
    }, []);
    const settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: 0,
        swipeToSlide: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    return (
        <div className="group">
            {isLoading && <Preloader />}
            <Slider {...settings}>
                {banner.map((item, i) => {
                    return <BannerItem data={item} />;
                })}
                {/* <BannerItem/>
                <BannerItem/>
                <BannerItem/> */}
            </Slider>
        </div>
    );
};
export default BannerHome;
