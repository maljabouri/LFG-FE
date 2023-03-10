import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../api/api';
import { useNavigate } from 'react-router-dom';
import Message from '../Conversations/Messages';

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

  return (
    <>
      <h2>Your Matches</h2>
      {matches.length === 0 && <p>No matches found.</p>}
      {matches.map((match) => (
        <div key={match._id}>
          <p>{match.username}</p>
          <p>Roles Played: {match.roles.join(' ')}</p>
          <p>Interested in grouping for the following content: {match.content.join("s, ")}s</p>
          <Message currentUser={currentUser} matchedUser={match} />
        </div>
      ))}
    </>
  );
};

export default Matches;
