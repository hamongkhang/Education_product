import React, { useState,useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouteMatch } from 'react-router';
import Swal from 'sweetalert2'

toast.configure();

const IndexQuestionExam = () => {
    const match = useRouteMatch();
    const [examQuestionEdit, setExamQuestionEdit] = useState({});
    const [number, setNumber] = useState({});
    const [questionEdit, setQuestionEdit] = useState([]);
    const [answerEdit, setAnswerEdit] = useState([]);
    const [correctEdit, setCorrectEdit] = useState([]);
    const [examCategoryQuestionEdit, setExamCategoryQuestionEdit] = useState([]);
    const $token=localStorage.getItem('access_token');
    const [render, setRender] = useState(false);
    const [classOption, setClassOption] = useState("hidden");
    const [classOptionInput, setClassOptionInput] = useState("hidden");
    const handleOption = () => {
        classOption === "hidden" ? setClassOption("block") : setClassOption("hidden")
    }
    const handleOptionInput = () => {
        classOptionInput === "hidden" ? setClassOptionInput("block") : setClassOptionInput("hidden")
    }
    const onChangeSubmit = (event) => {
        let _name = event.target.name;
        let _type = event.target.type;
        let _value = event.target.value;
        if(event.target.value>0){
            setNumber({...number,[_name]:_value});
        }else{
            toast.error('Số phải lớn hơn 0', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    const getExamQuestionCategoryAdminEdit = () =>{
        fetch("http://localhost:8000/api/exam/getExamAdmin", {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            setExamCategoryQuestionEdit(data.data[0]);
        });
    }
    const getQuestionAnswerAdmin=(id)=>{
        const _formData = new FormData();
        _formData.append("id",match.params.id)
        fetch("http://localhost:8000/api/exam/getQuestionAnswer/", {
            body: _formData,
            method: "POST",
            headers: {"Authorization": `Bearer `+$token},
          })
        .then(response => response.json())
        .then(data =>  {
          setQuestionEdit(data.data[0]);
          setAnswerEdit(data.data[1]);
          setCorrectEdit(data.data[2]);
      });
        return () => {
    }
    }
    const getOneExamEdit = () =>{
        const _formData = new FormData();
        _formData.append("id",match.params.id)
        fetch("http://localhost:8000/api/exam/getOneExamQuestionEdit", {
            method: "POST",
            body:_formData,
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            if(data.error){
                toast.error('Không load được dữ liệu', {
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
                setExamQuestionEdit(data.data);
            }
            
        });
    }
    const deleteQuestionAnswer = (e,id) =>{
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
                    fetch("http://localhost:8000/api/exam/deleteQuestionAnswer", {
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
           getOneExamEdit();
           getExamQuestionCategoryAdminEdit();
           getQuestionAnswerAdmin();
        }
    }, [render])
    return (
        <>
        <section className="bg-blueGray-50">
             <h6 className="text-gray-700 text-xl font-bold mb-4">Thông tin chi tiết bài kiểm tra</h6>
                <div className="w-full">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse ">
                        <thead>
                            <tr>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Tên bài kiểm tra
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                               Loại bài kiểm tra
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Gía bài kiểm tra (đ)
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Ảnh
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                File
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Số lượng câu hỏi
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Thời gian làm bài (phút)
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Trạng thái
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Cập nhật gần đây
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                                    <tr>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {examQuestionEdit.name}
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {
                                                examCategoryQuestionEdit.map((bt,i)=>{
                                                    if(examQuestionEdit.category_id == bt.id){
                                                        return bt.name
                                                    }
                                                })
                                           }
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {String(examQuestionEdit.price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <img alt="" src={`http://localhost:8000/upload/images/exam/${examQuestionEdit.image}`} className="w-12 h-16 object-cover" />
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {examQuestionEdit.file_question}
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {examQuestionEdit.number_question}
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {examQuestionEdit.time}
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <label htmlFor={`toggle${examQuestionEdit.id+"exam"}`} className="toggle-label">
                                            <input type="checkbox" name="status" id={`toggle`} 
                                        checked = {examQuestionEdit.status === 'Active'?true:false}
                                        hidden />
                                                <div className="toggle-btn">
                                                    <div className="spinner"></div>
                                                </div>
                                            </label>
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {examQuestionEdit.updated_at}
                                        </td>
                                    </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </section>
            <section className="bg-blueGray-50">
             <h6 className="text-gray-700 text-xl font-bold mb-4">Thông tin câu hỏi và đáp án</h6>
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
                                    <button className="block w-full py-1 text-left px-2 hover:bg-gray-200" onClick={handleOptionInput} >Add New</button>
                                    <input name="num" onChange={(event)=>onChangeSubmit(event)} type="number" className={`border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${classOptionInput}`}></input>
                                    <Link className={`block w-full py-1 text-left px-2 hover:bg-gray-200  ${classOptionInput}`} to={`/admin/exam/${match.params.id}/addQuestionAnswer/${number.num}`} >Submit</Link>
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
                                Câu hỏi
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                               Hình ảnh (Nếu có)
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                               Đáp án lựa chọn
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Đáp án chính xác
                            </th>
                            <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Hành động
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                        {questionEdit.map((items,index)=>{
                        return(
                                    <tr>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {index+1}
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 " dangerouslySetInnerHTML={{ __html:items.question}}>
                                        </td>
                                        {(items.image!=="Block")&&(items.image)?
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <img alt="" src={`http://localhost:8000/upload/images/exam/${items.image}`} className="w-12 h-16 object-cover" />
                                    </td>
                                    :
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                        Block
                                    </td>
                                        }
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                        {answerEdit.map((item) => {
                                             if(item.id_question===items.id){
                                                return (
                                                    <div className="flex-answer"><b>{item.type_answer+" : "}</b><p dangerouslySetInnerHTML={{ __html:item.answer}} ></p></div>
                                        );}})}
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                        {correctEdit.map((item) => {
                                             if(item.question_id===items.id){
                                                return (
                                                    <div><p><b>{item.answer}</b> </p> </div>
                                        );}})}
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <div className="space-x-2">
                                                <Link to={`/admin/exam/${match.params.id}/editQuestion/${items.id}`} className="py-1 px-2 text-white rounded hover:opacity-80 bg-green-400 shadow-lg block md:inline-block">Edit</Link>
                                                <button onClick={(event)=>deleteQuestionAnswer(event,items.id)} className="py-1 px-2 text-white rounded hover:opacity-80 bg-red-500 shadow-lg block md:inline-block">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                        )})}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default IndexQuestionExam