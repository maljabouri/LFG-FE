import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import axios from 'axios';
import apiUrl from '../api/api';

const Messages = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const location = useLocation();
  const receiverId = location.pathname.split("/")[2];
  const chatRef = useRef(null);

  useEffect(() => {
    if (!currentUser || !receiverId) {
      return;
    }
    const newSocket = io.connect("http://localhost:5002", {
      query: { userId: currentUser._id },
    });

    newSocket.emit("join room", { receiverId });

    newSocket.on("new message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [currentUser, receiverId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUser || !receiverId) {
        return;
      }
      try {
        const response = await axios.get(
          `${apiUrl}/messages/${currentUser._id}/${receiverId}`
        );
        setMessages(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [currentUser, receiverId]);

  const handleMessageSend = (e) => {
    e.preventDefault();
    if (!message || !socket) {
      return;
    }
    const data = {
      senderId: currentUser._id,
      receiverId,
      message,
      timestamp: Date.now(),
    };
    socket.emit("new message", data);
    setMessages((prevMessages) => [...prevMessages, data]);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleMessageSend(e);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <h2>Messages</h2>
      <div ref={chatRef} style={{ height: "200px", overflowY: "scroll" }}>
        {messages.map((msg) => (
          <div key={msg.timestamp}>
            {msg.senderId === currentUser._id ? (
              <p>You: {msg.message}</p>
            ) : (
              <p>{msg.message}</p>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleMessageSend}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Messages;
