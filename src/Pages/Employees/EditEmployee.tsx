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
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./EditEmployee.css"

const EditEmployee: React.FC = () => {
    const [employee, setEmployee] = useState<Employee>(emptyEmployee);
    const location = useLocation()
    const navigate = useNavigate()
    const urlHeader = "/employees/edit/employeeid="
    const employee_id = String(location.pathname.substring(urlHeader.length));

    // Fetch employee details
    useEffect(()=>{
        getEmployees(employee_id)
            .then((response)=>{
                setEmployee(response.data.data.employees[0])
            })
    },[])

    
    
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
        navigate("/employees")
    }

    return (
        <div className="edit-employees-container">
            <div className="edit-employees-content-wrapper">
                <Sidebar/>
                <div className="edit-employee-form-container">
                    <Form>
                        <div className="edit-employee-header">
                            <h1>EDIT EMPLOYEE</h1>
                        </div>
                        {/* <div className="edit-employee-photo-container">
                          <FontAwesomeIcon icon={["fas","camera"]} className="camera-icon"/>
                        </div> */}
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
                                    />
                                {/* </div> */}
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
                                />
                                 <Form.Control 
                                    type="text" 
                                    required={true} 
                                    id="address"
                                    name="address"
                                    onChange={(e) => handleChange(e)}
                                    className="edit-employee-address-box"
                                    autoComplete={"off"}
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
                    </Form> 
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
