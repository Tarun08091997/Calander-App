import React from 'react'

export default function FrontPageFooter() {
  return (
    <div className="footer" style={{
        backgroundColor:'#3498db',
        width:'100vw',
        height:'80px',
        fontFamily:'serif',
        color:'white',
        fontSize:'20px',
        display:'flex',
        flexShrink:0,
        justifyContent: 'center', // Horizontally center the content
        alignItems: 'center', // Vertically center the content
    }}>
        &copy; 2024 CT University. All rights reserved.
    </div>
  )
}
