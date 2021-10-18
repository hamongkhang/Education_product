import React from 'react'

const OrderCourse = (props) => (
    <div>
        <img src={"http://localhost:8000/upload/images/course/"+props.image} className="w-16 h-12 xs:w-30 xs:h-24 sm1:w-40 sm1:h-28 object-cover" alt="" />
    </div>
)

export default OrderCourse