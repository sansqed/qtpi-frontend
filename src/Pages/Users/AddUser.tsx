import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"
import { Form, FormGroup, FormLabel, } from "react-bootstrap"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import "./AddUser.css"
import Button from "../../Components/Button/Button";

const AddUsers: React.FC = () => {
    const [loginCreds, setLoginCreds] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        contactNumber: "",
        address: "",
        role: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setLoginCreds((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="add-users-container">
            <div className="add-users-content-wrapper">
                <Sidebar/>
                <div className="add-user-container">
                <Form>
                    <div className="add-user-header">
                        <h1>ADD USER</h1>
                    </div>
                    <Row className="add-user-name-container">
                        <Col>
                        <FormGroup className="add-user-name-input">
                            <FormLabel className="add-user-input-label">
                                NAME
                            </FormLabel>

                            <Form.Control 
                                type="text" 
                                required={true} 
                                id="firstName"
                                name="firstName"
                                onChange={(e) => handleChange(e)}
                                className="add-user-input-box"
                                placeholder="FIRST NAME"
                            />
                            <Form.Control 
                                type="text" 
                                required={true} 
                                id="middleName"
                                name="middleName"
                                onChange={(e) => handleChange(e)}
                                className="add-user-input-box"
                                placeholder="MIDDLE NAME"
                            />
                            <Form.Control 
                                type="text" 
                                required={true} 
                                id="lastName"
                                name="lastName"
                                onChange={(e) => handleChange(e)}
                                className="add-user-input-box"
                                placeholder="LAST NAME"
                            />
                            {/* </div> */}
                        </FormGroup>
                        </Col>
                    </Row>
                    <Row className="add-user-input-second-row">
                        <Col>
                    <Form.Label className="add-user-input-label">
                                    USERNAME
                                </Form.Label>
                                <Form.Label className="add-user-input-label">
                                    USERNAME
                                </Form.Label>
                                </Col>
                        <Col>
                                
                                <Form.Control 
                                    type="username" 
                                    required={true} 
                                    id="username"
                                    name="username"
                                    onChange={(e) => handleChange(e)}
                                    className="add-user-input-box"
                                    placeholder=""
                                />
                                
                    
                                <Form.Control 
                                    type="address" 
                                    required={true} 
                                    id="address"
                                    name="address"
                                    onChange={(e) => handleChange(e)}
                                    className="add-user-input-box"
                                />
                        </Col>
                    </Row>
                    
                    
                    {/* <div className="add-user-contact-loc-container">
                        <div className="add-user-contact-number-container">
                            <p>CONTACT NO.</p>
                            <div className="add-user-input-box-container">
                                <div className="add-user-input-box">
                                <input 
                                    type="text" 
                                    required={true} 
                                    id="contactNumber"
                                    name="contactNumber"
                                    onChange={(e) => handleChange(e)}
                                />
                                </div>
                            </div>
                        </div>
                        <div className="add-user-address-container">
                            <p>ADDRESS</p>
                            <div className="add-user-input-box-container">
                                <div className="add-user-address-input-box">
                                <input 
                                    type="text" 
                                    required={true} 
                                    id="address"
                                    name="address"
                                    onChange={(e) => handleChange(e)}
                                />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="add-user-role-pw-container">
                        <div className="add-user-role-container">
                            <div className="add-user-role-input-container">
                                <p>ROLE (temp)</p>
                                <div className="add-user-role-input-box">
                                    <form>
                                        <select required={true} className="add-user-role-dropdown" name="role" onChange={(e) => handleChange(e)}>
                                            <option value=""></option>
                                            <option value="admin">Admin</option>
                                            <option value="employee">Accounting</option>
                                        </select>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="add-user-pw-input-container">
                            <p>PASSWORD</p>
                            <div className="add-user-input-box-container">
                                <div className="add-user-input-box">
                                <input 
                                    type="text" 
                                    required={true} 
                                    id="contactNumber"
                                    name="contactNumber"
                                    onChange={(e) => handleChange(e)}
                                />
                                </div>
                            </div>
                        </div>
                        <div className="add-user-conf-pw-input-container">
                            <p>CONFIRM PASSWORD</p>
                            <div className="add-user-input-box-container">
                                <div className="add-user-input-box">
                                <input 
                                    type="text" 
                                    required={true} 
                                    id="contactNumber"
                                    name="contactNumber"
                                    onChange={(e) => handleChange(e)}
                                />
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="add-user-submit-container">
                        <Button 
                            handleClick={()=>{}}
                            className="add-user-submit-button"  
                            type= "button"
                        >
                            SUBMIT
                        </Button>
                    </div>
                </Form>
                </div>
                {/* sidebar sibling level */}
            </div>
        </div>      
    );
};

export default AddUsers;