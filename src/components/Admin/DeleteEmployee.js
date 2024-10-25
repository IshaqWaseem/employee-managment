import React, { useState } from "react";
import AdminSearch from "./AdminSearch";

const DeleteEmployee = () => {
  const [employee, setEmployee] = useState({
    employeeId: 0,
    firstName: "",
    lastName: "",
  });

  const [showSearch, setShowSearch] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSearchSelect = (employeeId, firstName, lastName) => {
    setEmployee((prevState) => ({
      ...prevState,
      employeeId: employeeId,
      firstName: firstName,
      lastName: lastName,
    }));
    setShowSearch(false);
  };
  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://localhost:7217/api/Employees/${employee.employeeId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = response.status !== 204 ? await response.json() : null;

      console.log("Success:", result);
      setErrorMessage("");
      setSuccessMessage("Employee deleted successfully!");
      setEmployee({
        employeeId: 0,
      });
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Please select an employee");
      setSuccessMessage("");
    }
  };

  return (
    <div style={{ marginLeft: "1em" }}>
      <h2>Delete Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employeeId">Employee:</label>
          <button
            className="blueButton"
            type="button"
            onClick={() => setShowSearch(!showSearch)}
          >
            {employee.employeeId
              ? `Employee: ${employee.firstName}`
              : "Select Employee"}
          </button>
        </div>
        <div className="form-group">
          {showSearch && <label>Search:</label>}
          {showSearch && <AdminSearch onSelect={handleSearchSelect} />}
        </div>
        <button className="redButton" type="submit">
          Delete Employee
        </button>
      </form>
      {errorMessage && (
        <div className="error-message">
          {errorMessage}

          <button className="clearButton" onClick={clearMessages}>
            &times;
          </button>
        </div>
      )}
      {successMessage && (
        <div className="success-message">
          {successMessage}

          <button className="clearButton" onClick={clearMessages}>
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteEmployee;
