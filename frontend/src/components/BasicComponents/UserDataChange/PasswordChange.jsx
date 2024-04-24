import React, { useRef, useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import Popup from '../../alerts/Popup';
import axios from 'axios'
export default function PasswordChange({ onClose }) {
  const modalRef = useRef();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [popmsg , setPopmsg] = useState(["",""]);
  const [count ,setCount] = useState("");
  const {loginUser,setLoginUser} = useContext(UserContext);
  
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
  }, []);

  async function updatePassword(username, newPassword) {
    try {
        const response = await axios.put(`http://localhost:4000/api/v1/signup/${username}`, {
            password: newPassword
        });
        // Handle response if necessary
        console.log('Password updated successfully:', response.data);
    } catch (error) {
        // Handle errors
        console.error('Error updating password:', error.message);
    }
}

  const handleApply = async () => {
    if(oldPassword.length === 0 || newPassword.length < 6 || confirmPassword.length < 6){
        setPopmsg(["warning" ,"Write Passwords with length greater than 6"]);
    } else if (newPassword !== confirmPassword) {
      setPopmsg(["warning" ,"New passwords don't match"]);
    } else if (oldPassword !== loginUser.userInfo.password) {
        setPopmsg(["error" ,"Old Password doesn't match"]);
    } else {
        updatePassword(loginUser.userInfo.username , newPassword)
      onClose(); // Close the modal after applying changes
    }
    setCount(prev => prev + 1);
  };

  const handleCancel = () => {
    onClose(); // Close the modal without applying changes
  };


  const INPUTSTYLE = {
    width:'60%',
    height:'5%',
    fontSize:'25px',
    padding:'10px',
    borderRadius:'10px',
    border:'none',
    outline:'none'
  }

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

        <Popup key={count} type={popmsg[0]} message={popmsg[1]} />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'space-around',
        width:'100%',
        height:'85%'
      }}>
        <input
          type="text"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          style={INPUTSTYLE}
        />

        <input
          type="text"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={INPUTSTYLE}
        />

        <input
        type="text"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={INPUTSTYLE}
        />
      </div>
      
      <div style={{width:'100%' , height:'10%', display:'flex' ,justifyContent: 'center' }}>
        <button onClick={handleApply}
            style={{...BTNSTYLE, backgroundColor:'steelblue'}}
         >Apply</button>

        <button onClick={handleCancel} style={{...BTNSTYLE, backgroundColor:'red'}}>Cancel</button>
      </div>
      
    </div>
  );
}
