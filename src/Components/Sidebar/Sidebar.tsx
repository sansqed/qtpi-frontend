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

    function redirectEmp(){
        window.location.href="/employees"
    }

    function redirectExp(){
        window.location.href="/expenses"
    }
    function redirectUsers(){
        window.location.href="/users"
    }

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
                    <div className="sidebar-menu">
                        <NavLink to={"/employees"} className="sidebar-link" reloadDocument= {true}>
                          <div className="sidebar-employees" onClick={redirectEmp}>
                              <FontAwesomeIcon icon={["fas","users"]} className="sidebar-employees-icon"/>
                              Employees
                          </div>
                        </NavLink>
                        <NavLink to={"/expenses"} className="sidebar-link" reloadDocument= {true}>
                        <div className="sidebar-expenses" onClick={redirectExp}>
                            <FontAwesomeIcon icon={["fas","money-check-dollar"]} className="sidebar-expenses-icon"/>
                            Expenses
                        </div>
                        </NavLink>
                        <NavLink to={"/users"} className="sidebar-link" reloadDocument= {true}>
                        <div className="sidebar-users" onClick={redirectUsers}>
                            <FontAwesomeIcon icon={["fas","user"]} className="sidebar-user-icon"/>
                            Users
                        </div>
                        </NavLink>
                    </div>
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
