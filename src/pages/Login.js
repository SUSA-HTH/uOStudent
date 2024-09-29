import React, { useState } from "react";
import { loginUser } from "../dbHelpers";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputFields";
import Button from "../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate("/create-account");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Attempt to log in the user with email and password
      const user = await loginUser(email, password);
      alert(`Welcome, ${user.fullname}!`);
      
      // Redirect to the calendar page (or another page) after successful login
      navigate('/calendar');
    } catch (error) {
      alert('Error logging in: ' + error.message);
    }
  };
    
  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const goToCourseList = () => {
    navigate('/course-list');
  };

  const goToGradeCalculator = () => {
    navigate('/grade-calculator');
  };

  return (
    <div className="login-page">
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
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
        <Button label="Log in" className="login-button" />
      </form>
        <p onClick={goToSignUp} className="signup-link">Sign Up</p>
          

    </div>
  );
};

export default Login;
