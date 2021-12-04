import React, { useState, useEffect } from 'react';
import { BannerBook } from '../../../components/banner';
import { BookItem } from '../../../components/books';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Preloader from '../../../components/preloader';

const Books = (props) => {
    const { changeRender } = props;
    const $token = localStorage.getItem('access_token');
    const [book, setBook] = useState([]);
    const [books1, setBooks1] = useState([]);
    const [bookType, setBookType] = useState([]);
    const [bookSearch, setBookSearch] = useState([]);
    const [show, setShow] = useState(8);
    const [pageItem, setPageItem] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const handleChange = (event, value) => {
        setPageItem(value);
        renderBooks(value);
    };
    const addBookType = (event) => {
        setIsLoading(true);
        const target = event.target;
        const field = target.name;
        const value = target.value;
        const _formData = new FormData();
        _formData.append('id', target.value);
        if ($token) {
            fetch(`${process.env.REACT_APP_URL_SERVER}/api/getBookTypeSearch`, {
                method: 'POST',
                body: _formData,
                headers: { Authorization: `Bearer ` + $token },
            })
                .then((response) => response.json())
                .then((data) => {
                    setBook(data.bookTypeSearch);
                    setBooks1(data.bookTypeSearch);
                    setIsLoading(false);
                });
        } else {
            fetch(`${process.env.REACT_APP_URL_SERVER}/api/getBookTypeSearch`, {
                method: 'POST',
                body: _formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    setBook(data.bookTypeSearch);
                    setBooks1(data.bookTypeSearch);
                    setIsLoading(false);
                });
        }
    };

    const renderBooks = (value = 1) => {
        let end = value * show,
            start = end - show;
        setBook(books1.slice(start, end));
    };

    const getApiFirst = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/getBookTypes`, {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                setBookType(data.book_types);
                setIsLoading(false);
            });
    };

    const getApiSecond = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/getBooks`, {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                setBook(data.books);
                setBooks1(data.books);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if ($token) {
            getApiFirst();
            getApiSecond();
        } else {
            getApiFirst();
            getApiSecond();
        }
        setPage(parseInt(books1.length / show + 1));
        renderBooks();
    }, []);

    useEffect(() => {
        setPage(parseInt(books1.length / show + 1));
        renderBooks();
    }, [books1]);
    return (
        <>
            {isLoading && <Preloader />}
            <BannerBook />
            <div className="xl:w-4/5 xl:px-0 px-4 w-full relative left-1/2 transform -translate-x-1/2 mt-10">
                <div className="bg-purple-800 w-full h-12 md:h-16 rounded-md mb-10 flex items-center justify-between px-3 md:px-6">
                    <div className="font-medium text-white uppercase">
                        Hiển thị {book.length + '/' + books1.length}
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
                        <BookItem
                            key={index}
                            {...item}
                            changeRender={changeRender}
                        />
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
