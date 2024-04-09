import React from 'react'
import './frontpagenavbar.css'
export default function FrontPageNavBar({loginPopup}) {
  return (
    <div className='navbar'>
        <div className="navbar-brand">
            <img className="logo" src="https://ctuniversity.in/images/ct-logo.png" alt="blog" />
        </div>
        <div className="navbar-links" >
            <p>Home</p>
            <p>Requests</p>
            <p>Create Request</p>
            <p onClick={()=>loginPopup(true)}>Login</p>
        </div>
    </div>
  )
}
