import React, { useEffect, useState } from 'react';
import ReplyComment from './replyComment';
import InputReply from './inputReply';
import { toast } from 'react-toastify';

toast.configure();

const Comment = ({ item, replyComment, amountReply, setCommentReply }) => {
    const [reply, setReply] = useState('hidden');
    const [icon, setIcon] = useState('down');
    const [txt, setTxt] = useState(
        `Xem ${amountReply ? amountReply : 'thêm'} câu trả lời`,
    );
    const [inputReply, setInputRepply] = useState('hidden');
    const [inputComment, setInputComment] = useState('');
    const $token = localStorage.getItem('access_token');

    const handleReplyArea = () => {
        if (reply === 'hidden') {
            setReply('block');
            setIcon('up');
            setTxt('Ẩn câu trả lời');
        } else {
            setReply('hidden');
            setIcon('down');
            setTxt(`Xem ${amountReply} câu trả lời`);
        }
    };

    const handleInputReply = () => {
        inputReply === 'hidden'
            ? setInputRepply('block')
            : setInputRepply('hidden');
    };

    const onChange = (e) => {
        setInputComment(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if ($token) {
            const _formData = new FormData();
            _formData.append('message', inputComment);
            _formData.append('lessonId', item.lessonId);
            _formData.append('id_reply', item.id);
            const requestOptions = {
                method: 'POST',
                body: _formData,
                headers: { Authorization: `Bearer ` + $token },
            };
            fetch(
                `${process.env.REACT_APP_URL_SERVER}/api/comment/replyComment`,
                requestOptions,
            )
                .then((res) => res.json())
                .then((json) => {
                    if (json.message) {
                        toast.info(`${json.message}`, {
                            position: 'top-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else {
                        setCommentReply(json.data);
                        handleInputReply();
                        setInputComment('');
                    }
                });
        } else {
            toast.warn(`Bạn chưa đăng nhập!`, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        e.target.reset();
    };

    useEffect(() => {
        return () => {
            setTxt(`Xem ${amountReply} câu trả lời`);
        };
    }, []);

    return (
        <div>
            <div className="mx-0 md:mx-3">
                <div className="flex mt-2 space-x-3">
                    <div>
                        <img
                            src={`${window.location.origin}/assets/images/slider/city.jpg`}
                            className="rounded-full w-10 h-10 object-cover"
                            alt=""
                        />
                    </div>
                    <div className="block bg-gray-200 mr-1 rounded-xl py-2 px-3 w-10/12 max-w-lg">
                        <p>{item.message}</p>
                    </div>
                </div>
                <div className="text-sm font-bold text-gray-600 ml-14 pt-2">
                    <span
                        className="hover:underline cursor-pointer"
                        onClick={handleInputReply}
                    >
                        Trả lời
                    </span>
                    &nbsp;·&nbsp;
                    <span>1 giờ trước</span>
                </div>
                <div className={`ml-0 xs:ml-10 ${inputReply}`}>
                    <InputReply
                        handleInputReply={handleInputReply}
                        onChange={onChange}
                        onSubmit={onSubmit}
                    />
                </div>
            </div>
            {replyComment && replyComment.length ? (
                <div
                    className="space-x-2 ml-14 md:ml-16 hover:text-gray-600 cursor-pointer"
                    onClick={handleReplyArea}
                >
                    <span>{txt}</span>
                    <i className={`fa fa-angle-${icon}`}></i>
                </div>
            ) : (
                ''
            )}
            {/* Reply comment */}
            <div
                className={`border-l-2 border-yellow-400 ml-0 xs:ml-16 ${reply}`}
            >
                {replyComment
                    ? replyComment.map((itemReply, index) => (
                          <ReplyComment key={index} replyComment={itemReply} />
                      ))
                    : ''}
            </div>
        </div>
    );
};

export default Comment;
