import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"
import { Form } from "react-bootstrap"
import Row from "react-bootstrap/Row"
import Button from "../../Components/Button/Button";
import { createEmployee } from "../../ApiCalls/EmployeesApi";
import Employee, { emptyEmployee, defaultEmployeeError, EmployeeError } from "../../Types/Employee";
import toasterConfig from "../../Helpers/ToasterConfig";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ValidateEmployees from "../../Helpers/Validations/ValidateEmployees"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./AddEmployee.css"

const AddEmployees: React.FC = () => {
    const [employee, setEmployee] = useState<Employee>(emptyEmployee);
    const [error, setError] = useState<EmployeeError>(defaultEmployeeError);

    const navigate = useNavigate()

    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setEmployee((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        console.log(employee)
        
        if (ValidateEmployees(employee, setError)){
            createEmployee(employee)
                .then((response)=>{
                    if (response.data.status === "201"){
                        toast.success(response.data.message, toasterConfig);
                        navigate("/employees")
                    } else {
                        toast.error(response.data.message, toasterConfig);
                    }
                })
        } else {
            toast.error("Invalid employee details.", toasterConfig);
            console.log(error)
        }
    }

    const handleBack = () => {
        navigate("/employees")
    }


    return (
        <div className="add-employees-container">
            <div className="add-employees-content-wrapper">
                <Sidebar/>
                <div className="add-employee-form-container">
                    <Form>
                        <div className="add-employee-header">
                            <h1>ADD EMPLOYEE</h1>
                        </div>
                        <div className="add-employee-photo-container">
                          <FontAwesomeIcon icon={["fas","camera"]} className="camera-icon"/>
                        </div>
                        <Row className="add-employee-name-container">

                            <Form.Group>
                                <Form.Label className="add-employee-input-label">
                                    NAME
                                </Form.Label>
                                
                                    <Form.Control 
                                        type="text" 
                                        required={true} 
                                        id="first_name"
                                        name="first_name"
                                        onChange={(e) => handleChange(e)}
                                        className="add-employee-input-box"
                                        placeholder="FIRST NAME"
                                        autoComplete={"off"}
                                    />
                                    
                                    <Form.Control 
                                        type="text" 
                                        // required={true} 
                                        id="middle_name"
                                        name="middle_name"
                                        onChange={(e) => handleChange(e)}
                                        className="add-employee-input-box"
                                        autoComplete={"off"}
                                        placeholder="MIDDLE NAME"
                                    />
                                    <Form.Control 
                                        type="text" 
                                        required={true} 
                                        id="last_name"
                                        name="last_name"
                                        onChange={(e) => handleChange(e)}
                                        className="add-employee-input-box"
                                        placeholder="LAST NAME"
                                        autoComplete={"off"}
                                    />
                                {/* </div> */}
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group>
                                <div className="add-employee-second-row-label">
                                    <h1 className="add-employee-second-row-label-contact">CONTACT NO.</h1>
                                    <h1 className="add-employee-second-row-label-address">ADDRESS</h1>
                                </div>
                               <Form.Control 
                                    type="text" 
                                    required={true} 
                                    id="contact_number"
                                    name="contact_number"
                                    onChange={(e) => handleChange(e)}
                                    className="add-employee-input-box"
                                    autoComplete={"off"}
                                />
                                 <Form.Control 
                                    type="text" 
                                    required={true} 
                                    id="address"
                                    name="address"
                                    onChange={(e) => handleChange(e)}
                                    className="add-employee-address-box"
                                    autoComplete={"off"}
                                />

                            </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group>
                            <div className="add-employee-third-row-label">
                               <h1 className="add-employee-third-row-label-position">POSITION</h1>
                               <h1 className="add-employee-third-row-label-rate">RATE</h1>
                               <h1 className="add-employee-third-row-label-rate-unit">RATE UNIT</h1>
                            </div>
                          <Form.Control
                            type="position"
                            required={true}
                            id="position"
                            name="position"
                            onChange={(e) => handleChange(e)}
                            className="add-employee-input-box"
                          />
                          <Form.Select 
                            className="add-employee-rate-menu"
                            id="rate"
                            name="rate"
                            onChange={(e) => handleChange(e)}
                            >
                            <option value={500}>500</option>
                            <option value={1000}>1000</option>
                          </Form.Select>
                          <Form.Control
                            type="rate_unit"
                            required={true}
                            id="rate_unit"
                            name="rate_unit"
                            onChange={(e) => handleChange(e)}
                            className="add-employee-input-box"
                          />
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group>
                            <div className="add-employee-fourth-row-label">
                              <h1 className="add-employee-fourth-row-label-SSS">SSS</h1>
                            </div>
                            <Form.Control
                              type="SSS"
                              required={true}
                              id="SSS"
                              name="SSS"
                              onChange={(e) => handleChange(e)}
                              className="add-employee-input-box"
                            />
                          </Form.Group>
                        </Row>

                    </Form>

                    <div className="add-employee-button-container">
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

export default AddEmployees;
