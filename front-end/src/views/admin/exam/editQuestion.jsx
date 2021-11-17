import React, {useState, useEffect} from "react"
import { useRouteMatch } from 'react-router';
import JoditEditor from "jodit-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const EditQuestion = () => {
    const $link="http://localhost:8000/upload/images/exam/";
    const match = useRouteMatch();
    const [questionEdit2, setQuestionEdit2] = useState({});
    const [correctEdit2, setCorrectEdit2] = useState({});
    const [answerEdit2, setAnswerEdit2] = useState({});
    const [examEdit, setExamEdit] = useState({});
    const [dataEdit, setDataEdit] = useState({
        question:"",
        type_answer:"",
        answer:"",
        correct_answer:"",
    });
    const [file, setFile] = useState(null);
    const $token=localStorage.getItem('access_token');
    const config = {
		readonly: false
	}
    const onUpdateQuestionExamAdmin = () => {
        const _formData = new FormData();
        _formData.append("id",match.params.id)
        _formData.append("question",dataEdit.question)
        _formData.append("answer0",dataEdit.answer0)
        _formData.append("correct_answer",dataEdit.correct_answer)
        _formData.append("type_answer0",dataEdit.type_answer0)
        _formData.append("type_answer1",dataEdit.type_answer1)
        _formData.append("type_answer2",dataEdit.type_answer2)
        _formData.append("type_answer3",dataEdit.type_answer3)
        _formData.append("answer1",dataEdit.answer1)
        _formData.append("answer2",dataEdit.answer2)
        _formData.append("answer3",dataEdit.answer3)
        if(file!=null){
            _formData.append("image",file)
        }
        fetch("http://localhost:8000/api/exam/updateQuestionAdmin", {
            method: "POST",
            body:_formData,
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            if(data.error){
                toast.error('Cập nhật bị lỗi', {
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
                toast.success('Cập nhật thành công', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
               window.history.back();
            }
        });
    }
    const onChangeHandle = (event) => {
        let _name = event.target.name;
        let _type = event.target.type;
        let _value = event.target.value;
        if(_type === "checkbox"){
            if(event.target.checked){
                setDataEdit({...dataEdit,["status"]:"Active"})
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
                setDataEdit({...dataEdit,["status"]:"Block"})
                toast.success('Trạng thái khóa', {
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
        else if(_type === "file"){
                setFile(event.target.files[0])
        }
        else{
            setDataEdit({...dataEdit,[_name]:_value});
        }
    };
    const getOneQuestionAnswerAdmin2=(id)=>{
        const _formData = new FormData();
        _formData.append("id",match.params.id)
        fetch("http://localhost:8000/api/exam/getOneQuestionAnswer/", {
            body: _formData,
            method: "POST",
            headers: {"Authorization": `Bearer `+$token},
          })
        .then(response => response.json())
        .then(data =>  {
          setQuestionEdit2(data.data[0]);
          setAnswerEdit2(data.data[1]);
          setCorrectEdit2(data.data[2]);
      });
        return () => {
    }
    }
    const getOneExamEdit = () =>{
        const _formData = new FormData();
        _formData.append("id",match.params.idExam)
        fetch("http://localhost:8000/api/exam/getOneExamEdit", {
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
                setExamEdit(data.data);
            }
            
        });
    }
    useEffect(() => {
        if($token){
            getOneQuestionAnswerAdmin2();
            getOneExamEdit();
        }
    }, [])
    if((!examEdit.file_question)||(examEdit.file_question==="Block")){
    return (
        <section className=" py-1">
            <div className="w-full">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">   
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                    <h6 className="text-gray-700 text-xl font-bold">
                        Chỉnh sửa thông tin bài kiểm tra
                    </h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                    <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                        Thông tin chi tiết
                    </h6>
                    <div className="flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                                   Câu hỏi
                                </label>
                                {questionEdit2.length>0?
                                <JoditEditor
                                    value={questionEdit2[0].question}
                                    config={config}
                                    tabIndex={1}
                                    onBlur={newContent => setDataEdit({...dataEdit,["question"]:newContent})} 
                                />:""}
                            </div>
                        </div>{
                         answerEdit2.length>0?
                         answerEdit2.map((items,index)=>{
                             return(
                             <>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                    Kiểu đáp án
                                </label>
                                <select name={"type_answer"+index} id="type" className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={(event) => onChangeHandle(event)}>
                                 <option value="A" selected = {items.type_answer === "A"?true:false} >A</option>
                                 <option value="B" selected = {items.type_answer === "B"?true:false} >B</option>
                                 <option value="C" selected = {items.type_answer === "C"?true:false} >C</option>
                                 <option value="D" selected = {items.type_answer === "D"?true:false} >D</option>
                     </select></div>
                            </div>
                        <div className="w-full lg:w-6/12 px-4">
                        <JoditEditor
                                    value={items.answer}
                                    config={config}
                                    tabIndex={1}
                                    onBlur={newContent => setDataEdit({...dataEdit,["answer"+index]:newContent})} 
                                />
                        </div>
                        </>
                        )}):""}
                        <div className="w-full px-4">
                            <div className="relative w-full mb-3 group h-96">
                                <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                    Hình ảnh
                                </label>{
                                    questionEdit2.length>0?
                                <img src={file ? URL.createObjectURL(file):$link+questionEdit2[0].image}  className="w-full min-h-96 h-full mb-30 md:mb-1 object-scale-down rounded-lg" alt=""/>
                                :""
                            }
                                <label htmlFor="avt" className="w-3/5 text-center opacity-0 group-hover:opacity-100 block py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-15 font-semibold absolute bottom-5 transform left-1/2 -translate-x-1/2 duration-300 text-white">
                                    <i className="fad fa-camera mr-2"></i>
                                    <span> Đổi ảnh</span>
                                </label>
                                <input type="file" id='avt' name="image" hidden required onChange={(event) => onChangeHandle(event)}/>
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                   Đáp án chính xác
                                </label>
                                {correctEdit2.length>0?
                                 <select name="correct_answer" id="type" className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={(event) => onChangeHandle(event)}>
                                 <option value="A" selected = {correctEdit2[0].answer === "A"?true:false} >A</option>
                                 <option value="B" selected = {correctEdit2[0].answer === "B"?true:false} >B</option>
                                 <option value="C" selected = {correctEdit2[0].answer === "C"?true:false} >C</option>
                                 <option value="D" selected = {correctEdit2[0].answer === "D"?true:false} >D</option>
                     </select>
                               :""}
                                </div>
                            </div>
                    </div>
                         <button type="button" onClick={()=>onUpdateQuestionExamAdmin()} className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 hover:shadow-xl font-semibold duration-300">Cập nhật</button>
                   </form> 
                </div>
                </div>
            </div>
        </section>
    );}
    else{
        return(
            <section className=" py-1">
            <div className="w-full">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">   
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                    <h6 className="text-gray-700 text-xl font-bold">
                        Chỉnh sửa thông tin bài kiểm tra
                    </h6>
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
                                   Đáp án chính xác
                                </label>
                                {correctEdit2.length>0?
                                 <select name="correct_answer" id="type" className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={(event) => onChangeHandle(event)}>
                                 <option value="A" selected = {correctEdit2[0].answer === "A"?true:false} >A</option>
                                 <option value="B" selected = {correctEdit2[0].answer === "B"?true:false} >B</option>
                                 <option value="C" selected = {correctEdit2[0].answer === "C"?true:false} >C</option>
                                 <option value="D" selected = {correctEdit2[0].answer === "D"?true:false} >D</option>
                     </select>
                               :""}
                                </div>
                            </div>
                    </div>
                         <button type="button" onClick={()=>onUpdateQuestionExamAdmin()} className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 hover:shadow-xl font-semibold duration-300">Cập nhật</button>
                   </form> 
                </div>
                </div>
            </div>
        </section>
        );
    }
}

export default EditQuestion