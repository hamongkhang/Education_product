import React, { useState, useEffect } from 'react'
import OrderItem from './orderItem'

const Orders = (props) => {
    const [course, setCourse] = useState([]);
    const [book, setBook] = useState([]);
    const [paymentInfor, setPaymentInfor] = useState([]);
    const [paymentId, setPaymentId] = useState([]);
    const $token=localStorage.getItem('access_token');

    const getApiSecond=()=>{
        fetch("http://localhost:8000/api/history/getHistory", {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data => {
            setPaymentInfor(data.data[1].reverse());
                });
        return () => {
    }
    }

    useEffect(() => { 
        getApiSecond();
    }, []);    
    return(
    <div>
        <div className="uppercase font-semibold mt-5">
            <div className="text-xl sm:text-2xl">Đơn hàng</div>
        </div>
        <div className="space-y-3">
        {
                paymentInfor.map((item,i) => {
                      return(
                          <OrderItem paymentId={item} />
                      );
                    }
                    )}
        </div>
    </div>
)
    }
export default Orders