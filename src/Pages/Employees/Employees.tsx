import React, {useState, useEffect} from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"
import "./Employees.css"

import { NavLink, useLocation } from "react-router-dom";
import Button from "../../Components/Button/Button";

import Employee, { emptyEmployee } from "../../Types/Employee";

import { getEmployees } from "../../ApiCalls/EmployeesApi";
import CalendarGeneral from "../../Components/Calendar/CalendarGeneral";

import EmployeeDetails from "./EmployeeDetails";
import EditEmployee from "./EditEmployee";
import AddEmployees from "./AddEmployee";

const Employees: React.FC= () => {
    const [employees, setEmployees] = useState<[Employee]>()
    const location = useLocation()
    const paths = location.pathname.split('/')
    const action = paths[2]
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
    const [isEmployeesChanged, setIsEmployeesChanged] = useState(false)
    
    // FETCH USERS DATA
    useEffect(()=>{
        getEmployees()
            .then((response)=>{
                console.log(response)
                console.log(response.data.data.employees)
                setEmployees(response.data.data.employees)
                setIsEmployeesChanged(false)
            })
        // setEmployees([tempEmployee])
    },[isEmployeesChanged])


    const getSelectedEmployee = () => {
        const employeeId = paths[3].split('=')[1]
        setSelectedEmployeeId(employeeId)
        return employees?.find(({id})=>id===employeeId) || emptyEmployee
    }

    const DisplayRightSide = () => {
        if (action==="details"){
            return(
                <EmployeeDetails
                    employeeArg={getSelectedEmployee()}
                    setIsEmployeesChanged={setIsEmployeesChanged}
                    isEmployeeChanged={isEmployeesChanged}
                />
            )
        }
        else if (action === "edit"){
            return (
                <EditEmployee
                    employeeArg={getSelectedEmployee()}
                    setIsEmployeesChanged={setIsEmployeesChanged}
                />
            )
        }
        else if (action === "add"){
            setSelectedEmployeeId('')
            return (
                <AddEmployees
                    setIsEmployeesChanged={setIsEmployeesChanged}
                />
            )
        }
        else{
            setSelectedEmployeeId('')
            return(
                    <CalendarGeneral
                        employees={employees || []}
                    />
            ) 
        }
    }
    

    return (
        <div className="employees-container">
            <div className="employees-content-wrapper">
                <Sidebar/>
                <div className="employee-list-container">
                    <div className="employee-list-header">
                        <h1>EMPLOYEES</h1>
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
                                <NavLink to={"/employees/details/employee_id="+id} className={"employee-list-link" + (id===selectedEmployeeId? " active":"")} reloadDocument= {false}>
                                    <text className="employee-list-name" key={id}>{first_name + " " + middle_name + " " + last_name}</text>
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
