import React, { useState, useRef, useEffect } from 'react'
import Outgoing from './outgoing';
import Incoming from './incoming';

const ChatArea = (props) => {
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

    const fetchMessages = () => {
        setInterval(() => {
            // api
        }, 500);
    }
    
    useEffect(() => {
        // fetchMessages();
        if (messageEl) {
        messageEl.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        });
        }
    }, []);

    return (
        <div className="w-2/3">
            <h5>{props.idd}</h5>
            <div className="bg-white border-l border-gray-300">
                <div className="flex justify-between items-center p-6">
                    <div className="flex items-center space-x-2">
                        <img src={`${window.location.origin}/assets/images/slider/city.jpg`} className="w-10 h-10 rounded-full object-cover" alt="" />
                        <span className="font-medium line-2 leading-5">Lorem ipsum, dolor sit amet elit. Voluptatibus beatae a numquam! Ex recusandae deleniti porro, a nihil, officiis repudiandae doloribus neque aut maxime non cupiditate, iste cum saepe eos.</span>
                    </div>
                </div>
                <div className="bg-indigo-100 p-4 custom-scroll overflow-y-scroll shadow-inner" ref={messageEl} style={{ height: "calc(100vh - 284px)" }}>
                    {
                        messages.map((item, index) => (
                            item.type === "incoming" ? <Incoming key={index} {...item}/> : <Outgoing key={index} {...item}/>
                        ))
                    }
                </div>
                <form action="#" className="h-14 relative" onSubmit={handleMessage}>
                    <textarea type="text" className="block my-auto h-full px-4 py-3.5 custom-scroll outline-none resize-none" placeholder="Tin nhắn" style={{ width: "calc(100% - 64px)"}} onChange={handleOnchange} onKeyPress={handleKeyPress} value={message}/>
                    <button type="submit" className="absolute right-0 bottom-0 flex items-center justify-center w-16 h-full hover:bg-indigo-50">
                        <i className="fad fa-paper-plane text-indigo-500"></i>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatArea