import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { isLoggedIn } from './Helpers/UserFunctions';

import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Employees from './Pages/Employees/Employees'
import Payroll from './Pages/Payroll/Payroll'
import Expenses from './Pages/Expenses/Expenses'
import AddEmployees from './Pages/Employees/AddEmployee'
import Users from './Pages/Users/Users';
import AddUsers from './Pages/Users/AddUser';
import UserDetails from './Pages/Users/UserDetails';
import EditUser from './Pages/Users/EditUser';
import { Toaster } from 'react-hot-toast';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import EmployeeDetails from './Pages/Employees/EmployeeDetails';

function App() {  
  library.add(fas)
  return (
    <div className="App">
      <div className='toaster-container'>
        <Toaster position="bottom-center" reverseOrder={false}/>
      </div>
      <BrowserRouter>
        <Routes>
          <Route 
              path="/" 
              element={isLoggedIn()? <Dashboard/>:<Login/>}  
            />
          <Route
            path="/payroll"
            element={isLoggedIn()? <Payroll/>:<Login/>}
          />
          <Route
            path="/expenses"
            element={isLoggedIn()? <Expenses/>:<Login/>}
          />
          <Route
              path="/employees"
              element={isLoggedIn()? <Employees/>:<Login/>}
          />
          <Route
              path="/employees/:employeeid"
              element={isLoggedIn()? <EmployeeDetails/>:<Login/>}
          />
          <Route
              path="/employees/add"
              element={isLoggedIn()? <AddEmployees/>:<Login/>}
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
          <Route
            path="/users/edit/:userid"
            element={isLoggedIn()? <EditUser/>:<Login/>}  
          />
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
