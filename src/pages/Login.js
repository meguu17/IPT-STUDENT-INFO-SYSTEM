import React, { useState,useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";

function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');

    if (storedEmail) {
        window.location.href = "/dashboard";
    }
    else if (localStorage == null) {
        window.location.href = "/login";
    }
}, []);
//comment


  
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
  }
    axios.get(`http://localhost:1337/viewUsers`)
            .then((response) => {
                const users = response.data;
                const user = users.find(user => user.Email === email);
                if (user) {
                    if (user.Password === password) {
                        console.log('Login successful');
                        localStorage.setItem('email', email);
                        window.location.href = "/dashboard";
                    } else {
                        console.log('Incorrect password');
                        
                    }
                } else {
                    console.log('User not found. Create an account first.');
                    alert("User not found. Create an account first.");
                    setEmail('');
                    setPassword('');
                    
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
};
  
  const signUp = () => {
    navigate('/signup');
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2><b>LOGIN PAGE</b></h2>
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
          <Button variant='contained' sx={{ width: '250px', backgroundColor: '#f1bf7a' }} onClick={handleLogin}>
            <b>LOGIN</b>
          </Button>
          <br />
          <br />
          <Button variant='contained' sx={{ width: '250px', backgroundColor: '#f1bf7a' }} onClick={signUp}>
            <b>SIGN UP</b>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
