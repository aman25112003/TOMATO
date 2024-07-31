import React from 'react'
import "./List.css";
import axios from "axios";
import {toast} from 'react-toastify';
import {useEffect,useState} from "react";
const List = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = async()=>{
    const response = await axios.get(`${url}/api/food/list`);
    if(response.data.success){
      setList(response.data.data);
    }
    else
    {
      toast.error("Food items could not be fetched");
    }
  }

  const removeFood = async(foodId)=>{
    const response = await axios.post(`${url}/api/food/remove`,{
      id:foodId
    });
    await fetchList();
    if(response.data.success){
      toast.success("Food item removed successfully");
    }

    else
    {
      toast.error("Food item could not be removed");
    }
  }

  useEffect(() => {
    fetchList();
  }, [])


  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item,index)=>{
            return(
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/`+item.image}/>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default List