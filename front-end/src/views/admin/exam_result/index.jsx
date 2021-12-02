import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Preloader from '../../../components/preloader';

toast.configure();

const ExamResultTable = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const $token = localStorage.getItem('access_token');
    const [examCategoryAdmin, setExamCategoryAdmin] = useState([]);
    const [examResult, setExamResult] = useState([]);
    const [render, setRender] = useState(false);
    const [reRender, setReRender] = useState(false);
    const [classOptionCategory, setClassOptionCategory] = useState('hidden');
    const [searchData, setSearchData] = useState([]);

    const handleOptionCategory = () => {
        classOptionCategory === 'hidden'
            ? setClassOptionCategory('block')
            : setClassOptionCategory('hidden');
    };
    const getExamResult = () => {
        setIsLoading(true);
        fetch('http://localhost:8000/api/exam/getResult', {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                setExamResult(data.data);
                setSearchData(data.data);
                setIsLoading(false);
            });
    };
    const getExamAdmin = () => {
        setIsLoading(true);
        fetch('http://localhost:8000/api/exam/getExamAdmin', {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                setExamCategoryAdmin(data.data[1]);
                setIsLoading(false);
            });
    };
    const onChangeHandle = (event) => {
        let _name = event.target.name;
        let _type = event.target.type;
        let _value = event.target.value;
        if (_value === '0') {
            setExamResult(searchData);
        } else {
            var arrayTest = [];
            for (var i = 0; i < searchData.length; i++) {
                if (Number(searchData[i].exam_id) === Number(_value)) {
                    arrayTest.push(searchData[i]);
                }
            }
            setExamResult(arrayTest);
        }
    };
    const Sort = (event) => {
        let _value = event.target.value;
        if (_value === 'asc') {
            let exam = examResult;
            for (var i = 0; i < exam.length - 1; i++) {
                for (var j = i + 1; j < exam.length; j++) {
                    if (exam[i].scores >= exam[j].scores) {
                        var tam = exam[j];
                        exam[j] = exam[i];
                        exam[i] = tam;
                    }
                }
            }
            setExamResult(exam);
            setReRender(!reRender);
        } else {
            let exam = examResult;
            for (var i = 0; i < exam.length - 1; i++) {
                for (var j = i + 1; j < exam.length; j++) {
                    if (exam[i].scores <= exam[j].scores) {
                        var tam = exam[j];
                        exam[j] = exam[i];
                        exam[i] = tam;
                    }
                }
            }
            setExamResult(exam);
            setReRender(!reRender);
        }
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
                fetch('http://localhost:8000/api/exam/deleteResult', {
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
    useEffect(() => {
        if ($token) {
            getExamResult();
            getExamAdmin();
        }
    }, [render]);
    useEffect(() => {}, [reRender]);
    return (
        <>
            {isLoading && <Preloader />}
            <section className="bg-blueGray-50">
                <h6 className="text-gray-700 text-xl font-bold mb-4">
                    Kết quả kiểm tra
                </h6>
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                    <select
                                        onChange={(event) =>
                                            onChangeHandle(event)
                                        }
                                        name="searchDocument"
                                        id="type"
                                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    >
                                        <option value="0">Xem tất cả</option>
                                        {examCategoryAdmin.map((items) => {
                                            return (
                                                <option value={items.id}>
                                                    {items.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <select
                                        onChange={(event) => Sort(event)}
                                        name="searchDocument"
                                        id="type"
                                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    >
                                        <option value="asc">Asc</option>
                                        <option value="desc">Desc</option>
                                    </select>
                                </div>
                                <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                                    <button
                                        onClick={handleOptionCategory}
                                        className="bg-indigo-500 hover:bg-indigo-700 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        <i className="far fa-ellipsis-v"></i>
                                    </button>
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
                                            Tên học sinh
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Điểm số
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Đáp án đã chọn
                                        </th>
                                        <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Những câu hỏi sai
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
                                    {examResult.length > 0
                                        ? examResult.map((item, index) => {
                                              return (
                                                  <tr key={index}>
                                                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                          {index + 1}
                                                      </th>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.name}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.scores}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.answer}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.answer_false}
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
                                          })
                                        : examResult.map((item, index) => {
                                              return (
                                                  <tr key={index}>
                                                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                          {index + 1}
                                                      </th>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.name}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.scores}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.answer}
                                                      </td>
                                                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                          {item.answer_false}
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

export default ExamResultTable;
