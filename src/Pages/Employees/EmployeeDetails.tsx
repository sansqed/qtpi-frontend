import React, { useState, useEffect } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { deleteEmployee } from "../../ApiCalls/EmployeesApi";
import Button from "../../Components/Button/Button";
import { moneyFormatter } from "../../Helpers/Util";

import { toast } from "react-hot-toast";
import toasterConfig from "../../Helpers/ToasterConfig";

import "./EmployeeDetails.css"
import Employee, { emptyEmployee } from "../../Types/Employee";
import Calendar from "../../Components/Calendar/Calendar";
import Advance from "../../Components/Advance/Advance";
import Salary from "../../Components/Salary/Salary";

import { Helmet } from "react-helmet";
import { AppName } from "../../Helpers/Util";
import { getRoleId } from "../../Helpers/UserFunctions";

interface EmployeeDetailsProps{
    employeeArg: Employee;
    isEmployeeChanged:boolean
    setIsEmployeesChanged:Function
}

const EmployeeDetails:React.FC<EmployeeDetailsProps> = ({employeeArg, isEmployeeChanged, setIsEmployeesChanged}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const employee_id = employeeArg.id;
    const [employee, setEmployee] = useState<Employee>(employeeArg)
    const [isDetailsChanged, setIsDetailsChanged] = useState(false)
    const role_id = getRoleId()

    const fullName = employee.first_name + " " + (employee.middle_name===""? "":employee.middle_name+" ") + employee.last_name

    const handleDelete = async() => {
        deleteEmployee(employee_id)
            .then((response)=>{
                if (response.data.status === "200"){
                    toast.success(response.data.message, toasterConfig)
                    setIsEmployeesChanged(true)
                    navigate("/employees")
                } else {
                    toast.error(response.data.message, toasterConfig)
                }
            })
    }

    return(
        <div className="employee-details-container">
            <Helmet>
                <title>Employee {employee.first_name} {employee.last_name} - {AppName}</title>
            </Helmet>
            <div className="employee-details-grid">

                <div className="employee-details-content-container">
                    <div className="employee-details-back"><NavLink to={"/employees"} className={"user-details-back"}>&lt; Employees </NavLink></div>
                    
                    <div className="employee-details-section header">
                        {/* <div className="employee-details-image">
                            <img src={icon}/>
                        </div> */}
                        <div className="employee-details-section name-position">
                            <h1>{fullName}</h1>
                            <p>{employee.position_name}</p>
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
                            <p className="employee-details-info">{moneyFormatter.format(Number(employee.rate))}</p>
                        </div>
                        <div className="employee-details-subsection payout">
                            <p className="employee-details-label">Payout</p>
                            <p className="employee-details-info">{employee.payout}</p>
                        </div>
                    </div>
                    <div className="employee-details-section btns">
                        <div className="employee-details-delete-btn">
                            <Button
                                type="delete-with-confirmation"
                                handleClick={handleDelete}
                                disabled={role_id !== "1"}
                            />
                        </div>
                        <div className="employee-details-edit-btn">
                            <Button
                                type="user-edit"
                                handleClick={()=>{navigate("/employees/edit/employee_id="+employee_id)}}
                                disabled={role_id !== "1"}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="employee-details-calendar-container">
                    <Calendar
                        employee_id={employee_id}
                        setIsDetailsChanged={setIsDetailsChanged}
                    />
                </div>
                <div className="employee-details-advance-container">
                    <Advance
                        employee_id={employee_id}
                        payout={employee.payout}
                        setIsDetailsChanged={setIsDetailsChanged}
                    />
                </div>
                <div className="employee-details-salary-container">
                    <Salary
                        employee_id={employee_id}
                        rate={Number(employee.rate)}
                        payout={employee.payout}
                        isDetailsChanged={isDetailsChanged||isEmployeeChanged}
                        setIsDetailsChanged={setIsDetailsChanged}
                        hasSSS={employee.SSS==="" || employee.SSS===null? false:true}
                        SSS={employee.SSS==="" || employee.SSS===null? 0:Number(employee.SSS)}
                    />
                </div>
                
            </div>
        </div>
    )
}

export default EmployeeDetails;
