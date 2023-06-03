import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"
import { Form, FormGroup, FormLabel, } from "react-bootstrap"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "../../Components/Button/Button";
import { getEmployees, updateEmployee } from "../../ApiCalls/EmployeesApi";
import Employee, { emptyEmployee } from "../../Types/Employee";
import toasterConfig from "../../Helpers/ToasterConfig";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./EditEmployee.css"

interface EditEmployeeProps{
    employeeArg:Employee;
}

const EditEmployee: React.FC<EditEmployeeProps> = ({employeeArg}) => {
    const [employee, setEmployee] = useState<Employee>(employeeArg);
    const location = useLocation()
    const navigate = useNavigate()
    const urlHeader = "/employees/edit/employeeid="
    const employee_id = String(location.pathname.substring(urlHeader.length));

    // Fetch employee details
    
    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setEmployee((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async() => {
        updateEmployee(employee)
            .then((response)=>{
                if (response.data.status === "200"){
                    toast.success("Update success", toasterConfig)
                    setTimeout(()=>{
                        navigate("/employees/employeeid="+employee_id)
                    }, 2000)
                } else {
                    toast.error("Update failed", toasterConfig)
                }
            })
    }

    const handleBack = () => {
        navigate("/employees/employeeid="+employee_id)
    }

    return (
        <div className="edit-employees-container">
            <div className="edit-employees-content-wrapper">
                <div className="edit-employee-form-container">
                        <div className="edit-employee-header">
                            <div className="employee-details-back">
                                <NavLink to={"/employees"} className={"user-details-back"}>&lt; Employees </NavLink>
                            </div>
                            <h2>EDIT EMPLOYEE</h2>
                        </div>
                        <Row className="edit-employee-name-container">

                            <Form.Group>
                                <Form.Label className="edit-employee-input-label">
                                    NAME
                                </Form.Label>
                                
                                    <Form.Control 
                                        type="text" 
                                        required={true} 
                                        id="first_name"
                                        name="first_name"
                                        onChange={(e) => handleChange(e)}
                                        className="edit-employee-input-box"
                                        placeholder="FIRST NAME"
                                        autoComplete={"off"}
                                        defaultValue={employee.first_name}
                                    />
                                    
                                    <Form.Control 
                                        type="text" 
                                        // required={true} 
                                        id="middle_name"
                                        name="middle_name"
                                        onChange={(e) => handleChange(e)}
                                        className="edit-employee-input-box"
                                        autoComplete={"off"}
                                        placeholder="MIDDLE NAME"
                                        defaultValue={employee.middle_name}
                                    />
                                    <Form.Control 
                                        type="text" 
                                        required={true} 
                                        id="last_name"
                                        name="last_name"
                                        onChange={(e) => handleChange(e)}
                                        className="edit-employee-input-box"
                                        placeholder="LAST NAME"
                                        autoComplete={"off"}
                                        defaultValue={employee.last_name}
                                    />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group>
                                <div className="edit-employee-second-row-label">
                                    <h1 className="edit-employee-second-row-label-contact">CONTACT NO.</h1>
                                    <h1 className="edit-employee-second-row-label-address">ADDRESS</h1>
                                </div>
                               <Form.Control 
                                    type="text" 
                                    required={true} 
                                    id="contact_number"
                                    name="contact_number"
                                    onChange={(e) => handleChange(e)}
                                    className="edit-employee-input-box"
                                    autoComplete={"off"}
                                    defaultValue={employee.contact_no}
                                />
                                 <Form.Control 
                                    type="text" 
                                    required={true} 
                                    id="address"
                                    name="address"
                                    onChange={(e) => handleChange(e)}
                                    className="edit-employee-address-box"
                                    autoComplete={"off"}
                                    defaultValue={employee.address}
                                />

                            </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group>
                            <div className="edit-employee-third-row-label">
                               <h1 className="edit-employee-third-row-label-position">POSITION</h1>
                            </div>
                          <Form.Control
                            type="position"
                            required={true}
                            id="position"
                            name="position"
                            onChange={(e) => handleChange(e)}
                            className="edit-employee-input-box"
                          />
                          </Form.Group>
                        </Row>
                    <div className="edit-employee-submit-container">
                        <Button
                            type="back"
                            handleClick={handleBack}
                        />
                        <Button 
                            handleClick={handleSubmit}
                            type= "submit"
                            
                        >
                            SUBMIT
                        </Button>
                    </div>

                </div>
                {/* sidebar sibling level */}
            </div>
        </div>      
    );
};

export default EditEmployee;
