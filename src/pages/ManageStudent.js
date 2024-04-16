import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';

function ManageStudent() {
  const [students, setStudents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);
  const [editedID, setEditedID] = useState("");
  const [editFirst, setEditFirst] = useState("");
  const [editLast, setEditLast] = useState("");
  const [editMiddle, setEditMiddle] = useState("");
  const [editCourse, setEditCourse] = useState("");
  const [editYear, setEditYear] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`http://localhost:1337/viewStudent`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data", error);
      });
  }

  const handleAdd = () => {
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditModalOpen(false);
    setEditedStudent(null);
  };

  const handleEdit = (student) => {
    setEditedStudent(student);
    setEditedID(student.id);
    setEditFirst(student.first);
    setEditLast(student.last);
    setEditMiddle(student.middle);
    setEditCourse(student.course);
    setEditYear(student.year);
    setEditModalOpen(true);
  };

  const handleAddStudent = () => {
    const studentData = {
      id: editedID,
      first: editFirst,
      last: editLast,
      middle: editMiddle,
      course: editCourse,
      year: editYear,
    };
  
    axios.post("http://localhost:1337/addStudents", studentData)
      .then(response => {
        console.log("Student added successfully:", response.data);
        fetchData();
        setModalOpen(false);
      })
      .catch(error => {
        console.log("Error adding student:", error);
      });
  };  

  const closeData = () => {
    setEditModalOpen(false);
  }

  const handleSaveEdit = () => {
    const updatedStudentData = {
      id: editedID,
      first: editFirst,
      last: editLast,
      middle: editMiddle,
      course: editCourse,
      year: editYear,
    };

    axios.put(`http://localhost:1337/editStudent/${editedStudent.id}`, updatedStudentData)
      .then(response => {
        console.log("Student updated successfully:", response.data);
        fetchData();
        setEditModalOpen(false);
      })
      .catch(error => {
        console.error("Error updating student:", error);
      });
  };

  return (
    <div className='App'>
      <h1>MANAGE STUDENT</h1>
      <Button variant="contained" onClick={handleAdd} sx={{ width: "160px" }}>
        <b>ADD STUDENT</b>
      </Button>
      <br />
      <br />
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
          }}>
          <h2>Add Student</h2>
          <br />
          <div align="center">
            <TextField
              label="ID Number"
              variant="outlined"
              margin="normal"
              value={editedID}
              onChange={(e) => setEditedID(e.target.value)}
              sx={{ width: '250px' }}
            />
            <TextField
              label="First Name"
              variant="outlined"
              margin="normal"
              value={editFirst}
              onChange={(e) => setEditFirst(e.target.value)}
              sx={{ width: '250px' }}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              margin="normal"
              value={editLast}
              onChange={(e) => setEditLast(e.target.value)}
              sx={{ width: '250px' }}
            />
            <TextField
              label="Middle Name"
              variant="outlined"
              margin="normal"
              value={editMiddle}
              onChange={(e) => setEditMiddle(e.target.value)}
              sx={{ width: '250px' }}
            />
            <TextField
              label="Course"
              variant="outlined"
              margin="normal"
              value={editCourse}
              onChange={(e) => setEditCourse(e.target.value)}
              sx={{ width: '250px' }}
            />
            <br />
            <br />
            <FormControl>
              <InputLabel id="year-label">Year</InputLabel>
              <Select
                labelId="Year"
                id="select-label"
                value={editYear}
                label="Year"
                onChange={(e) => setEditYear(e.target.value)}
                sx={{ width: "250px" }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <Button variant="contained" onClick={handleAddStudent}><b>ADD STUDENT</b></Button>
          </div>
        </Box>
      </Modal>

      <TableContainer component={Paper} sx={{ maxWidth: 800 }} className="sticky-table-container">
        <Table sx={{ minWidth: 100 }} aria-label="simple table">
          <TableHead className="sticky-header">
            <TableRow>
              <TableCell align="center"><b>ID Number</b></TableCell>
              <TableCell align="center"><b>First Name</b></TableCell>
              <TableCell align="center"><b>Last Name</b></TableCell>
              <TableCell align="center"><b>Middle Name</b></TableCell>
              <TableCell align="center"><b>Course</b></TableCell>
              <TableCell align="center"><b>Year</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map(student => (
              <TableRow key={student.id}>
                <TableCell align="center">{student.id}</TableCell>
                <TableCell align="center">{student.first}</TableCell>
                <TableCell align="center">{student.last}</TableCell>
                <TableCell align="center">{student.middle}</TableCell>
                <TableCell align="center">{student.course}</TableCell>
                <TableCell align="center">{student.year}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" onClick={() => handleEdit(student)}><b>EDIT</b></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={editModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            p: 4
          }}>
          <h2>Edit Student Information</h2>
          <div align="center">
            <TextField
              label="ID Number"
              variant="outlined"
              margin="normal"
              value={editedID}
              disabled={true}
              onChange={(e) => setEditedID(e.target.value)}
              sx={{ width: '250px' }}
            />
            <TextField
              label="First Name"
              variant="outlined"
              margin="normal"
              value={editFirst}
              onChange={(e) => setEditFirst(e.target.value)}
              sx={{ width: '250px' }}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              margin="normal"
              value={editLast}
              onChange={(e) => setEditLast(e.target.value)}
              sx={{ width: '250px' }}
            />
            <TextField
              label="Middle Name"
              variant="outlined"
              margin="normal"
              value={editMiddle}
              onChange={(e) => setEditMiddle(e.target.value)}
              sx={{ width: '250px' }}
            />
            <TextField
              label="Course"
              variant="outlined"
              margin="normal"
              value={editCourse}
              onChange={(e) => setEditCourse(e.target.value)}
              sx={{ width: '250px' }}
            />
            <br />
            <br />
            <FormControl>
              <InputLabel id="year-label">Year</InputLabel>
              <Select
                labelId="Year"
                id="select-label"
                value={editYear}
                label="Year"
                onChange={(e) => setEditYear(e.target.value)}
                sx={{ width: "250px" }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
            <br />
            <Button
              variant="contained"
              onClick={handleSaveEdit}
              sx={{ width: "115px", margin: "20px", marginLeft: "-5px"}}>
              <b>Save</b>
            </Button>
            <Button
              variant="contained"
              onClick={closeData}
              sx={{ width: "115px" }}>
              <b>Close</b>
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ManageStudent;
