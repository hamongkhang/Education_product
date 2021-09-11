import React from 'react'

const Navbar = (props) => {
    return (
        <div className="bg-indigo-500 h-12">
            <div className="w-4/5 h-full flex relative left-1/2 transform -translate-x-1/2">
                <div className="w-3/12">
                    Tiêu đề Danh Mục
                </div>
                <div className="bg-indigo-200 w-9/12">
                    navbar
                </div>
            </div>
        </div>
    )
}
export default Navbar