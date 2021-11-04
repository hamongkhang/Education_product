import React, { useState, useEffect } from 'react';
import { ListDocument } from './List_document';

const arr = {
    name: 'Đáp án đề thi online Vật lí 10',
    content: [
        {
            list: 'VL10 - Đáp án đề số 6 - Ngày thi 8/10/2021',
        },
        {
            list: 'VL10 - Đáp án đề số 6 - Ngày thi 8/10/2021',
        },
        {
            list: 'VL10 - Đáp án đề số 6 - Ngày thi 8/10/2021',
        },
        {
            list: 'VL10 - Đáp án đề số 6 - Ngày thi 8/10/2021',
        },
        {
            list: 'VL10 - Đáp án đề số 6 - Ngày thi 8/10/2021',
        },
        {
            list: 'VL10 - Đáp án đề số 7 - Ngày thi 8/10/2022',
        },
    ],
};

const RightDocument = (props) => {
    return props.documentRight ? (
        <div className="other-doc-right">
            {props.categoryRight.map((item, index) => {
                let document = props.documentRight.filter(
                    (item2) => item.name === item2.category_name,
                );
                if (document) {
                    return <ListDocument documentRight={document} />;
                }
            })}
        </div>
    ) : (
        ''
    );
};

export default RightDocument;
