import React, { useState, useEffect } from "react";
import axios from 'axios';
import apiUrl from '../api/api';

const UserSearch = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);
  const [dislikedUsers, setDislikedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/search/${currentUser._id}`);
        setUsers(response.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchUsers();
  }, []);
  
  useEffect(() => {
    const filteredUsers = users.filter((user) => {
      return (
        user._id !== currentUser._id &&
        currentUser.content.every((c) => user.content.includes(c)) &&
        currentUser.server.every((s) => user.server.includes(s))
      );
    });
  
    setFilteredUsers(filteredUsers);
  
    if (filteredUsers.length === 0) {
      setCurrentIndex(0);
    } else if (currentIndex >= filteredUsers.length - 1) {
      setCurrentIndex(filteredUsers.length);
    }
  }, [currentUser, users, currentIndex, filteredUsers.length]);
  
  
  

  const handleLike = async () => {
    const currentUserId = filteredUsers[currentIndex]._id;
    if (likedUsers.includes(currentUserId)) {
      setCurrentIndex(currentIndex + 1);
      return;
    }
    setLikedUsers([...likedUsers, currentUserId]);
    setCurrentIndex(currentIndex + 1);
  
    try {
      await axios.post(`${apiUrl}/users/${currentUser._id}/like`, { userId: currentUserId });
    } catch (err) {
      console.error(err);
    }
  };
  

  const handleDislike = () => {
    const currentUserId = filteredUsers[currentIndex]._id;
    setDislikedUsers([...dislikedUsers, currentUserId]);
    setCurrentIndex(currentIndex + 1);
  };

  if (filteredUsers.length === 0) {
    return <p>No matching users found.</p>;
  }
  
  if (currentIndex >= filteredUsers.length) {
    return <p>No more matches found.</p>;
  }
  
  const currentMatch = filteredUsers[currentIndex];
  const isLiked = likedUsers.includes(currentMatch._id);
  const isDisliked = dislikedUsers.includes(currentMatch._id);
  
  return (
    <>
      <h2>Matching Users</h2>
      <div>
        <p>{currentMatch.username}</p>
        {!isLiked && !isDisliked && (
          <>
            <button onClick={handleLike}>Like</button>
            <button onClick={handleDislike}>Dislike</button>
          </>
        )}
      </div>
    </>
  );
}

export default UserSearch;