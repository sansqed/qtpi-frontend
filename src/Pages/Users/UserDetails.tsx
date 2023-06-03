import React, { useState, useEffect } from "react"
import { H1,H2 } from "../../Components/Headers/Headers";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../../ApiCalls/UsersApi";
import Button from "../../Components/Button/Button";
import User, { emptyUser } from "../../Types/User";
import { toast } from "react-hot-toast";
import toasterConfig from "../../Helpers/ToasterConfig";
import { OverlayTrigger, Popover } from "react-bootstrap";

import "./UserDetails.css"
import Users from "./Users";
import type UserType from "../../Types/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface UserDetailsProps{
    user: UserType|undefined;
    setIsChanged: Function;
}

const UserDetails:React.FC<UserDetailsProps> = ({user, setIsChanged}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const urlHeader = "/users/details/user_id="
    const user_id = String(location.pathname.substring(urlHeader.length));

    const handleDelete = async() => {
        deleteUser(user_id)
            .then((response)=>{
                if (response.data.status === "200"){
                    toast.success(response.data.status.message, toasterConfig);

                    setIsChanged(true)
                    setTimeout(()=>{
                        navigate("/users")
                    }, 2000)

                } else {
                    toast.error(response.data.message, toasterConfig);
                }
            })
    }

    const parseRole = () =>{
        if (user?.role_id === "1")
            return "Admin"
        else if (user?.role_id === "2")
            return "Accounting"
        else
            return ""
    }

    return(
        <div className="user-details-container">
            {/* <div className="sidebar-area-container">
                <Users/>
            </div> */}
            <div className="user-details-content-wrapper">
                <p className="user-details-back"><NavLink to={"/users"} className={"user-details-back"}>&lt; Back to user list</NavLink></p>

                

                <div className="user-details-section">
                    <H1 text={user?.first_name + " " + user?.middle_name + " " + user?.last_name}/>
                    <p className="user-details-role">{parseRole()}</p>
                </div>

                <div className="user-details-section">
                    <div className="user-details-group">
                        <p className="user-details-label">Username</p>
                        <p className="user-details-info">{user?.username}</p>
                    </div>

                    <div className="user-details-group">
                        <p className="user-details-label">Address</p>
                        <p className="user-details-info">{user?.address}</p>
                    </div>

                    <div className="user-details-group">
                    <p className="user-details-label">Contact Number</p>
                    <p className="user-details-info">{user?.contact_no}</p>
                    </div>
                </div>

                <div className="user-details-section btn">  

                    <div className="user-delete-btn-wrapper">
                        <Button
                            type="delete-with-confirmation"
                            handleClick={handleDelete}
                        />
                    </div>

                    <div className="user-edit-btn-wrapper">
                        <Button
                            type="user-edit"
                            handleClick={()=>{navigate("/users/edit/user_id="+user_id)}}
                        />
                    </div>

                </div>
                {/* <hr className="user-details-hr"/>

                <div className="user-details-section">
                    <H2 text="ACCESS LOGS"/>
                    {tempUser.access_logs.map((log)=><p className="user-details-info">{log}</p>)}
                </div> */}
                
            
                
            </div>


        </div>
    )
}

export default UserDetails;