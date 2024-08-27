import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employees from "./components/Employees";
import EmployeeSearch from "./components/EmployeeSearch";
import EmployeeDetail from "./components/EmployeeDetail";
import NavBar from "./NavBar";
import EmployeeAdmin from "./components/Admin/EmployeeAdmin";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<div>Welcome</div>} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employeesearch" element={<EmployeeSearch />} />
          <Route path="/employee/:employeeId" element={<EmployeeDetail />} />
          <Route path="/admin" element={<EmployeeAdmin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
