import React, { useState, useEffect } from "react"
import { H1,H2 } from "../../Components/Headers/Headers";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../../ApiCalls/EmployeesApi";
import Button from "../../Components/Button/Button";

import { toast } from "react-hot-toast";
import toasterConfig from "../../Helpers/ToasterConfig";

import Employees from "./Employees";

import "./EmployeeDetails.css"
import Employee, { emptyEmployee } from "../../Types/Employee";
import Calendar from "../../Components/Calendar/Calendar";
import Advance from "../../Components/Advance/Advance";
import Salary from "../../Components/Salary/Salary";

import icon from "../../Assets/Icons/user-empty-temp.svg"

const EmployeeDetails = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const urlHeader = "/employees/employeeid="
    const employee_id = String(location.pathname.substring(urlHeader.length));
    const [employee, setEmployee] = useState<Employee>(emptyEmployee)
    const tempUser = {
        access_logs: [
            "December 30, 2022 7:00",
            "December 31, 2022 7:00",
        ]
    }

    useEffect(()=>{
        getEmployees(employee_id)
            .then((response) => {
                console.log(response)
                setEmployee(response.data.data.employees[0])
            })
    },[])

    const handleDelete = async() => {
        deleteEmployee(employee_id)
            .then((response)=>{
                if (response.data.status === "200"){
                    toast.success(response.data.message, toasterConfig)
                    navigate("/employees")
                } else {
                    toast.error(response.data.message, toasterConfig)
                }
            })
    }

    // ATTENDANCE


    return(
        <div className="grid">

            <div className="employee-sidebar-container">
                <Employees/>
            </div>

            <div className="employee-details-content-wrapper">
                <div className="employee-details-back"><NavLink to={"/employees"} className={"user-details-back"}>&lt; Employees </NavLink></div>
                
                <div className="employee-details-section">
                    <div className="employee-details-image">
                        <img src={icon}/>
                    </div>
                    <div className="employee-details">
                        <p className="employee-details-header">{employee.first_name} {employee.last_name}</p>
                        <p className="employee-details-role">NO ROLE</p>
                        <p className="employee-details-info">Contact no.: {employee.contact_no}</p>
                        <p className="employee-details-info">Address: {employee.address}</p>
                        <p className="employee-details-info">Rate: NO RATE</p>
                    </div>
                    <div className="employee-details-icons">
                        <Button
                            type="user-edit"
                            handleClick={()=>{navigate("/employees/edit/employeeid="+employee_id)}}
                        />

                        <Button
                            type="user-delete"
                            handleClick={handleDelete}
                        />
                    </div>
                </div>
            </div>
        <div className="c employee-details-calendar-container">
            <Calendar
                employee_id={employee_id}
            />
        </div>
        <div className="c employee-details-advance-container">
            <Advance/>
        </div>
        <div className="c employee-details-salary-container">
            <Salary/>
        </div>
            
        </div>
    )
}

export default EmployeeDetails;
