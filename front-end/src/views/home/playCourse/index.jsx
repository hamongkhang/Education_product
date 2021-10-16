import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import Logo from '../../../components/header/logo'
import Comment from './comment'
import CourseName from './courseName'
import CourseChapter from './courseChapter'

const arr = [
    {
        url: "https://youtu.be/J0Wy359NJPM",
    },
    {
        url: "https://youtu.be/iO9QI3XcXhw",
    },
    {
        url: "https://youtu.be/PKZDNICWTpQ",
    },
    {
        url: "https://youtu.be/TF70IYJN4sc",
    },
    {
        url: "https://youtu.be/JEs7rSXT6QM",
    },
    {
        url: "https://youtu.be/JEs7rSXT6QM",
    },
]

const PlayCourse = (props) => {
    const [txt, setTxt] = useState("Nội dung");
    const [classContent, setClassContent] = useState("translate-x-full");
    const [url, setUrl] = useState("");
    const [content, setContent] = useState([]);

    const handleContent = () => {
        if(txt === "Nội dung") {
            setTxt("Đóng");
            setClassContent("translate-x-0");
        }
        else {
            setTxt("Nội dung");
            setClassContent("translate-x-full");
        }
    }

    useEffect(() => {
        setContent(arr);
        setUrl(arr[0].url);
    }, [])

    const handleUrl = (param) => {
        setUrl(param.url);
        handleContent();
    }
    return (
        <div className="relative overflow-hidden">
            <header className="shadow-md fixed top-0 w-full pt-1 bg-gray-600 z-30 max-w-screen-2xl mx-auto" >
                <div className="w-11/12 mx-auto h-16 ">
                    <div className="flex justify-between items-center">
                        <Logo/>
                        <div className="text-white uppercase cursor-pointer block lg:hidden" onClick={handleContent}>
                            {txt}
                        </div>
                    </div>
                </div>
            </header>
            <div className="w-full mt-16 mx-auto">
                <div className="block lg:flex max-w-screen-2xl">
                    <div className="w-full lg:w-3/4 mb-20">
                        <div className="px-0 md:px-16 bg-black lg:h-508">
                            <ReactPlayer url={url} controls={true} width="100%" height="100%"/>
                        </div>
                        <div className="w-11/12 mx-auto">
                            <div className="py-3 mt-2 border-b-2 uppercase font-semibold border-blue-600 mb-4 ">Bình luận</div>
                            <div>
                                <div className="font-semibold">
                                    <span>11 Bình luận</span>
                                </div>

                                <div className="flex space-x-3 mx-0 md:mx-3 mt-5 mb-3">
                                    <img src={`${window.location.origin}/assets/images/slider/city.jpg`} className="rounded-full w-10 h-10 object-cover" alt="" />
                                    <form action="#" className="w-full">
                                        <div className="w-full">
                                            <input type="text" className="border-b-2 block w-full md:w-508 border-gray-300 outline-none py-1" placeholder="Bạn có thắc mắc gì trong bài học này?"/>
                                        </div>
                                        <div className="text-right space-x-3 mt-3 w-full md:w-508">
                                            {/* <button className="hover:bg-gray-200 font-semibold text-gray-500 duration-200 rounded px-3 py-1 uppercase">
                                                Hủy
                                            </button> */}
                                            <button type="submit" className="rounded font-semibold px-3 py-1 uppercase bg-yellow-400 hover:bg-yellow-500 text-white">Bình luận</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="space-y-4 lg:h-814 custom-scroll-1 lg:overflow-y-scroll">
                                    <Comment/>
                                    <Comment/>
                                    <Comment/>
                                    <Comment/>
                                    <Comment/>
                                    <Comment/>
                                    <Comment/>
                                    <Comment/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/4">
                        <div className={`lg:sticky lg:top-16 bottom-0 mt-1 absolute top-0 right-0 w-full h-full duration-500 transform bg-white lg:translate-x-0 ${classContent}`}>
                            <CourseName/>
                            <div className="overflow-y-scroll scroll-none shadow-inner" style={{ height: "1450px" }}>
                                <CourseChapter handleUrl={handleUrl} content={content}/>
                                <CourseChapter handleUrl={handleUrl} content={content}/>
                                <CourseChapter handleUrl={handleUrl} content={content}/>
                                <CourseChapter handleUrl={handleUrl} content={content}/>
                                <CourseChapter handleUrl={handleUrl} content={content}/>
                                <CourseChapter handleUrl={handleUrl} content={content}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayCourse