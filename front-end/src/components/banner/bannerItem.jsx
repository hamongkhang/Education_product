import React from 'react';

const BannerItem = (props) => {
    return (
        <div
            className="relative lg:h-700 h-96 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "url('http://localhost:8000/upload/images/banner/" +
                    props.data.image +
                    "')",
            }}
        >
            <div className="absolute top-0 left-0 w-full h-full overlay overlay-5" />
            <div className="absolute lg:top-1/4 top-12 left-0 w-full h-2/5 mt-20">
                <div className="w-11/12 h-full mx-auto">
                    <div className="md:w-7/12 w-full text-center md:text-left h-full px-4 lg:px-0 text-white">
                        <h4 className="text-red-400 mb-2">
                            Học hỏi và tích lũy kiến thức
                        </h4>
                        <h1 className="lg:text-5xl md:text-3xl text-2xl font-bold tracking-wide lg:leading-tight line-2">
                            Tìm kiếm khóa học phù hợp cho bạn.{' '}
                        </h1>
                        <p className="text-base mb-10 mt-2 line-2">
                            KẾT NỐI - CHIA SẺ - TRUYỀN ĐAM MÊ{' '}
                        </p>
                        <a
                            href="#"
                            className="px-6 py-3 border-2 rounded-md border-gray-200 hover:bg-white hover:text-black font-semibold hover:border-white duration-500"
                        >
                            Bạn đã sẵn sàng để bắt đầu?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BannerItem;
