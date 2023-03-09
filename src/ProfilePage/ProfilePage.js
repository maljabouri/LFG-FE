import React, { useState } from 'react';
import SearchPreferences from './SearchPreferences';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

const ProfilePage = ({ username }) => {
  const [activeTab, setActiveTab] = useState('searchPreferences');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        <button onClick={() => handleTabChange('searchPreferences')}>
          Search Preferences
        </button>
        <button onClick={() => handleTabChange('changePassword')}>
          Change Password
        </button>
        <button onClick={() => handleTabChange('deleteAccount')}>
          Delete Account
        </button>
      </div>
      {activeTab === 'searchPreferences' && <SearchPreferences username={username} />}
      {activeTab === 'changePassword' && <ChangePassword username={username} />}
      {activeTab === 'deleteAccount' && <DeleteAccount />}
    </div>
  );
};

export default ProfilePage;
