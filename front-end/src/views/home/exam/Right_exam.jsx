import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import ExamDetail from './examDetail';
import ExamGrid from './examGrid';

const RightExamItem = (props) => {
    const [historyExam, setHistoryExam] = useState([]);
    const $token = localStorage.getItem('access_token');

    const getExamHistory = () => {
        fetch('http://localhost:8000/api/history/getHistoryExam', {
            method: 'GET',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                setHistoryExam(data.data);
            });
        return () => {};
    };

    useEffect(() => {
        getExamHistory();
    }, []);

    return (
        <>
            <div className="online-exam">
                {props.categoryRight.map((itemCategory, index) => {
                    return (
                        <div
                            key={index}
                            className={`online-exam__block ${
                                props.isShow ? 'hidden' : 'block'
                            }`}
                        >
                            <div className="online-exam__header">
                                <div className="online-exam__title">
                                    <h4>{itemCategory.name}</h4>
                                </div>
                            </div>
                            <ExamGrid
                                examRight={props.examRight}
                                itemCategoryID={itemCategory.id}
                                handleExamDetails={props.handleExamDetails}
                                historyExam={historyExam}
                            />
                            {/* <div className="online-exam-body">
                                {props.examRight.map((item, index) => {
                                    if (item.category_id === itemCategory.id) {
                                        var kt = 0;
                                        for (
                                            var i = 0;
                                            i < historyExam.length;
                                            i++
                                        ) {
                                            if (
                                                historyExam[i].product_id ===
                                                item.id
                                            ) {
                                                kt = 1;
                                            }
                                        }
                                        return (
                                            <RightItem key={index} item={item} handleExamDetails={props.handleExamDetails} kt={kt}/>
                                        );
                                    }
                                })}
                            </div>
                            <div
                                className="online-exam-right__seemore"
                                onClick={handleShow}
                            >
                                <p>{txt}</p>
                            </div> */}
                        </div>
                    );
                })}
                <div className={props.isShow ? 'block' : 'hidden'}>
                    <ExamDetail
                        correct={props.correct}
                        timer={props.timer}
                        examDetails={props.examDetails}
                        question={props.question}
                        answer={props.answer}
                        handleExamDetails={props.handleExamDetails}
                        examLesson2={props.examLesson2}
                        examLesson={props.examLesson}
                        handleExamLesson={props.handleExamLesson}
                        isShow2={props.isShow2}
                    />
                </div>
            </div>
        </>
    );
};
export default RightExamItem;
