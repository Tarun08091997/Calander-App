import React, { useState } from 'react';
import './showrequest.css';
import axios from 'axios';
import SendFeedbackDiv from './SendFeedbackDiv';
import { FaExclamation } from "react-icons/fa";
import ShowFullRequest from './ShowFullRequest';
import UpdateRequestPage from '../../updateRequestPage/UpdateRequestPage';
export default function RequestDiv({request , userRole , setBtnClicked }) {
  const [showFbdiv,setShowFbdiv] = useState(false);
  const [showReq,setShowReq] = useState(false);
  const [updateReq , setUpdateReq] = useState(false);
  const handleAccept = async () => {
    setBtnClicked((prev)=>!prev);
    await axios.put(`http://localhost:4000/api/v1/${request._id}/AcceptRequest`);
  };

  const handleReject = async () => {
    setBtnClicked((prev)=>!prev);
    await axios.put(`http://localhost:4000/api/v1/${request._id}/RejectRequest`);
  };

  const handleRemarks = (event) => {
    setShowFbdiv(true);
    event.stopPropagation();
  };

  return (
    <div className='requestdiv'>
      {/* First Row */}
      <div className='row1' onClick={()=>setShowReq(true)}>
        <span className='school'>{userRole === "admin" ? request.from : request.to}</span>
        <span className='event'>{request.title}</span>
        {request.pendingFeedback > 0 ? <FaExclamation className='exclamanation'/> : null}
      </div>

      {/* Second Row */}
      <div className='row2' onClick={()=>setShowReq(true)}>
        <span className='date'>Date: {new Date(request.ceremonyDate).toDateString()}</span>
        <span className='time'>Time: {new Date(request.ceremonyDate).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })}</span>
        <span className='place'>Place: {request.place}</span>
        <span className='vanue'>Vanue: {request.vanue}</span>
      </div>

      {/* Third Row */}
      <div className='row3' onClick={()=>setShowReq(true)}>
        <span className='details'>{request.message}</span>
      </div>

      {/* Fourth Row */}
      {userRole === "admin" && 
      <div className='row4'>
      <button
        className={request.reqStatus === 'pending' ? 'accept' : 'inactive'}
        onClick={handleAccept}
      
      >
        Accept
      </button>
      <button
        className= {request.reqStatus === 'pending' ? 'reject' : 'inactive'}
        onClick={handleReject}
      >
        Reject
      </button>
      <button
        className= 'remarks'
        onClick={handleRemarks}
      >
        Send Remarks
      </button>
      </div>}
      {showFbdiv && <SendFeedbackDiv request = {request._id} setVisible={setShowFbdiv} visible = {showFbdiv}/>}
      {showReq && <ShowFullRequest request ={request} setVisible = {setShowReq} setUpdateReq={setUpdateReq}/>}
      {updateReq && <UpdateRequestPage request = {request} setUpdateReq={setUpdateReq}/>}
      
    </div>
  );
}
