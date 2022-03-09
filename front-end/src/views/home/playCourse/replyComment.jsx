import React from 'react';

const ReplyComment = ({ replyComment }) => {
    return (
        <div className="mx-3">
            <div className="flex mt-2 space-x-3">
                <div>
                    <img
                        src={`${window.location.origin}/assets/images/slider/city.jpg`}
                        className="rounded-full w-10 h-10 object-cover"
                        alt=""
                    />
                </div>
                <div className="block bg-gray-200 mr-1 rounded-xl py-2 px-3 w-10/12 max-w-lg">
                    <p>{replyComment.message}</p>
                </div>
            </div>
            <div className="text-sm font-bold text-gray-600 ml-14 pt-1">
                <span>1 giờ trước</span>
            </div>
        </div>
    );
};
export default ReplyComment;
