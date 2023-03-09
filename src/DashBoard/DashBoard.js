import React from "react";
import { useNavigate } from 'react-router-dom';

function DashBoard(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    props.setToken(null); // call the setToken function from props and update it to null
    navigate('/'); // Redirect to the landing page
  }

  return (
    <div>
      <h1>Welcome to the dashboard!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default DashBoard;


