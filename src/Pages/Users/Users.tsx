import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"
import "./Users.css"

const Users: React.FC = () => {
    return (
        <div className="users-container">
            <div className="users-content-wrapper">
                <Sidebar/>
                <div className="user-list-container">
                    <div className="user-list-header">
                        <h1>USER LIST</h1>
                    </div>
                </div>
            </div>
        </div>      
    );
};

export default Users;