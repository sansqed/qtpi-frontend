import Sidebar from "../../Components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

import './Dashboard.css'
import { useEffect } from "react";


const Dashboard = () => {
    const navigate = useNavigate()

    useEffect(()=>{
        navigate("/employees")
    },[])

    return(
        <div className="dashboard-container">
            <Sidebar/>
        </div>
    )
}

export default Dashboard;