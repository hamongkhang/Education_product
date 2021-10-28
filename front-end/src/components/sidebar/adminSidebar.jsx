import React from 'react'
import { Link, useLocation } from 'react-router-dom';


const sidebar = [
    {
        name: "Dashboard",
        icon: "fad fa-book-open",
        link: "/admin",
    },
    {
        name: "Table",
        icon: "fad fa-book-open",
        link: "/admin/table",
    },
    {
        name: "Form",
        icon: "fad fa-book-open",
        link: "/admin/form",
    },
    {
        name: "Text Editor",
        icon: "fad fa-book-open",
        link: "/admin/text-editor",
    },
    {
        name: "Chat",
        icon: "fad fa-book-open",
        link: "/admin/chat",
    },

]

const AdminSidebar = (props) => {
    const location = useLocation();
    return (
        <div className="w-72">
            <div className="fixed w-72 top-19">
                <div className="overflow-y-auto custom-scroll-2 bg-purple-800" style={{ height: "calc(100vh - 76px)" }}>
                    <div className="p-8 space-y-5">
                        {
                            sidebar.map((item, index) => (
                                <Link key={index} to={item.link} className={`flex items-center justify-between ${location.pathname === item.link ? "text-white" : "text-gray-300 hover:text-white"}`}>
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-10 h-10 flex items-center justify-center shadow-md rounded ${location.pathname === item.link ? "bg-white text-purple-800" : "bg-purple-700"}`}>
                                            <i className={item.icon}></i>
                                        </div>
                                        <div>
                                            <span>{item.name}</span>
                                        </div>
                                    </div>
                                    {/* <div>
                                        <i className="far fa-arrow-right"></i>
                                    </div> */}
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar