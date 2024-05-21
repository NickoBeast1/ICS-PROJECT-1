// src/Login.js
import React, { useState } from 'react';
import { supabase } from './SupabaseClient';
import { useCooldown } from './useCooldown';

const Login = ({ setView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { cooldown, startCooldown } = useCooldown();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (cooldown > 0) {
      alert(`Please wait ${cooldown} seconds before trying again.`);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
      if (error.message.includes('rate limit')) {
        startCooldown();
      }
    } else {
      setView('Home'); // Redirect to home on successful login
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <br></br>
      <label for="email">Enter your Email:</label>
      <br></br>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br/>
      <label htmlFor="password">Enter your Password:</label><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br/>
      <button type="submit" disabled={cooldown > 0}>
        {cooldown > 0 ? `Wait ${cooldown}s` : 'Login'}
      </button>
      <br /><br />
      <p>Don't have an account? <button onClick={() => setView('SignUp')}>Sign Up</button></p>
      <p>Forgot your password? <span>Reset your password</span></p>
    </form>
  );
};

export default Login;
