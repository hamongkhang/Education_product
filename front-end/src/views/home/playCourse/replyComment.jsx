import React, { useState } from 'react';
import InputReply from './inputReply'

const ReplyComment = () => {
    const [inputReply, setInputRepply] = useState("hidden");
    const [comment, setComment] = useState("");
    const handleInputReply = () => {
        inputReply === "hidden" ?
            setInputRepply("block") : 
            setInputRepply("hidden");
    }

    const onChange = (e) => {
        setComment(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(comment);
    }

    return (
        <div className="mx-3">
            <div className="flex mt-2 space-x-3">
                <div>
                    <img src={`${window.location.origin}/assets/images/slider/city.jpg`} className="rounded-full w-10 h-10 object-cover" alt="" />
                </div>
                <div className="block bg-gray-200 mr-1 rounded-xl py-2 px-3 w-10/12 max-w-lg">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, inventore, repellat sequi iusto odit nihil modi consequatur porro eaque ipsam illo nulla cupiditate reiciendis doloribus voluptatum. Minima quidem maiores sunt!</p>
                </div>
            </div>
            <div className="text-sm font-bold text-gray-600 ml-14 pt-1">
                <span className="hover:underline cursor-pointer" onClick={handleInputReply}>Trả lời</span>&nbsp;·&nbsp;
                <span>1 giờ trước</span>
            </div>
            <div className={`xs:ml-10 ${inputReply}`}>
                <InputReply 
                    handleInputReply={handleInputReply}
                    onChange={onChange}
                    onSubmit={onSubmit}
                />
            </div>
        </div>
    )
}
export default ReplyComment