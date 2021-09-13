import React from "react";
const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div onClick={onClick} className="absolute left-0 top-1/2 transform z-50 -translate-y-1/2 cursor-pointer flex items-center justify-center w-11 h-11 bg-white hover:bg-gray-200 rounded-full border-gray-200 shadow" style={{borderWidth: '1px'}}>
            <i class="far fa-chevron-left text-xl text-gray-500"></i>
        </div>
    );
}

export default PrevArrow;