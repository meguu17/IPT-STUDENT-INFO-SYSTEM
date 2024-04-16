import React, { useState, useEffect } from "react";
import './ViewUsers.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, TextField } from "@mui/material";

function ViewUsers() {
    const [users, setUsers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalEditOpen, setEditModalOpen] = useState(false);
    const [editedUser, setEditedUser] = useState(null);
    const [editFirst, setEditFirst] = useState("");
    const [editLast, setEditLast] = useState("");
    const [editMiddle, setEditMiddle] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPassword, setEditPassword] = useState("");
    const [restartData, setRestartData] = useState(false);

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailRequiredError, setEmailRequiredError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const isLoginPage = window.location.pathname === '/login'; 
    
       
        if (!(storedEmail ) && !isLoginPage) {
            window.location.href = "/login";
        }
    }, []);

    const fetchData = () => {
        axios.get(`http://localhost:1337/viewUsers`)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }

    function handleAdd() {
        setModalOpen(true);
    };

    function closeData() {
        setEditFirst("");
        setEditLast("");
        setEditMiddle("");
        setEditEmail("");
        setEditPassword("");
        setEditModalOpen(false);
    }

    function handleEdit(user) {
        setEditedUser(user);
        setEditFirst(user.First);
        setEditLast(user.Last);
        setEditMiddle(user.Middle);
        setEditEmail(user.Email);
        setEditPassword(user.Password);
        setEditModalOpen(true);
    };

    function handleCloseModal() {
        setModalOpen(false);
        setEditModalOpen(false);
        setEditedUser(null);
    };

    function handleAddUser() {

        if (!editFirst) {
            setFirstNameError(true);
        } else {
            setFirstNameError(false);
        }

        if (!editLast) {
            setLastNameError(true);
        } else {
            setLastNameError(false);
        }

        if (users.some(user => user.Email === editEmail)) {
            setEmailRequiredError(true);
            return;
        } else {
            setEmailRequiredError(false);
        }

        if (!editPassword) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }

        const userData = {
            First: editFirst,
            Last: editLast,
            Middle: editMiddle,
            Email: editEmail,
            Password: editPassword,
        };

        axios.post("http://localhost:1337/addUser", userData)
            .then(response => {
                console.log("User added successfully:", response.data);
                setEditFirst("");
                setEditLast("");
                setEditMiddle("");
                setEditEmail("");
                setEditPassword("");
                setModalOpen(false);
                fetchData();
                setRestartData(!restartData);
            })
            .catch(error => {
                console.error("Error adding user:", error);
            });
    }

    function handleSaveEdit() {
        const userData = {
            First: editFirst,
            Last: editLast,
            Middle: editMiddle,
            Email: editEmail,
            Password: editPassword,
        };

        axios.put(`http://localhost:1337/editUser/${editedUser.Email}`, userData)
            .then(response => {
                console.log("User updated successfully:", response.data);
                setEditModalOpen(false);
                fetchData();
                setRestartData(!restartData);
            })
            .catch(error => {
                console.error("Error updating user:", error);
            });
    }

    return (
        <div className="App">
            <h1>View Users</h1>
            <Button variant="contained" onClick={handleAdd} sx={{ width: "115px", backgroundColor: '#f1bf7a' }}><b>ADD USER</b></Button>
            <br /> <br />
            <Modal open={modalOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 300,
                        bgcolor: "background.paper",
                        p: 4
                    }}
                >
                    <h2>Add User</h2>
                    <br />
                    <div align="center">
                        <TextField
                            variant="outlined"
                            label="First Name"
                            value={editFirst} onChange={(e) =>
                            setEditFirst(e.target.value)}
                            error={firstNameError}
                            helperText={firstNameError && "First Name is required"}
                            sx={{ width: '250px' }}
                        />
                        <br />
                        <br />
                        <TextField
                            variant="outlined"
                            label="Last Name"
                            value={editLast}
                            onChange={(e) => setEditLast(e.target.value)}
                            error={lastNameError}
                            helperText={lastNameError && "Last Name is required"}
                            sx={{ width: '250px' }}
                        />
                        <br />
                        <br />
                        <TextField
                            variant="outlined"
                            label="Middle Name"
                            value={editMiddle}
                            onChange={(e) => setEditMiddle(e.target.value)}
                            sx={{ width: '250px' }}
                        />
                        <br />
                        <br />
                        <TextField
                            variant="outlined"
                            label="Email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            error={emailRequiredError && "Email is required"}
                            sx={{ width: '250px' }}
                        />
                        <br />
                        <br />
                        <TextField
                            type="password"
                            variant="outlined"
                            label="Password"
                            value={editPassword}
                            onChange={(e) => setEditPassword(e.target.value)}
                            error={passwordError}
                            helperText={passwordError && "Password is required"}
                            sx={{ width: '250px' }}
                        />
                        <p>
                            <Button
                                variant="contained"
                                onClick={handleAddUser}
                                sx={{ width: "115px" ,backgroundColor: '#f1bf7a' }}
                            >
                                <b>ADD USER</b>
                            </Button>
                        </p>
                    </div>
                </Box>
            </Modal>

            <TableContainer component={Paper} className="sticky-table-container">
                <Table sx={{ minWidth: 100 }} aria-label="simple table">
                    <TableHead className="sticky-header">
                        <TableRow>
                            <TableCell align="center"><b>First Name</b></TableCell>
                            <TableCell align="center"><b>Last Name</b></TableCell>
                            <TableCell align="center"><b>Middle Name</b></TableCell>
                            <TableCell align="center"><b>Email</b></TableCell>
                            <TableCell align="center"><b>Edit</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map(user => (
                            <TableRow key={user.Email}>
                                <TableCell align="center">{user.First}</TableCell>
                                <TableCell align="center">{user.Last}</TableCell>
                                <TableCell align="center">{user.Middle}</TableCell>
                                <TableCell align="center">{user.Email}</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" onClick={() => handleEdit(user)} 
                  sx={{ backgroundColor: '#f1bf7a' }}><b>EDIT</b></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={modalEditOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 300,
                        bgcolor: "background.paper",
                        p: 4
                    }}
                >
                    <h2>User Information</h2>
                    <br />
                    <div align="center">
                        <TextField
                            variant="outlined"
                            label="First Name"
                            value={editFirst}
                            onChange={(e) => setEditFirst(e.target.value)}
                            sx={{ width: '250px' }}
                        />
                        <br />
                        <br />
                        <TextField
                            variant="outlined"
                            label="Last Name"
                            value={editLast}
                            onChange={(e) => setEditLast(e.target.value)}
                            sx={{ width: '250px' }}
                        />
                        <br />
                        <br />
                        <TextField
                            variant="outlined"
                            label="Middle Name"
                            value={editMiddle} onChange={(e) => setEditMiddle(e.target.value)}
                            sx={{ width: '250px' }}
                        />
                        <br />
                        <br />
                        <TextField variant="outlined"
                            label="Email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            sx={{ width: '250px' }}
                            disabled
                        />
                        <br />
                        <br />
                        <TextField
                            type="password"
                            variant="outlined"
                            label="Password"
                            value={editPassword}
                            onChange={(e) => setEditPassword(e.target.value)}
                            sx={{ width: '250px' }}
                        />
                        <br />
                        <Button
                            variant="contained"
                            onClick={handleSaveEdit}
                            sx={{ width: "115px", margin: "20px", marginLeft: "-5px", backgroundColor: '#f1bf7a' }}>
                            <b>Save</b>
                        </Button>
                        <Button
                            variant="contained"
                            onClick={closeData}
                            sx={{ width: "115px", backgroundColor: '#f1bf7a' }}>
                            <b>Close</b>
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ViewUsers;
