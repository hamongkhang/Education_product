import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { DraftjsWidget } from '../../../components/DraftjsWidget';
import Preloader from '../../../components/preloader';

toast.configure();
const AddPost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [postAdd, setPostAdd] = useState({
        id: '',
        name: '',
        description: '',
        author: localStorage.getItem('nameAccount'),
        file: 'Block',
        image: '',
        status: 'Active',
    });
    const [error, setError] = useState({
        id: null,
        name: null,
        description: null,
        author: null,
        file: null,
        image: null,
        status: null,
    });
    const [file, setFile] = useState(null);
    const $token = localStorage.getItem('access_token');
    const config = {
        readonly: false,
    };
    const history = useHistory();
    const addExamPost = () => {
        const _formData = new FormData();
        _formData.append('id', postAdd.id);
        _formData.append('name', postAdd.name);
        _formData.append('author', postAdd.author);
        _formData.append('description', postAdd.description);
        _formData.append('file', postAdd.file);
        _formData.append('status', postAdd.status);
        _formData.append('image', file);
        setIsLoading(true);
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/featuredPost/createFeaturedPost`,
            {
                method: 'POST',
                body: _formData,
                headers: { Authorization: `Bearer ` + $token },
            },
        )
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
                    history.push('/admin/featured_post');
                }
                setIsLoading(false);
            });
    };
    const onChangeHandle = (event) => {
        let _name = event.target.name;
        let _type = event.target.type;
        let _value = event.target.value;
        if (_type === 'checkbox') {
            if (event.target.checked) {
                setPostAdd({ ...postAdd, ['status']: 'Active' });
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
                setPostAdd({ ...postAdd, ['status']: 'Block' });
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
            } else if (event.target.name === 'file') {
                setPostAdd({ ...postAdd, [_name]: event.target.files[0] });
            }
        } else {
            setPostAdd({ ...postAdd, [_name]: _value });
        }
    };
    const onChangeEditor = (value) => {
        if (postAdd.description != value) {
            setPostAdd({ ...postAdd, ['description']: value });
        }
    };
    return (
        <section className=" py-1">
            {isLoading && <Preloader />}
            <div className="w-full">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-gray-700 text-xl font-bold">
                                Thêm bài viết
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
                                            Tên bài viết
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
                                                    postAdd.status === 'Active'
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
                                            File đính kèm
                                        </label>
                                        <input
                                            type="file"
                                            name="file"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.file ? error.file[0] : ''}
                                        </span>
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
                                onClick={() => addExamPost()}
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

export default AddPost;
