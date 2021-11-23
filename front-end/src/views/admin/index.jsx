import React, { useState,useEffect } from "react";

const analyzes = [
  {
    name: "Sales",
    bgColor: "bg-indigo-400",
    icon: "fa-analytics",
    type: true,
  },
  {
    name: "Orders",
    bgColor: "bg-blue-500",
    icon: "fa-cube",
    type: true,
  },
  {
    name: "Customers",
    bgColor: "bg-yellow-500",
    icon: "fa-user",
    type: true,
  },
]

const Dashboard = (props) => {
  const $token=localStorage.getItem('access_token');
    const [users, setUsers] = useState([]);
    const [order, setOrder] = useState([]);
    const [render, setRender] = useState([]);
    const [money, setMoney] = useState(null);
    const [today, setToday] = useState(null);
    const [yesterday, setYesterday] = useState(null);
    const [week, setWeek] = useState(null);
    const [month, setMonth] = useState(null);






    const getUser = () =>{
      fetch("http://localhost:8000/api/users/getAllUser", {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            setUsers(data.data);
        });
        return () => {
        }
    }
    const getOrder=()=>{
      fetch("http://localhost:8000/api/order/getOrder", {
          method: "GET",
          headers: {"Authorization": `Bearer `+$token}
        })
      .then(response => response.json())
      .then(data =>  {
          setOrder(data.data);
      });
      return () => {
      }
  }
  const getMoney=()=>{
    fetch("http://localhost:8000/api/order/getMoney", {
        method: "GET",
        headers: {"Authorization": `Bearer `+$token}
      })
    .then(response => response.json())
    .then(data =>  {
        setMoney(data.data);
    });
    return () => {
    }
}
const getCount=()=>{
  fetch("http://localhost:8000/api/order/getCount", {
      method: "GET",
      headers: {"Authorization": `Bearer `+$token}
    })
  .then(response => response.json())
  .then(data =>  {
      setToday(data.data[0]);
      setYesterday(data.data[1]);
      setWeek(data.data[2]);
      setMonth(data.data[3]);
  });
  return () => {
  }
}
    useEffect(() => {
      if($token){
        getUser();
        getOrder();
        getMoney();
        getCount();
      }
  }, [render])
  return(
  <div>
    <div className="grid grid-cols-3 gap-x-8">
      {
        analyzes.map((item, index) => (
          <div key={index} className={`shadow-md rounded p-5 text-white ${item.bgColor}`}>
            <h6 className="flex items-center justify-between">
              {item.name}
              <small className="opacity-7">Last 30 days</small>
            </h6>
            <div className="flex items-center justify-between mt-8">
              <div className="text-4xl">{item.name==='Customers'?users.length+" users":item.name==='Orders'?order.length+" orders":item.name==='Sales'?money+" đ":""} </div>
              <div className="h-16 w-16 border-white border-2 rounded-full overflow-hidden flex items-center justify-center">
                <i className={`fal ${item.icon} text-2xl`}></i>
              </div>
            </div>
            <p className="">
              {
                item.type ? <i className="fal fa-long-arrow-up"></i> : <i className="fal fa-long-arrow-down"></i>
              } 1.59%
            </p>
          </div>
        ))
      }
    </div>

    <div className="mt-8 bg-white rounded shadow-md">
      <div className="grid grid-cols-4 p-5">
        <div className="">
        <div className="">
          <p className="mb-2">This Year</p>
          <div className="flex items-end">
            <h2 className="text-3xl mr-2">{week} đ</h2>
            <span className="">
              <i className="fal fa-long-arrow-down mr-2"></i>
              <span className="text-xs text-red-600 inline-flex px-2 py-1 bg-red-200 rounded">1.9%</span>
            </span>
          </div>
        </div>
          <p className="mb-2">This Month</p>
          <div className="flex items-end">
            <h2 className="text-3xl mr-2">{month} đ</h2>
            <span className="">
              <i className="fal fa-long-arrow-up mr-2"></i>
              <span className="text-xs text-green-600 inline-flex px-2 py-1 bg-green-200 rounded">1.9%</span>
            </span>
          </div>
        </div>
        <div className="">
          <p className="mb-2">Yesterday</p>
          <div className="flex items-end">
            <h2 className="text-3xl mr-2">{yesterday} đ</h2>
            <span className="">
              <i className="fal fa-long-arrow-up mr-2"></i>
              <span className="text-xs text-green-600 inline-flex px-2 py-1 bg-green-200 rounded">2.2%</span>
            </span>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <p className="mb-2">Today</p>
          <div className="flex items-end">
            <h2 className="text-3xl mr-2">{today} đ</h2>
            <span className="">
              <i className="fal fa-long-arrow-down mr-2"></i>
              <span className="text-xs text-red-600 inline-flex px-2 py-1 bg-red-200 rounded">1.9%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
    }

export default Dashboard;
