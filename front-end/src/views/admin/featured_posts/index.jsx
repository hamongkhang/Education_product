import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
toast.configure();
const PostTable = (props) => {
    const $token=localStorage.getItem('access_token');
    const [post, setPost] = useState([]);
    const [render, setRender] = useState(false);
    const [classOption, setClassOption] = useState("hidden");
    const handleOption = () => {
        classOption === "hidden" ? setClassOption("block") : setClassOption("hidden")
    }
    const getPost=()=>{
        fetch("http://localhost:8000/api/featuredPost/getFeaturedPost", {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            setPost(data.data);
        });
        return () => {
        }
    }
    const changeStatus = (id) =>{
        fetch(`http://localhost:8000/api/featuredPost/blockActiveFeaturedPost/${id}`, {
            method: "POST",
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
    const onDeletePost = (id)=>{
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
                deletePost(id);
            }
          })
    }
    const deletePost = (id) =>{
        const _formData = new FormData();
        _formData.append("id",id)
        fetch("http://localhost:8000/api/featuredPost/destroyFeaturedPost/"+id, {
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
    
    useEffect(() => {
        if($token){
           getPost();
        }
    }, [render])
    return (
        <section className="bg-blueGray-50">
                         <h6 className="text-gray-700 text-xl font-bold mb-4">Thông tin bào viết nổi bật</h6>
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
                            <Link className="block w-full py-1 text-left px-2 hover:bg-gray-200" to={`featured_post/add`} >Add</Link>
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
                        Tên bài viết
                    </th>
                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Tác giả
                    </th>
                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        File
                    </th>
                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Mô tả
                    </th>
                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Hình ảnh
                    </th>
                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Trạng thái
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
                        post.map((item,index)=>{
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
                                    {item.file}
                                </td>
                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 " dangerouslySetInnerHTML={{ __html:item.description}}>
                                </td>
                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <img alt="" src={`http://localhost:8000/upload/images/featured_post/${item.image}`} className="w-12 h-16 object-cover" />
                                </td>
                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <label htmlFor={`toggle${item.id}`} className="toggle-label">
                                                <input type="checkbox" name="" id={`toggle${item.id}`} 
                                                    defaultChecked = {item.status === 'Active'?true:false}
                                                    hidden onClick={()=>changeStatus(item.id)}
                                                    />
                                                <div className="toggle-btn">
                                                    <div className="spinner"></div>
                                                </div>
                                            </label>
                                        </td>
                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                    {item.updated_at}
                                </td>
                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <div className="space-x-2">
                                        <Link to={`featured_post/edit/${item.id}`} className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block">Edit</Link> 
                                        <button className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block" onClick={()=>onDeletePost(item.id)}>Delete</button>
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

export default PostTable