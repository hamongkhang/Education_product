import React, { useState, useEffect } from "react";
import "../css/Other_document.css";
import {ListDocument} from "./List_document";

const arr = {
  name: "Đáp án đề thi online Vật lí 10",
  content: [
    {
      list: "VL10 - Đáp án đề số 6 - Ngày thi 8/10/2021",
    },
    {
      list: "VL10 - Đáp án đề số 6 - Ngày thi 8/10/2021",
    },
    {
      list: "VL10 - Đáp án đề số 6 - Ngày thi 8/10/2021",
    },
    {
      list: "VL10 - Đáp án đề số 6 - Ngày thi 8/10/2021",
    },
  ],
};

const RightDocument = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(arr);
  }, []);
  return (
    <>
      <ListDocument list={list} /> 
    </>
  );
};

export default RightDocument;
