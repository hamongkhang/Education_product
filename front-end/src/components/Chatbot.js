import React from "react";

const Chatbox = () => {
  return (
    <div>
      <div className="chat">
        <div className="chat-title">
          <h2>Văn gegege gegeeaksdkf skad sdfsd dsdasd ádas</h2>
          <figure className="avatar">
            <img src="https://honghot.net/wp-content/uploads/tong-hop-icon-mat-cuoi-chat-nhat-10.png" />
          </figure>
          <div className="header-nav">
            <ul>
              <li>
                <i className="fa fa-times"></i>
              </li>
            </ul>
          </div>
        </div>
        <div className="messages">
          <div className="messages-content" />
        </div>
        <div className="message-box">
          <textarea
            type="text"
            className="message-input"
            placeholder="Type message..."
          />
          <button type="submit" className="message-submit sound-on-click">
            Send
          </button>
        </div>
      </div>

      <div className="bt-chat">
        <div className="bg-chat"></div>
        <div className="icon-chat">
          <i className="fab fa-facebook-messenger"></i>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;