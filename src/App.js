import React, { useState } from 'react';
import LandingPage from "./LandingPage/LandingPage";
import DashBoard from "./DashBoard/DashBoard"
import Messages from './Conversations/Messages';
import Chat from './Conversations/Chat';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import apiUrl from './api/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));  
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    const username = localStorage.getItem('username');
    try {
      const response = await axios.get(`${apiUrl}/users/${username}/details`);
      setCurrentUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>      
      <h1>LFG</h1>
      <h2>Looking for Gamers</h2>
      <Router>
        <Routes>
          <Route path="/" element={token ? <Navigate to="/frontpage" /> : <LandingPage />} />
          <Route path="/frontpage" element={<DashBoard setToken={setToken} currentUser={currentUser} fetchCurrentUser={fetchCurrentUser} />} />
          <Route path="/messages/:id" element={<Messages currentUser={currentUser} />} />
          <Route path="/chat/:conversationId" element={<Chat currentUser={currentUser} />} />          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
