import React, { useEffect, useState } from 'react';
import SelectedOptionsDiv from './SelectedOptionsDiv';
import './component.css'
import axios from 'axios';

const DropDownComponent = ({setGuests}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [adminList , setAdminList] = useState([]);
  const handleOptionChange = (option) => {
    if(option === adminList[0]){
        return;
    }
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt!== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const getAdmins = async () =>{
    const response= await axios.get("http://localhost:4000/api/v1/login/admin");
    setAdminList(["",...response.data]);  
  }

  useEffect(()=>{
    setGuests(selectedOptions);
  },[selectedOptions])

  return (
    <div style={{display:'flex' , flexDirection:'column'}} onClick={getAdmins}>
        <select className='user_dropdown' onChange={(e) => handleOptionChange(e.target.value)}>
            {adminList.map((data , index) => (
                <option value={data.username} key={index}>{data.username}</option>
            ))}
        </select>
        <div style={{display:'flex',flexWrap:'wrap'}}>
        {
            selectedOptions.map((val,index)=>(
                <SelectedOptionsDiv val={val} handleOptionChange ={handleOptionChange}/>
            ))
        }
        </div>

    </div>
  );
};

export default DropDownComponent;