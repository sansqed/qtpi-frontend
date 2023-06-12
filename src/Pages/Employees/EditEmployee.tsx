import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "../../Components/Button/Button";
import { updateEmployee, deleteEmployee } from "../../ApiCalls/EmployeesApi";
import Employee, { emptyEmployee, defaultEmployeeError, EmployeeError } from "../../Types/Employee";
import toasterConfig from "../../Helpers/ToasterConfig";
import { toast } from "react-hot-toast";
import { useNavigate, NavLink } from "react-router-dom";
import ValidateEmployees from "../../Helpers/Validations/ValidateEmployees"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPositions } from "../../ApiCalls/EmployeesApi";
import { Helmet } from "react-helmet";
import { AppName } from "../../Helpers/Util";

import "./EditEmployee.css"

interface EditEmployeeProps{
    employeeArg: Employee
    setIsEmployeesChanged: Function
}

const EditEmployee: React.FC<EditEmployeeProps> = ({employeeArg, setIsEmployeesChanged}) => {
    const [employee, setEmployee] = useState<Employee>(employeeArg);
    const [error, setError] = useState<EmployeeError>(defaultEmployeeError);
    const [positions, setPositions] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        getPositions()
            .then((response)=>{
                setPositions(response.data.data.positions)
            })
    },[])

    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setEmployee((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    
    const handleSubmit = () => {
        // console.log(employee)
        
        if (ValidateEmployees(employee, setError)){
            updateEmployee(employee)
                .then((response)=>{
                    // console.log(response)
                    if (response.data.status === "200"){
                        toast.success(response.data.message, toasterConfig);
                        setIsEmployeesChanged(true)
                        navigate("/employees/details/employee_id="+employee.id)
                    } else {
                        toast.error(response.data.message, toasterConfig);
                    }
                })
        } else {
            toast.error("Invalid employee details.", toasterConfig);
            // console.log(error)
        }
    }

    const handleDelete = async() => {
        deleteEmployee(employee.id)
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
    // console.log(employee)
  
    return (
        <div className="edit-employees-container">
            <Helmet>
                <title>Edit Employee - {AppName}</title>
            </Helmet>
            <div className="edit-employees-content-wrapper">
                <div className="edit-employee-form-container">
                    <div className="edit-employee-header">
                        <div className="edit-employee-back"><NavLink to={"/employees"}>&lt; Employees </NavLink></div>
                        <h2>EDIT EMPLOYEE</h2>
                    </div>
                    <Form>
                        {/* <div className="edit-employee-photo-container edit-employee-row">
                          <FontAwesomeIcon icon={["fas","camera"]} className="camera-icon"/>
                        </div> */}
                        <Row className="edit-employee-row">
                            <Form.Group>
                                <Form.Label className="edit-employee-input-label" as={"h4"}>
                                    Name <span className="input-required">*</span>
                                </Form.Label>
                                
                                    <Form.Control 
                                        type="text" 
                                        required={true} 
                                        id="first_name"
                                        name="first_name"
                                        onChange={(e) => handleChange(e)}
                                        className="edit-employee-input-box first-name"
                                        placeholder="FIRST NAME"
                                        autoComplete={"off"}
                                        isInvalid={error.first_name}
                                        value={employee.first_name}
                                    />
                                    
                                    <Form.Control 
                                        type="text" 
                                        // required={true} 
                                        id="middle_name"
                                        name="middle_name"
                                        onChange={(e) => handleChange(e)}
                                        className="edit-employee-input-box half-size"
                                        autoComplete={"off"}
                                        placeholder="MIDDLE NAME"
                                        value={employee.middle_name}
                                    />
                                    <Form.Control 
                                        type="text" 
                                        required={true} 
                                        id="last_name"
                                        name="last_name"
                                        onChange={(e) => handleChange(e)}
                                        className="edit-employee-input-box half-size"
                                        placeholder="LAST NAME"
                                        autoComplete={"off"}
                                        isInvalid={error.last_name}
                                        value={employee.last_name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        First and last names are required
                                    </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        
                        <Row>
                            <Form.Group>
                                <Form.Label className="edit-employee-input-label" as={"h4"}>
                                    Address <span className="input-required">*</span>
                                </Form.Label>
                                <Form.Control 
                                    type="text" 
                                    required={true} 
                                    id="address"
                                    name="address"
                                    onChange={(e) => handleChange(e)}
                                    className="edit-employee-input-box"
                                    autoComplete={"off"}
                                    isInvalid={error.address}
                                    value={employee.address}
                                />
                                    <Form.Control.Feedback type="invalid">
                                        Address is required
                                    </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="edit-employee-row">
                            <Col>
                                <Form.Group>
                                    <Form.Label className="edit-employee-input-label" as={"h4"}>
                                        Contact number <span className="input-required">*</span>
                                    </Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        required={true} 
                                        id="contact_no"
                                        name="contact_no"
                                        onChange={(e) => handleChange(e)}
                                        className="edit-employee-input-box half-size"
                                        autoComplete={"off"}
                                        isInvalid={error.contact_no}
                                        value={employee.contact_no}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Contact number is required
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="edit-employee-input-label" as={"h4"}>
                                        Position <span className="input-required">*</span>
                                    </Form.Label>
                                    <Form.Select 
                                        className="edit-employee-input-box dropdown half-size"
                                        id="position_id"
                                        name="position_id"
                                        onChange={(e) => handleChange(e)}
                                        defaultValue={""}
                                        isInvalid={error.position_id}
                                        value={employee.position_id}
                                    >
                                        <option value="" disabled>Select a role</option>
                                        {positions.length? 
                                            positions.map(({id, name})=><option value={id}>{name}</option>)
                                        :null}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Position is required
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="edit-employee-row">
                            <Col>
                                <Form.Group>
                                    <Form.Label className="edit-employee-input-label" as={"h4"}>
                                        Daily rate <span className="input-required">*</span>
                                    </Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        required={true} 
                                        id="rate"
                                        name="rate"
                                        onChange={(e) => handleChange(e)}
                                        className="edit-employee-input-box half-size"
                                        autoComplete={"off"}
                                        isInvalid={error.rate}
                                        value={employee.rate}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Daily rate is required and should be valid
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="edit-employee-input-label" as={"h4"}>
                                        SSS contribution
                                    </Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        required={true} 
                                        id="SSS"
                                        name="SSS"
                                        onChange={(e) => handleChange(e)}
                                        className="edit-employee-input-box half-size"
                                        autoComplete={"off"}
                                        isInvalid={error.SSS}
                                        value={employee.SSS}
                                    />
                                </Form.Group>
                                <Form.Control.Feedback type="invalid">
                                        SSS contribution should be valid
                                </Form.Control.Feedback>
                            </Col>
                        </Row>

                        <Row>
                            <Form.Group>
                                <Form.Label className="edit-employee-input-label" as={"h4"}>
                                    Payout <span className="input-required">*</span>
                                </Form.Label>
                                <Form.Select 
                                    className="edit-employee-input-box dropdown half-size"
                                    id="payout"
                                    name="payout"
                                    onChange={(e) => handleChange(e)}
                                    defaultValue={""}
                                    isInvalid={error.payout}
                                    value={employee.payout}
                                >
                                    <option value="" disabled>Select payout</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                        Payout is required
                                    </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    </Form>

                    <div className="edit-employee-btn-container">
                        <Button
                            type="delete-with-confirmation"
                            handleClick={handleDelete}
                        />
                        <div className="edit-employee-submit-btn">
                            <Button 
                                handleClick={handleSubmit}
                                type= "user-edit-submit"
                            />
                        </div>
                    </div>

                </div>
                {/* sidebar sibling level */}
            </div>
        </div>      
    );
};

export default EditEmployee;
