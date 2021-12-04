import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Preloader from '../../../components/preloader';

toast.configure();

const CategoryCourse = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const $token = localStorage.getItem('access_token');
    const [categoryCourses, setCategoryCourses] = useState([]);
    const [categoryCoursesSearch, setCategoryCoursesSearch] = useState([]);
    const [classOption, setClassOption] = useState('hidden');
    const [render, setRender] = useState(false);
    const history = useHistory();
    const handleOption = () => {
        classOption === 'hidden'
            ? setClassOption('block')
            : setClassOption('hidden');
    };
    const getCategoryCourses = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/getCategoryCourses`, {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.url) {
                    let url = data.url;
                    history.push(url);
                }
                if (data.data) {
                    setCategoryCourses(data.data);
                }
                setIsLoading(false);
            });
    };
    const changeStatus = (cate_id) => {
        setIsLoading(true);
        const _formData = new FormData();
        _formData.append('id', cate_id);
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/changeCategoryCourseStatus`,
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
    const deleteCategoryCourse = (id) => {
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
                    `${process.env.REACT_APP_URL_SERVER}/api/deleteCategoryCourse`,
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
    const [filefile, setFilefile] = useState(null);
    const [classOptionFile1, setClassOptionFile1] = useState('hidden');
    const [classOptionFile2, setClassOptionFile2] = useState('hidden');
    const searchHandle = (e) => {
        let searchString = e.target.value
            .replace(/\s+/g, '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
        if (searchString.length > 0) {
            let responseData = categoryCourses.filter((l) => {
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
            setCategoryCoursesSearch(responseData);
        } else {
            setCategoryCoursesSearch([]);
        }
    };
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
            `${process.env.REACT_APP_URL_SERVER}/api/course/exportCourseCategoryLink`,
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
                    setIsLoading(false);
                    window.location.href = data.url;
                }
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
                    setIsLoading(false);
                    window.location.href = data.url;
                }
            });
    };
    useEffect(() => {
        if ($token) {
            getCategoryCourses();
        }
    }, [render]);
    return (
        <>
            {isLoading && <Preloader />}
            <section className="bg-blueGray-50">
                <h6 className="text-gray-700 text-xl font-bold mb-4">
                    Danh sách Loại khóa học
                </h6>
                <div className="w-full relative">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm..."
                                        onChange={(event) =>
                                            searchHandle(event)
                                        }
                                        className="text-13 px-3 py-1 outline-none border border-purple-800 focus:border-purple-900 rounded"
                                    />
                                </div>
                                <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                                    <button
                                        onClick={() => handleOption()}
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
                                                to={`/admin/category_courses/add`}
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
                                            ID
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Tên danh mục
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
                                    {categoryCoursesSearch.length > 0
                                        ? categoryCoursesSearch.map(
                                              (item, index) => {
                                                  return (
                                                      <tr key={index}>
                                                          <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                              {index + 1}
                                                          </th>
                                                          <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                              <Link
                                                                  to={`courses/${item.id}`}
                                                              >
                                                                  {item.name}
                                                              </Link>
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
                                                              {new Intl.DateTimeFormat(
                                                                  'en-GB',
                                                                  {
                                                                      timeZone:
                                                                          'Africa/Abidjan',
                                                                      dateStyle:
                                                                          'short',
                                                                      timeStyle:
                                                                          'medium',
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
                                                                      to={`/admin/category_courses/${item.id}/edit`}
                                                                      className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block"
                                                                  >
                                                                      Edit
                                                                  </Link>
                                                                  <button
                                                                      className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block"
                                                                      onClick={() =>
                                                                          deleteCategoryCourse(
                                                                              item.id,
                                                                          )
                                                                      }
                                                                  >
                                                                      Delete
                                                                  </button>
                                                                  <Link
                                                                      to={`courses/${item.id}`}
                                                                      className="py-1 px-2 text-white rounded hover:opacity-80 bg-blue-400 shadow-lg block md:inline-block"
                                                                  >
                                                                      <i className="fas fa-arrow-right"></i>
                                                                  </Link>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                  );
                                              },
                                          )
                                        : categoryCourses.map((item, index) => {
                                              return (
                                                  <tr key={index}>
                                                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                          {index + 1}
                                                      </th>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          <Link
                                                              to={`courses/${item.id}`}
                                                          >
                                                              {item.name}
                                                          </Link>
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
                                                          {new Intl.DateTimeFormat(
                                                              'en-GB',
                                                              {
                                                                  timeZone:
                                                                      'Africa/Abidjan',
                                                                  dateStyle:
                                                                      'short',
                                                                  timeStyle:
                                                                      'medium',
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
                                                                  to={`/admin/category_courses/${item.id}/edit`}
                                                                  className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block"
                                                              >
                                                                  Edit
                                                              </Link>
                                                              <button
                                                                  className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block"
                                                                  onClick={() =>
                                                                      deleteCategoryCourse(
                                                                          item.id,
                                                                      )
                                                                  }
                                                              >
                                                                  Delete
                                                              </button>
                                                              <Link
                                                                  to={`courses/${item.id}`}
                                                                  className="py-1 px-2 text-white rounded hover:opacity-80 bg-blue-400 shadow-lg block md:inline-block"
                                                              >
                                                                  <i className="fas fa-arrow-right"></i>
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

export default CategoryCourse;
