import React, { useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Preloader from '../../../components/preloader';

toast.configure();
const AddDocument = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [documentCategory, setDocumentCategory] = useState([]);
    const [documentAdd, setDocumentAdd] = useState({
        id: '',
        name: '',
        category_id: 3,
        file: '',
        status: 'Active',
    });
    const [error, setError] = useState({
        id: null,
        name: null,
        category_id: null,
        file: null,
        status: null,
    });
    const $token = localStorage.getItem('access_token');
    const history = useHistory();
    const getDocument = () => {
        setIsLoading(true);
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/freeDocument/getFreeDocumentAdmin`,
            {
                method: 'GET',
                headers: { Authorization: `Bearer ` + $token },
            },
        )
            .then((response) => response.json())
            .then((data) => {
                setDocumentCategory(data.data[0].reverse());
                setIsLoading(false);
            });
        return () => {};
    };
    const addDocument = () => {
        const _formData = new FormData();
        _formData.append('id', documentAdd.id);
        _formData.append('name', documentAdd.name);
        _formData.append('category_id', documentAdd.category_id);
        _formData.append('file', documentAdd.file);
        _formData.append('status', documentAdd.status);
        setIsLoading(true);
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/freeDocument/createFreeDocument`,
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
                    history.push('/admin/other_document');
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
                setDocumentAdd({ ...documentAdd, ['status']: 'Active' });
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
                setDocumentAdd({ ...documentAdd, ['status']: 'Block' });
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
            setDocumentAdd({ ...documentAdd, [_name]: event.target.files[0] });
        } else {
            setDocumentAdd({ ...documentAdd, [_name]: _value });
        }
    };
    useEffect(() => {
        if ($token) {
            getDocument();
        }
    });
    return (
        <section className=" py-1">
            {isLoading && <Preloader />}
            <div className="w-full">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-gray-700 text-xl font-bold">
                                Thêm tài liệu
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
                                            Tên tài liệu
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
                                            Loại tài liệu
                                        </label>
                                        <select
                                            name="category_id"
                                            id="type"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        >
                                            {documentCategory.map((items) => {
                                                return (
                                                    <option value={items.id}>
                                                        {items.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
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
                                                    documentAdd.status ===
                                                    'Active'
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
                            </div>
                            <button
                                type="button"
                                onClick={() => addDocument()}
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

export default AddDocument;
