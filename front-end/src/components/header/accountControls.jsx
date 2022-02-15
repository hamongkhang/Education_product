import React from 'react';
import { Link } from 'react-router-dom';
import { LoginName } from '../account';

const AccountControls = (props) => {
    const { checkLoggedIn, onLogout } = props;
    const handleCart = () => {
        const cartArea = document.querySelector('.cart-area'),
            cartOverlay = document.querySelector('.cart-overlay');
        cartArea.classList.remove('translate-x-full');
        cartArea.classList.add('translate-x-0');
        cartOverlay.classList.remove('-translate-x-full');
        cartOverlay.classList.add('translate-x-0');
    };

    const handleSearchBox = () => {
        const searchArea = document.querySelector('.search-area'),
            searchOverlay = document.querySelector('.search-overlay');

        searchArea.classList.remove('-translate-y-full');
        searchArea.classList.add('translate-y-0');
        searchOverlay.classList.remove('translate-y-full');
        searchOverlay.classList.add('translate-y-0');
    };

    return (
        <div className="flex items-center space-x-3">
            <div className="text-white space-x-3">
                {checkLoggedIn && (
                    <>
                        <button
                            onClick={handleSearchBox}
                            className="search-open leading-5 left-1 px-3 p-2 rounded-md bg-indigo-600 hover:bg-indigo-700 duration-300"
                        >
                            <i className="far fa-search font-medium" />
                        </button>
                        <button
                            onClick={handleCart}
                            type="button"
                            className="relative cart bg-green-700 hover:bg-green-800 pr-3 leading-5 p-2 duration-500 rounded-md"
                        >
                            <i class="far fa-cart-plus font-medium"></i>
                            {/* <label className="absolute top-0 right-1 font-medium text-15">
                        4
                    </label> */}
                        </button>
                    </>
                )}
            </div>
            {checkLoggedIn ? (
                <div className="hidden sm:block">
                    <LoginName onLogout={onLogout} />
                </div>
            ) : (
                <div>
                    <Link to="/dang-nhap">
                        <a className="relative hidden sm:block btn-login duration-300 bg-transparent rounded-md bg-green-700 hover:shadow-2xl hover:bg-green-800 hover:text-white px-4 py-2 text-white font-semibold">
                            Đăng nhập
                        </a>
                    </Link>
                </div>
            )}

            {/* <div className="hidden md:block">
                <Link
                    to="/dang-ky"
                    className="relative btn-register font-semibold duration-200 box-border bg-indigo-600 px-4 py-2 text-white hover:shadow-xl hover:bg-indigo-700 rounded-sm"
                >
                    <span>Đăng ký</span>
                </Link>
            </div> */}

            <div className="nav-open w-6 text-2xl flex lg:hidden items-center text-white cursor-pointer hover:opacity-70">
                <i class="far fa-bars"></i>
            </div>
        </div>
    );
};
export default AccountControls;
