import React from "react";
import "../css/Other_document.css";
import { LeftDocument } from "./Left_document";
import RightDocument from "./Right_document";
import { BrowserRouter as  Route } from "react-router-dom";
import { AnswerDetail } from "./AnswerDetail";

export const Other_document = () => {
  return (
    <>
      <div className="other-doc">
        <LeftDocument></LeftDocument>
        <>
          <Route exact path="/" exact component={RightDocument} />
          <Route path="/dap-an" exact component={AnswerDetail} />
        </>
      </div>
    </>
  );
};
