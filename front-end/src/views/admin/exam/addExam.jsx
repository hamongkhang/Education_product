import React, { useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Preloader from '../../../components/preloader';

toast.configure();
const AddExam = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [examAdd, setExamAdd] = useState({
        id: '',
        name: '',
        category_id: '',
        price: 0,
        time: '',
        number_question: '',
        file_question: 'Block',
        image: '',
        status: 'Active',
    });
    const [error, setError] = useState({
        id: null,
        name: null,
        category_id: null,
        price: null,
        time: null,
        number_question: null,
        file_question: null,
        image: null,
        status: null,
    });
    const [file, setFile] = useState(null);
    const $token = localStorage.getItem('access_token');
    const [examCategoryAdmin2, setExamCategoryAdmin2] = useState([]);
    const config = {
        readonly: false,
    };
    const history = useHistory();
    const addExamFunction = () => {
        const _formData = new FormData();
        _formData.append('id', examAdd.id);
        _formData.append('name', examAdd.name);
        _formData.append('category_id', examAdd.category_id);
        _formData.append('price', examAdd.price);
        _formData.append('time', examAdd.time);
        _formData.append('number_question', examAdd.number_question);
        _formData.append('file_question', examAdd.file_question);
        _formData.append('status', examAdd.status);
        _formData.append('image', file);
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/exam/addExamAdmin`, {
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
                    history.push('/admin/exam');
                }
                setIsLoading(false);
            });
    };
    const getExamCategoryAdmin = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/exam/getExamAdmin`, {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                setExamCategoryAdmin2(data.data[0]);
                setIsLoading(false);
            });
    };
    const onChangeHandle = (event) => {
        let _name = event.target.name;
        let _type = event.target.type;
        let _value = event.target.value;
        if (_type === 'checkbox') {
            if (event.target.checked) {
                setExamAdd({ ...examAdd, ['status']: 'Active' });
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
                setExamAdd({ ...examAdd, ['status']: 'Block' });
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
            if (event.target.name === 'image') {
                setFile(event.target.files[0]);
            } else if (event.target.name === 'file_question') {
                setExamAdd({ ...examAdd, [_name]: event.target.files[0] });
            }
        } else {
            setExamAdd({ ...examAdd, [_name]: _value });
        }
    };
    useEffect(() => {
        if ($token) {
            getExamCategoryAdmin();
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
                                Thêm bài thi
                            </h6>
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
                                            Tên bài thi
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
                                            Loại bài thi
                                        </label>
                                        <select
                                            name="category_id"
                                            id="type"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        >
                                            {examCategoryAdmin2.map(
                                                (item, index) => (
                                                    <option
                                                        key={index}
                                                        value={item.id}
                                                        selected={
                                                            item.id ===
                                                            examAdd.category_id
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        {item.name}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlfor="grid-password"
                                        >
                                            Gía bài thi (đ)
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            required
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.price ? error.price[0] : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlfor="grid-password"
                                        >
                                            Số lượng câu hỏi
                                        </label>
                                        <input
                                            type="number"
                                            name="number_question"
                                            required
                                            min="0"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.number_question
                                                ? error.number_question[0]
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
                                            Thời gian làm bài (phút)
                                        </label>
                                        <input
                                            type="number"
                                            name="time"
                                            required
                                            min="0"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.time ? error.time[0] : ''}
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
                                                    examAdd.status === 'Active'
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
                                    </div>
                                </div>
                                <div className="w-full px-4">
                                    <div className="relative w-full mb-3 group h-96">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlfor="grid-password"
                                        >
                                            File đề
                                        </label>
                                        <input
                                            type="file"
                                            name="file_question"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.file_question
                                                ? error.file_question[0]
                                                : ''}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => addExamFunction()}
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

export default AddExam;
