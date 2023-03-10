import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../api/api';

const Message = ({ currentUser, matchedUser }) => {
  const navigate = useNavigate();

  const handleStartConversation = async () => {
    console.log('members', [currentUser._id, matchedUser._id]); // add this line
    try {
      // Create a new conversation with the matched user
      const response = await axios.post(`${apiUrl}/conversations`, {
        members: [currentUser._id, matchedUser._id],
      });
  
      // Redirect to the chat window with the new conversation ID
      const conversationId = response.data._id;
      navigate(`/chat/${conversationId}`);
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <button onClick={handleStartConversation}>Message</button>
  );
};

export default Message;
