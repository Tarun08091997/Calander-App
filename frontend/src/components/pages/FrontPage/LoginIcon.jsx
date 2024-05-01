import React, { useContext, useEffect, useRef, useState } from 'react';
import './frontpagenavbar.css';
import { UserContext } from '../../../contexts/UserContext';
import UserDataChange from '../../BasicComponents/UserDataChange/UserDataChange';
import PasswordChange from '../../BasicComponents/UserDataChange/PasswordChange';

export default function LoginIcon({ setShowLoginIcon }) {
  const loginIconRef = useRef(null);
  const {loginUser, setLoginUser, logout} = useContext(UserContext);
  const [changePasswordPage , setChangePasswordPage] = useState(false);

  const handleLogOut = ()=>{
    logout();
    setShowLoginIcon(false);
  }

  const handleOutsideClick = ()=>{
    setShowLoginIcon(false);
    setChangePasswordPage(false);
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (loginIconRef.current && !loginIconRef.current.contains(event.target)) {
      setShowLoginIcon(false);
    }
  };

  const handleClickInside = (event) => {
    // Prevent event bubbling to the document click listener
    event.stopPropagation();
  };

  if(!changePasswordPage){
    return (
      <div className='LoginIcon' ref={loginIconRef} onClick={handleClickInside}>
        <p onClick={()=>setChangePasswordPage(true)}>Change Password</p>
        <p onClick={handleLogOut}>Log Out</p>
      </div>
    );
  }
  else{
    if(loginUser.userInfo.role === "admin"){
        return(
          <UserDataChange onClose={handleOutsideClick}/>
        )
    }
    else{
      return(
        <PasswordChange onClose={handleOutsideClick}/>
      )
    }
  }
  
}