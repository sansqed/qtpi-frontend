import React, { useState, useEffect } from "react"
import { H1,H2 } from "../../Components/Headers/Headers";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getUsers } from "../../ApiCalls/UsersApi";
import Button from "../../Components/Button/Button";
import User, { emptyUser } from "../../Types/User";

import "./UserDetails.css"

const UserDetails = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const urlHeader = "/users/userid="
    const userID = String(location.pathname.substring(urlHeader.length));
    const [user, setUser] = useState<User>(emptyUser)
    console.log(userID)
    const tempUser = {
        access_logs: [
            "December 30, 2022 7:00",
            "December 31, 2022 7:00",
        ]
    }

    useEffect(()=>{
        getUsers(userID)
            .then((response:any) => {
                console.log(response.data.data.users[0])
                setUser(response.data.data.users[0])
            })
    },[])

    const handleDelete = () => {
        console.log("deleting")
    }

    return(
        <div className="user-details-container">
            <Sidebar/>
            <div className="user-details-content-wrapper">
                <p className="user-details-back"><NavLink to={"/users"} className={"user-details-back"}>&lt; Back to user list</NavLink></p>

                <div className="user-details-section">
                    <H1 text={user.first_name + " " + user.middle_name + " " + user.last_name}/>
                    <p className="user-details-info">{user.role_id}</p>
                </div>

                <div className="user-details-section">
                    <p className="user-details-info">Username: {user.username}</p>
                    <p className="user-details-info">Address: {user.address}</p>
                    <p className="user-details-info">Contact No.: {user.contact_no}</p>
                </div>

                <div className="user-details-section">
                    <Button
                        type="user-edit"
                        handleClick={()=>{navigate("/users/edit/userid="+userID)}}
                    />

                    <Button
                        type="user-delete"
                        handleClick={handleDelete}
                    />

                </div>
                

                <hr className="user-details-hr"/>

                <div className="user-details-section">
                    <H2 text="ACCESS LOGS"/>
                    {tempUser.access_logs.map((log)=><p className="user-details-info">{log}</p>)}
                </div>
                
            
                
            </div>


        </div>
    )
}

export default UserDetails;