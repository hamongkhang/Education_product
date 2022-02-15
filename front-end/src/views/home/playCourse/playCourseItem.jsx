import React from 'react';
import moment from 'moment';
const PlayCourseItem = ({ item, lesson, handleUrl }) => {
    return (
        <>
            <div className="hover:bg-gray-200 px-8 py-5 cursor-pointer flex items-center space-x-4">
                <div>
                    <i className="fad fa-stream text-indigo-500"></i>
                </div>
                <div className="font-semibold flex">
                    Chương:&nbsp; <h3 className="line-2">{item.name}</h3>
                </div>
                {/* <span className="text-sm">{moment(item.updated_at).format("DD-MM-YYYY")}</span> */}
            </div>
            <div>
                {lesson.map((item2, index) => {
                    if (item.id == item2.content_id) {
                        return (
                            <div
                                key={index}
                                className="pl-12 py-2 hover:bg-gray-300 cursor-pointer flex items-center space-x-4"
                                onClick={() => {
                                    handleUrl(item2.file_name, item2.id);
                                }}
                            >
                                <div>
                                    <i className="fad fa-play-circle text-indigo-500"></i>
                                </div>
                                <div>
                                    <h4>{item2.name}</h4>
                                    <span className="text-sm">
                                        {moment(item.updated_at).format(
                                            'DD-MM-YYYY',
                                        )}
                                    </span>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </>
    );
};
export default PlayCourseItem;
