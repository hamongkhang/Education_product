import React from "react";
import { LeftDocument } from "./Left_document";
import RightDocument from "./Right_document";
import { BannerBook } from '../../../components/banner';

 const OtherMaterials = () => {
  return (
    <>
        <BannerBook/>
        <div className="other-doc mt-10">
            <LeftDocument></LeftDocument>
        <div className="other-doc-right">
            <RightDocument></RightDocument>
        </div>
        </div>
    </>
  );
};

export default OtherMaterials;