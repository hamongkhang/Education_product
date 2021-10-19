import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArticleItem } from '../../../components/articles'
import { BannerBook } from '../../../components/banner'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const arr = [
    {
        name: "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
    },
]

const Articles = (props) => {
    const [show, setShow] = useState(4);
    const [arr1, setArr1] = useState([]);
    const [pageItem, setPageItem] = useState(1);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState([]);
    const $link="http://localhost:8000/upload/images/featured_post/";
    const [featuredPost, setFeaturedPost] = useState([]);
    const $user=window.localStorage.getItem('nameAccount');
    const $token=localStorage.getItem('access_token');

    const addSearch = (event) => {
        setFeaturedPost(search);
        const target=event.target;
        var a=[];
        if(target.value){
            for (var i=0; i < search.length; i++) {
                if(search[i].name.indexOf(target.value)!=-1){
                   a.push(search[i]);
                }
          }
          setFeaturedPost(a);
        }
       
      };


    useEffect(() => {
        setPage(parseInt(arr.length/show + 1));
        renderArticles();
        if($token){
            fetch("http://localhost:8000/api/featuredPost/getFeaturedPost",{
                method: "GET",
                headers: {"Authorization": `Bearer `+$token}
          }  )
        .then(response => response.json())
        .then(data => {
            setFeaturedPost(data.data);
            setSearch(data.data);
        }
        );
        return () => {
        }
        }
    else{
        fetch("http://localhost:8000/api/featuredPost/getFeaturedPost",{
            method: "GET",
      }  )
    .then(response => response.json())
    .then(data => {
        setFeaturedPost(data.data);
        setSearch(data.data);
    });
    return () => {
    }
        }
    }, []);




    const handleChange = (event, value) => {
        setPageItem(value);
        renderArticles(value);
    };

    const renderArticles = (value = 1) => {
        let end = value * show,
        start = end - show;
        setArr1(arr.slice(start, end));
    }
    // useEffect(() => {
    //     setPage(parseInt(arr.length/show + 1));
    //     renderArticles();
    // }, [])
    return (
        <>
            <BannerBook/>
            <div className="xl:w-4/5 xl:px-0 px-4 w-full mx-auto mt-10 flex flex-col lg:flex-row lg:space-x-6">
                <div className="w-full lg:w-4/6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                          {featuredPost.map((item) => {
                      return(
                        <ArticleItem data={item} user={$user}/>
                      );
                    }
                    )}
                    </div>
                    <div className="flex justify-center mb-10">
                        <Stack spacing={2}>
                            <Pagination count={page} page={pageItem} onChange={handleChange} showFirstButton showLastButton color="primary" variant="outlined" shape="rounded"/>
                        </Stack>
                    </div>
                </div>
                <div className="w-full lg:w-2/6 mb-10 lg:mb-0">
                    <div>
                        <form action="#" className="relative">
                            <input type="text" onChange={(event) => addSearch(event)} placeholder="Tìm kiếm" className="block px-6 py-3 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded-sm outline-none border-2" required/>
                            <button type="submit" className="leading-5 absolute top-0 right-0 text-indigo-500 p-2 h-full px-4 rounded-sm">
                                <i className="far fa-search text-xl font-medium"/>
                            </button>
                        </form>
                    </div>

                    <div className="space-y-3 py-5 mt-8 border-b-2 border-gray-400 space-y-4 rounded-md shadow-lg">
                        <div className="uppercase font-medium px-5">
                            Thể Loại bài viết
                            <hr className="border-b border-gray-300 mt-2"/>
                        </div>
                        <div className="px-5 flex flex-col space-y-2">
                            <label htmlFor="education" className="cursor-pointer space-x-3">
                                <input type="checkbox" name="" id="education" checked />
                                <span>Education</span>
                            </label>
                            <label htmlFor="itinteaching" className="cursor-pointer space-x-3">
                                <input type="checkbox" name="" id="itinteaching" checked />
                                <span>IT trong dạy học</span>
                            </label>
                            <label htmlFor="book" className="cursor-pointer space-x-3">
                                <input type="checkbox" name="" id="book" checked />
                                <span>Sách</span>
                            </label>
                            <label htmlFor="course" className="cursor-pointer space-x-3">
                                <input type="checkbox" name="" id="course"  checked/>
                                <span>Khóa học</span>
                            </label>
                        </div>
                    </div>
                    <div className="space-y-3 py-5 mt-8 border-b-2 border-gray-400 space-y-4 rounded-md shadow-lg">
                        <div className="uppercase font-medium px-5">
                            Bài viết đề xuất
                            <hr className="border-b border-gray-300 mt-2"/>
                        </div>
                        <div className="px-3">
                        {featuredPost.map((item,i) => {
                            if(i<5){
                      return(
                        <Link to="/" className="flex space-x-2 items-center hover:bg-blue-100 p-2 rounded-md">
                        <img src={$link+item.image} className="h-16 w-16 rounded-md " alt="" />
                        <div>
                            <p className="break-words line-2 uppercase font-medium">{item.name}</p>
                        </div>
                    </Link>
                      );}
                    }
                    )}
                        </div>
                    </div>                    
                </div>
            </div>
            
        </>
    )
}

export default Articles