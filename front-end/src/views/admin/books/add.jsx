import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { DraftjsWidget } from '../../../components/DraftjsWidget';
import Preloader from '../../../components/preloader';

toast.configure();
const AddBook = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [book, setBook] = useState({
        id: '',
        name: '',
        Initial_price: '',
        promotion: 0,
        promotion_price: '',
        type: '',
        description: '',
        quantity: '',
        page_number: '',
        image: '',
        author: '',
        status: 'Active',
    });
    const [error, setError] = useState({
        id: null,
        name: null,
        Initial_price: null,
        promotion: null,
        promotion_price: null,
        type: null,
        description: null,
        quantity: null,
        page_number: null,
        image: null,
        author: null,
        status: null,
    });
    const [file, setFile] = useState(null);
    const [booktypes, setBookTypes] = useState([]);
    const $token = localStorage.getItem('access_token');
    const config = {
        readonly: false,
    };
    const history = useHistory();
    const addBook = () => {
        setIsLoading(true);
        const _formData = new FormData();
        _formData.append('id', book.id);
        _formData.append('name', book.name);
        _formData.append('author', book.author);
        _formData.append('Initial_price', book.Initial_price);
        _formData.append('promotion', book.promotion);
        _formData.append('type', book.type);
        _formData.append('page_number', book.page_number);
        _formData.append('status', book.status);
        _formData.append('image', file);
        _formData.append('quantity', book.quantity);
        _formData.append('description', book.description);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/addBook`, {
            method: 'POST',
            body: _formData,
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    toast.error('Thêm bị lỗi', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setError(data.error);
                } else {
                    toast.success('Thêm thành công', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    history.push('/admin/books');
                }
                setIsLoading(false);
            });
    };
    const getBookTypes = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/getBookTypes`, {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                setBookTypes(data.book_types);
                setBook({ ...book, ['type']: data.book_types[0].id });
                setIsLoading(false);
            });
    };
    const checkInput = (_name, _type, _value) => {
        if (_type == 'number') {
            if (_name == 'page_number' || _name == 'quantity') {
                if (_value == '') {
                    _value = 1;
                } else {
                    _value = parseInt(_value);
                }
            }
            if (_name == 'promotion') {
                if (_value == '') {
                    _value = 0;
                } else {
                    if (_value > 100) {
                        _value = 100;
                        caculatePromotion(book.Initial_price, _value);
                    } else {
                        _value = parseInt(_value);
                        caculatePromotion(book.Initial_price, _value);
                    }
                }
            }
            if (_name == 'Initial_price') {
                if (_value == '') {
                    _value = 0;
                    caculatePromotion(_value, book.promotion);
                } else {
                    _value = parseInt(_value);
                    caculatePromotion(_value, book.promotion);
                }
            }
            if (_value < 0 || _value == '') {
                return (_value = 0);
            } else {
                return _value;
            }
        } else {
            return _value;
        }
    };
    const onChangeHandle = (event) => {
        let _name = event.target.name;
        let _type = event.target.type;
        let _value = event.target.value;
        if (_type === 'checkbox') {
            if (event.target.checked) {
                setBook({ ...book, ['status']: 'Active' });
                toast.success('Trạng thái mở ', {
                    position: 'bottom-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                setBook({ ...book, ['status']: 'Block' });
                toast.success('Trạng thái khóa', {
                    position: 'bottom-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else if (_type === 'file') {
            setFile(event.target.files[0]);
        } else {
            setBook({ ...book, [_name]: checkInput(_name, _type, _value) });
        }
    };
    const onBlurHandle = (event) => {
        let _type = event.target.type;
        let _name = event.target.name;
        let _value = event.target.value;
        document.getElementsByName(_name)[0].value = checkInput(
            _name,
            _type,
            _value,
        );
    };
    const caculatePromotion = (price, promotion) => {
        let promotion_price = price - (promotion / 100) * price;
        setBook({ ...book, ['promotion_price']: promotion_price });
        document.getElementsByName('promotion_price')[0].value =
            promotion_price;
    };
    const onChangeEditor = (value) => {
        if (book.description != value) {
            setBook({ ...book, ['description']: value });
        }
    };
    useEffect(() => {
        if ($token) {
            getBookTypes();
        }
    }, []);
    return (
        <section className=" py-1">
            {isLoading && <Preloader />}
            <div className="w-full">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-gray-700 text-xl font-bold">
                                Thêm sách
                            </h6>
                            {/* <button className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                        Settings
                    </button> */}
                        </div>
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form>
                            <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Thông tin chi tiết
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlfor="grid-password"
                                        >
                                            Tên sách
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.name ? error.name[0] : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlfor="grid-password"
                                        >
                                            Tác giả
                                        </label>
                                        <input
                                            type="text"
                                            name="author"
                                            required
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.author
                                                ? error.author[0]
                                                : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlfor="grid-password"
                                        >
                                            Số lượng
                                        </label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            required
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.quantity
                                                ? error.quantity[0]
                                                : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlfor="grid-password"
                                        >
                                            Số trang
                                        </label>
                                        <input
                                            type="number"
                                            name="page_number"
                                            required
                                            min="0"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                            onBlur={(event) =>
                                                onBlurHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.page_number
                                                ? error.page_number[0]
                                                : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlfor="grid-password"
                                        >
                                            Giá gốc
                                        </label>
                                        <input
                                            type="number"
                                            name="Initial_price"
                                            required
                                            min="0"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                            onBlur={(event) =>
                                                onBlurHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.Initial_price
                                                ? error.Initial_price[0]
                                                : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full lg:w-3/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlfor="grid-password"
                                        >
                                            Giảm giá (%)
                                        </label>
                                        <input
                                            type="number"
                                            name="promotion"
                                            required
                                            min="0"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                            onBlur={(event) =>
                                                onBlurHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.promotion
                                                ? error.promotion[0]
                                                : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full lg:w-3/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlfor="grid-password"
                                        >
                                            Trạng thái
                                        </label>
                                        <label
                                            htmlFor={`toggle`}
                                            className="toggle-label"
                                        >
                                            <input
                                                type="checkbox"
                                                name="status"
                                                id={`toggle`}
                                                defaultChecked={
                                                    book.status === 'Active'
                                                        ? true
                                                        : false
                                                }
                                                onChange={(event) =>
                                                    onChangeHandle(event)
                                                }
                                                hidden
                                            />
                                            <div className="toggle-btn">
                                                <div className="spinner"></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlfor="grid-password"
                                        >
                                            Giá sau khi giảm
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            disabled
                                            name="promotion_price"
                                            min="0"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={book.promotion_price}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlfor="grid-password"
                                        >
                                            Loại sách
                                        </label>
                                        <select
                                            name="type"
                                            id="type"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        >
                                            {booktypes.map((item, index) => (
                                                <option
                                                    key={index}
                                                    value={item.id}
                                                    selected={
                                                        item.id === book.type
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full px-4">
                                    <div className="relative w-full mb-3 group h-96">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlfor="grid-password"
                                        >
                                            Hình ảnh
                                        </label>
                                        <img
                                            src={
                                                file
                                                    ? URL.createObjectURL(file)
                                                    : 'a'
                                            }
                                            className="w-full min-h-96 h-full mb-30 md:mb-1 object-scale-down rounded-lg"
                                            alt=""
                                        />
                                        <label
                                            htmlFor="avt"
                                            className="w-3/5 text-center opacity-0 group-hover:opacity-100 block py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-15 font-semibold absolute bottom-5 transform left-1/2 -translate-x-1/2 duration-300 text-white"
                                        >
                                            <i className="fad fa-camera mr-2"></i>
                                            <span> Chọn ảnh</span>
                                        </label>
                                        <input
                                            type="file"
                                            id="avt"
                                            name="image"
                                            hidden
                                            required
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.image ? error.image[0] : ''}
                                        </span>

                                        {/* <input type="file" required min="0" className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" /> */}
                                    </div>
                                </div>
                                <div className="w-full lg:w-12/12 px-4 mt-10">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlfor="grid-password"
                                        >
                                            Mô tả
                                        </label>
                                        <DraftjsWidget
                                            value=""
                                            onChange={(editorState) =>
                                                onChangeEditor(editorState)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.description
                                                ? error.description[0]
                                                : ''}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => addBook()}
                                className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 hover:shadow-xl font-semibold duration-300"
                            >
                                Thêm
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddBook;
