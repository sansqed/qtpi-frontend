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
import { useNavigate, NavLink } from "react-router-dom";
import ValidateUsers from "../../Helpers/Validations/ValidateUsers"
import Container from 'react-bootstrap/Container';

import "./AddUser.css"

interface AddUserProps{
    setIsChanged: Function;
}

const AddUsers: React.FC<AddUserProps> = ({setIsChanged}) => {
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

    console.log(user)
    const handleSubmit = () => {
        console.log(user)
        
        if (ValidateUsers(user, setError)){
            createUser(user)
                .then((response)=>{
                    if (response.data.status === "201"){
                        toast.success("User Created Successfully", toasterConfig);

                        setIsChanged(true)
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

    return (
        <div className="add-users-container">
            <div className="add-user-content-wrapper">
                {/* <div className="add-user-user-list-wrapper">
                    <Users/>
                </div> */}
                    
                <div className="add-user-form-container">
                    <div className="add-user-header">
                        <p className="user-details-back"><NavLink to={"/users/"} className={"user-details-back"}>&lt; Back to user details</NavLink></p>
                        <h2>ADD USER</h2>

                    </div>
                    <Container>
                        <Row>
                            <Form.Group>
                                <Form.Label className="add-user-input-label" as={"h4"}>
                                    <h4>NAME</h4> <span className="input-required">*</span>
                                </Form.Label>

                                {/* <InputGroup hasValidation> */}
                                    <Form.Control 
                                        type="text" 
                                        required={true} 
                                        id="first_name"
                                        name="first_name"
                                        onChange={(e) => handleChange(e)}
                                        className="add-user-input-box first name"
                                        placeholder="FIRST NAME"
                                        defaultValue={user.first_name}
                                        isInvalid={error.first_name}
                                        autoComplete="off"
                                    />
                                    
                                    <Form.Control 
                                        type="text" 
                                        required={true} 
                                        id="middle_name"
                                        name="middle_name"
                                        onChange={(e) => handleChange(e)}
                                        className="add-user-input-box middle name"
                                        placeholder="MIDDLE NAME"
                                        defaultValue={user.middle_name}
                                        autoComplete="off"
                                    />
                                    <Form.Control 
                                        type="text" 
                                        required={true} 
                                        id="last_name"
                                        name="last_name"
                                        onChange={(e) => handleChange(e)}
                                        className="add-user-input-box last name"
                                        placeholder="LAST NAME"
                                        defaultValue={user.last_name}
                                        isInvalid={error.last_name}
                                        autoComplete="off"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        First and last names are required
                                    </Form.Control.Feedback>
                                {/* </InputGroup> */}
                            </Form.Group>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="add-user-input-label" as={"h4"}>
                                        <h4>Role</h4> <span className="input-required">*</span>
                                    </Form.Label>
                                    <Form.Select 
                                        className="add-user-role-menu"
                                        id="role_Id"
                                        name="role_id"
                                        onChange={(e) => handleChange(e)}
                                        value={user.role_id}
                                        isInvalid={error.role_id}
                                    >
                                        <option value="" disabled>Select a role</option>
                                        <option value="1">Admin</option>
                                        <option value="2">Accounting</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Role is required
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="add-user-input-label" as={"h4"}>
                                        <h4>Contact Number</h4> <span className="input-required">*</span>
                                    </Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        required={true} 
                                        id="contact_no"
                                        name="contact_no"
                                        onChange={(e) => handleChange(e)}
                                        className="add-user-input-box contact-no"
                                        defaultValue={user.contact_no}
                                        isInvalid={error.contact_no}
                                        autoComplete="off"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Contact number is required
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label className="add-user-input-label" as={"h4"}>
                                        <h4>Address</h4>
                                    </Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        required={true} 
                                        id="address"
                                        name="address"
                                        onChange={(e) => handleChange(e)}
                                        className="add-user-input-box address"
                                        defaultValue={user.address}
                                        autoComplete="off"
                                    />
                                </Form.Group>
                            </Row>
                        <hr className="add-user-hr"/>
                            <Row>
                                <Form.Group>
                                    <Form.Label className="add-user-input-label" as={"h4"}>
                                        <h4>Username</h4> <span className="input-required">*</span>
                                    </Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        required={true} 
                                        id="username"
                                        name="username"
                                        onChange={(e) => handleChange(e)}
                                        className="add-user-input-box"
                                        defaultValue={user.username}
                                        autoComplete="off"
                                        isInvalid={error.username}
                                    />
                                     <Form.Control.Feedback type="invalid">
                                        Username is required.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label className="add-user-input-label" as={"h4"}>
                                        <h4>Password</h4> <span className="input-required">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        required={true}
                                        id="password"
                                        name="password"
                                        onChange={(e) => handleChange(e)}
                                        className="add-user-input-box"
                                        autoComplete="off"
                                        isInvalid={error.password}
                                    />
                                     <Form.Control.Feedback type="invalid">
                                        Password should be valid
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label className="add-user-input-label" as={"h4"}>
                                        <h4>Confirm Password</h4> <span className="input-required">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        required={true}
                                        id="confirm_password"
                                        name="confirm_password"
                                        onChange={(e) => handleChange(e)}
                                        className="add-user-input-box"
                                        autoComplete="off"
                                        isInvalid={error.confirm_password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Entered passwords are not the same
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                    </Container>
                        
                    
                    <div className="add-user-submit-container">
                        <Button 
                            handleClick={handleSubmit}
                            type= "user-edit-submit"
                        />
                    </div>
                </div>
            </div>
        </div>      
    );
};

export default AddUsers;
