import React, { useState, useRef, useEffect } from 'react';
import ChatList from './chatList';
import ChatArea from './chatArea';
import Preloader from '../../../components/preloader';

const Chat = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const $token = localStorage.getItem('access_token');
    const [user, setUser] = useState({});
    const changeUser = (id, avatar, name) => {
        setUser({
            id: id,
            avatar: avatar,
            name: name,
        });
    };
    const messageEl = useRef(null);
    const [users, setUsers] = useState([]);

    const getMessages = () => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_URL_SERVER}/api/inbox`, {
            method: 'POST',
            headers: { Authorization: `Bearer ` + $token },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (!data.users) {
                    setUsers(null);
                } else {
                    setUsers(data.users);
                }
                setIsLoading(false);
            });
    };
    useEffect(() => {
        getMessages();
    }, []);
    return (
        <div
            className="shadow-xl rounded-lg overflow-hidden bg-white"
            style={{ height: 'calc(100vh - 140px)' }}
        >
            {isLoading && <Preloader />}
            <div className="flex">
                <ChatList changeUser={changeUser} users={users} />
                <ChatArea userClicked={user} />
            </div>
        </div>
    );
};

export default Chat;
