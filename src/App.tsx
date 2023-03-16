import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { isLoggedIn } from './Helpers/UserFunctions';

import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Employees from './Pages/Employees/Employees'
import Users from './Pages/Users/Users';
import AddUsers from './Pages/Users/AddUser';
import UserDetails from './Pages/Users/UserDetails';

function App() {  
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
              path="/" 
              element={isLoggedIn()? <Dashboard/>:<Login/>}  
            />
          <Route
              path="/employees"
              element={isLoggedIn()? <Employees/>:<Login/>}
          />
          <Route
            path="/users"
              element={isLoggedIn()? <Users/>:<Login/>}
          />
          <Route
            path="/users/add"
            element={isLoggedIn()? <AddUsers/>:<Login/>}
          />
          <Route
            path="/users/:userid"
            element={isLoggedIn()? <UserDetails/>:<Login/>}  
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
