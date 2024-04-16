import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  AlertTitle
} from "@mui/material";

function ViewStudent() {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restartData, setRestartData] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);

  const [firstNameError, setFirstNameError] = useState(false);
  const [middleNameError, setMiddleNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [courseError, setCourseError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:1337/viewStudents`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, [restartData]);

  function handleEditStudent(student) {
    setCurrentStudent(student);
    setEditedStudent(student);
    setIsModalOpen(true);
  }

  const handleEditData = async () => {

    if (!validateFields()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:1337/updateStudents", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(currentStudent)
      });

      if (!response.ok) {
        throw new Error('Failed to update student. Server returned ' + response.status + ' ' + response.statusText);
      }

      const result = await response.json();

      if (result.success) {
        setRestartData(!restartData);
        handleCloseModal();
      } else {
        alert("Failed to update student.");
      }
      alert(result.message);
    } catch (error) {
      console.error("Error updating student data: ", error);
      alert("An error occurred.");
    }
  };

  const validateFields = () => {
    let isValid = true;
    let errorMsg = "";

    if (/[^a-zA-Z.-]/.test(currentStudent.firstname)) {
      setFirstNameError(true);
      errorMsg = "Please enter a valid First Name.";
      isValid = false;
    } else {
      setFirstNameError(false);
    }

    if (/[^a-zA-Z.-]/.test(currentStudent.middlename)) {
      setMiddleNameError(true);
      errorMsg = "Please enter a valid Middle Name.";
      isValid = false;
    } else {
      setMiddleNameError(false);
    }

    if (/[^a-zA-Z.-]/.test(currentStudent.lastname)) {
      setLastNameError(true);
      errorMsg = "Please enter a valid Last Name.";
      isValid = false;
    } else {
      setLastNameError(false);
    }

    if (/[^a-zA-Z.-]/.test(currentStudent.course)) {
      setCourseError(true);
      errorMsg = "Please enter a valid Course.";
      isValid = false;
    } else {
      setCourseError(false);
    }

    if (!currentStudent.year || !/^\d+$/.test(currentStudent.year)) {
      setYearError(true);
      errorMsg = "Please enter a valid Year.";
      isValid = false;
    } else {
      setYearError(false);
    }

    setFormError(errorMsg);
    return isValid;
  };

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (editedStudent) {
      const updatedStudents = students.map((student) =>
        student.id === editedStudent.id ? editedStudent : student
      );
      setStudents(updatedStudents);
      setEditedStudent(null);
    }
  }, [editedStudent, students]);

  return (
    <div className="App">
      <h1>View Students</h1>
      <TableContainer component={Paper} sx={{ maxWidth: 800 }} className="sticky-table-container">
        <Table size="medium" aria-label="simple table">
          <TableHead className="sticky-header">
            <TableRow>
              <TableCell align="center">
                <b>ID Number</b>
              </TableCell>
              <TableCell align="center">
                <b>First Name</b>
              </TableCell>
              <TableCell align="center">
                <b>Middle Name</b>
              </TableCell>
              <TableCell align="center">
                <b>Last Name</b>
              </TableCell>
              <TableCell align="center">
                <b>Course</b>
              </TableCell>
              <TableCell align="center">
                <b>Year</b>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell align="center">{student.id}</TableCell>
                <TableCell align="center">{student.firstname}</TableCell>
                <TableCell align="center">{student.middlename}</TableCell>
                <TableCell align="center">{student.lastname}</TableCell>
                <TableCell align="center">{student.course}</TableCell>
                <TableCell align="center">{student.year}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleEditStudent(student)}
                  >
                    <b>EDIT</b>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
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
          <h2>Student Details</h2>
          {currentStudent && (
            <div align="center">
              <TextField
                id="outlined-uncontrolled" 
                label="ID Number" 
                disabled
                value={currentStudent.id} 
                onChange={(e) => setCurrentStudent({...currentStudent, id: e.target.value})} 
                sx={{ width: '250px' }} 
              />
              <br />
              <br />
              <TextField
                error={firstNameError}
                id="outlined-uncontrolled" 
                label="First Name" 
                value={currentStudent.firstname} 
                onChange={(e) => setCurrentStudent({...currentStudent, firstname: e.target.value})} 
                sx={{ width: '250px' }} 
              />
              <br />
              <br />
              <TextField
                error={middleNameError}
                id="outlined-uncontrolled" 
                label="Middle Name" 
                value={currentStudent.middlename} 
                onChange={(e) => setCurrentStudent({...currentStudent, middlename: e.target.value})} 
                sx={{ width: '250px' }} 
              />
              <br />
              <br />
              <TextField
                error={lastNameError}
                id="outlined-uncontrolled" 
                label="Last Name" 
                value={currentStudent.lastname} 
                onChange={(e) => setCurrentStudent({...currentStudent, lastname: e.target.value})} 
                sx={{ width: '250px' }} 
              />
              <br />
              <br />
              <TextField
                error={courseError}
                id="outlined-uncontrolled" 
                label="Course" 
                value={currentStudent.course} 
                onChange={(e) => setCurrentStudent({...currentStudent, course: e.target.value})} 
                sx={{ width: '250px' }} 
              />
              <br />
              <br />
              <FormControl>
                <InputLabel id="select-label">Year</InputLabel>
                <Select
                  labelId="Year"
                  error={yearError}
                  id="select-label"
                  value={currentStudent.year}
                  label="Year"
                  onChange={(e) =>
                    setCurrentStudent({ ...currentStudent, year: e.target.value })
                  }
                  sx={{ width: "250px" , textAlign: "left"}}>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
              <p>
                <Button
                  variant="contained"
                  onClick={handleEditData}
                  sx={{ width: "115px", marginRight: "20px" }}
                >
                  <b>Save</b>
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCloseModal}
                  sx={{ width: "115px" }}
                >
                  <b>Close</b>
                </Button>
              </p>
              {formError && (
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {formError}
                  </Alert>
                )}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default ViewStudent;
