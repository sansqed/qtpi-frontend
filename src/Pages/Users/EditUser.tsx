import React, { useState, useEffect } from "react"
import { H1,H2 } from "../../Components/Headers/Headers";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getUsers } from "../../ApiCalls/UsersApi";
import Button from "../../Components/Button/Button";

import "./EditUser.css"

const EditUser = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const urlHeader = "/users/userid="
    const userID = String(location.pathname.substring(urlHeader.length));
    const [user, setUser] = useState({})

    const tempUser = {
        first_name: "Gil Brian",
        middle_name: "",
        last_name: "Perez",
        username: "gb",
        role: "Admin",
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

    const handleDelete = () => {
        console.log("deleting")
    }

    return(
        <div className="edit-user-container">
            <Sidebar/>
            

        </div>
    )
}

export default EditUser;