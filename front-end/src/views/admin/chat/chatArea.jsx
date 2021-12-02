import React, { useState, useRef, useEffect } from 'react';
import Outgoing from './outgoing';
import Incoming from './incoming';

const ChatArea = (props) => {
    const [messages, setMessages] = useState([]);
    const messageEl = useRef(null);
    const [message, setMessage] = useState('');
    const $token = localStorage.getItem('access_token');
    const handleOnchange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage(e);
        }
    };

    const getMessages = () => {
        if (props.userClicked.id) {
            const _formData = new FormData();
            _formData.append('sender_id', props.userClicked.id);
            if ($token) {
                const requestOptions = {
                    method: 'POST',
                    body: _formData,
                    headers: { Authorization: `Bearer ` + $token },
                };
                fetch('http://127.0.0.1:8000/api/inbox_admin', requestOptions)
                    .then((res) => res.json())
                    .then((data) => {
                        let data_messages = data.messages;
                        data_messages.reverse();
                        setMessages(data_messages);
                    });
            }
        }
    };
    const sendMessage = (e) => {
        e.preventDefault();
        if ($token) {
            const _formData = new FormData();
            _formData.append('message', message);
            _formData.append('sender_id', props.userClicked.id);
            const requestOptions = {
                method: 'POST',
                headers: { Authorization: `Bearer ` + $token },
                body: _formData,
            };
            fetch('http://127.0.0.1:8000/api/sendmess', requestOptions)
                .then((res) => res.json())
                .then((json) => {
                    if (json.access_token) {
                        localStorage.setItem(
                            'access_token_chat',
                            json.access_token,
                        );
                    }
                    getMessages();
                    setMessage('');
                });
        }
    };

    useEffect(() => {
        console.log('render chat area');
        const interval = setInterval(() => {
            getMessages();
        }, 20000);
        getMessages();
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', (event) => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
        return () => clearInterval(interval);
    }, [props.userClicked]);

    return (
        <div className="w-2/3">
            <div className="bg-white border-l border-gray-300">
                <div className="flex justify-between items-center p-6">
                    <div className="flex items-center space-x-2">
                        {props.userClicked.avatar ? (
                            <img
                                src={`http://localhost:8000/upload/images/avatar/${props.userClicked.avatar}`}
                                className="w-10 h-10 rounded-full object-cover"
                                alt=""
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full object-cover"></div>
                        )}
                        <span className="font-medium line-2 leading-5">
                            {props.userClicked.name}
                        </span>
                    </div>
                </div>
                <div
                    className="bg-indigo-100 p-4 custom-scroll overflow-y-scroll shadow-inner"
                    ref={messageEl}
                    style={{ height: 'calc(100vh - 284px)' }}
                >
                    {messages
                        ? messages.map((item, index) =>
                              item.user_id === props.userClicked.id ? (
                                  <Incoming
                                      key={index}
                                      {...item}
                                      avatar={props.userClicked.avatar}
                                  />
                              ) : (
                                  <Outgoing key={index} {...item} />
                              ),
                          )
                        : ''}
                </div>
                <form
                    action="#"
                    className="h-14 relative"
                    onSubmit={sendMessage}
                >
                    <textarea
                        type="text"
                        name="message"
                        className="block my-auto h-full px-4 py-3.5 custom-scroll outline-none resize-none"
                        placeholder="Tin nhắn"
                        style={{ width: 'calc(100% - 64px)' }}
                        onChange={handleOnchange}
                        onKeyPress={handleKeyPress}
                        value={message}
                    />
                    <button
                        type="submit"
                        className="absolute right-0 bottom-0 flex items-center justify-center w-16 h-full hover:bg-indigo-50"
                    >
                        <i className="fad fa-paper-plane text-indigo-500"></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatArea;
