import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {v1 as uuid} from "uuid";
import "./styles.css";
//  import Message from "./Message";

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


const Imgs=()=> {
  const [messages, setMessages] = useState([]);
  const addMessages = () => {
    setMessages(m => [...m, uuid()]);
  };
  return (
    <div className="App">
      <button className="addButton" onClick={addMessages}>
        Add message
      </button>
      <Message messages={messages} ></Message>
    </div>
  );
}
export default Imgs


