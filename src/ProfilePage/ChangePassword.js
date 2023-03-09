import React, { useState } from 'react';
import axios from 'axios';
import apiUrl from '../api/api';

const ChangePassword = ({ username }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPasswordValid, setCurrentPasswordValid] = useState(true);
  const [newPasswordValid, setNewPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [updateSuccessful, setUpdateSuccessful] = useState(false);

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!currentPassword || !newPassword || !confirmPassword) {
      console.log('Please fill out all fields.');
      setCurrentPasswordValid(!!currentPassword);
      setNewPasswordValid(!!newPassword);
      setConfirmPasswordValid(!!confirmPassword);
      return;
    }
  
    if (newPassword !== confirmPassword) {
      console.log('New password and confirm password do not match.');
      setNewPasswordValid(false);
      setConfirmPasswordValid(false);
      return;
    }
  
    try {
      const response = await axios.patch(
        `${apiUrl}/users/${username}/password`,
        { currentPassword, newPassword }
      );
      console.log(response);
      setUpdateSuccessful(true);
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <>
      {updateSuccessful ? (
        <p>Password updated successfully!</p>
      ) :
        <form onSubmit={handleSubmit}>
          <label>
            Current Password:
            <input type="password" value={currentPassword} onChange={handleCurrentPasswordChange} required />
          </label>
          {!currentPasswordValid && (
            <span style={{ color: "red" }}>Incorrect current password</span>
          )}
          <br />
          <label>
            New Password:
            <input type="password" value={newPassword} onChange={handleNewPasswordChange} required />
          </label>
          {!newPasswordValid && (
            <span style={{ color: "red" }}>Please enter a new password</span>
          )}
          <br />
          <label>
            Confirm New Password:
            <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
          </label>
          {!confirmPasswordValid && (
            <span style={{ color: "red" }}>Passwords do not match</span>
          )}
          <br />
          <button type="submit">Save Changes</button>
        </form>
      }
    </>
  );
};

export default ChangePassword;
