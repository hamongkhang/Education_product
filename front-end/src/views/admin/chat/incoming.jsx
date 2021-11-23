import React from 'react'

const Incoming = (props) => {
    return (
        <div className="flex items-end space-x-2">
            <img src={`http://localhost:8000/upload/images/avatar/${props.avatar}`} className="w-8 h-8 rounded-full object-cover" alt="" />
            <div className="overflow-hidden pb-2 mt-3 mr-auto" style={{ maxWidth: "75%" }}>
                <div className="relative rounded-xl bg-white p-2 shadow-md">
                    <div className="absolute -bottom-1 -left-2.5 w-5 h-5 transform rotate-45 bg-white" />
                    <p className="z-10 break-words">{props.message}</p>
                </div>
            </div>
        </div>
    )
}
export default Incoming