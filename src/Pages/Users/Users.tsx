import React, {useState, useEffect} from "react";
// import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar"
import "./Users.css"
import Button from "../../Components/Button/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { getUsers } from "../../ApiCalls/UsersApi";
import User, { emptyUser } from "../../Types/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Users: React.FC = () => {
    const navigate = useNavigate()

    const [users, setUsers] = useState<[User]>([emptyUser])

    // FETCH USERS DATA
    useEffect(()=>{
        getUsers()
            .then((response)=>{
                console.log(response.data.data.users)
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
                                type="add-user"
                                handleClick={()=>{}}
                            />
                            
                        </NavLink>
                    </div>
                    <div className="user-list-body">
                        {users.map(({id, username, first_name, middle_name, last_name}) => 
                            <div className="user-list-content">
                                <NavLink to={"/users/userid="+id} className="user-list-link">
                                    <text className="user-list-name" key={id}>{first_name + " " + middle_name + " " + last_name}</text>
                                    <text className="user-list-username">{" (" + username + ")"}</text>
                                </NavLink>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>      
    );
};

export default Users;