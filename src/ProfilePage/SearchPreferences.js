import React, { useState } from 'react';
import axios from 'axios';
import apiUrl from '../api/api';



const SearchPreferences = ({ username }) => {
  const [server, setServer] = useState('');
  const [roles, setRoles] = useState([]);
  const [rolesInterest, setRolesInterest] = useState([]);
  const [content, setContent] = useState([]);
  const [rolesValid, setRolesValid] = useState(true);
  const [rolesInterestValid, setRolesInterestValid] = useState(true);
  const [contentValid, setContentValid] = useState(true);
  const [updateSuccessful, setUpdateSuccessful] = useState(false);  



  const handleServerChange = (event) => {
    setServer(event.target.value);
  };

  const handleRolesChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setRoles([...roles, value]);
      setRolesValid(true);
    } else {
      setRoles(roles.filter((role) => role !== value));
      setRolesValid(roles.length > 1);
    }
  };
  const handleRolesInterestChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setRolesInterest([...rolesInterest, value]);
      setRolesInterestValid(true);
      console.log(event.target)
    } else {
      setRolesInterest(rolesInterest.filter((role) => role !== value));
      setRolesInterestValid(rolesInterest.length > 1);
      console.log(`removed ${event.target}`)
    }
  };

  const handleContentChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setContent([...content, value]);
      setContentValid(true);
    } else {
      setContent(content.filter((type) => type !== value));
      setContentValid(roles.length > 1);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting form...')
    if (roles.length === 0 || content.length === 0 || rolesInterest.length === 0) {
      console.log('Please select at least one role and one content type.');
      setRolesValid(roles.length > 0);
      setContentValid(content.length > 0);
      setRolesInterestValid(rolesInterest.length > 0);
      return;
    }
  
    try {
      const updatedUser = {
          server,
          roles,
          content,
          interested_in_roles: rolesInterest        
      };
      await axios.put(`${apiUrl}/users/${username}/preferences`, updatedUser);
      setUpdateSuccessful(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {updateSuccessful ? (
        <p>You have successfully registered! You can now login.</p>
      ) :
        <form onSubmit={handleSubmit}>          
          <label>
            Server:
            <select value={server} onChange={handleServerChange} required>
              <option value="">Select a server</option>
              <option value="EU">EU</option>
              <option value="US">US</option>
            </select>
          </label>
          <fieldset>
            <label>
              <legend>Roles:</legend>
              <div>
                <label>
                  Tank
                  <input type="checkbox" value="tank" onChange={handleRolesChange} />
                </label>
                <label>
                  DPS
                  <input type="checkbox" value="dps" onChange={handleRolesChange} />
                </label>
                <label>
                  Healer
                  <input type="checkbox" value="healer" onChange={handleRolesChange} />
                </label>
              </div>
              {!rolesValid && (
                <span style={{ color: "red" }}>Please select at least one role</span>
              )}
            </label>
          </fieldset>
          <fieldset>
            <legend>Content</legend>
            <div>
              <label>
                Raid
                <input type="checkbox" value="raid" onChange={handleContentChange} />
              </label>
              <label>
                Dungeon
                <input type="checkbox" value="dungeon" onChange={handleContentChange} />
              </label>
            </div>
            {!contentValid && (
              <span style={{ color: "red" }}>Please select at least one content type</span>
            )}
          </fieldset>
          <fieldset>
            <legend>Roles you are Interested in finding:</legend>
            <div>
              <label>
                Tank
                <input type="checkbox" value="tank" onChange={handleRolesInterestChange} />
              </label>
              <label>
                DPS
                <input type="checkbox" value="dps" onChange={handleRolesInterestChange} />
              </label>
              <label>
                Healer
                <input type="checkbox" value="healer" onChange={handleRolesInterestChange} />
              </label>
            </div>
            {!rolesInterestValid && (
              <span style={{ color: "red" }}>Please select at least one role you are interested in finding</span>
            )}
          </fieldset>

          <button type="submit">Save Changes</button>
        </form>
      }
    </>
  );
}

export default SearchPreferences