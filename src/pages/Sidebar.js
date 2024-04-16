import React from "react";
import "./Sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import ViewListIcon from "@mui/icons-material/ViewList";
import GroupIcon from "@mui/icons-material/Group";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const hideSidebarOnPages = ["/login", "/signup"].includes(location.pathname);

  const logout = () => {
    localStorage.removeItem('email');
    navigate("/login");
  };

  if (hideSidebarOnPages) {
    return null;
  }

  return (
    <div className="sidebar">
      <div className="home">
        <Link to="/dashboard" className="link">
          <HomeIcon />
          <span>
            <b>HOME</b>
          </span>
        </Link>
      </div>
      <Link to="addstudent" className="link">
        <InfoRoundedIcon />
        <span>
          <b>ADD STUDENT</b>
        </span>
      </Link>
      <Link to="viewstudent" className="link">
        <ViewListIcon />
        <span>
          <b>VIEW STUDENT</b>
        </span>
      </Link>
      <Link to="managestudent" className="link">
        <ManageAccountsIcon />
        <span>
          <b>MANAGE STUDENTS</b>
        </span>
      </Link>
      <Link to="viewusers" className="link">
        <GroupIcon />
        <span>
          <b>VIEW USERS</b>
        </span>
      </Link>
      <Link to="/login" className="link" onClick={logout}>
        <LogoutIcon />
        <span>
          <b>LOGOUT</b>
        </span>
      </Link>
    </div>
  );
}

export default Sidebar;
