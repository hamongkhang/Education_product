import React from 'react';
import moment from 'moment';

const CourseName = (props) => (
    <div className="p-4 shadow-md">
        <h2>
            Khóa học: <b>{props.name}</b>
        </h2>
        <span>
            Cập nhập gần đây nhất:{' '}
            <b>{moment(props.date).format('DD-MM-YYYY')}</b>
        </span>
    </div>
);

export default CourseName;
