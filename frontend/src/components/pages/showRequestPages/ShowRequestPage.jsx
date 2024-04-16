import React, { useContext, useEffect, useState } from 'react'
import './showrequest.css'
import RequestDiv from './RequestDiv'
import axios from 'axios';
import { UserContext } from '../../../contexts/UserContext';
export default function ShowRequestPage(){
  const [requests , setRequests] = useState([]); // Contain all the request to be shown
  
  const {loginUser} = useContext(UserContext);
  
  const [active,setActive] = useState('All Requests');
  const [btnclicked , setBtnClicked] = useState(false);  // Check if any btn is pressed in requestsDiv

  
  const getRequests = async () =>{
    const response = await axios.get("http://localhost:4000/api/v1/getAllRequests");
    const all_req_res= response.data;
    let all_req = []
    if(loginUser.isLoggedIn){
      if(loginUser.userInfo.role === "user"){
        all_req = all_req_res.filter(request => request.from === loginUser.userInfo.username);

      }
      else{
        all_req = all_req_res.filter(request => request.to === loginUser.userInfo.username);
        
      }
    } 
    if(active === "All Requests"){
      setRequests(all_req);
    }
    else if(active === "Pending Requests"){
      setRequests(all_req.filter(request => request.reqStatus === 'pending'));
    }
    else if(active === "Accepted Requests"){
      setRequests(all_req.filter(request => request.reqStatus === 'accepted'));
    }
    else{
      setRequests(all_req.filter(request => request.reqStatus === 'canceled'));
    }
  }



 

  useEffect(()=>{
    getRequests();
  },[active , btnclicked])

  
  return (
    <div className='request-page-container'>
      <div className="left-navbar">
        <div className={active === "All Requests" ? 'active' : ''} onClick={()=>setActive("All Requests")}>
        All Requests
        </div>
        <div className = {active === "Pending Requests" ? 'active' : '' } onClick={()=>setActive("Pending Requests")}>
          Pending Requests
        </div>
        <div className={active === "Accepted Requests" ? 'active' : ''} onClick={()=>setActive("Accepted Requests")}>
          Accepted Requests
        </div>
        <div className={active === "Rejected Requests" ? 'active' : ''} onClick={()=>setActive("Rejected Requests")}>
          Rejected Requests
        </div>
      </div>
      <div className="right-content">
        {loginUser.isLoggedIn && requests.map(request => (
          <RequestDiv
            key={request._id}
            request = {request}
            userRole = {loginUser.userInfo.role}
            setBtnClicked = {setBtnClicked }
          />
        ))}

      </div>
    </div>
  )
}
