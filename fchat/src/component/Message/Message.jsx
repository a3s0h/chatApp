import React from 'react'
import "./Message.css";


const Message = ({ user, message, classs }) => {
    if (user) {
        return (
            <div>
                <div className={`messageBox ${classs}`}  >
                <h2 className='username-style'>{`~${user}`}</h2>
                <p className="msg">
                    {` ${message}`}

                </p>
                </div>
            </div>
        )
    }
    else {


        return (
            <div>
            <div className={`messageBox ${classs}`}>
                {`You: ${message}`}
            </div>
            </div>
        )
    }
}

export default Message
