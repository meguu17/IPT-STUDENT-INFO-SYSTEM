import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import ViewStudent from './pages/ViewStudent';
import ViewUsers from './pages/ViewUsers';
import ManageStudent from './pages/ManageStudent';
import Sidebar from './pages/Sidebar';
import Signup from './pages/Signup';

const App = () => {

  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/viewstudent" element={<ViewStudent />} />
        <Route path="/managestudent" element={<ManageStudent />} />
        <Route path="/viewusers" element={<ViewUsers />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element ={<Login/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
