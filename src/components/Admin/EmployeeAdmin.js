import React, { useState } from "react";
import "./EmployeeAdmin.css";
import CreateEmployee from "./CreateEmployee";
import UpdateEmployee from "./UpdateEmployee";
import DeleteEmployee from "./DeleteEmployee";

const EmployeeAdmin = () => {
  const [activeForm, setActiveForm] = useState(null);

  const handleButtonClick = (formName) => {
    setActiveForm((prevForm) => (prevForm === formName ? null : formName));
  };

  return (
    <div>
      <div className="adminButtons">
        <button className="option" onClick={() => handleButtonClick("create")}>
          {activeForm === "create" ? "Cancel" : "Create"}
        </button>
        <button className="option" onClick={() => handleButtonClick("update")}>
          {activeForm === "update" ? "Cancel" : "Update"}
        </button>
        <button className="option" onClick={() => handleButtonClick("delete")}>
          {activeForm === "delete" ? "Cancel" : "Delete"}
        </button>
      </div>
      {activeForm === "create" && <CreateEmployee />}
      {activeForm === "update" && <UpdateEmployee />}
      {activeForm === "delete" && <DeleteEmployee />}
    </div>
  );
};

export default EmployeeAdmin;
