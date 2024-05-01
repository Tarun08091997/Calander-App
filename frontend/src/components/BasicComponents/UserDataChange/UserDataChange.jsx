import React, { useRef, useEffect, useState } from 'react';
import UserChange from './UserChange';
import AddUser from './AddUser';

export default function UserDataChange({ onClose }) {
  const modalRef = useRef();
  const [changeUserInfoClicked, setChangeUserInfoClicked] = useState(false);
  const [addUserClicked, setAddUserClicked] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleChangeUserInfoClick = () => {
    setChangeUserInfoClicked(true);
    setAddUserClicked(false);
  };

  const handleAddUserClick = () => {
    setChangeUserInfoClicked(false);
    setAddUserClicked(true);
  };

  const BTNSTYLE = {
    width:'15%',
    height:'70%',
    marginRight:'5%',
    borderRadius:'10px',
    border:'none',
    cursor:'pointer',
    fontSize:'20px',
    color:'white'
  }

  const Middle_BTNSTYLE = {
    width:'20%',
    height:'10%',
    borderRadius:'10px',
    border:'none',
    cursor:'pointer',
    fontSize:'20px',
    color:'white',
    backgroundColor :'#3498db',
  }

  return (
    <div
      style={{
        height: '70%',
        width: '50%',
        backgroundColor: 'rgba(0,0,0,0.9)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '20px',
        zIndex: 999,
      }}
      ref={modalRef}
    >
      {(!changeUserInfoClicked && !addUserClicked) && 
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent:'space-around',
        width:'100%',
        height:'85%'
      }}>
      {/* ChangeUserInfo Button */}
      <button
        onClick={handleChangeUserInfoClick}
        style={Middle_BTNSTYLE}
      >
        Change User Info
      </button>
      <button
        onClick={handleAddUserClick}
        style={Middle_BTNSTYLE}
      >
        Add User
      </button>
    </div>
    }

    {(changeUserInfoClicked || addUserClicked) && <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'space-around',
            width:'100%',
            height:'85%'
          }}>

      {changeUserInfoClicked && <UserChange onClose = {onClose}/>}
      {addUserClicked && <AddUser onClose = {onClose}/>}

    </div>}

      <div style={{width:'100%' , height:'10%', display:'flex' ,justifyContent: 'center' }}>
         <button onClick={onClose} style={{...BTNSTYLE, backgroundColor:'red'}}>Cancel</button>
      </div>
    </div>
  );
}
