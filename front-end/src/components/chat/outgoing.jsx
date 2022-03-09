import React from 'react';

const Outgoing = (props) => {
    return (
        <div className="overflow-hidden">
            <div className="relative bg-blue-500 w-3/4 ml-auto my-2.5 p-2 rounded-xl shadow-md text-white">
                <p className="break-words">{props.message}</p>
                <div className="absolute -bottom-1 -right-2.5 w-5 h-5 transform rotate-45 bg-blue-500" />
            </div>
        </div>
    );
};
export default Outgoing;
