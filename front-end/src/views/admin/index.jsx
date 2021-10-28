import React from "react";

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
    type: false,
  },
]

const Dashboard = (props) => (
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
              <div className="text-4xl">47,033</div>
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
          <p className="mb-2">This Month</p>
          <div className="flex items-end">
            <h2 className="text-3xl mr-2">$41,235</h2>
            <span className="">
              <i className="fal fa-long-arrow-up mr-2"></i>
              <span className="text-xs text-green-600 inline-flex px-2 py-1 bg-green-200 rounded">1.9%</span>
            </span>
          </div>
        </div>
        <div className="">
          <p className="mb-2">This Week</p>
          <div className="flex items-end">
            <h2 className="text-3xl mr-2">$10,180</h2>
            <span className="">
              <i className="fal fa-long-arrow-down mr-2"></i>
              <span className="text-xs text-red-600 inline-flex px-2 py-1 bg-red-200 rounded">1.9%</span>
            </span>
          </div>
        </div>
        <div className="">
          <p className="mb-2">Yesterday</p>
          <div className="flex items-end">
            <h2 className="text-3xl mr-2">$1,180</h2>
            <span className="">
              <i className="fal fa-long-arrow-up mr-2"></i>
              <span className="text-xs text-green-600 inline-flex px-2 py-1 bg-green-200 rounded">2.2%</span>
            </span>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <p className="mb-2">Today</p>
          <div className="flex items-end">
            <h2 className="text-3xl mr-2">$780</h2>
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

export default Dashboard;
