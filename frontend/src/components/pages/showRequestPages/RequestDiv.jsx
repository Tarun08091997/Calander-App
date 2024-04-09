import React from 'react';
import './showrequest.css';

export default function RequestDiv({ school, event, date, time, place, vanue, details }) {
  return (
    <div className='requestdiv'>
      {/* First Row */}
      <div className='row1'>
        <span className='school'>{school}</span>
        <span className='event'>{event}</span>
      </div>

      {/* Second Row */}
      <div className='row2'>
        <span className='date'>Date: {date}</span>
        <span className='time'>Time: {time}</span>
        <span className='place'>Place: {place}</span>
        <span className='vanue'>Vanue: {vanue}</span>
      </div>

      {/* Third Row */}
      <div className='row3'>
        <span className='details'>{details}</span>
      </div>

      {/* Fourth Row */}
      <div className='row4'>
        <button className='accept'>Accept</button>
        <button className='reject'>Reject</button>
        <button className='remarks'>Send Remarks</button>
      </div>
    </div>
  );
}
