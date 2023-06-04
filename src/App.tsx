import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect} from 'react';
import { isLoggedIn } from './Helpers/UserFunctions';

import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Employees from './Pages/Employees/Employees'
import Payroll from './Pages/Payroll/Payroll'
import Expenses from './Pages/Expenses/Expenses'
import Users from './Pages/Users/Users';
import { Toaster, toast } from 'react-hot-toast';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { CheckUserSession } from './ApiCalls/AuthApi';
import toasterConfig, { tokenExpiryConfig } from './Helpers/ToasterConfig';

const TokenListener:any =({}) => {
  const location = useLocation()

  useEffect(() => {
    // const time = new Date();
    
    CheckUserSession()
        .then((response)=>{
            console.log(response)
            if (response.data.status != 200){
              localStorage.setItem("loggedin", "1")
              // setTimeout(() => {
              //   window.location.reload()
              // }, 2000);
              toast.error('User Session Expired. Please log in again', tokenExpiryConfig);
            }else{
              // console.log(localStorage.getItem("tokenExpiry"))
              // console.log(moment(localStorage.getItem("tokenExpiry"),"YYYY-MM-DD hh:mm:ss").diff(Date.now(),'seconds'))
              // time.setSeconds(time.getSeconds()+10)
              // localStorage.setItem("loggedin", "0")
            }
        })
  }, [location]);

  return(
    <div></div>
  )
}

function App() {  
  library .add(fas)
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
        <TokenListener/>
      </BrowserRouter>
    </div>
  );
}

export default App;
