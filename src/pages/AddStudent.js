import React from "react";
import "./AddStudent.css";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

function AddStudent() {

  const [id, setID] = useState("");
  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastName] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");

  const [idNumberError, setIdNumberError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [middleNameError, setMiddleNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [courseError, setCourseError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleAddStudent(){

    if (!validateFields()) {
      alert(formError || "Please fill in all fields correctly before saving.");
      return;
    }

    const studentData = {
      id,
      firstname,
      lastname,
      middlename,
      course,
      year,
    };

    try {
      const response = await fetch("http://localhost:1337/addStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });


      const result = await response.json();

      if (result.success) {
        setID("");
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setCourse("");
        setYear("");
        alert(result.message);
      }
      else {
        alert("Failed to add student. Please try again.");
      }
    }
    catch (error) {
      console.error("Error adding student:", error);
      alert("An error occured. Please try again.");
    }

  }

  const validateFields = () => {
    let isValid = true;
    let errorMsg = "";

    if (!id || !firstname || !lastname || !course || !year) {
      errorMsg = "Please fill in all fields.";
      isValid = false;
    }

    if (!/^\d+$/.test(id)) {
      setIdNumberError(true);
      errorMsg = "Please enter a valid ID number.";
      isValid = false;
    } else {
      setIdNumberError(false);
    }

    if (/[^a-zA-Z.-]/.test(firstname)) {
      setFirstNameError(true);
      errorMsg = "Please enter a valid First Name.";
      isValid = false;
    } else {
      setFirstNameError(false);
    }

    if (/[^a-zA-Z.-]/.test(middlename)) {
      setMiddleNameError(true);
      errorMsg = "Please enter a valid Middle Name.";
      isValid = false;
    } else {
      setMiddleNameError(false);
    }

    if (/[^a-zA-Z.-]/.test(lastname)) {
      setLastNameError(true);
      errorMsg = "Please enter a valid Last Name.";
      isValid = false;
    } else {
      setLastNameError(false);
    }

    if (/[^a-zA-Z.-]/.test(course)) {
      setCourseError(true);
      errorMsg = "Please enter a valid Course.";
      isValid = false;
    } else {
      setCourseError(false);
    }

    if (!year || !/^\d+$/.test(year)) {
      setYearError(true);
      errorMsg = "Please enter a valid Year.";
      isValid = false;
    } else {
      setYearError(false);
    }

    setFormError(errorMsg);
    return isValid;
  };

  const handleChange = (event) => {
    setYear(event.target.value);
    setYearError(false);
  };

  return (
    <div className="add-student-container">
        <div className="hed">
        <h1>ADD STUDENT</h1>
        <TextField
          error={idNumberError}
          id="outlined-basic"
          label="ID Number"
          variant="outlined"
          margin="normal"
          value={id}
          onChange={(e) => setID(e.target.value)} />
        </div>
        <div className="name">
          <TextField 
          error={firstNameError}
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          margin="normal"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="name">
          <TextField 
          error={middleNameError}
          id="outlined-basic"
          label="Middle Name"
          variant="outlined"
          margin="normal"
          value={middlename}
          onChange={(e) => setMiddleName(e.target.value)} />
        </div>
        <div className="name">
          <TextField 
          error={lastNameError}
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          margin="normal"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="name">
          <TextField 
          error={courseError}
          id="outlined-basic"
          label="Course"
          variant="outlined"
          margin="normal"
          value={course}
          onChange={(e) => setCourse(e.target.value)} />
        </div> <br />
        <div className="name">
          <FormControl>
                <InputLabel id="select-label">
                  Year
                </InputLabel>
                <Select
                labelId="Year"
                id="select-label"
                value={year}
                label="Year"
                onChange={handleChange}
                error={yearError}
                sx={{ width: "195px" }}>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
        </div> <br />
        <div className="bot">
          <Button variant="contained" onClick={handleAddStudent}><b>ADD STUDENT</b></Button>
        </div>
    </div>
  );
 }

export default AddStudent;

