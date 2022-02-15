import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ExamLesson from './examLesson';
import { toast } from 'react-toastify';

toast.configure();

const ExamDetail = ({
    examDetails,
    handleExamDetails,
    examLesson,
    handleExamLesson,
    examLesson2,
    question,
    answer,
    isShow2,
    timer,
    correct,
}) => {
    const $token = localStorage.getItem('access_token');

    const payMent = (event, total, id) => {
        if ($token) {
            if (total != 0) {
                const _formData = new FormData();
                _formData.append('amount', total);
                _formData.append('id_exam', id);
                fetch(
                    `${process.env.REACT_APP_URL_SERVER}/api/payment/momoPaymentExam`,
                    {
                        method: 'POST',
                        headers: { Authorization: `Bearer ` + $token },
                        body: _formData,
                    },
                )
                    .then((response) => response.json())
                    .then((data) => {
                        window.location.href = data.url;
                    });
                return () => {};
            } else {
                toast.info(`Không cần thanh toán!`, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            toast.warn(`Bạn chưa đăng nhập!`, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    return (
        <>
            <div className="answer-detail ">
                <div
                    className={`answer-detail__block relative ${
                        isShow2 ? 'hidden' : 'block'
                    }`}
                >
                    <div
                        className="absolute right-3 top-2 cursor-pointer hover:text-red-500"
                        onClick={() => handleExamDetails()}
                    >
                        <i className="far fa-times"></i>
                    </div>
                    <div className="answer-detail-content">
                        <div className="answer-left">
                            <img
                                className="object-cover"
                                src={`${process.env.REACT_APP_URL_SERVER}/upload/images/exam/${examDetails.image}`}
                                alt="ảnh chi tiết"
                            />
                        </div>
                        <div className="answer-right">
                            <>
                                <h3 className="answer-right__text">
                                    {examDetails.name}
                                </h3>
                                <div className="answer-right__content">
                                    <p className="answer-right__script">
                                        &nbsp;{' '}
                                        {examDetails.check
                                            ? 'Đã mua'
                                            : 'Chưa mua'}
                                    </p>
                                    <p className="answer-right__question">
                                        &nbsp; {examDetails.number_question}
                                        &nbsp;câu
                                    </p>
                                    <p className="answer-right__price">
                                        &nbsp; Giá bán:
                                        <strong>
                                            &nbsp;
                                            {examDetails.price}
                                        </strong>{' '}
                                        <sup>đ</sup>
                                    </p>
                                    <p className="answer-right__time">
                                        &nbsp;Thời gian làm bài:{' '}
                                        <strong>{examDetails.time} phút</strong>
                                    </p>
                                </div>
                            </>
                            {examDetails.check ? (
                                <>
                                    <button
                                        type="submit"
                                        onClick={() =>
                                            handleExamLesson(
                                                examDetails.id,
                                                1,
                                                examDetails.time,
                                            )
                                        }
                                        className="mt-3 bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 hover:shadow-xl font-semibold duration-300"
                                    >
                                        Bắt đầu thi
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="submit"
                                    onClick={(event) =>
                                        payMent(
                                            event,
                                            examDetails.price,
                                            examDetails.id,
                                        )
                                    }
                                    className="mt-3 bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 hover:shadow-xl font-semibold duration-300"
                                >
                                    Mua bài kiểm tra
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="answer-note">
                        <p>Lưu ý: </p>
                        <ul className="answer-note__list">
                            <li>
                                {' '}
                                Thi xong bạn{' '}
                                <strong style={{ color: 'red' }}>
                                    <Link to="/"> bấm vào đây </Link>
                                </strong>{' '}
                                để xem đáp án chi tiết.
                            </li>
                            <li>
                                {' '}
                                Đề đã thi sẽ mở lại cho những bạn chưa thi vào
                                ngày hôm sau.
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={`relative ${isShow2 ? 'block' : 'hidden'}`}>
                    <ExamLesson
                        correct={correct}
                        timer={timer}
                        question={question}
                        answer={answer}
                        number={examDetails.number_question}
                        name={examDetails.name}
                        time={examDetails.time}
                        examLesson2={examLesson2}
                        examLesson={examLesson}
                        handleExamLesson={handleExamLesson}
                        examDetailId={examDetails.id}
                    />
                </div>
            </div>
        </>
    );
};

export default ExamDetail;
