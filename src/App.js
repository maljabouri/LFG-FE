import React, { useState, useEffect } from 'react';
import LandingPage from "./LandingPage/LandingPage";
import DashBoard from "./DashBoard/DashBoard"
import LoginForm from "./LandingPage/Login";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div>      
      <h1>LFG</h1>
      <h2>Looking for Gamers</h2>
      <Router>
        <Routes>
          <Route path="/" element={token ? <Navigate to="/frontpage" /> : <LandingPage />} />
          <Route path="/frontpage" element={<DashBoard setToken={setToken} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App