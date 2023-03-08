import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar"
import "./AddUser.css"

const AddUsers: React.FC = () => {
    return (
        <div className="add-users-container">
            <div className="add-users-content-wrapper">
                <Sidebar/>
                <div className="add-user-list-container">
                    <div className="add-user-list-header">
                        <h1>ADD USER</h1>
                    </div>
                </div>
            </div>
        </div>      
    );
};

export default AddUsers;