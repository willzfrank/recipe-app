import React, { useState } from 'react';
import '../styles/auth.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [_, setCookie] = useCookies(['access_token']);

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!username || !password) {
      toast.error('Please enter a username and password');
      return;
    }

    setLoading(true);

    try {
      // Send registration request
      const response = await axios.post('http://localhost:3001/auth/login', {
        username,
        password,
      });

      // Clear form inputs
      setUsername('');
      setPassword('');
      setLoading(false);

      // Show success message and navigate to home page
      setCookie('access_token', response.data.token);
      // Save userId in local storage
      localStorage.setItem('userId', response.data.userId);

      toast.success('Login Successfully');
      navigate('/');
    } catch (err) {
      if (!err?.response) {
        // Handle server connection error
        toast.error('No Server Response');
      } else if (err.response?.status === 404) {
        // Handle username already taken error
        toast.error('User not found');
      } else if (err.response?.status === 401) {
        // Handle other registration errors
        toast.error('Incorrect username or password');
      } else {
        toast.error('Login Failed');
      }
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!username || !password) {
      toast.error('Please enter a username and password');
      return;
    }

    setLoading(true);

    try {
      // Send registration request
      await axios.post('http://localhost:3001/auth/register', {
        username,
        password,
      });

      // Clear form inputs
      setUsername('');
      setPassword('');
      setLoading(false);

      // Show success message and navigate to home page
      toast.success('Successfully registered! You can log in to your account.');
    } catch (err) {
      if (!err?.response) {
        // Handle server connection error
        toast.error('No Server Response');
      } else if (err.response?.status === 409) {
        // Handle username already taken error
        toast.error('Username Taken');
      } else {
        // Handle other registration errors
        toast.error('Registration Failed');
      }
      setLoading(false);
    }
  };

  return (
    <div className="auth-body">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form onSubmit={handleSubmit}>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              type="text"
              name="txt"
              placeholder="User name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading} // Disable input while loading
            />
            <input
              type="password"
              name="pswd"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading} // Disable input while loading
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Signup'}
            </button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading} // Disable input while loading
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading} // Disable input while loading
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
