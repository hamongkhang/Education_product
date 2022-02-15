import React from 'react';

export const LeftDocument = (props) => {
    if (props.category && props.document) {
        return (
            <>
                <div className="other-doc-left">
                    <div className="other-doc-left__border-list">
                        <h4 className="other-doc-left__title">Danh mục</h4>
                        <ul className="other-doc-left__course">
                            {props.category.map((item) => {
                                return (
                                    <li className="other-doc-left__course--p">
                                        <p>{item.name}</p>
                                        <ul className="other-doc-left__course--p">
                                            {props.document.map((item2) => {
                                                if (
                                                    item2.category_name ==
                                                    item.name
                                                ) {
                                                    return (
                                                        <li className="other-doc-left__list--li">
                                                            <a
                                                                href={`${process.env.REACT_APP_URL_SERVER}${item2.path}${item2.file}`}
                                                                download
                                                            >
                                                                {item2.name}
                                                            </a>
                                                        </li>
                                                    );
                                                }
                                            })}
                                        </ul>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </>
        );
    } else {
        return <center>Loading.....</center>;
    }
};
