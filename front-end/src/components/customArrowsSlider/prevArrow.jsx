import React from 'react';
const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            onClick={onClick}
            className="opacity-0 btn-arrow absolute top-1/3 z-30 transform translate-y-3/4 -left-4 bg-white w-8 h-8 flex items-center justify-center rounded-full shadow-md group cursor-pointer hover:bg-gray-200 duration-300"
        >
            <i class="far fa-chevron-left text-base font-medium group-hover:text-blue-900"></i>
        </div>
    );
};

export default PrevArrow;
