import React from 'react'
import SearchBox from './searchBox'

const AccountControls = (props) => {
    return (
        <div className="flex items-center space-x-3">
            <SearchBox/>
            <div>
                <a href="#" className="relative btn-login duration-500 bg-transparent hover:bg-green-700 hover:text-white px-4 py-2 text-white font-semibold">
                    <svg className="absolute top-0 left-0 w-full h-full fill-transparent">
                        <rect className="absolute btn-stroke top-0 left-0 w-full h-full fill-transparent stroke-2 stroke-dasharray animate-btnlogin"></rect>
                    </svg>
                    Đăng nhập
                </a>
            </div>

            <div>
                <a href="#" className="relative font-semibold duration-200 box-border bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-white">
                    <span>Đăng ký</span>
                </a>
            </div>
        </div>
    )
}
export default AccountControls