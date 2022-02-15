import React from 'react';

const formatTime = (timer) => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

const Countdown = ({ seconds, timer }) => {
    return (
        <div className="app">
            <p>Thời gian làm bài</p>
            <div className="stopwatch-card">
                <p>{formatTime(timer)}</p>
            </div>
        </div>
    );
};

export default Countdown;
