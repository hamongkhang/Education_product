import React from 'react'

const CourseDesc = (props) => {
    return (
        <div className="mt-6">
            <div className="my-10">
                <div>
                    <div className="border-b-2 border-blue-600 font-semibold uppercase mb-4 py-1">Tổng quan khóa học</div>
                    <p className="text-gray-700">{props.data.description}</p>
                </div>
                <div>
                    <div className="font-semibold my-4 border-b-2 uppercase border-blue-600 mb-4 py-1">Lợi ích khóa học</div>
                    <p className="text-gray-700">{props.data.benefit}</p>
                </div>
                <div>
                    <div className="border-b-2 border-blue-600 font-semibold uppercase mb-4 py-1 mt-5">Mục tiêu khoá học</div>
                    <p className="text-gray-700">{props.data.target}</p>
                </div>
            </div>
        </div>
    )
}

export default CourseDesc