import React, { useState } from 'react';
import './showrequest.css';
import axios from 'axios';
import SendFeedbackDiv from './SendFeedbackDiv';
export default function RequestDiv({request , user , setBtnClicked }) {
  const [showFbdiv,setShowFbdiv] = useState(false);
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
      <div className='row1'>
        <span className='school'>{request.from}</span>
        <span className='event'>{request.title}</span>
      </div>

      {/* Second Row */}
      <div className='row2'>
        <span className='date'>Date: {new Date(request.ceremonyDate).toDateString()}</span>
        <span className='time'>Time: {new Date(request.ceremonyDate).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })}</span>
        <span className='place'>Place: {request.place}</span>
        <span className='vanue'>Vanue: {request.vanue}</span>
      </div>

      {/* Third Row */}
      <div className='row3'>
        <span className='details'>{request.message}</span>
      </div>

      {/* Fourth Row */}
      {user === "admin" && 
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
    </div>
  );
}
