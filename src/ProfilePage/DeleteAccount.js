import React, { useState } from 'react';
import axios from 'axios';
import apiUrl from '../api/api';
import { useNavigate } from 'react-router-dom';

const DeleteProfile = ({ username }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [deleteSuccessful, setDeleteSuccessful] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDeleteSuccess = () => {
    setDeleteSuccessful(true);
    setTimeout(() => {
      navigate('/');
    }, 2000); // Wait 2 seconds before redirecting to front page
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password) {
      console.log('Please enter your password.');
      setPasswordValid(false);
      return;
    }

    try {
      const response = await axios.delete(`${apiUrl}/users/me`, {
        data: {
          username,
          password
        }
      });
      console.log(response);
      console.log('Profile deleted successfully.');
      handleDeleteSuccess();
    } catch (err) {
      console.error(err);
      setPasswordValid(false);
    }
  };

  return (
    <>
      {deleteSuccessful ? (
        <div className="modal">
          <p>Profile deleted successfully.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p>Are you sure you want to delete your profile? This action cannot be undone.</p>
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} required />
          </label>
          {!passwordValid && (
            <span style={{ color: "red" }}>Please enter your password.</span>
          )}
          <br />
          <button type="submit">Delete Profile</button>
        </form>
      )}
    </>
  );
};

export default DeleteProfile;
