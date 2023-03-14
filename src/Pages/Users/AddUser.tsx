import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"
import "./AddUser.css"
import Button from "../../Components/Button/Button";

const AddUsers: React.FC = () => {
    const [loginCreds, setLoginCreds] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        contactNumber: "",
        address: "",
    });

    const [role, setRole] = useState('');

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(event.target.value);
      };

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
                    <div className="add-user-header">
                        <h1>ADD USER</h1>
                    </div>
                    <div className="detail-header">
                        <p>NAME</p>
                    </div>
                    <div className="add-user-name-container">
                        <div className="add-user-first-name-container">
                            <div className="add-user-input-box-container">
                                <div className="add-user-input-box">
                                <input 
                                    type="text" 
                                    required={true} 
                                    id="firstName"
                                    name="firstName"
                                    onChange={(e) => handleChange(e)}
                                    className="test"
                                />
                                <span>FIRST</span>
                                </div>
                            </div>
                        </div>
                        <div className="add-user-middle-name-container">
                            <div className="add-user-input-box-container">
                                <div className="add-user-input-box">
                                <input 
                                    type="text" 
                                    required={true} 
                                    id="middleName"
                                    name="middleName"
                                    onChange={(e) => handleChange(e)}
                                />
                                <span>MIDDLE</span>
                                </div>
                            </div>
                        </div>
                        <div className="add-user-last-name-container">
                            <div className="add-user-input-box-container">
                                <div className="add-user-input-box">
                                <input 
                                    type="text" 
                                    required={true} 
                                    id="lastName"
                                    name="lastName"
                                    onChange={(e) => handleChange(e)}
                                />
                                <span>LAST</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="add-user-contact-loc-container">
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
                                        <select className="add-user-role-dropdown" value={role} onChange={handleRoleChange}>
                                            <option value=""></option>
                                            <option value="admin">Admin</option>
                                            <option value="employee">Employee</option>
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
                    </div>
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