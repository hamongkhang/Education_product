import React from 'react'

const Support = (props) => {
    return (
        <div className="bg-gray-200 shadow-lg rounded-lg xl:p-8 p-4 mt-10 space-y-1">
            <div className="flex items-center space-x-2">
                <i class="fad fa-hand-point-right text-xl text-indigo-400"></i>
                <h3 className="font-medium text-xl">Hỗ trợ</h3>
            </div>
            <div className="">
                <span className="inline-block">Hỗ trợ 24/7</span>
                <span className="font-medium">Hotline:&nbsp;<a href="#" className="font-normal">0999999999</a></span>
                <span className="inline-block line-2 font-medium break-words">Email:&nbsp;<a href="#" className="font-normal">web.vatly365@gmail.com</a></span>
            </div>
        </div>
    )
}

export default Support