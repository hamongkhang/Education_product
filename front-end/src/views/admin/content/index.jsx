import React, { useState,useEffect } from 'react'
import { useParams} from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
toast.configure();

const Content = (props) => {
    const $token=localStorage.getItem('access_token');
    const [render1, setRender1] = useState(false);
    const [render, setRender] = useState(false);
    const [tables, setTables] = useState([]);
    const [contents, setContents] = useState([]);
    const [contentsFilter, setContentsFilter] = useState([]);
    const [classOption, setClassOption] = useState("hidden");
    const history = useHistory();
    const param = useParams();
    const handleOption = () => {
        classOption === "hidden" ? setClassOption("block") : setClassOption("hidden")        
    }
    const getContents = () =>{
        fetch("http://localhost:8000/api/getContents", {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            if(data.url){
                let url = data.url;
                history.push(url);
            }
            if(data.contents){
                if(param.id_table){
                    let table = data.contents.filter(item => item.table_of_content_id == param.id_table)
                    setContentsFilter(table)
                }
                setContents(data.contents)
            }
        });
    }
    const getTableOfContents = () =>{
        fetch("http://localhost:8000/api/getTableOfContents", {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            if(data.url){
                let url = data.url;
                history.push(url);
            }
            if(data.table_of_contents){
                setTables(data.table_of_contents)
            }
        });
    }
    const onChangeView = (e) =>{
        if(Number(e.target.value)){
            param.id_table = e.target.value;
            let contents1 = contents.filter(item => item.table_of_content_id == param.id_table)
            setContentsFilter(contents1);
        }
        else{
            param.id_table = null;
        }
        setRender1(!render1)
    }
    const viewAll = () =>{
        param.id_table = null;
        handleOption()
        setRender1(!render1)
    }
    const changeStatus = (id) =>{
        const _formData = new FormData();
        _formData.append("id",id)
        fetch("http://localhost:8000/api/changeContentStatus", {
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
    const deleteContent = (id) =>{
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
                fetch("http://localhost:8000/api/deleteContent", {
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
            getContents();
            getTableOfContents();
        }
    }, [render]);
    useEffect(() => {}, [render1]);
    return (
        <>
        <section className="bg-blueGray-50">
            <h6 className="text-gray-700 text-xl font-bold mb-4">Danh sách chương</h6>
               <div className="w-full">
                   <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                   <div className="rounded-t mb-0 px-4 py-3 border-0">
                       <div className="flex flex-wrap items-center">
                       <div className="relative w-full max-w-full flex-grow flex-1">
                           <input type="text" placeholder="Tìm kiếm..." className="text-13 px-3 py-1 outline-none border border-purple-800 focus:border-purple-900 rounded"/>
                       </div>
                       {/* <div className="w-full lg:w-6/12 px-4"> */}
                           <div className="relative w-full max-w-full flex-grow flex-1">
                               <div className="block uppercase text-gray-600 text-xs font-bold mb-2 inline mr-2">
                                  Mục lục
                               </div>
                               <select name="type" id="type" className="text-13 px-3 py-1 outline-none border border-purple-800 focus:border-purple-900 rounded" 
                                onChange={(event) => onChangeView(event)}>
                                    <option value={null}>Xem tất cả</option>
                                    {tables.map((item,index)=> <option key={index} value={item.id}>{item.name}</option>)}
                                </select>
                           </div>
                       {/* </div> */}
                       <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                           <button onClick={()=>handleOption()} className="bg-indigo-500 hover:bg-indigo-700 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                               <i className="far fa-ellipsis-v"></i>
                           </button>
                           <div className={`absolute top-full right-0 ${classOption}`}>
                               <div className="py-2 bg-white shadow-lg text-13">
                                   <Link className="block w-full py-1 text-left px-2 hover:bg-gray-200" to={`/admin/content_add`} >Add</Link>
                                   <button className="w-full py-1 text-left px-2 hover:bg-gray-200" onClick={()=>viewAll()}>View All</button>
                                   <button className="w-full py-1 text-left px-2 hover:bg-gray-200">Import Excel</button>
                                   <button className="w-full py-1 text-left px-2 hover:bg-gray-200">Export Excel</button>
                                   <button className="w-full py-1 text-left px-2 hover:bg-gray-200" onClick={()=>history.goBack()}>Back</button>
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
                               Tên khóa học
                           </th>
                           <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                               Mục lục
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
                               param.id_table?
                               contentsFilter.map((item,index)=>{
                                   return(
                                   <tr key={index}>
                                       <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                           {index+1}
                                       </th>
                                       <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                           <Link to={`/admin/lessons/${item.id}`}>{item.name}</Link>
                                       </td>
                                       <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs p-4 text-left text-blueGray-700 ">
                                            {
                                            tables.map((table)=>{
                                                if(table.id == item.table_of_content_id){
                                                    return(table.name)
                                                }
                                            })}
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
                                       <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                           {new Intl.DateTimeFormat('en-GB', {
                                                    timeZone: 'Africa/Abidjan',
                                                    dateStyle: 'short',
                                                    timeStyle: 'medium'
                                                }).format(new Date(item.updated_at))}
                                       </td>
                                       <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                           <div className="space-x-2">
                                               <Link to={`/admin/content/${item.id}/edit`} className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block">Edit</Link>
                                               <button className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block" onClick={()=>deleteContent(item.id)}>Delete</button>
                                               <Link to={`/admin/lessons/${item.id}`} className="py-1 px-2 text-white rounded hover:opacity-80 bg-blue-400 shadow-lg block md:inline-block"><i className="fas fa-arrow-right"></i></Link>
                                           </div>
                                       </td>
                                   </tr>
                                   )
                               }):
                               contents.map((item,index)=>{
                                   return(
                                   <tr key={index}>
                                       <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                           {index+1}
                                       </th>
                                       <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                           <Link to={`/admin/lessons/${item.id}`}>{item.name}</Link>
                                       </td>
                                       <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs p-4 text-left text-blueGray-700 ">
                                            {
                                            tables.map((table)=>{
                                                if(table.id == item.table_of_content_id){
                                                    return(table.name)
                                                }
                                            })}
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
                                       <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                           {new Intl.DateTimeFormat('en-GB', {
                                                    timeZone: 'Africa/Abidjan',
                                                    dateStyle: 'short',
                                                    timeStyle: 'medium'
                                                }).format(new Date(item.updated_at))}
                                       </td>
                                       <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                           <div className="space-x-2">
                                               <Link to={`/admin/content/${item.id}/edit`} className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block">Edit</Link>
                                               <button className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block" onClick={()=>deleteContent(item.id)}>Delete</button>
                                               <Link to={`/admin/lessons/${item.id}`} className="py-1 px-2 text-white rounded hover:opacity-80 bg-blue-400 shadow-lg block md:inline-block"><i className="fas fa-arrow-right"></i></Link>
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

export default Content