import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"
import "./Employees.css"

const Employees: React.FC = () => {
    return (
        <div className="employees-container">
            <div className="employees-content-wrapper">
                <Sidebar/>
                <div className="employee-list-container">
                    <div className="employee-list-header">
                        <h1>EMPLOYEE LIST</h1>
                    </div>
                </div>
            </div>
        </div>      
    );
};

export default Employees;