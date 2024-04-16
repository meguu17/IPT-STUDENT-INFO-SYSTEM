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

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailRequiredError, setEmailRequiredError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            setFirstNamee('');
            setLastNamee('');
            setMiddleNamee('');
            setEmaill('');
            setPasswordd('');
        }
    }, [isLoggedIn]);



    function handleLogin() {

        if (!firstnamee) {
            setFirstNameError(true);
        } else {
            setFirstNameError(false);
        }

        if (!lastnamee) {
            setLastNameError(true);
        } else {
            setLastNameError(false);
        }

        if (!emaill) {
            setEmailRequiredError(true);
            return;
        } else {
            setEmailRequiredError(false);
        }

        if (!passwordd) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }

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
    };

    const cancel = () => {
        navigate('/login');
      };

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
                        error={firstNameError}
                        helperText={firstNameError && "First Name is required"}
                    />
                    <br />
                    <br />
                    <TextField
                        label='Last Name'
                        variant='outlined'
                        sx={{ width: '250px' }}
                        value={lastnamee}
                        onChange={(e) => setLastNamee(e.target.value)}
                        error={lastNameError}
                        helperText={lastNameError && "Last Name is required"}
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
                        error={emailRequiredError}
                        helperText={emailRequiredError && "Email is required"}
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
                        error={passwordError}
                        helperText={passwordError && "Password is required"}
                    />
                    <br />
                    <br />
                    <Button
                        variant='contained'
                        sx={{ width: '250px', backgroundColor: '#f1bf7a'}}
                        onClick={handleLogin}
                    >
                        <b>SIGN UP</b>
                    </Button>
                    <br />
                    <br />
                    <Button
                        variant='contained'
                        sx={{ width: '250px', backgroundColor: '#f1bf7a'}}
                        onClick={cancel}
                    >
                        <b>CANCEL</b>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Signup;
