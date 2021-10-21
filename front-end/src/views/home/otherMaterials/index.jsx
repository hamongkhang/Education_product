import React from "react";
import { LeftDocument } from './Left_document';
import RightDocument from "./Right_document";
import { BannerBook } from '../../../components/banner';
import { Route } from "react-router-dom";
import AnswerDetail from "./answerDetail";

const OtherMaterials = () => {
  return (
    <>
        <BannerBook/>
        <div className="other-doc mt-10">
          <LeftDocument />
          <RightDocument/>
            <Route path="/tai-lieu-khac/dap-an" exact component={AnswerDetail} />
            {/* <Route path="/tai-lieu-khac" exact component={RightDocument} /> */}
        </div>
    </>
  );
};

export default OtherMaterials;