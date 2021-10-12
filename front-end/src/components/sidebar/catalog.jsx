import React from 'react'
import { Link } from 'react-router-dom'

const Catalog = (props) => {
    return (
        <div className="bg-blue-500 shadow-lg rounded-md py-4 px-2 uppercase">
            <div className="flex items-center px-4 space-x-2">
                <i class="fad fa-books text-xl text-indigo-200"></i>
                <h3 className="font-medium text-xl text-yellow-300 tracking-tighter">Danh mục</h3>
            </div>
            {/* <div className="my-1">
                <label className="form-checkbox flex items-center text-15">
                    <input type="checkbox" onChange={handeChange}/>
                    <span className="checkmark"></span>
                    <span className="ml-3">Luyện thi 2k4</span>
                </label>
            </div> */}
            <div className="max-h-72 custom-scroll overflow-y-scroll mt-2 text-white">
                <div>
                    <Link to="/" className="line-1 hover:bg-blue-600 rounded px-6 py-2 -ml-2">Luyện thi 2k4</Link>
                </div>
                <div>
                    <Link to="/" className="line-1 hover:bg-blue-600 rounded px-6 py-2 -ml-2">THCS</Link>
                </div>
                <div>
                    <Link to="/" className="line-1 hover:bg-blue-600 rounded px-6 py-2 -ml-2">Học sinh giỏi</Link>
                </div>
                <div>
                    <Link to="/" className="line-1 hover:bg-blue-600 rounded px-6 py-2 -ml-2">Vật lý và cuộc sống</Link>
                </div>
                <div>
                    <Link to="/" className="line-1 hover:bg-blue-600 rounded px-6 py-2 -ml-2">CNTT trong dạy học</Link>
                </div>
            </div>
        </div>
    )
}
export default Catalog