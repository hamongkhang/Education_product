import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Logo from '../../../components/header/logo';
import Comment from './comment';
import CourseName from './courseName';
import CourseChapter from './courseChapter';
import { useRouteMatch } from 'react-router';
import { useHistory } from 'react-router-dom';
import Preloader from '../../../components/preloader';

import { toast } from 'react-toastify';

toast.configure();

const PlayCourse = (props) => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [txt, setTxt] = useState('Nội dung');
    const match = useRouteMatch();
    const [classContent, setClassContent] = useState('translate-x-full');
    const [url, setUrl] = useState('');
    const [id, setId] = useState('');
    const [contentAlpha, setContentAlpha] = useState([]);
    const $token = localStorage.getItem('access_token');
    const [comment, setComment] = useState([]);
    const [commentReply, setCommentReply] = useState([]);
    const [table, setTable] = useState([]);
    const [lessonAlpha, setLessonAlpha] = useState([]);
    const [course, setCourse] = useState([]);
    const [addComment, setAddComment] = useState([]);

    const handleCheckLoggedIn = () => {
        if (localStorage.getItem('access_token')) {
            let token = localStorage.getItem('access_token');
            if (!token) {
                history.goBack();
            }
        } else {
            history.goBack();
        }
    };

    useEffect(() => {
        handleCheckLoggedIn();
    }, []);

    const getComment = (id) => {
        setIsLoading(true);
        const _formData = new FormData();
        _formData.append('lessonId', id);
        const requestOptions = {
            method: 'POST',
            body: _formData,
            headers: { Authorization: `Bearer ` + $token },
        };
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/comment/getComment  `,
            requestOptions,
        )
            .then((response) => response.json())
            .then((data) => {
                setComment(data.data[0]);
                setCommentReply(data.data[1]);
                setIsLoading(false);
            });
    };

    const getOneCourse = () => {
        setIsLoading(true);
        const _formData = new FormData();
        _formData.append('id', match.params.id);
        const requestOptions = {
            method: 'POST',
            body: _formData,
            headers: { Authorization: `Bearer ` + $token },
        };
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/getOneCourse`,
            requestOptions,
        )
            .then((response) => response.json())
            .then((data) => {
                setCourse(data.course);
                setIsLoading(false);
            });
    };

    const getTableOfContentAlpha = () => {
        setIsLoading(true);
        const _formData = new FormData();
        _formData.append('id', match.params.id);
        const requestOptions = {
            method: 'POST',
            body: _formData,
            headers: { Authorization: `Bearer ` + $token },
        };
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/getTableOfContentAlpha`,
            requestOptions,
        )
            .then((response) => response.json())
            .then((data) => {
                setTable(data.data);
                setIsLoading(false);
            });
    };
    const getContentAlpha = () => {
        setIsLoading(true);
        const _formData = new FormData();
        _formData.append('id', match.params.id);
        const requestOptions = {
            method: 'POST',
            body: _formData,
            headers: { Authorization: `Bearer ` + $token },
        };
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/getContentAlpha`,
            requestOptions,
        )
            .then((response) => response.json())
            .then((data) => {
                setContentAlpha(data.data);
                setIsLoading(false);
            });
    };

    const getLessonAlpha = () => {
        setIsLoading(true);
        const _formData = new FormData();
        _formData.append('id', match.params.id);
        const requestOptions = {
            method: 'POST',
            body: _formData,
            headers: { Authorization: `Bearer ` + $token },
        };
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/getLessonAlpha`,
            requestOptions,
        )
            .then((response) => response.json())
            .then((data) => {
                setLessonAlpha(data.data);
                if (data.data[0]) {
                    setUrl(data.data[0].file_name);
                    setId(data.data[0].id);
                    getComment(data.data[0].id);
                    setIsLoading(false);
                }
            });
        return () => {};
    };
    const handleContent = () => {
        if (txt === 'Nội dung') {
            setTxt('Đóng');
            setClassContent('translate-x-0');
        } else {
            setTxt('Nội dung');
            setClassContent('translate-x-full');
        }
    };

    const addCommentFunction = (event) => {
        setAddComment(event.target.value);
    };

    useEffect(() => {
        getTableOfContentAlpha();
        getContentAlpha();
        getOneCourse();
        getLessonAlpha();
    }, []);

    const handleUrl = (url, id) => {
        setUrl(url);
        setId(id);
        handleContent();
        getComment(id);
        console.log(url);
    };

    const onSubmitComment = (e) => {
        e.preventDefault();
        if (addComment) {
            if (addComment.trim()) {
                if ($token) {
                    const _formData = new FormData();
                    _formData.append('message', addComment);
                    _formData.append('lessonId', id);
                    const requestOptions = {
                        method: 'POST',
                        body: _formData,
                        headers: { Authorization: `Bearer ` + $token },
                    };
                    fetch(
                        `${process.env.REACT_APP_URL_SERVER}/api/comment/addComment`,
                        requestOptions,
                    )
                        .then((res) => res.json())
                        .then((json) => {
                            if (json.message) {
                                toast.info(`${json.message}`, {
                                    position: 'top-center',
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                            } else {
                                setComment(json.data);
                                setAddComment('');
                            }
                        });
                } else {
                    toast.warn(`Bạn chưa đăng nhập!`, {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                e.target.reset();
            } else {
                setAddComment('');
            }
        }
    };
    return (
        <div className="relative overflow-hidden">
            {isLoading && <Preloader />}
            <header className="shadow-md fixed top-0 w-full pt-1 bg-gray-600 z-30 max-w-screen-2xl mx-auto">
                <div className="w-11/12 mx-auto h-16 ">
                    <div className="flex justify-between items-center">
                        <Logo />
                        <div
                            className="text-white uppercase cursor-pointer block lg:hidden"
                            onClick={handleContent}
                        >
                            {txt}
                        </div>
                    </div>
                </div>
            </header>
            <div className="w-full mt-16 mx-auto">
                <div className="block lg:flex max-w-screen-2xl">
                    <div className="w-full lg:w-3/4">
                        <div className="px-0 md:px-16 bg-black">
                            {url.includes('http') ? (
                                <ReactPlayer
                                    url={url}
                                    controls={true}
                                    width="100%"
                                    playing={true}
                                    height="100%"
                                />
                            ) : (
                                <ReactPlayer
                                    url={`${process.env.REACT_APP_URL_SERVER}/upload/lesson_files/${url}`}
                                    controls={true}
                                    width="100%"
                                    playing={true}
                                    height="100%"
                                />
                            )}
                        </div>
                        <div className="w-11/12 mx-auto mb-10">
                            <div className="py-3 mt-2 border-b-2 uppercase font-semibold border-blue-600 mb-4 ">
                                {' '}
                                Bình luận
                            </div>
                            <div>
                                <div className="flex space-x-3 mx-0 md:mx-3 mt-5 mb-3">
                                    <img
                                        src={`${window.location.origin}/assets/images/slider/city.jpg`}
                                        className="rounded-full w-10 h-10 object-cover"
                                        alt=""
                                    />
                                    <form
                                        onSubmit={onSubmitComment}
                                        className="w-full"
                                    >
                                        <div className="w-full">
                                            <input
                                                onChange={(event) =>
                                                    addCommentFunction(event)
                                                }
                                                value={addComment}
                                                name="message"
                                                type="text"
                                                className="border-b-2 block w-full md:w-508 border-gray-300 outline-none py-1"
                                                placeholder="Bạn có thắc mắc gì trong bài học này?"
                                            />
                                        </div>
                                        <div className="text-right space-x-3 mt-3 w-full md:w-508">
                                            <button
                                                type="submit"
                                                className="rounded font-semibold px-3 py-1 uppercase bg-yellow-400 hover:bg-yellow-500 text-white"
                                            >
                                                Bình luận
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="space-y-4 lg:h-814 custom-scroll-1 lg:overflow-y-scroll">
                                    {comment &&
                                        comment.map((item, index) => {
                                            if (item.lessonId == id) {
                                                let reply = commentReply.filter(
                                                    (item2) =>
                                                        item2.id_reply ==
                                                            item.id &&
                                                        item2.lessonId == id,
                                                );
                                                return (
                                                    <Comment
                                                        key={index}
                                                        item={item}
                                                        replyComment={reply}
                                                        amountReply={
                                                            reply.length
                                                        }
                                                        setCommentReply={
                                                            setCommentReply
                                                        }
                                                    />
                                                );
                                            }
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/4">
                        <div
                            className={`lg:sticky lg:top-16 bottom-0 mt-1 absolute top-0 right-0 w-full h-full duration-500 transform bg-white lg:translate-x-0 ${classContent}`}
                        >
                            <CourseName
                                name={course.name}
                                date={course.updated_at}
                            />{' '}
                            <div className="overflow-y-scroll scroll-none h-screen">
                                {table.map((item, i) => {
                                    return (
                                        <CourseChapter
                                            table={item}
                                            index={i}
                                            contentAlpha={contentAlpha}
                                            lesson={lessonAlpha}
                                            handleUrl={handleUrl}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayCourse;
