import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"
import { Form, InputGroup } from "react-bootstrap"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "../../Components/Button/Button";
import { createUser } from "../../ApiCalls/UsersApi";
import User, { emptyUser, defaultUserError, UserError } from "../../Types/User";
import toasterConfig from "../../Helpers/ToasterConfig";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ValidateUsers from "../../Helpers/Validations/ValidateUsers"

import "./AddUser.css"

const AddUsers: React.FC = () => {
    const [user, setUser] = useState<User>(emptyUser);
    const [error, setError] = useState<UserError>(defaultUserError);

    const navigate = useNavigate()

    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        console.log(user)
        
        if (ValidateUsers(user, setError)){
            createUser(user)
                .then((response)=>{
                    if (response.data.status === "201"){
                        toast.success("User Created Successfully", toasterConfig);

                        setTimeout(()=>{
                            navigate("/users")
                        }, 2000)

                    } else {
                        toast.error(response.data.message, toasterConfig);
                    }
                })
        } else {
            toast.error("Invalid user details.", toasterConfig);
            console.log(error)
        }
    }

    const handleBack = () => {
        navigate("/users")
    }


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
                                        id="first_name"
                                        name="first_name"
                                        onChange={(e) => handleChange(e)}
                                        className="add-user-input-box"
                                        placeholder="FIRST NAME"
                                        autoComplete={"off"}
                                    />
                                    
                                    <Form.Control 
                                        type="text" 
                                        // required={true} 
                                        id="middle_name"
                                        name="middle_name"
                                        onChange={(e) => handleChange(e)}
                                        className="add-user-input-box"
                                        autoComplete={"off"}
                                        placeholder="MIDDLE NAME"
                                    />
                                    <Form.Control 
                                        type="text" 
                                        required={true} 
                                        id="last_name"
                                        name="last_name"
                                        onChange={(e) => handleChange(e)}
                                        className="add-user-input-box"
                                        placeholder="LAST NAME"
                                        autoComplete={"off"}
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
                                        autoComplete={"off"}
                                    />
                                <Form.Control 
                                    type="text" 
                                    required={true} 
                                    id="contact_no"
                                    name="contact_no"
                                    onChange={(e) => handleChange(e)}
                                    className="add-user-input-box"
                                    autoComplete={"off"}
                                />
                                 <Form.Control 
                                    type="text" 
                                    required={true} 
                                    id="address"
                                    name="address"
                                    onChange={(e) => handleChange(e)}
                                    className="add-user-input-box"
                                    autoComplete={"off"}
                                />

                            </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group>
                            <div className="add-user-third-row-label">
                               <h1 className="add-user-third-row-label-role">ROLE</h1>
                               <h1 className="add-user-third-row-label-password">PASSWORD</h1>
                               <h1 className="add-user-third-row-label-confirm-password">CONFIRM PASSWORD</h1>
                            </div>
                          </Form.Group>
                          <Form.Select 
                            className="add-user-role-menu"
                            id="role"
                            name="role"
                            onChange={(e) => handleChange(e)}
                            >
                            <option value="Admin">Admin</option>
                            <option value="Employee">Accounting</option>
                          </Form.Select>
                          <Form.Control
                            type="password"
                            required={true}
                            id="password"
                            name="password"
                            onChange={(e) => handleChange(e)}
                            className="add-user-input-box"
                          />
                          <Form.Control
                            type="password"
                            required={true}
                            id="confirm_password"
                            name="confirm_password"
                            onChange={(e) => handleChange(e)}
                            className="add-user-input-box"
                          />
                        </Row>

                    </Form>

                    <div className="add-user-button-container">
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

export default AddUsers;
