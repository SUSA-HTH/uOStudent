import React from 'react';
import InputField from '../components/InputFields';
import Button from '../components/Button';

const CreateAccount = () => {
  const handleCreateAccount = () => {
    alert('Account Created!');
  };

  return (
    <div className="create-account-page">
      <h1>Create Account</h1>
      <InputField type="email" placeholder="Email" />
      <InputField type="text" placeholder="Username" />
      <InputField type="password" placeholder="Password" />
      <Button label="Create an account" onClick={handleCreateAccount} className="create-account-button" />
    </div>
  );
};

export default CreateAccount;
