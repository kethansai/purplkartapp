import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Danger from '../../components/alerts/Danger';
import Success from '../../components/alerts/Success';

function Cart(props) {

    const email = props.email;
    const [cart,setCart] = useState([]);
    const [alert,setAlert] = useState(null);

    const getCartList = async () =>{ axios.post(process.env.REACT_APP_REST_URL + '/cart.php',{
                            email:email,
                            type:"getCart"
                        }).then((res)=>{
                            console.log(res);
                            setCart(res.data);
                        }).catch((err)=>{
                            console.log(err);
                        })
                    };

    useEffect(()=>{
        getCartList();
    },[])

    const deq = (id)=>{
        axios.post(process.env.REACT_APP_REST_URL + '/cart.php',{
            email:email,
            id:id,
            type:"decQuantity"
        }).then((res)=>{
            console.log(res);
            if(res.data[0].res === "success") setAlert(<Success message={res.data[0].message}/>)
            if(res.data[0].res === "failure") setAlert(<Danger message={res.data[0].message}/>)
            getCartList();
        }).catch((err)=>{
            console.log(err);
        })
    }

    const inq = (id)=>{
        axios.post(process.env.REACT_APP_REST_URL + '/cart.php',{
            email:email,
            id:id,
            type:"incQuantity"
        }).then((res)=>{
            console.log(res);
            if(res.data[0].res === "success") setAlert(<Success message={res.data[0].message}/>)
            if(res.data[0].res === "failure") setAlert(<Danger message={res.data[0].message}/>)
            getCartList();
        }).catch((err)=>{
            console.log(err);
        })
    }

    const deleteItem = (id)=>{
        axios.post(process.env.REACT_APP_REST_URL + '/cart.php',{
            email:email,
            id:id,
            type:"deleteItem"
        }).then((res)=>{
            console.log(res);
            getCartList();
            if(res.data[0].res === "success") setAlert(<Success message={res.data[0].message}/>)
            if(res.data[0].res === "failure") setAlert(<Danger message={res.data[0].message}/>)
        }).catch((err)=>{
            console.log(err);
        })
    }

    return <>
        {alert ? alert:<></>}
        <div className='max-w-7xl mx-auto mt-16 shadow-2xl rounded bg-gray-200 p-4'>
            <h3 className='text-gray-800 text-center text-5xl p-3'>Cart Items</h3>
            { cart.map((item)=>(
                item.res !== "failure" ? (
                <div key={item.id} className='mx-4 flex gap-2 my-6 shadow-2xl rounded p-4 bg-white'>
                    <div className='w-5/6'>
                        {item.title}<br/>
                        {item.price}<br/>
                        {item.quantity}<br/>
                    </div>
                    <div className='w-1/6 flex flex-row'>
                        <MinusIcon onClick={()=>deq(item.id)} className='ml-4 mt-6 cursor-pointer' color='red' width={20} height={20}/>
                        <p className='ml-4 mt-3 bg-gray-200 rounded-full p-2 w-10 h-10 text-center'>{item.quantity}</p>
                        <PlusIcon onClick={()=>inq(item.id)} className='ml-4 mt-6 cursor-pointer' color='green' width={20} height={20}/>
                        <TrashIcon onClick={()=>deleteItem(item.id)} className='ml-8 mt-4 cursor-pointer' color='red' width={30} height={30}/>
                    </div>
                </div>
                ):<></>
            ))
            }
        </div>
    </>;
}

export default Cart;
