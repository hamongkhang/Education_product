import React from 'react'
import MaterialItem from './materiaItem'


const Materials = (props) => {
    return (
        <div className="materials bg-gray-200 shadow-lg rounded-lg xl:p-8 p-4 xl:px-4 px-0 mt-10">
            <div className="flex items-center px-4 space-x-2">
                <i class="fad fa-file-alt text-xl text-indigo-400"></i>
                <h3 className="font-medium text-xl">Tài liệu miễn phí</h3>
            </div>
            <div className="text-sm font-medium text-gray-500 h-64 overflow-y-scroll overflow-hidden custom-scroll">
                <MaterialItem/>
                <MaterialItem/>
                <MaterialItem/>
                <MaterialItem/>
                <MaterialItem/>
                <MaterialItem/>
            </div>
        </div>
    )
}
export default Materials