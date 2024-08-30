import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeCard from "./EmployeeCard";
import { useNavigate } from "react-router-dom";

function Employees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("https://localhost:7217/api/Employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleItemClick = (employeeId) => {
    navigate(`/employee/${employeeId}`);
  };

  return (
    <div className="employee-container">
      {employees.map((employee) => (
        <div
          key={employee.employeeId}
          onClick={() => handleItemClick(employee.employeeId)}
          className="employee-item"
          style={{ marginBottom: "10px" }}
        >
          <EmployeeCard employee={employee} />
        </div>
      ))}
    </div>
  );
}

export default Employees;
