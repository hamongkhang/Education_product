import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

export const ListDocument = (props) => {
    const { documentRight } = props;
    const [show, setShow] = useState(5);
    const [arr, setArr] = useState(documentRight.slice(0, show));
    const [arr1, setArr1] = useState([]);
    const [txt, setTxt] = useState('Xem thêm');

    useEffect(() => {
        setArr(documentRight.slice(0, show));
        setTxt('Xem thêm');
    }, []);

    const handleShow = () => {
        if (txt === 'Xem thêm') {
            setArr(documentRight);
            setTxt('Ẩn bớt');
        } else {
            setArr(documentRight.slice(0, show));
            setTxt('Xem thêm');
        }
    };

    return (
        <>
            <div className="other-doc-right__block bg-white">
                <div className="other-doc-right__header">
                    <div className="other-doc-right__title">
                        <h4>{documentRight[0].category_name}</h4>
                    </div>
                </div>
                {arr &&
                    arr.map((item, index) => (
                        <>
                            <div className="other-doc-right-content">
                                <div className="other-doc-right-content__icon">
                                    <i className="far fa-file-alt fa-4x"></i>
                                </div>
                                <div className="other-doc-right-content__text">
                                    <p className="other-doc-right-content__text--color">
                                        <a
                                            href={`http://localhost:8000${item.path}${item.file}`}
                                            download
                                        >
                                            {item.name}
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <hr />
                        </>
                    ))}
                {documentRight.length > 5 ? (
                    <div
                        className="other-doc-right__seemore"
                        onClick={() => handleShow()}
                    >
                        <p>{txt}</p>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </>
    );
};
