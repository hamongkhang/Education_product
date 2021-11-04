import React, { useState, useEffect } from 'react';
import RigisterCourseItem from './enrolledCourseItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const arr = [
    {
        name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    },
];

const EnrolledCourses = (props) => {
    const [show, setShow] = useState(8);
    const [arr1, setArr1] = useState([]);
    const [pageItem, setPageItem] = useState(1);
    const [page, setPage] = useState(0);
    const [course, setCourse] = useState([]);
    const [history, setHistory] = useState([]);
    const [count, setCount] = useState([]);
    const [count2, setCount2] = useState([]);
    const [search, setSearch] = useState([]);
    const $token = localStorage.getItem('access_token');

    const addSearch = (event) => {
        setHistory(search);
        setCount(count2);
        const target = event.target;
        var a = [];
        var b = [];
        if (target.value) {
            for (var i = 0; i < search.length; i++) {
                if (search[i].name.indexOf(target.value) != -1) {
                    a.push(search[i]);
                    b.push(count2[i]);
                }
            }
            setHistory(a);
            setCount(b);
        }
    };

    const getApiSecond = () => {
        fetch('http://localhost:8000/api/history/getHistoryCourse', {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                setHistory(data.data);
                setSearch(data.data);
            });
        return () => {};
    };

    const tinhTong = () => {
        fetch('http://localhost:8000/api/getCountHistory', {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                setCount(data.data);
                setCount2(data.data);
            });
        return () => {
            for (var i = 0; i < count.length; i++) {
                if (count[i] == null) {
                    count[i] = 0;
                }
            }
        };
    };

    useEffect(() => {
        getApiSecond();
        tinhTong();
    }, []);

    const handleChange = (event, value) => {
        setPageItem(value);
        renderCourses(value);
    };

    const renderCourses = (value = 1) => {
        let end = value * show,
            start = end - show;
        setArr1(arr.slice(start, end));
    };
    useEffect(() => {
        setPage(parseInt(arr.length / show + 1));
        renderCourses();
    }, []);
    return (
        <div className="">
            <div className="flex flex-col md:flex-row items-start justify-between uppercase font-semibold mt-5">
                <div className="text-xl sm:text-2xl">
                    Các khóa học đã đăng ký
                </div>
                <div>
                    <input
                        type="text"
                        onChange={(event) => addSearch(event)}
                        className="px-3 py-2 border-2 hover:border-gray-400 rounded w-80 outline-none focus:border-indigo-500"
                        placeholder="Tìm kiếm"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm1:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 my-4">
                {history.map((item, i) => {
                    return <RigisterCourseItem data={item} count={count[i]} />;
                })}
            </div>
            <div className="flex justify-center mb-10">
                <Stack spacing={2}>
                    <Pagination
                        count={page}
                        page={pageItem}
                        onChange={handleChange}
                        showFirstButton
                        showLastButton
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                    />
                </Stack>
            </div>
        </div>
    );
};

export default EnrolledCourses;
