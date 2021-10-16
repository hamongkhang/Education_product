import React, { useState, useEffect } from "react";
import { ListDocument } from "./List_document";

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
    {
      list: "VL10 - Đáp án đề số 6 - Ngày thi 8/10/2021",
    },
    {
      list: "VL10 - Đáp án đề số 7 - Ngày thi 8/10/2022",
    },
  ],
};

const RightDocument = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(arr);
  }, []);

  if (list != "") {
    return (
      <>
        <ListDocument list={list} />
        <ListDocument list={list} />
      </>
    );
  } else {
    return <></>;
  }
};

export default RightDocument;
