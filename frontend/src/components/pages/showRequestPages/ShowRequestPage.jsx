import React from 'react'
import './showrequest.css'
import RequestDiv from './RequestDiv'
export default function ShowRequestPage(){
  return (
    <div className='request-page-container'>
      <div className="left-navbar">
        <div className="all_requests">
        All Requests
        </div>
        <div className= "pending_requests">
          Pending Requests
        </div>
        <div className= "Accepted Requests">
          Accepted Requests
        </div>
      </div>
      <div className="right-content">
        <RequestDiv school={"School of Engineering and Technology"} event={"Gaming"} date={"16 october"} time ={"3:40 PM"} place ={"CT University"} vanue={"A2"} details={"To achieve your layout with three rows, where the first row contains the school and event, the second row contains the date, time, place, and vanue, the third row contains event details, and the last row contains buttons for accepting, rejecting, or sending remarks, you can modify your RequestDiv component as follows"}/>
      </div>
    </div>
  )
}
