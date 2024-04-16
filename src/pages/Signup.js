import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Signup.css";

function Signup() {
    const [firstnamee, setFirstNamee] = useState('');
    const [lastnamee, setLastNamee] = useState('');
    const [middlenamee, setMiddleNamee] = useState('');
    const [emaill, setEmaill] = useState('');
    const [passwordd, setPasswordd] = useState('');
    const [isLoggedIn, setIsLoggedInn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            setFirstNamee('');
            setLastNamee('');
            setMiddleNamee('');
            setEmaill('');
            setPasswordd('');
        }
    }, [isLoggedIn]);

    const fetchData = () => {
        axios.get(`http://localhost:1337/viewUsers`)
            .then((response) => {
                console.log("User data:", response.data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    function handleLogin() {
        const userData = {
            First: firstnamee,
            Last: lastnamee,
            Middle: middlenamee,
            Email: emaill,
            Password: passwordd,
        };

        axios.post("http://localhost:1337/addUser", userData)
            .then(response => {
                console.log("User added successfully:", response.data);
                setIsLoggedInn(true);
                alert("Sign up successful!");
                setTimeout(() => {
                    setFirstNamee('');
                    setLastNamee('');
                    setMiddleNamee('');
                    setEmaill('');
                    setPasswordd('');
                    navigate('/login');
                }, 100);
            })
            .catch(error => {
                console.error("Error adding user:", error);
            });

        if (firstnamee.trim() === '' || lastnamee.trim() === '' || middlenamee.trim() === '' || emaill.trim() === '' || passwordd.trim() === '') {
            alert("Please complete all informations.");
            return;
        }

        localStorage.setItem('first name', firstnamee);
        localStorage.setItem('last name', lastnamee);
        localStorage.setItem('middle name', middlenamee);
        localStorage.setItem('email', emaill);
        localStorage.setItem('password', passwordd);
    }

    return (
        <div className='login-container'>
            <div className='login-box'>
                <h2><b>SIGN UP</b></h2>
                <br />
                <div className='login'>
                    <TextField
                        label='First Name'
                        variant='outlined'
                        sx={{ width: '250px' }}
                        value={firstnamee}
                        onChange={(e) => setFirstNamee(e.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        label='Last Name'
                        variant='outlined'
                        sx={{ width: '250px' }}
                        value={lastnamee}
                        onChange={(e) => setLastNamee(e.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        label='Middle Name'
                        variant='outlined'
                        sx={{ width: '250px' }}
                        value={middlenamee}
                        onChange={(e) => setMiddleNamee(e.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        label='E-mail'
                        variant='outlined'
                        type='email'
                        sx={{ width: '250px' }}
                        value={emaill}
                        onChange={(e) => setEmaill(e.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        label='Password'
                        variant='outlined'
                        type='password'
                        sx={{ width: '250px' }}
                        value={passwordd}
                        onChange={(e) => setPasswordd(e.target.value)}
                    />
                    <br />
                    <br />
                    <Button
                        variant='contained'
                        sx={{ width: '250px' }}
                        onClick={handleLogin}
                    >
                        <b>SIGN UP</b>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Signup;
