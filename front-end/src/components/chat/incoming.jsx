import React from 'react'

const Incoming = (props) => {
    return (
        <div className="flex items-end space-x-2">
            <img src={props.image} className="w-8 h-8 rounded-full object-cover mb-2" alt="" />
            <div className="overflow-hidden">
                <div className="relative rounded-xl bg-white p-2 my-5 mb-5 w-3/4 shadow-sm">
                    <p className="z-10 break-words">{props.message}</p>
                    <div className="absolute -bottom-1 z-0 -left-2.5 w-5 h-5 transform rotate-45 bg-white" />
                </div>
            </div>
        </div>
    )
}
export default Incoming