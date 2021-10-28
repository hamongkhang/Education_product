import React,{ useEffect, useState } from "react";
import { LeftExam } from './Left_exam';
import RightExam from "./Right_exam";
import { BannerBook } from '../../../components/banner';
import { Route} from 'react-router-dom';
import ExamDetail from "./examDetail";


const ExamIndex = () => {
  const [listExam, setListExam] = useState([]);
  const [listExamCategory,setListExamCategory] =useState([]);
  const [isShow, setIsShow] = useState(false);
  const [examDetails, setExamDetails] = useState({});
  const [isShow2, setIsShow2] = useState(false);
  const [examLesson, setExamLesson] = useState({});
  const [examLesson2, setExamLesson2] = useState({});
  const [question,setQuestion] =useState([]);
  const [answer,setAnswer] =useState([]);
  const $token=localStorage.getItem('access_token');

    const getQuestionAnswer=(id)=>{
    const _formData = new FormData();
    _formData.append("id",id)
    fetch("http://localhost:8000/api/exam/getQuestionAnswer/", {
        body: _formData,
        method: "POST",
        headers: {"Authorization": `Bearer `+$token},
      })
    .then(response => response.json())
    .then(data =>  {
      setQuestion(data.data[0]);
      setAnswer(data.data[1]);
  });
    return () => {
}
}

  const getListDocument=()=>{
    fetch("http://localhost:8000/api/exam/getExam", {
        method: "GET"
      })
    .then(response => response.json())
    .then(data =>  {
      setListExam(data.data[1]);
      setListExamCategory(data.data[0])
    });
      return () => {
    }
  }
  const handleExamLesson = (id=-1) => {  
      let data = listExam.find(item => item.id === id);
      setExamLesson2(data);
      getQuestionAnswer(id);
      setIsShow2(true);
    }
    const handleExamDetails = (id = -1, check = 0) => {
      if(id !== -1) {
        let data = listExam.find(item => item.id === id);
        if(data) {
          data = {
            ...data,
            check: check,
          }
          setExamDetails(data);
        }
      setIsShow2(false);
      setIsShow(true);
    }
    else {
      if(isShow) {
        setIsShow(false);
      }
    }
  }

  useEffect(() => {
    getListDocument();
  }, []);
  return (
    <>
        <BannerBook/>
        <div className="other-doc mt-10">
            <LeftExam 
              exam={listExam} 
              category={listExamCategory}
              handleExamDetails={handleExamDetails} 
              examDetails={examDetails}
            />
            <RightExam 
              examRight={listExam} 
              categoryRight={listExamCategory} 
              handleExamDetails={handleExamDetails} 
              isShow={isShow}
              isShow2={isShow2}
              examDetails={examDetails}
              handleExamLesson={handleExamLesson}
              examLesson={examLesson}
              examLesson2={examLesson2}
              question={question}
              answer={answer}
            />
        </div>
    </>
  );
};

export default ExamIndex;