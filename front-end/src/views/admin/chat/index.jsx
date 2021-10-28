import React, { useState, useRef, useEffect } from 'react'
import Outgoing from './outgoing';
import Incoming from './incoming';
import ChatList from './chatList';
import ChatArea from './chatArea';

const Chat = (props) => {
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
    
    // useEffect(() => {
    //     // fetchMessages();
    //     if (messageEl) {
    //     messageEl.current.addEventListener('DOMNodeInserted', event => {
    //         const { currentTarget: target } = event;
    //         target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
    //     });
    //     }
    // }, []);

    return (
        <div className="shadow-xl rounded-lg overflow-hidden bg-white" style={{ height: "calc(100vh - 140px)" }}>
            <div className="flex">
                <ChatList/>
                <ChatArea/>
            </div>
        </div>
    )
}

export default Chat