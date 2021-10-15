
import React from "react";
import "../css/Other_document.css";
import { LeftDocument } from "./Left_document";
import RightDocument from "./Right_document";


export const Other_document = () => {
  return (
    <>
      <div className="other-doc">
        <LeftDocument></LeftDocument>
      <div className="other-doc-right">
          <RightDocument></RightDocument>
      </div>
    </div>
    </>
  );
};