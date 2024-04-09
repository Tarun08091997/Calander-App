import React, { useEffect, useState } from 'react';
import SelectedOptionsDiv from './SelectedOptionsDiv';
import './component.css'
const DropDownComponent = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options_used = ["","cdyhd","weiugf","ujbdiegf7o8e","iuqtr8723t","kjgci7t387t8fr","cdjbnciuegd873t78","kjbdilug13et8371e","jubdigeodt3","kkkkkk3134343400"];

  const handleOptionChange = (option) => {
    if(option === options_used[0]){
        return;
    }
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt!== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  useEffect(() => {
    console.log(selectedOptions);
  }, [selectedOptions]);

  return (
    <div style={{display:'flex' , flexDirection:'column'}}>
        <select className='user_dropdown' onChange={(e) => handleOptionChange(e.target.value)}>
            {options_used.map((data , index) => (
                <option value={data} key={index}>{data.toUpperCase()}</option>
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