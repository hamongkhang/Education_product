import React from 'react'
import { Link } from 'react-router-dom'

const ITinTeachingList = (props) => {
    return (
        <div className="w-full object-cover rounded-lg overflow-hidden mt-5">
            <h3 className="text-center font-semibold text-3xl uppercase mb-10">CNTT trong dạy học</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-5 text-white">
                <Link to="/" className="mb-5 rounded-md shadow-lg group h-96 space-y-5 overflow-hidden relative bg-indigo-600 hover:opacity-80 duration-200">
                    <div className="absolute h-508 left-1/3 top-0 z-0 w-508 rounded-full bg-red-800"/>
                    <div className="absolute inset-0 h-full w-full p-5">
                        <span className="block text-center font-medium text-lg mb-5">Google Meet</span>
                        <p className="line-10 text-justify"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam impedit maxime, optio sed perferendis deleniti voluptatibus. Enim reprehenderit id ab numquam earum, beatae adipisci animi accusamus repellat quibusdam dolores veritatis. Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </Link>
                <Link to="/" className="mb-5 rounded-md shadow-lg group h-96 space-y-5 overflow-hidden relative bg-indigo-600 hover:opacity-80 duration-200">
                    <div className="absolute h-508 left-1/3 top-0 z-0 w-508 rounded-full bg-red-800"/>
                    <div className="absolute inset-0 h-full w-full p-5">
                        <span className="block text-center font-medium text-lg mb-5">Google Classroom</span>
                        <p className="line-10 text-justify"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam impedit maxime, optio sed perferendis deleniti voluptatibus. Enim reprehenderit id ab numquam earum, beatae adipisci animi accusamus repellat quibusdam dolores veritatis. Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </Link>
                <Link to="/" className="mb-5 rounded-md shadow-lg group h-96 space-y-5 overflow-hidden relative bg-indigo-600 hover:opacity-80 duration-200">
                    <div className="absolute h-508 left-1/3 top-0 z-0 w-508 rounded-full bg-red-800"/>
                    <div className="absolute inset-0 h-full w-full p-5">
                        <span className="block text-center font-medium text-lg mb-5">Zoom</span>
                        <p className="line-10 text-justify"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam impedit maxime, optio sed perferendis deleniti voluptatibus. Enim reprehenderit id ab numquam earum, beatae adipisci animi accusamus repellat quibusdam dolores veritatis. Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default ITinTeachingList