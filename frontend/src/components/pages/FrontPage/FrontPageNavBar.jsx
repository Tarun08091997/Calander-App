import React, { useContext, useEffect, useState } from 'react'
import './frontpagenavbar.css'
import { UserContext } from '../../../contexts/UserContext'
import LoginIcon from './LoginIcon'
export default function FrontPageNavBar({loginPopup , setPageName}) {
  const {loginUser,setLoginUser} = useContext(UserContext) 
  
  const [showLoginIcon , setShowLoginIcon] = useState(false);
  
  const handleLoginIcon = (event) =>{
    event.stopPropagation();
    setShowLoginIcon(true);
  }
  
  return (
    <div className='navbar'>
        <div className="navbar-brand">
            <img className="logo" src="https://ctuniversity.in/images/ct-logo.png" alt="blog" />
        </div>
        <div className="navbar-links" >
            <p onClick={()=>setPageName("Home")}>Home</p>
            <p onClick={loginUser.isLoggedIn ? ()=>setPageName("Requests") : null}>Requests</p>
            {loginUser.isLoggedIn && loginUser.userInfo.role === "user" && <p onClick={()=>setPageName("CreateRequest")}>Create Request</p>}
            {loginUser.isLoggedIn ? 
            <p onClick={handleLoginIcon}>{`Welcome Dear  ${loginUser.userInfo.username }`}</p> : 
            <p onClick={()=>loginPopup(true)}>Login</p>}
        </div>

        {showLoginIcon && <LoginIcon setShowLoginIcon = {setShowLoginIcon}/>}
    </div>
  )
}
