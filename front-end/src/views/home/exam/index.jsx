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
  const $token=localStorage.getItem('access_token');

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

  const handleExamDetails = (id = -1, check = 0) => {
    // if(id !== -1) {

    // }
    if(id !== -1) {
      let data = listExam.find(item => item.id === id);
      if(data) {
        data = {
          ...data,
          check: check,
        }
        setExamDetails(data);
      }
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
              examDetails={examDetails}
            />
        </div>
    </>
  );
};

export default ExamIndex;