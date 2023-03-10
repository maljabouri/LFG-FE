import React, { useState } from 'react';
import SearchPreferences from './SearchPreferences';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

const ProfilePage = ({ username }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [showSearchPreferences, setShowSearchPreferences] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    if (tab === 'searchPreferences') {
      setShowSearchPreferences(true);
      setShowChangePassword(false);
      setShowDeleteAccount(false);
    } else if (tab === 'changePassword') {
      setShowSearchPreferences(false);
      setShowChangePassword(true);
      setShowDeleteAccount(false);
    } else if (tab === 'deleteAccount') {
      setShowSearchPreferences(false);
      setShowChangePassword(false);
      setShowDeleteAccount(true);
    }
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
      {showSearchPreferences && <SearchPreferences username={username} />}
      {showChangePassword && <ChangePassword username={username} />}
      {showDeleteAccount && <DeleteAccount username={username} />}
    </div>
  );
};

export default ProfilePage;
