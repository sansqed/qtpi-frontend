import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { isLoggedIn } from './Helpers/UserFunctions';

import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
function App() {



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route>
          <Route 
              path="/" 
              element={isLoggedIn()? <Dashboard/>:<Login/>}  
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
