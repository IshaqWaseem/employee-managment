import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeCard from "../EmployeeCard";
import "../Search.css";

const AdminSearch = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      if (searchTerm.length > 1) {
        setLoading(true);
        setErrorMessage("");
        try {
          const response = await axios.get(
            `http://localhost:5287/api/Employees/${searchTerm}/search`
          );
          if (response.data.length > 0) {
            setSearchResults(response.data);
          } else {
            setSearchResults([]);
            setErrorMessage("No employees found.");
          }
        } catch (error) {
          setErrorMessage("Error fetching employees.");
        } finally {
          setLoading(false);
        }
      } else if (searchTerm.length > 0) {
        setErrorMessage("Please enter at least 2 characters.");
        setSearchResults([]);
      } else {
        setSearchResults([]);
        setErrorMessage("");
      }
    };

    const debounceFetch = setTimeout(fetchEmployees, 500);

    return () => clearTimeout(debounceFetch);
  }, [searchTerm]);

  const handleItemClick = (employee) => {
    onSelect(employee.employeeId, employee.firstName + " " + employee.lastName);
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search employees..."
      />
      {loading && <p>Loading...</p>}
      {!loading && errorMessage && <p>{errorMessage}</p>}
      {!loading && searchResults.length > 0 && (
        <ul>
          {searchResults.map((employee) => (
            <li
              key={employee.employeeId}
              onClick={() => handleItemClick(employee)}
            >
              <EmployeeCard employee={employee} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminSearch;
