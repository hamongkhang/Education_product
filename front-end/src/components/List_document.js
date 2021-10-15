import React, { useEffect, useState } from "react";
import "../css/Other_document.css";


export const ListDocument = (props) => {
  const { list } = props;
  const [show, setShow] = useState(5);
  const [arr, setArr] = useState(list);
  const [arr1, setArr1] = useState([]);
  const [txt, setTxt] = useState("Xem thêm");
  
  useEffect(() => {
    let arrTemp = arr;
    let arr1Temp = arrTemp.content;
    arrTemp = arr1Temp.slice(0, show - 1);
    setArr1(arrTemp);
    setTxt("Xem thêm");
  }, []);


  const handleShow = () => {
    if (txt === "Xem thêm") {
      setArr1(list.content);
      setTxt("Ẩn bớt");
      console.log(list)
    }
    else {
      let arrTemp = arr;
      let arr1Temp = arrTemp.content;
      arrTemp = arr1Temp.slice(0, show - 1);
      setArr1(arrTemp);
      setTxt("Xem thêm");
    }
  };

  return (
        <>
      <div className="other-doc-right__block">
        <div className="other-doc-right__header">
          <div className="other-doc-right__title">
            <h4>{list.name}</h4>
            
          </div>
        </div>
        {arr1 && arr1.length
          ? arr1.map((items) => {
              return (
                <>
                  <div className="other-doc-right-content">
                    <div className="other-doc-right-content__icon">
                      <i className="far fa-file-alt fa-4x"></i>
                    </div>
                    <div className="other-doc-right-content__text">
                      <p className="other-doc-right-content__text--color">
                        <a href="#">{items.list}</a>
                      </p>
                    </div>
                  </div>
                  <hr />
                </>
              );
            })
          : ""}
        <div className="other-doc-right__seemore" onClick={() => handleShow()}>
          <p>{txt}</p>
        </div>
      </div>
    </>
  );
};
