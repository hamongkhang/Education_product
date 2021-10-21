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
              <RightDocument></RightDocument>
        </div>
    </>
  );
};

export default OtherMaterials;