import FrontPageNavBar from './components/pages/FrontPage/FrontPageNavBar'
import React, { useEffect, useState } from 'react';
import FrontPageCalander from './components/pages/FrontPage/FrontPageCalander';
import FrontPageFooter from './components/pages/FrontPage/FrontPageFooter';
import LoginPage from './components/pages/LoginPage/LoginPage'
import RequestPage from './components/pages/createRequestPage/CreateRequestPage';
import DropDownComponent from './components/pages/createRequestPage/DropDownComponent';
function App() {

  const [loginClicked , setLoginClicked] = useState(false);
  return (
    <div className="App" style={
      {
        padding:0,
        margin:0,
        width:'100vw',
        height:'100vh',
        backgroundColor:'rgba(125,125,125,0.1)',
        overflowX:'hidden',
        display:'flex',
        flexDirection:'column',
        justifyItems:'space-between',
        alignItems:'center',
      }
    }>
      <FrontPageNavBar  loginPopup= {(val) => setLoginClicked(val)}/>
      {/* <FrontPageCalander /> */}
      {/* <RequestPage /> */}
      
      <FrontPageFooter />
      
      {loginClicked && <LoginPage loginPopup= {(val) => setLoginClicked(val)}/>} 
    </div>
  );
}

export default App;
