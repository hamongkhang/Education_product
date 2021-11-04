import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const EnrolledCourseItem = (props) => (
    <div className="shadow-md rounded overflow-hidden box-content bg-white">
        <div>
            <img
                src={
                    'http://localhost:8000/upload/images/course/' +
                    props.data.image
                }
                className="w-full h-44 object-cover"
                alt=""
            />
        </div>
        <div className="m-5 space-y-3">
            <div>
                <Link
                    to="/"
                    className="line-2 font-semibold hover:text-green-500 duration-200"
                >
                    {props.data.name}
                </Link>
            </div>
            <div>
                <div className="flex justify-between items-center">
                    <div className="space-x-2">
                        <i className="fad fa-book-open text-indigo-300"></i>
                        <span className="text-15 text-gray-500">
                            {props.count} Video
                        </span>
                    </div>
                    <div className="space-x-2">
                        <i className="fad fa-clock text-indigo-600"></i>
                        <span className="text-15 text-gray-500">3h52p</span>
                    </div>
                    {/* <div></div> */}
                </div>
                <div className="relative h-1 bg-gray-300">
                    <div
                        className="absolute w-4/6 bg-green-500 inset-0 h-full duration-300"
                        style={{ width: '95%' }}
                    ></div>
                </div>
            </div>
            <div className="">
                <Link
                    to={'/bai-hoc/' + props.data.id}
                    className="w-full block font-medium tracking-widest bg-yellow-400 hover:bg-yellow-500 text-center py-2 text-white uppercase duration-200 rounded"
                >
                    Học
                </Link>
            </div>
            <div className="text-13 text-gray-500 text-center">
                <span>
                    Đăng ký ngày:{' '}
                    {moment(props.data.created_at).format('DD/MM/YYYY')}
                </span>
            </div>
        </div>
    </div>
);

export default EnrolledCourseItem;
