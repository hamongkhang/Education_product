import React from 'react';

const RightItem = (props) => {
    const { item, handleExamDetails, kt } = props;
    return (
        <div className="online-exam-body-block">
            <div className="online-exam-body-content">
                <div className="online-exam-body-content">
                    <div className="online-exam-body-left">
                        <div
                            className="cursor-pointer"
                            onClick={() => handleExamDetails(item.id, kt)}
                        >
                            {' '}
                            <img
                                className=""
                                src={`${process.env.REACT_APP_URL_SERVER}/upload/images/exam/${item.image}`}
                                alt="ảnh chi tiết"
                            />
                        </div>
                    </div>
                    <div className="online-exam-body-right">
                        <div className="online-exam-right__name">
                            <div
                                className="cursor-pointer"
                                onClick={() => handleExamDetails(item.id, kt)}
                            >
                                {item.name}
                            </div>
                        </div>
                        <div className="answer-right__content">
                            <p className="answer-right__script">
                                &nbsp; {kt ? 'Đã mua' : 'Chưa mua'}
                            </p>
                            <p className="answer-right__time">
                                &nbsp;Thời gian làm bài:{' '}
                                <strong>{item.time} phút</strong>
                            </p>
                            <p className="answer-right__question">
                                &nbsp;Số câu hỏi:{' '}
                                <strong>{item.number_question} </strong>
                                câu hỏi
                            </p>
                            <p className="answer-right__price">
                                &nbsp; Giá bán:
                                <strong>
                                    {' '}
                                    &nbsp;
                                    {item.price}
                                </strong>{' '}
                                <sup>đ</sup>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightItem;
