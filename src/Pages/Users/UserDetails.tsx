import React, { useState, useEffect } from "react"
import { H1,H2 } from "../../Components/Headers/Headers";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { getUsers } from "../../ApiCalls/UsersApi";

import "./UserDetails.css"

const UserDetails = () => {
    const location = useLocation()
    const urlHeader = "/users/userid="
    const userID = String(location.pathname.substring(urlHeader.length));
    const [user, setUser] = useState({})

    const tempUser = {
        username: "gb",
        Role: "Admin",
        contact_no: "09123456789",
        address: "Sa eskina",
        access_logs: [
            "December 30, 2022 7:00",
            "December 31, 2022 7:00",
        ]
    }

    useEffect(()=>{
        getUsers(userID).then((response:any) => {
            setUser(response.data.data.users[0])
        })
    },[])

    return(
        <div className="user-details-container">
            <Sidebar/>
            <div className="user-details-content-wrapper">
                <p className="user-details-back"><NavLink to={"/users"}>&lt; Back to user list</NavLink></p>

                <div className="user-details-section">
                    <H1 text={tempUser.username}/>
                    <p className="user-details-info">{tempUser.Role}</p>
                </div>

                <div className="user-details-section">
                    <p className="user-details-info">Address: {tempUser.address}</p>
                    <p className="user-details-info">Contact No.: {tempUser.contact_no}</p>
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