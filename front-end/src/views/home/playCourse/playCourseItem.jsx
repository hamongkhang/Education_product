import React from 'react'

const PlayCourseItem = ({item, handleUrl}) => (
    <div className="hover:bg-gray-200 px-8 py-2 cursor-pointer" onClick={() => {handleUrl(item)}}>
        <h3 className="line-2">1. Giao động điều hòa là gì?</h3>
        <span className="text-sm">10:41</span>
    </div>
)

export default PlayCourseItem