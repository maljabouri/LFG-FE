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
        console.log('response.data', response.data)
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

    console.log('filteredUsers:', filteredUsers); 

    setFilteredUsers(filteredUsers);
    setCurrentIndex(0);
  }, [currentUser, users]);

  const handleLike = () => {
    const currentUserId = filteredUsers[currentIndex]._id;
    setLikedUsers([...likedUsers, currentUserId]);
    setCurrentIndex(currentIndex + 1);
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
};

export default UserSearch;
