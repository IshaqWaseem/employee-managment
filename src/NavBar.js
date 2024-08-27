// src/NavBar.js
import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./NavBar.css"; // Importing the CSS file

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo"><Link to="/">Employee Management</Link></div>
      <div className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/employees">Employees</Link>
        </li>
        <li>
          <Link to="/employeesearch">Search</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </div>
    </nav>
  );
};

export default NavBar;
