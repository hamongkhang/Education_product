import React,{ useEffect, useState } from "react";
import { LeftDocument } from './Left_document';
import RightDocument from "./Right_document";
import { BannerBook } from '../../../components/banner';
import { Route } from "react-router-dom";
import AnswerDetail from "./answerDetail";

const OtherMaterials = () => {
  const [listDocument, setListDocument] = useState([]);
  const [listCategory,setListCategory] =useState([]);
  const $token=localStorage.getItem('access_token');

  const getListDocument=()=>{
    fetch("http://localhost:8000/api/freeDocument/getFreeDocument", {
        method: "GET"
      })
    .then(response => response.json())
    .then(data =>  {
      setListDocument(data.data[1]);
      setListCategory(data.data[0])
  });
    return () => {
}
}
    useEffect(() => {
    getListDocument();
  }, []);
  return (
    <>
        <BannerBook/>
        <div className="other-doc mt-10">
          <LeftDocument document={listDocument} category={listCategory}/>
            <RightDocument documentRight={listDocument} categoryRight={listCategory}/>
            <Route path="/tai-lieu-khac/dap-an" exact component={AnswerDetail} />
            <Route path="/tai-lieu-khac" exact component={RightDocument} />
        </div>
    </>
  );
};

export default OtherMaterials;