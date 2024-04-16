import "./Login.css";
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    onLogin();
    navigate('/dashboard');
  };

  const signUp = () => {
    navigate('/signup');
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2><b>STUDENT INFORMATION SYSTEM</b></h2>
        <br />
        <div className='login'>
          <TextField
            label='E-mail'
            variant='outlined'
            type='email'
            sx={{ width: '250px' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <TextField
            label='Password'
            variant='outlined'
            type='password'
            sx={{ width: '250px' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <Button
            variant='contained'
            sx={{ width: '250px' }}
            onClick={handleLogin}
          >
            <b>LOGIN</b>
          </Button>
          <br />
          <br />
          <Button
          variant='contained'
          sx={{ width: '250px' }}
          onClick={signUp}
          >
            <b>SIGN UP</b>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login; 