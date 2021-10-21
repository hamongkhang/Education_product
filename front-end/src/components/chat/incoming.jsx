import React from 'react'

const Incoming = (props) => {
    return (
        <div className="flex items-end space-x-2">
            <img src={props.image} className="w-8 h-8 rounded-full object-cover mb-2" alt="" />
            <div className="overflow-hidden pb-5 mt-5 mr-auto w-3/4">
                <div className="relative rounded-xl bg-white p-2 shadow-sm">
                <div className="absolute -bottom-1 -left-2.5 w-5 h-5 transform rotate-45 bg-white" />
                <p className="z-10 break-words">{props.message}</p>
                </div>
            </div>
        </div>
    )
}
export default Incoming