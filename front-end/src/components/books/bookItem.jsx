import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Preloader from '../preloader';

toast.configure();

const BookItem = (props) => {
    const { changeRender } = props;
    const [isLoading, setIsLoading] = useState(false);
    const $token = localStorage.getItem('access_token');
    const $link = 'http://localhost:8000/upload/images/book/';
    const addToCart = (product_id) => {
        setIsLoading(true);
        if ($token) {
            const _formData = new FormData();
            _formData.append('product_id', product_id);
            _formData.append('type', 'book');
            const requestOptions = {
                method: 'POST',
                headers: { Authorization: `Bearer ` + $token },
                body: _formData,
            };
            fetch('http://127.0.0.1:8000/api/cart/addCart', requestOptions)
                .then((res) => res.json())
                .then((json) => {
                    changeRender();
                    if (json.success) {
                        // alert('thêm sách vào giỏ hàng thành công');
                        toast.success(`Thêm sách vào giỏ hàng thành công!`, {
                            position: 'top-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else {
                        // alert('thêm KHÔNG thành công');
                        toast.error(`Đã xảy ra lỗi khi thêm vào giỏ hàng!`, {
                            position: 'top-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    setIsLoading(false);
                });
        } else {
            // alert('hay đăng nhập trước khi bỏ vào giỏ hàng');
            toast.warn(`Vui lòng đăng nhập trước!`, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setIsLoading(false);
    };
    return (
        <div className="shadow-md bg-white overflow-hidden h-96 mr-2 rounded-md mb-10">
            {isLoading && <Preloader />}
            <div className="w-full h-64 flex items-center justify-center">
                <img
                    src={$link + props.image}
                    className="w-40 h-52 object-scale-down transform hover:translate-x-3 duration-300"
                    alt=""
                />
            </div>
            <div className="px-6 text-center h-10">
                <label htmlFor="" className="text-indigo-600 font-semibold">
                    {props.promotion_price}
                    <sup>đ</sup>
                </label>
                <label htmlFor="" className="line-through text-xs ml-2">
                    {props.Initial_price}
                    <sup>đ</sup>
                </label>
                <h3 className="font-semibold line-2">{props.name}</h3>
            </div>
            {/* <div className="text-center w-full text-white h-12 bg-red-400 relative transform group-hover:translate-y-10 translate-y-19 duration-300 grid grid-cols-2">
                <button className="bg-indigo-400 hover:bg-indigo-300 h-full duration-300">Chi tiết</button>
                <button className="bg-red-400 hover:bg-red-300 duration-300">Mua ngay</button>
            </div> */}
            <div className="px-4 py-3 mt-10 flex justify-between border-t border-gray-300">
                <button
                    type="button"
                    className="space-x-2 group"
                    onClick={() => addToCart(props.id)}
                >
                    <span className="font-semibold group-hover:text-green-700">
                        Mua ngay
                    </span>
                    <i className="far fa-cart-plus transform duration-300 group-hover:translate-x-1.5 group-hover:text-green-700"></i>
                </button>
                <Link to={'/sach/' + props.id} className="space-x-2 group">
                    <span className="font-semibold group-hover:text-indigo-600">
                        Chi tiết
                    </span>
                    <i className="far fa-arrow-right transform duration-300 group-hover:translate-x-1.5 group-hover:text-indigo-600"></i>
                </Link>
            </div>
        </div>
    );
};

export default BookItem;
