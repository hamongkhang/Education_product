import React, { useEffect, useState } from 'react';
import RightItem from './rightItem';

const ExamGrid = (props) => {
    const { examRight, handleExamDetails, itemCategoryID, historyExam } = props;
    const [list, setList] = useState([examRight]);
    const [txt, setTxt] = useState('Xem thêm');

    useEffect(() => {
        let arrTemp = examRight;
        let arr1Temp = arrTemp.slice(0, 4);
        setList(arr1Temp);
        setTxt('Xem thêm');
    }, []);

    const handleShow = () => {
        if (txt === 'Xem thêm') {
            setList(examRight);
            setTxt('Ẩn bớt');
        } else {
            let arrTemp = examRight;
            let arr1Temp = arrTemp.slice(0, 4);
            setList(arr1Temp);
            setTxt('Xem thêm');
        }
    };

    return (
        <>
            <div className="online-exam-body">
                {list.map((item, index) => {
                    if (item.category_id === itemCategoryID) {
                        var kt = 0;
                        for (var i = 0; i < historyExam.length; i++) {
                            if (historyExam[i].product_id === item.id) {
                                kt = 1;
                            }
                        }
                        return (
                            <RightItem
                                key={index}
                                item={item}
                                handleExamDetails={handleExamDetails}
                                kt={kt}
                            />
                        );
                    }
                })}
            </div>
            {
                examRight.length > 5 &&
                <div className="online-exam-right__seemore" onClick={handleShow}>
                <p>{txt}</p>
            </div>
            }
        </>
    );
};

export default ExamGrid;
