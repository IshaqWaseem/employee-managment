import React from "react";
import "./EmployeeCard.css";

function EmployeeCard({ employee }) {
  return (
    <div className="employee-card">
      <h2>
        {employee.firstName} {employee.lastName}{" "}
      </h2>
      <p>{employee.position}</p>
      {}
    </div>
  );
}

export default EmployeeCard;
