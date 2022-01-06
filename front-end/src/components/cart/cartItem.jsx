import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Preloader from '../preloader';

toast.configure();

const CartItem = (props) => {
    const { removeCart } = props;
    const { updateCart } = props;
    const $token = localStorage.getItem('access_token');
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [amount, setAmount] = useState(props.quantity);
    const [amountBook, setAmountBook] = useState('');
    const $linkBook = `${process.env.REACT_APP_URL_SERVER}/upload/images/book/`;
    const $linkCourse = `${process.env.REACT_APP_URL_SERVER}/upload/images/course/`;
    const increase = () => {
        updateCart(props.product_id, props.type, parseInt(amount) + 1);
        if (parseInt(amount) + 1 > amountBook) {
            setAmount(amountBook);
            // alert('Số lượng sách trong kho chỉ còn ' + amountBook + ' quyển');
            toast.warn(`Số lượng sách trong kho chỉ còn ${amountBook} quyển!`, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            setAmount(parseInt(amount) + 1);
        }
    };
    const decrease = () => {
        updateCart(props.product_id, props.type, parseInt(amount) - 1);
        setAmount(parseInt(amount) - 1);
    };

    const getOneBook = (id) => {
        setIsLoading(true);
        const _formData = new FormData();
        _formData.append('id', id);
        const requestOptions = {
            method: 'POST',
            headers: { Authorization: `Bearer ` + $token },
            body: _formData,
        };
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/getOneBook`,
            requestOptions,
        )
            .then((res) => res.json())
            .then((json) => {
                if (json.error) {
                    if (json.error.id) {
                        removeCart(props.product_id, props.type);
                    } else {
                        console.log(json);
                    }
                } else {
                    setProduct(json.book);
                    setAmountBook(json.book.quantity);
                }
            });
        setIsLoading(false);
    };
    const getOneCourse = (id) => {
        setIsLoading(true);
        const _formData = new FormData();
        _formData.append('id', id);
        const requestOptions = {
            method: 'POST',
            headers: { Authorization: `Bearer ` + $token },
            body: _formData,
        };
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/getOneCourse`,
            requestOptions,
        )
            .then((res) => res.json())
            .then((json) => {
                if (json.error) {
                    if (json.error.id) {
                        removeCart(props.product_id, props.type);
                    } else {
                        console.log(json);
                    }
                } else {
                    setProduct(json.course);
                }
            });
        setIsLoading(false);
    };
    useEffect(() => {
        if ($token) {
            if (props.type === 'book') {
                getOneBook(props.product_id);
            } else {
                getOneCourse(props.product_id);
            }
        }
    }, []);
    return (
        <div className="flex mb-4">
            {props.type === 'book' ? (
                <div>
                    <img
                        src={$linkBook + product.image}
                        className="w-28 h-24 object-cover"
                        alt=""
                    />
                </div>
            ) : (
                <div>
                    <img
                        src={$linkCourse + product.image}
                        className="w-28 h-24 object-cover"
                        alt=""
                    />
                </div>
            )}
            {isLoading && <Preloader />}
            <div className="pl-5 w-9/12">
                <div className="flex items-start justify-between">
                    {props.type === 'book' ? (
                        <Link to={'/sach/' + product.id}>
                            <h3 className="line-2 hover:text-indigo-500 duration-300">
                                {product.name}
                            </h3>
                        </Link>
                    ) : (
                        <Link to={'/khoa-hoc/' + product.id}>
                            <h3 className="line-2 hover:text-indigo-500 duration-300">
                                {product.name}
                            </h3>
                        </Link>
                    )}

                    <button
                        className="hover:text-red-500 block text-lg"
                        onClick={() => removeCart(props.product_id, props.type)}
                    >
                        <i className="far fa-times"></i>
                    </button>
                </div>

                <div className="flex mt-3 justify-between">
                    {props.type === 'book' ? (
                        <div className="flex">
                            <button
                                className="border-2 border-gray-300 w-8 h-6 flex items-center justify-center hover:bg-indigo-300 hover:border-indigo-300"
                                onClick={decrease}
                            >
                                -
                            </button>
                            <span className="border-t-2 border-b-2 border-gray-300 w-8 h-6 flex items-center justify-center">
                                {amount}
                            </span>
                            <button
                                className="border-2 border-gray-300 w-8 h-6 flex items-center justify-center hover:bg-indigo-300 hover:border-indigo-300"
                                onClick={increase}
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        ''
                    )}

                    <div>
                        <span className="text-indigo-500 font-semibold">
                            {props.total}
                            <sup>đ</sup>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
