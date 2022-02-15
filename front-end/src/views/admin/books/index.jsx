import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Preloader from '../../../components/preloader';

toast.configure();

const BooksTable = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const $token = localStorage.getItem('access_token');
    const [booktypes, setBookTypes] = useState([]);
    const [booktypesSearch, setBookTypesSearch] = useState([]);
    const [books, setBooks] = useState([]);
    const [booksSearch, setBooksSearch] = useState([]);
    const [filter, setFilter] = useState(false);
    const [render, setRender] = useState(false);
    const [classOption1, setClassOption1] = useState('hidden');
    const [classOption2, setClassOption2] = useState('hidden');
    const history = useHistory();
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
        setIsLoading(true);
        const _formData = new FormData();
        _formData.append('file', filefile);
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
            `${process.env.REACT_APP_URL_SERVER}/api/book/exportBookTypeLink`,
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
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/book/exportBookLink`, {
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
    const handleOption = (type) => {
        if (type == 1) {
            classOption1 === 'hidden'
                ? setClassOption1('block')
                : setClassOption1('hidden');
        } else {
            classOption2 === 'hidden'
                ? setClassOption2('block')
                : setClassOption2('hidden');
        }
    };
    const getBookTypes = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/getBookTypes`, {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.url) {
                    let url = data.url;
                    history.push(url);
                }
                if (data.book_types) {
                    setBookTypes(data.book_types);
                }
                setIsLoading(false);
            });
    };
    const getBooks = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/getBooks`, {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                setBooks(data.books);
                setIsLoading(false);
            });
        return () => {};
    };
    const deleteBook = (id) => {
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
                fetch(`${process.env.REACT_APP_URL_SERVER}/api/deleteBook`, {
                    method: 'POST',
                    body: _formData,
                    headers: { Authorization: `Bearer ` + $token },
                })
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
    const deleteBookType = (id) => {
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
                setIsLoading(true);
                const _formData = new FormData();
                _formData.append('id', id);
                fetch(
                    `${process.env.REACT_APP_URL_SERVER}/api/deleteBookType`,
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
    const changeStatus = (id) => {
        const _formData = new FormData();
        setIsLoading(true);
        _formData.append('id', id);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/changeBookStatus`, {
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
            if (type == 'searchBookType') {
                let responseData = booktypes.filter((l) => {
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
                setBookTypesSearch(responseData);
            } else {
                let responseData = books.filter((l) => {
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
                setBooksSearch(responseData);
                setFilter(false);
            }
        } else {
            if (type == 'searchBookType') {
                setBookTypesSearch([]);
            } else {
                setBooksSearch([]);
            }
        }
    };
    const onChangeView = (e) => {
        if (Number(e.target.value)) {
            let id_type = e.target.value;
            let book = books.filter((item) => item.type == id_type);
            setBooksSearch(book);
            setFilter(true);
        } else {
            setBooksSearch([]);
            setFilter(false);
        }
    };
    useEffect(() => {
        if ($token) {
            getBookTypes();
            getBooks();
        }
    }, [render]);
    return (
        <>
            {isLoading && <Preloader />}
            <section className="bg-blueGray-50">
                <h6 className="text-gray-700 text-xl font-bold mb-4">
                    Loại sách
                </h6>
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                    <input
                                        type="text"
                                        name="searchBookType"
                                        onChange={(event) =>
                                            searchHandle(event)
                                        }
                                        placeholder="Tìm kiếm..."
                                        className="text-13 px-3 py-1 outline-none border border-purple-800 focus:border-purple-900 rounded"
                                    />
                                </div>

                                <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                                    <button
                                        onClick={() => handleOption(1)}
                                        className="bg-indigo-500 hover:bg-indigo-700 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        <i className="far fa-ellipsis-v"></i>
                                    </button>
                                    <div
                                        className={`absolute top-full right-0 z-20 ${classOption1}`}
                                    >
                                        <div className="py-2 bg-white shadow-lg text-13">
                                            <Link
                                                className="block w-full py-1 text-left px-2 hover:bg-gray-200"
                                                to={`booktypes/add`}
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
                            className="block w-full overflow-x-auto custom-scroll-2  overflow-y-scroll"
                            style={{ maxHeight: `calc(100vh - 234px)` }}
                        >
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            ID
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Tên sách
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Cập nhật gần đây
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Hành động
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="custom-scroll-1 overflow-x-auto">
                                    {booktypesSearch.length > 0
                                        ? booktypesSearch.map((item, index) => {
                                              return (
                                                  <tr key={index}>
                                                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                          {index + 1}
                                                      </th>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.name}
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
                                                                  to={`booktypes/edit/${item.id}`}
                                                                  className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block"
                                                              >
                                                                  Edit
                                                              </Link>
                                                              <button
                                                                  className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block"
                                                                  onClick={() =>
                                                                      deleteBookType(
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
                                          })
                                        : booktypes.map((item, index) => {
                                              return (
                                                  <tr key={index}>
                                                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                          {index + 1}
                                                      </th>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.name}
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
                                                                  to={`booktypes/edit/${item.id}`}
                                                                  className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block"
                                                              >
                                                                  Edit
                                                              </Link>
                                                              <button
                                                                  className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block"
                                                                  onClick={() =>
                                                                      deleteBookType(
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
            <section className="bg-blueGray-50 pb-3">
                <h6 className="text-gray-700 text-xl font-bold mb-4">Sách</h6>
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm..."
                                        name="searchBook"
                                        onChange={(event) =>
                                            searchHandle(event)
                                        }
                                        className="text-13 px-3 py-1 outline-none border border-purple-800 focus:border-purple-900 rounded"
                                    />
                                </div>
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                    <div className="block uppercase text-gray-600 text-xs font-bold mb-2 inline mr-2">
                                        Loại
                                    </div>
                                    <select
                                        name="type"
                                        id="type"
                                        className="text-13 px-3 py-1 outline-none border border-purple-800 focus:border-purple-900 rounded"
                                        onChange={(event) =>
                                            onChangeView(event)
                                        }
                                    >
                                        <option value={null}>Xem tất cả</option>
                                        {booktypes.map((item, index) => (
                                            <option key={index} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                                    <button
                                        onClick={() => handleOption(2)}
                                        className="bg-indigo-500 hover:bg-indigo-700 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        <i className="far fa-ellipsis-v"></i>
                                    </button>
                                    <div
                                        className={`absolute top-full right-0 z-20 ${classOption2}`}
                                    >
                                        <div className="py-2 bg-white shadow-lg text-13">
                                            <Link
                                                className="block w-full py-1 text-left px-2 hover:bg-gray-200"
                                                to={`books/add`}
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
                            className="block w-full overflow-x-auto custom-scroll-2  overflow-y-scroll"
                            style={{ maxHeight: `calc(100vh - 234px)` }}
                        >
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            ID
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Tên sách
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Tác giả
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Giá gốc (₫)
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Giá khuyến mãi (₫)
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Giảm giá (%)
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Hình ảnh
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Thể loại
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Cập nhật gần đây
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Trạng thái
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Hành động
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {booksSearch.length > 0 || filter
                                        ? booksSearch.map((item, index) => {
                                              return (
                                                  <tr key={index}>
                                                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                          {index + 1}
                                                      </th>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.name}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.author}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {String(
                                                              item.Initial_price,
                                                          ).replace(
                                                              /\B(?=(\d{3})+(?!\d))/g,
                                                              ',',
                                                          )}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {String(
                                                              item.promotion_price,
                                                          ).replace(
                                                              /\B(?=(\d{3})+(?!\d))/g,
                                                              ',',
                                                          )}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.promotion}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                          <img
                                                              alt=""
                                                              src={`${process.env.REACT_APP_URL_SERVER}/upload/images/book/${item.image}`}
                                                              className="w-12 h-16 object-cover"
                                                          />
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {booktypes.map(
                                                              (bt, i) => {
                                                                  if (
                                                                      item.type ==
                                                                      bt.id
                                                                  ) {
                                                                      return bt.name;
                                                                  }
                                                              },
                                                          )}
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
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                          <div className="space-x-2">
                                                              <Link
                                                                  to={`books/edit/${item.id}`}
                                                                  className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block"
                                                              >
                                                                  Edit
                                                              </Link>
                                                              <button
                                                                  className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block"
                                                                  onClick={() =>
                                                                      deleteBook(
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
                                          })
                                        : books.map((item, index) => {
                                              return (
                                                  <tr key={index}>
                                                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                          {index + 1}
                                                      </th>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.name}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.author}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {String(
                                                              item.Initial_price,
                                                          ).replace(
                                                              /\B(?=(\d{3})+(?!\d))/g,
                                                              ',',
                                                          )}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {String(
                                                              item.promotion_price,
                                                          ).replace(
                                                              /\B(?=(\d{3})+(?!\d))/g,
                                                              ',',
                                                          )}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.promotion}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                          <img
                                                              alt=""
                                                              src={`${process.env.REACT_APP_URL_SERVER}/upload/images/book/${item.image}`}
                                                              className="w-12 h-16 object-cover"
                                                          />
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {booktypes.map(
                                                              (bt, i) => {
                                                                  if (
                                                                      item.type ==
                                                                      bt.id
                                                                  ) {
                                                                      return bt.name;
                                                                  }
                                                              },
                                                          )}
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
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                          <div className="space-x-2">
                                                              <Link
                                                                  to={`books/edit/${item.id}`}
                                                                  className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block"
                                                              >
                                                                  Edit
                                                              </Link>
                                                              <button
                                                                  className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block"
                                                                  onClick={() =>
                                                                      deleteBook(
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

export default BooksTable;
