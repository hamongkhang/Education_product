import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const AdminTable = (props) => {
    const $token=localStorage.getItem('access_token');
    const [admins,setAdmins ] = useState([]);
    const [render, setRender] = useState(false);
    const [classOption, setClassOption] = useState("hidden");
    const handleOption = () => {
        classOption === "hidden" ? setClassOption("block") : setClassOption("hidden")
    }
    const getAdmins=()=>{
        fetch("http://localhost:8000/api/admins/getAllAdmin", {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            setAdmins(data.data);
        });
        return () => {
        }
    }
    const onCentralise = (id) =>{
        const _formData = new FormData();
        _formData.append("id",id)
        fetch("http://localhost:8000/api/admins/changeCentralise", {
            method: "POST",
            body:_formData,
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            if(data.error){
                toast.error('Hủy bỏ tài khoản quản trị viên không thành công', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
            }
            else{
                setRender(!render)
                toast.success('Hủy bỏ tài khoản quản trị viên thành công', {
                 position: "bottom-right",
                 autoClose: 3000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 theme: "colored"
             });
            }
        });
    }
    
    useEffect(() => {
        if($token){
           getAdmins();
        }
    }, [render])
    return (
        <section className="bg-blueGray-50">
        <div className="w-full">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full flex-grow flex-1">
                    <input type="text" placeholder="Tìm kiếm..." className="text-13 px-3 py-1 outline-none border border-purple-800 focus:border-purple-900 rounded"/>
                </div>
                <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                    <button onClick={handleOption} className="bg-indigo-500 hover:bg-indigo-700 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                        <i className="far fa-ellipsis-v"></i>
                    </button>
                    <div className={`absolute top-full right-0 ${classOption}`}>
                        <div className="py-2 bg-white shadow-lg text-13">
                            <button className="w-full py-1 text-left px-2 hover:bg-gray-200">Import Excel</button>
                            <button className="w-full py-1 text-left px-2 hover:bg-gray-200">Export Excel</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="block w-full overflow-x-auto">
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
                        Ngày tạo
                    </th>
                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Hành động
                    </th>
                    </tr>
                </thead>
                <tbody>

                    {
                        admins.map((item,index)=>{
                            return(
                            <tr key={index}>
                                 <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                    {item.id}
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
                                    <img alt="" src={`http://localhost:8000/upload/images/avatar/${item.avatar}`} className="w-12 h-16 object-cover" />
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
                                    {item.updated_at}
                                </td>
                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <div className="space-x-2">
                                        <button className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block" onClick={()=>onCentralise(item.id)}>Centralise</button>
                                    </div>
                                </td>
                            </tr>
                            )
                        })
                    }
                </tbody>
                </table>
            </div>
            </div>
        </div>
    </section>
    )
}

export default AdminTable