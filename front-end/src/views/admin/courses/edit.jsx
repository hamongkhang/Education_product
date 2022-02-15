import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { DraftjsWidget } from '../../../components/DraftjsWidget';
import Preloader from '../../../components/preloader';

toast.configure();

const EditCourse = () => {
    const [isLoading, setIsLoading] = useState(false);
    const $link = `${process.env.REACT_APP_URL_SERVER}/upload/images/course/`;
    const match = useRouteMatch();
    const [course, setCourse] = useState({});
    const [file, setFile] = useState(null);
    const [categoryCourses, setCategoryCourses] = useState([]);
    const [render, setRender] = useState(false);
    const history = useHistory();
    const $token = localStorage.getItem('access_token');
    const config = {
        readonly: false,
    };
    const [error, setError] = useState({
        id: null,
        name: null,
        Initial_price: null,
        promotion: null,
        promotion_price: null,
        category_course: null,
        description: null,
        target: null,
        benefit: null,
        image: null,
        status: null,
    });
    const updateCourse = () => {
        const _formData = new FormData();
        _formData.append('id', course.id);
        _formData.append('name', course.name);
        _formData.append('Initial_price', course.Initial_price);
        _formData.append('promotion', course.promotion);
        _formData.append('category_course', course.category_course);
        _formData.append('status', course.status);
        _formData.append('target', course.target);
        _formData.append('benefit', course.benefit);
        if (file != null) {
            _formData.append('image', file);
        }
        _formData.append('description', course.description);
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/updateCourse`, {
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
                    history.push('/admin/courses');
                }
                setIsLoading(false);
            });
    };
    const getOneCourse = () => {
        const _formData = new FormData();
        _formData.append('id', match.params.id);
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/getOneCourse`, {
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
                    setCourse(data.course);
                }
                setIsLoading(false);
            });
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
    const checkInput = (_name, _type, _value) => {
        if (_type == 'number') {
            if (_name == 'page_number' || _name == 'quantity') {
                if (_value == '') {
                    _value = 1;
                } else {
                    _value = parseInt(_value);
                }
            }
            if (_name == 'promotion') {
                if (_value == '') {
                    _value = 0;
                } else {
                    if (_value > 100) {
                        _value = 100;
                        caculatePromotion(course.Initial_price, _value);
                    } else {
                        _value = parseInt(_value);
                        caculatePromotion(course.Initial_price, _value);
                    }
                }
            }
            if (_name == 'Initial_price') {
                if (_value == '') {
                    _value = 0;
                    caculatePromotion(_value, course.promotion);
                } else {
                    _value = parseInt(_value);
                    caculatePromotion(_value, course.promotion);
                }
            }
            if (_value < 0 || _value == '') {
                return (_value = 0);
            } else {
                return _value;
            }
        } else {
            return _value;
        }
    };
    const onChangeHandle = (event) => {
        let _name = event.target.name;
        let _type = event.target.type;
        let _value = event.target.value;
        if (_type === 'checkbox') {
            if (event.target.checked) {
                setCourse({ ...course, ['status']: 'Active' });
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
                setCourse({ ...course, ['status']: 'Block' });
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
            setCourse({ ...course, [_name]: checkInput(_name, _type, _value) });
        }
    };
    const onBlurHandle = (event) => {
        let _type = event.target.type;
        let _name = event.target.name;
        let _value = event.target.value;
        document.getElementsByName(_name)[0].value = checkInput(
            _name,
            _type,
            _value,
        );
    };
    const caculatePromotion = (price, promotion) => {
        let promotion_price = price - (promotion / 100) * price;
        setCourse({ ...course, ['promotion_price']: promotion_price });
        document.getElementsByName('promotion_price')[0].value =
            promotion_price;
    };
    const onChangeEditor = (value, type) => {
        if (type == 'target' && course.target != value) {
            setCourse({ ...course, ['target']: value });
        } else if (type == 'benefit' && course.benefit != value) {
            setCourse({ ...course, ['benefit']: value });
        } else if (type == 'description' && course.description != value) {
            setCourse({ ...course, ['description']: value });
        }
    };
    useEffect(() => {
        if ($token) {
            getOneCourse();
            getCategoryCourses();
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
                                Chỉnh sửa thông tin khóa học
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
                                            Tên khóa học
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                            value={course.name}
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.name ? error.name[0] : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3"></div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Giá gốc
                                        </label>
                                        <input
                                            type="number"
                                            name="Initial_price"
                                            min="0"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                            value={course.Initial_price}
                                            onBlur={(event) =>
                                                onBlurHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.Initial_price
                                                ? error.Initial_price[0]
                                                : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full lg:w-3/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Giảm giá (%)
                                        </label>
                                        <input
                                            type="number"
                                            name="promotion"
                                            min="0"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                            value={course.promotion}
                                            onBlur={(event) =>
                                                onBlurHandle(event)
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.promotion
                                                ? error.promotion[0]
                                                : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full lg:w-3/12 px-4">
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
                                                checked={
                                                    course.status === 'Active'
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
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Giá sau khi giảm
                                        </label>
                                        <input
                                            type="number"
                                            disabled
                                            name="promotion_price"
                                            min="0"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={course.promotion_price}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Loại khóa học
                                        </label>
                                        <select
                                            name="category_course"
                                            id="type"
                                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            onChange={(event) =>
                                                onChangeHandle(event)
                                            }
                                        >
                                            {categoryCourses.map(
                                                (item, index) => (
                                                    <option
                                                        key={index}
                                                        value={item.id}
                                                        selected={
                                                            item.id ===
                                                            course.category_course
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        {item.name}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full px-4">
                                    <div className="relative w-full mb-3 group h-96">
                                        <label
                                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Hình ảnh
                                        </label>
                                        <img
                                            src={
                                                file
                                                    ? URL.createObjectURL(file)
                                                    : $link + course.image
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
                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                                            Mục tiêu
                                        </label>
                                        <DraftjsWidget
                                            value={course.target}
                                            onChange={(editorState) =>
                                                onChangeEditor(
                                                    editorState,
                                                    'target',
                                                )
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.target
                                                ? error.target[0]
                                                : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                                            Lợi ích
                                        </label>
                                        <DraftjsWidget
                                            value={course.benefit}
                                            onChange={(editorState) =>
                                                onChangeEditor(
                                                    editorState,
                                                    'benefit',
                                                )
                                            }
                                        />
                                        <span className="text-red-500 text-sm">
                                            {error.benefit
                                                ? error.benefit[0]
                                                : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                                            Mô tả
                                        </label>
                                        <DraftjsWidget
                                            value={course.description}
                                            onChange={(editorState) =>
                                                onChangeEditor(
                                                    editorState,
                                                    'description',
                                                )
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
                                onClick={() => updateCourse()}
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

export default EditCourse;
