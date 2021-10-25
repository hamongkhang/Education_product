import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
// import "../../../css/Online_Exam.css";
// import "../../../css/AnswerDetail.css";
import ExamDetail from "./examDetail";

const arr = [
  {
    img: "https://chuvanbien.vn/files/source/Thi%20online/Vat%20li%2010/Vatli10.jpg",
    name: "Đề số 8",
    note: "Thi xong bạn bấm vào đây để xem đáp án chi tiết",
    status: "Đã thi",
    questions: "40 câu",
    price: "1000",
  },
  {
    img: "https://chuvanbien.vn/files/source/Thi%20online/Vat%20li%2010/Vatli10.jpg",
    name: "Đề số 8",
    note: "Thi xong bạn bấm vào đây để xem đáp án chi tiết",
    status: "Đã thi",
    questions: "40 câu",
    price: "1000",
  },
  {
    img: "https://chuvanbien.vn/files/source/Thi%20online/Vat%20li%2010/Vatli10.jpg",
    name: "Đề số 8",
    note: "Thi xong bạn bấm vào đây để xem đáp án chi tiết",
    status: "Đã thi",
    questions: "40 câu",
    price: "1000",
  },
  {
    img: "https://chuvanbien.vn/files/source/Thi%20online/Vat%20li%2010/Vatli10.jpg",
    name: "Đề số 8",
    note: "Thi xong bạn bấm vào đây để xem đáp án chi tiết",
    status: "Đã thi",
    questions: "40 câu",
    price: "1000",
  },
];

const RightExamItem = (props) => {
  const [arr1, setArr1] = useState(arr);
  const [show, setShow] = useState(7);
  const [txt, setTxt] = useState("Xem thêm");
  const [arrlist, setArrlist] = useState([]);
  
  const [historyExam,setHistoryExam] = useState([]);
  const $token=localStorage.getItem('access_token');

  const getExamHistory=()=>{
    fetch("http://localhost:8000/api/history/getHistoryExam", {
        method: "GET",
        headers: {"Authorization": `Bearer `+$token},
      })
    .then(response => response.json())
    .then(data =>  {
      setHistoryExam(data.data);
  });
    return () => {
}
}

  useEffect(() => {
    getExamHistory();
    let arrTemp = arr1;
    let arr1Temp = arrTemp.slice(0, show - 1);
    setArrlist(arr1Temp);
    setTxt("Xem thêm");
  }, []);

  const handleShow = () => {
    if (txt === "Xem thêm") {
      setArrlist(arr1);
      setTxt("Ẩn bớt");
    } else {
      let arrTemp = arr1;
      let arr1Temp = arrTemp.slice(0, show - 1);
      setArrlist(arr1Temp);
      setTxt("Xem thêm");
    }
  };

  return (
    <>
      <div className="online-exam">
      {props.categoryRight.map((itemCategory, index) => {
              return (
        <div className={`online-exam__block ${props.isShow ? 'hidden' : 'block'}`}>
          <div className="online-exam__header">
            <div className="online-exam__title">
              <h4>
                {itemCategory.name}
              </h4>
            </div>
          </div>
          <div className="online-exam-body">
          {props.examRight.map((item, index) => {
            if(item.category_id===itemCategory.id){
              var kt=0;
              for (var i=0; i < historyExam.length; i++) {
                if(historyExam[i].product_id===item.id){
                         kt=1;
                }
              }
              return (
                <>
                  <div className="online-exam-body-block">
                    <div className="online-exam-body-content">
                      <div className="online-exam-body-content">
                        <div className="online-exam-body-left">
                          <div className="cursor-pointer" onClick={() => props.handleExamDetails(item.id, kt)}> <img className="" src={"http://localhost:8000/upload/images/exam/"+item.image} alt="ảnh chi tiết" /></div>
                        </div>
                        <div className="online-exam-body-right">
                          <div className="online-exam-right__name">
                            <div className="cursor-pointer" onClick={() => props.handleExamDetails(item.id, kt)}>{item.name}</div>
                          </div>
                          <div className="answer-right__content">
                            
                          <p className="answer-right__script">
                            &nbsp; { kt ? "Đã mua" : "Chưa mua"}
                          </p>
                          <p className="answer-right__time">
                            &nbsp;Thời gian làm bài:{" "}
                            <strong>{item.time}</strong>
                          </p>
                            <p className="answer-right__question">
                              &nbsp;Số câu hỏi:{" "}  
                              <strong>{item.number_question} </strong>
                               câu hỏi
                            </p>
                            <p className="answer-right__price">
                              &nbsp; Giá bán:
                              <strong>
                                {" "}
                                &nbsp;
                                {item.price}
                              </strong>{" "}
                              <sup>đ</sup>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
          }
          })}
          </div>
          <div className="online-exam-right__seemore" onClick={() => handleShow()}>
          <p>{txt}</p>
        </div>
        </div>
      )})}
      <div className={props.isShow ? 'block' : 'hidden'}>
        <ExamDetail examDetails={props.examDetails} handleExamDetails={props.handleExamDetails}/>
      </div>
      </div>
    </>
  );
};
export default RightExamItem;
