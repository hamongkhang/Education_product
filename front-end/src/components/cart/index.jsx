import React, { useState, useRef, useEffect } from 'react';
import CartItem from './cartItem';
import { toast } from 'react-toastify';

toast.configure();

const Cart = (props) => {
    const [total, setTotal] = useState('');
    const [cart, setCart] = useState([]);
    const [render, setRender] = useState(false);
    const [payment, setPayment] = useState(false);
    const $token = localStorage.getItem('access_token');

    const handleCart = () => {
        const cartArea = document.querySelector('.cart-area'),
            cartOverlay = document.querySelector('.cart-overlay');
        cartArea.classList.remove('translate-x-0');
        cartArea.classList.add('translate-x-full');
        cartOverlay.classList.remove('translate-x-0');
        cartOverlay.classList.add('-translate-x-full');
    };

    const payMent = () => {
        if ($token) {
            if (total != 0) {
                const _formData = new FormData();
                _formData.append('amount', total);
                // _formData.append("type",type)
                // _formData.append("quantity",amount)
                fetch(
                    `${process.env.REACT_APP_URL_SERVER}/api/payment/momoPayment`,
                    {
                        method: 'POST',
                        headers: { Authorization: `Bearer ` + $token },
                        body: _formData,
                    },
                )
                    .then((response) => response.json())
                    .then((data) => {
                        window.location.href = data.url;
                    });
            } else {
                // alert('Không cần thanh toán');
                toast.info(`Không cần thanh toán!`, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            alert('Chưa đăng nhập!!!');
            toast.warn(`Vui lòng đăng nhập!`, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const updateCart = (id, type, amount) => {
        const _formData = new FormData();
        _formData.append('product_id', id);
        _formData.append('type', type);
        _formData.append('quantity', amount);
        const requestOptions = {
            method: 'POST',
            headers: { Authorization: `Bearer ` + $token },
            body: _formData,
        };
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/cart/updateCart`,
            requestOptions,
        )
            .then((res) => res.json())
            .then((json) => {
                if (json.error) {
                    console.log(json.description);
                } else {
                    setRender(!render);
                }
            });
    };
    const removeCart = (product_id, type) => {
        const _formData = new FormData();
        _formData.append('product_id', product_id);
        _formData.append('type', type);
        const requestOptions = {
            method: 'POST',
            headers: { Authorization: `Bearer ` + $token },
            body: _formData,
        };
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/cart/removeCart`,
            requestOptions,
        )
            .then((res) => res.json())
            .then((json) => {
                setRender(!render);
                console.log(json.description);
            });
    };
    const getCart = () => {
        const requestOptions = {
            method: 'POST',
            headers: { Authorization: `Bearer ` + $token },
        };
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/cart/getCart`,
            requestOptions,
        )
            .then((res) => res.json())
            .then((json) => {
                if (json.cart) {
                    setCart(json.cart);
                    var total = 0;
                    json.cart.map((item) => {
                        total = total + item.total;
                    });
                    setTotal(total);
                }
            });
    };
    useEffect(() => {
        if ($token) {
            getCart();
        }
    }, [render]);

    return (
        <div>
            <div className="fixed cart-area transform translate-x-full top-0 right-0 bottom-0 overflow-hidden bg-white w-full md:w-1/2 lg:w-2/6 shadow-2xl z-30 duration-500">
                <div className="flex justify-between items-center h-19 mb-5 shadow-md px-5 py-3">
                    <span className="text-lg font-semibold tracking-wide uppercase">
                        Giỏ hàng
                    </span>
                    <button
                        onClick={handleCart}
                        className="text-2xl cart-close hover:text-red-500 duration-200"
                    >
                        <i className="far fa-times"></i>
                    </button>
                </div>
                <div
                    className="px-5 custom-scroll overflow-y-scroll"
                    style={{ height: 'calc(100vh - 250px)' }}
                >
                    {cart &&
                        cart.map((item, index) => (
                            <CartItem
                                key={index}
                                {...item}
                                removeCart={removeCart}
                                updateCart={updateCart}
                            />
                        ))}
                </div>
                <div className="mt-5 p-5 border-t-2 border-gray-500">
                    <div className="flex justify-between items-center font-semibold">
                        <p>Tổng tiền</p>
                        <span className="text-indigo-500">
                            {total}
                            <sup>đ</sup>
                        </span>
                    </div>
                    <div>
                        <button
                            onClick={(event) => payMent(event)}
                            className="w-full h-12 bg-indigo-700 rounded-md mt-3 font-semibold text-white hover:bg-indigo-600 duration-200"
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>
            <div
                onClick={handleCart}
                className="cart-overlay fixed top-0 bottom-0 left-0 z-30 transform -translate-x-full duration-500 bg-penetration-5 cursor-pointer w-0 md:w-1/2 lg:w-4/6"
            ></div>
        </div>
    );
};
export default Cart;
