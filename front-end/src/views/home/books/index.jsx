import React, { useState, useEffect } from 'react';
import { BannerBook } from '../../../components/banner';
import { BookItem } from '../../../components/books';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const arr = [
    {
        name: '12',
    },
    {
        name: '12',
    },
    {
        name: '12',
    },
    {
        name: '12',
    },
    {
        name: 'THPT',
    },
    {
        name: 'THPT',
    },
    {
        name: 'THPT',
    },
    {
        name: 'THPT',
    },
    {
        name: '11',
    },
    {
        name: '11',
    },
    {
        name: '11',
    },
    {
        name: '11',
    },
    {
        name: '10',
    },
    {
        name: '10',
    },
];

const Books = (props) => {
    const $token = localStorage.getItem('access_token');
    const [book, setBook] = useState([]);
    const [bookType, setBookType] = useState([]);
    const [bookSearch, setBookSearch] = useState([]);
    const [show, setShow] = useState(8);
    const [arr1, setArr1] = useState([]);
    const [pageItem, setPageItem] = useState(1);
    const [page, setPage] = useState(0);
    const handleChange = (event, value) => {
        setPageItem(value);
        renderBooks(value);
    };
    const addBookType = (event) => {
        const target = event.target;
        const field = target.name;
        const value = target.value;
        const _formData = new FormData();
        _formData.append('id', target.value);
        if ($token) {
            fetch('http://localhost:8000/api/getBookTypeSearch', {
                method: 'POST',
                body: _formData,
                headers: { Authorization: `Bearer ` + $token },
            })
                .then((response) => response.json())
                .then((data) => setBook(data.bookTypeSearch));
            return () => {};
        } else {
            fetch('http://localhost:8000/api/getBookTypeSearch', {
                method: 'POST',
                body: _formData,
            })
                .then((response) => response.json())
                .then((data) => setBook(data.bookTypeSearch));
            return () => {};
        }
    };

    const renderBooks = (value = 1) => {
        let end = value * show,
            start = end - show;
        setArr1(arr.slice(start, end));
    };

    const getApiFirst = () => {
        fetch('http://localhost:8000/api/getBookTypes', {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => setBookType(data.book_types));
        return () => {};
    };
    const getApiSecond = () => {
        fetch('http://localhost:8000/api/getBooks', {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => setBook(data.books));
        return () => {};
    };

    useEffect(() => {
        if ($token) {
            getApiFirst();
            getApiSecond();
        } else {
            getApiFirst();
            getApiSecond();
        }
        setPage(parseInt(arr.length / show + 1));
        renderBooks();
    }, []);
    return (
        <>
            <BannerBook />
            <div className="xl:w-4/5 xl:px-0 px-4 w-full relative left-1/2 transform -translate-x-1/2 mt-10">
                <div className="bg-purple-800 w-full h-12 md:h-16 rounded-md mb-10 flex items-center justify-between px-3 md:px-6">
                    <div className="font-medium text-white uppercase">
                        Hiển thị 9/20
                    </div>

                    <div>
                        <select
                            name="bookSearch"
                            onChange={(event) => addBookType(event)}
                            id=""
                            className="px-3 py-2 rounded-sm outline-none cursor-pointer"
                        >
                            <option name="bookSearch" value="allBook">
                                Toàn bộ sách
                            </option>
                            {bookType.map((item, index) => (
                                <option name="bookSearch" value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="w-full grid mx-auto pl-2 grid-cols-1 gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {book.map((item, index) => (
                        <BookItem key={index} {...item} />
                    ))}
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
        </>
    );
};
export default Books;
