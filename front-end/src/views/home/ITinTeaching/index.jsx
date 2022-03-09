import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArticleItem } from '../../../components/articles';
import { BannerBook } from '../../../components/banner';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const arr = [
    {
        name: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    },
    {
        name: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    },
];

const ITinTeaching = (props) => {
    const [show, setShow] = useState(9);
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
    };
    useEffect(() => {
        setPage(parseInt(arr.length / show + 1));
        renderArticles();
    }, []);
    return (
        <>
            <BannerBook />
            <div className="xl:w-4/5 xl:px-0 px-4 w-full mx-auto mt-10">
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 -mr-2">
                    {arr1.map((item, index) => (
                        <ArticleItem key={index} {...item} />
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

export default ITinTeaching;
