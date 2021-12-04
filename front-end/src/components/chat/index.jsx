import React, { useState, useRef, useEffect } from 'react';
import Outgoing from './outgoing';
import Incoming from './incoming';

const Chat = (props) => {
    const [messages, setMessages] = useState([]);
    const messageEl = useRef(null);
    const [message, setMessage] = useState('');
    const [userID, setUserId] = useState('');
    const [classesChatbox, setClassesChatbox] = useState('w-0 h-0');
    const [classesBtnChatbox, setClassesBtnChatbox] = useState('block');
    var $token = localStorage.getItem('access_token_chat');
    var $login_token = localStorage.getItem('access_token');

    const handleChatbox = () => {
        if (classesChatbox === 'w-0 h-0') {
            setClassesChatbox('w-80 h-508');
            setClassesBtnChatbox('hidden');
        } else {
            setClassesChatbox('w-0 h-0');
            setClassesBtnChatbox('block');
        }
    };

    const handleOnchange = (e) => {
        setMessage(e.target.value);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessageAPI(e);
        }
    };
    const checkToken = () => {
        $token = localStorage.getItem('access_token_chat');
        $login_token = localStorage.getItem('access_token');

        if ($token != null && $login_token == null) {
            return $token;
        } else {
            return $login_token;
        }
    };
    const getUserID = () => {
        var token = '';
        token = checkToken();
        if (token) {
            const requestOptions = {
                method: 'POST',
                headers: { Authorization: `Bearer ` + token },
            };
            fetch(
                `${process.env.REACT_APP_URL_SERVER}/api/users/userProfile`,
                requestOptions,
            )
                .then((res) => res.json())
                .then((json) => {
                    if (json.id) {
                        setUserId(json.id);
                    } else {
                        setUserId(null);
                    }
                });
        }
    };
    const getMessagesAPI = (token) => {
        if (token == null) {
            token = checkToken();
        }
        const requestOptions = {
            method: 'POST',
            headers: { Authorization: `Bearer ` + token },
        };
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/inbox`, requestOptions)
            .then((res) => res.json())
            .then((json) => {
                let data_messages = json.messages;
                data_messages.reverse();
                let data = data_messages.map((m) => {
                    return {
                        ...m,
                        image: './assets/images/slider/city.jpg',
                    };
                });
                getUserID();
                setMessages(data);
            });
    };
    const sendMessageAPI = (e) => {
        e.preventDefault();
        var token = '';
        token = checkToken();
        if (token) {
            const _formData = new FormData();
            _formData.append('message', message);
            _formData.append('sender_id', 0);
            const requestOptions = {
                method: 'POST',
                headers: { Authorization: `Bearer ` + token },
                body: _formData,
            };
            fetch(
                `${process.env.REACT_APP_URL_SERVER}/api/sendmess`,
                requestOptions,
            )
                .then((res) => res.json())
                .then((json) => {
                    if (json.access_token) {
                        localStorage.setItem(
                            'access_token_chat',
                            json.access_token,
                        );
                    }
                    getUserID();
                    getMessagesAPI(null);
                    setMessage('');
                });
        } else {
            const _formData = new FormData();
            _formData.append('message', message);
            _formData.append('sender_id', -1);
            const requestOptions = {
                method: 'POST',
                body: _formData,
            };
            fetch(
                `${process.env.REACT_APP_URL_SERVER}/api/sendmess`,
                requestOptions,
            )
                .then((res) => res.json())
                .then((json) => {
                    if (json.access_token) {
                        localStorage.setItem(
                            'access_token_chat',
                            json.access_token,
                        );
                    }
                    getMessagesAPI(json.access_token);
                    getUserID();
                    setMessage('');
                });
        }
    };
    const fetchMessages = () => {
        setInterval(() => {
            getMessagesAPI(null);
        }, 20000);
    };

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            fetchMessages();
            getUserID();
        }
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', (event) => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, []);

    return (
        <div>
            <div
                className={`w-0 h-0 z-50 duration-300 fixed bottom-14 right-5 sm:bottom-10 sm:right-10 shadow-xl rounded-lg overflow-hidden bg-white ${classesChatbox}`}
            >
                <div className="flex justify-between items-center p-4">
                    <div className="flex items-center space-x-2">
                        <img
                            src="./assets/images/slider/city.jpg"
                            className="w-10 h-10 rounded-full object-cover"
                            alt=""
                        />
                        <span className="font-medium line-2 leading-5">
                            Tư vấn VatLy365
                        </span>
                    </div>
                    <div>
                        <i
                            className="far fa-times chat-close text-xl mr-2 hover:text-yellow-700 duration-200 cursor-pointer"
                            onClick={handleChatbox}
                        ></i>
                    </div>
                </div>
                <div
                    className="bg-indigo-100 p-4 custom-scroll h-96 overflow-y-scroll shadow-inner"
                    ref={messageEl}
                >
                    {messages.map((item, index) =>
                        item.receiver === userID ? (
                            <Incoming key={index} {...item} />
                        ) : (
                            <Outgoing key={index} {...item} />
                        ),
                    )}
                </div>
                <form
                    action="#"
                    className="h-14 relative"
                    onSubmit={sendMessageAPI}
                >
                    <textarea
                        type="text"
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

            <div
                className={`fixed bottom-5 right-5 sm:bottom-14 sm:right-14 cursor-pointer w-12 h-12 sm:w-14 sm:h-14  mb-2 flex items-center justify-center rounded-full duration-500 bg-white ${classesBtnChatbox}`}
                onClick={handleChatbox}
            >
                <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-tr to-red-500 from-blue-600 opacity-75" />
                <i className="fab fa-facebook-messenger mt-1 bg-gradient-to-tr to-red-500 from-blue-600 text-transparent bg- text-3xl sm:text-4xl bg-clip-text"></i>
            </div>
        </div>
    );
};

export default Chat;
