import React, { useState } from 'react';
import axios from 'axios';

let apiUrl;
const expressPort = 5001;
const apiUrls = {
    development: `http://localhost:${expressPort}/api`,
    production: `https://example.domain.com/api`
}

if (window.location.hostname === 'localhost') {
    apiUrl = apiUrls.development;
} else {
    apiUrl = apiUrls.production;
}

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [server, setServer] = useState('');
  const [roles, setRoles] = useState([]);
  const [content, setContent] = useState([]);
  const [rolesValid, setRolesValid] = useState(true);
  const [contentValid, setContentValid] = useState(true);
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

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

  const handleContentChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setContent([...content, value]);
    } else {
      setContent(content.filter((type) => type !== value));
    }
    setContentValid(content.length > 0);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting form...')
    if (roles.length === 0 || content.length === 0) {
      console.log('Please select at least one role and one content type.');
      setRolesValid(roles.length > 0);
      setContentValid(content.length > 0);
      return;
    }
    try {
      const newUser = {
        name,
        email,
        password,
        username,
        server,
        roles,
        content,
      };
      const response = await axios.post(`${apiUrl}/register`, newUser);
      setRegistrationSuccessful(true);
      // do something with response, like redirect to a success page
    } catch (err) {
      console.error(err);
      // handle error, like displaying an error message to the user
    }
  };

  return (
    <>
    {registrationSuccessful ? (
      <p>You have successfully registered! You can now login.</p>
    ) :
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} required />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} required />
      </label>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} required />
      </label>
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

      <button type="submit">Register</button>
    </form>
}
    </>
  );
  }
  
  export default RegisterForm