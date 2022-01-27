import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import axios from 'axios';
import PageNotFound from './pages/PageNotFound';
import Admin from './pages/admin/Admin';
import User from './pages/user/User';
import Orders from './pages/user/Orders'
import Cart from './pages/user/Cart'
import Products from './pages/Products';
import Product from './pages/Product';


const cookies = new Cookies();

function App() {

  const [state,setState] = useState(false);
  const [isAdmin,setIsAdmin] = useState(false);
  const [email,setEmail] =useState("");
  const cdata = cookies.get("user-session");

    useEffect(()=>{
      if(cdata){
        setEmail(cdata[0].email);
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
            {/* Admin Routes */}
            <Route path="/admin" element={state && isAdmin ? <Admin/> :<Navigate to="/"/>}/>
            
            {/* User Routes */}
            <Route path="/user" element={state && !isAdmin ? <User/>:<Navigate to="/"/>}/>
            <Route path="/orders" element={state && !isAdmin ? <Orders/>:<Navigate to="/"/>}/>
            <Route path="/cart" element={state && !isAdmin ? <Cart email={email} isLoggedIn={state} isAdmin={isAdmin}/>:<Navigate to="/"/>}/>

            {/* Default Routes */}
            <Route path="/" element={state && isAdmin ? <Navigate to="/admin"/>:state && !isAdmin ?<Navigate to="/user"/>:<Home/>}/>
            <Route path="/login" element={state && isAdmin ? <Navigate to="/admin"/>:state && !isAdmin ?<Navigate to="/user"/>:<Login/>}/>
            <Route path="/register" element={state && isAdmin ? <Navigate to="/admin"/>:state && !isAdmin ?<Navigate to="/user"/>:<Register/>}/>

            <Route path="/products" element={<Products email={email} isLoggedIn={state} isAdmin={isAdmin}/>}/>
            <Route path="/products/:id" element={<Product email={email} isLoggedIn={state} isAdmin={isAdmin}/>}/>
            <Route path="/products/search/:search" element={<Products email={email} isLoggedIn={state} isAdmin={isAdmin}/>}/>

          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Router>
  );
}

export default App;
