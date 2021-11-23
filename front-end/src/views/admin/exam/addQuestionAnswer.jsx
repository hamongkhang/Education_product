import React, {useState, useEffect} from "react"
import JoditEditor from "jodit-react";
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'
import { useRouteMatch } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const AddQuestionAnswer = () => {
    const [dataAdd, setDataAdd] = useState({});
    const [respon,setRespon]=useState([]);
    const [responFile,setResponFile]=useState([]);
    const [responFile2,setResponFile2]=useState([]);
    const [examEdit, setExamEdit] = useState({});
    const [correctAnswerArray, setCorrectAnswerArray] = useState([]);
    const [error, setError] = useState({
        id:null,
        question:null,
        answer1:null,
        answer2:null,
        answer3:null,
        answer4:null,
    });
    const match = useRouteMatch();
    const [file, setFile] = useState(null);
    const $token=localStorage.getItem('access_token');
    const [tong, setTong] = useState(0);
    const config = {
		readonly: false
	}
    const onAddQuestionAnswer = () => {
        if(tong==respon.length){
        const _formData = new FormData();
        _formData.append('id', match.params.idExam);
        for (var i = 0; i < respon.length; i++) {
            _formData.append('correct_answer[]', respon[i].correct_answer);
            _formData.append('question[]', respon[i].question);
            _formData.append('type_answer1[]', respon[i].type_answer1);
            _formData.append('type_answer2[]', respon[i].type_answer2);
            _formData.append('type_answer3[]', respon[i].type_answer3);
            _formData.append('type_answer4[]', respon[i].type_answer4);
            _formData.append('answer1[]', respon[i].answer1);
            _formData.append('answer2[]', respon[i].answer2);
            _formData.append('answer3[]', respon[i].answer3);
            _formData.append('answer4[]', respon[i].answer4);
        }  
        for (var j = 0; j < responFile.length; j++) {
            _formData.append('image[]', responFile[j]);
        }
        for (var k = 0; k < responFile.length; k++) {
            _formData.append('fileImage'+k, responFile2[k]);
        }
        fetch("http://localhost:8000/api/exam/addQuestionAnswer", {
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
                window.history.back();
            }
        });
    }else{
        toast.error('Bạn chưa thêm câu hỏi', {
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
    const onAddQuestionAnswerFile = () => {
        const _formData = new FormData();
        _formData.append('id', match.params.idExam);
        for(var i=0;i<correctAnswerArray.length;i++){
            _formData.append('correctAnswerArray'+i, correctAnswerArray[i]);
        }
        _formData.append('count', correctAnswerArray.length);
        fetch("http://localhost:8000/api/exam/addQuestionAnswerFileQuestion", {
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
                window.history.back();
            }
        });
    }
    const onAddQuestion = (index) => {
        var kt=true;
        var errors={
            id:null,
            question:null,
            answer1:null,
            answer2:null,
            answer3:null,
            answer4:null,
        };
        errors.id=index;
        if(dataAdd.question){
        }else{
            errors.question="Phần câu hỏi không được bỏ trống !";
            kt=false;
        }
        if(dataAdd.answer1){
        }else{
            errors.answer1="Phần câu hỏi không được bỏ trống !";
            kt=false;
        }
        if(dataAdd.answer2){
        }else{
            errors.answer2="Phần câu hỏi không được bỏ trống !";
            kt=false;
        }
        if(dataAdd.answer3){
        }else{
            errors.answer3="Phần câu hỏi không được bỏ trống !";
            kt=false;
        }
        if(dataAdd.answer4){
        }else{
            errors.answer4="Phần câu hỏi không được bỏ trống !";
            kt=false;
        }
        setError(errors);
        if(kt){
        respon[index]=dataAdd;
        setTong(tong+1);
        setDataAdd({});
        if(file!==null){
            responFile2[index]=file;
            responFile[index]=file.name;
            setFile(null);
            }else{
                responFile[index]="Block";
                responFile2[index]="Block";
                setFile(null);
            }
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
    else{
        toast.error('Bạn chưa nhập đầy đủ thông tin', {
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
    const onChangeHandle = (event) => {
        let _name = event.target.name;
        let _type = event.target.type;
        let _value = event.target.value;
        if(_type === "file"){
                setFile(event.target.files[0]);
        }
        else{
            setDataAdd({...dataAdd,[_name]:_value});
        }
    };
    if(respon.length<match.params.num){
        for(var i=0;i<match.params.num;i++){
                        respon.push(dataAdd);
                    }
    }
    const onChangeHandleFile = (event,index) => {
        let _name = event.target.name;
        let _value = event.target.value;
        correctAnswerArray[index]=_value;
    };

    if(respon.length<match.params.num){
        for(var i=0;i<match.params.num;i++){
                        respon.push(dataAdd);
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
           getOneExamEdit();
           for(var i=0;i<respon.length;i++){
            correctAnswerArray[i]="A";
              }
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
                    Thêm câu hỏi và đáp án
                </h6>
                </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {respon.length>0?
                    respon.map((items,index)=>{
                        return(
            <form>
                <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Câu {index+1}
                </h6>
                <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                               Câu hỏi
                            </label>
                            <JoditEditor
                                config={config}
                                tabIndex={1}
                                onBlur={newContent => setDataAdd({...dataAdd,["question"]:newContent})} 
                            />{
                                error.id===index?
                            <span className="text-red-500 text-sm">{error.question?error.question:""}</span>:""
                    }
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                Kiểu đáp án
                            </label>
                            <select name={"type_answer1"} id="type" className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={(event) => onChangeHandle(event)}>
                             <option value="A">A</option>
                             <option value="B">B</option>
                             <option value="C">C</option>
                             <option value="D">D</option>
                 </select>
                 </div>
                        </div>
                    <div className="w-full lg:w-6/12 px-4">
                    <JoditEditor
                                value={items.answer}
                                config={config}
                                tabIndex={1}
                                onBlur={newContent => setDataAdd({...dataAdd,["answer1"]:newContent})} 
                            />
                            {
                                error.id===index?
                 <span className="text-red-500 text-sm">{error.answer1?error.answer1:""}</span>:""}
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                Kiểu đáp án
                            </label>
                            <select name={"type_answer2"} id="type" className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={(event) => onChangeHandle(event)}>
                             <option value="A">A</option>
                             <option value="B">B</option>
                             <option value="C">C</option>
                             <option value="D">D</option>
                 </select>
                 </div>
                        </div>
                    <div className="w-full lg:w-6/12 px-4">
                    <JoditEditor
                                value={items.answer}
                                config={config}
                                tabIndex={1}
                                onBlur={newContent => setDataAdd({...dataAdd,["answer2"]:newContent})} 
                            />
                            {
                                error.id===index?
                            <span className="text-red-500 text-sm">{error.answer2?error.answer2:""}</span>:""}
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                Kiểu đáp án
                            </label>
                            <select name={"type_answer3"} id="type" className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={(event) => onChangeHandle(event)}>
                             <option value="A">A</option>
                             <option value="B">B</option>
                             <option value="C">C</option>
                             <option value="D">D</option>
                 </select>
                 </div>
                        </div>
                    <div className="w-full lg:w-6/12 px-4">
                    <JoditEditor
                                value={items.answer}
                                config={config}
                                tabIndex={1}
                                onBlur={newContent => setDataAdd({...dataAdd,["answer3"]:newContent})} 
                            />
                            {
                                error.id===index?
                            <span className="text-red-500 text-sm">{error.answer3?error.answer3:""}</span>:""}
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                Kiểu đáp án
                            </label>
                            <select name={"type_answer4"} id="type" className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={(event) => onChangeHandle(event)}>
                             <option value="A">A</option>
                             <option value="B">B</option>
                             <option value="C">C</option>
                             <option value="D">D</option>
                 </select>
                 </div>
                        </div>
                    <div className="w-full lg:w-6/12 px-4">
                    <JoditEditor
                                value={items.answer}
                                config={config}
                                tabIndex={1}
                                onBlur={newContent => setDataAdd({...dataAdd,["answer4"]:newContent})} 
                            />
                            {
                                error.id===index?
                            <span className="text-red-500 text-sm">{error.answer4?error.answer4:""}</span>:""}
                    </div>
                    <div className="w-full px-4">
                            <div className="relative w-full mb-3 group h-96">
                                <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                    Hình ảnh
                                </label> 
                                <label htmlFor="avt" className="w-3/5 text-center opacity-0 group-hover:opacity-100 block py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-15 font-semibold absolute bottom-5 transform left-1/2 -translate-x-1/2 duration-300 text-white">
                                    <i className="fad fa-camera mr-2"></i>
                                    <span> Chọn ảnh</span>
                                </label>
                                <input type="file" id="avt" name="image" hidden required onChange={(event) => onChangeHandle(event)}/>
                                <span className="text-red-500 text-sm">{error.image?error.image[0]:""}</span>
                            </div>
                        </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                               Đáp án chính xác
                            </label>
                             <select name={"correct_answer"} id="type" className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={(event) => onChangeHandle(event)}>
                             <option value="A">A</option>
                             <option value="B">B</option>
                             <option value="C">C</option>
                             <option value="D">D</option>
                 </select>
                            </div>
                        </div>
                </div>
                     <button type="button" onClick={()=>onAddQuestion(index)} className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 hover:shadow-xl font-semibold duration-300">Thêm câu hỏi</button>
               </form>
                        )
            }):""}
            </div>
            <button type="button" onClick={()=>onAddQuestionAnswer()} className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 hover:shadow-xl font-semibold duration-300">Hoàn thành</button>

            </div>
        </div>
    </section>
    );
        }else{
            return(
            <section className=" py-1">
        <div className="w-full">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">   
            <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                <h6 className="text-gray-700 text-xl font-bold">
                    Thêm đáp án chính xác cho bài kiểm tra
                </h6>
                </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {respon.length>0?
                    respon.map((items,index)=>{
                        return(
            <form>
                <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Câu {index+1}
                </h6>
                <div className="flex flex-wrap">
                   <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                               Đáp án chính xác
                            </label>
                             <select name={"correct_answer"} id="type" className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={(event) => onChangeHandleFile(event,index)}>
                             <option value="A">A</option>
                             <option value="B">B</option>
                             <option value="C">C</option>
                             <option value="D">D</option>
                             </select>
                             </div>
                        </div>
                </div>                
            </form>
                        )
            }):""}
            </div>
            <button type="button" onClick={()=>onAddQuestionAnswerFile()} className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 hover:shadow-xl font-semibold duration-300">Hoàn thành</button>
            </div>
        </div>
    </section>
            );
        }
}

export default AddQuestionAnswer