import React, { useEffect, useRef, useState } from 'react';
import './frontpagenavbar.css';

export default function LoginIcon({ setShowLoginIcon }) {
  const loginIconRef = useRef(null);

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

  return (
    <div className='LoginIcon' ref={loginIconRef} onClick={handleClickInside}>
      <p>Change Password</p>
      <p>Log Out</p>
    </div>
  );
}