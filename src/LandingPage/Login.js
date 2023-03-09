import React, { useState } from 'react';
import axios from 'axios';
import apiUrl from '../api/api';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate(); // get the navigate function from react-router-dom

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting form...');
    try {
      const user = { username, password };
      const response = await axios.post(`${apiUrl}/login`, user);
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/frontpage');
      // redirect to some page that requires authentication
    } catch (err) {
      console.error(err);
      // handle error, like displaying an error message to the user
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} required />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
