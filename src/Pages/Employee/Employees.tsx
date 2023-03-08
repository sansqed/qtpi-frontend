import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"
import "./Employees.css"

const Employees: React.FC = () => {
    return (
        <div className="employees-container">
            <Sidebar/>
        </div>      
    );
};

export default Employees;