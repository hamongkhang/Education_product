import React, { useState, useEffect } from 'react'
import { BannerBook } from '../../../components/banner'
import { CourseItem } from '../../../components/courses'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const arr = [
    {
        name: "12"
    },
    {
        name: "12"
    },
    {
        name: "12"
    },
    {
        name: "12"
    },
    {
        name: "THPT"
    },
    {
        name: "THPT"
    },
    {
        name: "THPT"
    },
    {
        name: "THPT"
    },
    {
        name: "11"
    },
    {
        name: "11"
    },
    {
        name: "11"
    },
    {
        name: "11"
    },
    {
        name: "10"
    },
    {
        name: "10"
    },
]

const Books = (props) => {
    const [show, setShow] = useState(8);
    const [arr1, setArr1] = useState([]);
    const [pageItem, setPageItem] = useState(1);
    const [page, setPage] = useState(0);
    const handleChange = (event, value) => {
        setPageItem(value);
        renderBooks(value);
    };

    const renderBooks = (value = 1) => {
        let end = value * show,
        start = end - show;
        setArr1(arr.slice(start, end));
    }
    useEffect(() => {
        setPage(parseInt(arr.length/show + 1));
        renderBooks();
    }, [])

    return (
        <>
            <BannerBook/>
            <div className="xl:w-4/5 xl:px-0 px-4 w-full relative left-1/2 transform -translate-x-1/2 mt-10">
                <div className="bg-indigo-300 w-full h-12 md:h-16 rounded-md mb-10 flex items-center justify-between px-3 md:px-6" >
                    <div className="font-medium uppercase">
                        Hiển thị 9/20
                    </div>

                    <div>
                        <select name="" id="" className="px-3 py-2 rounded-sm outline-none cursor-pointer">
                            <option value="">Tất cả</option>
                            <option value="">Ôn thi THPT</option>
                            <option value="">12</option>
                            <option value="">11</option>
                            <option value="">10</option>
                        </select>
                    </div>
                </div>
                <div className="w-full grid mx-auto pl-2 grid-cols-1 gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {
                        arr1.map((item, index) => ( <CourseItem key={index} {...item} /> ))
                    }
                </div>
                <div className="flex justify-center mb-10">
                    <Stack spacing={2}>
                        <Pagination count={page} page={pageItem} onChange={handleChange} showFirstButton showLastButton color="primary" variant="outlined" shape="rounded"/>
                    </Stack>
                </div>
            </div>
        </>
    )
}
export default Books