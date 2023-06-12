import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { IsLoggedIn } from './Helpers/UserFunctions';

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

function App() {  
  library .add(fas)
  const [loggedIn, setloggedIn]  = useState(true)

  IsLoggedIn().
    then((response)=>{
      setloggedIn(response)
    })

  return (
    <div className="App">
      <div className='toaster-container'>
        <Toaster position="bottom-center" reverseOrder={false}/>
      </div>
      <BrowserRouter>
        <Routes>
          <Route 
              path="/" 
              element={1? <Dashboard/>:<Login/>}  
            />
          <Route
            path="/payroll"
            element={loggedIn? <Payroll/>:<Login/>}
          />
          <Route
            path="/expenses"
            element={loggedIn? <Expenses/>:<Login/>}
          />
          <Route
            path="/employees"
            element={loggedIn? <Employees/>:<Login/>}
          />
          <Route
            path="/employees/:action"
            element={loggedIn? <Employees/>:<Login/>}
          />
          <Route
            path="/employees/:action/:user_id"
            element={loggedIn? <Employees/>:<Login/>}
          />
          <Route
            path="/users"
            element={loggedIn? <Users/>:<Login/>}
          /> 
          <Route
            path="/users/:action"
            element={loggedIn? <Users/>:<Login/>}
          /> 
          <Route
            path="/users/:action/:user_id"
            element={loggedIn? <Users/>:<Login/>}
          /> 
        </Routes>
        {/* <TokenListener/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
