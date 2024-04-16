// App.js
import React, { useState } from 'react';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      {isLoggedIn && <Sidebar />}
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {isLoggedIn ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addstudent" element={<AddStudent />} />
            <Route path="/viewstudent" element={<ViewStudent />} />
            <Route path="/viewusers" element={<ViewUsers />} />
            <Route path="/managestudent" element={<ManageStudent />} />
          </>
        ) : (
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        )}
      <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
