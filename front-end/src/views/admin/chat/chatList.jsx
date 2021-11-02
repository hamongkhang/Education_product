import React, { useState, useRef, useEffect } from 'react'
import Outgoing from './outgoing';
import Incoming from './incoming';

const ChatList = (props) => {
    const {changeID} = props
    const {users} = props
    const [messages, setMessages] = useState([{
        type: "incoming",
        image: "./assets/images/slider/city.jpg",
        message: "Lorem ipsum, dolor sit amet elit."
    },
    {
        type: "incoming",
        image: "./assets/images/slider/city.jpg",
        message: "Admin gửi user"
    },
    {
        type: "outgoing",
        image: "./assets/images/slider/city.jpg",
        message: "Lorem ipsum, dolor sit amet elit."
    },
    {
        type: "outgoing",
        image: "./assets/images/slider/city.jpg",
        message: "Admin gửi user"
    },
    {
        type: "incoming",
        image: "./assets/images/slider/city.jpg",
        message: "Lorem ipsum, dolor sit amet elit."
    },
    {
        type: "incoming",
        image: "./assets/images/slider/city.jpg",
        message: "Admin gửi user lần 2"
    },
    
    ]);
    const messageEl = useRef(null);
    const [message, setMessage] = useState("");
    
    const handleOnchange = (e) => {
        setMessage(e.target.value);
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            handleMessage(e);
        }
    }

    const handleMessage = (e) => {
        e.preventDefault();
        if(message.trim()) {
            let messTerm = {
                type: "outgoing",
                image: "",
                message: message,
            }
            messages.push(messTerm);
            setMessage("");
        }
    }
    useEffect(() => {
        console.log("chatList");
     }, []);
    return (
        <div className="w-1/3">
            <div className="p-6">
                <form action="" className="flex">
                    <input type="text" className="border-none px-3 py-2 placeholder-gray-300 text-gray-600 bg-white rounded rounded-r-none text-sm shadow w-full ease-linear transition-all duration-150 outline-none" placeholder="Tìm kiếm tin nhắn" />
                    <button type="submit" className="px-3 bg-white rounded-l-none text-sm shadow focus:outline-none hover:bg-gray-100">
                        <i className="far fa-search"></i>
                    </button>
                </form>
            </div>
            <div className="mt-1 border-t border-gray-300 ">
                <div className="overflow-y-scroll custom-scroll shadow-inner p-6 space-y-4" style={{ height: "calc(100vh - 252px)" }}>
                    {
                        users.map((item,index)=>{
                            <div className="shadow flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100">
                                <div className="mr-4">
                                    <img className="w-12 h-12 object-cover rounded-full" srcset={`${window.location.origin}/assets/images/slider/city.jpg 2x`} />
                                </div>
                                <div onClick={()=>changeID(1)}>
                                    <h3 className="line-1 font-semibold">{item.fullName}</h3>
                                    <span className="line-1 text-gray-500">Last message</span>
                                    {/* <button >cai nut</button> */}
                                </div>
                            </div>                    
                        })
                    }
                    
                </div>
                
            </div>
        </div>
    )
}

export default ChatList