import React, {useState} from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHistory} from 'react-router-dom'
toast.configure();
const AddBookType = () => {
    const [type, setType] = useState({
        name:"",
    });
    const [error, setError] = useState({
        id:null,
        name:null,
        Initial_price:null,
        promotion:null,
        promotion_price:null,
        type:null,
        description:null,
        quantity:null,
        page_number:null,
        image:null,
        author:null,
        status:null,
    });
    const $token=localStorage.getItem('access_token');
    const history = useHistory();
    const addBookType = () => {
        const _formData = new FormData();
        _formData.append("name",type.name)
        fetch("http://localhost:8000/api/addBookType", {
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
                history.push('/admin/books')
                toast.success('Thêm thành công', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        });
    }
    const onChangeHandle = (event) => {
        let _name = event.target.name;
        let _type = event.target.type;
        let _value = event.target.value;
        setType({...type,[_name]:_value});
    };
    return (
        <section className=" py-1">
            <div className="w-full">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                    <h6 className="text-gray-700 text-xl font-bold">
                        Thêm loại sách
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
                                <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                    Tên loại sách
                                </label>
                                <input type="text" name="name" required className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                                onChange={(event) => onChangeHandle(event)}
                                // value={type.name}
                                />
                                <span className="text-red-500 text-sm">{error.name?error.name[0]:""}</span>
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlfor="grid-password">&nbsp;</label>
                            <button type="button" onClick={()=>addBookType()} className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 hover:shadow-xl font-semibold duration-300">Thêm</button>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </section>
    )
}

export default AddBookType