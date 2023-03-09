import { H1,H2 } from "../../Components/Headers/Headers";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { NavLink } from "react-router-dom";

import "./UserDetails.css"

const UserDetails = () => {
    const user = {
        username: "GB",
        Role: "Admin",
        contact_no: "09123456789",
        address: "Sa eskina",
        access_logs: [
            "December 30, 2022 7:00",
            "December 31, 2022 7:00",
        ]
    }
    return(
        <div className="users-page">
            <Sidebar/>
            <div className="ud-container">
                <p className="ud-back"><NavLink to={"/users"}>&lt; Back to user list</NavLink></p>

                <div className="ud-section">
                    <H1 text={user.username}/>
                    <p className="ud-info">{user.Role}</p>
                </div>

                <div className="ud-section">
                    <p className="ud-info">Address: {user.address}</p>
                    <p className="ud-info">Contact No.: {user.contact_no}</p>
                </div>

                <hr className="ud-hr"/>

                <div className="ud-section">
                    <H2 text="ACCESS LOGS"/>
                    {user.access_logs.map((log)=><p className="ud-info">{log}</p>)}
                </div>
                
            
                
            </div>


        </div>
    )
}

export default UserDetails;