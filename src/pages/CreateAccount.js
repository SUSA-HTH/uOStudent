import React, { useState } from 'react';
import InputField from '../components/InputFields';
import Button from '../components/Button';
import { addUser } from '../dbHelpers';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Function to handle account creation
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      // Call the function to add user to the database
      await addUser(fullname, email, password);
      alert('Account created successfully!');

      // Redirect to login page or calendar page after successful account creation
      navigate('/'); // Or you could navigate to another page like the calendar page
    } catch (error) {
      alert('Error creating account: ' + error.message);
    }
  };

  return (
    <div className="create-account-page">
      <h1>Create Account</h1>
      <form onSubmit={handleCreateAccount}>
        <InputField
          type="text"
          placeholder="Fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button label="Create an account" className="create-account-button" />
      </form>
    </div>
  );
};

export default CreateAccount;