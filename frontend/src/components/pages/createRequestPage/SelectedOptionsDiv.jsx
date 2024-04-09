import React from 'react'
import './component.css'

export default function SelectedOptionsDiv({val,handleOptionChange}) {

  return (
    <div className='selected-options-div' onClick={()=> handleOptionChange(val)} >
        {val}      
    </div>
  )
}
