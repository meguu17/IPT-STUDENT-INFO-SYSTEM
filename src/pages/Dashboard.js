import React, {useEffect}from "react";
import "./Dashboard.css";

function Dashboard() {
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const isLoginPage = window.location.pathname === '/login'; 

   
    if (!(storedEmail ) && !isLoginPage) {
        window.location.href = "/login";
    }
}, []);
  return (
    <div className="App">
      <h1>Welcome to Saint Mary's University!</h1>
    </div>
  );
}

export default Dashboard;
