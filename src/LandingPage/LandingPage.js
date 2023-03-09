import React, { useState } from 'react';
import LoginForm from './Login';
import RegisterForm from './Register';

function LandingPage() {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleToggle = () => {
    setIsRegistering(!isRegistering);
  }

  return (
    <div>
      <h1>Welcome to LFG!</h1>
      {isRegistering ? <div><RegisterForm/></div> : <div><LoginForm/></div>}
      <button onClick={handleToggle}>{isRegistering ? "Already have an account? Login" : "Need to register? Create an account"}</button>
    </div>
  );
}

export default LandingPage;
