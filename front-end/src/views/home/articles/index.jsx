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
    const handleChange = (event, value) => {
        setPageItem(value);
        renderArticles(value);
    };

    const renderArticles = (value = 1) => {
        let end = value * show,
        start = end - show;
        setArr1(arr.slice(start, end));
    }
    useEffect(() => {
        setPage(parseInt(arr.length/show + 1));
        renderArticles();
    }, [])
    return (
        <>
            <BannerBook/>
            <div className="xl:w-4/5 xl:px-0 px-4 w-full mx-auto mt-10 flex flex-col lg:flex-row lg:space-x-6">
                <div className="w-full lg:w-4/6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                        {
                            arr1.map((item, index) => ( <ArticleItem key={index} {...item} /> ))
                        }
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
                            <input type="text" placeholder="Tìm kiếm" className="block px-6 py-3 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded-sm outline-none border-2" required/>
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
                                <input type="checkbox" name="" id="education" />
                                <span>Education</span>
                            </label>
                            <label htmlFor="itinteaching" className="cursor-pointer space-x-3">
                                <input type="checkbox" name="" id="itinteaching" />
                                <span>IT trong dạy học</span>
                            </label>
                            <label htmlFor="book" className="cursor-pointer space-x-3">
                                <input type="checkbox" name="" id="book" />
                                <span>Sách</span>
                            </label>
                            <label htmlFor="course" className="cursor-pointer space-x-3">
                                <input type="checkbox" name="" id="course" />
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
                            <Link to="/" className="flex space-x-2 items-center hover:bg-blue-100 p-2 rounded-md">
                                <img src={`${window.location.origin}/assets/images/slider/city.jpg`} className="h-16 w-16 rounded-md " alt="" />
                                <div>
                                    <p className="break-words line-2 uppercase font-medium">LUYỆN THI THPT QUỐC GIA 2022</p>
                                </div>
                            </Link>
                            <Link to="/" className="flex space-x-2 items-center hover:bg-blue-100 p-2 rounded-md">
                                <img src={`${window.location.origin}/assets/images/slider/city.jpg`} className="h-16 w-16 rounded-md " alt="" />
                                <div>
                                    <p className="break-words line-2 uppercase font-medium">LUYỆN THI THPT QUỐC GIA 2022</p>
                                </div>
                            </Link>
                            <Link to="/" className="flex space-x-2 items-center hover:bg-blue-100 p-2 rounded-md">
                                <img src={`${window.location.origin}/assets/images/slider/city.jpg`} className="h-16 w-16 rounded-md " alt="" />
                                <div>
                                    <span className="text-sm">22/09/2021</span>
                                    <p className="break-words line-2 uppercase font-medium">LUYỆN THI THPT QUỐC GIA 2022</p>
                                </div>
                            </Link>
                            <Link to="/" className="flex space-x-2 items-center hover:bg-blue-100 p-2 rounded-md">
                                <img src={`${window.location.origin}/assets/images/slider/city.jpg`} className="h-16 w-16 rounded-md " alt="" />
                                <div>
                                    <p className="break-words line-2 uppercase font-medium">LUYỆN THI THPT QUỐC GIA 2022</p>
                                </div>
                            </Link>
                            <Link to="/" className="flex space-x-2 items-center hover:bg-blue-100 p-2 rounded-md">
                                <img src={`${window.location.origin}/assets/images/slider/city.jpg`} className="h-16 w-16 rounded-md " alt="" />
                                <div>
                                    <p className="break-words line-2 uppercase font-medium">LUYỆN THI THPT QUỐC GIA 2022</p>
                                </div>
                            </Link>
                        </div>
                    </div>                    
                </div>
            </div>
            
        </>
    )
}

export default Articles