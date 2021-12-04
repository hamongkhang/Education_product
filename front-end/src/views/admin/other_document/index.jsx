import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Preloader from '../../../components/preloader';

toast.configure();
const DocumentTable = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const $token = localStorage.getItem('access_token');
    const [search, setSearch] = useState(0);
    const [searchData, setSearchData] = useState([]);
    const [document, setDocument] = useState([]);
    const [documentCategory, setDocumentCategory] = useState([]);
    const [render, setRender] = useState(false);
    const [classOptionDocument, setClassOptionDocument] = useState('hidden');
    const [classOptionCategory, setClassOptionCategory] = useState('hidden');
    const handleOptionDocument = () => {
        classOptionDocument === 'hidden'
            ? setClassOptionDocument('block')
            : setClassOptionDocument('hidden');
    };
    const handleOptionCategory = () => {
        classOptionCategory === 'hidden'
            ? setClassOptionCategory('block')
            : setClassOptionCategory('hidden');
    };
    const [filefile, setFilefile] = useState(null);
    const [classOptionFile1, setClassOptionFile1] = useState('hidden');
    const [classOptionFile2, setClassOptionFile2] = useState('hidden');

    const handleOptionFile1 = () => {
        classOptionFile1 === 'hidden'
            ? setClassOptionFile1('block')
            : setClassOptionFile1('hidden');
    };
    const handleOptionFile2 = () => {
        classOptionFile2 === 'hidden'
            ? setClassOptionFile2('block')
            : setClassOptionFile2('hidden');
    };
    const importFilefile = (event) => {
        setFilefile(event.target.files[0]);
    };
    const importUser = (id) => {
        const _formData = new FormData();
        _formData.append('file', filefile);
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/users/importUser`, {
            method: 'POST',
            body: _formData,
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    toast.error('Import File không thành công', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                } else {
                    setRender(!render);
                    toast.success('Import File thành công', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                }
                setIsLoading(false);
            });
    };
    const ExportUser1 = () => {
        setIsLoading(true);
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/document/exportDocumentCategoryLink`,
            {
                method: 'GET',
                headers: { Authorization: `Bearer ` + $token },
            },
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    toast.error('Thay đổi trạng thái lỗi', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                } else {
                    setRender(!render);
                    toast.success('Xuất file pdf thành công!', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                    window.location.href = data.url;
                }
                setIsLoading(false);
            });
    };
    const ExportUser2 = () => {
        setIsLoading(true);
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/document/exportDocumentLink`,
            {
                method: 'GET',
                headers: { Authorization: `Bearer ` + $token },
            },
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    toast.error('Thay đổi trạng thái lỗi', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                } else {
                    setRender(!render);
                    toast.success('Xuất file pdf thành công!', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                    window.location.href = data.url;
                }
                setIsLoading(false);
            });
    };
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
                setDocument(data.data[1]);
                setSearchData(data.data[1]);
                setDocumentCategory(data.data[0]);
                setIsLoading(false);
            });
    };
    const onChangeHandle = (event) => {
        let _name = event.target.name;
        let _type = event.target.type;
        let _value = event.target.value;
        setSearch(_value);
        if (_value === '0') {
            setDocument(searchData);
        } else {
            var arrayTest = [];
            for (var i = 0; i < searchData.length; i++) {
                if (searchData[i].category_name === _value) {
                    arrayTest.push(searchData[i]);
                }
            }
            setDocument(arrayTest);
        }
    };
    const changeStatus = (id) => {
        setIsLoading(true);
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/freeDocumentCategory/blockActiveDocumentCategory/${id}`,
            {
                method: 'POST',
                headers: { Authorization: `Bearer ` + $token },
            },
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    toast.error('Thay đổi trạng thái lỗi', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                } else {
                    setRender(!render);
                    toast.success('Thay đổi trạng thái thành công', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                }
                setIsLoading(false);
            });
    };
    const changeStatusDocument = (id) => {
        setIsLoading(true);
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/freeDocument/blockActiveFreeDocument/${id}`,
            {
                method: 'POST',
                headers: { Authorization: `Bearer ` + $token },
            },
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    toast.error('Thay đổi trạng thái lỗi', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                } else {
                    setRender(!render);
                    toast.success('Thay đổi trạng thái thành công', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                }
                setIsLoading(false);
            });
    };
    const onDeleteDocumentCategory = (id) => {
        Swal.fire({
            title: 'Cảnh báo',
            text: 'Bạn có chắc chắn muốn xóa?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Xóa',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteDocumentCategory(id);
            }
        });
    };
    const deleteDocumentCategory = (id) => {
        const _formData = new FormData();
        _formData.append('id', id);
        setIsLoading(true);
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/freeDocumentCategory/destroyFreeDocumentCategory/${id}`,
            {
                method: 'POST',
                body: _formData,
                headers: { Authorization: `Bearer ` + $token },
            },
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    toast.error('Xóa bị lỗi', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                } else {
                    setRender(!render);
                    toast.success('Xóa thành công', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                }
                setIsLoading(false);
            });
    };
    const onDeleteDocument = (id) => {
        Swal.fire({
            title: 'Cảnh báo',
            text: 'Bạn có chắc chắn muốn xóa?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Xóa',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteDocument(id);
            }
        });
    };
    const deleteDocument = (id) => {
        const _formData = new FormData();
        _formData.append('id', id);
        setIsLoading(true);
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/freeDocument/destroyFreeDocument/${id}`,
            {
                method: 'POST',
                body: _formData,
                headers: { Authorization: `Bearer ` + $token },
            },
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    toast.error('Xóa bị lỗi', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                } else {
                    setRender(!render);
                    toast.success('Xóa thành công', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                }
                setIsLoading(false);
            });
    };
    useEffect(() => {
        if ($token) {
            getDocument();
        }
    }, [render]);
    return (
        <>
            {isLoading && <Preloader />}
            <section className="bg-blueGray-50">
                <h6 className="text-gray-700 text-xl font-bold mb-4">
                    Thông tin danh sách loại tài liệu
                </h6>
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                                    <button
                                        onClick={handleOptionCategory}
                                        className="bg-indigo-500 hover:bg-indigo-700 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        <i className="far fa-ellipsis-v"></i>
                                    </button>
                                    <div
                                        className={`absolute top-full right-0 ${classOptionCategory}`}
                                    >
                                        <div className="py-2 bg-white shadow-lg text-13">
                                            <Link
                                                className="block w-full py-1 text-left px-2 hover:bg-gray-200"
                                                to={`other_document/addDocumentCategory`}
                                            >
                                                Add
                                            </Link>
                                            <button
                                                onClick={handleOptionFile1}
                                                className="w-full py-1 text-left px-2 hover:bg-gray-200"
                                            >
                                                Import Excel
                                            </button>
                                            <input
                                                onChange={(event) =>
                                                    importFilefile(event)
                                                }
                                                className={`w-full py-1 text-left px-2 hover:bg-gray-200 ${classOptionFile1}`}
                                                type="file"
                                                placeholder="Chọn file"
                                            ></input>
                                            <button
                                                onClick={() => importUser()}
                                                className={`w-full py-1 text-left px-2 hover:bg-gray-200 ${classOptionFile1}`}
                                            >
                                                Submit
                                            </button>
                                            <button
                                                onClick={() => ExportUser1()}
                                                className="w-full py-1 text-left px-2 hover:bg-gray-200"
                                            >
                                                Export Excel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="block w-full overflow-x-auto custom-scroll-2 overflow-y-scroll"
                            style={{ maxHeight: `calc(100vh - 234px)` }}
                        >
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            STT
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Tên loại tài liệu
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Trạng thái
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Ngày tạo
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Hành động
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documentCategory.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                    {index + 1}
                                                </th>
                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {item.name}
                                                </td>
                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <label
                                                        htmlFor={`toggle${item.id}`}
                                                        className="toggle-label"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            name=""
                                                            id={`toggle${item.id}`}
                                                            defaultChecked={
                                                                item.status ===
                                                                'Active'
                                                                    ? true
                                                                    : false
                                                            }
                                                            hidden
                                                            onClick={() =>
                                                                changeStatus(
                                                                    item.id,
                                                                )
                                                            }
                                                        />
                                                        <div className="toggle-btn">
                                                            <div className="spinner"></div>
                                                        </div>
                                                    </label>
                                                </td>
                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {item.updated_at}
                                                </td>
                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <div className="space-x-2">
                                                        <Link
                                                            to={`other_document/editDocumentCategory/${item.id}`}
                                                            className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block"
                                                            onClick={() =>
                                                                onDeleteDocumentCategory(
                                                                    item.id,
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-blueGray-50">
                <h6 className="text-gray-700 text-xl font-bold mb-4">
                    Thông tin danh sách tài liệu
                </h6>
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                    <select
                                        name="searchDocument"
                                        id="type"
                                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        onChange={(event) =>
                                            onChangeHandle(event)
                                        }
                                    >
                                        <option value="0">Xem tất cả</option>
                                        {documentCategory.map((items) => {
                                            return (
                                                <option value={items.name}>
                                                    {items.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                                    <button
                                        onClick={handleOptionDocument}
                                        className="bg-indigo-500 hover:bg-indigo-700 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        <i className="far fa-ellipsis-v"></i>
                                    </button>
                                    <div
                                        className={`absolute top-full right-0 ${classOptionDocument}`}
                                    >
                                        <div className="py-2 bg-white shadow-lg text-13">
                                            <Link
                                                className="block w-full py-1 text-left px-2 hover:bg-gray-200"
                                                to={`other_document/addDocument`}
                                            >
                                                Add
                                            </Link>
                                            <button
                                                onClick={handleOptionFile2}
                                                className="w-full py-1 text-left px-2 hover:bg-gray-200"
                                            >
                                                Import Excel
                                            </button>
                                            <input
                                                onChange={(event) =>
                                                    importFilefile(event)
                                                }
                                                className={`w-full py-1 text-left px-2 hover:bg-gray-200 ${classOptionFile2}`}
                                                type="file"
                                                placeholder="Chọn file"
                                            ></input>
                                            <button
                                                onClick={() => importUser()}
                                                className={`w-full py-1 text-left px-2 hover:bg-gray-200 ${classOptionFile2}`}
                                            >
                                                Submit
                                            </button>
                                            <button
                                                onClick={() => ExportUser2()}
                                                className="w-full py-1 text-left px-2 hover:bg-gray-200"
                                            >
                                                Export Excel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="block w-full overflow-x-auto custom-scroll-2 overflow-y-scroll"
                            style={{ maxHeight: `calc(100vh - 234px)` }}
                        >
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            STT
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Tên tài liệu
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Loại tài liệu
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            File
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Trạng thái
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Ngày tạo
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Hành động
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {document.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                    {index + 1}
                                                </th>
                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {item.name}
                                                </td>
                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {item.category_name}
                                                </td>
                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {item.file}
                                                </td>
                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <label
                                                        htmlFor={`toggle${item.id}`}
                                                        className="toggle-label"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            name=""
                                                            id={`toggle${item.id}`}
                                                            defaultChecked={
                                                                item.status ===
                                                                'Active'
                                                                    ? true
                                                                    : false
                                                            }
                                                            hidden
                                                            onClick={() =>
                                                                changeStatusDocument(
                                                                    item.id,
                                                                )
                                                            }
                                                        />
                                                        <div className="toggle-btn">
                                                            <div className="spinner"></div>
                                                        </div>
                                                    </label>
                                                </td>
                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {item.updated_at}
                                                </td>
                                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <div className="space-x-2">
                                                        <Link
                                                            to={`other_document/editDocument/${item.id}`}
                                                            className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block"
                                                            onClick={() =>
                                                                onDeleteDocument(
                                                                    item.id,
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DocumentTable;
