import React, { useContext } from 'react';
import "./MyOrders.css";
import { useState,useEffect } from 'react';
import {StoreContext} from "../../Context/StoreContext";
import axios from 'axios';
import {assets} from "../../assets/assets";
const MyOrders = () => {

  const [data, setData] = useState([]);
  const {token,url} = useContext(StoreContext);
  
  const fetchOrders = async()=>{
    const response=await axios.post(url+"/api/order/userorders",{},{headers:{token}});
    setData(response.data.data);
    console.log(response.data.data);
  }

  useEffect(() => {
    if(token){
        fetchOrders();
    }

  }, [token]);
  

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className='container'>
            {
                data.map((order,index)=>{
                    return(
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon}/>
                            <p>{order.items.map((item,index)=>{
                                if(index===order.items.length-1){
                                    return item.name+" X "+item.quantity
                                }
                                else{
                                    return item.name+" X "+item.quantity+" , "
                                }
                            })}</p> 
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    )   
                })
            }
        </div>
    </div>
  )
}

export default MyOrders;