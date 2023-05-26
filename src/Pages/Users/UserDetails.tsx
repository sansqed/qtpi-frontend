import React, { useState, useEffect } from "react"
import { H1,H2 } from "../../Components/Headers/Headers";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../../ApiCalls/UsersApi";
import Button from "../../Components/Button/Button";
import User, { emptyUser } from "../../Types/User";
import { toast } from "react-hot-toast";
import toasterConfig from "../../Helpers/ToasterConfig";

import "./UserDetails.css"
import Users from "./Users";

const UserDetails = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const urlHeader = "/users/userid="
    const user_id = String(location.pathname.substring(urlHeader.length));
    const [user, setUser] = useState<User>(emptyUser)
    const tempUser = {
        access_logs: [
            "December 30, 2022 7:00",
            "December 31, 2022 7:00",
        ]
    }

    useEffect(()=>{
        getUsers(user_id)
            .then((response) => {
                console.log(response.data.data.users[0])
                setUser(response.data.data.users[0])
            })
    },[])

    const handleDelete = async() => {
        deleteUser(user_id)
            .then((response)=>{
                if (response.data.status === "200"){
                    toast.success(response.data.message, toasterConfig)

                    setTimeout(()=>{
                        navigate("/users")
                    }, 2000)
                } else {
                    toast.error(response.data.message, toasterConfig)
                }
            })
    }

    const parseRole = () =>{
        if (user.role_id === "1")
            return "Admin"
        else if (user.role_id === "2")
            return "Accounting"
        else
            return ""
    }

    return(
        <div className="user-details-container">
            <div className="sidebar-area-container">
                <Users/>
            </div>
            <div className="user-details-content-wrapper">
                <p className="user-details-back"><NavLink to={"/users"} className={"user-details-back"}>&lt; Back to user list</NavLink></p>

                <div className="user-details-section">
                    <H1 text={user.first_name + " " + user.middle_name + " " + user.last_name}/>
                    <p className="user-details-info">{parseRole()}</p>
                </div>

                <div className="user-details-section">
                    <p className="user-details-info">Username: {user.username}</p>
                    <p className="user-details-info">Address: {user.address}</p>
                    <p className="user-details-info">Contact No.: {user.contact_no}</p>
                </div>

                <div className="user-details-section">
                    <Button
                        type="user-edit"
                        handleClick={()=>{navigate("/users/edit/userid="+user_id)}}
                    />

                    <Button
                        type="user-delete"
                        handleClick={handleDelete}
                    />

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