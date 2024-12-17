import React, { useState } from 'react';
import { fetchChatResponse } from '../services/api';
import './ChatWindow.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user', timestamp: new Date() };
      setMessages([...messages, newMessage]);

      const response = await fetchChatResponse(input);
      const botMessage = { text: response.data.message, sender: 'bot', timestamp: new Date() };

      setMessages((prev) => [...prev, botMessage]);
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender}`}>
            <div>{msg.text}</div>
            <span className="timestamp">{msg.timestamp.toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
