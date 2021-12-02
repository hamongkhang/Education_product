import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { DraftjsWidget } from '../../../components/DraftjsWidget';
import Preloader from '../../../components/preloader';

toast.configure();

const EditLesson = () => {
    const [isLoading, setIsLoading] = useState(false);
    const match = useRouteMatch();
    const [contents, setContents] = useState([]);
    const [lesson, setLesson] = useState({});
    const [file, setFile] = useState(null);
    const history = useHistory();
    const $token = localStorage.getItem('access_token');
    const config = {
        readonly: false,
    };
    const [error, setError] = useState({
        id: null,
        name: null,
        status: null,
    });
    const getContents = () => {
        setIsLoading(true);
        fetch('http://localhost:8000/api/getContents', {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.url) {
                    let url = data.url;
                    history.push(url);
                }
                if (data.contents) {
                    setContents(data.contents);
                    // setLesson({...lesson,["content_id"]:data.contents[0].id})
                }
                setIsLoading(false);
            });
    };
    const getOneLesson = () => {
        const _formData = new FormData();
        _formData.append('id', match.params.id);
        setIsLoading(true);
        fetch('http://localhost:8000/api/getOneLesson', {
            method: 'POST',
            body: _formData,
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    toast.error('Không load được dữ liệu', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    setLesson(data.lesson);
                }
                setIsLoading(false);
            });
    };
    const updateLesson = () => {
        const _formData = new FormData();
        _formData.append('id', lesson.id);
        _formData.append('name', lesson.name);
        _formData.append('status', lesson.status);
        _formData.append('content_id', lesson.content_id);
        _formData.append('description', lesson.description);
        _formData.append('path', lesson.path);
        if (file != null) {
            _formData.append('file', file);
        }
        setIsLoading(true);
        fetch('http://localhost:8000/api/updateLesson', {
            method: 'POST',
            body: _formData,
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    toast.error('Cập nhật bị lỗi', {
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
                    toast.success('Cập nhật thành công', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    // history.push("/admin/table_content")
                    history.goBack();
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
                setLesson({ ...lesson, ['status']: 'Active' });
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
                setLesson({ ...lesson, ['status']: 'Block' });
                toast.error('Trạng thái khóa', {
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
            setLesson({ ...lesson, [_name]: _value });
        }
    };
    const onChangeEditor = (value) => {
        if (lesson.description != value) {
            console.log(value);
            setLesson({ ...lesson, ['description']: value });
        }
    };
    useEffect(() => {
        if ($token) {
            getContents();
            getOneLesson();
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
                                Chỉnh sửa bài học
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
                                            htmlFor="grid-password"
                                        >
                                            Tên bài học
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={
                                                lesson.name ? lesson.name : ''
                                            }
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
                                            htmlFor="grid-password"
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
                                                onChange={(event) =>
                                                    onChangeHandle(event)
                                                }
                                                checked={
                                                    lesson.status === 'Active'
                                                        ? true
                                                        : false
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
                                            htmlFor="grid-password"
                                        >
                                            Chương
                                        </label>
                                        <select
                                            name="content_id"
                                            id="type"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        >
                                            {contents.map((item, index) => (
                                                <option
                                                    key={index}
                                                    value={item.id}
                                                    selected={
                                                        item.id ===
                                                        lesson.content_id
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
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Phần
                                        </label>
                                        <input
                                            type="text"
                                            name="path"
                                            required
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={
                                                lesson.path ? lesson.path : ''
                                            }
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.name ? error.name[0] : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            File
                                        </label>
                                        <input
                                            type="file"
                                            id="avt"
                                            name="file"
                                            required
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.file ? error.file[0] : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                                            Mô tả
                                        </label>
                                        <DraftjsWidget
                                            value={lesson.description}
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
                                <div className="w-full lg:w-6/12 px-4">
                                    <label
                                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        &nbsp;
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => updateLesson()}
                                        className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 hover:shadow-xl font-semibold duration-300"
                                    >
                                        Cập nhật
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditLesson;
