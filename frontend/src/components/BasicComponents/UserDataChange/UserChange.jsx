import React, { useRef, useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import Popup from '../../alerts/Popup';
import axios from 'axios';

export default function UserChange({ onClose }) {
  const modalRef = useRef();
  const [selectedUser , setSelectedUser] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('user'); // Initial value for type is 'user'
  const [popmsg , setPopmsg] = useState(["",""]);
  const [count ,setCount] = useState(0);
  const {loginUser} = useContext(UserContext);
  const [usernames , setUsernames] = useState([]);

  const getUsers = async () =>{
    const response_users = await axios.get("http://localhost:4000/api/v1/login");
    setUsernames(["",...response_users.data]);
  }

  const getUserData = async (user) =>{
    try{
      const response = await axios.get(`http://localhost:4000/api/v1/signup/${user}`);
      setPassword(response.data.user.password);
      setType(response.data.user.role);
      setUsername(user);
      setSelectedUser(user);

    }
    catch(err){
      console.log(err);
    }

  }


  const updateUser = async()=>{
    try{
      const response = await axios.put(`http://localhost:4000/api/v1/signup/${selectedUser}`, {
        username:username ,
        password: password , 
        role : type
      });

      setPopmsg(["success" ,"User Data Changed"]);
    }catch(err){
      console.log(err);
    }
  }


  useEffect(() => {
    getUsers();
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

  

  

  const handleApply = async () => {
    if(username.length === 0 || password.length < 6){
        setPopmsg(["warning" ,"Write Passwords with length greater than 6"]);
    } else {
        updateUser();
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
        height: '100%',
        width: '100%',
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
        <select
          value={username}
          onChange={(e) => getUserData(e.target.value)}
          style={{...INPUTSTYLE, height:'10%'}}
        >
          {usernames.map((user , index) => (
                  <option value={user.username} key={index}>{user.username}</option>
              ))}
        </select>
        
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={INPUTSTYLE}
        />

        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={INPUTSTYLE}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{...INPUTSTYLE, height:'10%'}}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      
      <div style={{width:'100%' , height:'10%', display:'flex' ,justifyContent: 'center' }}>
        <button onClick={handleApply} style={{...BTNSTYLE, backgroundColor:'steelblue'}}>Apply</button>
        <button onClick={handleCancel} style={{...BTNSTYLE, backgroundColor:'red'}}>Cancel</button>
      </div>
      
    </div>
  );
}
