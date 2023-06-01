import React, {useState, useEffect} from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"
import "./Employees.css"

import { NavLink, useLocation } from "react-router-dom";
import Button from "../../Components/Button/Button";

import Employee, { emptyEmployee } from "../../Types/Employee";

import { getEmployees } from "../../ApiCalls/EmployeesApi";
import CalendarGeneral from "../../Components/Calendar/CalendarGeneral";

import EmployeeDetails from "./EmployeeDetails";

// interface EmployeeProps{
//     type?: "details"|"list",
//   }

const Employees: React.FC= () => {
    const [employees, setEmployees] = useState<[Employee]>()
    const location = useLocation()
    const paths = location.pathname.split('/')
    const action = paths[2]
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
    console.log(action)
    
    // FETCH USERS DATA
    useEffect(()=>{
        getEmployees()
            .then((response)=>{
                console.log(response)
                console.log(response.data.data.employees)
                setEmployees(response.data.data.employees)
            })

    },[])

    const getSelectedEmployee = () => {
        const employeeId = paths[3].split('=')[1]
        setSelectedEmployeeId(employeeId)
        return employees?.find(({id})=>id===employeeId) || emptyEmployee
    }

    const DisplayRightSide = () => {
        if (action==="details")
            // return null
            return(
                <EmployeeDetails
                    employeeArg={getSelectedEmployee()}
                />
            )
            // return(<UserDetails user={getUser()} setIsChanged={setIsChanged}/>)
        else if (action === "edit")
            return (
                // <EditUser 
                //     userArg={getUser()}
                //     setIsChanged={setIsChanged}
                // />
                null
            )
        else if (action === "add")
                // return(<AddUsers setIsChanged={setIsChanged}/>)
                return null
        else{
            setSelectedEmployeeId('')
            return(
                // <div className="employee-list-calendar-container">
                    <CalendarGeneral
                        employees={employees || []}
                    />
                // </div>
            ) 
        }
    }
    

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
                        <div className="employee-list-body-wrapper">
                        {employees && employees.length? employees.map(({id, first_name, middle_name, last_name}) => 
                            
                            <div className="employee-list-content">
                                
                                <NavLink to={"/employees/details/employeeid="+id} className="employee-list-link" reloadDocument= {false}>
                                    <div>
                                    <text className="employee-list-name" key={id}>{first_name + " " + middle_name + " " + last_name}</text>
                                    {/* <text className="employee-list-username">{" (" + username + ")"}</text> */}
                                    </div>
                                </NavLink>
                            </div>
                            
                        ):<></>}
                        </div>
                    </div>

                </div>
                <DisplayRightSide/>
                
            </div>
        </div>      
    );
};

export default Employees;
