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
    const [orderSearch, setOrderSearch] = useState([]);
    const [render, setRender] = useState(false);
    const [classOption, setClassOption] = useState("hidden");
    const [dateFilter, setDateFilter] = useState({
        from:"",
        end:"",
        status: false
    });
    const history = useHistory();
    const [file,setFile] = useState(null);
    const [classOptionFile, setClassOptionFile] = useState("hidden");
    const handleOptionFile = () => {
        classOptionFile === "hidden" ? setClassOptionFile("block") : setClassOptionFile("hidden")
    }
    const importFile=(event)=>{
        setFile(event.target.files[0]);
    }
    const importUser = (id) =>{
        const _formData = new FormData();
        _formData.append("file",file)
        fetch("http://localhost:8000/api/users/importUser", {
            method: "POST",
            body:_formData,
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            if(data.error){
                toast.error('Import File không thành công', {
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
                toast.success('Import File thành công', {
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
    const   ExportUser = () =>{
        fetch("http://localhost:8000/api/order/exportOrderLink", {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            if(data.error){
                toast.error('Thay đổi trạng thái lỗi', {
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
                toast.success('Xuất file pdf thành công!', {
                 position: "bottom-right",
                 autoClose: 3000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 theme: "colored"
             });
             window.location.href = data.url;            }
        });
    }
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
    const searchHandle = (e) => {
        let searchString = e.target.value.replace(/\s+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
        if(searchString.length > 0){
            
                let responseData = order.filter(l => {
                    let name = l.partnerCode.replace(/\s+/g, '')
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
                    let check = name.toLowerCase().indexOf(searchString.toLowerCase());
                    if(check>-1){
                        return l
                    }
                })
                setOrderSearch(responseData)
        }
        else{
            setOrderSearch([])
        }
    }
    const searchByDate=(e)=>{
        let v = e.target.value;
        let n = e.target.name;
        let from = "", end = "";
        if( n == "from"){
            setDateFilter({...dateFilter,from:v})
            from = v
            end = dateFilter.end
            console.log(from);
        }
        else{
            setDateFilter({...dateFilter,end:v})
            end = v
            from = dateFilter.from
            console.log(end);
        }
        if(dateFilter.from != "" && dateFilter.end != ""){
            let orderFilter = order.filter(item=>{
                if(from <= item.updated_at && end >= item.updated_at)
                {
                    return item
                }
            })
            if(orderFilter.length==0)
            {
                setDateFilter({...dateFilter,status:true})
            }
            setOrderSearch(orderFilter)
        }
       
    }
    const viewAll = () =>{
        setOrderSearch([]);
        setDateFilter({
            from:"",
            end:"",
            status: false
        })
        handleOption()
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
                            <input type="text" placeholder="Tìm kiếm..." onChange={(event) => searchHandle(event)} className="text-13 px-3 py-1 outline-none border border-purple-800 focus:border-purple-900 rounded"/>
                        </div>
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <div className="block uppercase text-gray-600 text-xs font-bold mb-2 inline mr-2">
                                Từ 
                            </div>
                            <input type="date" name="from" onChange={(event) => searchByDate(event)} className="text-13 px-3 py-1 outline-none border border-purple-800 focus:border-purple-900 rounded"/>
                            <div className="block uppercase text-gray-600 text-xs font-bold mb-2 inline ml-2 mr-2">
                                Đến 
                            </div>
                            <input type="date" name="end" onChange={(event) => searchByDate(event)} className="text-13 px-3 py-1 outline-none border border-purple-800 focus:border-purple-900 rounded"/>
                            
                        </div>
                        <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                            <button onClick={handleOption} className="bg-indigo-500 hover:bg-indigo-700 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                <i className="far fa-ellipsis-v"></i>
                            </button>
                            <div className={`absolute top-full right-0 ${classOption}`}>
                                <div className="py-2 bg-white shadow-lg text-13">

                            <button className="w-full py-1 text-left px-2 hover:bg-gray-200" onClick={()=>viewAll()}>View All</button>
                                <button onClick={handleOptionFile}  className="w-full py-1 text-left px-2 hover:bg-gray-200">Import Excel</button>
                            <input onChange={(event)=>importFile(event)}  className={`w-full py-1 text-left px-2 hover:bg-gray-200 ${classOptionFile}`} type="file" placeholder="Chọn file" ></input>
                            <button onClick={()=>importUser()} className={`w-full py-1 text-left px-2 hover:bg-gray-200 ${classOptionFile}`} >Submit</button>
                            <button onClick={()=>ExportUser()} className="w-full py-1 text-left px-2 hover:bg-gray-200">Export Excel</button>
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
                                orderSearch.length>0 || dateFilter.status?
                                orderSearch.map((item,index)=>{
                                    return(
                                    <tr key={index}>
                                        <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            {index+1}
                                        </th>
                                        {user.map((items,index)=>{
                                            if(items.id==item.userId){
                                            return(
                                                <td key={index} className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
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
                                :
                                order.map((item,index)=>{
                                    return(
                                    <tr key={index}>
                                        <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            {index+1}
                                        </th>
                                        {user.map((items,index)=>{
                                            if(items.id==item.userId){
                                            return(
                                                <td key={index} className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
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