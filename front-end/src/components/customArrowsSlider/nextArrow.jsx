const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <div onClick={onClick} className="z-10 absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer flex items-center justify-center w-11 h-11 bg-transparent shadow">
        <i class="far fa-chevron-right text-3xl font-medium text-blue-900"></i>
      </div>
    );
}

export default NextArrow;