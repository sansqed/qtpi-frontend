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
import userEvent from "@testing-library/user-event";

interface EmployeeDetailsProps{
    employeeArg: Employee;
}

const EmployeeDetails:React.FC<EmployeeDetailsProps> = ({employeeArg}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const employee_id = employeeArg.id;
    const [employee, setEmployee] = useState<Employee>(employeeArg)

    // useEffect(()=>{
    //     getEmployees(employee_id)
    //         .then((response) => {
    //             console.log(response)
    //             setEmployee(response.data.data.employees[0])
    //         })
    // },[])
    console.log(employee)
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

    return(
        <div className="employee-details-container">

            <div className="employee-details-grid">

                <div className="employee-details-content-container">
                    <div className="employee-details-back"><NavLink to={"/employees"} className={"user-details-back"}>&lt; Employees </NavLink></div>
                    
                    <div className="employee-details-section header">
                        <div className="employee-details-image">
                            <img src={icon}/>
                        </div>
                        <div className="employee-details-section name-position">
                            <h1>{employee.first_name} {employee.middle_name} {employee.last_name}</h1>
                            <p>{employee.position}</p>
                        </div>
                    </div> 

                    <div className="employee-details-section">
                        <p className="employee-details-label">Contact Number</p>
                        <p className="employee-details-info">{employee.contact_no}</p>
                    </div>

                    <div className="employee-details-section">
                        <p className="employee-details-label">Address</p>
                        <p className="employee-details-info">{employee.address}</p>
                    </div>

                    <div className="employee-details-section rate-payout">
                        <div className="employee-details-subsection rate">
                            <p className="employee-details-label">Rate</p>
                            <p className="employee-details-info">{employee.rate}</p>
                        </div>
                        <div className="employee-details-subsection payout">
                            <p className="employee-details-label">Payout</p>
                            <p className="employee-details-info">{employee.payout}</p>
                        </div>
                    </div>
                    <div className="employee-detai  ls-section btns">
                        <div className="employee-details-delete-btn">
                            <Button
                                type="user-delete"
                                handleClick={handleDelete}
                            />
                        </div>
                        <div className="employee-details-edit-btn">
                            <Button
                                type="user-edit"
                                handleClick={()=>{navigate("/employees/edit/employeeid="+employee_id)}}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="employee-details-calendar-container">
                    <Calendar
                        employee_id={employee_id}
                        />
                </div>
                <div className="employee-details-advance-container">
                    <Advance
                        employee_id={employee_id}
                    />
                </div>
                <div className="employee-details-salary-container">
                    <Salary/>
                </div>
                
            </div>
        </div>
    )
}

export default EmployeeDetails;
