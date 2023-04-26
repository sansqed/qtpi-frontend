import React, {useState, useEffect} from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"
import "./Employees.css"

import { NavLink } from "react-router-dom";
import Button from "../../Components/Button/Button";

import Employee, { emptyEmployee } from "../../Types/Employee";

import { getEmployees } from "../../ApiCalls/EmployeesApi";

const Employees: React.FC = () => {

    const [employees, setUsers] = useState<[Employee]>()

    // FETCH USERS DATA
    useEffect(()=>{
        getEmployees()
            .then((response)=>{
                console.log(response.data.data.employees)
                setUsers(response.data.data.employees)
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
                                <NavLink to={"/employees/employeeid="+id} className="employee-list-link">
                                    <text className="employee-list-name" key={id}>{first_name + " " + middle_name + " " + last_name}</text>
                                    {/* <text className="employee-list-username">{" (" + username + ")"}</text> */}
                                </NavLink>
                            </div>
                        ):<></>}

                    </div>
                </div>
            </div>
        </div>      
    );
};

export default Employees;
