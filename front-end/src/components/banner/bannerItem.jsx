import React from 'react'

const BannerItem = (props) => {
    return (
        <div className="relative h-700 bg-cover bg-no-repeat" style={{backgroundImage: `url("./assets/images/slider/city.jpg")`}}>
            <div className="absolute top-0 left-0 w-full h-full overlay overlay-5" />
            <div className="absolute top-1/4 left-0 w-full h-2/5 mt-20">
                <div className="w-11/12 h-full mx-auto">
                    <div className="w-7/12 h-full text-white">
                        <h4 className="text-red-400 mb-2">Học hỏi và tích lũy kiến thức</h4>
                        <h1 className="text-5xl font-bold tracking-wide leading-tight line-2">Tìm kiếm khóa học phù hợp cho bạn. Tìm kiếm khóa học phù hợp cho bạn.</h1>
                        <p className="text-2xl mb-10 mt-2 line-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <a href="#" className="px-6 py-3 border-2 mt-8 border-gray-200 hover:bg-white hover:text-black font-semibold hover:border-white duration-1000">Bạn đã sẵn sàng để bắt đầu?</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BannerItem