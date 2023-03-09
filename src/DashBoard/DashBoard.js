import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import UserSearch from "../Matches/Matches";
import ProfilePage from "../ProfilePage/ProfilePage";
import axios from 'axios';
import apiUrl from '../api/api';

function DashBoard(props) {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/${username}/details`);
        setCurrentUser(response.data);
        console.log(response.data)
      } catch (err) {
        console.error(err);
      }
    };
    fetchCurrentUser();
  }, [username]);
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    props.setToken(null); // call the setToken function from props and update it to null
    navigate('/'); // Redirect to the landing page
  }

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome to the dashboard!</h1>
      <UserSearch currentUser={currentUser} />
      <ProfilePage username={currentUser.username} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default DashBoard;
