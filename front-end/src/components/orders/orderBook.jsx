import React from 'react';

const OrderBook = (props) => (
    <div className="">
        <img
            src={'http://localhost:8000/upload/images/book/' + props.image}
            className="w-8 h-12 xs:w-12 xs:h-24 sm1:w-19 sm1:h-28 object-cover block mx-auto"
            alt=""
        />
    </div>
);

export default OrderBook;
