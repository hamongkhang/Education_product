import React from 'react';

const OrderCourse = (props) => (
    <div>
        <img
            src={`${process.env.REACT_APP_URL_SERVER}/upload/images/course/${props.image}`}
            className="w-16 h-12 xs:w-30 xs:h-24 sm1:w-40 sm1:h-28 object-cover"
            alt=""
        />
    </div>
);

export default OrderCourse;
