import React, { useState, useEffect } from "react";
import axios from 'axios';
import apiUrl from '../api/api';
import { Link, useNavigate } from 'react-router-dom';

const Matches = ({ currentUser }) => {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      if (!currentUser) {
        return;
      }
      try {
        const response = await axios.get(`${apiUrl}/users/matches/${currentUser._id}`);
        setMatches(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMatches();
  }, [currentUser]);

  const handleCreateConversation = async (user2) => {
    try {
      const response = await axios.post(`${apiUrl}/conversations`, {
        user1: currentUser._id,
        user2
      });
      navigate(`/messages/${response.data._id}`);
    } catch (err) {
      console.error(err);
    }
  }
  

  const handleLinkClick = async (recipientId) => {
    try {
      const response = await axios.get(`${apiUrl}/conversations?user1=${currentUser._id}&user2=${recipientId}`);
      const conversation = response.data;
      if (conversation && conversation._id) {
        navigate(`/messages/${conversation._id}`);
      } else {
        handleCreateConversation(recipientId);
      }
    } catch (err) {
      console.error(err);
    }
  }
  
  

  return (
    <>
      <h2>Your Matches</h2>
      {matches.length === 0 && <p>No matches found.</p>}
      {matches.map((match) => (
        <div key={match._id}>
          <p>{match.username}</p>
          <button onClick={() => handleLinkClick(match._id)}>Message</button>
        </div>
      ))}
    </>
  );
};

export default Matches;
