import React, { useState, useRef, useEffect } from 'react'
import Outgoing from './outgoing';
import Incoming from './incoming';
import ChatList from './chatList';
import ChatArea from './chatArea';

const Chat = (props) => {
    const $token=localStorage.getItem('access_token');
    const [id, setID] = useState("");
    const changeID = (id) =>{
        console.log(id);
        setID(id)
    }
    const messageEl = useRef(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    
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

    const getMessages=()=>{
        fetch("http://localhost:8000/api/inbox", {
            method: "POST",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
           setUsers(data.users)
           console.log(data.users);
        });
        return () => {
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
   
    
    useEffect(() => {
        console.log('index');
        getMessages()
     }, []);
    return (
        <div className="shadow-xl rounded-lg overflow-hidden bg-white" style={{ height: "calc(100vh - 140px)" }}>
            <div className="flex">
                <ChatList changeID = {changeID} users={users}/>
                <ChatArea idd = {id}/>
            </div>
        </div>
    )
}

export default Chat