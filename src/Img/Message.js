import React,{useRef, useEffect} from 'react'

const Message = ({ messages }) => {
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages]);
  
    return (
      <div className="messagesWrapper">
        {messages.map(message => (
          <span key={message}>{message}</span>
        ))}
        <div ref={messagesEndRef} />
      </div>
    );
  };

export default Message
