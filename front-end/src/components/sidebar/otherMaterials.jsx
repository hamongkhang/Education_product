import React from 'react'
import MaterialItem from './materiaItem'

const OtherMaterials = (props) => {
    return (
        <div className="materials shadow-lg rounded-md py-4 px-2 mt-5">
            <div className="flex items-center px-4 space-x-2">
                <i class="fad fa-file-alt text-xl text-indigo-500"></i>
                <h3 className="font-medium text-xl uppercase tracking-tighter">Tài liệu khác</h3>
            </div>
            <div className="text-sm font-medium h-28 overflow-y-scroll overflow-hidden custom-scroll-1 mt-2">
                <MaterialItem/>
            </div>
        </div>
    )
}

export default OtherMaterials