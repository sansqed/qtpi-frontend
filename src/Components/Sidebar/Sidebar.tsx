import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import Button from "../Button/Button";
import { toast } from 'react-hot-toast';
import { NavLink } from "react-router-dom"
import toasterConfig from '../../Helpers/ToasterConfig';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString(
        [], { hour12: true, hour: '2-digit', minute: '2-digit' }
    ));
    const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' }));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString([], { hour12: true, hour: '2-digit', minute: '2-digit' }));
            setCurrentDate(new Date().toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' }));
        }, 1000);

        return () => clearInterval(intervalId)
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("token")
        console.log(localStorage.getItem("token"))
        toast.success("Logged out", toasterConfig)

        setTimeout(()=>{
            window.location.reload();
        }, 2000)
    }
    

    return (
        <div className="sidebar-container">
            <div className="sidebar-actual">
                
                <div className="sidebar-header">
                    <h1>{currentTime}</h1>
                    <p>{currentDate}</p>
                </div>

                <div className="sidebar-menu-container">
                    <nav id="sidebar" className="sidebar-menu">

                        <NavLink to={"/"} className="sidebar-link" reloadDocument= {false}>
                          <div className="sidebar-dashboard">
                            <FontAwesomeIcon icon={["fas","gauge-high"]} className="sidebar-employees-icon"/>
                            Dashboard 
                          </div>
                        </NavLink>                       

                        <NavLink to={"/employees"} className="sidebar-link" reloadDocument= {false}>
                          <div className="sidebar-employees">
                            <FontAwesomeIcon icon={["fas","users"]} className="sidebar-employees-icon"/>
                            Employees
                          </div>
                        </NavLink>

                        <NavLink to={"/payroll"} className="sidebar-link" reloadDocument= {false}>
                          <div className="sidebar-payroll">
                            <FontAwesomeIcon icon={["fas","calculator"]} className="sidebar-employees-icon"/>
                            Payroll 
                          </div>
                        </NavLink>

                        <NavLink to={"/expenses"} className="sidebar-link" reloadDocument= {false}>
                          <div className="sidebar-expenses">
                            <FontAwesomeIcon icon={["fas","money-check-dollar"]} className="sidebar-expenses-icon"/>
                            Expenses
                          </div>
                        </NavLink>

                        <NavLink to={"/users"} className="sidebar-link" reloadDocument= {false}>
                          <div className="sidebar-users">
                            <FontAwesomeIcon icon={["fas","user"]} className="sidebar-user-icon"/>
                            Users
                          </div>
                        </NavLink>
                    
                    </nav>
                </div>

                <div className="sidebar-logout-container">
                    <Button 
                        type= "logout"
                        handleClick={()=>{handleLogout()}}
                    />
                </div>

            </div>
        </div>
    );
};

export default Sidebar;
