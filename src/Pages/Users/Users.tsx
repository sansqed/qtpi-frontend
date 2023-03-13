import React, {useState, useEffect} from "react";
// import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar"
import "./Users.css"
import Button from "../../Components/Button/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { getUsers } from "../../ApiCalls/UsersApi";


const Users: React.FC = () => {
    const navigate = useNavigate()

    const [users, setUsers] = useState([])

    const tempUsers = [
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
            username: "gb2",
        },
        {
            id: "5",
            username: "kyle2",
        },
        {
            id: "6",
            username: "admin2",
        },
        {
            id: "7",
            username: "gb3",
        },
    ]

    // FETCH USERS DATA
    useEffect(()=>{
       getUsers().then((response:any)=>{
            setUsers(response.data.data.users)
       }) 
    },[])

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
                        {tempUsers.map(({id, username}) => 
                            <p className="user-info" key={id}><NavLink to={"/users/userid="+id}>{username}</NavLink></p>
                        )}

                    </div>
                </div>
            </div>
        </div>      
    );
};

export default Users;