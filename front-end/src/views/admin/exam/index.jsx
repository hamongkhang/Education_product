import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Preloader from '../../../components/preloader';

toast.configure();

const ExamTable = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const $token = localStorage.getItem('access_token');
    const [examCategoryAdmin, setExamCategoryAdmin] = useState([]);
    const [examAdmin, setExamAdmin] = useState([]);
    const [examCategoryAdminSearch, setExamCategoryAdminSearch] = useState([]);
    const [examAdminSearch, setExamAdminSearch] = useState([]);
    const [render, setRender] = useState(false);
    const [classOptionCategory, setClassOptionCategory] = useState('hidden');
    const [classOptionExam, setClassOptionExam] = useState('hidden');
    const handleOptionCategory = () => {
        classOptionCategory === 'hidden'
            ? setClassOptionCategory('block')
            : setClassOptionCategory('hidden');
    };
    const handleOptionExam = () => {
        classOptionExam === 'hidden'
            ? setClassOptionExam('block')
            : setClassOptionExam('hidden');
    };
    const getExamAdmin = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/exam/getExamAdmin`, {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                setExamCategoryAdmin(data.data[0]);
                setExamAdmin(data.data[1]);
                setIsLoading(false);
            });
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
    const importExamCategory = (id) => {
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
    const ExportExamCategory = () => {
        setIsLoading(true);
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/exam/exportExamCategoryLink`,
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
    const ExportExam = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/exam/exportExamLink`, {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
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
    const changeCategoryStatus = (id) => {
        const _formData = new FormData();
        _formData.append('id', id);
        setIsLoading(true);
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/exam/changeCategoryStatus`,
            {
                method: 'POST',
                body: _formData,
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
    const deleteCategory = (id) => {
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
                const _formData = new FormData();
                _formData.append('id', id);
                setIsLoading(true);
                fetch(
                    `${process.env.REACT_APP_URL_SERVER}/api/exam/deleteCategory`,
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
            }
        });
    };
    const deleteExamAdmin = (id) => {
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
                const _formData = new FormData();
                _formData.append('id', id);
                setIsLoading(true);
                fetch(
                    `${process.env.REACT_APP_URL_SERVER}/api/exam/deleteExamAdmin`,
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
            }
        });
    };
    const changeExamStatus = (id) => {
        const _formData = new FormData();
        _formData.append('id', id);
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/exam/changeExamStatus`, {
            method: 'POST',
            body: _formData,
            headers: { Authorization: `Bearer ` + $token },
        })
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
    const searchHandle = (e) => {
        let searchString = e.target.value
            .replace(/\s+/g, '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
        let type = e.target.name;
        if (searchString.length > 0) {
            if (type == 'examCategoryAdminSearch') {
                let responseData = examCategoryAdminSearch.filter((l) => {
                    let name = l.name
                        .replace(/\s+/g, '')
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/đ/g, 'd')
                        .replace(/Đ/g, 'D');
                    let check = name
                        .toLowerCase()
                        .indexOf(searchString.toLowerCase());
                    if (check > -1) {
                        return l;
                    }
                });
                setExamCategoryAdminSearch(responseData);
            } else {
                let responseData = examAdminSearch.filter((l) => {
                    let name = l.name
                        .replace(/\s+/g, '')
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/đ/g, 'd')
                        .replace(/Đ/g, 'D');
                    let check = name
                        .toLowerCase()
                        .indexOf(searchString.toLowerCase());
                    if (check > -1) {
                        return l;
                    }
                });
                setExamAdminSearch(responseData);
            }
        } else {
            if (type == 'examCategoryAdminSearch') {
                setExamCategoryAdminSearch([]);
            } else {
                setExamAdminSearch([]);
            }
        }
    };
    useEffect(() => {
        if ($token) {
            getExamAdmin();
        }
    }, [render]);
    return (
        <>
            {isLoading && <Preloader />}
            <section className="bg-blueGray-50">
                <h6 className="text-gray-700 text-xl font-bold mb-4">
                    Loại bài kiểm tra
                </h6>
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                    <input
                                        type="text"
                                        name="examCategoryAdminSearch"
                                        onChange={(event) =>
                                            searchHandle(event)
                                        }
                                        placeholder="Tìm kiếm..."
                                        className="text-13 px-3 py-1 outline-none border border-purple-800 focus:border-purple-900 rounded"
                                    />
                                </div>
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
                                                to={`exam/addCategory`}
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
                                                onClick={() =>
                                                    importExamCategory()
                                                }
                                                className={`w-full py-1 text-left px-2 hover:bg-gray-200 ${classOptionFile1}`}
                                            >
                                                Submit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    ExportExamCategory()
                                                }
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
                                            ID
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Tên loại bài kiểm tra
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Trạng thái
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Cập nhật gần đây
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Hành động
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {examCategoryAdminSearch.length > 0
                                        ? examCategoryAdminSearch.map(
                                              (item, index) => {
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
                                                                          changeCategoryStatus(
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
                                                              {new Intl.DateTimeFormat(
                                                                  'en-GB',
                                                                  {
                                                                      month: 'numeric',
                                                                      day: '2-digit',
                                                                      year: 'numeric',
                                                                  },
                                                              ).format(
                                                                  new Date(
                                                                      item.updated_at,
                                                                  ),
                                                              )}
                                                          </td>
                                                          <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                              <div className="space-x-2">
                                                                  <Link
                                                                      to={`exam/editCategory/${item.id}`}
                                                                      className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block"
                                                                  >
                                                                      Edit
                                                                  </Link>
                                                                  <button
                                                                      className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block"
                                                                      onClick={() =>
                                                                          deleteCategory(
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
                                              },
                                          )
                                        : examCategoryAdmin.map(
                                              (item, index) => {
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
                                                                          changeCategoryStatus(
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
                                                              {new Intl.DateTimeFormat(
                                                                  'en-GB',
                                                                  {
                                                                      month: 'numeric',
                                                                      day: '2-digit',
                                                                      year: 'numeric',
                                                                  },
                                                              ).format(
                                                                  new Date(
                                                                      item.updated_at,
                                                                  ),
                                                              )}
                                                          </td>
                                                          <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                              <div className="space-x-2">
                                                                  <Link
                                                                      to={`exam/editCategory/${item.id}`}
                                                                      className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block"
                                                                  >
                                                                      Edit
                                                                  </Link>
                                                                  <button
                                                                      className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block"
                                                                      onClick={() =>
                                                                          deleteCategory(
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
                                              },
                                          )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-blueGray-50">
                <h6 className="text-gray-700 text-xl font-bold mb-4">
                    Bài kiểm tra
                </h6>
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm..."
                                        name="examAdminSearch"
                                        onChange={(event) =>
                                            searchHandle(event)
                                        }
                                        className="text-13 px-3 py-1 outline-none border border-purple-800 focus:border-purple-900 rounded"
                                    />
                                </div>
                                <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                                    <button
                                        onClick={handleOptionExam}
                                        className="bg-indigo-500 hover:bg-indigo-700 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        <i className="far fa-ellipsis-v"></i>
                                    </button>
                                    <div
                                        className={`absolute top-full right-0 ${classOptionExam}`}
                                    >
                                        <div className="py-2 bg-white shadow-lg text-13">
                                            <Link
                                                className="block w-full py-1 text-left px-2 hover:bg-gray-200"
                                                to={`exam/addExam`}
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
                                                onClick={() =>
                                                    importExamCategory()
                                                }
                                                className={`w-full py-1 text-left px-2 hover:bg-gray-200 ${classOptionFile2}`}
                                            >
                                                Submit
                                            </button>
                                            <button
                                                onClick={() => ExportExam()}
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
                                            ID
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Tên bài kiểm tra
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Loại bài kiểm tra
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Gía bài kiểm tra (đ)
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Ảnh
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            File
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Số lượng câu hỏi
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Thời gian làm bài (phút)
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Trạng thái
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Cập nhật gần đây
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Hành động
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {examAdminSearch.length > 0
                                        ? examAdminSearch.map((item, index) => {
                                              return (
                                                  <tr key={index}>
                                                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                          {index + 1}
                                                      </th>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.name}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {examCategoryAdmin.map(
                                                              (bt, i) => {
                                                                  if (
                                                                      item.category_id ==
                                                                      bt.id
                                                                  ) {
                                                                      return bt.name;
                                                                  }
                                                              },
                                                          )}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {String(item).replace(
                                                              /\B(?=(\d{3})+(?!\d))/g,
                                                              ',',
                                                          )}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                          <img
                                                              alt=""
                                                              src={`${process.env.REACT_APP_URL_SERVER}/upload/images/exam/${item.image}`}
                                                              className="w-12 h-16 object-cover"
                                                          />
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.file_question}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.number_question}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.time}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                          <label
                                                              htmlFor={`toggle${
                                                                  item.id +
                                                                  'exam'
                                                              }`}
                                                              className="toggle-label"
                                                          >
                                                              <input
                                                                  type="checkbox"
                                                                  name=""
                                                                  id={`toggle${
                                                                      item.id +
                                                                      'exam'
                                                                  }`}
                                                                  defaultChecked={
                                                                      item.status ===
                                                                      'Active'
                                                                          ? true
                                                                          : false
                                                                  }
                                                                  hidden
                                                                  onClick={() =>
                                                                      changeExamStatus(
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
                                                          {new Intl.DateTimeFormat(
                                                              'en-GB',
                                                              {
                                                                  month: 'numeric',
                                                                  day: '2-digit',
                                                                  year: 'numeric',
                                                              },
                                                          ).format(
                                                              new Date(
                                                                  item.updated_at,
                                                              ),
                                                          )}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                          <div className="space-x-2">
                                                              <Link
                                                                  to={`exam/editExam/${item.id}`}
                                                                  className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block"
                                                              >
                                                                  Edit
                                                              </Link>
                                                              <button
                                                                  className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block"
                                                                  onClick={() =>
                                                                      deleteExamAdmin(
                                                                          item.id,
                                                                      )
                                                                  }
                                                              >
                                                                  Delete
                                                              </button>
                                                              <Link
                                                                  to={`exam/IndexQuestionExam/${item.id}`}
                                                                  className="py-1 px-2 text-white rounded hover:opacity-80 bg-blue-400 shadow-lg block md:inline-block"
                                                              >
                                                                  <i class="fad fa-arrow-right"></i>
                                                              </Link>
                                                          </div>
                                                      </td>
                                                  </tr>
                                              );
                                          })
                                        : examAdmin.map((item, index) => {
                                              return (
                                                  <tr key={index}>
                                                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                          {index + 1}
                                                      </th>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.name}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {examCategoryAdmin.map(
                                                              (bt, i) => {
                                                                  if (
                                                                      item.category_id ==
                                                                      bt.id
                                                                  ) {
                                                                      return bt.name;
                                                                  }
                                                              },
                                                          )}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {String(
                                                              item.price,
                                                          ).replace(
                                                              /\B(?=(\d{3})+(?!\d))/g,
                                                              ',',
                                                          )}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                          <img
                                                              alt=""
                                                              src={`${process.env.REACT_APP_URL_SERVER}/upload/images/exam/${item.image}`}
                                                              className="w-12 h-16 object-cover"
                                                          />
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.file_question}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.number_question}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.time}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                          <label
                                                              htmlFor={`toggle${
                                                                  item.id +
                                                                  'exam'
                                                              }`}
                                                              className="toggle-label"
                                                          >
                                                              <input
                                                                  type="checkbox"
                                                                  name=""
                                                                  id={`toggle${
                                                                      item.id +
                                                                      'exam'
                                                                  }`}
                                                                  defaultChecked={
                                                                      item.status ===
                                                                      'Active'
                                                                          ? true
                                                                          : false
                                                                  }
                                                                  hidden
                                                                  onClick={() =>
                                                                      changeExamStatus(
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
                                                          {new Intl.DateTimeFormat(
                                                              'en-GB',
                                                              {
                                                                  month: 'numeric',
                                                                  day: '2-digit',
                                                                  year: 'numeric',
                                                              },
                                                          ).format(
                                                              new Date(
                                                                  item.updated_at,
                                                              ),
                                                          )}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                          <div className="space-x-2">
                                                              <Link
                                                                  to={`exam/editExam/${item.id}`}
                                                                  className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block"
                                                              >
                                                                  Edit
                                                              </Link>
                                                              <button
                                                                  className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block"
                                                                  onClick={() =>
                                                                      deleteExamAdmin(
                                                                          item.id,
                                                                      )
                                                                  }
                                                              >
                                                                  Delete
                                                              </button>
                                                              <Link
                                                                  to={`exam/IndexQuestionExam/${item.id}`}
                                                                  className="py-1 px-2 text-white rounded hover:opacity-80 bg-blue-400 shadow-lg block md:inline-block"
                                                              >
                                                                  <i class="fad fa-arrow-right"></i>
                                                              </Link>
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

export default ExamTable;
