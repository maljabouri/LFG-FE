import React from "react";
import { useNavigate } from 'react-router-dom';
import Matches from '../Matches/Matches';
import ProfilePage from "../ProfilePage/ProfilePage";

function DashBoard(props) {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    props.setToken(null); // call the setToken function from props and update it to null
    navigate('/'); // Redirect to the landing page
  }

  return (
    <div>
      <h1>Welcome to the dashboard!</h1>
      {/* <Matches /> */}
      <ProfilePage username={username} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default DashBoard;


