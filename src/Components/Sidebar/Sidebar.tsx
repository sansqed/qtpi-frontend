import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import Button from "../Button/Button";

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
        localStorage.setItem("loggedIn", "0")
        window.location.reload();
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
                        <div className="sidebar-employees" onClick={redirectEmp}>
                            <p>Employees</p>
                        </div>
                        <div className="sidebar-expenses" onClick={redirectExp}>
                            <p>Expenses</p>
                        </div>
                        <hr className="sidebar-line"/>
                        <div className="sidebar-users" onClick={redirectUsers}>
                            <p>USERS</p>
                        </div>
                    </div>
                </div>
                <div className="sidebar-logout-container">
                    <Button 
                        handleClick={()=>{handleLogout()}}
                        className="sidebar-logout-button"  
                        type= "button"
                    >
                        Log out
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;