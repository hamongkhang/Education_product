import React, { useState, useEffect } from 'react';

export const LeftExam = (props) => {
    const [historyExam2, setHistoryExam2] = useState([]);
    const $token = localStorage.getItem('access_token');

    const getExamHistory2 = () => {
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/history/getHistoryExam`,
            {
                method: 'GET',
                headers: { Authorization: `Bearer ` + $token },
            },
        )
            .then((response) => response.json())
            .then((data) => {
                setHistoryExam2(data.data);
            });
    };

    useEffect(() => {
        getExamHistory2();
    }, []);

    if (props.category && props.exam) {
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
                                            {props.exam.map((item2) => {
                                                if (
                                                    item2.category_id == item.id
                                                ) {
                                                    var kt2 = 0;
                                                    for (
                                                        var i = 0;
                                                        i < historyExam2.length;
                                                        i++
                                                    ) {
                                                        if (
                                                            historyExam2[i]
                                                                .product_id ==
                                                            item2.id
                                                        ) {
                                                            kt2 = 1;
                                                        }
                                                    }
                                                    return (
                                                        <li
                                                            className="other-doc-left__list--li"
                                                            onClick={() =>
                                                                props.handleExamDetails(
                                                                    item2.id,
                                                                    kt2,
                                                                )
                                                            }
                                                        >
                                                            <a href="#">
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
