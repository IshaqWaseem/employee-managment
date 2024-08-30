import React, { useState } from "react";
import AdminSearch from "./AdminSearch";

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({
    employeeId: 0,
    firstName: "",
    lastName: "",
    position: "",
    managerId: 0,
    managerName: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    const filteredValue = value.replace(/[^A-Za-zÆØÅæøå\s]/g, "");
    setEmployee((prevState) => ({
      ...prevState,
      [name]: filteredValue,
    }));
  };

  const handleSearchSelect = (managerId, managerName) => {
    setEmployee((prevState) => ({
      ...prevState,
      managerId: managerId,
      managerName: managerName,
    }));
    setShowSearch(false);
  };

  const clearManagerId = () => {
    setEmployee((prevState) => ({
      ...prevState,
      managerId: null,
    }));
  };

  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { managerName, ...payload } = employee;
    try {
      const response = await fetch("http://localhost:5287/api/Employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
      setErrorMessage("");
      setSuccessMessage("Employee created successfully!");
      setEmployee({
        employeeId: 0,
        firstName: "",
        lastName: "",
        position: "",
        managerId: 0,
        managerName: "",
      }); // Reset fields
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div style={{ marginLeft: "1em" }}>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={employee.firstName}
            onInput={handleInput}
            minLength={2}
            maxLength={30}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={employee.lastName}
            onInput={handleInput}
            minLength={2}
            maxLength={30}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            name="position"
            value={employee.position}
            onChange={handleChange}
            maxLength={30}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="managerId">Manager:</label>
          <button
            className="blueButton"
            type="button"
            onClick={() => setShowSearch(!showSearch)}
          >
            {employee.managerId
              ? `Manager: ${employee.managerName}`
              : "Select Manager"}
          </button>
          {employee.managerId ? (
            <button
              className="redButton"
              type="button"
              onClick={clearManagerId}
            >
              Clear Manager
            </button>
          ) : null}
        </div>
        <div className="form-group">
          {showSearch && <label>Search:</label>}
          {showSearch && <AdminSearch onSelect={handleSearchSelect} />}
        </div>
        <button className="greenButton" type="submit">
          Add Employee
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

export default CreateEmployee;
