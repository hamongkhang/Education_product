import React, { useEffect, useState } from 'react';
import RightItem from './rightItem';

const arr = [
    {
        img: 'https://chuvanbien.vn/files/source/Thi%20online/Vat%20li%2010/Vatli10.jpg',
        name: 'Đề số 8',
        note: 'Thi xong bạn bấm vào đây để xem đáp án chi tiết',
        status: 'Đã thi',
        questions: '40 câu',
        price: '1000',
    },
    {
        img: 'https://chuvanbien.vn/files/source/Thi%20online/Vat%20li%2010/Vatli10.jpg',
        name: 'Đề số 8',
        note: 'Thi xong bạn bấm vào đây để xem đáp án chi tiết',
        status: 'Đã thi',
        questions: '40 câu',
        price: '1000',
    },
    {
        img: 'https://chuvanbien.vn/files/source/Thi%20online/Vat%20li%2010/Vatli10.jpg',
        name: 'Đề số 8',
        note: 'Thi xong bạn bấm vào đây để xem đáp án chi tiết',
        status: 'Đã thi',
        questions: '40 câu',
        price: '1000',
    },
    {
        img: 'https://chuvanbien.vn/files/source/Thi%20online/Vat%20li%2010/Vatli10.jpg',
        name: 'Đề số 8',
        note: 'Thi xong bạn bấm vào đây để xem đáp án chi tiết',
        status: 'Đã thi',
        questions: '40 câu',
        price: '1000',
    },
];

const ExamGrid = (props) => {
    const { examRight, handleExamDetails, itemCategoryID, historyExam } = props;
    const [list, setList] = useState([examRight]);
    const [txt, setTxt] = useState('Xem thêm');

    useEffect(() => {
        if(examRight.length > 4) {
            let arrTemp = examRight;
            let arr1Temp = arrTemp.slice(0, 4);
            setList(arr1Temp);
            setTxt('Xem thêm');
        }
        else {
            setList(examRight);
        }
    }, []);

    const handleShow = () => {
        if (txt === 'Xem thêm') {
            setList(examRight);
            setTxt('Ẩn bớt');
        } else {
            if(examRight.length > 4) {
                let arrTemp = examRight;
                let arr1Temp = arrTemp.slice(0, 4);
                setList(arr1Temp);
                setTxt('Xem thêm');
            }
            else {
                setList(examRight);
            }
        }
    };

    return (
        <>
            <div className="online-exam-body">
                {
                    
                }
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
                list.length > 0 &&
                <div className="online-exam-right__seemore" onClick={handleShow}>
                <p>{txt}</p>
            </div>
            }
        </>
    );
};

export default ExamGrid;
