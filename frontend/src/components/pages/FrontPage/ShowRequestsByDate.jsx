import React, { useEffect, useRef } from 'react';
import RequestDiv from '../showRequestPages/RequestDiv';

export default function ShowRequestsByDate({ showRequestsbyDate , allRequestbyDay , loginUser }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    /**
     * Handle click outside of component
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        closeTab();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Unbind the event listener on cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, showRequestsbyDate]);

  const closeTab = () => {
    showRequestsbyDate(false);
  };

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'absolute',
        width: '80%',
        height: '80%',
        backgroundColor: 'rgba(255,255,255,.9)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        padding: '20px',
        borderRadius: '10px',
      }}
    >
        <div style={
            {
                display: 'flex',
                flexDirection: 'column',
                height:'90%',
                overflowY:'scroll'
            }
        }>
            {loginUser.isLoggedIn && allRequestbyDay.map(request => (
                <RequestDiv
                    key={request._id}
                    request = {request}
                    userRole = {loginUser.userInfo.role}
                    setBtnClicked = {""}
                />
            ))}
        </div>
      
      <button
        onClick={closeTab}
        style={{
          backgroundColor: 'red',
          color: 'white',
          borderRadius: '5px',
          padding: '10px',
          width:'100px',
          border: 'none',
          cursor: 'pointer',
          marginLeft:'90%',
          marginTop:'20px'
        }}
      >
        Close
      </button>
    </div>
  );
}
