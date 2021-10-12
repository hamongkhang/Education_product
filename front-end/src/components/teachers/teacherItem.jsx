import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'


const TeacherItem = (props) => {
    const $link="http://localhost:8000/upload/images/teacher/";
    return (
        <div className="bg-gray-100 mr-5 lg:p-8 p-4 mb-20 rounded-md shadow-lg group">
            <div className="overflow-hidden w-full h-72 md:h-80">
                <img src={$link+props.data.image} className="w-full h-72 md:h-80 object-cover transform transition scale-95 group-hover:scale-105" alt="" />
            </div>
            <div className="mt-5">
                <div className="text-center">
                    <Link>
                        <h4 className="font-semibold text-xl">{props.data.name}</h4> 
                    </Link>
                    <span className="text-gray-600 block line-1">{props.data.position}</span>
                    <span className="text-gray-600 line-2">{props.data.description}n</span>
                </div>
                <div className="space-x-4 text-center mt-5">
                    <a href={props.data.facebook} target="_blank" className="inline-block leading-9 text-xl hover:text-white hover:bg-blue-600 text-blue-700 hover:border-blue-600 duration-300 w-10 h-10 border-2 border-gray-400 rounded-sm">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href={props.data.skype} target="_blank" className="inline-block leading-9 text-xl hover:text-white hover:bg-blue-600 text-blue-400 hover:border-blue-600 duration-300 w-10 h-10 border-2 border-gray-400 rounded-sm">
                        <i className="fab fa-skype"></i>
                    </a>
                    <a href={props.data.youtube} target="_blank" className="inline-block leading-9 text-xl hover:text-white hover:bg-blue-600 hover:border-blue-600 duration-300 text-red-500 w-10 h-10 border-2 border-gray-400 rounded-sm">
                        <i className="fab fa-youtube"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default TeacherItem