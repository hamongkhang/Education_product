import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import ExamDetail from './examDetail';
import ExamGrid from './examGrid';
import RightItem from './rightItem';

const RightExamItem = (props) => {
    const [historyExam, setHistoryExam] = useState([]);
    const $token = localStorage.getItem('access_token');

    const getExamHistory = () => {
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/history/getHistoryExam`,
            {
                method: 'GET',
                headers: { Authorization: `Bearer ` + $token },
            },
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setHistoryExam(data.data);
            });
        return () => {};
    };

    const handleExam = (itemCategory) => {
        let examTemp = props.examRight.filter(
            (item) => item.category_id == itemCategory.id,
        );
        return (
            <ExamGrid
                examRight={examTemp}
                itemCategoryID={itemCategory.id}
                handleExamDetails={props.handleExamDetails}
                historyExam={historyExam}
            />
        );
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
                            {handleExam(itemCategory)}
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
