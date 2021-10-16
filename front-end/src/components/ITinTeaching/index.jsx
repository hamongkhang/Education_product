import React from 'react'
import ITinTeachingItem from './ITinTeachingItem'

const ITinTeachingList = (props) => {
    return (
        <div className="w-full object-cover rounded-lg overflow-hidden mt-5">
            <h3 className="text-center font-semibold text-3xl uppercase mb-10">CNTT trong dạy học</h3>
            <div className="grid grid-cols-1 sm1:grid-cols-2 sm:grid-cols-3 gap-2 lg:gap-5">
                <ITinTeachingItem/>
                <ITinTeachingItem/>
                <ITinTeachingItem/>
                <ITinTeachingItem/>
                <ITinTeachingItem/>
                <ITinTeachingItem/>
            </div>
        </div>
    )
}
export default ITinTeachingList