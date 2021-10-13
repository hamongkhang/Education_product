import React, { useEffect } from "react";
import "../css/Other_document.css";

export const ListDocument = (props) => {
  const { list } = props;

  return (
    <>
      <div className="other-doc-right__block">
        <div className="other-doc-right__header">
          <div className="other-doc-right__title">
            <h4>{list.name}</h4>
          </div>
        </div>
        {list.content && list.content.length
          ? list.content.map((items) => {
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
        <div className="other-doc-right__seemore">
          <p>Xem thêm</p>
        </div>
      </div>
    </>
  );
};
