import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"
import { Form, FormGroup, FormLabel, InputGroup } from "react-bootstrap"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "../../Components/Button/Button";
import { updateUser, deleteUser } from "../../ApiCalls/UsersApi";
import User, { emptyUser } from "../../Types/User";
import toasterConfig from "../../Helpers/ToasterConfig";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import Users from "./Users";
import Container from 'react-bootstrap/Container';
import type UserType from "../../Types/User";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./EditUser.css"

interface EditUserProps {
    userArg: UserType;
    setIsChanged: Function;
}

const EditUser: React.FC<EditUserProps> = ({userArg, setIsChanged}) => {
    const [user, setUser] = useState<UserType>(userArg);
    const location = useLocation()
    const navigate = useNavigate()
    const urlHeader = "/users/edit/user_id="
    const user_id = String(location.pathname.substring(urlHeader.length));
    
    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDelete = async() => {
        deleteUser(user_id)
            .then((response)=>{
                if (response.data.status === "200"){
                    toast.success(response.data.message, toasterConfig)
                    setIsChanged(true)
                    setTimeout(()=>{
                        navigate("/users")
                    }, 2000)
                } else {
                    toast.error(response.data.message, toasterConfig)
                }
            })
    }

    const handleSubmit = async() => {
        updateUser(user)
            .then((response)=>{
                if (response.data.status === "200"){
                    toast.success("Update success", toasterConfig)
                    setIsChanged(true)
                    setTimeout(()=>{
                        navigate("/users/details/user_id="+user_id)
                    }, 2000)
                } else {
                    toast.error("Update failed", toasterConfig)
                }
            })
    }

    const deleteConfirmPopup = (
        <Popover id="popover-basic" className="user-confirm-delete-popover">
            <Popover.Header className="popover-header">Confirm Delete?</Popover.Header>
            <Popover.Body>
                <button className="btn-user cancel light">
                    Cancel
                </button>
                <button className="btn-user delete" onClick={handleDelete}>
                    Delete
                </button>
            </Popover.Body>
        </Popover>
    )

    return (
        <div className="edit-users-container">
            <div className="edit-users-content-wrapper">
                {/* <div className="edit-user-user-list-wrapper">
                    <Users/>
                </div> */}
                    
                <div className="edit-user-form-container">
                    <div className="edit-user-header">
                        <p className="user-details-back"><NavLink to={"/users/details/user_id="+user_id} className={"user-details-back"}>&lt; Back to user details</NavLink></p>
                        <h2>EDIT USER</h2>

                    </div>
                    <Container>
                        <Row>
                            <Form.Group>
                                <Form.Label className="edit-user-input-label" as={"h4"}>
                                    <h4>NAME</h4>
                                </Form.Label>

                                <Form.Control 
                                    type="text" 
                                    required={true} 
                                    id="first_name"
                                    name="first_name"
                                    onChange={(e) => handleChange(e)}
                                    className="edit-user-input-box first name"
                                    placeholder="FIRST NAME"
                                    defaultValue={user.first_name}
                                />
                                
                                <Form.Control 
                                    type="text" 
                                    required={true} 
                                    id="middle_name"
                                    name="middle_name"
                                    onChange={(e) => handleChange(e)}
                                    className="edit-user-input-box middle name"
                                    placeholder="MIDDLE NAME"
                                    defaultValue={user.middle_name}
                                />
                                <Form.Control 
                                    type="text" 
                                    required={true} 
                                    id="last_name"
                                    name="last_name"
                                    onChange={(e) => handleChange(e)}
                                    className="edit-user-input-box last name"
                                    placeholder="LAST NAME"
                                    defaultValue={user.last_name}
                                />
                                {/* </div> */}
                            </Form.Group>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="edit-user-input-label" as={"h4"}>
                                        <h4>Role</h4>
                                    </Form.Label>
                                    <Form.Select 
                                        className="edit-user-role-menu"
                                        id="role"
                                        name="role"
                                        onChange={(e) => handleChange(e)}
                                        value={user.role_id}
                                    >
                                        <option value="1">Admin</option>
                                        <option value="2">Accounting</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="edit-user-input-label" as={"h4"}>
                                        <h4>Contact Number</h4>
                                    </Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        required={true} 
                                        id="contact_no"
                                        name="contact_no"
                                        onChange={(e) => handleChange(e)}
                                        className="edit-user-input-box contact-no"
                                        defaultValue={user.contact_no}
                                        // bsPrefix={"+63"}
                                        prefix="+63"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label className="edit-user-input-label" as={"h4"}>
                                        <h4>Address</h4>
                                    </Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        required={true} 
                                        id="address"
                                        name="address"
                                        onChange={(e) => handleChange(e)}
                                        className="edit-user-input-box address"
                                        defaultValue={user.address}
                                    />
                                </Form.Group>
                            </Row>
                        {/* <hr className="edit-user-hr"/>
                        <Row className="row-username-pass">
                            <Col>
                                <Form.Group>
                                    <Form.Label className="edit-user-input-label" as={"h4"}>
                                        <h4>Username</h4>
                                    </Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        required={true} 
                                        id="username"
                                        name="username"
                                        onChange={(e) => handleChange(e)}
                                        className="edit-user-input-box"
                                        defaultValue={user.username}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="edit-user-input-label" as={"h4"}>
                                        <h4>Password</h4>
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        required={true}
                                        id="password"
                                        name="password"
                                        onChange={(e) => handleChange(e)}
                                        className="edit-user-input-box"
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="edit-user-input-label" as={"h4"}>
                                        <h4>Confirm Password</h4>
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        required={true}
                                        id="confirm_password"
                                        name="confirm_password"
                                        onChange={(e) => handleChange(e)}
                                        className="edit-user-input-box"
                                    />
                                </Form.Group>
                            </Col>
                        </Row> */}
                    </Container>
                        
                    
                    <div className="edit-user-submit-container">
                        <Button 
                            handleClick={handleSubmit}
                            type= "user-edit-submit"
                        />
                    </div>
                    <div className="edit-user-delete-container">
                            <OverlayTrigger trigger="click" placement="top" overlay={deleteConfirmPopup}>
                                <button 
                                    className="btn-user btn-delete light red"
                                >
                                    <FontAwesomeIcon icon={["fas","user-xmark"]} className="user-icon"/>
                                    <text>Delete</text>
                                </button>
                            </OverlayTrigger>
                    </div>
                </div>
            </div>
        </div>      
    );
};

export default EditUser;
