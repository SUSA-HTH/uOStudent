import React from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputFields';
import Button from '../components/Button';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    alert('Logged in successfully!');
  };

  const goToSignUp = () => {
    navigate('/create-account');
  };
    
  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <h1>Log in</h1>
      <InputField type="email" placeholder="Email" />
      <InputField type="password" placeholder="Password" />
      <Button label="Log in" onClick={handleLogin} className="login-button" />
          <p onClick={goToSignUp} className="signup-link">Sign Up</p>
          <p onClick={goToDashboard} className="signup">Dashboard</p>
    </div>
  );
};

export default Login;
