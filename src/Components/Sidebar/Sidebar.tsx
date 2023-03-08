import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());
    const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleDateString());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(intervalId)
    }, []);

    return (
        <div className="sidebar-container">
            <div className="sidebar-actual">
                <div className="sidebar-header">
                    <h1>{currentTime}</h1>
                    <p>{currentDate}</p>
                </div>
                <div className="sidebar-test-content">
                    <p> test </p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;