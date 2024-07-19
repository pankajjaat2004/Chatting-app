// frontend/src/components/Chat.jsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [media, setMedia] = useState(null);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    const msg = { content: message, media };
    socket.emit('message', msg);
    setMessage('');
    setMedia(null);
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.content}</p>
            {msg.media && <img src={msg.media} alt="media" />}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setMedia(URL.createObjectURL(e.target.files[0]))}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
