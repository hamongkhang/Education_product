import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Preloader from '../../../components/preloader';

toast.configure();

const UserTable = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const $token = localStorage.getItem('access_token');
    const [users, setUsers] = useState([]);
    const [usersSearch, setUsersSearch] = useState([]);
    const [file, setFile] = useState(null);
    const [render, setRender] = useState(false);
    const [classOption, setClassOption] = useState('hidden');
    const [classOptionFile, setClassOptionFile] = useState('hidden');
    const handleOption = () => {
        classOption === 'hidden'
            ? setClassOption('block')
            : setClassOption('hidden');
    };
    const handleOptionFile = () => {
        classOptionFile === 'hidden'
            ? setClassOptionFile('block')
            : setClassOptionFile('hidden');
    };
    const getUsers = () => {
        setIsLoading(true);
        fetch('http://localhost:8000/api/users/getAllUser', {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.data);
                setIsLoading(false);
            });
        return () => {};
    };
    const importFile = (event) => {
        setFile(event.target.files[0]);
    };
    const importUser = (id) => {
        const _formData = new FormData();
        _formData.append('file', file);
        setIsLoading(true);
        fetch('http://localhost:8000/api/users/importUser', {
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
    const onDecentralise = (id) => {
        const _formData = new FormData();
        _formData.append('id', id);
        setIsLoading(true);
        fetch('http://localhost:8000/api/users/changeDecentralise', {
            method: 'POST',
            body: _formData,
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    toast.error(
                        'Thêm tài khoản quản trị viên không thành công',
                        {
                            position: 'bottom-right',
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'colored',
                        },
                    );
                } else {
                    setRender(!render);
                    toast.success('Thêm tài khoản quản trị viên thành công', {
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
    const changeStatus = (id) => {
        const _formData = new FormData();
        _formData.append('id', id);
        setIsLoading(true);
        fetch('http://localhost:8000/api/users/blockActiveUser', {
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
        if (searchString.length > 0) {
            let responseData = users.filter((l) => {
                let name = l.fullName
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
            setUsersSearch(responseData);
        } else {
            setUsersSearch([]);
        }
    };
    const ExportUser = () => {
        setIsLoading(true);
        fetch('http://localhost:8000/api/users/exportUserLink', {
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
    useEffect(() => {
        if ($token) {
            getUsers();
        }
    }, [render]);
    return (
        <section className="bg-blueGray-50">
            {isLoading && <Preloader />}
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
                                        Họ và tên
                                    </th>
                                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Sinh nhật
                                    </th>
                                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Giới tính
                                    </th>
                                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Email
                                    </th>
                                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Ảnh đại diện
                                    </th>
                                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Tên tài khoản
                                    </th>
                                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Link Facebook
                                    </th>
                                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Số điện thoại
                                    </th>
                                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Địa chỉ
                                    </th>
                                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Provider
                                    </th>
                                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Provider ID
                                    </th>
                                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Ngày tạo
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
                                {usersSearch.length > 0
                                    ? usersSearch.map((item, index) => {
                                          return (
                                              <tr key={index}>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {index + 1}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.fullName}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.birthday}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.sex}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.email}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                      <img
                                                          alt=""
                                                          src={`http://localhost:8000/upload/images/avatar/${item.avatar}`}
                                                          className="w-12 h-16 object-cover"
                                                      />
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.nameAccount}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.linkFB}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.phone}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.address}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.provider}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.provider_id}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.updated_at}
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
                                                          <button
                                                              className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block"
                                                              onClick={() =>
                                                                  onDecentralise(
                                                                      item.id,
                                                                  )
                                                              }
                                                          >
                                                              decentralise
                                                          </button>
                                                      </div>
                                                  </td>
                                              </tr>
                                          );
                                      })
                                    : users.map((item, index) => {
                                          return (
                                              <tr key={index}>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {index + 1}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.fullName}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.birthday}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.sex}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.email}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                      <img
                                                          alt=""
                                                          src={`http://localhost:8000/upload/images/avatar/${item.avatar}`}
                                                          className="w-12 h-16 object-cover"
                                                      />
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.nameAccount}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.linkFB}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.phone}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.address}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.provider}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.provider_id}
                                                  </td>
                                                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                      {item.updated_at}
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
                                                          <button
                                                              className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block"
                                                              onClick={() =>
                                                                  onDecentralise(
                                                                      item.id,
                                                                  )
                                                              }
                                                          >
                                                              decentralise
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

export default UserTable;
