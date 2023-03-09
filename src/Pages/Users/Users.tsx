import React from "react";
// import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar"
import "./Users.css"
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";

const Users: React.FC = () => {
    const navigate = useNavigate()
    const users = [
        {
            id: "1",
            username: "gb",
        },
        {
            id: "2",
            username: "kyle",
        },
        {
            id: "3",
            username: "admin",
        },
        {
            id: "4",
            username: "gb",
        },
        {
            id: "5",
            username: "kyle",
        },
        {
            id: "6",
            username: "admin",
        },
        {
            id: "7",
            username: "gb",
        },
        {
            id: "2",
            username: "kyle",
        },
        {
            id: "3",
            username: "admin",
        },
        {
            id: "1",
            username: "gb",
        },
        {
            id: "2",
            username: "kyle",
        },
        {
            id: "3",
            username: "admin",
        },
        {
            id: "1",
            username: "gb",
        },
        {
            id: "2",
            username: "kyle",
        },
        {
            id: "3",
            username: "admin",
        },
        {
            id: "1",
            username: "gb",
        },
        {
            id: "2",
            username: "kyle",
        },
        {
            id: "3",
            username: "admin",
        },
        {
            id: "1",
            username: "gb",
        },
        {
            id: "2",
            username: "kyle",
        },
        {
            id: "3",
            username: "admin",
        },
        {
            id: "1",
            username: "gb",
        },
        {
            id: "2",
            username: "kyle",
        },
        {
            id: "3",
            username: "admin",
        },
        {
            id: "1",
            username: "gb",
        },
        {
            id: "2",
            username: "kyle",
        },
        {
            id: "3",
            username: "admin",
        },
        {
            id: "1",
            username: "gb",
        },
        {
            id: "2",
            username: "kyle",
        },
        {
            id: "3",
            username: "admin",
        },

        
    ]

    return (
        <div className="users-container">
            <div className="users-content-wrapper">
                <Sidebar/>
                <div className="user-list-container">
                    <div className="user-list-header">
                        <h1>USER LIST</h1>
                        <NavLink to={"/users/add"}>
                            <Button
                                type="add"
                                handleClick={()=>{}}
                                text="ADD USER"
                            />
                        </NavLink>
                    </div>
                    <div className="user-list-body">
                        {users.map(({id, username}) => 
                            <p className="user-info" key={id}><NavLink to={"/users/userid="+id}>{username}</NavLink></p>
                        )}

                    </div>
                </div>
            </div>
        </div>      
    );
};

export default Users;