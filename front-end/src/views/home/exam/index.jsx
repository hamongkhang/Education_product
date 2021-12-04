import React, { useEffect, useState } from 'react';
import { LeftExam } from './Left_exam';
import RightExam from './Right_exam';
import { BannerBook } from '../../../components/banner';
import { Route } from 'react-router-dom';
import ExamDetail from './examDetail';
import Preloader from '../../../components/preloader';

const ExamIndex = () => {
    const [listExam, setListExam] = useState([]);
    const [listExamCategory, setListExamCategory] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [examDetails, setExamDetails] = useState({});
    const [isShow2, setIsShow2] = useState(false);
    const [examLesson, setExamLesson] = useState({});
    const [examLesson2, setExamLesson2] = useState({});
    const [question, setQuestion] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [timer, setTimer] = React.useState(0);
    const [correct, setCorrect] = React.useState(0);
    const countRef = React.useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const $token = localStorage.getItem('access_token');

    const getQuestionAnswer = (id) => {
        setIsLoading(true);
        const _formData = new FormData();
        _formData.append('id', id);
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/exam/getQuestionAnswer/`,
            {
                body: _formData,
                method: 'POST',
                headers: { Authorization: `Bearer ` + $token },
            },
        )
            .then((response) => response.json())
            .then((data) => {
                setQuestion(data.data[0]);
                setAnswer(data.data[1]);
                setCorrect(data.data[2]);
                setIsLoading(false);
            });
    };

    const getListDocument = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/exam/getExam`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                setListExam(data.data[1]);
                setListExamCategory(data.data[0]);
                setIsLoading(false);
            });
    };
    const handleExamLesson = (id = -1, i, time) => {
        let data = listExam.find((item) => item.id === id);
        setExamLesson2(data);
        getQuestionAnswer(id);
        setIsShow2(true);
        clearInterval(countRef.current);
        setTimer(time * 60);
        countRef.current = setInterval(() => {
            setTimer((timer) => timer - 1);
        }, 1000);
    };
    const handleExamDetails = (id = -1, check = 0) => {
        if (id !== -1) {
            let data = listExam.find((item) => item.id === id);
            if (data) {
                data = {
                    ...data,
                    check: check,
                };
                setExamDetails(data);
            }
            setIsShow2(false);
            setIsShow(true);
        } else {
            if (isShow) {
                setIsShow(false);
            }
        }
    };
    useEffect(() => {
        getListDocument();
    }, []);
    if (timer != -1) {
        return (
            <>
                {isLoading && <Preloader />}
                <BannerBook />
                <div className="other-doc mt-10">
                    <LeftExam
                        exam={listExam}
                        category={listExamCategory}
                        handleExamDetails={handleExamDetails}
                        examDetails={examDetails}
                    />
                    <RightExam
                        examRight={listExam}
                        categoryRight={listExamCategory}
                        handleExamDetails={handleExamDetails}
                        isShow={isShow}
                        isShow2={isShow2}
                        examDetails={examDetails}
                        handleExamLesson={handleExamLesson}
                        examLesson={examLesson}
                        examLesson2={examLesson2}
                        question={question}
                        answer={answer}
                        timer={timer}
                        correct={correct}
                    />
                </div>
            </>
        );
    } else {
        clearInterval(countRef.current);
        setTimer(0);
    }
};

export default ExamIndex;
