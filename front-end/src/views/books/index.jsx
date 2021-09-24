import React from 'react'
import { BannerBook } from '../../components/banner'
import { BookItem } from '../../components/books'
const Books = (props) => {
    return (
        <>
            <BannerBook/>
            <div className="xl:w-4/5 xl:px-0 px-4 w-full relative left-1/2 transform -translate-x-1/2 md:mt-20 mt-10">
                <div className="bg-indigo-300 w-full h-16 rounded-sm mb-10">
                    <select name="" id="">
                        <option value=""></option>
                    </select>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                    <BookItem/>
                    <BookItem/>
                    <BookItem/>
                    <BookItem/>
                    <BookItem/>
                    <BookItem/>
                    <BookItem/>
                    <BookItem/>
                </div>
            </div>
        </>
    )
}
export default Books