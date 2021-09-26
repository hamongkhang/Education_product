const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <div onClick={onClick} className="opacity-0 btn-arrow absolute top-1/3 z-50 transform translate-y-3/4 -right-2 bg-white w-8 h-8 flex items-center justify-center rounded-full shadow-md group cursor-pointer hover:bg-gray-200 duration-300">
        <i class="far fa-chevron-right text-base font-medium group-hover:text-blue-900"></i>
        </div>
    );
}

export default NextArrow;