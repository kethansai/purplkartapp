import { ShoppingCartIcon } from '@heroicons/react/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Danger from '../components/alerts/Danger';
import Success from '../components/alerts/Success';

function Products(props) {
    let navigate = useNavigate();
    const isLoggedIn = props.isLoggedIn;
    const isAdmin    = props.isAdmin;
    const email      = props.email;
    const [alert,setAlert] = useState(null);
    const [products,setProducts] = useState([]);

    const getProducts = async ()=>{
      axios.get(process.env.REACT_APP_REST_URL + '/products.php').then((res)=>{
        console.log(res.data);
        setProducts(res.data);
      }).catch((err)=>{
          console.log(err);
      })
    }

    const addToCart = (id)=>{
      if(!isLoggedIn){
        navigate('/login');
      }else{
        axios.post(process.env.REACT_APP_REST_URL + '/products.php',{
          id :id,
          email:email,
          type:"addToCart"
          }).then((res)=>{
            console.log(res);
            if(res.data[0].res === "success") setAlert(<Success message={res.data[0].message}/>)
            if(res.data[0].res === "failure") setAlert(<Danger message={res.data[0].message}/>)
          }).catch((err)=>{
            console.log(err);
          })
        }
    }
    const search = (search_key)=>{
      if(search_key !== ""){
        axios.post(process.env.REACT_APP_REST_URL + '/products.php',{
          query :search_key,
          type  : "search"
        }).then((res)=>{  
          console.log(res.data);
          if(res.data[0].res !== "failure"){
            setProducts(res.data);
          }else{
            setProducts([]);
          }
        }).catch((err)=>{
          console.log(err);
        })
      }else{
        getProducts();
      }
    }
    useEffect(()=>{
      getProducts();
    },[])

    
  return <>
    {alert ? alert:<></>}
      <div className="bg-white">
      <div className="max-w-3xl mx-auto py-4 px-8 sm:py-24 lg:py-12 sm:px-2 lg:max-w-screen-2xl lg:px-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-center text-gray-800">Our New Products</h1>
        <div className='search mx-auto mt-4 mb-2 shadow-xl p-2 bg-gray-200'>
          <input onChange={(e)=>search(e.target.value)} className='bg-purple-white shadow rounded-xl border-gray-400 focus:outline-none focus:ring focus:ring-gray-800 border-1 p-3 w-full' type="text" placeholder="Search Products here.." />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          { products.res !== "failure" ? products.map((product) => (
            <div key={product.id} className="group relative shadow-2xl bg-gray-700 rounded-2xl">
              <div className="w-full min-h-80 bg-gray-100 aspect-w-1 aspect-h-1 overflow-hidden group-hover:opacity-90 lg:h-80 lg:aspect-none">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-2 flex justify-between px-4">
                <div className='w-3/4'>
                  <h3 className="text-3xl text-white capitalize truncate">
                    <Link to={"/products/"+product.id}>
                      {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-white capitalize">{product.color}</p>
                </div>
                <div>
                    <p className="text-2xl font-medium text-white">₹ {product.price}</p>
                    <ShoppingCartIcon onClick={()=>addToCart(product.id)} className='text-white p-2 cursor-pointer'/>
                </div>
              </div>
            </div>
          )) : <>
            <h3>Oops.. no products available at this time</h3>
          </>
        }
        </div>
      </div>
    </div>
  </>;
}

export default Products;
