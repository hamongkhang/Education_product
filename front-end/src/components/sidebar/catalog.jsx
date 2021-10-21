import React from 'react'
import { Link } from 'react-router-dom'

const Catalog = (props) => {
    return (
        <div className="shadow-lg rounded-md py-4 uppercase bg-white">
            <div className="flex items-center px-4 space-x-2">
                <i class="fad fa-books text-xl text-indigo-500"></i>
                <h3 className="font-medium text-xl tracking-tighter">Danh mục</h3>
            </div>
            {/* <div className="my-1">
                <label className="form-checkbox flex items-center text-15">
                    <input type="checkbox" onChange={handeChange}/>
                    <span className="checkmark"></span>
                    <span className="ml-3">Luyện thi 2k4</span>
                </label>
            </div> */}
            <div className="mt-2">
                <div className="">
                    <div  className="block hover:bg-purple-800 hover:text-white px-4 py-2 relative catalog">
                        <Link to="/" className="flex justify-between items-center line-1">
                            <span>Luyện thi 2k4</span>
                            <i className="fa fa-chevron-right float-right leading-6" />
                        </Link>
                        <div className="absolute border-l-4 w-full border-purple-800 z-40 bg-white text-black shadow-lg top-0 left-full catalog-item">
                            <Link to="/" className="line-1 hover:bg-purple-800 hover:text-white px-4 py-2">THCS</Link>
                            <Link to="/" className="line-1 hover:bg-purple-800 hover:text-white px-4 py-2">THCS</Link>
                            <Link to="/" className="line-1 hover:bg-purple-800 hover:text-white px-4 py-2">THCS</Link>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div  className="block hover:bg-purple-800 hover:text-white px-4 py-2 relative catalog">
                        <Link to="/" className="flex justify-between items-center line-1">
                            <span>THCS</span>
                            <i className="fa fa-chevron-right float-right leading-6" />
                        </Link>
                        <div className="absolute border-l-4 w-full border-purple-800 z-40 bg-white text-black shadow-lg top-0 left-full catalog-item">
                            <Link to="/" className="line-1 hover:bg-purple-800 hover:text-white px-4 py-2">6</Link>
                            <Link to="/" className="line-1 hover:bg-purple-800 hover:text-white px-4 py-2">7</Link>
                            <Link to="/" className="line-1 hover:bg-purple-800 hover:text-white px-4 py-2">8</Link>
                            <Link to="/" className="line-1 hover:bg-purple-800 hover:text-white px-4 py-2">9</Link>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div  className="block hover:bg-purple-800 hover:text-white px-4 py-2 relative catalog">
                        <Link to="/" className="flex justify-between items-center line-1">
                            <span>THPT</span>
                            <i className="fa fa-chevron-right float-right leading-6" />
                        </Link>
                        <div className="absolute border-l-4 w-full border-purple-800 z-40 bg-white text-black shadow-lg top-0 left-full catalog-item">
                            <Link to="/" className="line-1 hover:bg-purple-800 hover:text-white px-4 py-2">10</Link>
                            <Link to="/" className="line-1 hover:bg-purple-800 hover:text-white px-4 py-2">11</Link>
                            <Link to="/" className="line-1 hover:bg-purple-800 hover:text-white px-4 py-2">12</Link>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div  className="block hover:bg-purple-800 hover:text-white px-4 py-2 relative catalog">
                        <Link to="/" className="flex justify-between items-center line-1">
                            <span>Học sinh giỏi</span>
                            <i className="fa fa-chevron-right float-right leading-6" />
                        </Link>
                        <div className="absolute border-l-4 w-full border-purple-800 z-40 bg-white text-black shadow-lg top-0 left-full catalog-item">
                            <Link to="/" className="line-1 hover:bg-purple-800 hover:text-white px-4 py-2">THCS</Link>
                            <Link to="/" className="line-1 hover:bg-purple-800 hover:text-white px-4 py-2">THPT</Link>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div  className="block hover:bg-purple-800 hover:text-white px-4 py-2 relative">
                        <Link to="/" className="flex justify-between items-center line-1">
                            <span>vật lý và cuộc sống</span>
                        </Link>
                    </div>
                </div>
                <div className="">
                    <div  className="block hover:bg-purple-800 hover:text-white px-4 py-2 relative">
                        <Link to="/" className="flex justify-between items-center line-1">
                            <span>cntt trong dạy học</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Catalog