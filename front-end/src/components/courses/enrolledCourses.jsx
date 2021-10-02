import React, { useState, useEffect } from 'react'
import RigisterCourseItem from './enrolledCourseItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const arr = [
    {
        name: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
    },
    {
        name: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
    },
]

const EnrolledCourses = (props) => {
    const [show, setShow] = useState(8);
    const [arr1, setArr1] = useState([]);
    const [pageItem, setPageItem] = useState(1);
    const [page, setPage] = useState(0);
    const handleChange = (event, value) => {
        setPageItem(value);
        renderCourses(value);
    };

    const renderCourses = (value = 1) => {
        let end = value * show,
        start = end - show;
        setArr1(arr.slice(start, end));
    }
    useEffect(() => {
        setPage(parseInt(arr.length/show + 1));
        renderCourses();
    }, [])
    return (
        <div className="">
            <div className="flex flex-col md:flex-row items-start justify-between uppercase font-semibold mt-5">
                <div className="text-xl sm:text-2xl">Các khóa học đã đăng ký</div>
                <div>
                    <input type="text" className="px-3 py-2 border-2 hover:border-gray-400 rounded w-80 outline-none focus:border-indigo-500" placeholder="Tìm kiếm"/>
                </div>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm1:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 my-4">
                {
                    arr1.map((item, index) => ( <RigisterCourseItem key={index} {...item} /> ))
                }
            </div>
            <div className="flex justify-center mb-10">
                <Stack spacing={2}>
                    <Pagination count={page} page={pageItem} onChange={handleChange} showFirstButton showLastButton color="primary" variant="outlined" shape="rounded"/>
                </Stack>
            </div>
        </div>
    )
}

export default EnrolledCourses