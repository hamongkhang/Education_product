import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
toast.configure();

const BooksTable = (props) => {
    const $token=localStorage.getItem('access_token');
    const [booktypes, setBookTypes] = useState([]);
    const [books, setBooks] = useState([]);
    const [render, setRender] = useState(false);
    const [classOption1, setClassOption1] = useState("hidden");
    const [classOption2, setClassOption2] = useState("hidden");
    const history = useHistory();
    const handleOption = (type) => {
        if(type == 1){
            classOption1 === "hidden" ? setClassOption1("block") : setClassOption1("hidden")
        }
        else{
            classOption2 === "hidden" ? setClassOption2("block") : setClassOption2("hidden")
        }
    }
    const getBookTypes = () =>{
        fetch("http://localhost:8000/api/getBookTypes", {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            if(data.url){
                let url = data.url;
                history.push(url);
            }
            if(data.book_types){
                setBookTypes(data.book_types)
            }
        });
    }
    const getBooks=()=>{
        fetch("http://localhost:8000/api/getBooks", {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            setBooks(data.books);
        });
        return () => {
        }
    }
    const deleteBook = (id) =>{
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
                fetch("http://localhost:8000/api/deleteBook", {
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
    const deleteBookType = (id) =>{
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
                    fetch("http://localhost:8000/api/deleteBookType", {
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
    const changeStatus = (id) =>{
        const _formData = new FormData();
        _formData.append("id",id)
        fetch("http://localhost:8000/api/changeBookStatus", {
            method: "POST",
            body:_formData,
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
                toast.success('Thay đổi trạng thái thành công', {
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
            getBookTypes();
            getBooks();
        }
    }, [render])
    return (
        <>
         <section className="bg-blueGray-50">
             <h6 className="text-gray-700 text-xl font-bold mb-4">Loại sách</h6>
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <input type="text" placeholder="Tìm kiếm..." className="text-13 px-3 py-1 outline-none border border-purple-800 focus:border-purple-900 rounded"/>
                        </div>
                        <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                            <button onClick={()=>handleOption(1)} className="bg-indigo-500 hover:bg-indigo-700 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                <i className="far fa-ellipsis-v"></i>
                            </button>
                            <div className={`absolute top-full right-0 ${classOption1}`}>
                                <div className="py-2 bg-white shadow-lg text-13">
                                    <Link className="block w-full py-1 text-left px-2 hover:bg-gray-200" to={`booktypes/add`} >Add</Link>
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
                                Tên sách
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
                                booktypes.map((item,index)=>{
                                    return(
                                    <tr key={index}>
                                        <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            {index+1}
                                        </th>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {item.name}
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
                                                <Link to={`booktypes/edit/${item.id}`} className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block">Edit</Link>
                                                <button className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block" onClick={()=>deleteBookType(item.id)}>Delete</button>
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
            <section className="bg-blueGray-50">
             <h6 className="text-gray-700 text-xl font-bold mb-4">Sách</h6>
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <input type="text" placeholder="Tìm kiếm..." className="text-13 px-3 py-1 outline-none border border-purple-800 focus:border-purple-900 rounded"/>
                        </div>
                        <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                            <button onClick={()=>handleOption(2)} className="bg-indigo-500 hover:bg-indigo-700 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                <i className="far fa-ellipsis-v"></i>
                            </button>
                            <div className={`absolute top-full right-0 ${classOption2}`}>
                                <div className="py-2 bg-white shadow-lg text-13">
                                    <Link className="block w-full py-1 text-left px-2 hover:bg-gray-200" to={`books/add`} >Add</Link>
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
                                Tên sách
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Tác giả
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Giá gốc (₫)
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Giá khuyến mãi (₫)
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Giảm giá (%)
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Hình ảnh
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Thể loại
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Cập nhật gần đây
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

                            {
                                books.map((item,index)=>{
                                    return(
                                    <tr key={index}>
                                        <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            {index+1}
                                        </th>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {item.name}
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {item.author}
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {item.Initial_price}
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {item.promotion_price}
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {item.promotion}
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <img alt="" src={`http://localhost:8000/upload/images/book/${item.image}`} className="w-12 h-16 object-cover" />
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {
                                                booktypes.map((bt,i)=>{
                                                    if(item.type == bt.id){
                                                        return bt.name
                                                    }
                                                })
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
                                            <label htmlFor={`toggle${item.id}`} className="toggle-label">
                                                <input type="checkbox" name="" id={`toggle${item.id}`} 
                                                    defaultChecked = {item.status === 'Active'?true:false}
                                                    hidden onClick={()=>changeStatus(item.id)}/>
                                                <div className="toggle-btn">
                                                    <div className="spinner"></div>
                                                </div>
                                            </label>
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <div className="space-x-2">
                                                <Link to={`books/edit/${item.id}`} className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block">Edit</Link>
                                                <button className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block" onClick={()=>deleteBook(item.id)}>Delete</button>
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

export default BooksTable