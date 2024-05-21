import React, { useState } from 'react';
import { supabase } from './SupabaseClient';

const SignUp = ({ setView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    } else {
      setView('Login'); // Redirect to login after successful sign-up
      alert('Sign up successful! Please check your email to confirm.');
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
      <label for="fname">Enter your First name:</label>
      <br></br>
      <input
        type="text"
        placeholder="First Name"
      />
      <br /><br/>
      <label for="Sname">Enter your Second name:</label>
      <br></br>
      <input
        type="text"
        placeholder="Second Name"
      />
      <br /><br/>
      <label for="Sname">Enter your Email:</label>
      <br></br>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />
      <label htmlFor="password">Enter your Password</label><br />
      <input
        type="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />
      <label htmlFor="confirmPassword">Confirm your Password</label><br />
      <input
        type="password"
        id="confirmPassword"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <br /><br />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit">Sign Up</button>
      <br /><br />
      <p>Already have an account? <button onClick={() => setView('Login')}>Login</button></p>
    </form>
  );
};

export default SignUp;
