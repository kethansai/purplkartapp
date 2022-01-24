import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import axios from 'axios';
import PageNotFound from './pages/PageNotFound';
import Admin from './pages/admin/Admin';
import User from './pages/user/User';



const cookies = new Cookies();

function App() {

  const [state,setState] = useState(false);
  const [isAdmin,setIsAdmin] = useState(false);
  const cdata = cookies.get("user-session");

    useEffect(()=>{
      if(cdata){
        axios.post(process.env.REACT_APP_REST_URL + '/users.php',{
          token: cdata[0].token,
          email:cdata[0].email,
          type:"auth"
        }).then((res)=>{
          if(res.data[0].res === "success"){ 
            setState(true);
            if(cdata.length == 2)  if(cdata[1].isAdmin) setIsAdmin(true);
          }else setState(false);
        }).catch(err=>console.log(err))
      }else{
        setState(false);setIsAdmin(false);
      }
    },[]);

  return (
      <Router>
        <Nav isAdmin={isAdmin} isLoggedIn={state}/>
        <Routes>
          {state && isAdmin ? <>

            {/* Admin Routes */}
            <Route path="/admin" element={<Admin/>}/>

          </>: state && !isAdmin ? <>
            
            {/* User Routes */}
            <Route path="/user" element={<User/>}/>

          </>: <>

            {/* Default Routes */}
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

          </>}

          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Router>
  );
}

export default App;
