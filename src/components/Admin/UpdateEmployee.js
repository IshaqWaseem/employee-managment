import React, { useState } from "react";
import AdminSearch from "./AdminSearch";

const UpdateEmployee = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [managerId, setManagerId] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    position: "",
    managerId: "",
    managerName: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmployeeSearch = async (selectedEmployeeId) => {
    setEmployeeId(selectedEmployeeId);

    try {
      const response = await fetch(
        `https://localhost:7217/api/Employees/${selectedEmployeeId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch employee data");
      }
      const result = await response.json();

      const { employee } = result;
      const managerName =
        result.manager && result.manager.firstName && result.manager.lastName
          ? `${result.manager.firstName} ${result.manager.lastName}`
          : "";
      console.log(result);
      const { employeeId, firstName, lastName, position, managerId } = employee;

      setEmployeeData({
        employeeId,
        firstName,
        lastName,
        position,
        managerId: managerId !== null ? managerId : "",
        managerName: managerName !== null ? managerName : "",
      });

      setManagerId(managerId !== null ? managerId : "");
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  const handleManagerSearch = (selectedManagerId, managerName) => {
    setManagerId(selectedManagerId);
    setEmployeeData((prevState) => ({
      ...prevState,
      managerId: selectedManagerId,
      managerName: managerName,
    }));
    setShowSearch(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearManagerId = () => {
    setManagerId(null);
    setEmployeeData((prevState) => ({
      ...prevState,
      managerId: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { managerName, ...payload } = employeeData;

    if (!employeeId) {
      console.error("Employee is not selected!");
      setErrorMessage("Employee is not selected!"); // Set specific error message
      return;
    }

    try {
      const response = await fetch(
        `https://localhost:7217/api/Employees/${employeeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...payload,
            managerId: employeeData.managerId
              ? parseInt(employeeData.managerId, 10)
              : null,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update employee");
      }

      const result = await response.json();
      console.log("Employee updated successfully:", result);
      setErrorMessage(""); // Clear any previous error message
      setSuccessMessage("Employee updated successfully!"); // Set success message
    } catch (error) {
      console.error("Error updating employee:", error.message);
      setErrorMessage(error.message); // Set the error message to be displayed
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div style={{ marginLeft: "1em" }}>
      <h2>Update Employee</h2>
      <div className="form-group">
        <label>Employee:</label>
        <AdminSearch onSelect={handleEmployeeSearch} />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={employeeData.firstName}
            onChange={handleChange}
            minLength={2}
            maxLength={30}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={employeeData.lastName}
            onChange={handleChange}
            minLength={2}
            maxLength={30}
            required
          />
        </div>
        <div className="form-group">
          <label>Position:</label>
          <input
            type="text"
            name="position"
            value={employeeData.position}
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
            {employeeData.managerId
              ? `Manager: ${employeeData.managerName}`
              : "Select Manager"}
          </button>
          {employeeData.managerId ? (
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
          {showSearch && <AdminSearch onSelect={handleManagerSearch} />}
        </div>
        <button className="greenButton" type="submit">
          Update Employee
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

export default UpdateEmployee;
