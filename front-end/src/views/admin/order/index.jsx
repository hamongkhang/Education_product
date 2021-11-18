import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
toast.configure();

const OrderTable = (props) => {
    const $token=localStorage.getItem('access_token');
    const [user, setUser] = useState([]);
    const [order, setOrder] = useState([]);
    const [render, setRender] = useState(false);
    const [classOption, setClassOption] = useState("hidden");
    const history = useHistory();
    const handleOption = (type) => {
            classOption === "hidden" ? setClassOption("block") : setClassOption("hidden")
    }
    const getOrder=()=>{
        fetch("http://localhost:8000/api/order/getOrder", {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            setOrder(data.data);
        });
        return () => {
        }
    }
    const getUsers=()=>{
        fetch("http://localhost:8000/api/users/getAllUser", {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            setUser(data.data);
        });
        return () => {
        }
    }
    const deleteOrder = (id) =>{
        Swal.fire({
            title: 'Cảnh báo',
            text: "Bạn có chắc chắn muốn xóa?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Xóa'
          }).then((result) => {
            if (result.isConfirmed) {
                const _formData = new FormData();
                _formData.append("id",id)
                fetch("http://localhost:8000/api/order/destroyOrder", {
                    method: "POST",
                    body:_formData,
                    headers: {"Authorization": `Bearer `+$token}
                  })
                .then(response => response.json())
                .then(data =>  {
                   if(data.error){
                        toast.error('Xóa bị lỗi', {
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
                        toast.success('Xóa thành công', {
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
          })
    }
    useEffect(() => {
        if($token){
           getUsers();
           getOrder();
        }
    }, [render])
    return (
        <>
            <section className="bg-blueGray-50">
             <h6 className="text-gray-700 text-xl font-bold mb-4">Thông tin đơn hàng</h6>
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
                                STT
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Tên người dùng
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Mã Khách hàng
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                               Tên khách hàng
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Mã đơn hàng
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Thành tiền ( đ )
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                               Thông tin thanh toán
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

                            {
                                order.map((item,index)=>{
                                    return(
                                    <tr key={index}>
                                        <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            {index+1}
                                        </th>
                                        {user.map((items,index)=>{
                                            if(items.id==item.userId){
                                            return(
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {items.fullName}
                                        </td>
                                          );} })}
                                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {item.partnerCode}
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {item.partnerName}
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {item.orderId}
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {item.amount}
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {item.payType == 'qr'?'QR':'ATM'}
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                        {
                                           (item.status==="unsuccessful")?                                           
                                            "Thanh toán không thành công":"Thanh toán thành công"
                                        }
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {new Intl.DateTimeFormat('en-GB', { 
                                                        month: 'numeric', 
                                                        day: '2-digit',
                                                        year: 'numeric', 
                                                    }).format(new Date(item.updated_at))}
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <div className="space-x-2">
                                                <button className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block" onClick={()=>deleteOrder(item.id)}>Delete</button>
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
        </>
       
    )
}

export default OrderTable