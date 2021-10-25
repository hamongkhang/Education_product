import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const arr = [
  {
    id:1,
    name: "Đề số 7",
    script: "Đã thi",
    questions: "40 câu",
    price: "1000",
    time: "50 phút",
  },
];

const ExamDetail = ({
  examDetails,
  handleExamDetails
}) => {
  const [arr1, setArr1] = useState([]);
  const $token=localStorage.getItem('access_token');

  const payMent=(event,total,id)=>{
    if($token){
        if(total!=0){
    const _formData = new FormData();
     _formData.append("amount",total)
     _formData.append("id_exam",id)
    fetch("http://localhost:8000/api/payment/momoPaymentExam", {
        method: 'POST',
        headers: {"Authorization": `Bearer `+$token},
        body: _formData
      })
    .then(response => response.json())
    .then(data =>  { 
        window.location.href = data.url;
    });
    return () => {
}}
else{
    alert("Không cần thanh toán")
}
}else{
alert("Chưa đăng nhập!!!")
}
}
  useEffect(() => {
    setArr1(arr);
  }, []);
  return (
    <>
      <div className="answer-detail ">
        <div className="answer-detail__block relative">
        <div className="absolute right-3 top-2 cursor-pointer hover:text-red-500" onClick={() => handleExamDetails()}>
          <i className="far fa-times"></i>
        </div>
          <div className="answer-detail-content">
            <div className="answer-left">
              <img
              className="object-cover"
                src={"http://localhost:8000/upload/images/exam/"+examDetails.image}
                alt="ảnh chi tiết"
              />
            </div>
            <div className="answer-right">
          
                      <>
                        <h3 className="answer-right__text">{examDetails.name}</h3>
                        <div className="answer-right__content">
                          <p className="answer-right__script">
                            &nbsp; {examDetails.check ? "Đã mua" : "Chưa mua"}
                          </p>
                          <p className="answer-right__question">
                            &nbsp; {examDetails.number_question}&nbsp;câu
                          </p>
                          <p className="answer-right__price">
                            &nbsp; Giá bán:
                            <strong>
                              &nbsp;
                              {examDetails.price}
                            </strong>{" "}
                            <sup>đ</sup>
                          </p>
                          <p className="answer-right__time">
                            &nbsp;Thời gian làm bài:{" "}
                            <strong>{examDetails.time}</strong>
                          </p>
                        </div>
                      </>
                <button type="submit" onClick={(event) => payMent(event, examDetails.price, examDetails.id)} className='answer-right__button answer-right__button--succ'>Mua bài kiểm tra</button>
            </div>
          </div>
          <div className='answer-note'>
            <p>Lưu ý: </p>
            <ul className='answer-note__list'>
                <li> Thi xong bạn <strong style={{color:'red'}}>
                 <Link to='/'>  bấm vào đây </Link>
                    </strong> để xem đáp án chi tiết.</li>
                <li> Đề đã thi sẽ mở lại cho những bạn chưa thi vào ngày hôm sau.</li>
            </ul>
        </div>
        </div>
      </div>
    </>
  );
};

export default ExamDetail;
