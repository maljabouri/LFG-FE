import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import UserSearch from "../Matches/SearchUsers";
import ProfilePage from "../ProfilePage/ProfilePage";
import Matches from "../Matches/Matches";
import Messages from "../Conversations/Messages";

function DashBoard(props) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null);
  const [showMatches, setShowMatches] = useState(false);

  useEffect(() => {
    props.fetchCurrentUser();
  }, [props]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    props.setToken(null); // call the setToken function from props and update it to null
    navigate('/'); // Redirect to the landing page
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowMatches(false);
  };

  const handleShowMatches = () => {
    setActiveTab(null);
    setShowMatches(true);
  }

  return (
    <div>
      <h1>Welcome to the dashboard!</h1>
      <div>
        <button onClick={() => handleTabChange('userSearch')}>
          Search Users
        </button>
        <button onClick={() => handleTabChange('profile')}>
          Profile
        </button>
        <button onClick={handleShowMatches}>
          Matches
        </button>
      </div>
      
      {activeTab === 'userSearch' && <UserSearch currentUser={props.currentUser} />}
      {activeTab === 'profile' && <ProfilePage username={props.currentUser.username} />}
      {showMatches && <Matches currentUser={props.currentUser} />}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default DashBoard;
