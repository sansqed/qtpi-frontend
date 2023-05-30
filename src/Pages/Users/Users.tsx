import React, {useState, useEffect} from "react";
// import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar"
import "./Users.css"
import Button from "../../Components/Button/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { getUsers } from "../../ApiCalls/UsersApi";
import User, { emptyUser } from "../../Types/User";

import UserDetails from "./UserDetails";
import EditUser from "./EditUser";
import AddUsers from "./AddUser";


const Users: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const paths = location.pathname.split('/')
    const action = paths[2]
    const [selectedUserId, setSelectedUserId] = useState("")
    console.log(paths)

    const [users, setUsers] = useState<[User]>()
    const [isChanged, setIsChanged] = useState(false)

    // FETCH USERS DATA
    useEffect(()=>{
        getUsers()
            .then((response)=>{
                console.log(response.data.data.users)
                setUsers(response.data.data.users)
            })
        setIsChanged(false)
    },[isChanged])

    const getUser = () => {
        const userId = paths[3].split('=')[1]
        setSelectedUserId(userId)
        return users?.find(({id})=>id===userId) || emptyUser
    }

    const HandleAction = () => {
        if (action==="details")
            return(<UserDetails user={getUser()} setIsChanged={setIsChanged}/>)
        else if (action === "edit")
            return (
                <EditUser 
                    userArg={getUser()}
                    setIsChanged={setIsChanged}
                />
            )
        else if (action === "add")
                return(<AddUsers setIsChanged={setIsChanged}/>)
        else{
            setSelectedUserId('')
            return null
        }
    }


    return (
        <div className="users-container">
            <div className="users-content-wrapper">
                <Sidebar/>
                <div className="user-list-container">
                    <div className="user-list-header">
                        <h1>USER LIST</h1>
                        <NavLink to={"/users/add"} className={"users-add-btn-wrapper"}>
                            <Button
                                type="add-user"
                                handleClick={()=>{}}
                            />
                            
                        </NavLink>
                    </div>
                    <div className="user-list-body">
                        {users && users.length? users.map(({id, username, first_name, middle_name, last_name}) => 
                            <div className={"user-list-content" + (id===selectedUserId? " highlight":"")}>
                                <NavLink to={"/users/details/user_id="+id} className="user-list-link">
                                    <p className="user-list-name" key={id}>{first_name + " " + middle_name + " " + last_name}</p>
                                    <p className="user-list-username">@{username}</p>
                                </NavLink>
                            </div>
                        ):<></>}
                    </div>
                </div>
                <HandleAction/>
            </div>
        </div>      
    );
};

export default Users;