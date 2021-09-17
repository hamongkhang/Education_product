import React from 'react'

const SearchBox = (props) => {
    return (
        <div>
            <div className="search-area fixed transform -translate-y-full duration-300 top-0 right-0 left-0 z-30 bg-white h-2/5">
                <div className="text-center text-3xl font-semibold uppercase my-10">Tìm kiếm</div>
                <div>
                    <form action="#" className="px-10 relative">
                    <input type="password" placeholder="Tìm kiếm" className="px-4 py-2 w-full focus:border-indigo-500 border-gray-300 hover:border-gray-400 rounded-sm outline-none border-2" required/>
                        <button type="submit" className="leading-5 absolute right-10 px-8 text-white p-2 h-full rounded-sm bg-indigo-600 hover:bg-indigo-700 duration-300">
                            <i className="far fa-search font-medium"/>
                        </button>
                    </form>
                </div>
                <div className="search-close mt-10 text-center m-5 text-3xl my-0.5 cursor-pointer hover:text-red-500">
                    <i className="far fa-times"></i>
                </div>
            </div>
            <div className="search-overlay fixed transform translate-y-full duration-300 cursor-pointer right-0 bottom-0 z-30 left-0 bg-penetration-5 h-3/5" />
        </div>
    )
}
export default SearchBox