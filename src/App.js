import React, { useEffect, useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Login from './pages/Login';
import Home from './pages/Home.js';
import { Cookies } from 'react-cookie';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import axios from 'axios';
import PageNotFound from './pages/PageNotFound';
const cookies = new Cookies();

function App() {

  const userRoutes =[];
  const adminRoutes =[];
  const defaultRoutes =[
    {path:"/",element:"Home"},
    {path:"/login",element:"Login"},
    {path:"/register",element:"Register"},
  ];

  const [state,setState] = useState(false);
  const [isAdmin,setIsAdmin] = useState(false);
  const cdata = cookies.get("user-session");
  console.log(cdata);

    useEffect(()=>{
      if(cdata){
        axios.post(process.env.REACT_APP_REST_URL + '/users.php',{
          token: cdata[0].token,
          email:cdata[0].email,
          type:"auth"
        }).then((res)=>{
          console.log(res);
          if(res.data[0].res == "success") setState(true); else setState(false);
          if(res.data[1]) setIsAdmin(true); else setIsAdmin(false);
        }).catch(err=>console.log(err))
      }else{
        setState(false);setIsAdmin(false);
      }
    },[]);

  return (
      <Router>
        <Nav/>
        <Routes>
          {/* {state && isAdmin ? <>

          </>: state ? <>
          
          </>: <>
          
          </>} */}
          
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Router>
  );
}

export default App;
