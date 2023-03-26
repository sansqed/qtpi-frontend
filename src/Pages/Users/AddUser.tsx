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
        username: "",
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
                <div className="add-user-form-container">
                    <Form>
                        <div className="add-user-header">
                            <h1>ADD USER</h1>
                        </div>
                        <Row className="add-user-name-container">

                            <Form.Group>
                                <Form.Label className="add-user-input-label">
                                    NAME
                                </Form.Label>

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
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group>
                                <div className="add-user-second-row-label">
                                    <h1 className="add-user-second-row-label-username">USERNAME</h1>
                                    <h1 className="add-user-second-row-label-contact">CONTACT NO.</h1>
                                    <h1 className="add-user-second-row-label-address">ADDRESS</h1>
                                </div>
                                <Form.Control 
                                    type="text" 
                                    required={true} 
                                    id="username"
                                    name="username"
                                    onChange={(e) => handleChange(e)}
                                    className="add-user-input-box"
                                />
                                <Form.Control 
                                    type="text" 
                                    required={true} 
                                    id="contactNumber"
                                    name="contactNumber"
                                    onChange={(e) => handleChange(e)}
                                    className="add-user-input-box"
                                />
                                 <Form.Control 
                                    type="text" 
                                    required={true} 
                                    id="address"
                                    name="address"
                                    onChange={(e) => handleChange(e)}
                                    className="add-user-input-box"
                                />

                            </Form.Group>
                        </Row>

                    </Form>

                    <div className="add-user-submit-container">
                        <Button 
                            handleClick={()=>{}}
                            className="add-user-submit-button"  
                            type= "button"
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

export default AddUsers;