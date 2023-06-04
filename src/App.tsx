import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isLoggedIn } from './Helpers/UserFunctions';

import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Employees from './Pages/Employees/Employees'
import Payroll from './Pages/Payroll/Payroll'
import Expenses from './Pages/Expenses/Expenses'
import Users from './Pages/Users/Users';
import { Toaster } from 'react-hot-toast';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { CheckUserSession } from './ApiCalls/AuthApi';
import moment from "moment"
import { useTimer } from 'react-timer-hook';

function timeEnd(){
  console.log("ding ding ding")
}

function App() {  
  const time = new Date();

  useEffect(()=>{
    CheckUserSession()
        .then((response)=>{
            console.log(response)
            if (response.data.status != 200){
              localStorage.setItem("loggedin", "1")
              
            }else{
              console.log(localStorage.getItem("tokenExpiry"))
              console.log(moment(localStorage.getItem("tokenExpiry"),"YYYY-MM-DD hh:mm:ss").diff(Date.now(),'seconds'))
              time.setSeconds(time.getSeconds()+10)
            }
        })
    // setEmployees([tempEmployee])
  },[])

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
          {/* <Route
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
              path="/employees/edit/:employeeid"
              element={isLoggedIn()? <EditEmployee/>:<Login/>}
          /> */}
          <Route
            path="/employees"
            element={isLoggedIn()? <Employees/>:<Login/>}
          />
          <Route
            path="/employees/:action"
            element={isLoggedIn()? <Employees/>:<Login/>}
          />
          <Route
            path="/employees/:action/:user_id"
            element={isLoggedIn()? <Employees/>:<Login/>}
          />

          {/* <Route
            path={"/users" || "/users/:action" || "/users/:action/:user_id"}
              element={isLoggedIn()? <Users/>:<Login/>}
          />  */}
           {/* <Route path={["/profile", "/"]} 
            element={isLoggedIn()? <Users/>:<Login/>} 
            /> */}
          <Route
            path="/users"
            element={isLoggedIn()? <Users/>:<Login/>}
          /> 
          <Route
            path="/users/:action"
            element={isLoggedIn()? <Users/>:<Login/>}
          /> 
          <Route
            path="/users/:action/:user_id"
            element={isLoggedIn()? <Users/>:<Login/>}
          /> 

          {/* <Route
            path="/users/add"
            element={isLoggedIn()? <AddUsers/>:<Login/>}
          />
          <Route
            path="/users"
            element={isLoggedIn()? <UserDetails/>:<Login/>}  
          />
          <Route
            path="/users/edit/:userid"
            element={isLoggedIn()? <EditUser/>:<Login/>}  
          /> */}
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
