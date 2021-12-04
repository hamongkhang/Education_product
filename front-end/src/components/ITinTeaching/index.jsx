import React, { useState, useRef, useEffect } from 'react';
import ITinTeachingItem from './ITinTeachingItem';
import Preloader from '../preloader';

const ITinTeachingList = (props) => {
    const [ITlist, setITList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getITList = () => {
        setIsLoading(true);
        const requestOptions = {
            method: 'GET',
        };
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/ITinTeach/getITinTeach`,
            requestOptions,
        )
            .then((res) => res.json())
            .then((json) => {
                setITList(json.data);
                setIsLoading(false);
            });
    };
    useEffect(() => {
        getITList();
    }, []);
    return (
        <div className="w-full object-cover rounded-lg overflow-hidden mt-5">
            {isLoading && <Preloader />}
            <h3 className="text-center font-semibold text-3xl uppercase mb-10">
                CNTT trong dạy học
            </h3>
            <div className="grid grid-cols-1 sm1:grid-cols-2 sm:grid-cols-3 gap-2 lg:gap-5">
                {ITlist &&
                    ITlist.map((item, index) => (
                        <ITinTeachingItem key={index} {...item} />
                    ))}
            </div>
        </div>
    );
};
export default ITinTeachingList;
