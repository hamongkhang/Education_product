import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { DraftjsWidget } from '../../../components/DraftjsWidget';
import Preloader from '../../../components/preloader';

toast.configure();

const EditTeacher = () => {
    const [isLoading, setIsLoading] = useState(false);
    const $link = `${process.env.REACT_APP_URL_SERVER}/upload/images/teacher/`;
    const match = useRouteMatch();
    const [editTeacher, setEditTeacher] = useState({});
    const [file, setFile] = useState(null);
    const [render, setRender] = useState(false);
    const history = useHistory();
    const $token = localStorage.getItem('access_token');
    const config = {
        readonly: false,
    };
    const [error, setError] = useState({
        name: null,
        position: null,
        description: null,
        facebook: null,
        skype: null,
        youtube: null,
        image: null,
        phone: null,
    });
    const updateTeacher = () => {
        const _formData = new FormData();
        _formData.append('name', editTeacher.name);
        _formData.append('position', editTeacher.position);
        _formData.append('description', editTeacher.description);
        _formData.append('facebook', editTeacher.facebook);
        _formData.append('skype', editTeacher.skype);
        _formData.append('youtube', editTeacher.youtube);
        _formData.append('phone', editTeacher.phone);
        if (file != null) {
            _formData.append('image', file);
        }
        setIsLoading(true);
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/teacher/updateTeacher/${editTeacher.id}`,
            {
                method: 'POST',
                body: _formData,
                headers: { Authorization: `Bearer ` + $token },
            },
        )
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
                    history.push('/admin/teacher');
                }
                setIsLoading(false);
            });
    };
    const getOneTeacher = () => {
        const _formData = new FormData();
        _formData.append('id', match.params.id);
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/teacher/getOneTeacher`, {
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
                    setEditTeacher(data.data);
                }
                setIsLoading(false);
            });
    };
    const onChangeHandle = (event) => {
        let _name = event.target.name;
        let _type = event.target.type;
        let _value = event.target.value;
        if (_type === 'file') {
            setFile(event.target.files[0]);
        } else {
            setEditTeacher({ ...editTeacher, [_name]: _value });
        }
    };
    const onChangeEditor = (value) => {
        if (editTeacher.description != value) {
            setEditTeacher({ ...editTeacher, ['description']: value });
        }
    };
    useEffect(() => {
        if ($token) {
            getOneTeacher();
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
                                Chỉnh sửa thông tin giáo viên
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
                                            Tên giáo viên
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editTeacher.name}
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
                                            Chức vụ
                                        </label>
                                        <input
                                            type="text"
                                            name="position"
                                            value={editTeacher.position}
                                            required
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.position
                                                ? error.position[0]
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
                                            Số điện thoại
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={editTeacher.phone}
                                            required
                                            min="0"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.phone ? error.phone[0] : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlfor="grid-password"
                                        >
                                            Facebook link
                                        </label>
                                        <input
                                            type="text"
                                            name="facebook"
                                            value={editTeacher.facebook}
                                            required
                                            min="0"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.facebook
                                                ? error.facebook[0]
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
                                            Youtube link
                                        </label>
                                        <input
                                            type="text"
                                            name="youtube"
                                            value={editTeacher.youtube}
                                            required
                                            min="0"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.youtube
                                                ? error.youtube[0]
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
                                            Skype link
                                        </label>
                                        <input
                                            type="text"
                                            name="skype"
                                            value={editTeacher.skype}
                                            required
                                            min="0"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.skype ? error.skype[0] : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full px-4 ">
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
                                                    : $link + editTeacher.image
                                            }
                                            className="w-full min-h-96 h-full mb-30 md:mb-1 object-scale-down rounded-lg"
                                            alt=""
                                        />
                                        <label
                                            htmlFor="avt"
                                            className="w-3/5 text-center opacity-0 group-hover:opacity-100 block py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-15 font-semibold absolute bottom-5 transform left-1/2 -translate-x-1/2 duration-300 text-white"
                                        >
                                            <i className="fad fa-camera mr-2"></i>
                                            <span> Đổi ảnh</span>
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
                                <div className="w-full lg:w-12/12 px-4 mt-10">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlfor="grid-password"
                                        >
                                            Mô tả
                                        </label>
                                        <DraftjsWidget
                                            value={editTeacher.description}
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
                                onClick={() => updateTeacher()}
                                className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 hover:shadow-xl font-semibold duration-300"
                            >
                                Cập nhật
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditTeacher;
