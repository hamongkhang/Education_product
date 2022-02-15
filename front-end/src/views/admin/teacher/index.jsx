import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Preloader from '../../../components/preloader';

toast.configure();

const TeacherTable = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const $token = localStorage.getItem('access_token');
    const [teacher, setTeacher] = useState([]);
    const [teacherSearch, setTeacherSearch] = useState([]);
    const [render, setRender] = useState(false);
    const [classOption, setClassOption] = useState('hidden');
    const [file, setFile] = useState(null);
    const [classOptionFile, setClassOptionFile] = useState('hidden');
    const handleOptionFile = () => {
        classOptionFile === 'hidden'
            ? setClassOptionFile('block')
            : setClassOptionFile('hidden');
    };
    const importFile = (event) => {
        setFile(event.target.files[0]);
    };
    const importUser = (id) => {
        const _formData = new FormData();
        _formData.append('file', file);
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
    const ExportUser = () => {
        setIsLoading(true);
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/teacher/exportTeacherLink`,
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
    const handleOption = () => {
        classOption === 'hidden'
            ? setClassOption('block')
            : setClassOption('hidden');
    };
    const getTeacher = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/teacher/getTeacher`, {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                setTeacher(data.data);
                setIsLoading(false);
            });
    };
    const onDeleteTeacher = (id) => {
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
                deleteTeacher(id);
            }
        });
    };
    const deleteTeacher = (id) => {
        const _formData = new FormData();
        _formData.append('id', id);
        setIsLoading(true);
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/teacher/destroyTeacher/${id}`,
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
    const searchHandle = (e) => {
        let searchString = e.target.value
            .replace(/\s+/g, '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
        if (searchString.length > 0) {
            let responseData = teacher.filter((l) => {
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
            setTeacherSearch(responseData);
        } else {
            setTeacherSearch([]);
        }
    };
    useEffect(() => {
        if ($token) {
            getTeacher();
        }
    }, [render]);
    return (
        <section className="bg-blueGray-50">
            {isLoading && <Preloader />}
            <h6 className="text-gray-700 text-xl font-bold mb-4">
                Thông tin giáo viên
            </h6>
            <div className="w-full">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full max-w-full flex-grow flex-1">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    onChange={(event) => searchHandle(event)}
                                    className="text-13 px-3 py-1 outline-none border border-purple-800 focus:border-purple-900 rounded"
                                />
                            </div>
                            <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                                <button
                                    onClick={handleOption}
                                    className="bg-indigo-500 hover:bg-indigo-700 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                >
                                    <i className="far fa-ellipsis-v"></i>
                                </button>
                                <div
                                    className={`absolute top-full right-0 ${classOption}`}
                                >
                                    <div className="py-2 bg-white shadow-lg text-13">
                                        <Link
                                            className="block w-full py-1 text-left px-2 hover:bg-gray-200"
                                            to={`teacher/add`}
                                        >
                                            Add
                                        </Link>
                                        <button
                                            onClick={handleOptionFile}
                                            className="w-full py-1 text-left px-2 hover:bg-gray-200"
                                        >
                                            Import Excel
                                        </button>
                                        <input
                                            onChange={(event) =>
                                                importFile(event)
                                            }
                                            className={`w-full py-1 text-left px-2 hover:bg-gray-200 ${classOptionFile}`}
                                            type="file"
                                            placeholder="Chọn file"
                                        ></input>
                                        <button
                                            onClick={() => importUser()}
                                            className={`w-full py-1 text-left px-2 hover:bg-gray-200 ${classOptionFile}`}
                                        >
                                            Submit
                                        </button>
                                        <button
                                            onClick={() => ExportUser()}
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
                                        Tên giáo viên
                                    </th>
                                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Chức vụ
                                    </th>
                                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Mô tả
                                    </th>
                                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Số điện thoại
                                    </th>
                                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Facebook
                                    </th>
                                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Hình ảnh
                                    </th>
                                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Youtube
                                    </th>
                                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Skype
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
                                {teacherSearch.length > 0
                                    ? teacherSearch.map((item, index) => {
                                          return (
                                              <tr key={index}>
                                                  <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                      {index + 1}
                                                  </th>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.name}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.position}
                                                  </td>
                                                  <td
                                                      className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 "
                                                      dangerouslySetInnerHTML={{
                                                          __html: item.description,
                                                      }}
                                                  ></td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.phone}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.facebook}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                      <img
                                                          alt=""
                                                          src={`${process.env.REACT_APP_URL_SERVER}/upload/images/teacher/${item.image}`}
                                                          className="w-12 h-16 object-cover"
                                                      />
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.youtube}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.skype}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.updated_at}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                      <div className="space-x-2">
                                                          <Link
                                                              to={`teacher/edit/${item.id}`}
                                                              className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block"
                                                          >
                                                              Edit
                                                          </Link>
                                                          <button
                                                              className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block"
                                                              onClick={() =>
                                                                  onDeleteTeacher(
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
                                    : teacher.map((item, index) => {
                                          return (
                                              <tr key={index}>
                                                  <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                      {index + 1}
                                                  </th>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.name}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.position}
                                                  </td>
                                                  <td
                                                      className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 "
                                                      dangerouslySetInnerHTML={{
                                                          __html: item.description,
                                                      }}
                                                  ></td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.phone}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.facebook}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                      <img
                                                          alt=""
                                                          src={`${process.env.REACT_APP_URL_SERVER}/upload/images/teacher/${item.image}`}
                                                          className="w-12 h-16 object-cover"
                                                      />
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.youtube}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.skype}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.updated_at}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                      <div className="space-x-2">
                                                          <Link
                                                              to={`teacher/edit/${item.id}`}
                                                              className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block"
                                                          >
                                                              Edit
                                                          </Link>
                                                          <button
                                                              className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block"
                                                              onClick={() =>
                                                                  onDeleteTeacher(
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
    );
};

export default TeacherTable;
