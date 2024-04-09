import React, { useEffect, useState } from 'react'
import './loginpage.css' 
import axios from 'axios';
import Popup from '../../alerts/Popup';
const logo = require('../../../images/CT_University_logo.png')


export default function LoginPage({loginPopup}) {
  // States
  const [users,setUsers] = useState([]);
  const [selectedUser , setSelectedUser] = useState("")
  const [password , setPassword] = useState("");

  const [count ,setCount] = useState("");

  const [popmsg , setPopmsg] = useState(["",""]);

  // Functions
  const getUsers = async () =>{
    const response_users = await axios.get("http://localhost:4000/api/v1/login");
    setUsers(["",...response_users.data]);
  }

  const handleClick= async ()=>{
    setCount((prevCount) => prevCount+1);
    try{
      if(selectedUser === ""){
        setPopmsg(["warning", "Select a user to login"]);
      }
      else if(password.length < 6){
        setPopmsg(["warning", "Password length should be greater than 6 chracters"]);
      }
      else{
        const response_login = await axios.post("http://localhost:4000/api/v1/login/submit",
        {
          username : selectedUser,
          password : password
        });
        setPopmsg(["success", "Login Successful"]);
        loginPopup(false);
        console.log(response_login.data);

        
      }
    }
    catch(error){
      if (error.response) {
        // Handle client errors (4xx status codes)
        setPopmsg(["error", error.response.data.message]);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Request setup error:', error.message);
      }
    }
        
  }

  //Use Effects
    useEffect(()=>{
      getUsers();
    },[])

  return (
    <div className='login-container'>
      <Popup key={count} type={popmsg[0]} message = {popmsg[1]}/>
      <div className="login_box">
      
        <img src={logo} alt='University Logo' className='logo_image' />
        <div onClick={()=>loginPopup(false)}>X</div>

        <select className='user_dropdown' onChange={(e) => setSelectedUser(e.target.value)}>
              {users.map((user , index) => (
                  <option value={user.username} key={index}>{user.username}</option>
              ))}
        </select>
        
        <input type='text' className='password_input' onChange={e =>{setPassword(e.target.value)}}/>
        <button className="login_btn" onClick={handleClick}>Login</button> 
      

      </div>
    </div>
  )
}
