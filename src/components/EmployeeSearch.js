import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmployeeCard from "./EmployeeCard";
import "./Search.css";

function EmployeeSearch() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      if (searchTerm.length > 1) {
        try {
          const response = await axios.get(
            `http://localhost:5287/api/Employees/${searchTerm}/search`
          );
          setSearchResults(response.data);
        } catch (error) {
          console.error("Error fetching employees:", error);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchEmployees();
  }, [searchTerm]);

  const handleItemClick = (employeeId) => {
    navigate(`/employee/${employeeId}`);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleInputChange} />
      <ul>
        {searchResults.map((employee) => (
          <li
            key={employee.employeeId}
            onClick={() => handleItemClick(employee.employeeId)}
          >
            <EmployeeCard employee={employee} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeSearch;
