import React, { useState } from 'react';
import PlayCourseItem from './playCourseItem';
import moment from 'moment';

const CourseChapter = ({ table, index, contentAlpha, lesson, handleUrl }) => {
    const [chapter, setChapter] = useState('block');
    const [icon, setIcon] = useState('up');

    const handleChapterDetails = () => {
        if (chapter === 'block') {
            setChapter('hidden');
            setIcon('down');
        } else {
            setChapter('block');
            setIcon('up');
        }
    };
    // props.content.map((item,i) => {
    return (
        //     <div className="w-full">
        //              {/* <div className="flex items-center justify-between border-b cursor-pointer pb-2 p-4 bg-gray-100 hover:bg-gray-200" onClick={handleChapterDetails}>
        //                  <div>
        //                      <div className="text-17 font-semibold">Phần 1: Giới thiệu</div>
        //                      <div className="text-sm">2/2 | 33:00</div>
        //                 </div>

        //                 <div>
        //                      <i className={`fa fa-chevron-${icon}`} />
        //                  </div>
        //         </div>
        //              <div className={chapter}>
        //                  {
        //                      content.map((item, index) => (
        //                         <PlayCourseItem key={index} item={item} handleUrl={handleUrl}/>
        //                 ))
        //                  }
        //             </div> */}
        //         </div>
        // );
        //     }
        //    )}
        <div className="w-full">
            <div
                className="flex items-center justify-between border-b cursor-pointer pb-2 p-4 bg-gray-100 hover:bg-gray-200 h-18"
                onClick={handleChapterDetails}
            >
                <div>
                    <div className="text-17 font-semibold">
                        Phần {index + 1}: {table.name}
                    </div>
                    {/* <div className="text-sm">{moment(table.updated_at).format("DD-MM-YYYY")}</div> */}
                </div>

                <div>
                    <i className={`fa fa-chevron-${icon}`} />
                </div>
            </div>
            <div className={chapter}>
                {contentAlpha.map((item, index) => {
                    if (item.table_of_content_id === table.id) {
                        return (
                            <PlayCourseItem
                                key={index}
                                item={item}
                                lesson={lesson}
                                handleUrl={handleUrl}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default CourseChapter;
