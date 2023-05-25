import React, {useState, useEffect} from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"
import "./Employees.css"

import { NavLink} from "react-router-dom";
import Button from "../../Components/Button/Button";

import Employee, { emptyEmployee } from "../../Types/Employee";

import { getEmployees } from "../../ApiCalls/EmployeesApi";
import CalendarGeneral from "../../Components/Calendar/CalendarGeneral";

interface EmployeeProps{
    type?: "details"|"list",
  }

const Employees: React.FC<EmployeeProps> = ({type}) => {
    const [employees, setEmployees] = useState<[Employee]>()
    
    // FETCH USERS DATA
    useEffect(()=>{
        getEmployees()
            .then((response)=>{
                console.log(response)
                console.log(response.data.data.employees)
                setEmployees(response.data.data.employees)
            })

    },[])
    

    return (
        <div className="employees-container">
            <div className="employees-content-wrapper">
                <Sidebar/>
                <div className="employee-list-container">
                    <div className="employee-list-header">
                        <h1>EMPLOYEE LIST</h1>
                        <NavLink to={"/employees/add"}>
                            <Button
                                type="add-employee"
                                handleClick={()=>{}}
                            />
                        </NavLink>
                    </div>

                    <div className="employee-list-body">
                        {employees && employees.length? employees.map(({id, first_name, middle_name, last_name}) => 
                            
                            <div className="employee-list-content">
                                
                                <NavLink to={"/employees/employeeid="+id} className="employee-list-link" reloadDocument= {true}>
                                    <div>
                                    <text className="employee-list-name" key={id}>{first_name + " " + middle_name + " " + last_name}</text>
                                    {/* <text className="employee-list-username">{" (" + username + ")"}</text> */}
                                    </div>
                                </NavLink>
                            </div>
                        ):<></>}

                    </div>

                </div>
                { type!=="details"? 
                    <div className="employee-list-calendar-container">
                        <CalendarGeneral
                            employees={employees}
                        />

                    </div>
                :<></>}
                
            </div>
        </div>      
    );
};

export default Employees;
