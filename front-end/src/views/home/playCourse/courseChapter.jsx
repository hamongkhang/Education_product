import React, { useState } from 'react'
import PlayCourseItem from './playCourseItem'

const CourseChapter = ({handleUrl, content}) => {
    console.log(content);
    const [chapter, setChapter] = useState("block");
    const [icon, setIcon] = useState("up");

    const handleChapterDetails = () => {
        if(chapter === "block") {
            setChapter("hidden");
            setIcon("down");
        }
        else {
            setChapter("block");
            setIcon("up");
        }
    }
    return (
        <div className="w-full">
            <div className="flex items-center justify-between border-b cursor-pointer pb-2 p-4 bg-gray-100 hover:bg-gray-200" onClick={handleChapterDetails}>
                <div>
                    <div className="text-17 font-semibold">Phần 1: Giới thiệu</div>
                    <div className="text-sm">2/2 | 33:00</div>
                </div>

                <div>
                    <i className={`fa fa-chevron-${icon}`} />
                </div>
            </div>
            <div className={chapter}>
                {
                    content.map((item, index) => (
                        <PlayCourseItem key={index} item={item} handleUrl={handleUrl}/>
                    ))
                }
            </div>
        </div>
    )
}

export default CourseChapter