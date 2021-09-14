import React from 'react'
import MaterialItem from './materiaItem'


const Materials = (props) => {
    return (
        <div className="materials bg-gray-200 shadow-lg rounded-lg xl:p-8 p-4 xl:px-4 px-0 mt-10">
            <h3 className="mb-4 font-medium text-xl pl-4">Tài liệu miễn phí</h3>
            <div className="text-15 font-medium text-gray-500 h-64 overflow-y-scroll overflow-hidden custom-scroll">
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