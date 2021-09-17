import React from 'react'
import { Link } from 'react-router-dom'

const TeacherItem = (props) => {
    return (
        <div className="bg-gray-100 mr-5 lg:p-8 p-4 mb-20 rounded-md shadow-lg group">
            <div className="overflow-hidden w-full h-72 md:h-80">
                <img src="./assets/images/slider/city.jpg" className="w-full h-72 md:h-80 object-cover transform transition scale-95 group-hover:scale-105" alt="" />
            </div>
            <div className="mt-5">
                <div className="text-center">
                    <Link>
                        <h4 className="font-semibold text-xl">Họ và tên</h4> 
                    </Link>
                    <span className="text-gray-600">Giáo viên Vật lý</span>
                </div>
                <div className="space-x-4 text-center mt-5">
                    <a href="#" target="_blank" className="inline-block leading-9 text-xl hover:text-white hover:bg-blue-600 text-blue-700 hover:border-blue-600 duration-300 w-10 h-10 border-2 border-gray-400 rounded-sm">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" target="_blank" className="inline-block leading-9 text-xl hover:text-white hover:bg-blue-600 text-blue-400 hover:border-blue-600 duration-300 w-10 h-10 border-2 border-gray-400 rounded-sm">
                        <i class="fab fa-skype"></i>
                    </a>
                    <a href="#" target="_blank" className="inline-block leading-9 text-xl hover:text-white hover:bg-blue-600 hover:border-blue-600 duration-300 text-red-500 w-10 h-10 border-2 border-gray-400 rounded-sm">
                        <i class="fab fa-youtube"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default TeacherItem