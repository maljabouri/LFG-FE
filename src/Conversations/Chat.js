import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../api/api';


const Chat = () => {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState(null);
  const [message, setMessage] = useState('');

  const fetchConversation = async () => {
    try {
      const response = await axios.get(`${apiUrl}/conversations/${conversationId}`);
      setConversation(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConversation();
  }, [conversationId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/messages`, {
        text: message,
        conversationId,
      });
      setConversation((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, response.data],
      }));
      setMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  if (!conversation) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Chat with {conversation.user1.username === 'me' ? conversation.user2.username : conversation.user1.username}</h2>
      <ul>
        {!conversation.messages ? (
          <p>No messages yet</p>
        ) : (
          conversation.messages.map((message) => (
            <li key={message._id}>
              {message.user.username}: {message.text}
            </li>
          ))
        )}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
