import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"
import { Form, FormGroup, FormLabel, } from "react-bootstrap"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "../../Components/Button/Button";
import { getUsers } from "../../ApiCalls/UsersApi";
import User, { emptyUser } from "../../Types/User";
import toasterConfig from "../../Helpers/ToasterConfig";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

import "./EditUser.css"

const EditUser: React.FC = () => {
    const [user, setUser] = useState<User>(emptyUser);
    const location = useLocation()
    const navigate = useNavigate()
    const urlHeader = "/users/edit/userid="
    const user_id = String(location.pathname.substring(urlHeader.length));

    // Fetch user details
    useEffect(()=>{
        getUsers(user_id)
            .then((response)=>{
                setUser(response.data.data.users[0])
            })
    },[])

    
    
    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async() => {

    }

    return (
        <div className="edit-users-container">
            <div className="edit-users-content-wrapper">
                <Sidebar/>
                <div className="edit-user-form-container">
                    <Form>
                        <div className="edit-user-header">
                            <h1>EDIT USER</h1>
                        </div>
                        <Row className="edit-user-name-container">

                            <Form.Group>
                                <Form.Label className="edit-user-input-label">
                                    NAME
                                </Form.Label>

                                <Form.Control 
                                    type="text" 
                                    required={true} 
                                    id="first_name"
                                    name="first_name"
                                    onChange={(e) => handleChange(e)}
                                    className="edit-user-input-box"
                                    placeholder="FIRST NAME"
                                    defaultValue={user.first_name}
                                />
                                
                                <Form.Control 
                                    type="text" 
                                    required={true} 
                                    id="middle_name"
                                    name="middle_name"
                                    onChange={(e) => handleChange(e)}
                                    className="edit-user-input-box"
                                    placeholder="MIDDLE NAME"
                                    defaultValue={user.middle_name}
                                />
                                <Form.Control 
                                    type="text" 
                                    required={true} 
                                    id="last_name"
                                    name="last_name"
                                    onChange={(e) => handleChange(e)}
                                    className="edit-user-input-box"
                                    placeholder="LAST NAME"
                                    defaultValue={user.last_name}
                                />
                                {/* </div> */}
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group>
                                <div className="edit-user-second-row-label">
                                    <h1 className="edit-user-second-row-label-username">USERNAME</h1>
                                    <h1 className="edit-user-second-row-label-contact">CONTACT NO.</h1>
                                    <h1 className="edit-user-second-row-label-address">ADDRESS</h1>
                                </div>
                                <Form.Control 
                                    type="text" 
                                    required={true} 
                                    id="username"
                                    name="username"
                                    onChange={(e) => handleChange(e)}
                                    className="edit-user-input-box"
                                    defaultValue={user.username}
                                />
                                <Form.Control 
                                    type="text" 
                                    required={true} 
                                    id="contact_no"
                                    name="contact_no"
                                    onChange={(e) => handleChange(e)}
                                    className="edit-user-input-box"
                                    defaultValue={user.contact_no}
                                />
                                 <Form.Control 
                                    type="text" 
                                    required={true} 
                                    id="editress"
                                    name="editress"
                                    onChange={(e) => handleChange(e)}
                                    className="edit-user-input-box"
                                    defaultValue={user.address}
                                />

                            </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group>
                            <div className="edit-user-third-row-label">
                               <h1 className="edit-user-third-row-label-role">ROLE</h1>
                               <h1 className="edit-user-third-row-label-password">PASSWORD</h1>
                               <h1 className="edit-user-third-row-label-confirm-password">CONFIRM PASSWORD</h1>
                            </div>
                          </Form.Group>
                          <Form.Select 
                            className="edit-user-role-menu"
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
                            className="edit-user-input-box"
                          />
                          <Form.Control
                            type="password"
                            required={true}
                            id="confirm_password"
                            name="confirm_password"
                            onChange={(e) => handleChange(e)}
                            className="edit-user-input-box"
                          />
                        </Row>

                    </Form>

                    <div className="edit-user-submit-container">
                        <Button
                            type="back"
                            handleClick={()=>{}}
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

export default EditUser;
