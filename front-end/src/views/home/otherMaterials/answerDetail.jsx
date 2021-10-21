import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const arr = [
  {
    name: "Đề số 7",
    script: "Đã thi",
    questions: "40 câu",
    price: "1000",
    time: "50 phút",
  },
];

const AnswerDetail = () => {
  const [arr1, setArr1] = useState([]);

  useEffect(() => {
    setArr1(arr);
  }, []);
  return (
    <>
      <div className="answer-detail">
        <div className="answer-detail__block">
          <div className="answer-detail-content">
            <div className="answer-left">
              <img
                src="https://chuvanbien.vn/files/source/Thi%20online/Vat%20li%2010/Vatli10.jpg"
                alt="ảnh chi tiết"
              />
            </div>
            <div className="answer-right">
              {arr1 && arr1.length
                ? arr1.map((items) => {
                    return (
                      <>
                        <h3 className="answer-right__text">{items.name}</h3>
                        <div className="answer-right__content">
                          <p className="answer-right__script">
                            &nbsp; {items.script}
                          </p>
                          <p className="answer-right__question">
                            &nbsp; {items.questions}
                          </p>
                          <p className="answer-right__price">
                            &nbsp; Giá bán:
                            <strong>
                              {" "}
                              &nbsp;
                              {items.price}
                            </strong>{" "}
                            <sup>đ</sup>
                          </p>
                          <p className="answer-right__time">
                            &nbsp;Thời gian làm bài:{" "}
                            <strong>{items.time}</strong>
                          </p>
                        </div>
                      </>
                    );
                  })
                : " "}
                {/* <a href='#'> */}
                <button type="submit" className='answer-right__button answer-right__button--succ'>Mua bài kiểm tra</button>
                {/* </a> */}
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

export default AnswerDetail;
