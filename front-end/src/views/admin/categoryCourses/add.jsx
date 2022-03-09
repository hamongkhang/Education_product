import React, {useState, useEffect} from "react"
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { DraftjsWidget } from "../../../components/DraftjsWidget";
toast.configure();

const AddCategoryCourse = () => {
    const match = useRouteMatch();
    const [category, setCategory] = useState({});
    const history = useHistory();
    const $token=localStorage.getItem('access_token');
    const config = {
		readonly: false
	}
    const [error, setError] = useState({
        id:null,
        name:null,
        description:null,
        status:null,
    });
    const addCategory = () => {
        const _formData = new FormData();
        _formData.append("id",category.id)
        _formData.append("name",category.name)
        _formData.append("status",category.status)
        _formData.append("description",category.description)
        fetch("http://localhost:8000/api/addCategoryCourse", {
            method: "POST",
            body:_formData,
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            if(data.error){
                toast.error('Thêm bị lỗi', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setError(data.error);
            }
            else{
                toast.success('Thêm thành công', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                history.push("/admin/category_courses")
            }
        });
    }
    const onChangeHandle = (event) => {
        let _name = event.target.name;
        let _type = event.target.type;
        let _value = event.target.value;
        if(_type === "checkbox"){
            if(event.target.checked){
                setCategory({...category,["status"]:"Active"})
                toast.success('Trạng thái mở ', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            }
            else{
                setCategory({...category,["status"]:"Block"})
                toast.error('Trạng thái khóa', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
        else{
            setCategory({...category,[_name]:_value});
        }
    };
    const onChangeEditor = (value) =>{
        if(category.description != value){
            setCategory({...category,["description"]:value})
        }
    }
    useEffect(() => {}, [])
    return (
        <section className=" py-1">
        <div className="w-full">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                <h6 className="text-gray-700 text-xl font-bold">
                    Chỉnh sửa Danh mục khóa học
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
                            <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                Tên danh mục
                            </label>
                            <input type="text" name="name" required className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                            value={category.name?category.name:""}
                            onChange={(event) => onChangeHandle(event)}
                            />
                            <span className="text-red-500 text-sm">{error.name?error.name[0]:""}</span>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                    Trạng thái
                                </label>
                                <label htmlFor={`toggle`} className="toggle-label">
                                    <input type="checkbox" name="status" id={`toggle`} 
                                        onChange={(event) => onChangeHandle(event)}
                                        hidden />
                                    <div className="toggle-btn">
                                        <div className="spinner"></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="w-full lg:w-12/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                                    Mô tả
                                </label>
                                <DraftjsWidget value="" onChange={(editorState)=>onChangeEditor(editorState)}/>
                                <span className="text-red-500 text-sm">{error.description?error.description[0]:""}</span>
                            </div>
                        </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">&nbsp;</label>
                        <button type="button" onClick={()=>addCategory()} className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 hover:shadow-xl font-semibold duration-300">Thêm</button>
                    </div>
                </div>
                </form>
            </div>
            </div>
        </div>
    </section>
    )
}

export default AddCategoryCourse