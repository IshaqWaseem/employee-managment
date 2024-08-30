// EmployeeDetail.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeCard from "./EmployeeCard";

function EmployeeDetail() {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7217/api/Employees/${employeeId}`
        );
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  if (!employeeData) {
    return <div>Loading...</div>;
  }

  const { employee, manager, subordinates } = employeeData;

  const handleEmployeeClick = (id) => {
    navigate(`/employee/${id}`);
  };

  return (
    <div className="employee-detail-container">
      <h1>Employee Details</h1>
      <div
        onClick={() => handleEmployeeClick(employee.employeeId)}
        style={{ cursor: "pointer", marginBottom: "20px" }}
      >
        <EmployeeCard employee={employee} />
      </div>

      {manager && (
        <>
          <h2>Manager</h2>
          <div
            onClick={() => handleEmployeeClick(manager.employeeId)}
            style={{ cursor: "pointer", marginBottom: "20px" }}
          >
            <EmployeeCard employee={manager} />
          </div>
        </>
      )}

      {subordinates.length > 0 && (
        <>
          <h2>Subordinates</h2>
          <div className="subordinates-container">
            {subordinates.map((subordinate) => (
              <div
                key={subordinate.employeeId}
                onClick={() => handleEmployeeClick(subordinate.employeeId)}
                style={{ cursor: "pointer", marginBottom: "10px" }}
              >
                <EmployeeCard employee={subordinate} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default EmployeeDetail;
