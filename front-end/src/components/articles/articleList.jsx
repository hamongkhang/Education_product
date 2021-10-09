import React,{useState,useEffect} from 'react'
import ArticleItem from './articleItem'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { NextArrow, PrevArrow } from '../customArrowsSlider'

const ArticleList = (props) => {
    const [featuredPost, setFeaturedPost] = useState([]);
    const $user=window.localStorage.getItem('nameAccount');
    const $token=localStorage.getItem('access_token');

    useEffect(() => {
        if($token){
            fetch("http://localhost:8000/api/featuredPost/getFeaturedPost",{
                method: "GET",
                headers: {"Authorization": `Bearer `+$token}
          }  )
        .then(response => response.json())
        .then(data => setFeaturedPost(data.data)
        );
        return () => {
        }
        }
    else{
        fetch("http://localhost:8000/api/featuredPost/getFeaturedPost",{
            method: "GET",
      }  )
    .then(response => response.json())
    .then(data => setFeaturedPost(data.data)
    );
    return () => {
    }
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
        <div className="">
            <div className="font-bold text-3xl text-center mb-10 uppercase">
                Bài viết nổi bật
            </div>
            <div className="custom-btn-arrow">
                <Slider {...settings}>
                {featuredPost.map((item) => {
                      return(
                        <ArticleItem data={item} user={$user}/>
                      );
                    }
                    )}
                </Slider>
            </div>
        </div>
    )
}
export default ArticleList