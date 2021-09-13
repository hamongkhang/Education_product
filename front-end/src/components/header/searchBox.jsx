import React from 'react'

const SearchBox = (props) => {
    return (
        <div>
            <form action="#" className="relative flex items-center">
                <button className="leading-5 absolute left-1 p-2 text-gray-700 hover:text-gray-500 duration-500" type="submit">
                    <i className="far fa-search font-medium"/>
                </button>
                <input type="text" className="w-64 leading-8 pl-9 pr-2 border-2 box-border border-gray-200 hover:border-gray-400 focus:border-indigo-600 outline-none" placeholder="Tìm kiếm" style={{ height: "35.5px"}}/>
                <button type="button" className="relative cart bg-green-600 pr-3 leading-5 p-2 text-gray-900 hover:bg-green-500 duration-500">
                    <i class="far fa-cart-plus font-medium"></i>
                    <label className="absolute top-0 right-1 font-medium text-white text-15">4</label>
                </button>
            </form>
        </div>
    )
}
export default SearchBox